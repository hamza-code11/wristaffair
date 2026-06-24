'use client';

import React, { useState, useEffect } from 'react';

interface ChartsProps {
  revenueData?: number[];
  ordersData?: number[];
}

const Charts: React.FC<ChartsProps> = ({ revenueData, ordersData }) => {
  const [chartData, setChartData] = useState({
    revenue: revenueData || [45, 62, 38, 80, 55, 70, 90],
    orders: ordersData || [30, 45, 55, 40, 60, 75, 50]
  });

  // Animate charts on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setChartData({
        revenue: [65, 72, 58, 90, 75, 85, 95],
        orders: [50, 65, 75, 60, 80, 85, 70]
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Weekly performance data
  const weeklyData = [
    { day: 'Mon', value: 78, label: '78%' },
    { day: 'Tue', value: 82, label: '82%' },
    { day: 'Wed', value: 65, label: '65%' },
    { day: 'Thu', value: 90, label: '90%' },
    { day: 'Fri', value: 75, label: '75%' },
    { day: 'Sat', value: 95, label: '95%' },
    { day: 'Sun', value: 88, label: '88%' },
  ];

  // Traffic sources data
  const trafficData = [
    { source: 'Direct', percentage: 35, color: '#3B82F6', change: '+5.2%' },
    { source: 'Organic', percentage: 28, color: '#8B5CF6', change: '+3.8%' },
    { source: 'Social', percentage: 20, color: '#10B981', change: '+12.1%' },
    { source: 'Referral', percentage: 12, color: '#F59E0B', change: '-2.3%' },
    { source: 'Email', percentage: 5, color: '#EF4444', change: '+0.5%' },
  ];

  // Calculate circular chart paths
  const getCircularPath = (percentage: number, index: number, total: number) => {
    const radius = 80;
    const center = 100;
    const startAngle = -90 + (index / total) * 360;
    const endAngle = startAngle + (percentage / 100) * (360 / total * 0.85);
    
    const startRad = startAngle * Math.PI / 180;
    const endRad = endAngle * Math.PI / 180;
    
    const x1 = center + radius * Math.cos(startRad);
    const y1 = center + radius * Math.sin(startRad);
    const x2 = center + radius * Math.cos(endRad);
    const y2 = center + radius * Math.sin(endRad);
    
    const largeArc = (endAngle - startAngle) > 180 ? 1 : 0;
    
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`;
  };

  // Get color based on value
  const getColor = (value: number) => {
    if (value >= 90) return '#10B981';
    if (value >= 75) return '#3B82F6';
    if (value >= 60) return '#F59E0B';
    return '#EF4444';
  };

  // Get gradient colors
  const getGradientColors = (value: number) => {
    if (value >= 90) return 'from-green-500 to-green-400';
    if (value >= 75) return 'from-blue-500 to-blue-400';
    if (value >= 60) return 'from-yellow-500 to-yellow-400';
    return 'from-red-500 to-red-400';
  };

  // Format view count
  const formatViews = (views: number) => {
    if (views >= 1000) {
      return (views / 1000).toFixed(1) + 'K';
    }
    return views.toString();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Monthly Performance - Left (2/3 width) - Circular Chart */}
      <div className="lg:col-span-2 bg-white p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-serif font-light text-black">Weekly Performance</h3>
            <p className="text-xs text-gray-400 font-sans font-light">Daily performance metrics</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-0.5 bg-blue-500"></span>
              <span className="text-[8px] text-gray-400 font-sans">Performance</span>
            </div>
            <span className="px-3 py-1 text-[10px] tracking-[1px] uppercase text-green-600 bg-green-50 border border-green-200 rounded font-sans font-medium">
              +12.4%
            </span>
          </div>
        </div>

        {/* Circular Chart */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Radial Chart */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-56 h-56">
              <svg className="w-full h-full" viewBox="0 0 200 200">
                {/* Background circles */}
                {weeklyData.map((item, index) => {
                  const angle = (index / weeklyData.length) * 360;
                  const radius = 80;
                  const center = 100;
                  const rad = (angle - 90) * Math.PI / 180;
                  const x = center + radius * Math.cos(rad);
                  const y = center + radius * Math.sin(rad);
                  
                  return (
                    <g key={index}>
                      {/* Dots on the circle */}
                      <circle
                        cx={x}
                        cy={y}
                        r="3"
                        fill="#E5E7EB"
                        className="transition-all duration-300"
                      />
                      {/* Active dot with animation */}
                      <circle
                        cx={x}
                        cy={y}
                        r="5"
                        fill="none"
                        stroke={getColor(item.value)}
                        strokeWidth="2"
                        opacity="0"
                      >
                        <animate
                          attributeName="opacity"
                          from="0"
                          to="0.6"
                          dur="1s"
                          begin={`${index * 0.15}s`}
                          fill="freeze"
                        />
                        <animate
                          attributeName="r"
                          from="5"
                          to="12"
                          dur="2s"
                          repeatCount="indefinite"
                          values="5;12;5"
                        />
                      </circle>
                    </g>
                  );
                })}

                {/* Connecting arcs */}
                {weeklyData.map((item, index) => {
                  const nextIndex = (index + 1) % weeklyData.length;
                  const angle1 = (index / weeklyData.length) * 360;
                  const angle2 = (nextIndex / weeklyData.length) * 360;
                  const radius = 80;
                  const center = 100;
                  
                  const rad1 = (angle1 - 90) * Math.PI / 180;
                  const rad2 = (angle2 - 90) * Math.PI / 180;
                  
                  const x1 = center + radius * Math.cos(rad1);
                  const y1 = center + radius * Math.sin(rad1);
                  const x2 = center + radius * Math.cos(rad2);
                  const y2 = center + radius * Math.sin(rad2);
                  
                  const avgValue = (item.value + weeklyData[nextIndex].value) / 2;
                  const color = getColor(avgValue);
                  
                  return (
                    <line
                      key={index}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={color}
                      strokeWidth="3"
                      opacity="0.6"
                    >
                      <animate
                        attributeName="opacity"
                        from="0"
                        to="0.6"
                        dur="0.5s"
                        begin={`${index * 0.1}s`}
                        fill="freeze"
                      />
                    </line>
                  );
                })}

                {/* Center circle with average */}
                <circle cx="100" cy="100" r="45" fill="white" stroke="#E5E7EB" strokeWidth="1" />
                <text
                  x="100"
                  y="92"
                  className="text-2xl font-serif font-light text-black"
                  textAnchor="middle"
                  dominantBaseline="central"
                >
                  {Math.round(weeklyData.reduce((sum, d) => sum + d.value, 0) / weeklyData.length)}%
                </text>
                <text
                  x="100"
                  y="112"
                  className="text-[8px] text-gray-400 font-sans"
                  textAnchor="middle"
                  dominantBaseline="central"
                >
                  Average
                </text>
              </svg>
            </div>
          </div>

          {/* Daily Stats */}
          <div className="flex flex-col justify-center">
            <div className="space-y-3">
              {weeklyData.map((item, index) => (
                <div key={index} className="flex items-center gap-3 group">
                  <span className="text-[10px] text-gray-400 font-sans w-8">
                    {item.day}
                  </span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${getGradientColors(item.value)} transition-all duration-1000`}
                      style={{
                        width: `${item.value}%`,
                        transition: 'width 1s ease-in-out'
                      }}
                    />
                  </div>
                  <span className="text-[10px] font-sans font-medium" style={{ color: getColor(item.value) }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-4 gap-3">
          <div className="text-center p-2 bg-gray-50 rounded-lg border border-gray-100">
            <p className="text-[7px] text-gray-400 font-sans uppercase tracking-wider">Best Day</p>
            <p className="text-sm font-serif font-light text-black">Saturday</p>
            <span className="text-[8px] text-green-500 font-sans font-medium">95%</span>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg border border-gray-100">
            <p className="text-[7px] text-gray-400 font-sans uppercase tracking-wider">Worst Day</p>
            <p className="text-sm font-serif font-light text-black">Wednesday</p>
            <span className="text-[8px] text-yellow-500 font-sans font-medium">65%</span>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg border border-gray-100">
            <p className="text-[7px] text-gray-400 font-sans uppercase tracking-wider">Total Views</p>
            <p className="text-sm font-serif font-light text-black">19.7K</p>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg border border-gray-100">
            <p className="text-[7px] text-gray-400 font-sans uppercase tracking-wider">Growth</p>
            <p className="text-sm font-serif font-light text-green-600">+12.4%</p>
            <span className="text-[8px] text-gray-400 font-sans font-light">vs last week</span>
          </div>
        </div>
      </div>

      {/* Traffic Sources - Right (1/3 width) */}
      <div className="lg:col-span-1 bg-white p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-serif font-light text-black">Traffic Sources</h3>
            <p className="text-xs text-gray-400 font-sans font-light">Where visitors come from</p>
          </div>
        </div>

        {/* Traffic Source Bars */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="space-y-5">
            {trafficData.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-gray-600 font-sans">{item.source}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-serif text-black">{item.percentage}%</span>
                    <span className={`text-[8px] font-sans font-medium ${item.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                      {item.change}
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor: item.color,
                      transition: 'width 1s ease-in-out'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;