import { Product } from '../types';

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
  }
];
