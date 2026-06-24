'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    collections: [
      { name: 'Heritage', href: '#' },
      { name: 'Sports', href: '#' },
      { name: 'Dress', href: '#' },
      { name: 'Limited Edition', href: '#' },
      { name: 'Tourbillon', href: '#' },
    ],
    support: [
      { name: 'Contact Us', href: '#' },
      { name: 'FAQ', href: '#' },
      { name: 'Shipping & Returns', href: '#' },
      { name: 'Warranty', href: '#' },
      { name: 'Repairs', href: '#' },
    ],
    company: [
      { name: 'About Us', href: '#' },
      { name: 'Heritage', href: '#' },
      { name: 'Boutiques', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Press', href: '#' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms & Conditions', href: '#' },
      { name: 'Cookie Policy', href: '#' },
      { name: 'Imprint', href: '#' },
    ],
  };

  const socialLinks = [
    { 
      name: 'Instagram', 
      href: '#',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
        </svg>
      )
    },
    { 
      name: 'YouTube', 
      href: '#',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      )
    },
    { 
      name: 'Facebook', 
      href: '#',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      )
    },
    { 
      name: 'Pinterest', 
      href: '#',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.244 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.56-5.409 5.198 0 1.03.397 2.131.891 2.73.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.783 2.748-7.264 7.929-7.264 4.166 0 7.401 2.967 7.401 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.617 0 11.984-5.367 11.984-11.987C23.984 5.367 18.617 0 12.017 0z" />
        </svg>
      )
    },
    { 
      name: 'LinkedIn', 
      href: '#',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      )
    },
  ];

  return (
    <footer className="relative z-10 bg-white text-black border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-8 border-b border-gray-200">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <div className="relative w-32 h-8 sm:w-40 sm:h-10 md:w-48 md:h-12 lg:w-56 lg:h-14">
                <Image 
                  src="/logo2.png" 
                  alt="LUXE Watches"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed font-light max-w-xs">
              Timeless elegance crafted in Switzerland since 1906. 
              Where precision meets artistry.
            </p>
            
            <div className="flex gap-3 mt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-black hover:border-gray-400 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-[10px] tracking-[3px] uppercase text-gray-400 mb-3 font-medium">
              Collections
            </h4>
            <ul className="space-y-2">
              {footerLinks.collections.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-black transition-colors duration-300 font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-[10px] tracking-[3px] uppercase text-gray-400 mb-3 font-medium">
              Support
            </h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-black transition-colors duration-300 font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[10px] tracking-[3px] uppercase text-gray-400 mb-3 font-medium">
              Company
            </h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-black transition-colors duration-300 font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-1">
            <h4 className="text-[10px] tracking-[3px] uppercase text-gray-400 mb-3 font-medium">
              Newsletter
            </h4>
            <p className="text-sm text-gray-500 font-light mb-3">
              Subscribe to receive exclusive offers and updates.
            </p>
            <form className="flex flex-col gap-2.5">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2.5 bg-gray-50 border border-gray-200 text-black text-sm placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors"
              />
              <button className="px-6 py-2.5 bg-black text-white text-[10px] tracking-[3px] uppercase font-medium hover:bg-gray-400 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-400 font-light">
            © {currentYear} LUXE Watches. All rights reserved.
          </p>
          <div className="flex gap-5">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[10px] text-gray-400 hover:text-black transition-colors duration-300 font-medium tracking-[1px]"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-400 font-light tracking-[1px]">
              Made with 
              <span className="text-red-500 mx-1">♥</span> 
              in Switzerland
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;