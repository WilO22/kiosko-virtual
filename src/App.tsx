import { Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/home/ui/HomePage';
import { ProductDetailPage } from '@/pages/product-detail/ui/ProductDetailPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/producto/:id" element={<ProductDetailPage />} />
    </Routes>
  );
}
