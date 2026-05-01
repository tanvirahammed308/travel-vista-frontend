"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

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

  /* ---------------- FETCH USERS ---------------- */
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

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

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading users...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          User Management
        </h1>
        <p className="text-gray-500">
          Total Users: {users?.length || 0}
        </p>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">

        <table className="w-full">

          {/* HEAD */}
          <thead className="bg-[#00295D] text-white">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="text-left">Email</th>
              <th className="text-left">Role</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {users?.map((user: any, index: number) => (
              <tr
                key={user._id}
                className={`border-b hover:bg-gray-50 transition ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >

                {/* NAME */}
                <td className="p-4 font-medium text-gray-800">
                  {user.name}
                </td>

                {/* EMAIL */}
                <td className="text-gray-600">
                  {user.email}
                </td>

                {/* ROLE BADGE */}
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.role === "admin"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
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
                    <span className="text-xs text-gray-400">
                      Protected
                    </span>
                  )}
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default UserPage;