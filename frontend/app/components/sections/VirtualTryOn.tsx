'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const WATCHES = [
  {
    id: 1,
    name: 'Heritage Chronograph',
    ref: 'REF. HC-2024',
    price: '$12,500',
    image: 'https://zerolifestyle.co/cdn/shop/files/02_14d4c7f7-c21c-49be-8519-5f340b58ebd5.webp?v=1734007033&width=400',
    specs: { Movement: 'Cal. 3135 Automatic', Diameter: '42 mm', Case: '18kt Everose Gold', Water: '100 m' },
    bandColor: '#2c1810',
  },
  {
    id: 2,
    name: 'Sport Perpetuel',
    ref: 'REF. SP-2024',
    price: '$8,900',
    image: 'https://zerolifestyle.co/cdn/shop/files/Layer_3_B.webp?v=1719928924&width=400',
    specs: { Movement: 'Cal. 4130 Chronograph', Diameter: '44 mm', Case: 'Oystersteel', Water: '300 m' },
    bandColor: '#1a1a2e',
  },
  {
    id: 3,
    name: 'Céleste Moonphase',
    ref: 'REF. CM-2024',
    price: '$15,200',
    image: 'https://zerolifestyle.co/cdn/shop/files/LunaPro_3.webp?v=1755331884&width=400',
    specs: { Movement: 'Cal. 9001 Moonphase', Diameter: '40 mm', Case: 'Rose Gold', Water: '50 m' },
    bandColor: '#1c1c1c',
  },
  {
    id: 4,
    name: 'Grand Tourbillon',
    ref: 'REF. GT-2024',
    price: '$28,500',
    image: 'https://zerolifestyle.co/cdn/shop/files/RevoltGolden03-enhanced.webp?v=1736870078&width=400',
    specs: { Movement: 'Cal. 2836 Tourbillon', Diameter: '41 mm', Case: 'Black PVD', Water: '30 m' },
    bandColor: '#0d0d0d',
  },
];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const VirtualTryOn: React.FC = () => {
  const { ref: sectionRef, visible } = useInView(0.08);
  const [watchIdx, setWatchIdx] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const watch = WATCHES[watchIdx];

  const switchWatch = (i: number) => {
    if (i === watchIdx || transitioning) return;
    setTransitioning(true);
    setTimeout(() => { setWatchIdx(i); setTransitioning(false); }, 320);
  };

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative z-10 overflow-hidden bg-white py-30 md:py-35"
    >
      <div className="relative max-w-[1320px] mx-auto px-4 sm:px-8 lg:px-16">

        {/* HEADER */}
        <div className={`
          grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 md:gap-15 items-end mb-16
          transition-all duration-900
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'}
        `}>
          <div>
            <p className="text-[10px] tracking-[5px] uppercase text-gray-500 mb-4 font-sans font-medium">
              Premium Collections
            </p>
            <h2 className="text-[clamp(38px,4.5vw,62px)] font-serif font-light text-black leading-none tracking-[1px]">
              Explore <em className="italic text-gray-500 font-light">Timepieces</em>
            </h2>
          </div>
          <p className="text-[13px] text-gray-500 max-w-[240px] leading-relaxed font-sans font-normal pb-1">
            Select a watch to view its details and specifications.
          </p>
        </div>

        {/* MAIN GRID - Equal Height */}
        <div className={`
          grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 lg:gap-18 items-stretch
          transition-all duration-900 ease-300
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}
        `}>
          {/* ══ LEFT - Image Viewer ══ */}
          <div className="flex">
            <div className="relative w-full aspect-[16/10] bg-gradient-to-br from-[#f0ece6] to-[#e8e2d8] overflow-hidden shadow-[inset_0_0_60px_rgba(0,0,0,0.04)] flex items-center justify-center">
              {/* Soft ambient light top-left */}
              <div className="absolute -top-20 -left-10 w-[400px] h-[400px] pointer-events-none bg-[radial-gradient(circle,rgba(255,255,255,0.5)_0%,transparent_70%)]" />

              {/* Watch Image */}
              <div className={`
                relative w-[65%] aspect-square
                transition-opacity duration-300
                ${transitioning ? 'opacity-0' : 'opacity-100'}
              `}>
                <Image
                  src={watch.image}
                  alt={watch.name}
                  fill
                  className="object-contain"
                  unoptimized
                />
                {/* Subtle shadow under watch */}
                <div className="absolute -bottom-[10%] left-[10%] right-[10%] h-[20%] bg-[radial-gradient(ellipse,rgba(0,0,0,0.15)_0%,transparent_70%)] blur-[10px]" />
              </div>

              {/* Label */}
              <span className="absolute bottom-3.5 right-4.5 text-[8px] tracking-[3px] uppercase text-black/20 font-sans font-medium">
                Collection Preview
              </span>
            </div>
          </div>

          {/* ══ RIGHT PANEL - Watch Info ══ */}
          <div className="sticky top-12 flex flex-col justify-start">
            <div className={`
              transition-all duration-300
              ${transitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}
            `}>
              <p className="text-[9px] tracking-[4px] uppercase text-gray-500 mb-2.5 font-sans font-medium">
                {watch.ref}
              </p>
              <h3 className="text-[28px] font-serif font-light text-black leading-[1.1] tracking-[0.3px] mb-1.5">
                {watch.name}
              </h3>
              <p className="text-[22px] font-light text-gray-400 font-sans mb-8">
                {watch.price}
              </p>

              {/* Specs */}
              <div className="border-t border-[#e8e4dc] mb-8">
                {Object.entries(watch.specs).map(([k, v], i, arr) => (
                  <div key={k} className={`
                    flex justify-between items-center py-2.5
                    ${i < arr.length - 1 ? 'border-b border-[#f0ece4]' : ''}
                  `}>
                    <span className="text-[9px] tracking-[2.5px] uppercase text-gray-500 font-sans font-medium">
                      {k}
                    </span>
                    <span className="text-xs text-gray-400 font-sans font-normal">
                      {v}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Model selector */}
            <p className="text-[9px] tracking-[3px] uppercase text-gray-500 mb-3 font-sans font-medium">
              Select Model
            </p>
            <div className="grid grid-cols-4 gap-1.5 mb-7">
              {WATCHES.map((w, i) => (
                <button
                  key={w.id}
                  onClick={() => switchWatch(i)}
                  className={`
                    relative aspect-square overflow-hidden bg-[#f0ece5] p-0 transition-all duration-250
                    ${watchIdx === i ? 'border-2 border-black' : 'border-2 border-[#e8e4dc]'}
                  `}
                >
                  <Image src={w.image} alt={w.name} fill className="object-cover" unoptimized />
                  {watchIdx === i && (
                    <div className="absolute inset-0 bg-black/15 flex items-end justify-end p-1.5">
                      <div className="w-4 h-4 bg-black rounded-full flex items-center justify-center">
                        <span className="text-white text-[9px]">✓</span>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-2">
              <button
                className="w-full py-4 text-[9px] tracking-[3px] uppercase font-sans font-medium bg-black text-white border-none cursor-pointer flex items-center justify-center gap-2.5 transition-colors duration-300 hover:bg-gray-400"
              >
                <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VirtualTryOn;