'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import PageBanner from '../../components/PageBanner/PageBanner';
import RelatedProducts from '../../components/ProductCard/RelatedProducts';

// ===== PRODUCT DATA =====
const products = [
  {
    id: 1,
    slug: 'heritage-chronograph',
    name: 'Heritage Chronograph',
    brand: 'WRIST AFFAIR',
    price: 12500,
    salePrice: 11250,
    description: 'A masterpiece of precision and elegance, the Heritage Chronograph embodies the spirit of classic watchmaking.',
    longDescription: 'The Heritage Chronograph is a celebration of traditional watchmaking artistry. Every component is meticulously crafted and hand-assembled by our master watchmakers in Geneva.',
    image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800&q=80',
    badge: 'Sale',
    category: 'Heritage',
    colors: ['Rose Gold', 'Yellow Gold', 'White Gold'],
    sizes: ['40mm', '42mm', '44mm'],
    specs: {
      'Movement': 'Caliber 3135 Automatic',
      'Diameter': '42 mm',
      'Case': '18kt Everose Gold',
      'Water Resistance': '100 m',
      'Crystal': 'Sapphire',
      'Power Reserve': '70 hours',
      'Strap': 'Brown Alligator Leather'
    },
    features: [
      'Swiss Made',
      'Automatic Movement',
      'Chronograph Function',
      'Date Display',
      'Sapphire Crystal',
      '50m Water Resistance'
    ]
  },
  {
    id: 2,
    slug: 'sports-elegance',
    name: 'Sports Elegance',
    brand: 'WRIST AFFAIR',
    price: 8900,
    salePrice: null,
    description: 'Engineered for performance, the Sports Elegance blends athletic functionality with refined aesthetics.',
    longDescription: 'The Sports Elegance represents the perfect marriage of form and function. Designed for the modern adventurer.',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80',
    badge: 'Limited',
    category: 'Sports',
    colors: ['Steel', 'Black PVD', 'Titanium'],
    sizes: ['42mm', '44mm', '46mm'],
    specs: {
      'Movement': 'Caliber 4130 Chronograph',
      'Diameter': '44 mm',
      'Case': 'Oystersteel',
      'Water Resistance': '300 m',
      'Crystal': 'Sapphire',
      'Power Reserve': '60 hours',
      'Strap': 'Black Rubber'
    },
    features: [
      'Swiss Made',
      'Automatic Movement',
      'Chronograph Function',
      'Date Display',
      'Sapphire Crystal',
      '300m Water Resistance'
    ]
  },
  {
    id: 3,
    slug: 'classic-moonphase',
    name: 'Classic Moonphase',
    brand: 'WRIST AFFAIR',
    price: 15200,
    salePrice: 13500,
    description: 'Capturing the romance of the night sky, the Classic Moonphase features a stunning moon phase complication.',
    longDescription: 'The Classic Moonphase is a tribute to the celestial dance that has guided humanity for millennia.',
    image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&q=80',
    badge: 'Sale',
    category: 'Dress',
    colors: ['Rose Gold', 'Platinum', 'White Gold'],
    sizes: ['38mm', '40mm', '42mm'],
    specs: {
      'Movement': 'Caliber 9001 Moonphase',
      'Diameter': '40 mm',
      'Case': 'Rose Gold',
      'Water Resistance': '50 m',
      'Crystal': 'Sapphire',
      'Power Reserve': '72 hours',
      'Strap': 'White Alligator Leather'
    },
    features: [
      'Swiss Made',
      'Automatic Movement',
      'Moonphase Complication',
      'Date Display',
      'Sapphire Crystal',
      '50m Water Resistance'
    ]
  },
  {
    id: 4,
    slug: 'grand-tourbillon',
    name: 'Grand Tourbillon',
    brand: 'WRIST AFFAIR',
    price: 28500,
    salePrice: null,
    description: 'The pinnacle of watchmaking artistry, the Grand Tourbillon showcases the most complex complication in horology.',
    longDescription: 'The Grand Tourbillon represents the highest achievement in watchmaking. Its tourbillon mechanism is a marvel of micro-engineering.',
    image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&q=80',
    badge: 'Exclusive',
    category: 'Tourbillon',
    colors: ['Black PVD', 'Platinum', 'Rose Gold'],
    sizes: ['40mm', '41mm', '42mm'],
    specs: {
      'Movement': 'Caliber 2836 Tourbillon',
      'Diameter': '41 mm',
      'Case': 'Black PVD',
      'Water Resistance': '30 m',
      'Crystal': 'Sapphire',
      'Power Reserve': '80 hours',
      'Strap': 'Black Alligator Leather'
    },
    features: [
      'Swiss Made',
      'Manual Winding',
      'Tourbillon Complication',
      'Sapphire Crystal',
      'Limited Edition',
      '30m Water Resistance'
    ]
  },
  {
    id: 5,
    slug: 'heritage-tourbillon',
    name: 'Heritage Tourbillon',
    brand: 'WRIST AFFAIR',
    price: 45000,
    salePrice: 38000,
    description: 'A masterpiece combining heritage design with the precision of a tourbillon movement.',
    longDescription: 'The Heritage Tourbillon is a celebration of traditional watchmaking with modern precision. Each piece is individually numbered.',
    image: 'https://images.unsplash.com/photo-1636567498966-53adef72a19c?w=800&q=80',
    badge: 'Sale',
    category: 'Heritage',
    colors: ['Platinum', 'Rose Gold', 'Yellow Gold'],
    sizes: ['40mm', '42mm'],
    specs: {
      'Movement': 'Caliber 2892 Tourbillon',
      'Diameter': '42 mm',
      'Case': 'Platinum',
      'Water Resistance': '50 m',
      'Crystal': 'Sapphire',
      'Power Reserve': '72 hours',
      'Strap': 'Brown Alligator Leather'
    },
    features: [
      'Swiss Made',
      'Manual Winding',
      'Tourbillon Complication',
      'Sapphire Crystal',
      'Limited Edition',
      '50m Water Resistance'
    ]
  },
  {
    id: 6,
    slug: 'sport-chrono',
    name: 'Sport Chrono',
    brand: 'WRIST AFFAIR',
    price: 9800,
    salePrice: null,
    description: 'A sporty chronograph designed for those who value precision and performance.',
    longDescription: 'The Sport Chrono combines rugged durability with sophisticated design, perfect for the modern lifestyle.',
    image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&q=80',
    badge: 'Limited',
    category: 'Sports',
    colors: ['Steel', 'Black DLC', 'Titanium'],
    sizes: ['42mm', '44mm'],
    specs: {
      'Movement': 'Caliber 4130 Chronograph',
      'Diameter': '43 mm',
      'Case': 'Stainless Steel',
      'Water Resistance': '200 m',
      'Crystal': 'Sapphire',
      'Power Reserve': '60 hours',
      'Strap': 'Black Rubber'
    },
    features: [
      'Swiss Made',
      'Automatic Movement',
      'Chronograph Function',
      'Date Display',
      'Sapphire Crystal',
      '200m Water Resistance'
    ]
  },
  {
    id: 7,
    slug: 'dress-perpetual',
    name: 'Dress Perpetual',
    brand: 'WRIST AFFAIR',
    price: 18900,
    salePrice: 16500,
    description: 'An elegant perpetual calendar watch that combines sophistication with functionality.',
    longDescription: 'The Dress Perpetual features a perpetual calendar complication that automatically adjusts for months of different lengths.',
    image: 'https://images.unsplash.com/photo-1561043433-aaf687c4cf04?w=800&q=80',
    badge: 'Sale',
    category: 'Dress',
    colors: ['Rose Gold', 'White Gold', 'Platinum'],
    sizes: ['38mm', '39mm', '41mm'],
    specs: {
      'Movement': 'Caliber 9010 Perpetual',
      'Diameter': '39 mm',
      'Case': 'Rose Gold',
      'Water Resistance': '30 m',
      'Crystal': 'Sapphire',
      'Power Reserve': '72 hours',
      'Strap': 'Black Alligator Leather'
    },
    features: [
      'Swiss Made',
      'Automatic Movement',
      'Perpetual Calendar',
      'Moonphase',
      'Sapphire Crystal',
      '30m Water Resistance'
    ]
  }
];

// ===== COMPONENTS =====
const ProductDetailPage: React.FC = () => {
  const params = useParams();
  const slug = params.slug as string;
  
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    setLoading(true);
    const found = products.find(p => p.slug === slug);
    setProduct(found || null);
    if (found) {
      setSelectedColor(found.colors[0] || '');
      setSelectedSize(found.sizes[0] || '');
    }
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <main className="pt-20 min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-400 mt-4 font-sans font-light">Loading...</p>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="pt-20 min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⌚</div>
          <h2 className="text-2xl font-serif font-light text-black">Product Not Found</h2>
          <p className="text-gray-400 text-sm font-sans font-light mt-2">
            The product you're looking for doesn't exist.
          </p>
          <Link 
            href="/shop" 
            className="mt-6 inline-block px-6 py-3 bg-black text-white text-[10px] tracking-[3px] uppercase font-medium hover:bg-gray-400 transition-colors"
          >
            ← Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const hasSale = product.salePrice && product.salePrice < product.price;

  return (
    <>
      {/* Banner */}
      <PageBanner
        title={product.name}
        subtitle={product.brand}
        description={product.description}
        tag={product.category}
      />

      <main className="bg-white">
        {/* Product Detail */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-8 font-sans font-light">
              <Link href="/" className="hover:text-black transition-colors">Home</Link>
              <span>/</span>
              <Link href="/shop" className="hover:text-black transition-colors">Shop</Link>
              <span>/</span>
              <span className="text-black">{product.name}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              
              {/* Left - Product Images - No Rounded Corners */}
              <div>
                <div className="relative aspect-square bg-gray-100 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                  />
                  {product.badge && (
                    <span className={`absolute top-4 left-4 z-10 px-3 py-1 text-[8px] tracking-[2px] uppercase font-sans font-medium ${
                      product.badge === 'Sale' ? 'bg-red-600 text-white' : 'bg-black text-white'
                    }`}>
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Thumbnails - No Rounded Corners */}
                <div className="flex gap-3 mt-4">
                  {[0, 1, 2].map((i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`relative w-20 h-20 bg-gray-100 overflow-hidden border-2 transition-colors ${
                        selectedImage === i ? 'border-black' : 'border-transparent'
                      }`}
                    >
                      <Image
                        src={product.image}
                        alt={`${product.name} view ${i + 1}`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right - Product Info */}
              <div>
                <div className="border-b border-gray-100 pb-6">
                  <p className="text-[10px] tracking-[4px] uppercase text-gray-400 font-sans font-medium">
                    {product.category}
                  </p>
                  <h1 className="text-3xl sm:text-4xl font-serif font-light text-black mt-2">
                    {product.name}
                  </h1>
                  <p className="text-sm text-gray-400 font-sans font-light mt-1">
                    {product.brand}
                  </p>
                  
                  {/* Price with Sale - Sale Price Larger */}
                  <div className="mt-4 flex items-center gap-3">
                    {hasSale ? (
                      <>
                        <span className="text-3xl sm:text-4xl font-serif font-light text-red-600">
                          ${product.salePrice.toLocaleString()}
                        </span>
                        <span className="text-sm sm:text-base font-serif font-light text-gray-400 line-through">
                          ${product.price.toLocaleString()}
                        </span>
                        <span className="text-[10px] sm:text-xs font-medium text-white bg-red-600 px-2 py-0.5 font-sans">
                          {Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF
                        </span>
                      </>
                    ) : (
                      <span className="text-3xl sm:text-4xl font-serif font-light text-black">
                        ${product.price.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Color Selection */}
                {product.colors && product.colors.length > 0 && (
                  <div className="py-4 border-b border-gray-100">
                    <label className="block text-[10px] tracking-[3px] uppercase text-gray-400 mb-2 font-medium font-sans">
                      Color
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color: string) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-4 py-1.5 text-xs font-sans font-light transition-all duration-300 ${
                            selectedColor === color
                              ? 'border border-black text-black'
                              : 'border border-gray-200 text-gray-400 hover:border-gray-400'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selection */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="py-4 border-b border-gray-100">
                    <label className="block text-[10px] tracking-[3px] uppercase text-gray-400 mb-2 font-medium font-sans">
                      Size
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size: string) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-1.5 text-xs font-sans font-light transition-all duration-300 ${
                            selectedSize === size
                              ? 'border border-black text-black'
                              : 'border border-gray-200 text-gray-400 hover:border-gray-400'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div className="py-4 border-b border-gray-100">
                  <label className="block text-[10px] tracking-[3px] uppercase text-gray-400 mb-2 font-medium font-sans">
                    Quantity
                  </label>
                  <div className="flex items-center border border-gray-200 w-fit">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 text-gray-400 hover:text-black hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="px-4 py-2 text-sm font-light text-black min-w-[40px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 text-gray-400 hover:text-black hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Add to Cart */}
                <div className="py-4 flex gap-4">
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 py-4 text-[10px] tracking-[4px] uppercase font-medium transition-all duration-300 ${
                      isAdded 
                        ? 'bg-gray-400 text-white' 
                        : 'bg-black text-white hover:bg-gray-400'
                    }`}
                  >
                    {isAdded ? '✓ Added to Cart' : 'Add to Cart'}
                  </button>
                  <button className="px-6 py-4 border border-gray-200 hover:border-black transition-colors">
                    <svg className="w-5 h-5 text-gray-400 hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>

                {/* Description only - No Tabs */}
                <div className="mt-8 pt-4 border-t border-gray-100">
                  <h3 className="text-sm font-serif font-light text-black mb-3">Description</h3>
                  <p className="text-sm text-gray-600 leading-relaxed font-light font-sans">
                    {product.longDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        <RelatedProducts products={products} currentProductId={product.id} />
      </main>
    </>
  );
};

export default ProductDetailPage;