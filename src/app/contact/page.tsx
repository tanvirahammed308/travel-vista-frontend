"use client";

import { useState } from "react";
import { 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaClock,
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin,
  FaPaperPlane,
  FaCheckCircle,
  FaUser,
  FaComment,
  FaArrowRight
} from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import Swal from "sweetalert2";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      Swal.fire({
        icon: 'success',
        title: 'Message Sent!',
        text: 'We will get back to you soon.',
        timer: 3000,
        showConfirmButton: false,
        position: 'top-end',
      });
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      title: "Visit Us",
      details: "Dhaka, Bangladesh",
      color: "bg-[#01204C]",
      bgLight: "bg-[#01204C]/10",
      iconColor: "text-[#01204C]",
      hoverBg: "hover:bg-[#01204C]/20",
    },
    {
      icon: FaPhoneAlt,
      title: "Call Us",
      details: "+880 1234 567 890",
      subDetail: "+880 1987 654 321",
      color: "bg-[#01204C]",
      bgLight: "bg-[#01204C]/10",
      iconColor: "text-[#01204C]",
      hoverBg: "hover:bg-[#01204C]/20",
    },
    {
      icon: FaEnvelope,
      title: "Email Us",
      details: "info@travelbangla.com",
      subDetail: "support@travelbangla.com",
      color: "bg-[#01204C]",
      bgLight: "bg-[#01204C]/10",
      iconColor: "text-[#01204C]",
      hoverBg: "hover:bg-[#01204C]/20",
    },
    {
      icon: FaClock,
      title: "Working Hours",
      details: "Saturday - Thursday",
      subDetail: "9:00 AM - 8:00 PM",
      color: "bg-[#01204C]",
      bgLight: "bg-[#01204C]/10",
      iconColor: "text-[#01204C]",
      hoverBg: "hover:bg-[#01204C]/20",
    },
  ];

  const socialLinks = [
    { icon: FaFacebook, href: "https://facebook.com", color: "bg-[#01204C]", hover: "hover:bg-[#01204C]/80" },
    { icon: FaTwitter, href: "https://twitter.com", color: "bg-[#01204C]", hover: "hover:bg-[#01204C]/80" },
    { icon: FaInstagram, href: "https://instagram.com", color: "bg-[#01204C]", hover: "hover:bg-[#01204C]/80" },
    { icon: FaLinkedin, href: "https://linkedin.com", color: "bg-[#01204C]", hover: "hover:bg-[#01204C]/80" },
  ];

  return (
    <section className="py-16 md:py-24 px-4 md:px-10 bg-gradient-to-br from-[#01204C]/5 via-white to-[#01204C]/5 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 rounded-full bg-[#01204C]/10 dark:bg-[#01204C]/20 text-[#01204C] dark:text-[#01204C] text-sm font-semibold mb-4">
            Contact Us
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            Get In <span className="text-[#01204C]">Touch</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Have questions about your next adventure? We're here to help you plan the perfect journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* LEFT: Contact Info Cards */}
          <div>
            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className={`group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${item.hoverBg}`}
                >
                  <div className={`${item.bgLight} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className={`text-2xl ${item.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {item.details}
                  </p>
                  {item.subDetail && (
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                      {item.subDetail}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Social Links & Map Preview */}
            <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Connect With Us
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${social.color} ${social.hover} text-white p-3 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-6`}
                  >
                    <social.icon className="text-lg" />
                  </a>
                ))}
              </div>
              
              {/* Map Preview */}
              <div className="mt-6 rounded-xl overflow-hidden h-32 bg-gray-200 dark:bg-gray-700 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <FaMapMarkerAlt className="text-[#01204C] text-2xl mx-auto mb-1" />
                    <p className="text-xs text-gray-500 dark:text-gray-400">Dhaka, Bangladesh</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Enhanced Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#01204C] to-[#01204C]/80 px-6 py-8">
              <h3 className="text-2xl font-bold text-white mb-2">
                Send us a Message
              </h3>
              <p className="text-white/80">
                We'll reply within 24 hours
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="group">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <FaUser className="text-[#01204C]" />
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#01204C] focus:border-transparent outline-none transition-all dark:bg-gray-700 dark:text-white"
                  />
                  <FaUser className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div className="group">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <MdEmail className="text-[#01204C]" />
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#01204C] focus:border-transparent outline-none transition-all dark:bg-gray-700 dark:text-white"
                  />
                  <MdEmail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div className="group">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <FaComment className="text-[#01204C]" />
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Write your message..."
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#01204C] focus:border-transparent outline-none transition-all resize-none dark:bg-gray-700 dark:text-white"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#01204C] hover:bg-[#01204C]/80 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Send Message
                    <FaArrowRight className="text-sm" />
                  </>
                )}
              </button>

              <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
                <FaCheckCircle className="inline mr-1 text-[#01204C]" />
                We respect your privacy. Your information is safe.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;