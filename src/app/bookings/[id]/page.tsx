'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useRouter } from 'next/navigation';
import { AppDispatch, RootState } from '@/redux/store';
import { getBookingById, cancelBooking } from '@/redux/features/booking/bookingThunk';
import { clearCurrentBooking } from '@/redux/features/booking/bookingSlice';
import BookingDetails from '@/components/booking/BookingDetails';
import Swal from 'sweetalert2';
import { FaArrowLeft, FaTrashAlt } from 'react-icons/fa';

export default function BookingDetailsPage() {
  const { id } = useParams() as { id: string };
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { currentBooking, loading, error } = useSelector((state: RootState) => state.booking);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (id) {
      dispatch(getBookingById(id));
    }
    return () => {
      dispatch(clearCurrentBooking());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error,
        timer: 3000,
      });
    }
  }, [error]);

  const handleCancelBooking = async () => {
    const result = await Swal.fire({
      title: 'Cancel Booking?',
      text: 'Are you sure you want to cancel this booking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it',
    });

    if (result.isConfirmed) {
      await dispatch(cancelBooking(id));
      await Swal.fire({
        title: 'Booking Cancelled',
        position: 'top-end',
      text: 'Booking cancelled successfully',
        icon: 'success',
      timer: 3000,
      showConfirmButton: false,
      
      
    });
      router.push('/bookings');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#052658]"></div>
      </div>
    );
  }

  if (!currentBooking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Booking not found</p>
      </div>
    );
  }

  const canCancel = currentBooking.status === 'pending' && 
    (!user || (user && user.role !== 'admin'));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex justify-between items-center">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        >
          <FaArrowLeft className="text-sm" />
          Back
        </button>
        {canCancel && (
          <button
            onClick={handleCancelBooking}
            className="flex items-center gap-2 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            <FaTrashAlt className="text-sm" />
            Cancel Booking
          </button>
        )}
      </div>
      <BookingDetails booking={currentBooking} />
    </div>
  );
}