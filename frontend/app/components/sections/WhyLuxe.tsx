'use client';

import React, { useRef, useEffect, useState } from 'react';

const stats = [
  { value: '118+', label: 'Years of Heritage' },
  { value: '50+',  label: 'International Awards' },
  { value: '80+',  label: 'Countries Worldwide' },
  { value: '100k+',label: 'Happy Collectors' },
];

const features = [
  {
    number: '01',
    title: 'Swiss Made',
    description: 'Every movement is born in Geneva — assembled by hand, regulated to ±2 seconds per day, and certified by independent chronometry institutes.',
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 md:w-[22px] md:h-[22px]">
        <circle cx="12" cy="12" r="9" strokeWidth="1.3" />
        <path strokeLinecap="round" strokeWidth="1.4" d="M12 7v5l3.5 3.5" />
        <path strokeLinecap="round" strokeWidth="1.2" d="M12 3v1M12 20v1M3 12h1M20 12h1" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Premium Materials',
    description: '18k gold, Grade 5 titanium, sapphire crystal glass, and hand-stitched alligator leather straps from the world\'s finest tanneries.',
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 md:w-[22px] md:h-[22px]">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'In-House Movements',
    description: 'Over 400 components assembled under 50× magnification by master watchmakers who each spend 12 years in training.',
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 md:w-[22px] md:h-[22px]">
        <circle cx="12" cy="12" r="3" strokeWidth="1.3" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" d="M10.3 4.3a1.7 1.7 0 013.4 0l.3 1a7 7 0 011.7 1l1-.3a1.7 1.7 0 012.4 2.4l-.3 1a7 7 0 011 1.7l1 .3a1.7 1.7 0 010 3.4l-1 .3a7 7 0 01-1 1.7l.3 1a1.7 1.7 0 01-2.4 2.4l-1-.3a7 7 0 01-1.7 1l-.3 1a1.7 1.7 0 01-3.4 0l-.3-1a7 7 0 01-1.7-1l-1 .3a1.7 1.7 0 01-2.4-2.4l.3-1a7 7 0 01-1-1.7l-1-.3a1.7 1.7 0 010-3.4l1-.3a7 7 0 011-1.7l-.3-1a1.7 1.7 0 012.4-2.4l1 .3a7 7 0 011.7-1z" />
      </svg>
    ),
  },
  {
    number: '04',
    title: '5-Year Warranty',
    description: 'International coverage across 80+ service centres. Every component — movement, case, crystal, and strap — fully guaranteed.',
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 md:w-[22px] md:h-[22px]">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" d="M9 12l2 2 4-4m5.6-4A12 12 0 0112 3a12 12 0 01-8.6 3.04A12 12 0 003 9c0 5.6 3.8 10.3 9 11.6 5.2-1.3 9-6 9-11.6a12 12 0 00-.4-3z" />
      </svg>
    ),
  },
  {
    number: '05',
    title: 'Award Winning',
    description: 'Over 50 prestigious accolades including the Grand Prix d\'Horlogerie de Genève — watchmaking\'s highest honour — five consecutive years.',
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 md:w-[22px] md:h-[22px]">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" d="M11.05 2.93c.3-.92 1.6-.92 1.9 0l1.52 4.67a1 1 0 00.95.69h4.91c.97 0 1.37 1.24.59 1.81l-3.98 2.89a1 1 0 00-.36 1.12l1.52 4.67c.3.92-.76 1.69-1.54 1.12l-3.98-2.89a1 1 0 00-1.18 0l-3.97 2.89c-.78.57-1.84-.2-1.54-1.12l1.52-4.67a1 1 0 00-.36-1.12L2.59 10.1c-.78-.57-.38-1.81.59-1.81h4.91a1 1 0 00.95-.69z" />
      </svg>
    ),
  },
  {
    number: '06',
    title: 'Global Boutiques',
    description: 'Flagship boutiques in 80+ countries — each designed as an architectural statement to welcome collectors at every level.',
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 md:w-[22px] md:h-[22px]">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" d="M3.1 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.9M8 3.9V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.1M15 20.5V18a2 2 0 012-2h3.1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.08) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

const WhyLuxe: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useInView(sectionRef);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 overflow-hidden bg-white py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 2xl:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">

        {/* ── HEADER — two col ── */}
        <div className={`
          grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-10 lg:gap-14 xl:gap-18 items-end mb-8 sm:mb-10 md:mb-12 lg:mb-14 xl:mb-16
          transition-all duration-900
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'}
        `}>
          <div>
            <p className="text-[8px] sm:text-[9px] md:text-[10px] tracking-[4px] sm:tracking-[5px] md:tracking-[6px] uppercase text-gray-500 mb-2 sm:mb-3 md:mb-4 font-sans font-medium">
              Why Choose Luxe
            </p>
            <h2 className="text-[clamp(26px,4.5vw,56px)] font-serif font-light text-black leading-[1.05] tracking-[0.5px]">
              Excellence in<br />
              <em className="italic text-gray-500 font-light">Every Detail</em>
            </h2>
          </div>
          <div className="pb-1">
            <div className="w-6 sm:w-7 md:w-8 lg:w-9 h-px bg-gray-300 mb-3 sm:mb-4 md:mb-5" />
            <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 leading-relaxed font-light font-sans mb-4 sm:mb-5 md:mb-6 lg:mb-7">
              For over a century, LUXE has defined what it means to create a watch truly worthy of the name. Each timepiece is a convergence of art, science, and legacy.
            </p>
            <button
              className="inline-flex items-center gap-2 sm:gap-2.5 px-5 sm:px-6 md:px-7 lg:px-8 py-2.5 sm:py-3 md:py-3.5 text-[8px] sm:text-[9px] tracking-[2px] sm:tracking-[3px] uppercase font-sans font-medium bg-black text-white border-none cursor-pointer transition-colors duration-300 hover:bg-gray-400"
            >
              Our Story <span>→</span>
            </button>
          </div>
        </div>

        {/* ── MAIN LAYOUT ── */}
        <div className={`
          grid grid-cols-1 lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_320px] 2xl:grid-cols-[1fr_340px] gap-[2px] items-stretch
          transition-opacity duration-900 ease-200
          ${visible ? 'opacity-100' : 'opacity-0'}
        `}>
          {/* LEFT — feature rows */}
          <div className="flex flex-col gap-[2px]">
            {/* Top row — 3 cards */}
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-[2px]">
              {features.slice(0, 3).map((f, i) => (
                <FeatureCard key={i} f={f} i={i} hovered={hovered} setHovered={setHovered} visible={visible} />
              ))}
            </div>
            {/* Bottom row — 3 cards */}
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-[2px]">
              {features.slice(3, 6).map((f, i) => (
                <FeatureCard key={i + 3} f={f} i={i + 3} hovered={hovered} setHovered={setHovered} visible={visible} />
              ))}
            </div>
          </div>

          {/* RIGHT — stats panel (dark) - Responsive height */}
          <div className="bg-black flex flex-col justify-center p-5 sm:p-6 md:p-8 lg:p-10 xl:p-12 relative overflow-hidden min-h-[250px] sm:min-h-[280px] md:min-h-[300px] lg:min-h-[320px]">
            {/* Subtle cross-hatch */}
            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 40px)',
            }} />

            <div className="relative flex flex-col justify-center gap-2 sm:gap-3 md:gap-4">
              {stats.map((s, i) => (
                <div key={i} className={`
                  ${i < stats.length - 1 ? 'pb-3 sm:pb-4 md:pb-5 border-b border-white/10' : ''}
                  transition-all duration-700 ease-300
                  ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                `} style={{ transitionDelay: `${0.3 + i * 0.1}s` }}>
                  <div className="text-[clamp(18px,2.2vw,30px)] font-serif font-extralight text-white leading-none mb-0.5 sm:mb-1 tracking-[0.5px]">
                    {s.value}
                  </div>
                  <div className="text-[6px] sm:text-[7px] md:text-[8px] tracking-[1.5px] sm:tracking-[2px] md:tracking-[3px] uppercase text-gray-500 font-sans font-medium">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── Feature Card ── */
const FeatureCard: React.FC<{
  f: typeof features[0];
  i: number;
  hovered: number | null;
  setHovered: (n: number | null) => void;
  visible: boolean;
}> = ({ f, i, hovered, setHovered, visible }) => {
  const isHov = hovered === i;
  return (
    <div
      onMouseEnter={() => setHovered(i)}
      onMouseLeave={() => setHovered(null)}
      className={`
        relative overflow-hidden cursor-default flex flex-col justify-start
        transition-all duration-300
        ${isHov ? 'bg-gray-100' : 'bg-white'}
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}
      `}
      style={{ 
        borderBottom: '1px solid #f0ede8',
        borderRight: '1px solid #f0ede8',
        padding: 'clamp(12px, 2vw, 28px)',
        minHeight: 'clamp(120px, 16vh, 180px)',
        transitionDelay: `${i * 70}ms`,
      }}
    >
      {/* Left accent bar */}
      <div className={`
        absolute left-0 top-0 bottom-0 bg-black transition-all duration-350
        ${isHov ? 'w-0.5' : 'w-0'}
      `} />

      {/* Number + Icon row */}
      <div className="flex items-center justify-between mb-1.5 sm:mb-2 md:mb-3">
        <span className="text-[7px] sm:text-[8px] md:text-[9px] tracking-[1.5px] sm:tracking-[2px] md:tracking-[3px] text-gray-300 font-sans font-medium">
          {f.number}
        </span>
        <div className={`transition-colors duration-300 ${isHov ? 'text-black' : 'text-gray-300'}`}>
          {f.icon}
        </div>
      </div>

      {/* Title */}
      <h3 className={`
        font-serif font-normal mb-1 sm:mb-1.5 md:mb-2 tracking-[0.2px] transition-colors duration-300
        text-[clamp(12px,1.4vw,16px)]
        ${isHov ? 'text-black' : 'text-gray-500'}
      `}>
        {f.title}
      </h3>

      {/* Description */}
      <p className={`
        text-gray-500 leading-relaxed font-light font-sans
        text-[clamp(9px,1vw,12px)]
      `}>
        {f.description}
      </p>
    </div>
  );
};

export default WhyLuxe;