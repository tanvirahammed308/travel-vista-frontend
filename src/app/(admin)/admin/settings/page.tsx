
// app/admin/settings/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { AppDispatch, RootState } from '@/redux/store';
import Swal from 'sweetalert2';
import { 
  FaArrowLeft, 
  FaSave, 
  FaUndo, 
  FaGlobe, 
  FaEnvelope, 
  FaCreditCard, 
  FaPalette,
  FaLock,
  FaBell,
  FaDatabase,
  FaCode,
  FaImage,
  FaLanguage,
  FaUserShield,
  FaChartLine,
  FaShareAlt,
  FaRobot,
  FaServer,
  FaShieldAlt
} from 'react-icons/fa';

export default function AdminSettingsPage() {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);

  // General Settings
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'TravelBangla',
    siteDescription: 'Explore the beauty of Bangladesh with our premium travel packages',
    siteEmail: 'info@travelbangla.com',
    sitePhone: '+880 1234 567 890',
    siteAddress: 'Dhaka, Bangladesh',
    timezone: 'Asia/Dhaka',
    dateFormat: 'DD/MM/YYYY',
    currency: 'BDT',
    currencySymbol: '৳',
  });

  // Email Settings
  const [emailSettings, setEmailSettings] = useState({
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUser: 'noreply@travelbangla.com',
    smtpPassword: '********',
    fromEmail: 'noreply@travelbangla.com',
    fromName: 'TravelBangla',
    enableWelcomeEmail: true,
    enableBookingConfirmation: true,
    enablePaymentReceipt: true,
    enableNewsletter: false,
  });

  // Payment Settings
  const [paymentSettings, setPaymentSettings] = useState({
    currency: 'BDT',
    enableCash: true,
    enableBkash: true,
    enableNagad: true,
    enableCard: true,
    bkashNumber: '017XXXXXXXX',
    nagadNumber: '018XXXXXXXX',
    stripePublicKey: 'pk_test_xxxxxxxx',
    stripeSecretKey: 'sk_test_xxxxxxxx',
    sandboxMode: true,
  });

  // Appearance Settings
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'light',
    primaryColor: '#01204C',
    secondaryColor: '#f59e0b',
    fontFamily: 'Inter',
    borderRadius: '0.5rem',
    enableDarkMode: true,
    showHeroSection: true,
    showNewsletter: true,
    footerColumns: 4,
  });

  // SEO Settings
  const [seoSettings, setSeoSettings] = useState({
    metaTitle: 'TravelBangla - Explore Bangladesh',
    metaDescription: 'Discover amazing travel destinations in Bangladesh with our premium tour packages',
    metaKeywords: 'travel, tourism, Bangladesh, tours, packages, Cox\'s Bazar, Sundarbans',
    ogTitle: 'TravelBangla',
    ogDescription: 'Explore the beauty of Bangladesh',
    ogImage: '/images/og-image.jpg',
    enableSitemap: true,
    enableRobots: true,
    googleAnalyticsId: 'UA-XXXXXXXXX-X',
    facebookPixelId: 'XXXXXXXXX',
  });

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: 60,
    maxLoginAttempts: 5,
    passwordExpiry: 90,
    enableCaptcha: true,
    enableSSL: true,
    backupFrequency: 'daily',
    logRetention: 30,
  });

  const tabs = [
    { id: 'general', name: 'General', icon: FaGlobe },
    { id: 'email', name: 'Email', icon: FaEnvelope },
    { id: 'payment', name: 'Payment', icon: FaCreditCard },
    { id: 'appearance', name: 'Appearance', icon: FaPalette },
    { id: 'seo', name: 'SEO', icon: FaCode },
    { id: 'security', name: 'Security', icon: FaLock },
  ];

  useEffect(() => {
    if (user && user.role !== 'admin') {
      router.push('/');
    }
  }, [user, router]);

  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setGeneralSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setEmailSettings(prev => ({ ...prev, [name]: newValue }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setPaymentSettings(prev => ({ ...prev, [name]: newValue }));
  };

  const handleAppearanceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setAppearanceSettings(prev => ({ ...prev, [name]: newValue }));
  };

  const handleSeoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setSeoSettings(prev => ({ ...prev, [name]: newValue }));
  };

  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setSecuritySettings(prev => ({ ...prev, [name]: newValue }));
  };

  const handleSave = async () => {
    setSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    Swal.fire({
      icon: 'success',
      title: 'Settings Saved!',
      text: 'Your settings have been updated successfully.',
      timer: 2000,
      showConfirmButton: false,
      position: 'top-end',
    });
    
    setSaving(false);
  };

  const handleReset = () => {
    Swal.fire({
      title: 'Reset Settings?',
      text: 'This will reset all settings to default values.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, reset',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Reset!', 'Settings have been reset.', 'success');
      }
    });
  };

  if (user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                System Settings
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Configure your website settings and preferences
              </p>
            </div>
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-[#01204C] dark:text-gray-400"
            >
              <FaArrowLeft />
              Back to Dashboard
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-6 overflow-x-auto">
          <div className="flex border-b dark:border-gray-700">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-[#01204C] border-b-2 border-[#01204C] dark:text-blue-400'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <tab.icon size={16} />
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Settings Forms */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                General Settings
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Site Name
                  </label>
                  <input
                    type="text"
                    name="siteName"
                    value={generalSettings.siteName}
                    onChange={handleGeneralChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#01204C] outline-none dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Site Email
                  </label>
                  <input
                    type="email"
                    name="siteEmail"
                    value={generalSettings.siteEmail}
                    onChange={handleGeneralChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#01204C] outline-none dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Site Phone
                  </label>
                  <input
                    type="text"
                    name="sitePhone"
                    value={generalSettings.sitePhone}
                    onChange={handleGeneralChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#01204C] outline-none dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Timezone
                  </label>
                  <select
                    name="timezone"
                    value={generalSettings.timezone}
                    onChange={handleGeneralChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#01204C] outline-none dark:bg-gray-700 dark:text-white"
                  >
                    <option value="Asia/Dhaka">Asia/Dhaka (GMT+6)</option>
                    <option value="Asia/Kolkata">Asia/Kolkata (GMT+5:30)</option>
                    <option value="Asia/Dubai">Asia/Dubai (GMT+4)</option>
                    <option value="Asia/Singapore">Asia/Singapore (GMT+8)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Currency
                  </label>
                  <select
                    name="currency"
                    value={generalSettings.currency}
                    onChange={handleGeneralChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#01204C] outline-none dark:bg-gray-700 dark:text-white"
                  >
                    <option value="BDT">Bangladeshi Taka (BDT)</option>
                    <option value="USD">US Dollar (USD)</option>
                    <option value="EUR">Euro (EUR)</option>
                    <option value="GBP">British Pound (GBP)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date Format
                  </label>
                  <select
                    name="dateFormat"
                    value={generalSettings.dateFormat}
                    onChange={handleGeneralChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#01204C] outline-none dark:bg-gray-700 dark:text-white"
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Site Description
                  </label>
                  <textarea
                    name="siteDescription"
                    value={generalSettings.siteDescription}
                    onChange={handleGeneralChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#01204C] outline-none dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Site Address
                  </label>
                  <textarea
                    name="siteAddress"
                    value={generalSettings.siteAddress}
                    onChange={handleGeneralChange}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#01204C] outline-none dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Email Settings */}
          {activeTab === 'email' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Email Configuration
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    SMTP Host
                  </label>
                  <input
                    type="text"
                    name="smtpHost"
                    value={emailSettings.smtpHost}
                    onChange={handleEmailChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#01204C] outline-none dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    SMTP Port
                  </label>
                  <input
                    type="text"
                    name="smtpPort"
                    value={emailSettings.smtpPort}
                    onChange={handleEmailChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#01204C] outline-none dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    SMTP Username
                  </label>
                  <input
                    type="text"
                    name="smtpUser"
                    value={emailSettings.smtpUser}
                    onChange={handleEmailChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#01204C] outline-none dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    SMTP Password
                  </label>
                  <input
                    type="password"
                    name="smtpPassword"
                    value={emailSettings.smtpPassword}
                    onChange={handleEmailChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#01204C] outline-none dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    From Email
                  </label>
                  <input
                    type="email"
                    name="fromEmail"
                    value={emailSettings.fromEmail}
                    onChange={handleEmailChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#01204C] outline-none dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    From Name
                  </label>
                  <input
                    type="text"
                    name="fromName"
                    value={emailSettings.fromName}
                    onChange={handleEmailChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#01204C] outline-none dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Email Notifications
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="enableWelcomeEmail"
                      checked={emailSettings.enableWelcomeEmail}
                      onChange={handleEmailChange}
                      className="rounded text-[#01204C] focus:ring-[#01204C]"
                    />
                    <span className="text-gray-700 dark:text-gray-300">Send welcome email to new users</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="enableBookingConfirmation"
                      checked={emailSettings.enableBookingConfirmation}
                      onChange={handleEmailChange}
                      className="rounded text-[#01204C] focus:ring-[#01204C]"
                    />
                    <span className="text-gray-700 dark:text-gray-300">Send booking confirmation email</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="enablePaymentReceipt"
                      checked={emailSettings.enablePaymentReceipt}
                      onChange={handleEmailChange}
                      className="rounded text-[#01204C] focus:ring-[#01204C]"
                    />
                    <span className="text-gray-700 dark:text-gray-300">Send payment receipt email</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="enableNewsletter"
                      checked={emailSettings.enableNewsletter}
                      onChange={handleEmailChange}
                      className="rounded text-[#01204C] focus:ring-[#01204C]"
                    />
                    <span className="text-gray-700 dark:text-gray-300">Enable newsletter subscription</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Payment Settings */}
          {activeTab === 'payment' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Payment Gateway Settings
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Currency
                  </label>
                  <select
                    name="currency"
                    value={paymentSettings.currency}
                    onChange={handlePaymentChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#01204C] outline-none dark:bg-gray-700 dark:text-white"
                  >
                    <option value="BDT">Bangladeshi Taka (BDT)</option>
                    <option value="USD">US Dollar (USD)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    bKash Number
                  </label>
                  <input
                    type="text"
                    name="bkashNumber"
                    value={paymentSettings.bkashNumber}
                    onChange={handlePaymentChange}
                    placeholder="017XXXXXXXX"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#01204C] outline-none dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nagad Number
                  </label>
                  <input
                    type="text"
                    name="nagadNumber"
                    value={paymentSettings.nagadNumber}
                    onChange={handlePaymentChange}
                    placeholder="018XXXXXXXX"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#01204C] outline-none dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Stripe Public Key
                  </label>
                  <input
                    type="text"
                    name="stripePublicKey"
                    value={paymentSettings.stripePublicKey}
                    onChange={handlePaymentChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#01204C] outline-none dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Stripe Secret Key
                  </label>
                  <input
                    type="password"
                    name="stripeSecretKey"
                    value={paymentSettings.stripeSecretKey}
                    onChange={handlePaymentChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#01204C] outline-none dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 mt-4">
                    <input
                      type="checkbox"
                      name="sandboxMode"
                      checked={paymentSettings.sandboxMode}
                      onChange={handlePaymentChange}
                      className="rounded text-[#01204C] focus:ring-[#01204C]"
                    />
                    <span className="text-gray-700 dark:text-gray-300">Enable Sandbox Mode (Test Mode)</span>
                  </label>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Payment Methods
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:border-gray-600">
                    <input
                      type="checkbox"
                      name="enableCash"
                      checked={paymentSettings.enableCash}
                      onChange={handlePaymentChange}
                      className="rounded text-[#01204C]"
                    />
                    <span>💵 Cash</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:border-gray-600">
                    <input
                      type="checkbox"
                      name="enableBkash"
                      checked={paymentSettings.enableBkash}
                      onChange={handlePaymentChange}
                      className="rounded text-[#01204C]"
                    />
                    <span>💙 bKash</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:border-gray-600">
                    <input
                      type="checkbox"
                      name="enableNagad"
                      checked={paymentSettings.enableNagad}
                      onChange={handlePaymentChange}
                      className="rounded text-[#01204C]"
                    />
                    <span>🧡 Nagad</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:border-gray-600">
                    <input
                      type="checkbox"
                      name="enableCard"
                      checked={paymentSettings.enableCard}
                      onChange={handlePaymentChange}
                      className="rounded text-[#01204C]"
                    />
                    <span>💳 Credit/Debit Card</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Appearance Settings
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Theme
                  </label>
                  <select
                    name="theme"
                    value={appearanceSettings.theme}
                    onChange={handleAppearanceChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#01204C] outline-none dark:bg-gray-700 dark:text-white"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Primary Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      name="primaryColor"
                      value={appearanceSettings.primaryColor}
                      onChange={handleAppearanceChange}
                      className="w-12 h-10 border rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      name="primaryColor"
                      value={appearanceSettings.primaryColor}
                      onChange={handleAppearanceChange}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#01204C] outline-none dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Secondary Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      name="secondaryColor"
                      value={appearanceSettings.secondaryColor}
                      onChange={handleAppearanceChange}
                      className="w-12 h-10 border rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      name="secondaryColor"
                      value={appearanceSettings.secondaryColor}
                      onChange={handleAppearanceChange}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#01204C] outline-none dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Font Family
                  </label>
                  <select
                    name="fontFamily"
                    value={appearanceSettings.fontFamily}
                    onChange={handleAppearanceChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#01204C] outline-none dark:bg-gray-700 dark:text-white"
                  >
                    <option value="Inter">Inter</option>
                    <option value="Poppins">Poppins</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Open Sans">Open Sans</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Page Settings
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="enableDarkMode"
                      checked={appearanceSettings.enableDarkMode}
                      onChange={handleAppearanceChange}
                      className="rounded text-[#01204C] focus:ring-[#01204C]"
                    />
                    <span className="text-gray-700 dark:text-gray-300">Enable Dark Mode Toggle</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="showHeroSection"
                      checked={appearanceSettings.showHeroSection}
                      onChange={handleAppearanceChange}
                      className="rounded text-[#01204C] focus:ring-[#01204C]"
                    />
                    <span className="text-gray-700 dark:text-gray-300">Show Hero Section on Homepage</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="showNewsletter"
                      checked={appearanceSettings.showNewsletter}
                      onChange={handleAppearanceChange}
                      className="rounded text-[#01204C] focus:ring-[#01204C]"
                    />
                    <span className="text-gray-700 dark:text-gray-300">Show Newsletter Signup</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* SEO Settings */}
          {activeTab === 'seo' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                SEO & Analytics Settings
              </h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    name="metaTitle"
                    value={seoSettings.metaTitle}
                    onChange={handleSeoChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#01204C] outline-none dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Meta Description
                  </label>
                  <textarea
                    name="metaDescription"
                    value={seoSettings.metaDescription}
                    onChange={handleSeoChange}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#01204C] outline-none dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Meta Keywords
                  </label>
                  <input
                    type="text"
                    name="metaKeywords"
                    value={seoSettings.metaKeywords}
                    onChange={handleSeoChange}
                    placeholder="keyword1, keyword2, keyword3"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#01204C] outline-none dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Google Analytics ID
                  </label>
                  <input
                    type="text"
                    name="googleAnalyticsId"
                    value={seoSettings.googleAnalyticsId}
                    onChange={handleSeoChange}
                    placeholder="UA-XXXXXXXXX-X"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#01204C] outline-none dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Facebook Pixel ID
                  </label>
                  <input
                    type="text"
                    name="facebookPixelId"
                    value={seoSettings.facebookPixelId}
                    onChange={handleSeoChange}
                    placeholder="XXXXXXXXX"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#01204C] outline-none dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  SEO Features
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="enableSitemap"
                      checked={seoSettings.enableSitemap}
                      onChange={handleSeoChange}
                      className="rounded text-[#01204C] focus:ring-[#01204C]"
                    />
                    <span className="text-gray-700 dark:text-gray-300">Auto-generate Sitemap</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="enableRobots"
                      checked={seoSettings.enableRobots}
                      onChange={handleSeoChange}
                      className="rounded text-[#01204C] focus:ring-[#01204C]"
                    />
                    <span className="text-gray-700 dark:text-gray-300">Enable robots.txt</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Security Settings
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 mb-4">
                    <input
                      type="checkbox"
                      name="twoFactorAuth"
                      checked={securitySettings.twoFactorAuth}
                      onChange={handleSecurityChange}
                      className="rounded text-[#01204C] focus:ring-[#01204C]"
                    />
                    <span className="text-gray-700 dark:text-gray-300">Enable Two-Factor Authentication</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center gap-2 mb-4">
                    <input
                      type="checkbox"
                      name="enableCaptcha"
                      checked={securitySettings.enableCaptcha}
                      onChange={handleSecurityChange}
                      className="rounded text-[#01204C] focus:ring-[#01204C]"
                    />
                    <span className="text-gray-700 dark:text-gray-300">Enable reCAPTCHA</span>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Session Timeout (minutes)
                  </label>
                  <input
                    type="number"
                    name="sessionTimeout"
                    value={securitySettings.sessionTimeout}
                    onChange={handleSecurityChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#01204C] outline-none dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Max Login Attempts
                  </label>
                  <input
                    type="number"
                    name="maxLoginAttempts"
                    value={securitySettings.maxLoginAttempts}
                    onChange={handleSecurityChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#01204C] outline-none dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Password Expiry (days)
                  </label>
                  <input
                    type="number"
                    name="passwordExpiry"
                    value={securitySettings.passwordExpiry}
                    onChange={handleSecurityChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#01204C] outline-none dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Backup Frequency
                  </label>
                  <select
                    name="backupFrequency"
                    value={securitySettings.backupFrequency}
                    onChange={handleSecurityChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#01204C] outline-none dark:bg-gray-700 dark:text-white"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Log Retention (days)
                  </label>
                  <input
                    type="number"
                    name="logRetention"
                    value={securitySettings.logRetention}
                    onChange={handleSecurityChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#01204C] outline-none dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <FaShieldAlt className="text-yellow-600 text-xl mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-400">Security Notice</h4>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                      Changing security settings may affect user experience. Please review changes carefully before saving.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <FaUndo />
            Reset
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 bg-[#01204C] text-white rounded-lg hover:bg-[#01204C]/80 transition-colors disabled:opacity-50"
          >
            <FaSave />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}