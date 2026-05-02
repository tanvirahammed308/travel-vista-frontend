'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, useParams } from 'next/navigation';
import { AppDispatch, RootState } from '@/redux/store';
import { getTourById } from '@/redux/features/tour/tourThunk';
import { createBooking } from '@/redux/features/booking/bookingThunk';

import Image from 'next/image';
import Swal from 'sweetalert2';
import { CreateBookingData } from '@/redux/features/booking/bookingType';
import BookingForm from '@/components/booking/BookingForm';

export default function CheckoutPage() {
  const { tourId } = useParams() as { tourId: string };
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  // Use selectedTour instead of currentTour
  const { selectedTour, loading: tourLoading } = useSelector((state: RootState) => state.tour);
  const { loading: bookingLoading } = useSelector((state: RootState) => state.booking);

  useEffect(() => {
    if (tourId) {
      dispatch(getTourById(tourId));
    }
  }, [dispatch, tourId]);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

 const handleSubmit = async (bookingData: CreateBookingData) => {
  try {
    await dispatch(createBooking(bookingData)).unwrap();
    
    Swal.fire({
      icon: 'success',
      title: 'Booking Confirmed!',
      text: 'Your booking has been created successfully',
      timer: 3000,
      showConfirmButton: true,
    });
    router.push('/dashboard/bookings/my-bookings');
  } catch (error: any) {
    const errorMessage = typeof error === 'string' 
      ? error 
      : error?.message || 'Something went wrong';
    
    Swal.fire({
      icon: 'error',
      title: 'Booking Failed',
      text: errorMessage,
    });
  }
};

  // Loading state
  if (tourLoading || !selectedTour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#052658]"></div>
      </div>
    );
  }

  // No user (redirect will happen but show fallback)
  if (!user) {
    return null;
  }

  // Helper to get image URL safely
  const getImageUrl = (tour: any) => {
    if (tour.image?.url) return tour.image.url;
    if (tour.image?.public_id) return tour.image.public_id;
    return '/placeholder.jpg';
  };

  // Helper to get tour title safely
  const getTourTitle = (tour: any) => {
    return tour.title || tour.name || 'Tour';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Complete Your Booking</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Tour Details */}
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden sticky top-24">
            <div className="relative h-64">
              <Image
                src={getImageUrl(selectedTour)}
                alt={getTourTitle(selectedTour)}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{getTourTitle(selectedTour)}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                📍 {selectedTour.location}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
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
              {selectedTour.maxGroupSize && (
                <p className="text-sm text-gray-500">👥 Max Group Size: {selectedTour.maxGroupSize}</p>
              )}
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">Booking Details</h3>
          <BookingForm
            tour={selectedTour}
            onSubmit={handleSubmit}
            isLoading={bookingLoading}
          />
        </div>
      </div>
    </div>
  );
}