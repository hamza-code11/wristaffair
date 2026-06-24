'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const BrandsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [brands, setBrands] = useState([
    { id: 1, name: 'Rolex', slug: 'rolex', description: 'Swiss luxury watchmaker', products: 45, status: 'Active', image: '/brands/rolex.jpg' },
    { id: 2, name: 'Omega', slug: 'omega', description: 'Swiss luxury watch brand', products: 38, status: 'Active', image: '/brands/omega.jpg' },
    { id: 3, name: 'Patek Philippe', slug: 'patek-philippe', description: 'Swiss luxury watch manufacturer', products: 28, status: 'Active', image: '/brands/patek-philippe.jpg' },
    { id: 4, name: 'Audemars Piguet', slug: 'audemars-piguet', description: 'Swiss luxury watchmaker', products: 32, status: 'Active', image: '/brands/audemars-piguet.jpg' },
    { id: 5, name: 'Richard Mille', slug: 'richard-mille', description: 'French luxury watch brand', products: 15, status: 'Active', image: '/brands/richard-mille.jpg' },
    { id: 6, name: 'IWC Schaffhausen', slug: 'iwc-schaffhausen', description: 'Swiss luxury watch manufacturer', products: 22, status: 'Active', image: '/brands/iwc.jpg' },
    { id: 7, name: 'Cartier', slug: 'cartier', description: 'French luxury watch brand', products: 30, status: 'Active', image: '/brands/cartier.jpg' },
    { id: 8, name: 'Jaeger-LeCoultre', slug: 'jaeger-lecoultre', description: 'Swiss luxury watchmaker', products: 20, status: 'Active', image: '/brands/jaeger-lecoultre.jpg' },
    { id: 9, name: 'Tag Heuer', slug: 'tag-heuer', description: 'Swiss luxury watch brand', products: 25, status: 'Active', image: '/brands/tag-heuer.jpg' },
    { id: 10, name: 'Breitling', slug: 'breitling', description: 'Swiss luxury watchmaker', products: 18, status: 'Active', image: '/brands/breitling.jpg' },
    { id: 11, name: 'Hublot', slug: 'hublot', description: 'Swiss luxury watch brand', products: 15, status: 'Active', image: '/brands/hublot.jpg' },
    { id: 12, name: 'Tudor', slug: 'tudor', description: 'Swiss watch brand', products: 12, status: 'Active', image: '/brands/tudor.jpg' },
    { id: 13, name: 'Girard-Perregaux', slug: 'girard-perregaux', description: 'Swiss luxury watchmaker', products: 10, status: 'Active', image: '/brands/girard-perregaux.jpg' },
    { id: 14, name: 'Panerai', slug: 'panerai', description: 'Italian luxury watch brand', products: 14, status: 'Active', image: '/brands/panerai.jpg' },
    { id: 15, name: 'Breguet', slug: 'breguet', description: 'Swiss luxury watchmaker', products: 8, status: 'Active', image: '/brands/breguet.jpg' },
  ]);
  const itemsPerPage = 10;
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; brandId: number | null; brandName: string }>({
    isOpen: false,
    brandId: null,
    brandName: '',
  });

  // Filter brands based on search
  const filteredBrands = useMemo(() => {
    if (!searchTerm) return brands;
    return brands.filter(brand =>
      brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, brands]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredBrands.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBrands = filteredBrands.slice(startIndex, endIndex);

  // Reset to first page when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById('brands-table')?.scrollIntoView({ behavior: 'smooth' });
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
      brandId: id,
      brandName: name,
    });
  };

  const handleConfirmDelete = () => {
    if (deleteModal.brandId) {
      setBrands(brands.filter(brand => brand.id !== deleteModal.brandId));
      setDeleteModal({ isOpen: false, brandId: null, brandName: '' });
    }
  };

  const handleCancelDelete = () => {
    setDeleteModal({ isOpen: false, brandId: null, brandName: '' });
  };

  return (
    <div>
      {/* Header with white background */}
      <div className="bg-white border border-gray-200 p-4 sm:p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-serif font-light text-black">Brands</h2>
            <p className="text-sm text-gray-400 font-sans font-light">Manage your watch brands</p>
          </div>
          <Link
            href="/admin/brands/add"
            className="px-6 py-2.5 bg-black text-white text-[10px] tracking-[3px] uppercase font-medium hover:bg-gray-400 transition-colors whitespace-nowrap"
          >
            Add Brand
          </Link>
        </div>

        {/* Second Row: Full Width Search */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search brands by name, slug, or description..."
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
      <div id="brands-table" className="bg-white border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-[9px] tracking-[2px] uppercase text-gray-400 font-sans font-medium">#</th>
                <th className="px-4 py-3 text-left text-[9px] tracking-[2px] uppercase text-gray-400 font-sans font-medium">Image</th>
                <th className="px-4 py-3 text-left text-[9px] tracking-[2px] uppercase text-gray-400 font-sans font-medium">Brand Name</th>
                <th className="px-4 py-3 text-left text-[9px] tracking-[2px] uppercase text-gray-400 font-sans font-medium">Slug</th>
                <th className="px-4 py-3 text-left text-[9px] tracking-[2px] uppercase text-gray-400 font-sans font-medium">Description</th>
                <th className="px-4 py-3 text-left text-[9px] tracking-[2px] uppercase text-gray-400 font-sans font-medium">Products</th>
                <th className="px-4 py-3 text-left text-[9px] tracking-[2px] uppercase text-gray-400 font-sans font-medium">Status</th>
                <th className="px-4 py-3 text-left text-[9px] tracking-[2px] uppercase text-gray-400 font-sans font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {currentBrands.length > 0 ? (
                currentBrands.map((brand, index) => (
                  <tr key={brand.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-xs text-gray-400 font-sans font-light">
                      {startIndex + index + 1}
                    </td>
                    <td className="px-4 py-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
                        {brand.image ? (
                          <Image 
                            src={brand.image} 
                            alt={brand.name} 
                            width={40} 
                            height={40}
                            className="object-cover"
                          />
                        ) : (
                          <span className="text-xs text-gray-400 font-sans">
                            {brand.name.charAt(0)}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs font-serif text-black">{brand.name}</td>
                    <td className="px-4 py-3 text-xs text-gray-400 font-sans font-light">{brand.slug}</td>
                    <td className="px-4 py-3 text-xs text-gray-500 font-sans font-light">{brand.description}</td>
                    <td className="px-4 py-3 text-xs text-gray-500 font-sans font-light">{brand.products}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-[8px] tracking-[1px] uppercase font-sans font-medium ${
                        brand.status === 'Active' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
                      }`}>
                        {brand.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/brands/edit/${brand.id}`} className="text-xs text-gray-400 hover:text-black transition-colors font-sans">
                          Edit
                        </Link>
                        <span className="text-gray-200">|</span>
                        <button 
                          onClick={() => handleDeleteClick(brand.id, brand.name)}
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
                    No brands found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredBrands.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-4 border-t border-gray-200">
            <div className="text-xs text-gray-400 font-sans">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredBrands.length)} of {filteredBrands.length} brands
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
                Delete Brand
              </h3>
              <p className="text-sm text-gray-500 font-sans font-light text-center mb-6">
                Are you sure you want to delete <span className="font-medium text-black">{deleteModal.brandName}</span>? 
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

export default BrandsPage;