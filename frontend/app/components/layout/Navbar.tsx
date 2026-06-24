'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Shop', href: '/shop' },
    { name: 'New Arrivals', href: '/new-arrivals' },
  ];

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-premium border-b border-gray-100' : 'bg-transparent'}
      `}
    >
      <nav className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 md:h-20">
          {/* Left - Logo */}
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-12">
            <Link href="/" className="flex items-center group flex-shrink-0">
              <div className="relative w-28 h-16 sm:w-32 sm:h-18 md:w-40 md:h-22 lg:w-48 lg:h-26 xl:w-56 xl:h-30">
                <Image
                  src="/logo2.png"
                  alt="LUXE Watches"
                  fill
                  priority
                  className={`
                    relative z-10 object-contain transition-all duration-700
                    ${!isScrolled ? 'grayscale brightness-0 invert' : 'grayscale-0'}
                  `}
                />
              </div>
            </Link>

            {/* Navigation Links */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-8">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    text-[10px] xl:text-xs 2xl:text-sm font-medium tracking-[1.5px] xl:tracking-[2px] uppercase py-2 transition-colors relative whitespace-nowrap
                    ${isScrolled ? 'text-gray-400 hover:text-black' : 'text-white/80 hover:text-white'}
                  `}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-black transition-transform duration-300 scale-x-0 group-hover:scale-x-100" />
                </Link>
              ))}
            </div>
          </div>

          {/* Right - Icons & Actions */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6">
            {/* Search */}
            <Link
  href="/search"
  className={`
    p-1.5 md:p-2 rounded-full transition-all duration-300
    ${isScrolled ? 'text-gray-500 hover:text-black hover:bg-gray-50' : 'text-white/80 hover:text-white'}
  `}
>
  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
</Link>

            {/* Wishlist */}
            <Link href="/wishlist" className={`
              relative p-1.5 md:p-2 rounded-full transition-all duration-300
              ${isScrolled ? 'text-gray-500 hover:text-black hover:bg-gray-50' : 'text-white/80 hover:text-white'}
            `}>
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="absolute -top-1 -right-1 w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 bg-black text-white text-[7px] sm:text-[8px] md:text-[10px] rounded-full flex items-center justify-center">
                3
              </span>
            </Link>

            {/* Cart */}
            <Link href="/cart" className={`
              relative p-1.5 md:p-2 rounded-full transition-all duration-300
              ${isScrolled ? 'text-gray-500 hover:text-black hover:bg-gray-50' : 'text-white/80 hover:text-white'}
            `}>
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute -top-1 -right-1 w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 bg-black text-white text-[7px] sm:text-[8px] md:text-[10px] rounded-full flex items-center justify-center">
                2
              </span>
            </Link>

            {/* Divider - Hidden on mobile */}
            <div className={`hidden sm:block h-4 sm:h-5 md:h-6 w-px ${isScrolled ? 'bg-gray-200' : 'bg-white/20'}`} />

            {/* Sign In Button */}
            <Link
              href="/auth/login"
              className={`
                hidden sm:block px-2 sm:px-3 md:px-4 lg:px-5 py-1 sm:py-1.5 md:py-2 text-[8px] sm:text-[9px] md:text-[10px] lg:text-sm font-medium tracking-[1.5px] sm:tracking-[2px] uppercase transition-all duration-300
                ${isScrolled
                  ? 'text-gray-400 hover:text-black hover:bg-gray-50'
                  : 'text-white hover:text-gray-300'
                }
              `}
            >
              Sign In
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-1.5 md:p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-4 h-3 sm:w-5 sm:h-4 md:w-6 md:h-5 flex flex-col justify-between">
                <span className={`w-full h-[1.5px] transition-all ${isScrolled ? 'bg-black' : 'bg-white'}`} />
                <span className={`w-full h-[1.5px] transition-all ${isScrolled ? 'bg-black' : 'bg-white'}`} />
                <span className={`w-full h-[1.5px] transition-all ${isScrolled ? 'bg-black' : 'bg-white'}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-premium-lg border-t border-gray-100 max-h-[80vh] overflow-y-auto">
            <div className="px-4 py-4 sm:py-6 space-y-3 sm:space-y-4">
              {[
                { name: 'Home', href: '/' },
                { name: 'About', href: '/about' },
                { name: 'Shop', href: '/shop' },
                { name: 'New Arrivals', href: '/new-arrivals' },
                { name: 'Sign In', href: '/auth/login' },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-xs sm:text-sm text-gray-400 hover:text-black tracking-wider uppercase py-2 border-b border-gray-50 last:border-0"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Icons Row */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <Link href="#" className="text-gray-400 hover:text-black transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </Link>
                <Link href="/wishlist" className="text-gray-400 hover:text-black transition-colors relative">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-black text-white text-[8px] rounded-full flex items-center justify-center">3</span>
                </Link>
                <Link href="/cart" className="text-gray-400 hover:text-black transition-colors relative">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-black text-white text-[8px] rounded-full flex items-center justify-center">2</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;