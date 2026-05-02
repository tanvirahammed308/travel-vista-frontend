// app/my-bookings/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { AppDispatch, RootState } from '@/redux/store';
import { getMyBookings, cancelBooking } from '@/redux/features/booking/bookingThunk';
import Image from 'next/image';
import Swal from 'sweetalert2';
import { 
  FaCalendar, FaUsers, FaMoneyBillWave, FaMapMarkerAlt, 
  FaClock, FaEye, FaChevronLeft, FaChevronRight 
} from 'react-icons/fa';

export default function MyBookingsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  const { bookings, loading } = useSelector((state: RootState) => state.booking);
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else {
      dispatch(getMyBookings());
    }
  }, [dispatch, user, router]);

  // Reset to first page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilter]);

  const handleCancelBooking = async (bookingId: string) => {
    const result = await Swal.fire({
      title: 'Cancel Booking?',
      text: 'Are you sure you want to cancel this booking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it',
      cancelButtonText: 'No, keep it'
    });

    if (result.isConfirmed) {
      try {
        await dispatch(cancelBooking(bookingId)).unwrap();
        await dispatch(getMyBookings());
        Swal.fire({
          icon: 'success',
          title: 'Cancelled!',
          text: 'Your booking has been cancelled.',
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error: any) {
        Swal.fire({
          icon: 'error',
          title: 'Failed!',
          text: error || 'Failed to cancel booking',
        });
      }
    }
  };

  const handleViewDetails = (bookingId: string) => {
    router.push(`/bookings/${bookingId}`);
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

  // Filter bookings based on selected filter
  const filteredBookings = bookings.filter((booking: any) => {
    if (selectedFilter === 'all') return true;
    return booking.status === selectedFilter;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#052658] mx-auto mb-4"></div>
          <p className="text-gray-500">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Bookings</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage and track your tour bookings
          </p>
        </div>

        {/* Stats Cards */}
        {bookings.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{bookings.length}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Confirmed</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {bookings.filter((b: any) => b.status === 'confirmed').length}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {bookings.filter((b: any) => b.status === 'pending').length}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Spent</p>
              <p className="text-2xl font-bold text-[#052658] dark:text-blue-400">
                ${bookings.reduce((sum: number, booking: any) => sum + booking.totalPrice, 0)}
              </p>
            </div>
          </div>
        )}

        {/* Filter Tabs */}
        {bookings.length > 0 && (
          <div className="flex gap-2 mb-6 flex-wrap">
            {['all', 'pending', 'confirmed', 'cancelled'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                  selectedFilter === filter
                    ? 'bg-[#052658] text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {filter} ({filter === 'all' ? bookings.length : bookings.filter((b: any) => b.status === filter).length})
              </button>
            ))}
          </div>
        )}

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Bookings Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {selectedFilter !== 'all' 
                ? `You have no ${selectedFilter} bookings.` 
                : "You haven't made any bookings yet."}
            </p>
            <button
              onClick={() => router.push('/tours')}
              className="bg-[#052658] text-white px-6 py-2 rounded-lg hover:bg-[#003a7a] transition-colors"
            >
              Browse Tours
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {currentBookings.map((booking: any) => (
                <div
                  key={booking._id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Tour Image */}
                    <div className="md:w-48 h-48 relative">
                      <Image
                        src={booking.tour?.image?.url || '/placeholder.jpg'}
                        alt={booking.tour?.title || 'Tour'}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Booking Details */}
                    <div className="flex-1 p-6">
                      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                        <div className="flex-1">
                          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            {booking.tour?.title || 'Tour'}
                          </h2>
                          
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                            <div className="flex items-center gap-1">
                              <FaMapMarkerAlt className="text-[#052658]" />
                              <span>{booking.tour?.location || 'Unknown'}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FaCalendar />
                              <span>Travel: {new Date(booking.travelDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FaUsers />
                              <span>{booking.guests} Guest(s)</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FaMoneyBillWave />
                              <span>Total: ${booking.totalPrice}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FaClock />
                              <span>Booked: {new Date(booking.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(booking.status)}`}>
                              {booking.status}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${getPaymentStatusColor(booking.paymentStatus)}`}>
                              {booking.paymentStatus}
                            </span>
                            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 capitalize">
                              {booking.paymentMethod}
                            </span>
                          </div>

                          {booking.specialRequest && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                              <span className="font-semibold">Special Request:</span> {booking.specialRequest}
                            </p>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto">
                          <button
                            onClick={() => handleViewDetails(booking._id)}
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                          >
                            <FaEye />
                            View Details
                          </button>
                          
                          {booking.status === 'pending' && (
                            <button
                              onClick={() => handleCancelBooking(booking._id)}
                              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                            >
                              Cancel Booking
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
                {/* Previous Button */}
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  <FaChevronLeft size={14} />
                  Previous
                </button>

                {/* Page Numbers */}
                <div className="flex gap-2">
                  {getPageNumbers().map((page, index) => (
                    <button
                      key={index}
                      onClick={() => typeof page === 'number' && goToPage(page)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        currentPage === page
                          ? 'bg-[#052658] text-white'
                          : page === '...'
                          ? 'bg-transparent cursor-default'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                      }`}
                      disabled={page === '...'}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                {/* Next Button */}
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  Next
                  <FaChevronRight size={14} />
                </button>
              </div>
            )}

            {/* Showing Info */}
            <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredBookings.length)} of {filteredBookings.length} bookings
            </div>
          </>
        )}
      </div>
    </div>
  );
}