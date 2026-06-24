'use client';

import React, { useRef, useEffect, useState } from 'react';

const brands = [
  {
    id: 1,
    name: 'ROLEX',
    svg: (
      <svg viewBox="0 0 120 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <g transform="translate(42, 2) scale(1.15)">
          <path d="M15 0 L12 8 L8 4 L10 12 L20 12 L22 4 L18 8 Z" fill="currentColor" opacity="0.9" />
          <path d="M10 12 L20 12 L21 16 L9 16 Z" fill="currentColor" opacity="0.9" />
        </g>
        <text x="60" y="54" textAnchor="middle" fontFamily="'Times New Roman', Georgia, serif"
          fontSize="22" fontWeight="700" letterSpacing="5" fill="currentColor">ROLEX</text>
      </svg>
    ),
  },
  {
    id: 2,
    name: 'PATEK PHILIPPE',
    svg: (
      <svg viewBox="0 0 160 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <g transform="translate(68, 2) scale(1.1)">
          <path d="M14 0 C14 0 12 4 8 4 C4 4 0 6 0 6 C0 6 4 8 4 12 C4 16 6 20 6 20 C6 20 8 16 12 16 C16 16 20 14 20 14 C20 14 16 12 16 8 C16 4 14 0 14 0Z" fill="currentColor" opacity="0.85" />
        </g>
        <text x="80" y="48" textAnchor="middle" fontFamily="'Times New Roman', Georgia, serif"
          fontSize="13" fontWeight="600" letterSpacing="2.5" fill="currentColor">PATEK PHILIPPE</text>
        <text x="80" y="61" textAnchor="middle" fontFamily="'Times New Roman', Georgia, serif"
          fontSize="9" fontWeight="400" letterSpacing="4" fill="currentColor" opacity="0.75">GENÈVE</text>
      </svg>
    ),
  },
  {
    id: 3,
    name: 'AUDEMARS PIGUET',
    svg: (
      <svg viewBox="0 0 180 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <text x="90" y="34" textAnchor="middle" fontFamily="'Times New Roman', Georgia, serif"
          fontSize="15.5" fontWeight="600" letterSpacing="1.5" fill="currentColor">AUDEMARS PIGUET</text>
        <text x="90" y="51" textAnchor="middle" fontFamily="Georgia, serif"
          fontSize="11" fontWeight="300" letterSpacing="1" fill="currentColor" fontStyle="italic" opacity="0.8">Le Brassus</text>
      </svg>
    ),
  },
  {
    id: 4,
    name: 'VACHERON CONSTANTIN',
    svg: (
      <svg viewBox="0 0 190 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <g transform="translate(82, 2) scale(1.1)">
          <path d="M9 0 L7 4 L3 2 L5 6 L1 6 L3 10 L0 12 L4 12 L2 16 L6 14 L6 18 L9 15 L12 18 L12 14 L16 16 L14 12 L18 12 L15 10 L17 6 L13 6 L15 2 L11 4 Z" fill="currentColor" opacity="0.85" />
        </g>
        <text x="95" y="46" textAnchor="middle" fontFamily="'Times New Roman', Georgia, serif"
          fontSize="11" fontWeight="500" letterSpacing="2" fill="currentColor">VACHERON CONSTANTIN</text>
        <text x="95" y="60" textAnchor="middle" fontFamily="'Times New Roman', Georgia, serif"
          fontSize="8.5" fontWeight="400" letterSpacing="3.5" fill="currentColor" opacity="0.75">GENÈVE</text>
      </svg>
    ),
  },
  {
    id: 5,
    name: 'Cartier',
    svg: (
      <svg viewBox="0 0 130 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <text x="65" y="48" textAnchor="middle"
          fontFamily="'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif"
          fontSize="34" fontWeight="300" letterSpacing="0.5" fill="currentColor" fontStyle="italic">Cartier</text>
      </svg>
    ),
  },
  {
    id: 7,
    name: 'JAEGER-LECOULTRE',
    svg: (
      <svg viewBox="0 0 180 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <g transform="translate(79, 2) scale(1.1)">
          <rect x="8" y="0" width="5" height="12" fill="currentColor" opacity="0.8" />
          <rect x="3" y="2" width="15" height="2.5" fill="currentColor" opacity="0.8" />
          <path d="M3 12 L10.5 17 L18 12 Z" fill="currentColor" opacity="0.8" />
        </g>
        <text x="90" y="46" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="12" fontWeight="600" letterSpacing="2" fill="currentColor">JAEGER-LECOULTRE</text>
      </svg>
    ),
  },
];

const Brands: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(Array(brands.length).fill(false));

  useEffect(() => {
    const sectionObs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) sectionObs.observe(sectionRef.current);

    brands.forEach((_, i) => {
      const el = document.getElementById(`brand-logo-${i}`);
      if (!el) return;
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setVisibleItems(prev => { const n = [...prev]; n[i] = true; return n; });
            obs.disconnect();
          }, i * 90);
        }
      }, { threshold: 0.2 });
      obs.observe(el);
    });

    return () => sectionObs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 bg-white border-t border-b border-[#ece8e0] py-8 md:py-10 overflow-hidden"
    >
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 md:w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
      
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 md:w-20 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        {/* Label */}
        <div className={`text-center mb-6 md:mb-8 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-[8px] tracking-[5px] uppercase text-gray-300 font-sans">
            As featured in
          </p>
        </div>

        {/* Logos row - Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 items-center">
          {brands.map((brand, i) => (
            <div
              key={brand.id}
              id={`brand-logo-${i}`}
              title={brand.name}
              className={`
                flex items-center justify-center h-14 sm:h-16 md:h-[72px] w-full
                text-gray-600 hover:text-black cursor-default transition-all duration-300
                ${visibleItems[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2.5'}
              `}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              {brand.svg}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;