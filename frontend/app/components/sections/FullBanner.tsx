'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const FullBanner: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative z-10 w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] overflow-hidden sticky top-0"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/banner-bg.jpg"
          alt="LUXE Watches Banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content - Right Aligned */}
      <div className="relative h-full flex items-center justify-end z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className={`
            max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl ml-auto text-right
            transition-all duration-1000
            ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 sm:translate-x-12'}
          `}>
            {/* Subtitle */}
            <span className="inline-block text-[8px] sm:text-[9px] md:text-[10px] font-medium text-white/60 tracking-[3px] sm:tracking-[4px] md:tracking-[5px] uppercase mb-2 sm:mb-2.5 md:mb-3">
              Limited Collection
            </span>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-light text-white leading-[1.1] mb-2 sm:mb-2.5 md:mb-3">
              Timeless
              <br />
              <span className="text-white/80">Elegance</span>
            </h2>

            {/* Description */}
            <p className="text-xs sm:text-sm text-white/60 leading-relaxed max-w-xs sm:max-w-sm ml-auto font-light mb-4 sm:mb-5 md:mb-6">
              Discover our exclusive collection of luxury timepieces, 
              crafted with precision and passion for generations.
            </p>

            {/* Buttons - Right Aligned */}
            <div className="flex flex-wrap gap-3 sm:gap-4 justify-end">
              <Link 
                href="/shop"
                className="group inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-white text-black text-[8px] sm:text-[9px] md:text-[10px] font-medium tracking-[2px] sm:tracking-[3px] uppercase transition-all duration-300 hover:bg-black hover:text-white"
              >
                Explore Collection
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link 
                href="/about"
                className="group inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 border border-white/30 text-white text-[8px] sm:text-[9px] md:text-[10px] font-medium tracking-[2px] sm:tracking-[3px] uppercase transition-all duration-300 hover:bg-white hover:text-black"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FullBanner;