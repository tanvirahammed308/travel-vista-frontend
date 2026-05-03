"use client";

import { logoutUser } from "@/redux/features/auth/authThunk";
import { AppDispatch, RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
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
  const pathname = usePathname(); // Get current route

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

  // Toggle Theme
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

  // Helper function to check if a link is active
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
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
              className={`relative font-bold px-3 py-2 transition-colors ${
                isActive(link.href)
                  ? "text-[#052658] dark:text-white"
                  : "text-[#052658] dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
              } ${
                isActive(link.href)
                  ? "after:absolute after:left-0 after:right-0 after:bottom-0 after:h-0.5 after:bg-[#052658] dark:after:bg-white after:rounded-full"
                  : "after:absolute after:left-0 after:right-0 after:bottom-0 after:h-0.5 after:bg-[#052658] dark:after:bg-white after:rounded-full after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
              }`}
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
            className="text-[#052658] dark:text-white text-lg p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          {user ? (
            <>
              {isAdmin ? (
                <Link 
                  href="/admin" 
                  className={`relative border px-3 py-1 rounded font-bold transition-colors ${
                    isActive("/admin")
                      ? "border-[#052658] dark:border-blue-600 text-[#052658] dark:text-white"
                      : "text-[#052658] dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  Admin
                  {isActive("/admin") && (
                    <span className="absolute -bottom-5 left-0 right-0 h-0.5 bg-[#052658] dark:bg-white rounded-full"></span>
                  )}
                </Link>
              ) : (
                <Link 
                  href="/dashboard" 
                  className={`relative border px-3 py-1 rounded font-bold transition-colors ${
                    isActive("/dashboard")
                      ? "border-[#052658] dark:border-blue-600 text-[#052658] dark:text-white"
                      : "text-[#052658] dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  Dashboard
                  {isActive("/dashboard") && (
                    <span className="absolute -bottom-5 left-0 right-0 h-0.5 bg-[#052658] dark:bg-white rounded-full"></span>
                  )}
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="border border-gray-300 dark:border-gray-600 px-3 py-1 rounded text-[#052658] dark:text-white font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <Link 
              href="/login" 
              className={`relative border px-3 py-1 rounded font-bold transition-colors ${
                isActive("/login")
                  ? "border-[#052658] dark:border-blue-600 text-[#052658] dark:text-white"
                  : "text-[#052658] dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              Login
              {isActive("/login") && (
                <span className="absolute -bottom-5 left-0 right-0 h-0.5 bg-[#052658] dark:bg-white rounded-full"></span>
              )}
            </Link>
          )}
        </div>

        {/* Mobile Button */}
        <button 
          onClick={() => setOpen(!open)} 
          className="md:hidden text-[#052658] dark:text-white p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
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
          className="mt-4 text-[#052658] dark:text-white flex items-center gap-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors w-full"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
          <span>Theme</span>
        </button>

        {/* NAV LINKS */}
        {navLinks.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            onClick={() => setOpen(false)}
            className={`block mt-4 px-3 py-2 rounded font-bold transition-all ${
              isActive(link.href)
                ? "text-[#052658] dark:text-white bg-gray-200 dark:bg-gray-800 border-l-4 border-[#052658] dark:border-white"
                : "text-[#052658] dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800"
            }`}
          >
            {link.name}
          </Link>
        ))}

        {/* Mobile Auth Links */}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          {user ? (
            <>
              {isAdmin ? (
                <Link
                  href="/admin"
                  onClick={() => setOpen(false)}
                  className={`block mt-2 px-3 py-2 rounded font-bold transition-all ${
                    isActive("/admin")
                      ? "text-[#052658] dark:text-white bg-gray-200 dark:bg-gray-800 border-l-4 border-[#052658] dark:border-white"
                      : "text-[#052658] dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800"
                  }`}
                >
                  Admin Panel
                </Link>
              ) : (
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className={`block mt-2 px-3 py-2 rounded font-bold transition-all ${
                    isActive("/dashboard")
                      ? "text-[#052658] dark:text-white bg-gray-200 dark:bg-gray-800 border-l-4 border-[#052658] dark:border-white"
                      : "text-[#052658] dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800"
                  }`}
                >
                  Dashboard
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="block w-full text-left mt-2 px-3 py-2 rounded font-bold text-[#052658] dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className={`block mt-2 px-3 py-2 rounded font-bold transition-all ${
                isActive("/login")
                  ? "text-[#052658] dark:text-white bg-gray-200 dark:bg-gray-800 border-l-4 border-[#052658] dark:border-white"
                  : "text-[#052658] dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800"
              }`}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;