'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

const testimonials = [
  {
    quote: 'Sit amet tellus cras adipiscing. Sit amet aliquam id diam. Fermentum posuere urna nec tincidunt praesent semper feugiat nibh sed. Vel risus commodo viverra.',
    name: 'Matthew Marc',
    title: 'Professor',
    avatar: '/avatar-1.jpg',
  },
  {
    quote: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum et dolorum fuga harum quidem rerum facilis.',
    name: 'Sarah Johnson',
    title: 'Designer',
    avatar: '/avatar-2.jpg',
  },
  {
    quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim.',
    name: 'James Wilson',
    title: 'Entrepreneur',
    avatar: '/avatar-3.jpg',
  },
];

const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);

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

  const goTo = (index: number) => {
    if (index === active || animating) return;
    setAnimating(true);
    setTimeout(() => { 
      setActive(index); 
      setAnimating(false); 
    }, 320);
  };

  const t = testimonials[active];

  return (
    <section
      ref={sectionRef}
      className="relative z-10 min-h-screen overflow-hidden flex items-center bg-black"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/testimonial-bg.png"
          alt="Watch background"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Gradient Overlay - Responsive */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/40 via-40%"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          
          {/* LEFT - Testimonial Content */}
          <div
            className={`
              transition-all duration-800 ease-out
              ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6 md:-translate-x-10'}
            `}
          >
            {/* Label */}
            <p className="text-[9px] sm:text-[10px] tracking-[4px] sm:tracking-[5px] uppercase text-gray-500 mb-2.5 sm:mb-3.5 font-sans font-medium">
              Clients Reactions
            </p>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-light text-white tracking-[4px] sm:tracking-[6px] uppercase leading-[1.05] mb-6 sm:mb-8 md:mb-10 lg:mb-11">
              Our<br />Testimonials
            </h2>

            {/* Thin top border line */}
            <div className="w-10 h-px bg-gray-500 mb-6 sm:mb-8" />

            {/* Testimonial Card */}
            <div
              className={`
                border border-gray-400/60 p-5 sm:p-6 md:p-8 lg:p-9 relative
                bg-black/30 backdrop-blur-md
                transition-all duration-300 ease-out
                ${animating ? 'opacity-0 translate-y-2.5' : 'opacity-100 translate-y-0'}
              `}
            >
              {/* Opening quote mark */}
              <div className="absolute -top-[14px] sm:-top-[18px] left-5 sm:left-7 text-[56px] sm:text-[64px] md:text-[72px] font-serif text-gray-400 leading-none select-none">
                "
              </div>

              {/* Quote text */}
              <p className="text-white/90 text-xs sm:text-sm md:text-base leading-relaxed font-light tracking-[0.2px] mb-6 sm:mb-8">
                {t.quote}
              </p>

              {/* Divider */}
              <div className="h-px bg-gray-400/60 mb-4 sm:mb-6" />

              {/* Author row */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3 sm:gap-3.5">
                  {/* Avatar */}
                  <div className="relative w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full overflow-hidden bg-gray-400 flex-shrink-0 border border-gray-500 flex items-center justify-center">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <span className="absolute text-xs sm:text-sm md:text-base font-serif text-white">
                      {t.name.charAt(0)}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs sm:text-sm font-serif text-white font-normal tracking-[1px]">
                      {t.name}
                    </h4>
                    <p className="text-[8px] sm:text-[9px] md:text-[10px] tracking-[2px] text-gray-500 uppercase font-sans mt-0.5 font-medium">
                      {t.title}
                    </p>
                  </div>
                </div>

                {/* Closing decorative quote */}
                <div className="text-3xl sm:text-4xl md:text-5xl text-gray-400 leading-none font-serif select-none opacity-90 tracking-[-4px] sm:tracking-[-6px]">
                  ❝❞
                </div>
              </div>
            </div>

            {/* Pagination */}
            <div className="flex gap-4 sm:gap-6 mt-6 sm:mt-8 items-center">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`
                    text-[10px] sm:text-xs tracking-[1px] font-sans transition-all duration-300
                    ${i === active 
                      ? 'text-white border-b border-white pb-0.5 font-medium' 
                      : 'text-gray-500 hover:text-white'
                    }
                  `}
                >
                  {i + 1}
                </button>
              ))}

              {/* Progress line */}
              <div className="ml-2 flex-1 h-px bg-gray-400/60 max-w-[60px] sm:max-w-[80px] relative">
                <div
                  className="absolute left-0 top-0 h-full bg-white transition-all duration-400"
                  style={{ width: `${((active + 1) / testimonials.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* RIGHT - Empty (watch shows through gradient) */}
          <div className="hidden lg:block" />
          
        </div>
      </div>
    </section>
  );
};

export default Testimonials;