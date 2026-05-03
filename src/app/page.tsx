'use client';

import { useEffect, useState } from 'react';
import Carousel from '@/components/home/hero/Carousel'
import HowItWorks from '@/components/home/howItWorks/HowItWorks'
import Location from '@/components/home/location/Location'
import Popular from '@/components/home/popular/Popular'
import Price from '@/components/home/price/Price'
import Special from '@/components/home/specialOffer/Special'
import Subscribe from '@/components/home/subscribe/Subscribe'
import Transport from '@/components/home/transport/Transport'
import { Skeleton } from '@/components/ui/Skeleton';

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        {/* Hero Skeleton */}
        <Skeleton className="w-full h-[500px] rounded-xl" />
        
        {/* Location Skeleton */}
        <div className="container mx-auto px-4">
          <Skeleton className="h-8 w-48 rounded mx-auto mb-6" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1,2,3,4].map((i) => (
              <Skeleton key={i} className="h-32 rounded-lg" />
            ))}
          </div>
        </div>
        
        {/* Popular Tours Skeleton */}
        <div className="container mx-auto px-4">
          <Skeleton className="h-8 w-64 rounded mx-auto mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1,2,3].map((i) => (
              <Skeleton key={i} className="h-96 rounded-xl" />
            ))}
          </div>
        </div>
        
        {/* Special Offer Skeleton */}
        <Skeleton className="h-[400px] rounded-xl mx-4" />
        
        {/* Transport Skeleton */}
        <div className="container mx-auto px-4">
          <Skeleton className="h-8 w-48 rounded mx-auto mb-6" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1,2,3,4].map((i) => (
              <Skeleton key={i} className="h-24 rounded-lg" />
            ))}
          </div>
        </div>
        
        {/* Price Skeleton */}
        <div className="container mx-auto px-4">
          <Skeleton className="h-8 w-56 rounded mx-auto mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1,2,3].map((i) => (
              <Skeleton key={i} className="h-64 rounded-xl" />
            ))}
          </div>
        </div>
        
        {/* How It Works Skeleton */}
        <div className="container mx-auto px-4">
          <Skeleton className="h-8 w-64 rounded mx-auto mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1,2,3].map((i) => (
              <Skeleton key={i} className="h-48 rounded-xl" />
            ))}
          </div>
        </div>
        
        {/* Subscribe Skeleton */}
        <Skeleton className="h-64 rounded-xl mx-4" />
      </div>
    );
  }

  return (
    <div>
      <Carousel />
      <Location/>
      <Popular />
      <Special />
      <Transport />
      <Price />
      <HowItWorks />
      <Subscribe/>
    </div>
  );
};

export default HomePage;