// components/ui/TourDetailsSkeleton.tsx
'use client';

import React from 'react';

const TourDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Skeleton */}
      <div className="relative h-[50vh] md:h-[60vh] w-full bg-gray-300 dark:bg-gray-700 animate-pulse">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Back Button Skeleton */}
        <div className="absolute top-6 left-6 w-32 h-10 bg-white/20 rounded-lg animate-pulse" />
        
        {/* Title Overlay Skeleton */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="h-10 md:h-14 bg-white/20 rounded w-3/4 mb-2 animate-pulse" />
          <div className="h-6 md:h-8 bg-white/20 rounded w-1/2 animate-pulse" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content Skeleton - Left Side */}
          <div className="md:col-span-2 space-y-8">
            {/* Description Skeleton */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
              <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-4" />
              <div className="space-y-3">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full animate-pulse" />
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-11/12 animate-pulse" />
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-10/12 animate-pulse" />
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-9/12 animate-pulse" />
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-8/12 animate-pulse" />
              </div>
            </div>

            {/* Tour Highlights Skeleton */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
              <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse" />
                    <div className="flex-1">
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-20 animate-pulse mb-1" />
                      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-16 animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What's Included Skeleton */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
              <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-32 animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Card Skeleton - Right Side */}
          <div className="md:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                {/* Price Skeleton */}
                <div className="text-center mb-4">
                  <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-32 mx-auto animate-pulse" />
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24 mx-auto mt-2 animate-pulse" />
                </div>

                {/* Details Skeleton */}
                <div className="space-y-3 mb-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex justify-between py-2 border-b dark:border-gray-700">
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-20 animate-pulse" />
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-16 animate-pulse" />
                    </div>
                  ))}
                </div>

                {/* Buttons Skeleton */}
                <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-xl animate-pulse mb-3" />
                <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-xl animate-pulse" />

                {/* Footer Skeleton */}
                <div className="mt-4 text-center space-y-1">
                  <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-40 mx-auto animate-pulse" />
                  <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-36 mx-auto animate-pulse" />
                  <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-44 mx-auto animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section Skeleton */}
        <div className="mt-12">
          <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-4" />
          <div className="bg-gray-200 dark:bg-gray-700 rounded-2xl h-64 animate-pulse flex items-center justify-center">
            <div className="h-6 w-48 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
          </div>
        </div>

        {/* Reviews Section Skeleton */}
        <div className="mt-12">
          <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-4" />
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto animate-pulse mb-4" />
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-48 mx-auto animate-pulse mb-2" />
              <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-32 mx-auto animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetailsSkeleton;