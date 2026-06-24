'use client';

import React, { useState, useMemo } from 'react';

interface Contact {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  phone?: string;
}

const ContactsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [viewModal, setViewModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; contactId: number | null; contactName: string }>({
    isOpen: false,
    contactId: null,
    contactName: '',
  });

  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@email.com',
      subject: 'Product Inquiry - Heritage Chronograph',
      message: 'I am interested in the Heritage Chronograph. Could you please provide more details about the movement and availability? Also, do you offer international shipping?',
      date: '2024-01-15T10:30:00',
      phone: '+1 (555) 123-4567'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      subject: 'Order Status Question',
      message: 'I placed an order for the Sports Elegance watch on January 10th. Could you please update me on the shipping status? Order #12345.',
      date: '2024-01-16T14:20:00',
      phone: '+1 (555) 234-5678'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@email.com',
      subject: 'Partnership Opportunity',
      message: 'We are a luxury watch retailer in Dubai and would like to explore partnership opportunities with your brand. Please share your wholesale pricing and minimum order quantities.',
      date: '2024-01-18T09:15:00',
      phone: '+971 50 123 4567'
    },
    {
      id: 4,
      name: 'Sarah Williams',
      email: 'sarah.williams@email.com',
      subject: 'Watch Repair Service',
      message: 'I have a vintage Rolex that needs servicing. Do you offer repair services for watches not purchased from your store? The watch is from 1985.',
      date: '2024-01-20T16:45:00'
    },
    {
      id: 5,
      name: 'David Brown',
      email: 'david.brown@email.com',
      subject: 'Custom Order Inquiry',
      message: 'I would like to inquire about customizing a watch. Is it possible to engrave a personal message on the case back? Also, can I choose custom strap colors?',
      date: '2024-01-22T11:00:00',
      phone: '+1 (555) 345-6789'
    },
    {
      id: 6,
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      subject: 'Return Request',
      message: 'I received my order but the watch is not working properly. The second hand is stuck and the date complication is not advancing. Please advise on return procedure.',
      date: '2024-01-24T13:30:00'
    },
    {
      id: 7,
      name: 'Robert Wilson',
      email: 'robert.wilson@email.com',
      subject: 'Size and Fit Question',
      message: 'I have a 7.5 inch wrist. Would the Classic Moonphase fit comfortably? I would also like to know about the strap adjustment options.',
      date: '2024-01-25T08:20:00',
      phone: '+1 (555) 456-7890'
    },
    {
      id: 8,
      name: 'Lisa Miller',
      email: 'lisa.miller@email.com',
      subject: 'Product Recommendation',
      message: 'I am looking for a dress watch under $10,000 for my husband\'s 40th birthday. Could you recommend some options with classic designs?',
      date: '2024-01-26T10:00:00'
    },
    {
      id: 9,
      name: 'James Taylor',
      email: 'james.taylor@email.com',
      subject: 'Stock Availability',
      message: 'Do you have the Grand Tourbillon in stock? I saw it on your website but it shows out of stock. When will it be available again?',
      date: '2024-01-27T15:10:00',
      phone: '+1 (555) 567-8901'
    },
    {
      id: 10,
      name: 'Patricia Anderson',
      email: 'patricia.anderson@email.com',
      subject: 'Feedback and Suggestion',
      message: 'I recently purchased a watch from your store and I am extremely satisfied with the quality. I would like to suggest adding more color options for straps.',
      date: '2024-01-28T12:00:00'
    },
    {
      id: 11,
      name: 'Richard Martin',
      email: 'richard.martin@email.com',
      subject: 'International Shipping Query',
      message: 'Do you ship to Australia? What are the shipping costs and estimated delivery times? Also, are there any customs duties I need to be aware of?',
      date: '2024-01-29T09:30:00',
      phone: '+61 400 123 456'
    },
    {
      id: 12,
      name: 'Jennifer Thomas',
      email: 'jennifer.thomas@email.com',
      subject: 'Warranty Information',
      message: 'I lost my warranty card. Is it possible to get a digital copy? I have the purchase receipt. The watch was purchased in December 2023.',
      date: '2024-01-30T14:45:00'
    },
  ]);

  const itemsPerPage = 10;

  // Filter contacts based on search
  const filteredContacts = useMemo(() => {
    if (!searchTerm) return contacts;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.message.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, contacts]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentContacts = filteredContacts.slice(startIndex, endIndex);

  // Reset to first page when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById('contacts-table')?.scrollIntoView({ behavior: 'smooth' });
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
      contactId: id,
      contactName: name,
    });
  };

  const handleConfirmDelete = () => {
    if (deleteModal.contactId) {
      setContacts(contacts.filter(contact => contact.id !== deleteModal.contactId));
      setDeleteModal({ isOpen: false, contactId: null, contactName: '' });
    }
  };

  const handleCancelDelete = () => {
    setDeleteModal({ isOpen: false, contactId: null, contactName: '' });
  };

  // View contact details
  const handleViewContact = (contact: Contact) => {
    setSelectedContact(contact);
    setViewModal(true);
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

  return (
    <div>
      {/* Header with white background */}
      <div className="bg-white border border-gray-200 p-4 sm:p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-serif font-light text-black">Contacts</h2>
            <p className="text-sm text-gray-400 font-sans font-light">Manage your customer inquiries</p>
          </div>
        </div>

        {/* Second Row: Full Width Search */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search contacts by name, email, subject, or message..."
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
      <div id="contacts-table" className="bg-white border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-[9px] tracking-[2px] uppercase text-gray-400 font-sans font-medium">#</th>
                <th className="px-4 py-3 text-left text-[9px] tracking-[2px] uppercase text-gray-400 font-sans font-medium">Name</th>
                <th className="px-4 py-3 text-left text-[9px] tracking-[2px] uppercase text-gray-400 font-sans font-medium">Email</th>
                <th className="px-4 py-3 text-left text-[9px] tracking-[2px] uppercase text-gray-400 font-sans font-medium">Subject</th>
                <th className="px-4 py-3 text-left text-[9px] tracking-[2px] uppercase text-gray-400 font-sans font-medium">Date</th>
                <th className="px-4 py-3 text-left text-[9px] tracking-[2px] uppercase text-gray-400 font-sans font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {currentContacts.length > 0 ? (
                currentContacts.map((contact, index) => (
                  <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-xs text-gray-400 font-sans font-light">
                      {startIndex + index + 1}
                    </td>
                    <td className="px-4 py-3 text-xs font-serif text-black">{contact.name}</td>
                    <td className="px-4 py-3 text-xs text-gray-500 font-sans font-light">{contact.email}</td>
                    <td className="px-4 py-3 text-xs text-gray-500 font-sans font-light max-w-[200px] truncate">
                      {contact.subject}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-400 font-sans font-light">
                      {formatDate(contact.date)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleViewContact(contact)}
                          className="text-xs text-gray-400 hover:text-black transition-colors font-sans"
                        >
                          View
                        </button>
                        <span className="text-gray-200">|</span>
                        <button 
                          onClick={() => handleDeleteClick(contact.id, contact.name)}
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
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-400 font-sans text-sm">
                    No contacts found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredContacts.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-4 border-t border-gray-200">
            <div className="text-xs text-gray-400 font-sans">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredContacts.length)} of {filteredContacts.length} contacts
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

      {/* View Contact Modal */}
      {viewModal && selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setViewModal(false)}
          />
          
          <div className="relative bg-white w-full max-w-2xl rounded-lg shadow-2xl animate-fadeInUp max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-6 pb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-xl font-serif font-light text-black">Contact Details</h3>
                  <p className="text-sm text-gray-400 font-sans font-light">View complete inquiry information</p>
                </div>
                <button
                  onClick={() => setViewModal(false)}
                  className="text-gray-400 hover:text-black transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="space-y-4">
                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] tracking-[2px] uppercase text-gray-400 font-sans font-medium mb-1">
                      Name
                    </label>
                    <p className="text-sm text-black font-serif">{selectedContact.name}</p>
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-[2px] uppercase text-gray-400 font-sans font-medium mb-1">
                      Email
                    </label>
                    <p className="text-sm text-gray-600 font-sans">{selectedContact.email}</p>
                  </div>
                </div>

                {/* Phone (if available) */}
                {selectedContact.phone && (
                  <div>
                    <label className="block text-[9px] tracking-[2px] uppercase text-gray-400 font-sans font-medium mb-1">
                      Phone
                    </label>
                    <p className="text-sm text-gray-600 font-sans">{selectedContact.phone}</p>
                  </div>
                )}

                {/* Subject */}
                <div>
                  <label className="block text-[9px] tracking-[2px] uppercase text-gray-400 font-sans font-medium mb-1">
                    Subject
                  </label>
                  <p className="text-sm text-black font-serif">{selectedContact.subject}</p>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-[9px] tracking-[2px] uppercase text-gray-400 font-sans font-medium mb-1">
                    Date
                  </label>
                  <p className="text-sm text-gray-600 font-sans">{formatDate(selectedContact.date)}</p>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[9px] tracking-[2px] uppercase text-gray-400 font-sans font-medium mb-1">
                    Message
                  </label>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <p className="text-sm text-gray-700 font-sans leading-relaxed whitespace-pre-wrap">
                      {selectedContact.message}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-3 mt-6 pt-6 border-t border-gray-100">
                <button
                  onClick={() => {
                    setViewModal(false);
                    handleDeleteClick(selectedContact.id, selectedContact.name);
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 border border-red-200 text-red-500 text-[10px] tracking-[3px] uppercase font-medium hover:bg-red-50 transition-colors"
                >
                  Delete
                </button>
                <button
                  onClick={() => setViewModal(false)}
                  className="w-full sm:w-auto px-6 py-2.5 border border-gray-200 text-gray-400 text-[10px] tracking-[3px] uppercase font-medium hover:border-black hover:text-black transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                Delete Contact
              </h3>
              <p className="text-sm text-gray-500 font-sans font-light text-center mb-6">
                Are you sure you want to delete contact <span className="font-medium text-black">{deleteModal.contactName}</span>? 
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

export default ContactsPage;