'use client';

import React, { useState } from 'react';

const NavbarTab: React.FC = () => {
  const [navbarData, setNavbarData] = useState({
    logoText: 'LUXE',
    logoLink: '/',
    navItems: [
      { id: '1', label: 'Home', link: '/' },
      { id: '2', label: 'Collection', link: '/collection' },
      { id: '3', label: 'About', link: '/about' },
      { id: '4', label: 'Contact', link: '/contact' }
    ],
    showCart: true,
    showSearch: true
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newNavItem, setNewNavItem] = useState({ label: '', link: '' });

  const handleSave = () => {
    setIsEditing(false);
    alert('Navbar updated successfully!');
  };

  const addNavItem = () => {
    if (newNavItem.label && newNavItem.link) {
      setNavbarData({
        ...navbarData,
        navItems: [
          ...navbarData.navItems,
          { id: Date.now().toString(), label: newNavItem.label, link: newNavItem.link }
        ]
      });
      setNewNavItem({ label: '', link: '' });
    }
  };

  const removeNavItem = (id: string) => {
    setNavbarData({
      ...navbarData,
      navItems: navbarData.navItems.filter(item => item.id !== id)
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-serif font-light text-black">Navbar</h3>
          <p className="text-sm text-gray-400 font-sans font-light">Navigation menu configuration</p>
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
        <div className="flex items-center justify-between">
          <span className="text-xl font-serif font-light text-black">{navbarData.logoText}</span>
          <div className="flex items-center gap-6">
            {navbarData.navItems.map((item) => (
              <span key={item.id} className="text-xs text-gray-600 font-sans">
                {item.label}
              </span>
            ))}
            {navbarData.showSearch && <span className="text-gray-400">🔍</span>}
            {navbarData.showCart && <span className="text-gray-400">🛒</span>}
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] tracking-[3px] uppercase text-gray-400 mb-2 font-medium font-sans">
              Logo Text
            </label>
            <input
              type="text"
              value={navbarData.logoText}
              onChange={(e) => setNavbarData({ ...navbarData, logoText: e.target.value })}
              disabled={!isEditing}
              className={`w-full px-4 py-2.5 border border-gray-200 focus:border-black text-black text-sm focus:outline-none transition-all ${
                isEditing ? 'bg-white' : 'bg-gray-50'
              }`}
            />
          </div>
          <div>
            <label className="block text-[10px] tracking-[3px] uppercase text-gray-400 mb-2 font-medium font-sans">
              Logo Link
            </label>
            <input
              type="text"
              value={navbarData.logoLink}
              onChange={(e) => setNavbarData({ ...navbarData, logoLink: e.target.value })}
              disabled={!isEditing}
              className={`w-full px-4 py-2.5 border border-gray-200 focus:border-black text-black text-sm focus:outline-none transition-all ${
                isEditing ? 'bg-white' : 'bg-gray-50'
              }`}
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] tracking-[3px] uppercase text-gray-400 mb-2 font-medium font-sans">
            Navigation Items
          </label>
          <div className="space-y-2">
            {navbarData.navItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                <span className="text-sm text-black font-serif">{item.label}</span>
                <span className="text-xs text-gray-400 font-sans">{item.link}</span>
                {isEditing && (
                  <button
                    onClick={() => removeNavItem(item.id)}
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
                placeholder="Label"
                value={newNavItem.label}
                onChange={(e) => setNewNavItem({ ...newNavItem, label: e.target.value })}
                className="flex-1 px-4 py-2 border border-gray-200 focus:border-black text-black text-sm focus:outline-none"
              />
              <input
                type="text"
                placeholder="Link"
                value={newNavItem.link}
                onChange={(e) => setNewNavItem({ ...newNavItem, link: e.target.value })}
                className="flex-1 px-4 py-2 border border-gray-200 focus:border-black text-black text-sm focus:outline-none"
              />
              <button
                onClick={addNavItem}
                className="px-4 py-2 text-xs text-white bg-black hover:bg-gray-400 transition-colors"
              >
                Add
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 text-sm text-gray-600 font-sans">
            <input
              type="checkbox"
              checked={navbarData.showSearch}
              onChange={(e) => setNavbarData({ ...navbarData, showSearch: e.target.checked })}
              disabled={!isEditing}
              className="w-4 h-4"
            />
            Show Search
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-600 font-sans">
            <input
              type="checkbox"
              checked={navbarData.showCart}
              onChange={(e) => setNavbarData({ ...navbarData, showCart: e.target.checked })}
              disabled={!isEditing}
              className="w-4 h-4"
            />
            Show Cart
          </label>
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-xs text-gray-400 font-sans font-light">
            <span className="font-medium text-gray-600">Status:</span> Published
          </p>
          <p className="text-xs text-gray-400 font-sans font-light">
            <span className="font-medium text-gray-600">Last Updated:</span> Feb 1, 2024 9:15 AM
          </p>
        </div>
      </div>
    </div>
  );
};

export default NavbarTab;