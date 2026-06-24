'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  ChartBarIcon,
  ShoppingBagIcon,
  FolderIcon,
  TagIcon,
  TruckIcon,
  UserGroupIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightOnRectangleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

import {
  HomeIcon as HomeIconSolid,
  ChartBarIcon as ChartBarIconSolid,
  ShoppingBagIcon as ShoppingBagIconSolid,
  FolderIcon as FolderIconSolid,
  TagIcon as TagIconSolid,
  TruckIcon as TruckIconSolid,
  UserGroupIcon as UserGroupIconSolid,
  DocumentTextIcon as DocumentTextIconSolid,
  EnvelopeIcon as EnvelopeIconSolid,
  ChatBubbleLeftRightIcon as ChatBubbleLeftRightIconSolid,
} from '@heroicons/react/24/solid';

interface AdminSidebarProps {
  isOpen: boolean;
  isMobileOpen: boolean;
  onClose?: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, isMobileOpen, onClose }) => {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', icon: HomeIcon, iconSolid: HomeIconSolid, href: '/admin' },
    // { name: 'Analytics', icon: ChartBarIcon, iconSolid: ChartBarIconSolid, href: '/admin/analytics' },
    { name: 'Products', icon: ShoppingBagIcon, iconSolid: ShoppingBagIconSolid, href: '/admin/products' },
    { name: 'Categories', icon: FolderIcon, iconSolid: FolderIconSolid, href: '/admin/categories' },
    { name: 'Brands', icon: TagIcon, iconSolid: TagIconSolid, href: '/admin/brands' },
    // { name: 'Orders', icon: TruckIcon, iconSolid: TruckIconSolid, href: '/admin/orders' },
    { name: 'Users', icon: UserGroupIcon, iconSolid: UserGroupIconSolid, href: '/admin/users' },
    { name: 'CMS', icon: DocumentTextIcon, iconSolid: DocumentTextIconSolid, href: '/admin/cms' },
    { name: 'Newsletter', icon: EnvelopeIcon, iconSolid: EnvelopeIconSolid, href: '/admin/newsletter' },
    { name: 'Contacts', icon: ChatBubbleLeftRightIcon, iconSolid: ChatBubbleLeftRightIconSolid, href: '/admin/contacts' },
  ];

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname?.startsWith(href);
  };

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-screen w-[280px] bg-white/95 backdrop-blur-xl border-r border-gray-100
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isMobileOpen ? 'translate-x-0' : ''}
          shadow-2xl
        `}
      >
        {/* Logo - Only Image */}
        <div className="flex items-center justify-center h-20 px-6 border-b border-gray-100">
          <Link href="/admin" className="relative w-50 h-50 transition-transform hover:scale-105 duration-300">
            <Image src="/logo2.png" alt="LUXE" fill className="object-contain" />
          </Link>
        </div>

        {/* Menu */}
        <nav className="p-3 space-y-0.5 overflow-y-auto h-[calc(100vh-80px)] scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
          {menuItems.map((item) => {
            const active = isActive(item.href);
            const Icon = active ? item.iconSolid : item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`
                  group flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200
                  ${active
                    ? 'bg-black text-white shadow-lg shadow-black/20'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                  }
                `}
              >
                <Icon className={`w-5 h-5 transition-colors duration-200 ${active ? 'text-white' : 'text-gray-400 group-hover:text-black'}`} />
                <span className="flex-1">{item.name}</span>
                {active && (
                  <span className="w-1.5 h-1.5 bg-white/60 rounded-full animate-pulse" />
                )}
              </Link>
            );
          })}

          {/* Divider with gradient */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100" />
            </div>
          </div>

          {/* Logout */}
          <button
            className="flex items-center gap-3 px-4 py-3 w-full text-sm font-medium text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 group"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5 transition-colors duration-200 group-hover:text-red-500" />
            Logout
          </button>
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
};

export default AdminSidebar;