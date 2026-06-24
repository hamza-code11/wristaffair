// 'use client';


import Banner from '../../components/sections/Banner';
import NewArrivals from '../../components/sections/NewArrivals';
import FullBanner from '../../components/sections/FullBanner';
import Brands from '../../components/sections/Brands';
// import Heritage from '../../sections/Heritage';
import ProductSection from '../../components/sections/ProductSection';
import WhyLuxe from '../../components/sections/WhyLuxe';
import Testimonials from '../../components/sections/Testimonials';
import Catalog from '../../components/sections/Catalog';
import VirtualTryOn from '../../components/sections/VirtualTryOn';
// import Craftsmanship from '../../sections/Craftsmanship';




export default function Home() {
  return (
    <main>
      <Banner />
      <NewArrivals />
      <FullBanner />
      {/* <Heritage /> */}
      <ProductSection />
      <Catalog />
      <WhyLuxe />
      <VirtualTryOn />
      <Testimonials />
      <Brands />
      {/* <Craftsmanship /> */}
    </main>
  );
}