// app/packages/page.tsx
'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { AppDispatch, RootState } from '@/redux/store';
import { getAllTours } from '@/redux/features/tour/tourThunk';
import Image from 'next/image';
import { 
  FaMapMarkerAlt, 
  FaStar, 
  FaStarHalfAlt, 
  FaRegStar,
  FaFilter,
  FaSearch,
  FaTimes,
  FaClock,
  FaUsers,
  FaArrowRight,
  FaWallet,
  FaTag,
  FaExclamationTriangle
} from 'react-icons/fa';
import { MdOutlineCategory } from 'react-icons/md';
import PackagesSkeleton from '@/components/ui/PackagesSkeleton';

export default function PackagesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { tours = [], loading, error } = useSelector((state: RootState) => state.tour);
  const { user } = useSelector((state: RootState) => state.auth);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    dispatch(getAllTours());
  }, [dispatch]);

  // Get unique categories from tours
  const categories = useMemo(() => {
    const cats = new Set(tours.map((tour: any) => tour.category).filter(Boolean));
    return ['all', ...Array.from(cats)];
  }, [tours]);

  // Get min and max price for range
  const priceStats = useMemo(() => {
    if (tours.length === 0) {
      return { min: 0, max: 1000 };
    }
    const prices = tours.map((tour: any) => tour.price).filter(Boolean);
    return {
      min: Math.min(...prices, 0),
      max: Math.max(...prices, 1000)
    };
  }, [tours]);

  // Update price range when tours load
  useEffect(() => {
    if (tours.length > 0) {
      setPriceRange({ min: priceStats.min, max: priceStats.max });
    }
  }, [tours.length, priceStats.min, priceStats.max]);

  // Filter and sort tours
  const filteredTours = useMemo(() => {
    if (!tours || tours.length === 0) {
      return [];
    }
    
    let filtered = [...tours];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter((tour: any) =>
        tour.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((tour: any) => tour.category === selectedCategory);
    }

    // Price filter
    filtered = filtered.filter((tour: any) => 
      tour.price >= priceRange.min && tour.price <= priceRange.max
    );

    // Sorting
    switch (sortBy) {
      case 'price_low':
        filtered.sort((a: any, b: any) => a.price - b.price);
        break;
      case 'price_high':
        filtered.sort((a: any, b: any) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'duration':
        filtered.sort((a: any, b: any) => (parseInt(a.duration) || 0) - (parseInt(b.duration) || 0));
        break;
      default:
        filtered.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return filtered;
  }, [tours, searchTerm, selectedCategory, sortBy, priceRange]);

  // Pagination
  const totalPages = Math.ceil(filteredTours.length / itemsPerPage);
  const paginatedTours = filteredTours.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSortBy('default');
    setPriceRange({ min: priceStats.min, max: priceStats.max });
    setCurrentPage(1);
  };

  const handleBookNow = (tourId: string) => {
    if (!user) {
      router.push(`/login?redirect=/tours/${tourId}/checkout`);
    } else {
      router.push(`/tours/${tourId}/checkout`);
    }
  };

  const handleViewDetails = (tourId: string) => {
    router.push(`/tours/${tourId}`);
  };

  const renderRating = (rating: number = 0) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} className="text-yellow-400 text-sm" />
        ))}
        {hasHalfStar && <FaStarHalfAlt className="text-yellow-400 text-sm" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} className="text-yellow-400 text-sm" />
        ))}
        <span className="text-gray-600 dark:text-gray-400 text-sm ml-1">
          ({rating.toFixed(1)})
        </span>
      </div>
    );
  };

  // Show skeleton while loading
  if (loading) {
    return <PackagesSkeleton />;
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-center">
          <FaExclamationTriangle className="text-red-500 text-6xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Failed to Load Packages
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error}
          </p>
          <button
            onClick={() => dispatch(getAllTours())}
            className="bg-[#01204C] text-white px-6 py-2 rounded-lg hover:bg-[#01204C]/80 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // No tours found in database
  if (!loading && tours.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            No Packages Available
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We couldn't find any tour packages at the moment.
          </p>
          <button
            onClick={() => router.push('/')}
            className="bg-[#01204C] text-white px-6 py-2 rounded-lg hover:bg-[#01204C]/80 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Banner */}
      <div className="relative h-64 md:h-80 bg-gradient-to-r from-[#01204C] to-[#01204C]/80">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="px-4">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Explore Our Packages
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              Discover amazing destinations and unforgettable experiences
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar - Only show if there are tours */}
        {tours.length > 0 && (
          <>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search Input */}
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search by destination, tour name, category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#01204C] focus:border-transparent outline-none dark:bg-gray-700 dark:text-white"
                  />
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#01204C] outline-none dark:bg-gray-700 dark:text-white"
                >
                  <option value="default">Sort by: Latest</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="rating">Rating: High to Low</option>
                  <option value="duration">Duration: Short to Long</option>
                </select>

                {/* Filter Toggle Button */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <FaFilter />
                  Filters
                </button>

                {/* Reset Button */}
                {(searchTerm || selectedCategory !== 'all' || priceRange.min > priceStats.min || priceRange.max < priceStats.max) && (
                  <button
                    onClick={handleResetFilters}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <FaTimes />
                    Reset
                  </button>
                )}
              </div>

              {/* Expandable Filters */}
              {showFilters && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Category Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Category
                      </label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#01204C] outline-none dark:bg-gray-700 dark:text-white"
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat === 'all' ? 'All Categories' : cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Price Range */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Price Range: ${priceRange.min} - ${priceRange.max}
                      </label>
                      <div className="flex gap-4">
                        <input
                          type="number"
                          placeholder="Min"
                          value={priceRange.min}
                          onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) || 0 })}
                          className="w-1/2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#01204C] outline-none dark:bg-gray-700 dark:text-white"
                        />
                        <input
                          type="number"
                          placeholder="Max"
                          value={priceRange.max}
                          onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) || priceStats.max })}
                          className="w-1/2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#01204C] outline-none dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-400">
                Found <span className="font-semibold text-[#01204C]">{filteredTours.length}</span> amazing packages
              </p>
            </div>
          </>
        )}

        {/* Tours Grid */}
        {filteredTours.length === 0 && tours.length > 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Packages Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filters
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-4 bg-[#01204C] text-white px-6 py-2 rounded-lg hover:bg-[#01204C]/80 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          filteredTours.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedTours.map((tour: any) => (
                  <div
                    key={tour._id}
                    className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Image Container */}
                    <div 
                      className="relative h-56 overflow-hidden cursor-pointer"
                      onClick={() => handleViewDetails(tour._id)}
                    >
                      <Image
                        src={tour.image?.url || '/placeholder.jpg'}
                        alt={tour.title || tour.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Price Badge */}
                      <div className="absolute top-4 right-4 bg-[#01204C] text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                        <FaWallet size={12} />
                        ${tour.price}
                      </div>
                      {/* Category Badge */}
                      {tour.category && (
                        <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
                          <MdOutlineCategory />
                          {tour.category}
                        </div>
                      )}
                      {/* Discount Badge (optional - if you have discount field) */}
                      {tour.discount && (
                        <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                          <FaTag size={10} />
                          {tour.discount}% OFF
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 line-clamp-1">
                        {tour.title || tour.name}
                      </h3>
                      
                      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-3">
                        <FaMapMarkerAlt className="text-[#01204C]" />
                        <span className="text-sm">{tour.location || 'Unknown location'}</span>
                      </div>

                      {tour.rating && renderRating(tour.rating)}

                      <p className="text-gray-600 dark:text-gray-300 text-sm mt-3 line-clamp-2">
                        {tour.description?.slice(0, 100)}...
                      </p>

                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                          {tour.duration && (
                            <div className="flex items-center gap-1">
                              <FaClock size={12} />
                              <span>{tour.duration}</span>
                            </div>
                          )}
                          {tour.maxGroupSize && (
                            <div className="flex items-center gap-1">
                              <FaUsers size={12} />
                              <span>{tour.maxGroupSize}</span>
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => handleBookNow(tour._id)}
                          className="flex items-center gap-2 px-4 py-2 bg-[#01204C] text-white rounded-lg hover:bg-[#01204C]/80 transition-colors text-sm"
                        >
                          Book Now
                          <FaArrowRight size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    Previous
                  </button>
                  
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    if (
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={index}
                          onClick={() => setCurrentPage(pageNumber)}
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            currentPage === pageNumber
                              ? 'bg-[#01204C] text-white'
                              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    }
                    if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
                      return <span key={index} className="px-2 text-gray-500">...</span>;
                    }
                    return null;
                  })}
                  
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )
        )}
      </div>
    </div>
  );
}