// components/admin/bookings/AdminBookingStats.tsx
'use client';

import React from 'react';
import { 
  FaCalendarAlt, 
  FaCheckCircle, 
  FaHourglassHalf, 
  FaTimesCircle,
  FaDollarSign 
} from 'react-icons/fa';

interface BookingStatistics {
  total: number;
  pending: number;
  confirmed: number;
  cancelled: number;
  totalRevenue: number;
}

interface AdminBookingStatsProps {
  statistics: BookingStatistics;
}

const AdminBookingStats: React.FC<AdminBookingStatsProps> = ({ statistics }) => {
  const stats = [
    {
      title: 'Total Bookings',
      value: statistics.total,
      icon: FaCalendarAlt,
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      textColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      title: 'Pending',
      value: statistics.pending,
      icon: FaHourglassHalf,
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
      textColor: 'text-yellow-600 dark:text-yellow-400',
    },
    {
      title: 'Confirmed',
      value: statistics.confirmed,
      icon: FaCheckCircle,
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      textColor: 'text-green-600 dark:text-green-400',
    },
    {
      title: 'Cancelled',
      value: statistics.cancelled,
      icon: FaTimesCircle,
      bgColor: 'bg-red-100 dark:bg-red-900/30',
      textColor: 'text-red-600 dark:text-red-400',
    },
    {
      title: 'Total Revenue',
      value: `$${statistics.totalRevenue.toLocaleString()}`,
      icon: FaDollarSign,
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      textColor: 'text-purple-600 dark:text-purple-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`${stat.bgColor} rounded-lg shadow-sm p-4 transition-all hover:shadow-md`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {stat.title}
              </p>
              <p className={`text-2xl font-bold ${stat.textColor}`}>
                {stat.value}
              </p>
            </div>
            <stat.icon className={`w-8 h-8 ${stat.textColor}`} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminBookingStats;