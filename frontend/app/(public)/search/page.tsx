'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PageBanner from '../../components/PageBanner/PageBanner';
import ProductCard from '../../components/ProductCard/ProductCart';


// ===== PRODUCT DATA =====
const products = [
  {
    id: 1,
    slug: 'heritage-chronograph',
    name: 'Heritage Chronograph',
    brand: 'WRIST AFFAIR',
    price: 12500,
    salePrice: 11250,
    image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&q=80',
    badge: 'Sale',
    category: 'Heritage'
  },
  {
    id: 2,
    slug: 'sports-elegance',
    name: 'Sports Elegance',
    brand: 'WRIST AFFAIR',
    price: 8900,
    salePrice: null,
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&q=80',
    badge: 'Limited',
    category: 'Sports'
  },
  {
    id: 3,
    slug: 'classic-moonphase',
    name: 'Classic Moonphase',
    brand: 'WRIST AFFAIR',
    price: 15200,
    salePrice: 13500,
    image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=600&q=80',
    badge: 'Sale',
    category: 'Dress'
  },
  {
    id: 4,
    slug: 'grand-tourbillon',
    name: 'Grand Tourbillon',
    brand: 'WRIST AFFAIR',
    price: 28500,
    salePrice: null,
    image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80',
    badge: 'Exclusive',
    category: 'Tourbillon'
  },
  {
    id: 5,
    slug: 'heritage-tourbillon',
    name: 'Heritage Tourbillon',
    brand: 'WRIST AFFAIR',
    price: 45000,
    salePrice: 38000,
    image: 'https://images.unsplash.com/photo-1636567498966-53adef72a19c?w=600&q=80',
    badge: 'Sale',
    category: 'Heritage'
  },
  {
    id: 6,
    slug: 'sport-chrono',
    name: 'Sport Chrono',
    brand: 'WRIST AFFAIR',
    price: 9800,
    salePrice: null,
    image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=600&q=80',
    badge: 'Limited',
    category: 'Sports'
  },
  {
    id: 7,
    slug: 'dress-perpetual',
    name: 'Dress Perpetual',
    brand: 'WRIST AFFAIR',
    price: 18900,
    salePrice: 16500,
    image: 'https://images.unsplash.com/photo-1561043433-aaf687c4cf04?w=600&q=80',
    badge: 'Sale',
    category: 'Dress'
  }
];

// ===== SUGGESTED SEARCHES =====
const suggestedSearches = [
  'Heritage',
  'Sports',
  'Dress',
  'Tourbillon',
  'Chronograph',
  'Moonphase',
  'Automatic',
  'Limited Edition'
];

// ===== FEATURED PRODUCTS FOR SHOWCASE =====
const featuredProducts = products.slice(0, 4);

const SearchPage: React.FC = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Handle search
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      setShowSuggestions(true);
      setIsLoading(false);
      return;
    }

    setShowSuggestions(false);
    setIsLoading(true);
    const timer = setTimeout(() => {
      const results = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const items = searchTerm ? searchResults : suggestedSearches;
      setSelectedIndex(prev => 
        prev < items.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      if (searchTerm) {
        const product = searchResults[selectedIndex];
        if (product) {
          router.push(`/product/${product.slug}`);
        }
      } else {
        const suggestion = suggestedSearches[selectedIndex];
        if (suggestion) {
          setSearchTerm(suggestion);
        }
      }
    } else if (e.key === 'Escape') {
      router.push('/');
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setShowSuggestions(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <>
      {/* Banner */}
      <PageBanner
        title="Search"
        subtitle="Timepieces"
        description="Find your perfect luxury timepiece by name, brand, or category."
        tag="Discover"
      />

      <main className="bg-white">
        {/* Search Section */}
        <section className="py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative max-w-3xl">
              {/* Search Icon */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Search Input */}
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search for timepieces..."
                className="w-full pl-10 pr-12 py-4 text-lg bg-transparent border-b-2 border-gray-200 focus:border-black text-black placeholder:text-gray-400 focus:outline-none transition-all duration-300"
                autoFocus
              />

              {/* Clear Button */}
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Search Stats */}
            {searchTerm && !isLoading && (
              <p className="text-xs text-gray-400 font-sans font-light mt-4">
                {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} found
              </p>
            )}
          </div>
        </section>

        {/* Suggested Searches */}
        {!searchTerm && showSuggestions && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
            <p className="text-[10px] tracking-[3px] uppercase text-gray-400 font-sans font-medium mb-4">
              People Also Search For
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestedSearches.map((suggestion, index) => (
                <button
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`px-4 py-2 text-xs font-sans font-light transition-all duration-200 ${
                    selectedIndex === index && !searchTerm
                      ? 'border border-black text-black'
                      : 'border border-gray-200 text-gray-500 hover:border-gray-400 hover:text-black'
                  }`}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Results */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {isLoading ? (
            <div className="flex items-center justify-center py-20 max-w-3xl">
              <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : searchTerm && searchResults.length > 0 ? (
            <div className="space-y-2 max-w-3xl">
              {searchResults.map((product, index) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className={`block transition-all duration-200 ${
                    selectedIndex === index ? 'bg-gray-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-4 p-4 border-b border-gray-50 last:border-0">
                    {/* Product Image */}
                    <div className="relative w-16 h-16 flex-shrink-0 bg-gray-100 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-serif text-black group-hover:text-gray-400 transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-[10px] tracking-[3px] uppercase text-gray-400 font-sans font-medium mt-0.5">
                        {product.brand}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-sm font-serif font-light ${
                          product.salePrice ? 'text-red-600' : 'text-black'
                        }`}>
                          ${(product.salePrice || product.price).toLocaleString()}
                        </span>
                        {product.salePrice && (
                          <span className="text-xs font-serif font-light text-gray-400 line-through">
                            ${product.price.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Category Tag */}
                    <div className="hidden sm:block">
                      <span className="text-[8px] tracking-[2px] uppercase text-gray-400 border border-gray-200 px-2 py-1 font-sans font-medium">
                        {product.category}
                      </span>
                    </div>

                    {/* Arrow */}
                    <svg className="w-4 h-4 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          ) : searchTerm && searchResults.length === 0 ? (
            <div className="text-center py-20 max-w-3xl">
              <div className="text-5xl mb-4 text-gray-200">⌚</div>
              <h3 className="text-xl font-serif font-light text-black mb-2">No results found</h3>
              <p className="text-sm text-gray-400 font-sans font-light">
                Try searching for something else or browse our collections.
              </p>
              <Link
                href="/shop"
                className="inline-block mt-6 px-6 py-3 bg-black text-white text-[10px] tracking-[3px] uppercase font-medium hover:bg-gray-400 transition-colors"
              >
                Browse All Products
              </Link>
            </div>
          ) : (
            /* Show Featured Products when no search */
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-gray-400" />
                <span className="text-[10px] tracking-[6px] uppercase text-gray-400 font-medium font-sans">
                  Trending Searches 
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {featuredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    watch={{
                      id: product.id,
                      name: product.name,
                      brand: product.brand,
                      price: `$${(product.salePrice || product.price).toLocaleString()}`,
                      image: product.image,
                      badge: product.badge,
                      slug: product.slug
                    }}
                    index={0}
                    visible={true}
                  />
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default SearchPage;