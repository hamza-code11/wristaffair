'use client';

import React from 'react';
import Link from 'next/link';

interface RecentUser {
  id: number;
  name: string;
  email: string;
  role: string;
  lastLogin: string;
  avatar?: string;
}

interface RecentUsersProps {
  users?: RecentUser[];
}

const RecentUsers: React.FC<RecentUsersProps> = ({ users }) => {
  const defaultUsers: RecentUser[] = [
    { id: 1, name: 'John Doe', email: 'john.doe@email.com', role: 'Super Admin', lastLogin: '2024-01-15 10:30 AM' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@email.com', role: 'Admin', lastLogin: '2024-01-15 09:15 AM' },
    { id: 3, name: 'Mike Johnson', email: 'mike.johnson@email.com', role: 'Editor', lastLogin: '2024-01-14 04:45 PM' },
    { id: 4, name: 'Sarah Williams', email: 'sarah.williams@email.com', role: 'Viewer', lastLogin: '2024-01-14 02:30 PM' },
    { id: 5, name: 'David Brown', email: 'david.brown@email.com', role: 'Admin', lastLogin: '2024-01-13 11:20 AM' },
  ];

  const displayUsers = users || defaultUsers;

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Super Admin': return 'text-purple-600 bg-purple-50';
      case 'Admin': return 'text-blue-600 bg-blue-50';
      case 'Editor': return 'text-green-600 bg-green-50';
      case 'Viewer': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div>
          <h3 className="text-sm font-serif font-light text-black">Recent Login Users</h3>
          <p className="text-xs text-gray-400 font-sans font-light">Latest user activity</p>
        </div>
        <Link href="/admin/users" className="text-[10px] tracking-[2px] uppercase text-gray-400 hover:text-black transition-colors font-sans font-medium">
          View All
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-[9px] tracking-[2px] uppercase text-gray-400 font-sans font-medium">User</th>
              <th className="px-4 py-3 text-left text-[9px] tracking-[2px] uppercase text-gray-400 font-sans font-medium">Email</th>
              <th className="px-4 py-3 text-left text-[9px] tracking-[2px] uppercase text-gray-400 font-sans font-medium">Role</th>
              <th className="px-4 py-3 text-left text-[9px] tracking-[2px] uppercase text-gray-400 font-sans font-medium">Last Login</th>
              <th className="px-4 py-3 text-left text-[9px] tracking-[2px] uppercase text-gray-400 font-sans font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {displayUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-serif text-gray-600">
                      {getInitials(user.name)}
                    </div>
                    <span className="text-xs font-serif text-black">{user.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-gray-500 font-sans font-light">{user.email}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-[8px] tracking-[1px] uppercase font-sans font-medium ${getRoleColor(user.role)}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-gray-400 font-sans font-light">{user.lastLogin}</td>
                <td className="px-4 py-3">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    <span className="text-xs text-green-600 font-sans font-light">Active</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentUsers;