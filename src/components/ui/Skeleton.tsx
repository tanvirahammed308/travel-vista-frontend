// components/ui/Skeleton.tsx
'use client';

import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
  animation = 'pulse',
}) => {
  const baseClasses = 'bg-gray-200 dark:bg-gray-700';
  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent',
    none: '',
  };

  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const styles: React.CSSProperties = {};
  if (width) styles.width = typeof width === 'number' ? `${width}px` : width;
  if (height) styles.height = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
      style={styles}
    />
  );
};

// Specific skeleton components
export const CarouselSkeleton = () => (
  <div className="w-full h-[500px]">
    <Skeleton className="w-full h-full" />
  </div>
);

export const CardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
    <Skeleton className="h-48 w-full" />
    <div className="p-4 space-y-3">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  </div>
);

export const GridSkeleton = ({ items = 6, cols = 3 }: { items?: number; cols?: number }) => (
  <div className={`grid grid-cols-1 md:grid-cols-${cols} gap-6`}>
    {Array(items).fill(0).map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
);