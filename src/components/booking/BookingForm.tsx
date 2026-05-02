'use client';

import { CreateBookingData, Tour } from '@/redux/features/booking/bookingType';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';


interface BookingFormProps {
  tour: Tour;
  onSubmit: (data: CreateBookingData) => void;
  isLoading: boolean;
}

const BookingForm: React.FC<BookingFormProps> = ({ tour, onSubmit, isLoading }) => {
  const [showTransactionId, setShowTransactionId] = useState(false);
  const today = new Date().toISOString().split('T')[0];

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateBookingData>({
    defaultValues: {
      tourId: tour._id,
      travelDate: '',
      guests: 1,
      paymentMethod: 'cash',
      specialRequest: '',
      transactionId: '',
    },
  });

  const watchedPaymentMethod = watch('paymentMethod');
  const watchedGuests = watch('guests');

  // Update transaction ID field visibility when payment method changes
  React.useEffect(() => {
    setShowTransactionId(watchedPaymentMethod !== 'cash');
    if (watchedPaymentMethod === 'cash') {
      setValue('transactionId', '');
    }
  }, [watchedPaymentMethod, setValue]);

  const totalPrice = tour.price * (watchedGuests || 1);

  const onFormSubmit = (data: CreateBookingData) => {
    // Only include transactionId if payment method is not cash
    const submitData = { ...data };
    if (submitData.paymentMethod === 'cash') {
      delete submitData.transactionId;
    }
    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Travel Date *
        </label>
        <Controller
          name="travelDate"
          control={control}
          rules={{ required: 'Travel date is required' }}
          render={({ field }) => (
            <input
              {...field}
              type="date"
              min={today}
              className={`w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#052658] outline-none dark:bg-gray-800 dark:border-gray-600 ${
                errors.travelDate ? 'border-red-500' : ''
              }`}
            />
          )}
        />
        {errors.travelDate && (
          <p className="text-red-500 text-xs mt-1">{errors.travelDate.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Number of Guests *
        </label>
        <Controller
          name="guests"
          control={control}
          rules={{
            required: 'Number of guests is required',
            min: { value: 1, message: 'At least 1 guest is required' },
            max: tour.maxGroupSize ? { value: tour.maxGroupSize, message: `Maximum ${tour.maxGroupSize} guests allowed` } : undefined,
          }}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              min="1"
              max={tour.maxGroupSize || 20}
              onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
              className={`w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#052658] outline-none dark:bg-gray-800 dark:border-gray-600 ${
                errors.guests ? 'border-red-500' : ''
              }`}
            />
          )}
        />
        {errors.guests ? (
          <p className="text-red-500 text-xs mt-1">{errors.guests.message}</p>
        ) : (
          tour.maxGroupSize && (
            <p className="text-xs text-gray-500 mt-1">Maximum {tour.maxGroupSize} guests allowed</p>
          )
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Payment Method *
        </label>
        <Controller
          name="paymentMethod"
          control={control}
          rules={{ required: 'Payment method is required' }}
          render={({ field }) => (
            <select
              {...field}
              className={`w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#052658] outline-none dark:bg-gray-800 dark:border-gray-600 ${
                errors.paymentMethod ? 'border-red-500' : ''
              }`}
            >
              <option value="cash">Cash (Pay at the destination)</option>
              <option value="bkash">bKash</option>
              <option value="nagad">Nagad</option>
              <option value="card">Credit/Debit Card</option>
            </select>
          )}
        />
        {errors.paymentMethod && (
          <p className="text-red-500 text-xs mt-1">{errors.paymentMethod.message}</p>
        )}
      </div>

      {showTransactionId && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Transaction ID *
          </label>
          <Controller
            name="transactionId"
            control={control}
            rules={{
              required: 'Transaction ID is required for online payment',
              minLength: { value: 3, message: 'Transaction ID must be at least 3 characters' },
            }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Enter your payment transaction ID"
                className={`w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#052658] outline-none dark:bg-gray-800 dark:border-gray-600 ${
                  errors.transactionId ? 'border-red-500' : ''
                }`}
              />
            )}
          />
          {errors.transactionId ? (
            <p className="text-red-500 text-xs mt-1">{errors.transactionId.message}</p>
          ) : (
            <p className="text-xs text-gray-500 mt-1">
              Please make the payment to this number: 01XXXXXXXXX
            </p>
          )}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Special Request (Optional)
        </label>
        <Controller
          name="specialRequest"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              rows={3}
              placeholder="Any special requirements or requests?"
              className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#052658] outline-none dark:bg-gray-800 dark:border-gray-600"
            />
          )}
        />
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between text-lg font-semibold">
          <span>Total Price:</span>
          <span className="text-[#052658] dark:text-blue-400">${totalPrice}</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          * Price per person: ${tour.price}
        </p>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#052658] text-white py-3 rounded-xl hover:bg-[#052658]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-600 dark:hover:bg-blue-700"
      >
        {isLoading ? 'Processing...' : 'Confirm Booking'}
      </button>
    </form>
  );
};

export default BookingForm;