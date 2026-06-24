'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const AddCategoryPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    status: 'Active'
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Category added:', { ...formData, image: imageFile });
    router.push('/admin/categories');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Auto-generate slug from name
    if (name === 'name') {
      const slug = value
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      
      setFormData({
        ...formData,
        name: value,
        slug: slug
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <div>
      {/* Header with white background */}
      <div className="bg-white border border-gray-200 p-4 sm:p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="text-gray-400 hover:text-black transition-colors p-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div>
              <h2 className="text-xl font-serif font-light text-black">Add Category</h2>
              <p className="text-sm text-gray-400 font-sans font-light">Create a new category</p>
            </div>
          </div>
          <Link
            href="/admin/categories"
            className="px-6 py-2.5 bg-black text-white text-[10px] tracking-[3px] uppercase font-medium hover:bg-gray-400 transition-colors whitespace-nowrap"
          >
            Back to Categories
          </Link>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white border border-gray-200 p-4 sm:p-6 lg:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Image */}
          <div>
            <label className="block text-[10px] tracking-[3px] uppercase text-gray-400 mb-2 font-medium font-sans">
              Category Image
            </label>
            <div className="flex items-center gap-6">
              {/* Image Preview */}
              <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 overflow-hidden flex items-center justify-center">
                {imagePreview ? (
                  <Image 
                    src={imagePreview} 
                    alt="Category preview" 
                    width={96} 
                    height={96}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
              </div>
              
              {/* Upload Controls */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <label className="px-4 py-2 bg-gray-50 border border-gray-200 text-gray-600 text-[10px] tracking-[2px] uppercase font-sans font-medium hover:bg-gray-100 transition-colors cursor-pointer">
                    Choose Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  {imagePreview && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="text-xs text-red-500 hover:text-red-600 transition-colors font-sans"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <p className="mt-1 text-xs text-gray-400 font-sans font-light">
                  Recommended: Square image, max 2MB
                </p>
              </div>
            </div>
          </div>

          {/* Category Name */}
          <div>
            <label className="block text-[10px] tracking-[3px] uppercase text-gray-400 mb-2 font-medium font-sans">
              Category Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter category name..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-black text-black text-sm placeholder:text-gray-400 focus:outline-none focus:bg-white transition-all"
              required
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-[10px] tracking-[3px] uppercase text-gray-400 mb-2 font-medium font-sans">
              Slug <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-sans">/categories/</span>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="category-name"
                className="w-full px-4 pl-24 py-3 bg-gray-50 border border-gray-200 focus:border-black text-black text-sm placeholder:text-gray-400 focus:outline-none focus:bg-white transition-all"
                required
              />
            </div>
            <p className="mt-1 text-xs text-gray-400 font-sans font-light">
              URL-friendly version of the category name. Auto-generated from the name.
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[10px] tracking-[3px] uppercase text-gray-400 mb-2 font-medium font-sans">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Enter category description..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-black text-black text-sm placeholder:text-gray-400 focus:outline-none focus:bg-white transition-all resize-none"
            />
            <p className="mt-1 text-xs text-gray-400 font-sans font-light">
              {formData.description.length} characters
            </p>
          </div>

          {/* Status */}
          <div>
            <label className="block text-[10px] tracking-[3px] uppercase text-gray-400 mb-2 font-medium font-sans">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-black text-black text-sm focus:outline-none focus:bg-white transition-all appearance-none"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-gray-100">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-black text-white text-[10px] tracking-[3px] uppercase font-medium hover:bg-gray-400 transition-colors"
            >
              Save Category
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="w-full sm:w-auto px-8 py-3 border border-gray-200 text-gray-400 text-[10px] tracking-[3px] uppercase font-medium hover:border-black hover:text-black transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryPage;