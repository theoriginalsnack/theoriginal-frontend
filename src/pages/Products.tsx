import { usePageMeta } from '../usePageMeta';
import ProductsPageClient from '../components/ProductsPageClient';

export default function ProductsPage() {
  usePageMeta(
    'Shop All Products',
    'Explore the full harvest catalog of The Original. Hand picked W180 Jumbo King, W240, W320, Palasa Raw Skin Cashews (Pottu Pappu), clean splits, and artisanal chocolates.',
  );
  return <ProductsPageClient />;
}
