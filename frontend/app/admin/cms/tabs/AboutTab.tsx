'use client';

import React, { useState } from 'react';

const AboutTab: React.FC = () => {
  const [aboutData, setAboutData] = useState({
    title: 'Our Story',
    content: 'For over five decades, we have been crafting timepieces that transcend generations. Each watch tells a story of precision, passion, and unparalleled craftsmanship.',
    image: '/images/about.jpg',
    buttonText: 'Learn More',
    buttonLink: '/about'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    alert('About section updated successfully!');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-serif font-light text-black">About Us</h3>
          <p className="text-sm text-gray-400 font-sans font-light">Brand story and philosophy</p>
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
        <div className="flex flex-col items-center text-center">
          <h3 className="text-2xl font-serif font-light text-black mb-2">{aboutData.title}</h3>
          <p className="text-sm text-gray-600 max-w-2xl">{aboutData.content}</p>
          <button className="mt-4 px-6 py-2 bg-black text-white text-xs tracking-[2px] uppercase font-medium hover:bg-gray-400 transition-colors">
            {aboutData.buttonText}
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <div>
          <label className="block text-[10px] tracking-[3px] uppercase text-gray-400 mb-2 font-medium font-sans">
            Title
          </label>
          <input
            type="text"
            value={aboutData.title}
            onChange={(e) => setAboutData({ ...aboutData, title: e.target.value })}
            disabled={!isEditing}
            className={`w-full px-4 py-2.5 border border-gray-200 focus:border-black text-black text-sm focus:outline-none transition-all ${
              isEditing ? 'bg-white' : 'bg-gray-50'
            }`}
          />
        </div>

        <div>
          <label className="block text-[10px] tracking-[3px] uppercase text-gray-400 mb-2 font-medium font-sans">
            Content
          </label>
          <textarea
            rows={4}
            value={aboutData.content}
            onChange={(e) => setAboutData({ ...aboutData, content: e.target.value })}
            disabled={!isEditing}
            className={`w-full px-4 py-2.5 border border-gray-200 focus:border-black text-black text-sm focus:outline-none transition-all resize-none ${
              isEditing ? 'bg-white' : 'bg-gray-50'
            }`}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] tracking-[3px] uppercase text-gray-400 mb-2 font-medium font-sans">
              Image URL
            </label>
            <input
              type="text"
              value={aboutData.image}
              onChange={(e) => setAboutData({ ...aboutData, image: e.target.value })}
              disabled={!isEditing}
              className={`w-full px-4 py-2.5 border border-gray-200 focus:border-black text-black text-sm focus:outline-none transition-all ${
                isEditing ? 'bg-white' : 'bg-gray-50'
              }`}
            />
          </div>
          <div>
            <label className="block text-[10px] tracking-[3px] uppercase text-gray-400 mb-2 font-medium font-sans">
              Button Text
            </label>
            <input
              type="text"
              value={aboutData.buttonText}
              onChange={(e) => setAboutData({ ...aboutData, buttonText: e.target.value })}
              disabled={!isEditing}
              className={`w-full px-4 py-2.5 border border-gray-200 focus:border-black text-black text-sm focus:outline-none transition-all ${
                isEditing ? 'bg-white' : 'bg-gray-50'
              }`}
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] tracking-[3px] uppercase text-gray-400 mb-2 font-medium font-sans">
            Button Link
          </label>
          <input
            type="text"
            value={aboutData.buttonLink}
            onChange={(e) => setAboutData({ ...aboutData, buttonLink: e.target.value })}
            disabled={!isEditing}
            className={`w-full px-4 py-2.5 border border-gray-200 focus:border-black text-black text-sm focus:outline-none transition-all ${
              isEditing ? 'bg-white' : 'bg-gray-50'
            }`}
          />
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-xs text-gray-400 font-sans font-light">
            <span className="font-medium text-gray-600">Status:</span> Draft
          </p>
          <p className="text-xs text-gray-400 font-sans font-light">
            <span className="font-medium text-gray-600">Last Updated:</span> Feb 5, 2024 4:45 PM
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutTab;