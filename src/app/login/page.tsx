"use client";

import { loginUser } from "@/redux/features/auth/authThunk";
import { AppDispatch } from "@/redux/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);

    try {
      const result = await dispatch(loginUser(data));

      if (loginUser.fulfilled.match(result)) {
        const user = result.payload.user;

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: result.payload.message || "Login successful",
          showConfirmButton: false,
          timer: 1500,
        });

        // redirect
        if (user.role === "admin") {
          router.replace("/admin");
        } else {
          router.replace("/dashboard");
        }
      } else {
        const errorMessage =
          (result.payload as string) || "Login failed";

        Swal.fire({
          position: "top-end",
          icon: "error",
          title: errorMessage,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4
    bg-gray-100 dark:bg-gray-900 transition">

      <div className="w-full max-w-md p-6 rounded-xl shadow-lg
      bg-white dark:bg-gray-800 transition">

        <h1 className="text-2xl font-bold mb-6
        text-[#002350] dark:text-white text-center">
          Login Now
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* EMAIL */}
          <div>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              placeholder="Enter your email"
              type="email"
              className="w-full px-4 py-2 rounded-lg border outline-none
              bg-white text-black border-gray-300
              dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-2 rounded-lg border outline-none
              bg-white text-black border-gray-300
              dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />

            {/* 👁 ICON */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2
              text-gray-700 dark:text-white hover:text-blue-500 transition"
            >
              {showPassword ? (
                <IoEyeOff size={20} />
              ) : (
                <IoEye size={20} />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="text-red-500 text-sm">
              {errors.password.message}
            </p>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 rounded-lg font-semibold
            bg-[#002350] text-white
           transition
            dark:bg-white dark:text-black
            disabled:opacity-50"
          >
            {isLoading ? "Processing..." : "Login"}
          </button>
        </form>

        {/* SIGNUP */}
        <p className="text-center mt-5 text-black dark:text-white">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="text-blue-600 dark:text-blue-400 font-medium"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;