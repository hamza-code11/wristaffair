'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface Watch {
  id: number;
  name: string;
  brand: string;
  price: string;
  image: string;
  badge?: string;
}

interface NewArrivalsCardProps {
  watch: Watch;
  index?: number;
  visible?: boolean;
  onAddToCart?: (id: number) => void;
  onWishlist?: (id: number) => void;
}

const NewArrivalsCard: React.FC<NewArrivalsCardProps> = ({ 
  watch, 
  index = 0, 
  visible = true,
  onAddToCart,
  onWishlist
}) => {
  const [hovered, setHovered] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    setAdded(true);
    onAddToCart?.(watch.id);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleWishlist = () => {
    setWishlisted(!wishlisted);
    onWishlist?.(watch.id);
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        relative overflow-hidden bg-gray-100
        transition-all duration-700
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
      `}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Badge */}
      {watch.badge && (
        <div className="absolute top-4 left-4 z-10 text-[8px] tracking-[2.5px] uppercase text-white bg-black px-2.5 py-1 font-sans font-medium">
          {watch.badge}
        </div>
      )}

      {/* Image */}
      <div className="relative w-full aspect-square overflow-hidden bg-[#f0ede8]">
        <Image
          src={watch.image}
          alt={watch.name}
          fill
          className={`
            object-cover transition-transform duration-700
            ${hovered ? 'scale-105' : 'scale-100'}
          `}
          unoptimized
        />

        {/* Quick View Overlay */}
        <div className={`
          absolute inset-0 bg-black/30 flex items-center justify-center
          transition-all duration-400
          ${hovered ? 'opacity-100' : 'opacity-0'}
        `}>
          <button className="px-5 py-2.5 bg-white text-black text-[9px] tracking-[2.5px] uppercase font-sans font-medium hover:bg-black hover:text-white transition-colors duration-300">
            Quick View
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="p-4.5 pb-5">
        <div className="flex justify-between items-start mb-3.5">
          <div>
            <h3 className="text-sm font-serif font-normal text-black tracking-[0.3px] mb-1">
              {watch.name}
            </h3>
            <p className="text-[9px] tracking-[3px] uppercase text-gray-500 font-sans font-medium">
              {watch.brand}
            </p>
          </div>
          <span className="text-[13px] font-light text-gray-400 font-sans tracking-[0.5px] mt-0.5">
            {watch.price}
          </span>
        </div>

        {/* Add to Cart + Wishlist row */}
        <div className="flex gap-2">
          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className={`
              flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-[9px] tracking-[2.5px] uppercase font-sans font-medium border border-[#e0ddd8] transition-all duration-300
              ${added 
                ? 'bg-gray-400 text-white' 
                : hovered 
                  ? 'bg-black text-white' 
                  : 'bg-[#f0ede8] text-gray-400'
              }
            `}
          >
            {added ? (
              <>
                <svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Added
              </>
            ) : (
              <>
                <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Add to Cart
              </>
            )}
          </button>

          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            className={`
              w-[42px] h-[42px] flex-shrink-0 flex items-center justify-center border border-[#e0ddd8] transition-all duration-300
              ${wishlisted ? 'bg-black scale-105' : 'bg-[#f0ede8] hover:bg-[#e8e4de]'}
            `}
          >
            <svg
              width="15"
              height="15"
              fill={wishlisted ? '#fff' : 'none'}
              stroke={wishlisted ? '#fff' : '#666'}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewArrivalsCard;