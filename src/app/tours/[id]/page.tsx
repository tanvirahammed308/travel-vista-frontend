// app/tours/[id]/page.tsx
'use client';

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import Swal from "sweetalert2";

import type { RootState, AppDispatch } from "@/redux/store";
import { getTourById } from "@/redux/features/tour/tourThunk";

const TourDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  
  const { selectedTour, loading } = useSelector((state: RootState) => state.tour);
  const { user } = useSelector((state: RootState) => state.auth);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getTourById(id as string));
    }
  }, [dispatch, id]);

  const handleBookNow = () => {
    if (!user) {
      Swal.fire({
        title: 'Login Required',
        text: 'Please login to book this tour',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#00295D',
        confirmButtonText: 'Login Now',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          router.push(`/login?redirect=/tours/${id}/checkout`);
        }
      });
    } else {
      router.push(`/tours/${id}/checkout`);
    }
  };

  const handleBack = () => {
    router.back();
  };

  if (loading || !selectedTour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00295D] mx-auto mb-4"></div>
          <p className="text-gray-500">Loading tour details...</p>
        </div>
      </div>
    );
  }

  // Get images array
  const images = selectedTour.image?.url 
    ? [selectedTour.image.url] 
    : ['/placeholder.jpg'];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section with Image */}
      <div className="relative h-[50vh] md:h-[60vh] w-full">
        <Image
          src={images[selectedImage]}
          alt={selectedTour.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="absolute top-6 left-6 bg-white/90 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800 text-gray-800 dark:text-white px-4 py-2 rounded-lg shadow-lg transition-colors z-10 flex items-center gap-2"
        >
          ← Back to Tours
        </button>
        
        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-2">{selectedTour.title}</h1>
          <p className="text-lg md:text-xl opacity-90">📍 {selectedTour.location}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content - Left Side */}
          <div className="md:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">About This Tour</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {showFullDescription 
                  ? selectedTour.description 
                  : `${selectedTour.description?.slice(0, 300)}${selectedTour.description?.length > 300 ? '...' : ''}`}
              </p>
              {selectedTour.description?.length > 300 && (
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="mt-2 text-[#00295D] dark:text-blue-400 hover:underline font-medium"
                >
                  {showFullDescription ? 'Show Less' : 'Read More'}
                </button>
              )}
            </div>

            {/* Tour Highlights */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Tour Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <span className="text-xl">⏱</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">Duration</p>
                    <p className="text-gray-600 dark:text-gray-400">{selectedTour.duration || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <span className="text-xl">📍</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">Location</p>
                    <p className="text-gray-600 dark:text-gray-400">{selectedTour.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                    <span className="text-xl">👥</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">Max Group Size</p>
                    <p className="text-gray-600 dark:text-gray-400">{selectedTour.maxGroupSize || 'Unlimited'} people</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                    <span className="text-xl">⭐</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">Rating</p>
                    <p className="text-gray-600 dark:text-gray-400">{selectedTour.rating || '4.5'} / 5.0</p>
                  </div>
                </div>
              </div>
            </div>

            {/* What's Included */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">What's Included</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <span className="text-green-500">✓</span> Professional Guide
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <span className="text-green-500">✓</span> Transportation
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <span className="text-green-500">✓</span> Meals (as specified)
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <span className="text-green-500">✓</span> Accommodation
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <span className="text-green-500">✓</span> Entrance Fees
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <span className="text-green-500">✓</span> 24/7 Support
                </div>
              </div>
            </div>
          </div>

          {/* Booking Card - Right Side (Sticky) */}
          <div className="md:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <div className="text-center mb-4">
                  <span className="text-3xl font-bold text-[#00295D] dark:text-blue-400">
                    ${selectedTour.price}
                  </span>
                  <span className="text-gray-500"> / per person</span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between py-2 border-b dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">Duration</span>
                    <span className="font-semibold dark:text-white">{selectedTour.duration || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">Group Size</span>
                    <span className="font-semibold dark:text-white">{selectedTour.maxGroupSize || 'Unlimited'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">Location</span>
                    <span className="font-semibold dark:text-white">{selectedTour.location}</span>
                  </div>
                </div>

                <button
                  onClick={handleBookNow}
                  className="w-full bg-[#00295D] hover:bg-[#003a7a] dark:bg-blue-600 dark:hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-colors mb-3"
                >
                  Book Now
                </button>

                <button
                  onClick={() => router.push('/tours')}
                  className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-3 rounded-xl font-semibold transition-colors"
                >
                  Browse Other Tours
                </button>

                <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                  <p>✅ Free cancellation up to 7 days</p>
                  <p>✅ Best price guarantee</p>
                  <p>✅ Instant confirmation</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Location Map</h2>
          <div className="bg-gray-200 dark:bg-gray-700 rounded-2xl h-64 flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">
              📍 {selectedTour.location} - Map view will be available soon
            </p>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Customer Reviews</h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 text-center">
            <p className="text-gray-500 dark:text-gray-400">No reviews yet. Be the first to review!</p>
            <button className="mt-3 text-[#00295D] dark:text-blue-400 hover:underline">
              Write a Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetailsPage;