'use client';

import React from 'react';
import Image from 'next/image';
import PageBanner from '../../components/PageBanner/PageBanner';

// ===== COMPONENTS =====
const HeroSection: React.FC = () => (
  <PageBanner
    title="The Art of"
    subtitle="Timekeeping"
    description="Since 1906, defining excellence in watchmaking."
    tag="About WRIST AFFAIR"
  />
);

const StorySection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">

          {/* Left Content */}
          <div className="flex flex-col justify-between">
            <div>
              <span className="text-[10px] tracking-[6px] uppercase text-gray-400 font-medium font-sans">
                Our Story
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-black leading-[1.05] mt-3">
                A Legacy of
                <br />
                <span className="text-gray-400">Timeless Excellence</span>
              </h2>
              <div className="w-12 h-px bg-black/20 mt-4 mb-6" />
            </div>

            <div className="space-y-4 flex-1">
              <p className="text-sm md:text-base text-gray-600 leading-relaxed font-light font-sans">
                WRIST AFFAIR was born from a profound vision: to create timepieces that transcend
                generations. Founded in the heart of Geneva, Switzerland, our maison has remained
                dedicated to the art of fine watchmaking for over a century.
              </p>

              <p className="text-sm md:text-base text-gray-600 leading-relaxed font-light font-sans">
                Today, we continue to honor our heritage while embracing innovation, crafting
                watches that are as precise as they are beautiful. Each WRIST AFFAIR timepiece is a
                testament to our unwavering commitment to excellence.
              </p>

              <p className="text-sm md:text-base text-gray-600 leading-relaxed font-light font-sans">
                From the selection of the finest materials to the final assembly, every step is
                performed with meticulous attention to detail. Our master watchmakers spend hundreds
                of hours on each movement, ensuring that every component works in perfect harmony.
              </p>
            </div>

            {/* Story Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-6 mt-4 border-t border-gray-100">
              {[
                { value: '118+', label: 'Years of Heritage' },
                { value: '50+', label: 'International Awards' },
                { value: '80+', label: 'Countries Worldwide' }
              ].map((stat, index) => (
                <div key={index}>
                  <div className="text-2xl font-serif font-light text-black">{stat.value}</div>
                  <div className="text-[10px] tracking-[2px] uppercase text-gray-400 font-medium font-sans">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image - Same Height */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg h-full min-h-[450px]">
            <Image
              src="https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&q=90"
              alt="WRIST AFFAIR Watchmaking"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// ===== MAIN COMPONENT =====
const AboutPage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <StorySection />
    </>
  );
};

export default AboutPage;