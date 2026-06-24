'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(true);
  const pathname = usePathname();

  // Check screen size and set initial states
  useEffect(() => {
    const handleResize = () => {
      const large = window.innerWidth >= 1024;
      setIsLargeScreen(large);
      
      if (large) {
        // On large screens: sidebar open by default, mobile menu closed
        setIsSidebarOpen(true);
        setIsMobileMenuOpen(false);
      } else {
        // On mobile: sidebar closed, mobile menu closed
        setIsSidebarOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getPageTitle = () => {
    const path = pathname?.split('/').pop() || 'Dashboard';
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  const handleToggleSidebar = () => {
    if (isLargeScreen) {
      // On large screens: toggle sidebar
      setIsSidebarOpen(!isSidebarOpen);
    } else {
      // On mobile: toggle mobile menu
      setIsMobileMenuOpen(!isMobileMenuOpen);
    }
  };

  const handleCloseMobile = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <AdminSidebar
        isOpen={isSidebarOpen}
        isMobileOpen={isMobileMenuOpen}
        onClose={handleCloseMobile}
      />
      <div className={`min-h-screen transition-all duration-300 ${isLargeScreen && isSidebarOpen ? 'lg:ml-[280px]' : 'lg:ml-0'}`}>
        <AdminHeader
          title={getPageTitle()}
          isSidebarOpen={isSidebarOpen}
          isMobileOpen={isMobileMenuOpen}
          isLargeScreen={isLargeScreen}
          onToggleSidebar={handleToggleSidebar}
        />
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}