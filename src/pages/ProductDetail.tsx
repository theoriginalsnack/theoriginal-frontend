import { useParams } from 'react-router';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import ProductDetailClient from '../components/ProductDetailClient';
import { getProductById } from '../data/productsData';
import NotFound from './NotFound';

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = getProductById(id);

  if (!product) return <NotFound />;

  return (
    <>
      <Nav />
      <main>
        {/* key resets per-product state (selected size, gallery) when navigating between products */}
        <ProductDetailClient key={product.id} product={product} />
      </main>
      <Footer />
    </>
  );
}
