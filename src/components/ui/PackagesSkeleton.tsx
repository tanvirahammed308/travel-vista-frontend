// components/ui/PackagesSkeleton.tsx
'use client';

import React from 'react';

const PackagesSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Banner Skeleton */}
      <div className="relative h-64 md:h-80 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-800 animate-pulse">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="px-4">
            <div className="h-10 md:h-14 w-64 bg-white/20 rounded mx-auto mb-4 animate-pulse" />
            <div className="h-5 w-96 bg-white/20 rounded mx-auto animate-pulse" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="w-full h-10 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse" />
            </div>
            <div className="w-48 h-10 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse" />
            <div className="w-24 h-10 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse" />
            <div className="w-24 h-10 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse" />
          </div>
        </div>

        {/* Results Count Skeleton */}
        <div className="mb-6">
          <div className="h-5 w-48 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
        </div>

        {/* Tours Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
              {/* Image Skeleton */}
              <div className="relative h-56 bg-gray-300 dark:bg-gray-700 animate-pulse" />
              
              {/* Content Skeleton */}
              <div className="p-5 space-y-3">
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 animate-pulse" />
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star} className="w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
                  ))}
                  <div className="w-12 h-3 bg-gray-300 dark:bg-gray-700 rounded ml-1 animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full animate-pulse" />
                  <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-11/12 animate-pulse" />
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
                    <div className="w-16 h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
                  </div>
                  <div className="w-24 h-8 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
          <div className="w-20 h-10 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse" />
          <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse" />
          <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse" />
          <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse" />
          <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse" />
          <div className="w-20 h-10 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default PackagesSkeleton;