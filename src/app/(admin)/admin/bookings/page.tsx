// app/admin/bookings/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { AppDispatch, RootState } from '@/redux/store';
import {
  getAllBookings,
  confirmBooking,
  deleteBooking,
  getBookingStatistics,
} from '@/redux/features/booking/bookingThunk';
import { BookingFilters } from '@/redux/features/booking/bookingType';
import Swal from 'sweetalert2';
import AdminBookingStats from '@/components/admin/bookings/AdminBookingStats';
import AdminBookingFilters from '@/components/admin/bookings/AdminBookingFilters';
import AdminBookingCard from '@/components/admin/bookings/AdminBookingCard';
import { FaArrowLeft } from 'react-icons/fa';

export default function AdminBookingsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { bookings, loading, statistics } = useSelector((state: RootState) => state.booking);
  const { user } = useSelector((state: RootState) => state.auth);

  //  BookingFilters type
  const [filters, setFilters] = useState<BookingFilters>({
    status: 'all',
    paymentStatus: 'all',
    paymentMethod: 'all',
    search: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Check if user is admin
  useEffect(() => {
    if (user && user.role !== 'admin') {
      router.push('/');
    }
  }, [user, router]);

  // Fetch data
  useEffect(() => {
    if (user?.role === 'admin') {
      dispatch(getAllBookings(filters));
      dispatch(getBookingStatistics());
    }
  }, [dispatch, filters, user]);

  const handleConfirmBooking = async (id: string) => {
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
        await dispatch(confirmBooking(id)).unwrap();
        await dispatch(getAllBookings(filters));
        await dispatch(getBookingStatistics());
        Swal.fire({
          icon: 'success',
          title: 'Confirmed!',
          text: 'Booking has been confirmed.',
          timer: 1500,
          position: 'top-end',
          showConfirmButton: false,
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

  const handleDeleteBooking = async (id: string) => {
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
        await dispatch(deleteBooking(id)).unwrap();
        await dispatch(getAllBookings(filters));
        await dispatch(getBookingStatistics());
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          position: 'top-end',
          text: 'Booking has been deleted.',
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error: any) {
        Swal.fire({
          icon: 'error',
          title: 'Failed!',
          text: error || 'Failed to delete booking',
        });
      }
    }
  };

  const handleResetFilters = () => {
    setFilters({
      status: 'all',
      paymentStatus: 'all',
      paymentMethod: 'all',
      search: '',
    });
    setCurrentPage(1);
  };

  // Handle filter change
  const handleFilterChange = (newFilters: BookingFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  // Pagination
  const totalPages = Math.ceil(bookings.length / itemsPerPage);
  const paginatedBookings = bookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (user?.role !== 'admin') {
    return null;
  }

  if (loading && bookings.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#052658] mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Manage Bookings
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                View and manage all tour bookings
              </p>
            </div>
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="flex items-center gap-2 text-gray-600 hover:text-[#052658] dark:text-gray-400"
            >
              <FaArrowLeft />
              Back to Dashboard
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        {statistics && <AdminBookingStats statistics={statistics} />}

        {/* Filters */}
        <AdminBookingFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
        />

        {/* Bookings Grid */}
        {paginatedBookings.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Bookings Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              No bookings match your filters.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedBookings.map((booking) => (
                <AdminBookingCard
                  key={booking._id}
                  booking={booking}
                  onConfirm={handleConfirmBooking}
                  onDelete={handleDeleteBooking}
                />
              ))}
            </div>

            {/* Simple Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Previous
                </button>
                
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-3 py-2 rounded-lg transition-colors ${
                      currentPage === index + 1
                        ? 'bg-[#052658] text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}