import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/lib/axios';
import {
  CreateBookingData,
  CreateBookingResponse,
  GetBookingsResponse,
  GetBookingResponse,
  CancelBookingResponse,
  ConfirmBookingResponse,
  DeleteBookingResponse,
  BookingFilters,
  BookingStatistics,
} from './bookingType';

// Create Booking
export const createBooking = createAsyncThunk<
  CreateBookingResponse,
  CreateBookingData,
  { rejectValue: string }
>('booking/create', async (bookingData, { rejectWithValue }) => {
  try {
    const response = await api.post<CreateBookingResponse>('/api/bookings', bookingData);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to create booking');
  }
});

// Get My Bookings
export const getMyBookings = createAsyncThunk<
  GetBookingsResponse,
  void,
  { rejectValue: string }
>('booking/getMyBookings', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get<GetBookingsResponse>('/api/bookings/my');
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch bookings');
  }
});

// Get Single Booking
export const getBookingById = createAsyncThunk<
  GetBookingResponse,
  string,
  { rejectValue: string }
>('booking/getById', async (id, { rejectWithValue }) => {
  try {
    const response = await api.get<GetBookingResponse>(`/api/bookings/${id}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch booking');
  }
});

// Cancel Booking
export const cancelBooking = createAsyncThunk<
  CancelBookingResponse,
  string,
  { rejectValue: string }
>('booking/cancel', async (id, { rejectWithValue }) => {
  try {
    const response = await api.put<CancelBookingResponse>(`/api/bookings/cancel/${id}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to cancel booking');
  }
});

// Admin: Get All Bookings with Filters
export const getAllBookings = createAsyncThunk<
  GetBookingsResponse,
  BookingFilters | void,
  { rejectValue: string }
>('booking/getAll', async (filters, { rejectWithValue }) => {
  try {
    const params = new URLSearchParams();
    if (filters) {
      if (filters.status && filters.status !== 'all') params.append('status', filters.status);
      if (filters.paymentStatus && filters.paymentStatus !== 'all') params.append('paymentStatus', filters.paymentStatus);
      if (filters.paymentMethod && filters.paymentMethod !== 'all') params.append('paymentMethod', filters.paymentMethod);
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);
      if (filters.search) params.append('search', filters.search);
    }
    
    const url = params.toString() ? `/api/bookings?${params.toString()}` : '/api/bookings';
    const response = await api.get<GetBookingsResponse>(url);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch bookings');
  }
});

// Admin: Confirm Booking
export const confirmBooking = createAsyncThunk<
  ConfirmBookingResponse,
  string,
  { rejectValue: string }
>('booking/confirm', async (id, { rejectWithValue }) => {
  try {
    const response = await api.put<ConfirmBookingResponse>(`/api/bookings/confirm/${id}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to confirm booking');
  }
});

// Admin: Delete Booking
export const deleteBooking = createAsyncThunk<
  DeleteBookingResponse,
  string,
  { rejectValue: string }
>('booking/delete', async (id, { rejectWithValue }) => {
  try {
    const response = await api.delete<DeleteBookingResponse>(`/api/bookings/${id}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to delete booking');
  }
});

// Admin: Get Booking Statistics
export const getBookingStatistics = createAsyncThunk<
  { success: boolean; statistics: BookingStatistics },
  void,
  { rejectValue: string }
>('booking/getStatistics', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get<{ success: boolean; statistics: BookingStatistics }>('/api/bookings/statistics');
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch statistics');
  }
});