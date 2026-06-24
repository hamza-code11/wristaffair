'use client';

import React, { useState } from 'react';

const FooterTab: React.FC = () => {
  const [footerData, setFooterData] = useState({
    companyName: 'Luxe Watches',
    tagline: 'Crafting Timepieces Since 1970',
    socialLinks: [
      { platform: 'Facebook', url: 'https://facebook.com' },
      { platform: 'Instagram', url: 'https://instagram.com' },
      { platform: 'Twitter', url: 'https://twitter.com' },
      { platform: 'YouTube', url: 'https://youtube.com' }
    ],
    footerText: '© 2024 Luxe Watches. All rights reserved.'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newSocialLink, setNewSocialLink] = useState({ platform: '', url: '' });

  const handleSave = () => {
    setIsEditing(false);
    alert('Footer updated successfully!');
  };

  const addSocialLink = () => {
    if (newSocialLink.platform && newSocialLink.url) {
      setFooterData({
        ...footerData,
        socialLinks: [...footerData.socialLinks, newSocialLink]
      });
      setNewSocialLink({ platform: '', url: '' });
    }
  };

  const removeSocialLink = (index: number) => {
    setFooterData({
      ...footerData,
      socialLinks: footerData.socialLinks.filter((_, i) => i !== index)
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-serif font-light text-black">Footer</h3>
          <p className="text-sm text-gray-400 font-sans font-light">Footer links and information</p>
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
      <div className="mb-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
        <div className="text-center">
          <h4 className="text-lg font-serif font-light text-black">{footerData.companyName}</h4>
          <p className="text-xs text-gray-400 font-sans">{footerData.tagline}</p>
          <div className="flex justify-center gap-4 my-3">
            {footerData.socialLinks.map((link, index) => (
              <span key={index} className="text-xs text-gray-400">{link.platform}</span>
            ))}
          </div>
          <p className="text-[10px] text-gray-400 font-sans">{footerData.footerText}</p>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] tracking-[3px] uppercase text-gray-400 mb-2 font-medium font-sans">
              Company Name
            </label>
            <input
              type="text"
              value={footerData.companyName}
              onChange={(e) => setFooterData({ ...footerData, companyName: e.target.value })}
              disabled={!isEditing}
              className={`w-full px-4 py-2.5 border border-gray-200 focus:border-black text-black text-sm focus:outline-none transition-all ${
                isEditing ? 'bg-white' : 'bg-gray-50'
              }`}
            />
          </div>
          <div>
            <label className="block text-[10px] tracking-[3px] uppercase text-gray-400 mb-2 font-medium font-sans">
              Tagline
            </label>
            <input
              type="text"
              value={footerData.tagline}
              onChange={(e) => setFooterData({ ...footerData, tagline: e.target.value })}
              disabled={!isEditing}
              className={`w-full px-4 py-2.5 border border-gray-200 focus:border-black text-black text-sm focus:outline-none transition-all ${
                isEditing ? 'bg-white' : 'bg-gray-50'
              }`}
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] tracking-[3px] uppercase text-gray-400 mb-2 font-medium font-sans">
            Social Links
          </label>
          <div className="space-y-2">
            {footerData.socialLinks.map((link, index) => (
              <div key={index} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                <span className="text-sm text-black font-serif">{link.platform}</span>
                <span className="text-xs text-gray-400 font-sans">{link.url}</span>
                {isEditing && (
                  <button
                    onClick={() => removeSocialLink(index)}
                    className="ml-auto text-xs text-red-500 hover:text-red-600 transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
          {isEditing && (
            <div className="flex items-center gap-3 mt-3">
              <input
                type="text"
                placeholder="Platform"
                value={newSocialLink.platform}
                onChange={(e) => setNewSocialLink({ ...newSocialLink, platform: e.target.value })}
                className="flex-1 px-4 py-2 border border-gray-200 focus:border-black text-black text-sm focus:outline-none"
              />
              <input
                type="text"
                placeholder="URL"
                value={newSocialLink.url}
                onChange={(e) => setNewSocialLink({ ...newSocialLink, url: e.target.value })}
                className="flex-1 px-4 py-2 border border-gray-200 focus:border-black text-black text-sm focus:outline-none"
              />
              <button
                onClick={addSocialLink}
                className="px-4 py-2 text-xs text-white bg-black hover:bg-gray-400 transition-colors"
              >
                Add
              </button>
            </div>
          )}
        </div>

        <div>
          <label className="block text-[10px] tracking-[3px] uppercase text-gray-400 mb-2 font-medium font-sans">
            Footer Text
          </label>
          <input
            type="text"
            value={footerData.footerText}
            onChange={(e) => setFooterData({ ...footerData, footerText: e.target.value })}
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
            <span className="font-medium text-gray-600">Last Updated:</span> Mar 1, 2024 10:00 AM
          </p>
        </div>
      </div>
    </div>
  );
};

export default FooterTab;