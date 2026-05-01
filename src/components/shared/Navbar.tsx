"use client";

import { logoutUser } from "@/redux/features/auth/authThunk";
import { AppDispatch, RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { MdMenuOpen } from "react-icons/md";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { user } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);

    const theme = localStorage.getItem("theme");

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  // ✅ Toggle Theme
  const toggleTheme = () => {
    const newTheme = darkMode ? "light" : "dark";

    setDarkMode(!darkMode);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Logged out successfully",
      showConfirmButton: false,
      timer: 1500,
    });

    setOpen(false);
    router.push("/login");
  };

  const navLinks = [
    { id: 1, name: "Home", href: "/" },
    
    { id: 2, name: "Tours", href: "/tours" },
    { id: 3, name: "Packages", href: "/packages" },
    { id: 4, name: "About", href: "/about" },
    { id: 5, name: "Contact", href: "/contact" },
  ];

  const isAdmin = user?.role === "admin";

  if (!mounted) return null;

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition">

      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={40}
            height={40}
          />
          <span className="text-[#052658] dark:text-white font-bold text-xl">
            TravelVista
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className="text-[#052658] dark:text-white font-bold hover:bg-gray-200 dark:hover:bg-gray-700 px-2 py-2 rounded"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex items-center gap-3">

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="text-[#052658] dark:text-white text-lg"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          {user ? (
            <>
              {isAdmin ? (
                <Link href="/admin" className="border px-3 py-1 rounded text-[#052658] dark:text-white font-bold">
                  Admin
                </Link>
              ) : (
                <Link href="/dashboard" className="border px-3 py-1 rounded text-[#052658] dark:text-white font-bold">
                  Dashboard
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="border px-3 py-1 rounded text-[#052658] dark:text-white font-bold"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="border px-3 py-1 rounded text-[#052658] dark:text-white font-bold">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Button */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-[#052658] dark:text-white">
          {open ? <IoMdClose size={28} /> : <MdMenuOpen size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed right-0 top-16 h-screen w-2/3 bg-gray-100 dark:bg-gray-900 px-6 shadow-lg transition-transform duration-500 md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="mt-4 text-[#052658] dark:text-white flex items-center gap-2"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
          Theme
        </button>

        {/* NAV LINKS */}
        {navLinks.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            onClick={() => setOpen(false)}
            className="block mt-4 text-[#052658] dark:text-white font-bold"
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;