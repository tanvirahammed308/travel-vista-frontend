"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { FaChevronLeft, FaChevronRight, FaSearch, FaTimes } from "react-icons/fa";

import type { AppDispatch, RootState } from "@/redux/store";
import {
  getAllUsers,
  deleteUser,
} from "@/redux/features/auth/authThunk";

const UserPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { users, loading } = useSelector(
    (state: RootState) => state.auth
  );

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;

  /* ---------------- FETCH USERS ---------------- */
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  /* ---------------- DELETE USER ---------------- */
  const handleDelete = async (id: string) => {
    if (!id) return;

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it",
    });

    if (result.isConfirmed) {
      try {
        await dispatch(deleteUser(id)).unwrap();
        dispatch(getAllUsers());

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          position: "top-end",
          text: "User has been removed.",
          timer: 1200,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          position: "top-end",
          text: "Failed to delete user.",
          timer: 1200,
          showConfirmButton: false,
        });
      }
    }
  };

  // Filter users based on search term
  const filteredUsers = users?.filter((user: any) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.name?.toLowerCase().includes(searchLower) ||
      user.email?.toLowerCase().includes(searchLower) ||
      user.role?.toLowerCase().includes(searchLower)
    );
  }) || [];

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  // Generate page numbers
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleResetSearch = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00295D] mx-auto mb-4"></div>
          <p className="text-gray-500">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          User Management
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Total Users: <span className="font-semibold text-[#00295D] dark:text-blue-400">{filteredUsers.length}</span>
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search by name, email or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#00295D] focus:border-transparent outline-none dark:bg-gray-800 dark:text-white"
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          {searchTerm && (
            <button
              onClick={handleResetSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <FaTimes />
            </button>
          )}
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* HEAD */}
            <thead className="bg-[#00295D] dark:bg-[#01204C] text-white">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="text-left">Email</th>
                <th className="text-left">Role</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {currentUsers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-12 text-gray-500 dark:text-gray-400">
                    {searchTerm ? "No users found matching your search" : "No users found"}
                  </td>
                </tr>
              ) : (
                currentUsers.map((user: any, index: number) => (
                  <tr
                    key={user._id}
                    className={`border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition ${
                      index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-800/50"
                    }`}
                  >
                    {/* NAME */}
                    <td className="p-4 font-medium text-gray-800 dark:text-white">
                      {user.name}
                    </td>

                    {/* EMAIL */}
                    <td className="text-gray-600 dark:text-gray-300">
                      {user.email}
                    </td>

                    {/* ROLE BADGE */}
                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === "admin"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    {/* ACTION (DELETE ONLY FOR NON-ADMIN) */}
                    <td className="text-center">
                      {user.role !== "admin" ? (
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md text-sm transition"
                        >
                          Delete
                        </button>
                      ) : (
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                          Protected
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <FaChevronLeft size={14} />
            Previous
          </button>

          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === "number" && handlePageChange(page)}
              className={`px-3 py-2 rounded-lg transition-colors ${
                currentPage === page
                  ? "bg-[#00295D] dark:bg-[#01204C] text-white"
                  : page === "..."
                  ? "cursor-default bg-transparent"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
              disabled={page === "..."}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Next
            <FaChevronRight size={14} />
          </button>
        </div>
      )}

      {/* Showing Info */}
      {filteredUsers.length > 0 && (
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
          Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} users
        </div>
      )}
    </div>
  );
};

export default UserPage;