'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

const collections = [
  {
    id: 1,
    name: 'Heritage',
    sub: 'Est. 1755',
    tagline: 'Timeless classics across generations',
    models: ['Chronograph', 'Moonphase', 'Tourbillon', 'Automatic'],
    image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=1200&q=85',
    accent: '#C9A84C',
    price: 'From CHF 12,500',
  },
  {
    id: 2,
    name: 'Sports',
    sub: 'Performance',
    tagline: 'Precision for the modern adventurer',
    models: ['Chrono', 'Diver 300M', 'GMT Master', 'Racing'],
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1200&q=85',
    accent: '#4A90C4',
    price: 'From CHF 8,900',
  },
  {
    id: 3,
    name: 'Dress',
    sub: 'Sophistication',
    tagline: 'Refined for every distinguished occasion',
    models: ['Classic', 'Elegance', 'Precious', 'Ultra-Slim'],
    image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=1200&q=85',
    accent: '#B8A99A',
    price: 'From CHF 18,000',
  },
];

type Collection = (typeof collections)[0];

function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.15) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return inView;
}

function CollectionCard({ collection, index }: { collection: Collection; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<HTMLElement>, 0.1);
  const isLarge = index === 0;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative overflow-hidden cursor-pointer group ${isLarge ? 'lg:row-span-2' : ''}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.8s ease ${index * 0.12}s, transform 0.8s ease ${index * 0.12}s`,
        aspectRatio: isLarge ? '4/5' : '16/10',
        minHeight: isLarge ? 'clamp(280px, 40vh, 500px)' : 'clamp(180px, 25vh, 300px)',
      }}
    >
      {/* Background Image */}
      <Image
        src={collection.image}
        alt={collection.name}
        fill
        sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover"
        style={{
          transform: hovered ? 'scale(1.07)' : 'scale(1.0)',
          transition: 'transform 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
        unoptimized
      />

      {/* Very subtle dark overlay - only on hover */}
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{
          background: hovered
            ? 'linear-gradient(to top, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.10) 60%, rgba(0,0,0,0) 100%)'
            : 'linear-gradient(to top, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0) 60%, rgba(0,0,0,0) 100%)',
          transition: 'background 0.7s ease',
        }}
      />

      {/* Accent line top */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] z-10"
        style={{
          background: collection.accent,
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'opacity 0.4s ease, transform 0.5s ease',
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5 md:p-6 lg:p-8 xl:p-9 z-10">

        {/* Sub-label */}
        <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
          <div className="w-3 sm:w-4 md:w-5 h-px" style={{ background: collection.accent }} />
          <span
            className="text-[6px] sm:text-[7px] md:text-[8px] lg:text-[9px] tracking-[2px] sm:tracking-[3px] md:tracking-[4px] uppercase font-medium font-sans"
            style={{ color: collection.accent }}
          >
            {collection.sub}
          </span>
        </div>

        {/* Name */}
        <h3
          className="text-white leading-none mb-1 sm:mb-1.5 md:mb-2 font-serif font-light"
          style={{
            fontSize: isLarge 
              ? 'clamp(1.4rem, 3vw, 3.5rem)' 
              : 'clamp(1.1rem, 1.8vw, 2.4rem)',
            letterSpacing: '0.3px',
          }}
        >
          {collection.name}
        </h3>

        {/* Tagline */}
        <p
          className="text-white/70 text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs leading-relaxed mb-2 sm:mb-3 md:mb-4 lg:mb-5 font-light font-sans max-w-[90%]"
          style={{
            opacity: hovered ? 1 : 0.8,
            transform: hovered ? 'translateY(0)' : 'translateY(4px)',
            transition: 'opacity 0.4s ease 0.05s, transform 0.4s ease 0.05s',
          }}
        >
          {collection.tagline}
        </p>

        {/* Watch models — revealed on hover */}
        <div
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s',
            marginBottom: hovered ? '8px sm:10px md:12px lg:16px' : '0',
          }}
        >
          <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2">
            {collection.models.map((m) => (
              <span
                key={m}
                className="text-[5px] sm:text-[6px] md:text-[7px] lg:text-[8px] tracking-[0.5px] sm:tracking-[1px] md:tracking-[1.5px] uppercase px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 border font-medium font-sans"
                style={{
                  borderColor: `${collection.accent}50`,
                  color: collection.accent,
                }}
              >
                {m}
              </span>
            ))}
          </div>
        </div>

        {/* Footer row */}
        <div className="flex items-end justify-between mt-1 sm:mt-2">
          <span className="text-white/40 text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] tracking-[1px] sm:tracking-[1.5px] md:tracking-[2px] uppercase font-sans">
            {collection.price}
          </span>

          <button
            className="flex items-center gap-1.5 sm:gap-2 md:gap-3 text-[6px] sm:text-[7px] md:text-[8px] lg:text-[9px] tracking-[1.5px] sm:tracking-[2px] md:tracking-[3px] uppercase font-medium font-sans transition-all duration-300"
            style={{ color: hovered ? collection.accent : 'rgba(255,255,255,0.55)' }}
          >
            Explore
            <span
              style={{
                display: 'inline-block',
                transform: hovered ? 'translateX(4px)' : 'translateX(0)',
                transition: 'transform 0.3s ease',
              }}
            >
              →
            </span>
          </button>
        </div>
      </div>

      {/* Corner marks - hidden on small screens */}
      <div className="absolute top-2 sm:top-3 md:top-4 lg:top-5 left-2 sm:left-3 md:left-4 lg:left-5 w-2 sm:w-3 md:w-4 lg:w-5 h-2 sm:h-3 md:h-4 lg:h-5 border-t border-l z-10 hidden xs:block" style={{ borderColor: `${collection.accent}25` }} />
      <div className="absolute top-2 sm:top-3 md:top-4 lg:top-5 right-2 sm:right-3 md:right-4 lg:right-5 w-2 sm:w-3 md:w-4 lg:w-5 h-2 sm:h-3 md:h-4 lg:h-5 border-t border-r z-10 hidden xs:block" style={{ borderColor: `${collection.accent}25` }} />
    </div>
  );
}

export default function Catalog() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef as React.RefObject<HTMLElement>, 0.2);

  return (
    <section className="relative z-10 min-h-screen bg-black font-sans">

      {/* Subtle ambient glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 20% 20%, rgba(201,168,76,0.04) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(74,144,196,0.03) 0%, transparent 60%)',
        }}
      />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 py-10 sm:py-14 md:py-18 lg:py-22 xl:py-24">

        {/* ─── Header ─── */}
        <div
          ref={headerRef}
          className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-8 sm:mb-10 md:mb-12 lg:mb-16 xl:mb-20 gap-4 sm:gap-6 md:gap-8"
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.9s ease, transform 0.9s ease',
          }}
        >
          <div className="w-full lg:w-auto">
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3 md:mb-4 lg:mb-5">
              <div className="w-5 sm:w-6 md:w-7 lg:w-8 h-px bg-[#C9A84C]" />
              <span className="text-[7px] sm:text-[8px] md:text-[9px] tracking-[3px] sm:tracking-[4px] md:tracking-[5px] lg:tracking-[6px] uppercase text-[#C9A84C] font-medium">
                Maison Collections
              </span>
            </div>
            <h2
              className="font-serif font-light text-[#F5F0E8] leading-[1.05]"
              style={{
                fontSize: 'clamp(1.6rem, 4.5vw, 4.5rem)',
                letterSpacing: '-0.5px',
              }}
            >
              Four Philosophies
              <br />
              <span className="text-[#3a3a3a]">of Timekeeping</span>
            </h2>
          </div>

          <div className="lg:max-w-xs w-full lg:w-auto">
            <p className="text-xs sm:text-sm text-white/30 leading-relaxed font-light mb-3 sm:mb-4 md:mb-5 lg:mb-6">
              Each collection represents a distinct mastery — from heritage craftsmanship to avant-garde engineering.
            </p>
            <button className="flex items-center gap-2 sm:gap-3 md:gap-4 text-[7px] sm:text-[8px] md:text-[9px] tracking-[2px] sm:tracking-[3px] md:tracking-[4px] uppercase font-medium text-white/40 hover:text-[#C9A84C] transition-colors duration-300 group">
              <span className="w-6 sm:w-8 md:w-10 h-px bg-current transition-all duration-300 group-hover:w-10 sm:group-hover:w-12 md:group-hover:w-14" />
              All Collections
            </button>
          </div>
        </div>

        {/* ─── Main Grid (3 cards) ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2 sm:gap-3">
          {/* First card - large (spans 2 rows on large screens) */}
          <div className="sm:col-span-1 lg:row-span-2 lg:col-span-1">
            <CollectionCard collection={collections[0]} index={0} />
          </div>
          
          {/* Second card */}
          <div className="sm:col-span-1 lg:col-span-1">
            <CollectionCard collection={collections[1]} index={1} />
          </div>
          
          {/* Third card */}
          <div className="sm:col-span-2 lg:col-span-1">
            <CollectionCard collection={collections[2]} index={2} />
          </div>
        </div>

        {/* ─── Bottom bar ─── */}
        <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 pt-5 sm:pt-6 md:pt-8 lg:pt-10 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 md:gap-6">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6">
            {['Heritage', 'Sports', 'Dress'].map((c) => (
              <span
                key={c}
                className="text-[7px] sm:text-[8px] md:text-[9px] tracking-[2px] sm:tracking-[2.5px] md:tracking-[3px] uppercase text-white/25 hover:text-white/60 cursor-pointer transition-colors duration-200 font-medium"
              >
                {c}
              </span>
            ))}
          </div>
          <button className="flex items-center gap-2 sm:gap-3 md:gap-4 text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] tracking-[2px] sm:tracking-[3px] md:tracking-[4px] uppercase font-medium border border-[#C9A84C]/40 hover:border-[#C9A84C] hover:text-[#C9A84C] text-white/50 px-4 sm:px-5 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3 lg:py-3.5 transition-all duration-300 group w-full sm:w-auto justify-center">
            Request Private Viewing
            <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block">→</span>
          </button>
        </div>

      </div>
    </section>
  );
}