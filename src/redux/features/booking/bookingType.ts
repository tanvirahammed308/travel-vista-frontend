// ========================
// Tour Image Types

import { Tour } from "../tour/tourType";

// ========================
export interface TourImage {
  public_id: string;
  url: string;
}

// ========================
// User Types
// ========================
export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  phone?: string;
  profilePicture?: string;
}

// ========================


// ========================
// Tour State
// ========================
export interface TourState {
  tours: Tour[];
  selectedTour: Tour | null;  
  currentTour?: Tour | null;   
  loading: boolean;
  error: string | null;
}

// ========================
// Tour Input Types
// ========================
export interface CreateTourInput {
  title: string;
  description: string;
  price: number;
  duration: string;
  location: string;
  image: File;
}

export interface UpdateTourInput {
  title?: string;
  description?: string;
  price?: number;
  duration?: string;
  location?: string;
  image?: File;
}

// ========================
// Tour API Responses
// ========================
export interface CreateTourResponse {
  success?: boolean;
  message?: string;
  tour: Tour;
}

export interface UpdateTourResponse {
  success?: boolean;
  message?: string;
  tour: Tour;
}

export interface GetToursResponse {
  tours: Tour[];
}

export interface GetTourResponse {
  tour: Tour;
}

export interface DeleteTourResponse {
  success?: boolean;
  message?: string;
}

// ========================
// Booking Types
// ========================
export interface Booking {
  _id: string;
  user: User | string;
  tour: Tour | string;
  bookingDate: string;
  travelDate: string;
  guests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  paymentStatus: 'unpaid' | 'paid' | 'refunded';
  paymentMethod: 'cash' | 'bkash' | 'nagad' | 'card';
  transactionId?: string;
  specialRequest?: string;
  createdAt: string;
  updatedAt: string;
}

// ========================
// API Response Types
// ========================
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  booking?: T;
  bookings?: T[];
  error?: string;
}

// ========================
// Request Types
// ========================
export interface CreateBookingData {
  tourId: string;
  travelDate: string;
  guests: number;
  paymentMethod: 'cash' | 'bkash' | 'nagad' | 'card';
  specialRequest?: string;
  transactionId?: string;
}

export interface UpdateBookingData {
  travelDate?: string;
  guests?: number;
  specialRequest?: string;
}

// ========================
// Response Types for Thunks
// ========================
export interface CreateBookingResponse {
  success: boolean;
  message?: string;
  booking: Booking;
}

export interface GetBookingsResponse {
  success: boolean;
  bookings: Booking[];
  total?: number;
}

export interface GetBookingResponse {
  success: boolean;
  booking: Booking;
}

export interface CancelBookingResponse {
  success: boolean;
  message: string;
}

export interface ConfirmBookingResponse {
  success: boolean;
  message: string;
}

export interface DeleteBookingResponse {
  success: boolean;
  message: string;
}

// ========================
// Redux State Types
// ========================
export interface BookingState {
  bookings: Booking[];
  currentBooking: Booking | null;
  statistics: BookingStatistics | null;
  loading: boolean;
  error: string | null;
  totalBookings: number;
}

// ========================
// Filter Types
// ========================
export interface BookingFilters {
  status?: 'pending' | 'confirmed' | 'cancelled' | 'all';
  paymentStatus?: 'unpaid' | 'paid' | 'refunded' | 'all';
  paymentMethod?: 'cash' | 'bkash' | 'nagad' | 'card' | 'all';
  startDate?: string;
  endDate?: string;
  search?: string;
}

// ========================
// Statistics Types
// ========================
export interface BookingStatistics {
  total: number;
  pending: number;
  confirmed: number;
  cancelled: number;
  totalRevenue: number;
  paidRevenue: number;
  unpaidRevenue: number;
  byPaymentMethod: {
    cash: number;
    bkash: number;
    nagad: number;
    card: number;
  };
}

// ========================
// Component Props Types
// ========================
export interface BookingCardProps {
  booking: Booking;
  onCancel?: (id: string) => void;
  onConfirm?: (id: string) => void;
  onView?: (id: string) => void;
  isAdmin?: boolean;
  showActions?: boolean;
}

export interface BookingFormProps {
  tour: Tour;
  onSubmit: (data: CreateBookingData) => void;
  isLoading: boolean;
  initialData?: Partial<CreateBookingData>;
}

export interface BookingStatusBadgeProps {
  status: 'pending' | 'confirmed' | 'cancelled';
  paymentStatus: 'unpaid' | 'paid' | 'refunded';
  size?: 'sm' | 'md' | 'lg';
  showPayment?: boolean;
}

export interface BookingFiltersProps {
  filters: BookingFilters;
  onFilterChange: (filters: BookingFilters) => void;
  onReset: () => void;
}