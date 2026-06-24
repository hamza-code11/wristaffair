'use client';

import React from 'react';
import {
  ShoppingBagIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@heroicons/react/24/outline';

interface StatsCardsProps {
  stats?: {
    label: string;
    value: string;
    change: string;
    icon: React.ElementType;
    color: string;
    borderColor: string;
  }[];
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  const defaultStats = [
    { 
      label: 'Total Products', 
      value: '247', 
      change: '+12', 
      icon: ShoppingBagIcon, 
      color: 'bg-blue-50 text-blue-600',
      borderColor: 'border-blue-100',
      trend: 'up'
    },
    { 
      label: 'Total Users', 
      value: '3,456', 
      change: '+5.2%', 
      icon: UserGroupIcon, 
      color: 'bg-purple-50 text-purple-600',
      borderColor: 'border-purple-100',
      trend: 'up'
    },
    { 
      label: 'Revenue', 
      value: '$284,500', 
      change: '+15.3%', 
      icon: CurrencyDollarIcon, 
      color: 'bg-green-50 text-green-600',
      borderColor: 'border-green-100',
      trend: 'up'
    },
    { 
      label: 'Conversion Rate', 
      value: '3.8%', 
      change: '+0.6%', 
      icon: ChartBarIcon, 
      color: 'bg-orange-50 text-orange-600',
      borderColor: 'border-orange-100',
      trend: 'up'
    },
  ];

  const displayStats = stats || defaultStats;

  // Get trend icon and color
  const getTrendInfo = (change: string) => {
    const isPositive = change.startsWith('+');
    return {
      icon: isPositive ? ArrowUpIcon : ArrowDownIcon,
      color: isPositive ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50',
    };
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
      {displayStats.map((stat, index) => {
        const trend = getTrendInfo(stat.change);
        const TrendIcon = trend.icon;
        
        return (
          <div 
            key={index} 
            className="group bg-white p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-[11px] text-gray-400 font-sans font-medium tracking-wider uppercase">
                  {stat.label}
                </p>
                <p className="text-2xl font-serif font-light text-gray-900 mt-1.5">
                  {stat.value}
                </p>
                <div className="flex items-center gap-1.5 mt-2.5">
                  <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-medium rounded-full ${trend.color}`}>
                    <TrendIcon className="w-3 h-3" />
                    {stat.change}
                  </span>
                  <span className="text-[10px] text-gray-400 font-sans font-light">
                    vs last month
                  </span>
                </div>
              </div>
              <div className={`w-11 h-11 ${stat.color} flex items-center justify-center rounded-xl flex-shrink-0 ml-4 group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            
            {/* Mini progress bar */}
            <div className="mt-4 pt-4 border-t border-gray-50">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-1000"
                    style={{ 
                      width: `${Math.min(parseInt(stat.change) || 0, 100)}%`,
                      transition: 'width 1.5s ease-in-out'
                    }}
                  />
                </div>
                <span className="text-[9px] text-gray-400 font-sans font-light whitespace-nowrap">
                  {stat.change}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;