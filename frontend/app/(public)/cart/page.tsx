'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PageBanner from '../../components/PageBanner/PageBanner';

// ===== SAMPLE CART DATA =====
const initialCart = [
  {
    id: 1,
    name: 'Heritage Chronograph',
    brand: 'WRIST AFFAIR',
    price: 12500,
    image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&q=80',
    quantity: 1
  },
  {
    id: 3,
    name: 'Classic Moonphase',
    brand: 'WRIST AFFAIR',
    price: 15200,
    image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=600&q=80',
    quantity: 2
  },
  {
    id: 5,
    name: 'Sport Chrono',
    brand: 'WRIST AFFAIR',
    price: 9800,
    image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=600&q=80',
    quantity: 1
  },
];

const CartPage: React.FC = () => {
  const [cart, setCart] = useState(initialCart);

  const updateQuantity = (id: number, change: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const removeItem = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotal = () => {
    return getSubtotal();
  };

  return (
    <>
      <PageBanner
        title="Your"
        subtitle="Cart"
        description="Review your selected timepieces and proceed to checkout."
        tag="Shopping Cart"
      />

      {/* Cart Content */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {cart.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              
              {/* Left - Cart Items */}
              <div className="lg:col-span-2">
                {/* Cart Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 pb-4 border-b border-gray-200">
                  <div>
                    <span className="text-[10px] tracking-[6px] uppercase text-gray-400 font-medium font-sans">
                      Shopping Cart
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-light text-black leading-[1.05] mt-2">
                      {cart.length} {cart.length === 1 ? 'Item' : 'Items'}
                    </h2>
                  </div>
                  <button 
                    onClick={clearCart}
                    className="text-[10px] tracking-[2px] uppercase text-gray-400 hover:text-black transition-colors font-sans font-medium mt-2 sm:mt-0"
                  >
                    Clear Cart
                  </button>
                </div>

                {/* Cart Items List */}
                <div className="space-y-4">
                  {cart.map((item, index) => (
                    <div
                      key={item.id}
                      className={`flex flex-col sm:flex-row items-stretch border border-gray-200 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                    >
                      {/* Image */}
                      <div className="relative w-full sm:w-32 md:w-40 lg:w-48 h-48 sm:h-auto flex-shrink-0 bg-gray-100">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
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

                        {/* Remove */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-gray-400 hover:text-black transition-colors"
                          aria-label="Remove from cart"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right - Order Summary */}
              <div className="lg:col-span-1">
                <div className="border border-gray-200 p-6 bg-white sticky top-24">
                  <h3 className="text-lg font-serif font-light text-black mb-6 pb-4 border-b border-gray-200">
                    Order Summary
                  </h3>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 font-light font-sans">Subtotal</span>
                      <span className="text-black font-serif">${getSubtotal().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 font-light font-sans">Shipping</span>
                      <span className="text-black font-serif">$0.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 font-light font-sans">Tax</span>
                      <span className="text-black font-serif">$0.00</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between">
                      <span className="text-sm font-serif text-black">Total</span>
                      <span className="text-xl font-serif font-light text-black">
                        ${getTotal().toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button className="w-full mt-6 py-3.5 bg-black hover:bg-gray-400 text-white text-[10px] tracking-[3px] uppercase font-medium transition-all duration-300">
                    Proceed to Checkout
                  </button>

                  <div className="mt-4 text-center">
                    <Link
                      href="/shop"
                      className="text-[10px] tracking-[2px] uppercase text-gray-400 hover:text-black transition-colors font-sans font-medium"
                    >
                      Continue Shopping →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Empty Cart State */
            <div className="text-center py-20">
              <div className="text-6xl mb-6 text-gray-200">🛒</div>
              <h3 className="text-2xl font-serif font-light text-black mb-3">Your cart is empty</h3>
              <p className="text-sm text-gray-400 font-light font-sans mb-8 max-w-sm mx-auto">
                Looks like you haven't added any timepieces to your cart yet.
              </p>
              <Link
                href="/shop"
                className="inline-block px-8 py-3.5 bg-black hover:bg-gray-400 text-white text-[10px] tracking-[3px] uppercase font-medium transition-all duration-300"
              >
                Start Shopping
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CartPage;