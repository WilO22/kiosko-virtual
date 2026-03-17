import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '@/pages/home/ui/HomePage';
import { ProductDetailPage } from '@/pages/product-detail/ui/ProductDetailPage';

/**
 * Router centralizado de la aplicación.
 * Usa createBrowserRouter (recomendado React Router v7+).
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/producto/:id',
    element: <ProductDetailPage />,
  },
]);
