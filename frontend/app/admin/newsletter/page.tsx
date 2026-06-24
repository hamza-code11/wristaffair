'use client';

import React, { useState, useMemo } from 'react';

interface Subscriber {
  id: number;
  email: string;
  name: string;
  subscribedDate: string;
  status: 'Active' | 'Unsubscribed' | 'Bounced';
  source: string;
}

const NewsletterPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([
    { id: 1, email: 'john.doe@email.com', name: 'John Doe', subscribedDate: '2024-01-15', status: 'Active', source: 'Website' },
    { id: 2, email: 'jane.smith@email.com', name: 'Jane Smith', subscribedDate: '2024-01-20', status: 'Active', source: 'Checkout' },
    { id: 3, email: 'mike.johnson@email.com', name: 'Mike Johnson', subscribedDate: '2024-02-01', status: 'Active', source: 'Website' },
    { id: 4, email: 'sarah.williams@email.com', name: 'Sarah Williams', subscribedDate: '2024-02-05', status: 'Unsubscribed', source: 'Newsletter' },
    { id: 5, email: 'david.brown@email.com', name: 'David Brown', subscribedDate: '2024-02-10', status: 'Active', source: 'Website' },
    { id: 6, email: 'emily.davis@email.com', name: 'Emily Davis', subscribedDate: '2024-02-15', status: 'Active', source: 'Checkout' },
    { id: 7, email: 'robert.wilson@email.com', name: 'Robert Wilson', subscribedDate: '2024-02-20', status: 'Bounced', source: 'Newsletter' },
    { id: 8, email: 'lisa.miller@email.com', name: 'Lisa Miller', subscribedDate: '2024-03-01', status: 'Active', source: 'Website' },
    { id: 9, email: 'james.taylor@email.com', name: 'James Taylor', subscribedDate: '2024-03-05', status: 'Active', source: 'Checkout' },
    { id: 10, email: 'patricia.anderson@email.com', name: 'Patricia Anderson', subscribedDate: '2024-03-10', status: 'Active', source: 'Website' },
    { id: 11, email: 'richard.martin@email.com', name: 'Richard Martin', subscribedDate: '2024-03-15', status: 'Unsubscribed', source: 'Newsletter' },
    { id: 12, email: 'jennifer.thomas@email.com', name: 'Jennifer Thomas', subscribedDate: '2024-03-20', status: 'Active', source: 'Website' },
    { id: 13, email: 'thomas.jackson@email.com', name: 'Thomas Jackson', subscribedDate: '2024-04-01', status: 'Active', source: 'Checkout' },
    { id: 14, email: 'mary.white@email.com', name: 'Mary White', subscribedDate: '2024-04-05', status: 'Active', source: 'Website' },
    { id: 15, email: 'charles.harris@email.com', name: 'Charles Harris', subscribedDate: '2024-04-10', status: 'Bounced', source: 'Newsletter' },
  ]);
  const itemsPerPage = 10;
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; subscriberId: number | null; subscriberEmail: string }>({
    isOpen: false,
    subscriberId: null,
    subscriberEmail: '',
  });

  // Filter subscribers based on search
  const filteredSubscribers = useMemo(() => {
    if (!searchTerm) return subscribers;
    return subscribers.filter(subscriber =>
      subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscriber.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, subscribers]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredSubscribers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSubscribers = filteredSubscribers.slice(startIndex, endIndex);

  // Reset to first page when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById('newsletter-table')?.scrollIntoView({ behavior: 'smooth' });
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

  // Delete handlers
  const handleDeleteClick = (id: number, email: string) => {
    setDeleteModal({
      isOpen: true,
      subscriberId: id,
      subscriberEmail: email,
    });
  };

  const handleConfirmDelete = () => {
    if (deleteModal.subscriberId) {
      setSubscribers(subscribers.filter(sub => sub.id !== deleteModal.subscriberId));
      setDeleteModal({ isOpen: false, subscriberId: null, subscriberEmail: '' });
    }
  };

  const handleCancelDelete = () => {
    setDeleteModal({ isOpen: false, subscriberId: null, subscriberEmail: '' });
  };

  return (
    <div>
      {/* Header with white background */}
      <div className="bg-white border border-gray-200 p-4 sm:p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-serif font-light text-black">Newsletter</h2>
            <p className="text-sm text-gray-400 font-sans font-light">Manage your subscribers</p>
          </div>
        </div>

        {/* Second Row: Full Width Search */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search subscribers by name or email..."
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
      <div id="newsletter-table" className="bg-white border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-[9px] tracking-[2px] uppercase text-gray-400 font-sans font-medium">#</th>
                <th className="px-4 py-3 text-left text-[9px] tracking-[2px] uppercase text-gray-400 font-sans font-medium">Name</th>
                <th className="px-4 py-3 text-left text-[9px] tracking-[2px] uppercase text-gray-400 font-sans font-medium">Email</th>
                <th className="px-4 py-3 text-left text-[9px] tracking-[2px] uppercase text-gray-400 font-sans font-medium">Subscribed Date</th>
                <th className="px-4 py-3 text-left text-[9px] tracking-[2px] uppercase text-gray-400 font-sans font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {currentSubscribers.length > 0 ? (
                currentSubscribers.map((subscriber, index) => (
                  <tr key={subscriber.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-xs text-gray-400 font-sans font-light">
                      {startIndex + index + 1}
                    </td>
                    <td className="px-4 py-3 text-xs font-serif text-black">{subscriber.name}</td>
                    <td className="px-4 py-3 text-xs text-gray-500 font-sans font-light">{subscriber.email}</td>
                    <td className="px-4 py-3 text-xs text-gray-400 font-sans font-light">
                      {new Date(subscriber.subscribedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <button 
                        onClick={() => handleDeleteClick(subscriber.id, subscriber.email)}
                        className="text-xs text-gray-400 hover:text-red-600 transition-colors font-sans"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-400 font-sans text-sm">
                    No subscribers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredSubscribers.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-4 border-t border-gray-200">
            <div className="text-xs text-gray-400 font-sans">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredSubscribers.length)} of {filteredSubscribers.length} subscribers
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
                Delete Subscriber
              </h3>
              <p className="text-sm text-gray-500 font-sans font-light text-center mb-6">
                Are you sure you want to delete <span className="font-medium text-black">{deleteModal.subscriberEmail}</span>? 
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

export default NewsletterPage;