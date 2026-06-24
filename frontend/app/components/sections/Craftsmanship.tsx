'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

const Craftsmanship: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-rotate images
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, [isVisible]);

  const craftsmanshipData = {
    title: 'Craftsmanship & Watchmaking',
    subtitle: 'Where precision meets artistry',
    description: 'Each LUXE timepiece is a testament to centuries of Swiss watchmaking tradition. Every movement is hand-assembled, every component meticulously crafted, and every detail scrutinized to perfection.',
    stats: [
      { value: '120+', label: 'Years of Heritage' },
      { value: '250+', label: 'Handcrafted Components' },
      { value: '1000+', label: 'Hours of Assembly' },
      { value: '99.8%', label: 'Precision Rate' },
    ],
    features: [
      {
        icon: '⚙️',
        title: 'In-House Movement',
        description: 'Every movement is designed, developed, and manufactured entirely in our Swiss workshops.'
      },
      {
        icon: '🔬',
        title: 'Precision Engineering',
        description: 'Each component is machined to tolerances of 1/1000th of a millimeter for ultimate accuracy.'
      },
      {
        icon: '🖐️',
        title: 'Hand-Assembled',
        description: 'Master watchmakers spend over 100 hours assembling and adjusting each timepiece by hand.'
      },
      {
        icon: '💎',
        title: 'Premium Materials',
        description: 'Only the finest materials - 18k gold, platinum, sapphire crystal, and alligator leather.'
      }
    ],
    images: [
      '/craftsmanship-1.jpg',
      '/craftsmanship-2.jpg',
      '/craftsmanship-3.jpg',
      '/craftsmanship-4.jpg',
    ]
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 bg-black text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="text-xs font-light text-gray-400 tracking-[6px] uppercase">
            Artistry & Innovation
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-white mt-4">
            {craftsmanshipData.title}
          </h2>
          <div className="w-12 h-0.5 bg-white/30 mx-auto mt-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto mt-4 leading-relaxed font-light">
            {craftsmanshipData.description}
          </p>
        </div>

        {/* Main Layout - Image + Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Images */}
          <div className="relative">
            {/* Main Image */}
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-900">
              <div className="absolute inset-0 flex items-center justify-center text-8xl text-gray-700">
                ⌚
              </div>
              {/* Image container with transition */}
              <div
                className="absolute inset-0 transition-opacity duration-1000"
                style={{
                  opacity: isVisible ? 1 : 0,
                }}
              >
                <Image
                  src={craftsmanshipData.images[activeImage]}
                  alt="Craftsmanship"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

              {/* Image counter */}
              <div className="absolute bottom-6 right-6 text-xs tracking-[2px] text-white/60 font-light">
                {String(activeImage + 1).padStart(2, '0')} / {String(craftsmanshipData.images.length).padStart(2, '0')}
              </div>

              {/* Dots indicator */}
              <div className="absolute bottom-6 left-6 flex gap-2">
                {craftsmanshipData.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`
                      transition-all duration-500
                      ${activeImage === i 
                        ? 'w-8 h-0.5 bg-white' 
                        : 'w-4 h-0.5 bg-white/30 hover:bg-white/60'
                      }
                    `}
                  />
                ))}
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {craftsmanshipData.stats.map((stat, index) => (
                <div
                  key={index}
                  className={`
                    text-center p-4 border border-white/5
                    transition-all duration-700
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                  `}
                  style={{ transitionDelay: `${200 + index * 100}ms` }}
                >
                  <div className="text-xl md:text-2xl font-serif font-light text-white">
                    {stat.value}
                  </div>
                  <div className="text-[9px] tracking-[2px] uppercase text-gray-500 mt-1 font-light">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-8">
            {/* Features */}
            {craftsmanshipData.features.map((feature, index) => (
              <div
                key={index}
                className={`
                  group flex gap-5 p-5 border-l-2 border-white/10 hover:border-white/40 transition-all duration-500
                  ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}
                `}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Icon */}
                <div className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>

                <div>
                  <h3 className="text-sm font-serif text-white mb-2 group-hover:text-gray-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed font-light">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}

            {/* Video / Close-up CTA */}
            <div
              className={`
                mt-6 p-6 border border-white/10 bg-white/5
                transition-all duration-700
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
              style={{ transitionDelay: '600ms' }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-light text-white/80">
                    Watch the movement in action
                  </p>
                  <p className="text-xs text-gray-500 tracking-[2px] uppercase font-light">
                    Close-up video of our in-house caliber
                  </p>
                </div>
                <button className="ml-auto text-xs tracking-[3px] uppercase text-white/60 hover:text-white transition-colors border-b border-white/20 hover:border-white/60 pb-0.5">
                  Watch
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Craftsmanship;