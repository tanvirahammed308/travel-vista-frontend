"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { getAllUsers } from "@/redux/features/auth/authThunk";
import { getAllTours } from "@/redux/features/tour/tourThunk";
import { getAllBookings, getBookingStatistics } from "@/redux/features/booking/bookingThunk";
import { useRouter } from "next/navigation";
import Image from "next/image";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

import {
  FaUsers,
  FaMapMarkedAlt,
  FaCalendarCheck,
  FaDollarSign,
  FaUserPlus,
  FaChartLine,
  FaArrowRight,
  FaEye,
  FaCheckCircle,
  FaSpinner,
} from "react-icons/fa";

const AdminPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // ========================
  // REDUX STATE
  // ========================
  const { users } = useSelector((state: RootState) => state.auth);
  const { tours } = useSelector((state: RootState) => state.tour);
  const { bookings, statistics } = useSelector((state: RootState) => state.booking);

  // ========================
  // LOCAL STATE
  // ========================
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ========================
  // LOAD DATA
  // ========================
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        dispatch(getAllUsers() as any),
        dispatch(getAllTours()),
        dispatch(getAllBookings()),
        dispatch(getBookingStatistics()),
      ]);
      setLoading(false);
    };
    loadData();
  }, [dispatch]);

  // ========================
  // STATS CARDS DATA
  // ========================
  const totalUsers = users?.length || 0;
  const totalTours = tours?.length || 0;
  const totalBookings = bookings?.length || 0;
  const confirmedBookings = bookings?.filter((b: any) => b.status === "confirmed").length || 0;
  const pendingBookings = bookings?.filter((b: any) => b.status === "pending").length || 0;
  
  // Calculate total revenue
  const totalRevenue = bookings?.reduce((sum: number, booking: any) => {
    if (booking.status === "confirmed" || booking.status === "pending") {
      return sum + (booking.totalPrice || 0);
    }
    return sum;
  }, 0) || 0;

  // ========================
  // MONTHLY BOOKINGS CHART DATA
  // ========================
  const getMonthlyBookings = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthlyData = months.map(month => ({ name: month, bookings: 0, revenue: 0 }));

    bookings?.forEach((booking: any) => {
      const date = new Date(booking.createdAt);
      const monthIndex = date.getMonth();
      monthlyData[monthIndex].bookings += 1;
      monthlyData[monthIndex].revenue += booking.totalPrice || 0;
    });

    return monthlyData;
  };

  // ========================
  // RECENT BOOKINGS
  // ========================
  const recentBookings = [...bookings]
    .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  // ========================
  // TOP DESTINATIONS
  // ========================
  const getTopDestinations = () => {
    const destinationCount: { [key: string]: number } = {};
    tours?.forEach((tour: any) => {
      const location = tour.location;
      destinationCount[location] = (destinationCount[location] || 0) + 1;
    });
    return Object.entries(destinationCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  };

  // ========================
  // STATUS COLORS
  // ========================
  const getBookingStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // ========================
  // STATS CARDS
  // ========================
  const statsCards = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: FaUsers,
      color: "bg-blue-500",
      bgLight: "bg-blue-100 dark:bg-blue-900/30",
      textColor: "text-blue-600 dark:text-blue-400",
      link: "/admin/users",
    },
    {
      title: "Total Tours",
      value: totalTours,
      icon: FaMapMarkedAlt,
      color: "bg-green-500",
      bgLight: "bg-green-100 dark:bg-green-900/30",
      textColor: "text-green-600 dark:text-green-400",
      link: "/admin/tours",
    },
    {
      title: "Total Bookings",
      value: totalBookings,
      icon: FaCalendarCheck,
      color: "bg-purple-500",
      bgLight: "bg-purple-100 dark:bg-purple-900/30",
      textColor: "text-purple-600 dark:text-purple-400",
      link: "/admin/bookings",
    },
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: FaDollarSign,
      color: "bg-orange-500",
      bgLight: "bg-orange-100 dark:bg-orange-900/30",
      textColor: "text-orange-600 dark:text-orange-400",
      link: "/admin/bookings",
    },
    {
      title: "Confirmed Bookings",
      value: confirmedBookings,
      icon: FaCheckCircle,
      color: "bg-emerald-500",
      bgLight: "bg-emerald-100 dark:bg-emerald-900/30",
      textColor: "text-emerald-600 dark:text-emerald-400",
      link: "/admin/bookings",
    },
    {
      title: "Pending Bookings",
      value: pendingBookings,
      icon: FaSpinner,
      color: "bg-yellow-500",
      bgLight: "bg-yellow-100 dark:bg-yellow-900/30",
      textColor: "text-yellow-600 dark:text-yellow-400",
      link: "/admin/bookings",
    },
  ];

  // ========================
  // LOADING
  // ========================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#01204C] mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Welcome back! Here's what's happening with your travel platform.
        </p>
      </div>

      {/* STATS CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statsCards.map((stat, index) => (
          <div
            key={index}
            onClick={() => router.push(stat.link)}
            className="cursor-pointer group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-4 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  {stat.title}
                </p>
                <p className={`text-xl font-bold mt-1 ${stat.textColor}`}>
                  {stat.value}
                </p>
              </div>
              <div className={`${stat.bgLight} p-3 rounded-full group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-5 h-5 ${stat.textColor}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CHARTS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* MONTHLY BOOKINGS CHART */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Monthly Bookings Overview
            </h2>
            <FaChartLine className="text-blue-500" />
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={getMonthlyBookings()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="bookings"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* TOP DESTINATIONS PIE CHART */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Top Destinations
            </h2>
            <FaMapMarkedAlt className="text-green-500" />
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={getTopDestinations()}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {getTopDestinations().map((_, index) => (
                    <Cell key={index} fill={`hsl(${index * 45}, 70%, 50%)`} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* SECOND ROW CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* REVENUE CHART */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Monthly Revenue
            </h2>
            <FaDollarSign className="text-green-500" />
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getMonthlyBookings()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  formatter={(value: any) => [`$${value}`, "Revenue"]}
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "none",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="revenue" fill="#f59e0b" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* BOOKING STATUS DISTRIBUTION */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Booking Status Distribution
            </h2>
            <FaCalendarCheck className="text-purple-500" />
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: "Confirmed", value: confirmedBookings },
                    { name: "Pending", value: pendingBookings },
                    { name: "Cancelled", value: totalBookings - confirmedBookings - pendingBookings },
                  ]}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  <Cell fill="#22c55e" />
                  <Cell fill="#facc15" />
                  <Cell fill="#ef4444" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* RECENT BOOKINGS TABLE */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Recent Bookings
          </h2>
          <button
            onClick={() => router.push("/admin/bookings")}
            className="text-sm text-[#01204C] dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            View All
            <FaArrowRight size={12} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Tour
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Travel Date
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {recentBookings.map((booking: any) => (
                <tr key={booking._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition">
                  <td className="px-5 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 relative rounded-lg overflow-hidden">
                        <Image
                          src={booking.tour?.image?.url || "/placeholder.jpg"}
                          alt={booking.tour?.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {booking.tour?.title?.slice(0, 20)}...
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                    {booking.user?.name || "Unknown"}
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                    {new Date(booking.travelDate).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">
                    ${booking.totalPrice}
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getBookingStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap">
                    <button
                      onClick={() => router.push(`/admin/bookings/${booking._id}`)}
                      className="text-[#01204C] dark:text-blue-400 hover:underline flex items-center gap-1 text-sm"
                    >
                      <FaEye size={12} />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {recentBookings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No bookings found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;