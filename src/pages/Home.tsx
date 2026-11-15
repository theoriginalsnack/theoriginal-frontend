import { usePageMeta } from '../usePageMeta';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import About from '../components/About';
import Products from '../components/Products';
import Grades from '../components/Grades';
import Gifting from '../components/Gifting';
import FaqSection from '../components/FaqSection';
import Footer from '../components/Footer';
import { HOMEPAGE_FAQS } from '../data/faqData';

export default function Home() {
  usePageMeta(
    'Premium Palasa Cashews',
    'Premium cashews hand picked from Palasa, India, the cashew capital.',
  );
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Products />
      <Grades />
      <Gifting />
      <FaqSection
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about our authentic coastal Palasa harvest, grading calibers, and direct-from-origin dispatch."
        badge="GOT QUESTIONS?"
        faqs={HOMEPAGE_FAQS}
        id="home-faq"
      />
      <Footer />
    </>
  );
}

