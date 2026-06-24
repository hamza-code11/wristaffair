'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import NewArrivalsCard from '../ProductCard/ProductCart';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: string;
  image: string;
  badge?: string;
  category: string;
}

const products: Product[] = [
  { id: 1, name: 'Heritage Chronograph', brand: 'LUXE', price: '$12,500', image: 'https://zerolifestyle.co/cdn/shop/files/Jewel-Pro-_1.webp?v=1781003203&width=400', badge: 'New', category: 'Heritage' },
  { id: 2, name: 'Sports Elegance', brand: 'LUXE', price: '$8,900', image: 'https://zerolifestyle.co/cdn/shop/files/vision_Black-Gold_1.webp?v=1771398036&width=400', badge: 'Limited', category: 'Sports' },
  { id: 3, name: 'Classic Moonphase', brand: 'LUXE', price: '$15,200', image: 'https://zerolifestyle.co/cdn/shop/files/Visionary_Blue-Silicone_1_3a48695d-68c7-4bcf-85a6-becf06f335ef.webp?v=1774870143&width=400', badge: 'New', category: 'Dress' },
  { id: 4, name: 'Grand Complication', brand: 'LUXE', price: '$28,500', image: 'https://zerolifestyle.co/cdn/shop/files/armour-black-01_8d56acb0-773d-4e58-815c-5ab36400fe7f.webp?v=1742630454&width=400', badge: 'Exclusive', category: 'Tourbillon' },
  { id: 5, name: 'Sport Chrono', brand: 'LUXE', price: '$9,800', image: 'https://zerolifestyle.co/cdn/shop/files/1_ee8ac544-ead9-49a7-84c0-9f8c4a75d15d.webp?v=1756127463&width=400', badge: 'Limited', category: 'Sports' },
  { id: 6, name: 'Classic Automatic', brand: 'LUXE', price: '$7,200', image: 'https://zerolifestyle.co/cdn/shop/files/ignite_black-2.webp?v=1773924771&width=400', badge: 'New', category: 'Dress' },
  { id: 7, name: 'Heritage Tourbillon', brand: 'LUXE', price: '$45,000', image: 'https://zerolifestyle.co/cdn/shop/files/Qube_Black-4.webp?v=1773019308&width=400', badge: 'Exclusive', category: 'Heritage' },
  { id: 8, name: 'Dress Perpetual', brand: 'LUXE', price: '$18,900', image: 'https://zerolifestyle.co/cdn/shop/files/Coffee_4.webp?v=1776755793&width=400', badge: 'New', category: 'Dress' },
];

const ProductSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setIsVisible(true); },
      { threshold: 0.06 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const handleAddToCart = (id: number) => {
    console.log(`Added to cart: ${id}`);
  };

  const handleWishlist = (id: number) => {
    console.log(`Wishlist toggled: ${id}`);
  };

  return (
    <section
      ref={sectionRef}
      className="relative z-10 bg-white py-16 sm:py-20 md:py-24 lg:py-30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">

        {/* Header */}
        <div className={`
          flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 sm:mb-12 md:mb-13
          transition-all duration-800
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}
        `}>
          <div>
            <p className="text-[9px] tracking-[6px] uppercase text-gray-500 mb-3 sm:mb-3.5 font-sans font-medium">
              Our Collection
            </p>
            <h2 className="text-[clamp(28px,4vw,54px)] font-serif font-light text-black leading-none tracking-[1px]">
              Featured<br />
              <span className="text-gray-500 font-light">Timepieces</span>
            </h2>
            <div className="w-10 h-px bg-black mt-4 sm:mt-5 md:mt-6" />
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-3 px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 md:py-3.5 text-[8px] sm:text-[9px] md:text-[9px] tracking-[3px] uppercase font-sans font-medium border border-black text-black bg-transparent transition-all duration-300 hover:bg-black hover:text-white mt-4 sm:mt-0"
          >
            View All
            <span>→</span>
          </Link>
        </div>

        {/* Grid - 4 cols desktop, 3 tablet, 2 mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {products.map((product, i) => (
            <NewArrivalsCard
              key={product.id}
              watch={product}
              index={i}
              visible={isVisible}
              onAddToCart={handleAddToCart}
              onWishlist={handleWishlist}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;