import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
  getAllBookings,
  confirmBooking,
  deleteBooking,
  getBookingStatistics,
} from './bookingThunk';
import { BookingState, Booking, BookingStatistics } from './bookingType';

const initialState: BookingState = {
  bookings: [],
  currentBooking: null,
  statistics: null,
  loading: false,
  error: null,
  totalBookings: 0,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentBooking: (state) => {
      state.currentBooking = null;
    },
    updateBookingLocally: (state, action: PayloadAction<{ id: string; updates: Partial<Booking> }>) => {
      const { id, updates } = action.payload;
      const index = state.bookings.findIndex((b) => b._id === id);
      if (index !== -1) {
        state.bookings[index] = { ...state.bookings[index], ...updates };
      }
      if (state.currentBooking?._id === id) {
        state.currentBooking = { ...state.currentBooking, ...updates };
      }
    },
    removeBookingLocally: (state, action: PayloadAction<string>) => {
      state.bookings = state.bookings.filter((b) => b._id !== action.payload);
      if (state.currentBooking?._id === action.payload) {
        state.currentBooking = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Booking
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.currentBooking = action.payload.booking;
      })
      .addCase(createBooking.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Failed to create booking';
      })

      // Get My Bookings
      .addCase(getMyBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyBookings.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.bookings = action.payload.bookings;
        state.totalBookings = action.payload.bookings.length;
      })
      .addCase(getMyBookings.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch bookings';
      })

      // Get Single Booking
      .addCase(getBookingById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBookingById.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.currentBooking = action.payload.booking;
      })
      .addCase(getBookingById.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch booking';
      })

      // Cancel Booking
      .addCase(cancelBooking.fulfilled, (state, action) => {
        const bookingId = action.meta.arg;
        if (state.currentBooking?._id === bookingId) {
          state.currentBooking.status = 'cancelled';
        }
        const index = state.bookings.findIndex((b) => b._id === bookingId);
        if (index !== -1) {
          state.bookings[index].status = 'cancelled';
        }
      })

      // Admin: Get All Bookings
      .addCase(getAllBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBookings.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.bookings = action.payload.bookings;
        state.totalBookings = action.payload.bookings.length;
      })
      .addCase(getAllBookings.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch bookings';
      })

      // Admin: Confirm Booking
      .addCase(confirmBooking.fulfilled, (state, action) => {
        const bookingId = action.meta.arg;
        if (state.currentBooking?._id === bookingId) {
          state.currentBooking.status = 'confirmed';
          state.currentBooking.paymentStatus = 'paid';
        }
        const index = state.bookings.findIndex((b) => b._id === bookingId);
        if (index !== -1) {
          state.bookings[index].status = 'confirmed';
          state.bookings[index].paymentStatus = 'paid';
        }
      })

      // Admin: Delete Booking
      .addCase(deleteBooking.fulfilled, (state, action) => {
        const bookingId = action.meta.arg;
        state.bookings = state.bookings.filter((b) => b._id !== bookingId);
        if (state.currentBooking?._id === bookingId) {
          state.currentBooking = null;
        }
      })

      // Get Booking Statistics - Fixed version
      .addCase(getBookingStatistics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBookingStatistics.fulfilled, (state, action) => {
        state.loading = false;
        // Extract statistics from the payload if it's wrapped in an object
        const payload = action.payload as any;
        state.statistics = payload.statistics || payload;
      })
      .addCase(getBookingStatistics.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch statistics';
      });
  },
});

export const { 
  clearError, 
  clearCurrentBooking, 
  updateBookingLocally, 
  removeBookingLocally 
} = bookingSlice.actions;

export default bookingSlice.reducer;