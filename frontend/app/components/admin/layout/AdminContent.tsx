'use client';

import React from 'react';

interface AdminContentProps {
  children: React.ReactNode;
}

const AdminContent: React.FC<AdminContentProps> = ({ children }) => {
  return (
    <main className="p-4 sm:p-6 lg:p-8 animate-fadeIn">
      {children}
    </main>
  );
};

export default AdminContent;