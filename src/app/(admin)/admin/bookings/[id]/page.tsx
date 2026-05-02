// app/admin/bookings/[id]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, useParams } from 'next/navigation';
import { AppDispatch, RootState } from '@/redux/store';
import { getBookingById, confirmBooking, deleteBooking } from '@/redux/features/booking/bookingThunk';
import { clearCurrentBooking } from '@/redux/features/booking/bookingSlice';
import Image from 'next/image';
import Swal from 'sweetalert2';
import { 
  FaArrowLeft, 
  FaCalendar, 
  FaUsers, 
  FaMoneyBillWave, 
  FaMapMarkerAlt, 
  FaClock, 
  FaCheckCircle, 
  FaHourglassHalf, 
  FaBan,
  FaCreditCard,
  FaCashRegister,
  FaMobileAlt,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaTag,
  FaTrashAlt,
  FaExclamationTriangle,
  FaSpinner
} from 'react-icons/fa';

export default function AdminBookingDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { currentBooking, loading, error } = useSelector((state: RootState) => state.booking);
  const { user } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is admin
    if (user && user.role !== 'admin') {
      router.push('/');
      return;
    }
    
    // Fetch booking if ID exists
    if (id && user?.role === 'admin') {
      console.log('Fetching booking for ID:', id);
      setIsLoading(true);
      dispatch(getBookingById(id as string))
        .unwrap()
        .then(() => {
          console.log('Booking fetched successfully');
          setIsLoading(false);
        })
        .catch((err: any) => {
          console.error('Failed to fetch booking:', err);
          setFetchError(err || 'Failed to load booking details');
          setIsLoading(false);
        });
    }

    // Cleanup
    return () => {
      dispatch(clearCurrentBooking());
    };
  }, [dispatch, id, user, router]);

  const handleConfirmBooking = async () => {
    const result = await Swal.fire({
      title: 'Confirm Booking?',
      text: 'This action will confirm the booking and mark payment as paid',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#052658',
      confirmButtonText: 'Yes, confirm it',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        await dispatch(confirmBooking(id as string)).unwrap();
        // Refresh booking details
        await dispatch(getBookingById(id as string)).unwrap();
        Swal.fire({
          icon: 'success',
          title: 'Confirmed!',
          text: 'Booking has been confirmed.',
          timer: 1500,
          showConfirmButton: false,
          position: 'top-end',
        });
      } catch (error: any) {
        Swal.fire({
          icon: 'error',
          title: 'Failed!',
          text: error || 'Failed to confirm booking',
        });
      }
    }
  };

  const handleDeleteBooking = async () => {
    const result = await Swal.fire({
      title: 'Delete Booking?',
      text: 'This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        await dispatch(deleteBooking(id as string)).unwrap();
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Booking has been deleted.',
          timer: 1500,
          showConfirmButton: false,
          position: 'top-end',
        });
        router.push('/admin/bookings');
      } catch (error: any) {
        Swal.fire({
          icon: 'error',
          title: 'Failed!',
          text: error || 'Failed to delete booking',
        });
      }
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'bkash':
        return <FaMobileAlt className="text-pink-600 text-xl" />;
      case 'nagad':
        return <FaMobileAlt className="text-orange-600 text-xl" />;
      case 'card':
        return <FaCreditCard className="text-blue-600 text-xl" />;
      default:
        return <FaCashRegister className="text-green-600 text-xl" />;
    }
  };

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <FaCheckCircle className="text-green-600 text-xl" />;
      case 'pending':
        return <FaHourglassHalf className="text-yellow-600 text-xl" />;
      case 'cancelled':
        return <FaBan className="text-red-600 text-xl" />;
      default:
        return null;
    }
  };

  // Show loading state
  if (isLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#052658] mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400">Loading booking details...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (fetchError || error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-md">
          <FaExclamationTriangle className="text-red-500 text-6xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Failed to Load Booking
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {fetchError || error || 'Booking not found or you don\'t have permission'}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                setFetchError(null);
                setIsLoading(true);
                dispatch(getBookingById(id as string))
                  .unwrap()
                  .then(() => setIsLoading(false))
                  .catch((err: any) => {
                    setFetchError(err || 'Failed to load booking details');
                    setIsLoading(false);
                  });
              }}
              className="bg-[#052658] text-white px-6 py-2 rounded-lg hover:bg-[#052658]/80 transition-colors flex items-center gap-2"
            >
              <FaSpinner className="animate-spin" />
              Try Again
            </button>
            <button
              onClick={() => router.push('/admin/bookings')}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Back to Bookings
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show not found state
  if (!currentBooking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📋</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Booking Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The booking you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => router.push('/admin/bookings')}
            className="bg-[#052658] text-white px-6 py-2 rounded-lg hover:bg-[#052658]/80 transition-colors"
          >
            Back to Bookings
          </button>
        </div>
      </div>
    );
  }

  const tour = typeof currentBooking.tour === 'object' ? currentBooking.tour : null;
  const customer = typeof currentBooking.user === 'object' ? currentBooking.user : null;

  if (!tour || !customer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FaExclamationTriangle className="text-red-500 text-6xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Invalid Booking Data
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The booking data is incomplete or corrupted.
          </p>
          <button
            onClick={() => router.push('/admin/bookings')}
            className="bg-[#052658] text-white px-6 py-2 rounded-lg hover:bg-[#052658]/80 transition-colors"
          >
            Back to Bookings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-[#052658] dark:text-gray-400 dark:hover:text-white transition-colors"
        >
          <FaArrowLeft />
          Back to Bookings
        </button>

        {/* Booking Details Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#052658] to-[#01204C] px-6 py-5">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-2xl font-bold text-white">Booking Details</h1>
                <p className="text-blue-200 text-sm mt-1">ID: {currentBooking._id}</p>
              </div>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(currentBooking.status)}`}>
                {getStatusIcon(currentBooking.status)}
                {currentBooking.status.toUpperCase()}
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Tour Information */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <FaTag className="text-[#052658]" />
                Tour Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src={tour.image?.url || '/placeholder.jpg'}
                    alt={tour.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {tour.title}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <FaMapMarkerAlt className="text-[#052658]" />
                    <span>{tour.location}</span>
                  </div>
                  {tour.duration && (
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <FaClock />
                      <span>Duration: {tour.duration}</span>
                    </div>
                  )}
                  {tour.category && (
                    <div className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">
                      {tour.category}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <FaUser className="text-[#052658]" />
                Customer Information
              </h2>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <FaUser className="text-gray-400" />
                  <span className="font-semibold">{customer.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-gray-400" />
                  <span>{customer.email}</span>
                </div>
                {customer.phone && (
                  <div className="flex items-center gap-2">
                    <FaPhone className="text-gray-400" />
                    <span>{customer.phone}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Booking Details */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <FaCalendar className="text-[#052658]" />
                Booking Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Travel Date</p>
                  <p className="font-semibold">{new Date(currentBooking.travelDate).toLocaleDateString()}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Number of Guests</p>
                  <p className="font-semibold">{currentBooking.guests} person(s)</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Price</p>
                  <p className="font-semibold text-xl text-[#052658]">${currentBooking.totalPrice}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Booked On</p>
                  <p className="font-semibold">{new Date(currentBooking.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <FaMoneyBillWave className="text-[#052658]" />
                Payment Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Payment Method</p>
                  <p className="font-semibold flex items-center gap-2 mt-1">
                    {getPaymentMethodIcon(currentBooking.paymentMethod)}
                    {currentBooking.paymentMethod.toUpperCase()}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Payment Status</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mt-1 ${getStatusColor(currentBooking.paymentStatus)}`}>
                    {currentBooking.paymentStatus}
                  </span>
                </div>
                {currentBooking.transactionId && (
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 md:col-span-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Transaction ID</p>
                    <p className="font-mono text-sm mt-1 break-all">{currentBooking.transactionId}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Special Request */}
            {currentBooking.specialRequest && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Special Request</h2>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                  <p className="text-gray-700 dark:text-gray-300 italic">
                    "{currentBooking.specialRequest}"
                  </p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t dark:border-gray-700">
              {currentBooking.status === 'pending' && (
                <button
                  onClick={handleConfirmBooking}
                  className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <FaCheckCircle />
                  Confirm Booking
                </button>
              )}
              <button
                onClick={handleDeleteBooking}
                className="flex items-center gap-2 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <FaTrashAlt />
                Delete Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}