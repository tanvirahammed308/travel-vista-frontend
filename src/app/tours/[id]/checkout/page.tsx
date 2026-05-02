// app/tours/[id]/checkout/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, useParams } from 'next/navigation';
import { AppDispatch, RootState } from '@/redux/store';
import { getTourById } from '@/redux/features/tour/tourThunk';
import { createBooking } from '@/redux/features/booking/bookingThunk';
import Image from 'next/image';
import Swal from 'sweetalert2';

type PaymentMethod = 'cash' | 'bkash' | 'nagad' | 'card';

interface FormData {
  travelDate: string;
  guests: number;
  paymentMethod: PaymentMethod;
  specialRequest: string;
  transactionId: string;
}

export default function CheckoutPage() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  
  // Get auth state with isCheckingAuth flag
  const { user, isCheckingAuth, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { selectedTour, loading: tourLoading } = useSelector((state: RootState) => state.tour);
  const { loading: bookingLoading } = useSelector((state: RootState) => state.booking);

  const [formData, setFormData] = useState<FormData>({
    travelDate: '',
    guests: 1,
    paymentMethod: 'cash',
    specialRequest: '',
    transactionId: '',
  });
  const [showTransactionId, setShowTransactionId] = useState(false);

  // Fetch tour data when authenticated
  useEffect(() => {
    if (!isCheckingAuth && isAuthenticated && id) {
      dispatch(getTourById(id as string));
    }
  }, [dispatch, id, isCheckingAuth, isAuthenticated]);

  // Redirect to login only after checking auth is complete
  useEffect(() => {
    if (!isCheckingAuth && !isAuthenticated) {
      router.push('/login');
    }
  }, [isCheckingAuth, isAuthenticated, router]);

  // Show loading while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#052658] mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, don't render (redirect will happen)
  if (!isAuthenticated || !user) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'guests' ? parseInt(value) : value,
    }));
  };

  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as PaymentMethod;
    setFormData(prev => ({ 
      ...prev, 
      paymentMethod: value 
    }));
    setShowTransactionId(value !== 'cash');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitData: any = {
      tourId: id as string,
      travelDate: formData.travelDate,
      guests: formData.guests,
      paymentMethod: formData.paymentMethod,
      specialRequest: formData.specialRequest,
    };
    
    if (formData.paymentMethod !== 'cash') {
      submitData.transactionId = formData.transactionId;
    }

    try {
      await dispatch(createBooking(submitData)).unwrap();
      Swal.fire({
        icon: 'success',
        title: 'Booking Confirmed!',
        position: 'top-end',
        text: 'Your booking has been created successfully',
        timer: 3000,
        showConfirmButton: false,
      });
      router.push('/dashboard/bookings/my-bookings');
    } catch (error: unknown) {
      console.error('Booking error:', error);
      
      let errorMessage = 'Something went wrong';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      } else if (error && typeof error === 'object' && 'message' in error) {
        errorMessage = String(error.message);
      }
      
      Swal.fire({
        icon: 'error',
        title: 'Booking Failed',
        text: errorMessage,
        position: 'top-end',
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  if (tourLoading || !selectedTour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#052658]"></div>
      </div>
    );
  }

  const totalPrice = selectedTour.price * formData.guests;
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Complete Your Booking</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Tour Details */}
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden sticky top-24">
            <div className="relative h-64">
              <Image
                src={selectedTour.image?.url || '/placeholder.jpg'}
                alt={selectedTour.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{selectedTour.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">📍 {selectedTour.location}</p>
              <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                {selectedTour.description}
              </p>
              <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-3xl font-bold text-[#052658] dark:text-blue-400">
                  ${selectedTour.price}
                </span>
                <span className="text-gray-500">per person</span>
              </div>
              {selectedTour.duration && (
                <p className="text-sm text-gray-500 mt-2">⏱ Duration: {selectedTour.duration}</p>
              )}
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">Booking Details</h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Travel Date *
              </label>
              <input
                type="date"
                name="travelDate"
                value={formData.travelDate}
                onChange={handleChange}
                min={today}
                required
                className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#052658] outline-none dark:bg-gray-800 dark:border-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Number of Guests *
              </label>
              <input
                type="number"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                min="1"
                max={selectedTour.maxGroupSize || 20}
                required
                className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#052658] outline-none dark:bg-gray-800 dark:border-gray-600"
              />
              {selectedTour.maxGroupSize && (
                <p className="text-xs text-gray-500 mt-1">Maximum {selectedTour.maxGroupSize} guests allowed</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Payment Method *
              </label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handlePaymentMethodChange}
                required
                className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#052658] outline-none dark:bg-gray-800 dark:border-gray-600"
              >
                <option value="cash">Cash (Pay at the destination)</option>
                <option value="bkash">bKash</option>
                <option value="nagad">Nagad</option>
                <option value="card">Credit/Debit Card</option>
              </select>
            </div>

            {showTransactionId && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Transaction ID *
                </label>
                <input
                  type="text"
                  name="transactionId"
                  value={formData.transactionId}
                  onChange={handleChange}
                  placeholder="Enter your payment transaction ID"
                  required
                  className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#052658] outline-none dark:bg-gray-800 dark:border-gray-600"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Please make the payment to: 01XXXXXXXXX (bKash/Nagad)
                </p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Special Request (Optional)
              </label>
              <textarea
                name="specialRequest"
                value={formData.specialRequest}
                onChange={handleChange}
                rows={3}
                placeholder="Any special requirements or requests?"
                className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#052658] outline-none dark:bg-gray-800 dark:border-gray-600"
              />
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total Price:</span>
                <span className="text-[#052658] dark:text-blue-400">${totalPrice}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">* Price per person: ${selectedTour.price}</p>
            </div>

            <button
              type="submit"
              disabled={bookingLoading}
              className="w-full bg-[#052658] text-white py-3 rounded-xl hover:bg-[#052658]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              {bookingLoading ? 'Processing...' : 'Confirm Booking'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}