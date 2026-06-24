'use client';

import React, { useState } from 'react';
import PageBanner from '../../components/PageBanner/PageBanner';
import NewArrivalsCard from '../../components/ProductCard/ProductCart';

// ===== PRODUCT DATA =====
const products = [
  {
    id: 1,
    name: 'Heritage Chronograph',
    brand: 'WRIST AFFAIR',
    price: '$12,500',
    image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&q=80',
    badge: 'New',
    category: 'Heritage'
  },
  {
    id: 2,
    name: 'Sports Elegance',
    brand: 'WRIST AFFAIR',
    price: '$8,900',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&q=80',
    badge: 'Limited',
    category: 'Sports'
  },
  {
    id: 3,
    name: 'Classic Moonphase',
    brand: 'WRIST AFFAIR',
    price: '$15,200',
    image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=600&q=80',
    badge: 'Best Seller',
    category: 'Dress'
  },
  {
    id: 4,
    name: 'Grand Tourbillon',
    brand: 'WRIST AFFAIR',
    price: '$28,500',
    image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80',
    badge: 'Exclusive',
    category: 'Tourbillon'
  },
  {
    id: 5,
    name: 'Sport Chrono',
    brand: 'WRIST AFFAIR',
    price: '$9,800',
    image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=600&q=80',
    badge: 'Limited',
    category: 'Sports'
  },
  {
    id: 6,
    name: 'Classic Automatic',
    brand: 'WRIST AFFAIR',
    price: '$7,200',
    image: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=600&q=80',
    badge: 'New',
    category: 'Dress'
  },
  {
    id: 7,
    name: 'Heritage Tourbillon',
    brand: 'WRIST AFFAIR',
    price: '$45,000',
    image: 'https://images.unsplash.com/photo-1636567498966-53adef72a19c?w=600&q=80',
    badge: 'Exclusive',
    category: 'Heritage'
  },
  {
    id: 8,
    name: 'Dress Perpetual',
    brand: 'WRIST AFFAIR',
    price: '$18,900',
    image: 'https://images.unsplash.com/photo-1561043433-aaf687c4cf04?w=600&q=80',
    badge: 'New',
    category: 'Dress'
  },
];

const ShopPage: React.FC = () => {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Heritage', 'Sports', 'Dress', 'Tourbillon'];

  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter(p => p.category === filter);

  const handleAddToCart = (id: number) => {
    console.log(`Added to cart: ${id}`);
  };

  const handleWishlist = (id: number) => {
    console.log(`Wishlist toggled: ${id}`);
  };

  return (
    <>
      <PageBanner
        title="Timeless"
        subtitle="Timepieces"
        description="Discover our curated collection of luxury watches, each crafted with precision and passion."
        tag="Our Collection"
      />

      {/* Shop Content */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-3 mb-10 pb-6 border-b border-gray-100">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 text-[10px] tracking-[2px] uppercase font-medium transition-all duration-300 ${
                  filter === cat
                    ? 'bg-black text-white'
                    : 'text-gray-400 hover:text-black hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
            <span className="ml-auto text-xs text-gray-400 font-light font-sans">
              {filteredProducts.length} products
            </span>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
            {filteredProducts.map((product, index) => (
              <NewArrivalsCard
                key={product.id}
                watch={product}
                index={index}
                visible={true}
                onAddToCart={handleAddToCart}
                onWishlist={handleWishlist}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 font-light font-sans">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ShopPage;