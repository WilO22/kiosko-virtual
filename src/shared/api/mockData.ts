import type { Product } from '../types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p-001',
    name: 'Inca Kola 1.5L',
    description: 'La bebida de sabor nacional de litro y medio. Ideal para acompañar el almuerzo familiar.',
    price: 6.50,
    category: 'bebidas',
    stock: 24,
    imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'p-002',
    name: 'Arroz Costeño Extra 1kg',
    description: 'Arroz de grano largo, rendidor y graneadito. Infaltable en la cocina peruana.',
    price: 4.20,
    category: 'abarrotes',
    stock: 50,
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'p-003',
    name: 'Aceite Primor Premium 1L',
    description: 'Aceite vegetal 100% puro de soya. No altera el sabor de tus comidas.',
    price: 8.90,
    category: 'abarrotes',
    stock: 30,
    imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'p-004',
    name: 'Detergente Ariel 800g',
    description: 'Detergente en polvo con poder quitamanchas insuperable. Aroma a limpio.',
    price: 7.50,
    category: 'limpieza',
    stock: 15,
    imageUrl: 'https://images.unsplash.com/photo-1584824486509-112e41ab8bE5?auto=format&fit=crop&q=80&w=400' // using soap proxy
  },
  {
    id: 'p-005',
    name: 'Galletas Casino Menta',
    description: 'El clásico sabor a menta y chocolate en cada mordida.',
    price: 1.00,
    category: 'golosinas',
    stock: 100,
    imageUrl: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=400' // using cookie proxy
  },
  {
    id: 'p-006',
    name: 'Leche Gloria Evaporada 400g',
    description: 'Tarro azul tradicional. Enriquecida con vitaminas A y D.',
    price: 3.80,
    category: 'abarrotes',
    stock: 40,
    imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'p-007',
    name: 'Coca Cola 2.25L',
    description: 'Bebida gaseosa sabor cola original. Ideal para compartir en reuniones.',
    price: 9.00,
    category: 'bebidas',
    stock: 20,
    imageUrl: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'p-008',
    name: 'Atún Florida en Aceite Vegetal',
    description: 'Lomitos de atún de primera calidad. Rico en Omega 3.',
    price: 5.50,
    category: 'abarrotes',
    stock: 60,
    imageUrl: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'p-009',
    name: 'Papel Higiénico Suave 40m (Pqte x4)',
    description: 'Doble hoja extra suave. Más metros por rollo.',
    price: 4.80,
    category: 'limpieza',
    stock: 25,
    imageUrl: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'p-010',
    name: 'Margarina Manti 250g',
    description: 'Margarina con sal, ideal para el pan del desayuno o repostería.',
    price: 3.20,
    category: 'abarrotes',
    stock: 15,
    imageUrl: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'p-011',
    name: 'Cerveza Pilsen Callao 630ml',
    description: 'La auténtica cerveza de la verdadera amistad.',
    price: 6.00,
    category: 'bebidas',
    stock: 50,
    imageUrl: 'https://images.unsplash.com/photo-1614316346024-14e207138384?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'p-012',
    name: 'Galletas Oreo Original (Paquete x6)',
    description: 'El clásico sándwich de galleta de chocolate relleno de crema de vainilla.',
    price: 4.50,
    category: 'golosinas',
    stock: 35,
    imageUrl: 'https://images.unsplash.com/photo-1558024920-b41e1887dc32?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'p-013',
    name: 'Detergente Opal Ultra 1.5kg',
    description: 'Remueve manchas difíciles y deja un aroma a flores frescas.',
    price: 13.90,
    category: 'limpieza',
    stock: 10,
    imageUrl: 'https://images.unsplash.com/photo-1605273397970-20ba21df55f0?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'p-014',
    name: 'Azúcar Blanca Rubia Cartavio 1kg',
    description: 'Azúcar rubia doméstica de grano fino.',
    price: 4.00,
    category: 'abarrotes',
    stock: 40,
    imageUrl: 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'p-015',
    name: 'Chocolate Sublime Clásico',
    description: 'Barra de chocolate con leche y trozos de maní.',
    price: 1.50,
    category: 'golosinas',
    stock: 80,
    imageUrl: 'https://images.unsplash.com/photo-1548843232-f38b25d20399?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'p-016',
    name: 'Agua San Mateo Sin Gas 2.5L',
    description: 'Agua mineral de manantial natural.',
    price: 3.00,
    category: 'bebidas',
    stock: 30,
    imageUrl: 'https://images.unsplash.com/photo-1548081691-3440cc0fb6b6?auto=format&fit=crop&q=80&w=400'
  }
];
