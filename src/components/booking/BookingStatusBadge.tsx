'use client';

import React from 'react';

interface BookingStatusBadgeProps {
  status: 'pending' | 'confirmed' | 'cancelled';
  paymentStatus: 'unpaid' | 'paid' | 'refunded';
}

const BookingStatusBadge: React.FC<BookingStatusBadgeProps> = ({ status, paymentStatus }) => {
  const getStatusStyles = (): string => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'pending':
      default:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    }
  };

  const getPaymentStyles = (): string => {
    switch (paymentStatus) {
      case 'paid':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'refunded':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'unpaid':
      default:
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    }
  };

  const getPaymentText = (): string => {
    switch (paymentStatus) {
      case 'paid':
        return 'PAID';
      case 'refunded':
        return 'REFUNDED';
      case 'unpaid':
      default:
        return 'UNPAID';
    }
  };

  return (
    <div className="flex gap-2">
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusStyles()}`}>
        {status.toUpperCase()}
      </span>
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPaymentStyles()}`}>
        {getPaymentText()}
      </span>
    </div>
  );
};

export default BookingStatusBadge;