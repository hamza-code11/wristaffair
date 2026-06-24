'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const CategoriesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([
    { id: 1, name: 'Heritage', slug: 'heritage', description: 'Classic vintage-inspired timepieces', products: 12, status: 'Active', image: '/categories/heritage.jpg' },
    { id: 2, name: 'Sports', slug: 'sports', description: 'Performance and athletic watches', products: 18, status: 'Active', image: '/categories/sports.jpg' },
    { id: 3, name: 'Dress', slug: 'dress', description: 'Elegant formal timepieces', products: 10, status: 'Active', image: '/categories/dress.jpg' },
    { id: 4, name: 'Tourbillon', slug: 'tourbillon', description: 'Precision engineering masterpieces', products: 8, status: 'Active', image: '/categories/tourbillon.jpg' },
    { id: 5, name: 'Diver', slug: 'diver', description: 'Water-resistant professional watches', products: 15, status: 'Active', image: '/categories/diver.jpg' },
    { id: 6, name: 'Pilot', slug: 'pilot', description: 'Aviation-inspired timepieces', products: 9, status: 'Active', image: '/categories/pilot.jpg' },
    { id: 7, name: 'Luxury', slug: 'luxury', description: 'Premium high-end timepieces', products: 14, status: 'Active', image: '/categories/luxury.jpg' },
    { id: 8, name: 'Classic', slug: 'classic', description: 'Timeless traditional designs', products: 11, status: 'Active', image: '/categories/classic.jpg' },
    { id: 9, name: 'Modern', slug: 'modern', description: 'Contemporary innovative designs', products: 7, status: 'Active', image: '/categories/modern.jpg' },
    { id: 10, name: 'Limited Edition', slug: 'limited-edition', description: 'Exclusive collectible timepieces', products: 5, status: 'Active', image: '/categories/limited-edition.jpg' },
    { id: 11, name: 'Chronograph', slug: 'chronograph', description: 'Multi-functional timing watches', products: 13, status: 'Active', image: '/categories/chronograph.jpg' },
    { id: 12, name: 'Moonphase', slug: 'moonphase', description: 'Lunar cycle complication watches', products: 6, status: 'Active', image: '/categories/moonphase.jpg' },
    { id: 13, name: 'Skeleton', slug: 'skeleton', description: 'Exposed movement timepieces', products: 4, status: 'Active', image: '/categories/skeleton.jpg' },
    { id: 14, name: 'Vintage', slug: 'vintage', description: 'Retro-inspired classic watches', products: 8, status: 'Active', image: '/categories/vintage.jpg' },
    { id: 15, name: 'Smart', slug: 'smart', description: 'Modern connected timepieces', products: 3, status: 'Active', image: '/categories/smart.jpg' },
  ]);
  const itemsPerPage = 10;
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; categoryId: number | null; categoryName: string }>({
    isOpen: false,
    categoryId: null,
    categoryName: '',
  });

  // Filter categories based on search
  const filteredCategories = useMemo(() => {
    if (!searchTerm) return categories;
    return categories.filter(category =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, categories]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCategories = filteredCategories.slice(startIndex, endIndex);

  // Reset to first page when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById('categories-table')?.scrollIntoView({ behavior: 'smooth' });
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
  const handleDeleteClick = (id: number, name: string) => {
    setDeleteModal({
      isOpen: true,
      categoryId: id,
      categoryName: name,
    });
  };

  const handleConfirmDelete = () => {
    if (deleteModal.categoryId) {
      setCategories(categories.filter(category => category.id !== deleteModal.categoryId));
      setDeleteModal({ isOpen: false, categoryId: null, categoryName: '' });
    }
  };

  const handleCancelDelete = () => {
    setDeleteModal({ isOpen: false, categoryId: null, categoryName: '' });
  };

  return (
    <div>
      {/* Header with white background */}
      <div className="bg-white border border-gray-200 p-4 sm:p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-serif font-light text-black">Categories</h2>
            <p className="text-sm text-gray-400 font-sans font-light">Manage your product categories</p>
          </div>
          <Link
            href="/admin/categories/add"
            className="px-6 py-2.5 bg-black text-white text-[10px] tracking-[3px] uppercase font-medium hover:bg-gray-400 transition-colors whitespace-nowrap"
          >
            Add Category
          </Link>
        </div>

        {/* Second Row: Full Width Search */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search categories by name, slug, or description..."
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
      <div id="categories-table" className="bg-white border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-[9px] tracking-[2px] uppercase text-gray-400 font-sans font-medium">#</th>
                <th className="px-4 py-3 text-left text-[9px] tracking-[2px] uppercase text-gray-400 font-sans font-medium">Image</th>
                <th className="px-4 py-3 text-left text-[9px] tracking-[2px] uppercase text-gray-400 font-sans font-medium">Category Name</th>
                <th className="px-4 py-3 text-left text-[9px] tracking-[2px] uppercase text-gray-400 font-sans font-medium">Slug</th>
                <th className="px-4 py-3 text-left text-[9px] tracking-[2px] uppercase text-gray-400 font-sans font-medium">Description</th>
                <th className="px-4 py-3 text-left text-[9px] tracking-[2px] uppercase text-gray-400 font-sans font-medium">Products</th>
                <th className="px-4 py-3 text-left text-[9px] tracking-[2px] uppercase text-gray-400 font-sans font-medium">Status</th>
                <th className="px-4 py-3 text-left text-[9px] tracking-[2px] uppercase text-gray-400 font-sans font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {currentCategories.length > 0 ? (
                currentCategories.map((category, index) => (
                  <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-xs text-gray-400 font-sans font-light">
                      {startIndex + index + 1}
                    </td>
                    <td className="px-4 py-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
                        {category.image ? (
                          <Image 
                            src={category.image} 
                            alt={category.name} 
                            width={40} 
                            height={40}
                            className="object-cover"
                          />
                        ) : (
                          <span className="text-xs text-gray-400 font-sans">
                            {category.name.charAt(0)}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs font-serif text-black">{category.name}</td>
                    <td className="px-4 py-3 text-xs text-gray-400 font-sans font-light">{category.slug}</td>
                    <td className="px-4 py-3 text-xs text-gray-500 font-sans font-light">{category.description}</td>
                    <td className="px-4 py-3 text-xs text-gray-500 font-sans font-light">{category.products}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-[8px] tracking-[1px] uppercase font-sans font-medium ${
                        category.status === 'Active' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
                      }`}>
                        {category.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/categories/edit/${category.id}`} className="text-xs text-gray-400 hover:text-black transition-colors font-sans">
                          Edit
                        </Link>
                        <span className="text-gray-200">|</span>
                        <button 
                          onClick={() => handleDeleteClick(category.id, category.name)}
                          className="text-xs text-gray-400 hover:text-red-600 transition-colors font-sans"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-400 font-sans text-sm">
                    No categories found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredCategories.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-4 border-t border-gray-200">
            <div className="text-xs text-gray-400 font-sans">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredCategories.length)} of {filteredCategories.length} categories
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
                Delete Category
              </h3>
              <p className="text-sm text-gray-500 font-sans font-light text-center mb-6">
                Are you sure you want to delete <span className="font-medium text-black">{deleteModal.categoryName}</span>? 
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

export default CategoriesPage;