import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductsSection from '@/components/ProductsSection';
import About from '@/components/About';
import LabSection from '@/components/LabSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <ProductsSection />
        <About />
        <LabSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
