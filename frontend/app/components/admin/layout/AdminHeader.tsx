'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Bars3Icon,
  ChevronDownIcon,
  ArrowRightOnRectangleIcon,
  HomeIcon,
  UserCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

interface AdminHeaderProps {
  title: string;
  isSidebarOpen: boolean;
  isMobileOpen: boolean;
  isLargeScreen: boolean;
  onToggleSidebar: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ 
  title, 
  isSidebarOpen,
  isMobileOpen,
  isLargeScreen,
  onToggleSidebar 
}) => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    console.log('Logout clicked');
    router.push('/');
  };

  const handleBackToWeb = () => {
    router.push('/');
  };

  // Determine if sidebar/menu is open
  const isOpen = isLargeScreen ? isSidebarOpen : isMobileOpen;

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-premium">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-20">
        {/* Left */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black/10"
            aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            {isOpen ? (
              <XMarkIcon className="w-5 h-5 text-gray-600" />
            ) : (
              <Bars3Icon className="w-5 h-5 text-gray-600" />
            )}
          </button>
          <div className="hidden sm:block">
            <h1 className="text-sm font-serif font-light text-black tracking-[1px]">
              {title}
            </h1>
            <p className="text-[10px] tracking-[2px] uppercase text-gray-400 font-sans font-light">
              Welcome back, Admin
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* Admin Profile with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 group cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200"
            >
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white text-sm font-serif ring-2 ring-black/5 group-hover:ring-black/20 transition-all duration-200">
                  A
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-black font-sans">Admin</p>
                <p className="text-[10px] tracking-[1px] text-gray-400 font-sans font-light">Super Admin</p>
              </div>
              <ChevronDownIcon className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-2xl border border-gray-100 py-2 z-20 animate-fadeInUp origin-top-right">
                  {/* Admin Info */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-black font-sans">Admin</p>
                    <p className="text-xs text-gray-400 font-sans font-light">Super Admin</p>
                    <p className="text-xs text-gray-400 font-sans font-light mt-1">admin@wristaffair.com</p>
                  </div>

                  {/* Back to Web */}
                  <button
                    onClick={handleBackToWeb}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-black transition-colors duration-200"
                  >
                    <HomeIcon className="w-4 h-4" />
                    Back to Website
                  </button>

                  {/* Profile */}
                  <button
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-black transition-colors duration-200"
                  >
                    <UserCircleIcon className="w-4 h-4" />
                    My Profile
                  </button>

                  {/* Divider */}
                  <div className="my-1 border-t border-gray-100" />

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors duration-200"
                  >
                    <ArrowRightOnRectangleIcon className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;