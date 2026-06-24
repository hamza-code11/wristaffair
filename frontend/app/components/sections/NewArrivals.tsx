'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import NewArrivalsCard from '../ProductCard/ProductCart';

interface Watch {
  id: number;
  name: string;
  brand: string;
  price: string;
  image: string;
  badge?: string;
}

const watches: Watch[] = [
  { id: 1, name: 'Heritage Chronograph', brand: 'LUXE', price: '$12,500', image: 'https://zerolifestyle.co/cdn/shop/files/W2_601bfa92-5ed8-4493-8f38-a76d27d535b1.webp?v=1762943726&width=400', badge: 'New' },
  { id: 2, name: 'Sports Elegance', brand: 'LUXE', price: '$8,900', image: 'https://zerolifestyle.co/cdn/shop/files/Bolt_Vintage_Brown-3.webp?v=1775288200&width=400', badge: 'Limited' },
  { id: 3, name: 'Classic Moonphase', brand: 'LUXE', price: '$15,200', image: 'https://zerolifestyle.co/cdn/shop/files/2_bdb30c06-4a67-45f3-8b36-0dedad4579a1.jpg?v=1754740631&width=400', badge: 'New' },
  { id: 4, name: 'Dress Collection', brand: 'LUXE', price: '$6,750', image: 'https://zerolifestyle.co/cdn/shop/files/ICON-Magenta-2.webp?v=1752499934&width=400', badge: 'Best Seller' },
  { id: 5, name: 'Heritage Tourbillon', brand: 'LUXE', price: '$45,000', image: 'https://zerolifestyle.co/cdn/shop/files/2_a6e28de6-a408-4f26-a579-2bfd5651f1c9.webp?v=1775741537&width=400', badge: 'New' },
  { id: 6, name: 'Sport Chrono', brand: 'LUXE', price: '$9,800', image: 'https://zerolifestyle.co/cdn/shop/files/lunar_Blue-Silicon-01.webp?v=1775032857&width=400', badge: 'Limited' },
  { id: 7, name: 'Classic Automatic', brand: 'LUXE', price: '$7,200', image: 'https://zerolifestyle.co/cdn/shop/files/4_4924004d-34bd-4d21-bdb1-f2f4b2f0e75b.webp?v=1766048642&width=400', badge: 'New' },
  { id: 8, name: 'Grand Complication', brand: 'LUXE', price: '$28,500', image: 'https://zerolifestyle.co/cdn/shop/files/Starlight_13.webp?v=1725950619&width=400', badge: 'Exclusive' },
];

const CARD_WIDTH = 300;
const CARD_GAP = 20;

const NewArrivals: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  const totalTrackWidth = watches.length * (CARD_WIDTH + CARD_GAP) - CARD_GAP;

  const onScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;
      const scrollable = sectionHeight - windowHeight;
      const raw = -rect.top / scrollable;
      const p = Math.min(1, Math.max(0, raw));
      setProgress(p);
      const maxTranslate = totalTrackWidth - windowWidth + 60;
      setTranslateX(-(p * Math.max(0, maxTranslate)));
    });
  }, [totalTrackWidth]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onScroll]);

  const sectionHeight = `${watches.length * 80 + 100}vh`;

  const handleAddToCart = (id: number) => {
    console.log(`Added to cart: ${id}`);
  };

  const handleWishlist = (id: number) => {
    console.log(`Wishlist toggled: ${id}`);
  };

  return (
    <section ref={sectionRef} className="relative z-10" style={{ height: sectionHeight }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center bg-white">
        {/* Header */}
        <div className="px-8 sm:px-12 lg:px-15 mb-10 flex items-end justify-between">
          <div>
            <p className="text-[10px] tracking-[5px] uppercase text-gray-500 mb-3 font-sans font-medium">
              New Arrivals
            </p>
            <h2 className="text-[clamp(28px,3.5vw,48px)] font-serif font-light text-black leading-[1.1] tracking-[2px]">
              Latest Collection
            </h2>
          </div>

          {/* Progress */}
          <div className="text-right">
            <p className="text-[11px] text-gray-300 mb-2 tracking-[2px] font-sans font-medium">
              {Math.round(progress * 100)}%
            </p>
            <div className="w-20 h-px bg-gray-100 ml-auto">
              <div
                className="h-full bg-black transition-all duration-100"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Track */}
        <div className="overflow-hidden pl-8 sm:pl-12 lg:pl-15">
          <div
            ref={trackRef}
            className="flex gap-5 transition-none"
            style={{
              transform: `translateX(${translateX}px)`,
              willChange: 'transform',
            }}
          >
            {watches.map((watch, index) => (
              <div key={watch.id} className="flex-shrink-0" style={{ width: `${CARD_WIDTH}px` }}>
                <NewArrivalsCard
                  watch={watch}
                  index={index}
                  visible={true}
                  onAddToCart={handleAddToCart}
                  onWishlist={handleWishlist}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Indicators */}
        <div className="flex gap-2 px-8 sm:px-12 lg:px-15 pt-8 items-center">
          {watches.map((_, i) => {
            const active = Math.round(progress * (watches.length - 1)) === i;
            return (
              <div
                key={i}
                className={`h-px transition-all duration-300 ${
                  active ? 'w-6 bg-black' : 'w-1.5 bg-gray-300'
                }`}
              />
            );
          })}
          <span className="ml-auto text-[10px] tracking-[3px] text-gray-300 uppercase font-sans font-medium">
            {Math.min(watches.length, Math.round(progress * watches.length) + 1)} / {watches.length}
          </span>
        </div>

        {/* Scroll hint */}
        <div
          className={`absolute bottom-8 left-8 sm:left-12 lg:left-15 flex items-center gap-2.5 text-[10px] tracking-[3px] text-gray-300 uppercase font-sans font-medium transition-opacity duration-500 ${
            progress < 0.05 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="inline-block animate-scroll-bounce">↓</span>
          Scroll to explore
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;