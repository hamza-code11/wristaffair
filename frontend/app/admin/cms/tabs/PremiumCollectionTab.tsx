'use client';

import React, { useState } from 'react';

const PremiumCollectionTab: React.FC = () => {
  const [collectionData, setCollectionData] = useState({
    title: 'Premium Collection',
    subtitle: 'Exclusive Timepieces for the Discerning Collector',
    description: 'Discover our curated selection of the finest luxury watches, each piece representing the pinnacle of horological excellence.',
    displayCount: 6,
    collectionItems: [
      { id: '1', name: 'Heritage Chronograph', price: '$12,500', image: '/images/heritage.jpg' },
      { id: '2', name: 'Sports Elegance', price: '$8,900', image: '/images/sports.jpg' },
      { id: '3', name: 'Classic Moonphase', price: '$15,200', image: '/images/moonphase.jpg' },
      { id: '4', name: 'Grand Tourbillon', price: '$28,500', image: '/images/tourbillon.jpg' }
    ]
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', price: '', image: '' });

  const handleSave = () => {
    setIsEditing(false);
    alert('Premium Collection updated successfully!');
  };

  const addCollectionItem = () => {
    if (newItem.name && newItem.price && newItem.image) {
      setCollectionData({
        ...collectionData,
        collectionItems: [
          ...collectionData.collectionItems,
          { id: Date.now().toString(), ...newItem }
        ]
      });
      setNewItem({ name: '', price: '', image: '' });
    }
  };

  const removeCollectionItem = (id: string) => {
    setCollectionData({
      ...collectionData,
      collectionItems: collectionData.collectionItems.filter(item => item.id !== id)
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-serif font-light text-black">Premium Collection</h3>
          <p className="text-sm text-gray-400 font-sans font-light">Featured premium products section</p>
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
        <h3 className="text-2xl font-serif font-light text-black text-center mb-2">{collectionData.title}</h3>
        <p className="text-sm text-gray-500 text-center mb-1">{collectionData.subtitle}</p>
        <p className="text-xs text-gray-400 text-center mb-4">{collectionData.description}</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {collectionData.collectionItems.map((item) => (
            <div key={item.id} className="bg-white p-3 rounded-lg border border-gray-200 text-center">
              <div className="w-full h-20 bg-gray-200 rounded mb-2 flex items-center justify-center text-xs text-gray-400">
                {item.image ? item.image : 'Image'}
              </div>
              <p className="text-xs font-serif text-black">{item.name}</p>
              <p className="text-xs text-gray-400 font-sans">{item.price}</p>
            </div>
          ))}
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
            value={collectionData.title}
            onChange={(e) => setCollectionData({ ...collectionData, title: e.target.value })}
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
            value={collectionData.subtitle}
            onChange={(e) => setCollectionData({ ...collectionData, subtitle: e.target.value })}
            disabled={!isEditing}
            className={`w-full px-4 py-2.5 border border-gray-200 focus:border-black text-black text-sm focus:outline-none transition-all ${
              isEditing ? 'bg-white' : 'bg-gray-50'
            }`}
          />
        </div>

        <div>
          <label className="block text-[10px] tracking-[3px] uppercase text-gray-400 mb-2 font-medium font-sans">
            Description
          </label>
          <textarea
            rows={2}
            value={collectionData.description}
            onChange={(e) => setCollectionData({ ...collectionData, description: e.target.value })}
            disabled={!isEditing}
            className={`w-full px-4 py-2.5 border border-gray-200 focus:border-black text-black text-sm focus:outline-none transition-all resize-none ${
              isEditing ? 'bg-white' : 'bg-gray-50'
            }`}
          />
        </div>

        <div>
          <label className="block text-[10px] tracking-[3px] uppercase text-gray-400 mb-2 font-medium font-sans">
            Display Count
          </label>
          <input
            type="number"
            value={collectionData.displayCount}
            onChange={(e) => setCollectionData({ ...collectionData, displayCount: parseInt(e.target.value) })}
            disabled={!isEditing}
            className={`w-full px-4 py-2.5 border border-gray-200 focus:border-black text-black text-sm focus:outline-none transition-all ${
              isEditing ? 'bg-white' : 'bg-gray-50'
            }`}
          />
        </div>

        <div>
          <label className="block text-[10px] tracking-[3px] uppercase text-gray-400 mb-2 font-medium font-sans">
            Collection Items
          </label>
          <div className="space-y-2">
            {collectionData.collectionItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                <span className="text-sm text-black font-serif">{item.name}</span>
                <span className="text-xs text-gray-400 font-sans">{item.price}</span>
                {isEditing && (
                  <button
                    onClick={() => removeCollectionItem(item.id)}
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
                placeholder="Name"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                className="flex-1 px-4 py-2 border border-gray-200 focus:border-black text-black text-sm focus:outline-none"
              />
              <input
                type="text"
                placeholder="Price"
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                className="flex-1 px-4 py-2 border border-gray-200 focus:border-black text-black text-sm focus:outline-none"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={newItem.image}
                onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                className="flex-1 px-4 py-2 border border-gray-200 focus:border-black text-black text-sm focus:outline-none"
              />
              <button
                onClick={addCollectionItem}
                className="px-4 py-2 text-xs text-white bg-black hover:bg-gray-400 transition-colors"
              >
                Add
              </button>
            </div>
          )}
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-xs text-gray-400 font-sans font-light">
            <span className="font-medium text-gray-600">Status:</span> Published
          </p>
          <p className="text-xs text-gray-400 font-sans font-light">
            <span className="font-medium text-gray-600">Last Updated:</span> Feb 15, 2024 1:30 PM
          </p>
        </div>
      </div>
    </div>
  );
};

export default PremiumCollectionTab;