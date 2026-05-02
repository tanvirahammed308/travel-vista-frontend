'use client';

import React from 'react';
import { BookingFilters as BookingFiltersType } from '@/redux/features/booking/bookingType';

interface BookingFiltersProps {
  filters: BookingFiltersType;
  onFilterChange: (filters: BookingFiltersType) => void;
  onReset: () => void;
}

const BookingFilters: React.FC<BookingFiltersProps> = ({ filters, onFilterChange, onReset }) => {
  const handleChange = (key: keyof BookingFiltersType, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-700 dark:text-gray-300">Filters</h3>
        <button
          onClick={onReset}
          className="text-sm text-red-500 hover:text-red-600"
        >
          Reset All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
            Status
          </label>
          <select
            value={filters.status || 'all'}
            onChange={(e) => handleChange('status', e.target.value)}
            className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
            Payment Status
          </label>
          <select
            value={filters.paymentStatus || 'all'}
            onChange={(e) => handleChange('paymentStatus', e.target.value)}
            className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="all">All Payments</option>
            <option value="unpaid">Unpaid</option>
            <option value="paid">Paid</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
            Payment Method
          </label>
          <select
            value={filters.paymentMethod || 'all'}
            onChange={(e) => handleChange('paymentMethod', e.target.value)}
            className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="all">All Methods</option>
            <option value="cash">Cash</option>
            <option value="bkash">bKash</option>
            <option value="nagad">Nagad</option>
            <option value="card">Card</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
            Search
          </label>
          <input
            type="text"
            placeholder="Search by tour or customer..."
            value={filters.search || ''}
            onChange={(e) => handleChange('search', e.target.value)}
            className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      </div>
    </div>
  );
};

export default BookingFilters;