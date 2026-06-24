'use client';

import React from 'react';
import Image from 'next/image';

interface PageBannerProps {
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  tag?: string;
}

const PageBanner: React.FC<PageBannerProps> = ({
  title,
  subtitle,
  description,
  image = 'https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=1920&q=90',
  tag = 'WRIST AFFAIR'
}) => {
  return (
    <section className="relative h-[50vh] min-h-[350px] overflow-hidden">
      <Image
        src={image}
        alt={`${tag} - ${title}`}
        fill
        className="object-cover"
        priority
        unoptimized
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent via-60%" />
      <div className="relative h-full flex items-center z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-[10px] tracking-[6px] uppercase text-gray-100 font-medium font-sans">
            {tag}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light text-white leading-[1.1] mt-3">
            {title} <span className="text-gray-400">{subtitle}</span>
          </h1>
          <p className="text-sm md:text-base text-white/60 leading-relaxed mt-3 max-w-lg font-light font-sans">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PageBanner;