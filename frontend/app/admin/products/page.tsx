'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

const ProductsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([
    { id: 1, name: 'Heritage Chronograph', category: 'Heritage', price: '$12,500', stock: 12, status: 'Active' },
    { id: 2, name: 'Sports Elegance', category: 'Sports', price: '$8,900', stock: 8, status: 'Active' },
    { id: 3, name: 'Classic Moonphase', category: 'Dress', price: '$15,200', stock: 5, status: 'Active' },
    { id: 4, name: 'Grand Tourbillon', category: 'Tourbillon', price: '$28,500', stock: 0, status: 'Out of Stock' },
    { id: 5, name: 'Heritage Tourbillon', category: 'Heritage', price: '$45,000', stock: 3, status: 'Active' },
    { id: 6, name: 'Ocean Diver', category: 'Sports', price: '$9,800', stock: 7, status: 'Active' },
    { id: 7, name: 'Vintage Classic', category: 'Dress', price: '$11,200', stock: 4, status: 'Active' },
    { id: 8, name: 'Aviator GMT', category: 'Heritage', price: '$14,500', stock: 6, status: 'Active' },
    { id: 9, name: 'Skeleton Tourbillon', category: 'Tourbillon', price: '$32,000', stock: 2, status: 'Active' },
    { id: 10, name: 'Racing Chrono', category: 'Sports', price: '$7,800', stock: 10, status: 'Active' },
    { id: 11, name: 'Elegance Perpetual', category: 'Dress', price: '$18,500', stock: 3, status: 'Active' },
    { id: 12, name: 'Heritage 1960', category: 'Heritage', price: '$22,000', stock: 5, status: 'Active' },
    { id: 13, name: 'Diving Pro', category: 'Sports', price: '$6,500', stock: 15, status: 'Active' },
    { id: 14, name: 'Moonphase Master', category: 'Dress', price: '$19,800', stock: 4, status: 'Active' },
    { id: 15, name: 'Grand Chronograph', category: 'Tourbillon', price: '$38,000', stock: 1, status: 'Out of Stock' },
    { id: 16, name: 'Classic Dress', category: 'Dress', price: '$5,200', stock: 20, status: 'Active' },
    { id: 17, name: 'Heritage Pilot', category: 'Heritage', price: '$16,800', stock: 7, status: 'Active' },
    { id: 18, name: 'Sports Automatic', category: 'Sports', price: '$4,900', stock: 18, status: 'Active' },
    { id: 19, name: 'Tourbillon Elite', category: 'Tourbillon', price: '$52,000', stock: 2, status: 'Active' },
    { id: 20, name: 'Vintage Diver', category: 'Heritage', price: '$13,200', stock: 6, status: 'Active' },
    { id: 21, name: 'Dress Elegance', category: 'Dress', price: '$7,400', stock: 11, status: 'Active' },
    { id: 22, name: 'Chronograph Sport', category: 'Sports', price: '$9,200', stock: 9, status: 'Active' },
    { id: 23, name: 'Heritage Moonphase', category: 'Heritage', price: '$24,500', stock: 4, status: 'Active' },
    { id: 24, name: 'Classic Tourbillon', category: 'Tourbillon', price: '$42,000', stock: 0, status: 'Out of Stock' },
    { id: 25, name: 'Sports Chronograph', category: 'Sports', price: '$11,800', stock: 8, status: 'Active' },
  ]);
  const itemsPerPage = 10;
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; productId: number | null; productName: string }>({
    isOpen: false,
    productId: null,
    productName: '',
  });

  // Filter products based on search
  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, products]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to first page when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of table
    document.getElementById('products-table')?.scrollIntoView({ behavior: 'smooth' });
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
      productId: id,
      productName: name,
    });
  };

  const handleConfirmDelete = () => {
    if (deleteModal.productId) {
      setProducts(products.filter(product => product.id !== deleteModal.productId));
      setDeleteModal({ isOpen: false, productId: null, productName: '' });
    }
  };

  const handleCancelDelete = () => {
    setDeleteModal({ isOpen: false, productId: null, productName: '' });
  };

  return (
    <div>
      {/* Header with white background */}
      <div className="bg-white border border-gray-200 p-4 sm:p-6 mb-6">
        {/* First Row: Title and Add Button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-serif font-light text-black">Products</h2>
            <p className="text-sm text-gray-400 font-sans font-light">Manage your product catalog</p>
          </div>
          <Link
            href="/admin/products/add"
            className="px-6 py-2.5 bg-black text-white text-[10px] tracking-[3px] uppercase font-medium hover:bg-gray-400 transition-colors whitespace-nowrap"
          >
            Add Product
          </Link>
        </div>

        {/* Second Row: Full Width Search */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search products..."
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
      <div id="products-table" className="bg-white border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-[9px] tracking-[2px] uppercase text-gray-400 font-sans font-medium">#</th>
                <th className="px-4 py-3 text-left text-[9px] tracking-[2px] uppercase text-gray-400 font-sans font-medium">Product</th>
                <th className="px-4 py-3 text-left text-[9px] tracking-[2px] uppercase text-gray-400 font-sans font-medium">Category</th>
                <th className="px-4 py-3 text-left text-[9px] tracking-[2px] uppercase text-gray-400 font-sans font-medium">Price</th>
                <th className="px-4 py-3 text-left text-[9px] tracking-[2px] uppercase text-gray-400 font-sans font-medium">Stock</th>
                <th className="px-4 py-3 text-left text-[9px] tracking-[2px] uppercase text-gray-400 font-sans font-medium">Status</th>
                <th className="px-4 py-3 text-left text-[9px] tracking-[2px] uppercase text-gray-400 font-sans font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {currentProducts.length > 0 ? (
                currentProducts.map((product, index) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-xs text-gray-400 font-sans font-light">
                      {startIndex + index + 1}
                    </td>
                    <td className="px-4 py-3 text-xs font-serif text-black">{product.name}</td>
                    <td className="px-4 py-3 text-xs text-gray-500 font-sans font-light">{product.category}</td>
                    <td className="px-4 py-3 text-xs font-serif font-light text-black">{product.price}</td>
                    <td className="px-4 py-3 text-xs text-gray-500 font-sans font-light">{product.stock}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-[8px] tracking-[1px] uppercase font-sans font-medium ${
                        product.status === 'Active' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/products/edit/${product.id}`} className="text-xs text-gray-400 hover:text-black transition-colors font-sans">
                          Edit
                        </Link>
                        <span className="text-gray-200">|</span>
                        <button 
                          onClick={() => handleDeleteClick(product.id, product.name)}
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
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-400 font-sans text-sm">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredProducts.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-4 border-t border-gray-200">
            <div className="text-xs text-gray-400 font-sans">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
            </div>
            <div className="flex items-center gap-1">
              {/* Previous Button */}
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

              {/* Page Numbers */}
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

              {/* Next Button */}
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
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleCancelDelete}
          />
          
          {/* Modal */}
          <div className="relative bg-white w-full max-w-md rounded-lg shadow-2xl animate-fadeInUp">
            <div className="p-6">
              {/* Icon */}
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              
              {/* Content */}
              <h3 className="text-lg font-serif font-light text-black text-center mb-2">
                Delete Product
              </h3>
              <p className="text-sm text-gray-500 font-sans font-light text-center mb-6">
                Are you sure you want to delete <span className="font-medium text-black">{deleteModal.productName}</span>? 
                This action cannot be undone.
              </p>
              
              {/* Buttons */}
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

export default ProductsPage;