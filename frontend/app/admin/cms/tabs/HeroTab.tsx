'use client';

import React, { useState } from 'react';

const HeroTab: React.FC = () => {
  const [heroData, setHeroData] = useState({
    heading: 'Luxury Timepieces',
    subheading: 'Discover the Art of Fine Watchmaking',
    buttonText: 'Explore Collection',
    buttonLink: '/collection',
    backgroundImage: '/images/hero-bg.jpg'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    alert('Hero section updated successfully!');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-serif font-light text-black">Hero Section</h3>
          <p className="text-sm text-gray-400 font-sans font-light">Main banner with call to action</p>
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
        <div className="relative h-64 rounded-lg overflow-hidden bg-gradient-to-r from-gray-900 to-gray-700 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-3xl font-serif font-light mb-2">{heroData.heading}</h2>
            <p className="text-sm text-gray-300 mb-4">{heroData.subheading}</p>
            <button className="px-6 py-2 bg-white text-black text-xs tracking-[2px] uppercase font-medium hover:bg-gray-200 transition-colors">
              {heroData.buttonText}
            </button>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] tracking-[3px] uppercase text-gray-400 mb-2 font-medium font-sans">
              Heading
            </label>
            <input
              type="text"
              value={heroData.heading}
              onChange={(e) => setHeroData({ ...heroData, heading: e.target.value })}
              disabled={!isEditing}
              className={`w-full px-4 py-2.5 border border-gray-200 focus:border-black text-black text-sm focus:outline-none transition-all ${
                isEditing ? 'bg-white' : 'bg-gray-50'
              }`}
            />
          </div>
          <div>
            <label className="block text-[10px] tracking-[3px] uppercase text-gray-400 mb-2 font-medium font-sans">
              Subheading
            </label>
            <input
              type="text"
              value={heroData.subheading}
              onChange={(e) => setHeroData({ ...heroData, subheading: e.target.value })}
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
              Button Text
            </label>
            <input
              type="text"
              value={heroData.buttonText}
              onChange={(e) => setHeroData({ ...heroData, buttonText: e.target.value })}
              disabled={!isEditing}
              className={`w-full px-4 py-2.5 border border-gray-200 focus:border-black text-black text-sm focus:outline-none transition-all ${
                isEditing ? 'bg-white' : 'bg-gray-50'
              }`}
            />
          </div>
          <div>
            <label className="block text-[10px] tracking-[3px] uppercase text-gray-400 mb-2 font-medium font-sans">
              Button Link
            </label>
            <input
              type="text"
              value={heroData.buttonLink}
              onChange={(e) => setHeroData({ ...heroData, buttonLink: e.target.value })}
              disabled={!isEditing}
              className={`w-full px-4 py-2.5 border border-gray-200 focus:border-black text-black text-sm focus:outline-none transition-all ${
                isEditing ? 'bg-white' : 'bg-gray-50'
              }`}
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] tracking-[3px] uppercase text-gray-400 mb-2 font-medium font-sans">
            Background Image URL
          </label>
          <input
            type="text"
            value={heroData.backgroundImage}
            onChange={(e) => setHeroData({ ...heroData, backgroundImage: e.target.value })}
            disabled={!isEditing}
            className={`w-full px-4 py-2.5 border border-gray-200 focus:border-black text-black text-sm focus:outline-none transition-all ${
              isEditing ? 'bg-white' : 'bg-gray-50'
            }`}
          />
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-xs text-gray-400 font-sans font-light">
            <span className="font-medium text-gray-600">Status:</span> Published
          </p>
          <p className="text-xs text-gray-400 font-sans font-light">
            <span className="font-medium text-gray-600">Last Updated:</span> Jan 15, 2024 10:30 AM
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroTab;