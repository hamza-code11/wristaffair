'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PageBanner from '../../components/PageBanner/PageBanner';

// ===== SAMPLE WISHLIST DATA =====
const initialWishlist = [
  {
    id: 1,
    name: 'Heritage Chronograph',
    brand: 'WRIST AFFAIR',
    price: 12500,
    image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&q=80',
    badge: 'New',
    category: 'Heritage',
    quantity: 1
  },
  {
    id: 3,
    name: 'Classic Moonphase',
    brand: 'WRIST AFFAIR',
    price: 15200,
    image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=600&q=80',
    badge: 'Best Seller',
    category: 'Dress',
    quantity: 1
  },
  {
    id: 5,
    name: 'Sport Chrono',
    brand: 'WRIST AFFAIR',
    price: 9800,
    image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=600&q=80',
    badge: 'Limited',
    category: 'Sports',
    quantity: 1
  },
];

const WishlistPage: React.FC = () => {
  const [wishlist, setWishlist] = useState(initialWishlist);

  const updateQuantity = (id: number, change: number) => {
    setWishlist(wishlist.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const removeItem = (id: number) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };

  const clearAll = () => {
    setWishlist([]);
  };

  const getTotalPrice = () => {
    return wishlist.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <>
      <PageBanner
        title="Your"
        subtitle="Wishlist"
        description="Save your favorite timepieces and come back to them anytime."
        tag="My Collection"
      />

      {/* Wishlist Content */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {wishlist.length > 0 ? (
            <>
              {/* Wishlist Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 pb-4 border-b border-gray-200">
                <div>
                  <span className="text-[10px] tracking-[6px] uppercase text-gray-400 font-medium font-sans">
                    Saved Items
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-light text-black leading-[1.05] mt-2">
                    {wishlist.length} {wishlist.length === 1 ? 'Timepiece' : 'Timepieces'}
                  </h2>
                </div>
                <button 
                  onClick={clearAll}
                  className="text-[10px] tracking-[2px] uppercase text-gray-400 hover:text-black transition-colors font-sans font-medium mt-2 sm:mt-0"
                >
                  Clear All
                </button>
              </div>

              {/* Horizontal List - With Bottom Margin */}
              <div className="space-y-4">
                {wishlist.map((item, index) => (
                  <div
                    key={item.id}
                    className={`flex flex-col sm:flex-row items-stretch border border-gray-200 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    {/* Image - Full height left */}
                    <div className="relative w-full sm:w-32 md:w-40 lg:w-48 h-48 sm:h-auto flex-shrink-0 bg-gray-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      {item.badge && (
                        <span className="absolute top-2 left-2 text-[6px] tracking-[1.5px] uppercase text-white bg-black px-2 py-0.5 font-sans font-medium">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 gap-3 sm:gap-4">
                      {/* Name & Price */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-serif text-black">
                          {item.name}
                        </h3>
                        <p className="text-[9px] tracking-[3px] uppercase text-gray-400 font-sans font-medium mt-0.5">
                          {item.brand}
                        </p>
                        <p className="text-sm font-light text-gray-400 font-sans mt-1">
                          ${item.price.toLocaleString()}
                        </p>
                      </div>

                      {/* Quantity & Subtotal */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-gray-300">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="px-3 py-1.5 text-gray-400 hover:text-black hover:bg-gray-100 transition-colors"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="px-3 py-1.5 text-sm font-light text-black min-w-[30px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="px-3 py-1.5 text-gray-400 hover:text-black hover:bg-gray-100 transition-colors"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>

                        <span className="text-sm font-serif text-black min-w-[80px] text-right">
                          ${(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <button
                          className="px-4 py-2 bg-black hover:bg-gray-400 text-white text-[9px] tracking-[2px] uppercase font-sans font-medium transition-colors whitespace-nowrap"
                        >
                          Add to Cart
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-gray-400 hover:text-black transition-colors"
                          aria-label="Remove from wishlist"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-sm text-gray-400 font-light font-sans">Total</span>
                    <span className="text-2xl font-serif font-light text-black ml-3">
                      ${getTotalPrice().toLocaleString()}
                    </span>
                  </div>
                  <button className="px-8 py-3.5 bg-black hover:bg-gray-400 text-white text-[10px] tracking-[3px] uppercase font-medium transition-all duration-300">
                    Add All to Cart
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* Empty Wishlist State */
            <div className="text-center py-20">
              <div className="text-6xl mb-6 text-gray-200">♡</div>
              <h3 className="text-2xl font-serif font-light text-black mb-3">Your wishlist is empty</h3>
              <p className="text-sm text-gray-400 font-light font-sans mb-8 max-w-sm mx-auto">
                Start adding your favorite timepieces to your wishlist and they will appear here.
              </p>
              <Link
                href="/web/shop"
                className="inline-block px-8 py-3.5 bg-black hover:bg-gray-400 text-white text-[10px] tracking-[3px] uppercase font-medium transition-all duration-300"
              >
                Explore Collection
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default WishlistPage;