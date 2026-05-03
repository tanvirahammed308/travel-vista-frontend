// components/ui/CheckoutSkeleton.tsx
'use client';

import React from 'react';

const CheckoutSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back Button Skeleton */}
      <div className="mb-6 flex items-center gap-2">
        <div className="w-5 h-5 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
        <div className="h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
      </div>

      {/* Header Skeleton */}
      <div className="h-10 w-64 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-8" />
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Side - Tour Details Skeleton */}
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden sticky top-24">
            <div className="relative h-64 bg-gray-300 dark:bg-gray-700 animate-pulse" />
            <div className="p-6 space-y-4">
              <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full animate-pulse" />
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-11/12 animate-pulse" />
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-10/12 animate-pulse" />
              </div>
              <div className="flex justify-between items-center pt-4 border-t dark:border-gray-700">
                <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-24 animate-pulse" />
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-20 animate-pulse" />
              </div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-32 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Right Side - Booking Form Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="h-7 bg-gray-300 dark:bg-gray-700 rounded w-40 animate-pulse mb-4" />
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i}>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24 animate-pulse mb-2" />
                <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-xl animate-pulse" />
              </div>
            ))}
            <div className="border-t pt-4">
              <div className="flex justify-between">
                <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-20 animate-pulse" />
                <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-16 animate-pulse" />
              </div>
              <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-32 animate-pulse mt-2" />
            </div>
            <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSkeleton;