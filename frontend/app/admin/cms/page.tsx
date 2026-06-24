'use client';

import React, { useState } from 'react';
import HeroTab from './tabs/HeroTab';
import BannerTab from './tabs/BannerTab';
import NavbarTab from './tabs/NavbarTab';
import FooterTab from './tabs/FooterTab';
import AboutTab from './tabs/AboutTab';
import PremiumCollectionTab from './tabs/PremiumCollectionTab';

interface Tab {
  id: string;
  label: string;
  component: React.ReactNode;
}

const CMSPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('hero');

  const tabs: Tab[] = [
    {
      id: 'hero',
      label: 'Hero Section',
      component: <HeroTab />
    },
    {
      id: 'banner',
      label: 'Promotional Banner',
      component: <BannerTab />
    },
    {
      id: 'navbar',
      label: 'Navigation Bar',
      component: <NavbarTab />
    },
    {
      id: 'footer',
      label: 'Footer',
      component: <FooterTab />
    },
    {
      id: 'about',
      label: 'About Us',
      component: <AboutTab />
    },
    {
      id: 'premium-collection',
      label: 'Premium Collection',
      component: <PremiumCollectionTab />
    }
  ];

  return (
    <div>
      {/* Header with integrated tabs */}
      <div className="bg-white border border-gray-200 rounded-lg mb-6 overflow-hidden">
        {/* Header Content */}
        <div className="p-6 pb-4">
          <h2 className="text-2xl font-serif font-light text-black tracking-wide">Content Management</h2>
          <p className="text-sm text-gray-400 font-sans font-light mt-1">Manage and customize your website content</p>
        </div>

        {/* Tabs */}
        <div className="border-t border-gray-200">
          <div className="overflow-x-auto">
            <nav className="flex px-2" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    relative px-5 py-3 text-sm font-medium font-sans transition-all duration-200 whitespace-nowrap
                    ${activeTab === tab.id
                      ? 'text-black'
                      : 'text-gray-400 hover:text-gray-600'
                    }
                  `}
                >
                  <span>{tab.label}</span>
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        {tabs.find(tab => tab.id === activeTab)?.component}
      </div>
    </div>
  );
};

export default CMSPage;