import { Button } from '@/shared/ui/Button';
import { ArrowRight, ShoppingBag } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 to-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Texto Principal */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 text-brand-orange text-sm font-semibold mb-6">
              <span className="flex h-2 w-2 rounded-full bg-brand-orange animate-pulse"></span>
              Abierto ahora - Delivery rápido
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-gray-900 leading-tight mb-6">
              Tus compras del día, <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-green">
                sin salir de casa.
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              En Bodega El Caserito encuentras abarrotes, bebidas y limpieza al mejor precio de tu barrio. Pidelo por nuestra web y te lo llevamos al instante.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="group">
                <ShoppingBag className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                Ver Catálogo
              </Button>
              <Button variant="secondary" size="lg" className="group">
                ¿Cómo funciona?
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Imagen Visual */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="absolute -inset-4 bg-gradient-to-r from-brand-orange/20 to-brand-green/20 blur-3xl rounded-full opacity-50"></div>
            <img
              src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&q=80&w=800"
              alt="Bodega peruana repleta de productos frescos y empaquetados"
              className="relative rounded-2xl shadow-xl border border-white/50 object-cover rotate-1 hover:rotate-0 transition-transform duration-500"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
