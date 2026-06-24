'use client';

import React from 'react';
import Link from 'next/link';
import ProductCard from './ProductCart';

interface Product {
  id: number;
  slug: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  badge?: string;
}

interface RelatedProductsProps {
  products: Product[];
  currentProductId: number;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products, currentProductId }) => {
  // Get 4 random related products (excluding current)
  const relatedProducts = products
    .filter(p => p.id !== currentProductId)
    .slice(0, 4);

  if (relatedProducts.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 bg-[#fafaf8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-px bg-gray-400" />
          <span className="text-[10px] tracking-[6px] uppercase text-gray-400 font-medium font-sans">
            You May Also Like
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {relatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              watch={{
                id: product.id,
                name: product.name,
                brand: product.brand,
                price: `$${product.price.toLocaleString()}`,
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
    </section>
  );
};

export default RelatedProducts;