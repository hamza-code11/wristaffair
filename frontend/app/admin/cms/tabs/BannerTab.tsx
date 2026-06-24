'use client';

import React, { useState } from 'react';

const BannerTab: React.FC = () => {
  const [bannerData, setBannerData] = useState({
    title: 'Limited Edition',
    subtitle: 'Exclusive Timepieces',
    ctaText: 'Shop Now',
    ctaLink: '/limited-edition',
    backgroundColor: '#1a1a1a',
    textColor: '#ffffff'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    alert('Banner section updated successfully!');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-serif font-light text-black">Promotional Banner</h3>
          <p className="text-sm text-gray-400 font-sans font-light">Special offers and promotions banner</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 text-xs text-gray-600 border border-gray-200 hover:border-black hover:text-black transition-colors font-sans"
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
          {isEditing && (
            <button
              onClick={handleSave}
              className="px-4 py-2 text-xs text-white bg-black hover:bg-gray-400 transition-colors font-sans"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>

      {/* Preview */}
      <div className="mb-6 bg-gray-50 rounded-lg p-6 border border-gray-200">
        <div 
          className="h-48 rounded-lg overflow-hidden flex items-center justify-center"
          style={{ backgroundColor: bannerData.backgroundColor }}
        >
          <div className="text-center" style={{ color: bannerData.textColor }}>
            <h3 className="text-2xl font-serif font-light mb-1">{bannerData.title}</h3>
            <p className="text-sm opacity-80 mb-3">{bannerData.subtitle}</p>
            <button 
              className="px-6 py-2 text-xs tracking-[2px] uppercase font-medium transition-colors"
              style={{ 
                backgroundColor: bannerData.textColor,
                color: bannerData.backgroundColor 
              }}
            >
              {bannerData.ctaText}
            </button>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] tracking-[3px] uppercase text-gray-400 mb-2 font-medium font-sans">
              Title
            </label>
            <input
              type="text"
              value={bannerData.title}
              onChange={(e) => setBannerData({ ...bannerData, title: e.target.value })}
              disabled={!isEditing}
              className={`w-full px-4 py-2.5 border border-gray-200 focus:border-black text-black text-sm focus:outline-none transition-all ${
                isEditing ? 'bg-white' : 'bg-gray-50'
              }`}
            />
          </div>
          <div>
            <label className="block text-[10px] tracking-[3px] uppercase text-gray-400 mb-2 font-medium font-sans">
              Subtitle
            </label>
            <input
              type="text"
              value={bannerData.subtitle}
              onChange={(e) => setBannerData({ ...bannerData, subtitle: e.target.value })}
              disabled={!isEditing}
              className={`w-full px-4 py-2.5 border border-gray-200 focus:border-black text-black text-sm focus:outline-none transition-all ${
                isEditing ? 'bg-white' : 'bg-gray-50'
              }`}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] tracking-[3px] uppercase text-gray-400 mb-2 font-medium font-sans">
              CTA Text
            </label>
            <input
              type="text"
              value={bannerData.ctaText}
              onChange={(e) => setBannerData({ ...bannerData, ctaText: e.target.value })}
              disabled={!isEditing}
              className={`w-full px-4 py-2.5 border border-gray-200 focus:border-black text-black text-sm focus:outline-none transition-all ${
                isEditing ? 'bg-white' : 'bg-gray-50'
              }`}
            />
          </div>
          <div>
            <label className="block text-[10px] tracking-[3px] uppercase text-gray-400 mb-2 font-medium font-sans">
              CTA Link
            </label>
            <input
              type="text"
              value={bannerData.ctaLink}
              onChange={(e) => setBannerData({ ...bannerData, ctaLink: e.target.value })}
              disabled={!isEditing}
              className={`w-full px-4 py-2.5 border border-gray-200 focus:border-black text-black text-sm focus:outline-none transition-all ${
                isEditing ? 'bg-white' : 'bg-gray-50'
              }`}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] tracking-[3px] uppercase text-gray-400 mb-2 font-medium font-sans">
              Background Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={bannerData.backgroundColor}
                onChange={(e) => setBannerData({ ...bannerData, backgroundColor: e.target.value })}
                disabled={!isEditing}
                className={`w-12 h-10 border border-gray-200 cursor-pointer ${!isEditing && 'opacity-50'}`}
              />
              <input
                type="text"
                value={bannerData.backgroundColor}
                onChange={(e) => setBannerData({ ...bannerData, backgroundColor: e.target.value })}
                disabled={!isEditing}
                className={`flex-1 px-4 py-2.5 border border-gray-200 focus:border-black text-black text-sm focus:outline-none transition-all ${
                  isEditing ? 'bg-white' : 'bg-gray-50'
                }`}
              />
            </div>
          </div>
          <div>
            <label className="block text-[10px] tracking-[3px] uppercase text-gray-400 mb-2 font-medium font-sans">
              Text Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={bannerData.textColor}
                onChange={(e) => setBannerData({ ...bannerData, textColor: e.target.value })}
                disabled={!isEditing}
                className={`w-12 h-10 border border-gray-200 cursor-pointer ${!isEditing && 'opacity-50'}`}
              />
              <input
                type="text"
                value={bannerData.textColor}
                onChange={(e) => setBannerData({ ...bannerData, textColor: e.target.value })}
                disabled={!isEditing}
                className={`flex-1 px-4 py-2.5 border border-gray-200 focus:border-black text-black text-sm focus:outline-none transition-all ${
                  isEditing ? 'bg-white' : 'bg-gray-50'
                }`}
              />
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-xs text-gray-400 font-sans font-light">
            <span className="font-medium text-gray-600">Status:</span> Published
          </p>
          <p className="text-xs text-gray-400 font-sans font-light">
            <span className="font-medium text-gray-600">Last Updated:</span> Jan 20, 2024 2:20 PM
          </p>
        </div>
      </div>
    </div>
  );
};

export default BannerTab;