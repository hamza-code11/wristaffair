'use client';

import React, { useState, useMemo } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'Super Admin' | 'Admin' | 'Editor' | 'Viewer';
  date: string;
  avatar?: string;
}

const UsersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; userId: number | null; userName: string }>({
    isOpen: false,
    userId: null,
    userName: '',
  });

  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@email.com',
      role: 'Super Admin',
      date: '2024-01-15T10:30:00',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      role: 'Admin',
      date: '2024-01-20T14:20:00',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@email.com',
      role: 'Editor',
      date: '2024-02-01T09:15:00',
    },
    {
      id: 4,
      name: 'Sarah Williams',
      email: 'sarah.williams@email.com',
      role: 'Viewer',
      date: '2024-02-05T16:45:00',
    },
    {
      id: 5,
      name: 'David Brown',
      email: 'david.brown@email.com',
      role: 'Admin',
      date: '2024-02-10T11:00:00',
    },
    {
      id: 6,
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      role: 'Editor',
      date: '2024-02-15T13:30:00',
    },
    {
      id: 7,
      name: 'Robert Wilson',
      email: 'robert.wilson@email.com',
      role: 'Viewer',
      date: '2024-02-20T08:20:00',
    },
    {
      id: 8,
      name: 'Lisa Miller',
      email: 'lisa.miller@email.com',
      role: 'Admin',
      date: '2024-03-01T10:00:00',
    },
    {
      id: 9,
      name: 'James Taylor',
      email: 'james.taylor@email.com',
      role: 'Super Admin',
      date: '2024-03-05T15:10:00',
    },
    {
      id: 10,
      name: 'Patricia Anderson',
      email: 'patricia.anderson@email.com',
      role: 'Editor',
      date: '2024-03-10T12:00:00',
    },
    {
      id: 11,
      name: 'Richard Martin',
      email: 'richard.martin@email.com',
      role: 'Viewer',
      date: '2024-03-15T09:30:00',
    },
    {
      id: 12,
      name: 'Jennifer Thomas',
      email: 'jennifer.thomas@email.com',
      role: 'Admin',
      date: '2024-03-20T14:45:00',
    },
    {
      id: 13,
      name: 'Thomas Jackson',
      email: 'thomas.jackson@email.com',
      role: 'Editor',
      date: '2024-04-01T11:30:00',
    },
    {
      id: 14,
      name: 'Mary White',
      email: 'mary.white@email.com',
      role: 'Viewer',
      date: '2024-04-05T16:20:00',
    },
    {
      id: 15,
      name: 'Charles Harris',
      email: 'charles.harris@email.com',
      role: 'Admin',
      date: '2024-04-10T10:45:00',
    },
  ]);

  const itemsPerPage = 10;

  // Filter users based on search
  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users;
    return users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, users]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  // Reset to first page when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById('users-table')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  // Get role color
  const getRoleColor = (role: string) => {
    switch(role) {
      case 'Super Admin':
        return 'text-purple-600 bg-purple-50';
      case 'Admin':
        return 'text-blue-600 bg-blue-50';
      case 'Editor':
        return 'text-green-600 bg-green-50';
      case 'Viewer':
        return 'text-gray-600 bg-gray-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  // Delete handlers
  const handleDeleteClick = (id: number, name: string) => {
    setDeleteModal({
      isOpen: true,
      userId: id,
      userName: name,
    });
  };

  const handleConfirmDelete = () => {
    if (deleteModal.userId) {
      setUsers(users.filter(user => user.id !== deleteModal.userId));
      setDeleteModal({ isOpen: false, userId: null, userName: '' });
    }
  };

  const handleCancelDelete = () => {
    setDeleteModal({ isOpen: false, userId: null, userName: '' });
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
    <div>
      {/* Header with white background */}
      <div className="bg-white border border-gray-200 p-4 sm:p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-serif font-light text-black">Users</h2>
            <p className="text-sm text-gray-400 font-sans font-light">Manage your team members</p>
          </div>
        </div>

        {/* Second Row: Full Width Search */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search users by name, email, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 focus:border-black text-black text-sm placeholder:text-gray-400 focus:outline-none focus:bg-white transition-all"
            />
            <svg className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Table */}
      <div id="users-table" className="bg-white border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-[9px] tracking-[2px] uppercase text-gray-400 font-sans font-medium">#</th>
                <th className="px-4 py-3 text-left text-[9px] tracking-[2px] uppercase text-gray-400 font-sans font-medium">User</th>
                <th className="px-4 py-3 text-left text-[9px] tracking-[2px] uppercase text-gray-400 font-sans font-medium">Email</th>
                <th className="px-4 py-3 text-left text-[9px] tracking-[2px] uppercase text-gray-400 font-sans font-medium">Role</th>
                <th className="px-4 py-3 text-left text-[9px] tracking-[2px] uppercase text-gray-400 font-sans font-medium">Joined Date</th>
                <th className="px-4 py-3 text-left text-[9px] tracking-[2px] uppercase text-gray-400 font-sans font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {currentUsers.length > 0 ? (
                currentUsers.map((user, index) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-xs text-gray-400 font-sans font-light">
                      {startIndex + index + 1}
                    </td>
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
                    <td className="px-4 py-3 text-xs text-gray-400 font-sans font-light">
                      {formatDate(user.date)}
                    </td>
                    <td className="px-4 py-3">
                      <button 
                        onClick={() => handleDeleteClick(user.id, user.name)}
                        className="text-xs text-gray-400 hover:text-red-600 transition-colors font-sans"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-400 font-sans text-sm">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredUsers.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-4 border-t border-gray-200">
            <div className="text-xs text-gray-400 font-sans">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} users
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1.5 text-xs font-sans transition-colors ${
                  currentPage === 1
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                }`}
              >
                Previous
              </button>

              {getPageNumbers().map((page, index) => (
                <React.Fragment key={index}>
                  {page === '...' ? (
                    <span className="px-2 py-1.5 text-xs text-gray-400">...</span>
                  ) : (
                    <button
                      onClick={() => handlePageChange(page as number)}
                      className={`px-3 py-1.5 text-xs font-sans transition-colors ${
                        currentPage === page
                          ? 'bg-black text-white'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                      }`}
                    >
                      {page}
                    </button>
                  )}
                </React.Fragment>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1.5 text-xs font-sans transition-colors ${
                  currentPage === totalPages
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleCancelDelete}
          />
          
          <div className="relative bg-white w-full max-w-md rounded-lg shadow-2xl animate-fadeInUp">
            <div className="p-6">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              
              <h3 className="text-lg font-serif font-light text-black text-center mb-2">
                Delete User
              </h3>
              <p className="text-sm text-gray-500 font-sans font-light text-center mb-6">
                Are you sure you want to delete user <span className="font-medium text-black">{deleteModal.userName}</span>? 
                This action cannot be undone.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleCancelDelete}
                  className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-600 text-[10px] tracking-[2px] uppercase font-sans font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="flex-1 px-4 py-2.5 bg-red-600 text-white text-[10px] tracking-[2px] uppercase font-sans font-medium hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;