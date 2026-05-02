// components/admin/bookings/AdminBookingCard.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { FaMapMarkerAlt, FaCalendar, FaUsers, FaMoneyBillWave, FaCheckCircle, FaTrashAlt, FaEye } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

interface Booking {
  _id: string;
  tour: any;
  user: any;
  travelDate: string;
  guests: number;
  totalPrice: number;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
}

interface AdminBookingCardProps {
  booking: Booking;
  onConfirm: (id: string) => void;
  onDelete: (id: string) => void;
}

const AdminBookingCard: React.FC<AdminBookingCardProps> = ({
  booking,
  onConfirm,
  onDelete,
}) => {
  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'unpaid':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'refunded':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const tourTitle = typeof booking.tour === 'object' ? booking.tour.title : 'Tour';
  const tourLocation = typeof booking.tour === 'object' ? booking.tour.location : 'Unknown';
  const tourImage = typeof booking.tour === 'object' && booking.tour.image?.url ? booking.tour.image.url : '/placeholder.jpg';
  const userName = typeof booking.user === 'object' ? booking.user.name : 'User';
  const userEmail = typeof booking.user === 'object' ? booking.user.email : '';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Tour Image */}
      <div className="relative h-40 w-full">
        <Image
          src={tourImage}
          alt={tourTitle}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
            {booking.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 truncate">
          {tourTitle}
        </h3>
        
        <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-2">
          <FaMapMarkerAlt className="text-[#052658]" size={12} />
          <span className="truncate">{tourLocation}</span>
        </div>

        {/* User Info */}
        <div className="border-t border-b dark:border-gray-700 py-2 my-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-semibold">Customer:</span> {userName}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
            <span className="font-semibold">Email:</span> {userEmail}
          </p>
        </div>

        {/* Booking Details */}
        <div className="space-y-1 text-sm">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <FaCalendar size={12} />
            <span>Travel: {new Date(booking.travelDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <FaUsers size={12} />
            <span>{booking.guests} Guest(s)</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <FaMoneyBillWave size={12} />
            <span>Total: ${booking.totalPrice}</span>
          </div>
        </div>

        {/* Payment Status */}
        <div className="mt-2 flex items-center justify-between">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPaymentStatusColor(booking.paymentStatus)}`}>
            {booking.paymentStatus}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
            {booking.paymentMethod}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => router.push(`/admin/bookings/${booking._id}`)}
            className="flex-1 flex items-center justify-center gap-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
          >
            <FaEye size={12} />
            View
          </button>
          
          {booking.status === 'pending' && (
            <button
              onClick={() => onConfirm(booking._id)}
              className="flex-1 flex items-center justify-center gap-1 bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm"
            >
              <FaCheckCircle size={12} />
              Confirm
            </button>
          )}
          
          <button
            onClick={() => onDelete(booking._id)}
            className="flex-1 flex items-center justify-center gap-1 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm"
          >
            <FaTrashAlt size={12} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminBookingCard;