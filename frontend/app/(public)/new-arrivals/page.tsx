'use client';

import React from 'react';
import PageBanner from '../../components/PageBanner/PageBanner';
import NewArrivalsCard from '../../components/ProductCard/ProductCart';

// ===== PRODUCT DATA =====
const newArrivals = [
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
    badge: 'New',
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
    badge: 'New',
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
    badge: 'New',
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

const NewArrivalsPage: React.FC = () => {
  const handleAddToCart = (id: number) => {
    console.log(`Added to cart: ${id}`);
  };

  const handleWishlist = (id: number) => {
    console.log(`Wishlist toggled: ${id}`);
  };

  return (
    <>
      <PageBanner
        title="New"
        subtitle="Arrivals"
        description="Discover our latest collection of luxury timepieces, freshly crafted with precision and passion."
        tag="Latest Collection"
      />

      {/* New Arrivals Content */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-gray-400" />
              <span className="text-[10px] tracking-[6px] uppercase text-gray-400 font-medium font-sans">
                Fresh Collection
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-black leading-[1.05] mt-3">
              Just In
            </h2>
            <div className="w-12 h-px bg-black/20 mt-4" />
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
            {newArrivals.map((product, index) => (
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
        </div>
      </section>
    </>
  );
};

export default NewArrivalsPage;