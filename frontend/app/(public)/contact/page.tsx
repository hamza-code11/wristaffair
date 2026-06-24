'use client';

import React, { useState } from 'react';
import PageBanner from '../../components/PageBanner/PageBanner';

// ===== COMPONENTS =====
const HeroSection: React.FC = () => (
  <PageBanner
        title="Let's"
        subtitle="Connect"
        description="We'd love to hear from you. Reach out for any inquiries, feedback, or assistance."
        tag="Contact Us"
      />
);

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    console.log('Form submitted:', formData);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <HeroSection />

      {/* Contact Content */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Left - Contact Info */}
            <div className="space-y-8">
              <div>
                <span className="text-[10px] tracking-[6px] uppercase text-gray-400 font-medium font-sans">
                  Contact Information
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-light text-black leading-[1.05] mt-3">
                  Get in <span className="text-gray-400">Touch</span>
                </h2>
                <div className="w-12 h-px bg-black/20 mt-4 mb-6" />
                <p className="text-sm text-gray-500 leading-relaxed font-light font-sans">
                  Have questions about our timepieces or need assistance? We're here to help.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-black transition-colors duration-300 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-serif text-black group-hover:text-gray-400 transition-colors">Visit Us</h4>
                    <p className="text-sm text-gray-500 font-light font-sans">
                      42 Rue du Rhône<br />
                      1204 Geneva, Switzerland
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-black transition-colors duration-300 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-serif text-black group-hover:text-gray-400 transition-colors">Email Us</h4>
                    <a href="mailto:info@wristaffair.com" className="text-sm text-gray-500 font-light font-sans hover:text-gray-400 transition-colors">
                      info@wristaffair.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-black transition-colors duration-300 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-serif text-black group-hover:text-gray-400 transition-colors">Call Us</h4>
                    <a href="tel:+41225551234" className="text-sm text-gray-500 font-light font-sans hover:text-gray-400 transition-colors">
                      +41 22 555 1234
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-black transition-colors duration-300 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-serif text-black group-hover:text-gray-400 transition-colors">Opening Hours</h4>
                    <p className="text-sm text-gray-500 font-light font-sans">
                      Monday - Friday: 9:00 AM - 7:00 PM<br />
                      Saturday: 10:00 AM - 5:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-4">
                <h4 className="text-sm font-serif text-black mb-3">Follow Us</h4>
                <div className="flex gap-4">
                  {[
                    { 
                      name: 'Instagram',
                      icon: (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
                        </svg>
                      )
                    },
                    { 
                      name: 'YouTube',
                      icon: (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                      )
                    },
                    { 
                      name: 'Facebook',
                      icon: (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      )
                    },
                    { 
                      name: 'Pinterest',
                      icon: (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.244 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.56-5.409 5.198 0 1.03.397 2.131.891 2.73.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.783 2.748-7.264 7.929-7.264 4.166 0 7.401 2.967 7.401 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.617 0 11.984-5.367 11.984-11.987C23.984 5.367 18.617 0 12.017 0z" />
                        </svg>
                      )
                    },
                  ].map((social) => (
                    <a
                      key={social.name}
                      href="#"
                      aria-label={social.name}
                      className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-black hover:border-gray-400 transition-all duration-300"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right - Premium Contact Form */}
            <div className="bg-[#fafaf8] p-6 sm:p-8 md:p-10 rounded-2xl shadow-premium border border-gray-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-px bg-gray-400" />
                <h3 className="text-xl font-serif font-light text-black">Send a Message</h3>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="group">
                  <label className="block text-[10px] tracking-[2px] uppercase text-gray-400 group-focus-within:text-black transition-colors duration-300 mb-2 font-medium font-sans">
                    Your Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 bg-white border border-gray-200 group-focus-within:border-black text-black text-sm placeholder:text-gray-400 focus:outline-none transition-all duration-300 pl-12"
                      placeholder="John Doe"
                      required
                    />
                    <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-black transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>

                <div className="group">
                  <label className="block text-[10px] tracking-[2px] uppercase text-gray-400 group-focus-within:text-black transition-colors duration-300 mb-2 font-medium font-sans">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 bg-white border border-gray-200 group-focus-within:border-black text-black text-sm placeholder:text-gray-400 focus:outline-none transition-all duration-300 pl-12"
                      placeholder="john@example.com"
                      required
                    />
                    <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-black transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>

                <div className="group">
                  <label className="block text-[10px] tracking-[2px] uppercase text-gray-400 group-focus-within:text-black transition-colors duration-300 mb-2 font-medium font-sans">
                    Subject
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 bg-white border border-gray-200 group-focus-within:border-black text-black text-sm placeholder:text-gray-400 focus:outline-none transition-all duration-300 pl-12"
                      placeholder="e.g., Product Inquiry"
                      required
                    />
                    <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-black transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                    </svg>
                  </div>
                </div>

                <div className="group">
                  <label className="block text-[10px] tracking-[2px] uppercase text-gray-400 group-focus-within:text-black transition-colors duration-300 mb-2 font-medium font-sans">
                    Message
                  </label>
                  <div className="relative">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3.5 bg-white border border-gray-200 group-focus-within:border-black text-black text-sm placeholder:text-gray-400 focus:outline-none transition-all duration-300 resize-none pl-12"
                      placeholder="Your message here..."
                      required
                    />
                    <svg className="w-5 h-5 text-gray-400 absolute left-4 top-4 group-focus-within:text-black transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                </div>

                <button
                  type="submit"
                  className="relative w-full py-4 bg-black hover:bg-gray-400 text-white text-[10px] tracking-[3px] uppercase font-medium transition-all duration-300 overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Send Message
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  <span className="absolute inset-0 bg-gray-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                </button>

                {/* Success Message */}
                {isSubmitted && (
                  <div className="flex items-center gap-3 text-green-600 text-sm font-sans font-light animate-fadeInUp p-4 bg-green-50 border border-green-200 rounded-lg">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Your message has been sent successfully!
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;

