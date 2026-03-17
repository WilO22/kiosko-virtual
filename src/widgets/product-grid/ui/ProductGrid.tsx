import { useEffect } from 'react';
import type { Product } from '@/shared/types';
import { ProductCard } from '@/entities/product/ui/ProductCard';
import { PackageSearch, ChevronLeft, ChevronRight, Search, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { config } from '@/shared/config';

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  onAddToCart?: (product: Product) => void;
}

export function ProductGrid({ products, isLoading, onAddToCart }: ProductGridProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'Todos';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const searchQuery = searchParams.get('q') || '';
  const ITEMS_PER_PAGE = config.itemsPerPage;

  // Extraer categorías únicas
  const categories = ['Todos', ...new Set(products.map(p => p.category))];

  // Filtrar por categoría
  const categoryFiltered = activeCategory === 'Todos' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  // Filtrar por búsqueda (coincidencia parcial en nombre o descripción)
  const filteredProducts = searchQuery
    ? categoryFiltered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : categoryFiltered;

  // Cálculos de Paginación
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Efecto para resetear a la página 1 si nos salimos del rango (ej. al cambiar a una categoría con pocos items)
  useEffect(() => {
    if (currentPage > 1 && currentPage > totalPages && totalPages > 0) {
      searchParams.set('page', '1');
      setSearchParams(searchParams, { replace: true });
    }
  }, [currentPage, totalPages, searchParams, setSearchParams]);

  const handleCategoryClick = (category: string) => {
    if (category === 'Todos') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    // Resetear página al cambiar filtro
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  const handleSearchChange = (value: string) => {
    if (value) {
      searchParams.set('q', value);
    } else {
      searchParams.delete('q');
    }
    searchParams.set('page', '1');
    setSearchParams(searchParams, { replace: true });
  };

  const clearSearch = () => {
    searchParams.delete('q');
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      searchParams.set('page', newPage.toString());
      setSearchParams(searchParams);
      // Opcional: Auto-scroll arriba al cambiar de página
      document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-heading font-bold text-gray-900">Catálogo Caserito</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse bg-white h-[380px] rounded-2xl border border-gray-100 flex flex-col">
              <div className="h-48 bg-gray-200/50 rounded-t-2xl w-full"></div>
              <div className="p-5 flex-grow space-y-4">
                <div className="h-4 bg-gray-200/50 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200/50 rounded w-full"></div>
                <div className="h-3 bg-gray-200/50 rounded w-5/6"></div>
                <div className="pt-8 flex justify-between items-center mt-auto">
                  <div className="h-6 bg-gray-200/50 rounded w-1/3"></div>
                  <div className="h-8 bg-brand-orange/20 rounded-full w-24"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
          <div className="bg-orange-50 p-4 rounded-full mb-4 text-brand-orange">
            <PackageSearch size={40} />
          </div>
          <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">No hay productos disponibles</h3>
          <p className="text-gray-500 max-w-md text-center">Nuestra bodega está actualizando el inventario. Vuelve en un momento para ver todo nuestro catálogo.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="catalogo">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-heading font-bold text-gray-900">
          Catálogo <span className="text-brand-orange">Caserito</span>
        </h2>
        <div className="text-sm font-medium text-gray-500 bg-white px-4 py-1.5 rounded-full shadow-sm border border-gray-100 flex items-center gap-2 whitespace-nowrap">
          <span className="flex h-2 w-2 rounded-full bg-brand-green"></span>
          {filteredProducts.length} productos
        </div>
      </div>

      {/* Barra de Búsqueda */}
      <div className="relative mb-6">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Buscar productos... (ej. arroz, galleta, leche)"
          className="w-full pl-11 pr-10 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange outline-none text-sm text-gray-800 placeholder:text-gray-400 shadow-sm transition-all"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Píldoras de Categorías (Filtros) */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-8 snap-x snap-mandatory scrollbar-hide">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`px-5 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all snap-start ${
              activeCategory === category
                ? 'bg-brand-orange text-white shadow-md shadow-brand-orange/20'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-orange hover:text-brand-orange'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
          <div className="bg-orange-50 p-4 rounded-full mb-4 text-brand-orange">
            <PackageSearch size={40} />
          </div>
          <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">No hay productos en esta categoría</h3>
          <p className="text-gray-500 max-w-md text-center">Intenta buscar en otra categoría o borra los filtros.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>

          {/* Renderizar Controles de Paginación solo si hay más de 1 página */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-full flex items-center justify-center transition-colors ${
                  currentPage === 1 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-white text-gray-700 hover:bg-brand-orange hover:text-white border border-gray-200'
                }`}
              >
                <ChevronLeft size={24} />
              </button>
              
              <span className="text-sm font-semibold text-gray-600 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                Página {currentPage} de {totalPages}
              </span>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-full flex items-center justify-center transition-colors ${
                  currentPage === totalPages 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-white text-gray-700 hover:bg-brand-orange hover:text-white border border-gray-200'
                }`}
              >
                <ChevronRight size={24} />
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
