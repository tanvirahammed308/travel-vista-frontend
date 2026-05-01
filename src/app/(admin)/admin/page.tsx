"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getAllUsers } from "@/redux/features/auth/authThunk";

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
} from "recharts";

const AdminPage = () => {
  const dispatch = useDispatch();

  // ========================
  // LOAD USERS FROM API
  // ========================
  useEffect(() => {
    dispatch(getAllUsers() as any);
  }, [dispatch]);

  // ========================
  // REDUX STATE
  // ========================
  const users = useSelector(
    (state: RootState) => state.auth.users || []
  );

  const products = useSelector(
    (state: any) => state.product?.products || []
  );

  const orders = useSelector(
    (state: any) => state.order?.orders || []
  );

  // ========================
  // STATS
  // ========================
  const totalUsers = users.length;
  const totalProducts = products.length;
  const totalOrders = orders.length;

  const revenue = orders.reduce((sum: number, order: any) => {
    return sum + (order.amount || 0);
  }, 0);

  // ========================
  // BAR CHART DATA
  // ========================
  const chartData = [
    { name: "Users", value: totalUsers },
    { name: "Orders", value: totalOrders },
    { name: "Products", value: totalProducts },
    { name: "Revenue", value: revenue },
  ];

  // ========================
  // PIE CHART DATA
  // ========================
  const orderStatusData = [
    {
      name: "Completed",
      value: orders.filter((o: any) => o.status === "Completed").length,
    },
    {
      name: "Pending",
      value: orders.filter((o: any) => o.status === "Pending").length,
    },
    {
      name: "Cancelled",
      value: orders.filter((o: any) => o.status === "Cancelled").length,
    },
  ];

  const COLORS = ["#22c55e", "#facc15", "#ef4444"];

  // ========================
  // UI
  // ========================
  return (
    <div className="space-y-6 p-4">

      {/* TITLE */}
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="bg-white shadow rounded-2xl p-5">
          <h2 className="text-gray-500 text-sm">Total Users</h2>
          <p className="text-2xl font-bold">{totalUsers}</p>
        </div>

        <div className="bg-white shadow rounded-2xl p-5">
          <h2 className="text-gray-500 text-sm">Total Orders</h2>
          <p className="text-2xl font-bold">{totalOrders}</p>
        </div>

        <div className="bg-white shadow rounded-2xl p-5">
          <h2 className="text-gray-500 text-sm">Revenue</h2>
          <p className="text-2xl font-bold">${revenue}</p>
        </div>

        <div className="bg-white shadow rounded-2xl p-5">
          <h2 className="text-gray-500 text-sm">Products</h2>
          <p className="text-2xl font-bold">{totalProducts}</p>
        </div>

      </div>

      {/* BAR CHART */}
      <div className="bg-white shadow rounded-2xl p-5">
        <h2 className="text-lg font-semibold mb-4">Overview</h2>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* PIE + ORDERS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* PIE CHART */}
        <div className="bg-white shadow rounded-2xl p-5">
          <h2 className="text-lg font-semibold mb-4">Order Status</h2>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderStatusData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {orderStatusData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RECENT ORDERS */}
        <div className="bg-white shadow rounded-2xl p-5">
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">

              <thead>
                <tr className="border-b">
                  <th className="p-2">Order ID</th>
                  <th className="p-2">User</th>
                  <th className="p-2">Amount</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.slice(0, 5).map((order: any, i: number) => (
                  <tr key={i} className="border-b">
                    <td className="p-2">{order.id}</td>
                    <td className="p-2">{order.user}</td>
                    <td className="p-2">${order.amount}</td>
                    <td
                      className={`p-2 ${
                        order.status === "Completed"
                          ? "text-green-600"
                          : order.status === "Pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {order.status}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminPage;