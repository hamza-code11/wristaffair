'use client';

import React from 'react';
import StatsCards from './dashboard/StatsCards';
import Charts from './dashboard/Charts';
import RecentUsers from './dashboard/RecentUsers';

const AdminDashboard: React.FC = () => {
  return (
    <>
      <StatsCards />
      <Charts />
      <RecentUsers />
    </>
  );
};

export default AdminDashboard;


