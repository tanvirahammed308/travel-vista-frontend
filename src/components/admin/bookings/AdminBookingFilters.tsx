// components/admin/bookings/AdminBookingFilters.tsx
'use client';

import React from 'react';
import { FaSearch, FaTimes, FaFilter } from 'react-icons/fa';
import { BookingFilters } from '@/redux/features/booking/bookingType';

interface AdminBookingFiltersProps {
  filters: BookingFilters;
  onFilterChange: (filters: BookingFilters) => void;
  onReset: () => void;
}

const AdminBookingFilters: React.FC<AdminBookingFiltersProps> = ({
  filters,
  onFilterChange,
  onReset,
}) => {
  const handleChange = (key: keyof BookingFilters, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const isFilterActive = () => {
    return (
      (filters.status && filters.status !== 'all') ||
      (filters.paymentStatus && filters.paymentStatus !== 'all') ||
      (filters.paymentMethod && filters.paymentMethod !== 'all') ||
      (filters.search && filters.search !== '')
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <FaFilter className="text-gray-500 dark:text-gray-400" />
        <h3 className="font-semibold text-gray-700 dark:text-gray-300">
          Filter Bookings
        </h3>
        {isFilterActive() && (
          <button
            onClick={onReset}
            className="ml-auto text-sm text-red-500 hover:text-red-600 flex items-center gap-1"
          >
            <FaTimes size={12} />
            Reset All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by tour, user, email..."
            value={filters.search || ''}
            onChange={(e) => handleChange('search', e.target.value)}
            className="w-full border dark:border-gray-600 rounded-lg px-4 py-2 pl-10 focus:ring-2 focus:ring-[#052658] outline-none dark:bg-gray-700 dark:text-white"
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        <select
          value={filters.status || 'all'}
          onChange={(e) => handleChange('status', e.target.value)}
          className="border dark:border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#052658] outline-none dark:bg-gray-700 dark:text-white"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <select
          value={filters.paymentStatus || 'all'}
          onChange={(e) => handleChange('paymentStatus', e.target.value)}
          className="border dark:border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#052658] outline-none dark:bg-gray-700 dark:text-white"
        >
          <option value="all">All Payment Status</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
          <option value="refunded">Refunded</option>
        </select>

        <select
          value={filters.paymentMethod || 'all'}
          onChange={(e) => handleChange('paymentMethod', e.target.value)}
          className="border dark:border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#052658] outline-none dark:bg-gray-700 dark:text-white"
        >
          <option value="all">All Payment Methods</option>
          <option value="cash">Cash</option>
          <option value="bkash">bKash</option>
          <option value="nagad">Nagad</option>
          <option value="card">Card</option>
        </select>
      </div>
    </div>
  );
};

export default AdminBookingFilters;