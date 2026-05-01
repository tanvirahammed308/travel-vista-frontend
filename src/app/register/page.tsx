"use client";

import { registerUser } from "@/redux/features/auth/authThunk";
import { AppDispatch } from "@/redux/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

type FormData = {
  name: string;
  email: string;
  password: string;
  terms: boolean;
};

const SignupPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    if (!data.terms) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "You must accept terms & conditions",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    try {
      const result = await dispatch(registerUser(data));

      if (registerUser.fulfilled.match(result)) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Signup successful!",
          timer: 1500,
          showConfirmButton: false,
        });

        router.push("/login");
      } else {
        const errorMessage = result.payload || "Signup failed";

        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Error",
          text: errorMessage,
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4
    bg-gray-100 dark:bg-gray-900 transition">

      <div className="max-w-md w-full p-5 rounded-xl shadow-lg
      bg-white dark:bg-gray-800 transition">

        <h1 className="text-2xl font-bold text-[#002350] dark:text-white">
          Create Account
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">

          {/* NAME */}
          <input
            {...register("name", { required: "Name is required" })}
            type="text"
            placeholder="Name"
            className="w-full px-4 py-2 border rounded-lg outline-none
            bg-white text-black border-gray-300
            dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          {/* EMAIL */}
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg outline-none
            bg-white text-black border-gray-300
            dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          {/* PASSWORD */}
          <div className="relative">
            <input
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                  message:
                    "Password must be 6+ chars, include uppercase, lowercase & number",
                },
              })}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg outline-none
              bg-white text-black border-gray-300
              dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />

            {/* 👁 ICON */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2
              text-gray-700 dark:text-white  transition"
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>

          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          {/* CHECKBOX */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("terms", {
                required: "You must accept terms & conditions",
              })}
              className="w-4 h-4 accent-blue-600"
            />
            <label className="text-sm text-gray-600 dark:text-gray-300">
              I agree to the Terms & Conditions
            </label>
          </div>

          {errors.terms && (
            <p className="text-red-500 text-sm">{errors.terms.message}</p>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg font-semibold
            bg-[#002350] text-white
            transition
            dark:bg-white dark:text-black"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-black dark:text-white">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 dark:text-blue-400">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default SignupPage;