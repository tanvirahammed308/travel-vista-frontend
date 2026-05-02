'use client';

import React from 'react';
import Image from 'next/image';
import { Booking } from '@/redux/features/booking/bookingType';
import BookingStatusBadge from './BookingStatusBadge';


interface BookingDetailsProps {
  booking: Booking;
}

const BookingDetails: React.FC<BookingDetailsProps> = ({ booking }) => {
  const tour = typeof booking.tour === 'object' ? booking.tour : null;
  const user = typeof booking.user === 'object' ? booking.user : null;

  if (!tour) return null;

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'bkash':
        return '💙 bKash';
      case 'nagad':
        return '🧡 Nagad';
      case 'card':
        return '💳 Card';
      default:
        return '💰 Cash';
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
      <div className="relative h-64 md:h-96">
        <Image
          src={tour.image?.url || '/placeholder.jpg'}
          alt={tour.title || tour.name || 'Tour'}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 right-4">
          <BookingStatusBadge status={booking.status} paymentStatus={booking.paymentStatus} />
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
            {tour.title || tour.name}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">📍 {tour.location}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Booking Details
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Booking ID:</span>
                <span className="font-medium">{booking._id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Booking Date:</span>
                <span>{new Date(booking.bookingDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Travel Date:</span>
                <span>{new Date(booking.travelDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Number of Guests:</span>
                <span>{booking.guests} person(s)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Total Price:</span>
                <span className="text-xl font-bold text-[#052658] dark:text-blue-400">
                  ${booking.totalPrice}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Payment Information
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Payment Method:</span>
                <span>{getPaymentMethodIcon(booking.paymentMethod)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Payment Status:</span>
                <span className="capitalize">{booking.paymentStatus}</span>
              </div>
              {booking.transactionId && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Transaction ID:</span>
                  <span className="text-sm">{booking.transactionId}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {booking.specialRequest && (
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              Special Request
            </h2>
            <p className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              {booking.specialRequest}
            </p>
          </div>
        )}

        {user && typeof user === 'object' && (
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              Customer Information
            </h2>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Name:</span>
                <span>{user.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Email:</span>
                <span>{user.email}</span>
              </div>
              {user.phone && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Phone:</span>
                  <span>{user.phone}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingDetails;