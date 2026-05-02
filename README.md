#  Travel-vasta - Complete Tour Booking Platform

[

## 📋 Table of Contents
- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Route Structure](#-route-structure)
- [Admin Routes](#-admin-routes)
- [Authentication Flow](#-authentication-flow)
- [Booking Flow](#-booking-flow)
- [API Documentation](#-api-documentation)
- [Components](#-components)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Future Improvements](#-future-improvements)

---

## 📋 Overview

TravelVista is a full-stack tour booking platform that allows users to discover, book, and manage tour packages across Bangladesh. The platform features user authentication, tour management, booking system, admin dashboard with statistics, and complete CRUD operations for tours, bookings, and users.



---

## ✨ Features

### 👥 User Features
- 🔐 **Authentication** - Login/Register with JWT
- 🔍 **Search & Filters** - Search by location, category, price range
- 📅 **Tour Booking** - Select dates and number of guests
- 💳 **Multiple Payments** - Cash, bKash, Nagad, Card
- 📋 **Booking History** - Track all bookings with status
- ⭐ **Tour Reviews** - Rate and review tours
- 🌓 **Dark Mode** - Toggle between light and dark themes
- 📱 **Responsive Design** - Works on all devices

### 👑 Admin Features
- 📊 **Dashboard** - Analytics with charts (bookings, revenue, users)
- ✈️ **Tour Management** - Create, Read, Update, Delete tours
- 📅 **Booking Management** - View, confirm, cancel, delete bookings
- 👥 **User Management** - Manage all users, delete non-admin users
- 🌍 **Destination Management** - Manage travel destinations
- 📈 **Reports** - Sales reports, revenue analytics
- ⚙️ **Settings** - System configuration (General, Email, Payment, SEO, Security)
- 🎨 **Appearance** - Customize colors, fonts, theme

### 🎨 UI/UX Features
- 🌓 Dark/Light mode toggle with system preference
- 📱 Fully responsive mobile-first design
- 🎯 Smooth animations and transitions
- 🔔 SweetAlert2 notifications
- 📊 Interactive charts with Recharts
- ✨ Modern gradient backgrounds
- 🖼️ Optimized images with Next.js Image

---

## 🚀 Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.6 | React framework with App Router |
| React | 19.2.3 | UI library |
| TypeScript | 5.0 | Type safety |
| Tailwind CSS | 4.0 | Utility-first styling |
| Redux Toolkit | 2.11 | State management |
| React Hook Form | 7.72 | Form handling with validation |
| Recharts | 3.8 | Charts and graphs |
| Swiper | 12.1 | Touch sliders and carousels |
| Axios | 1.13 | HTTP client |
| SweetAlert2 | 11.26 | Beautiful popup alerts |
| React Icons | 5.6 | Icon library |

### Backend (Separate Repository)
- Node.js + Express.js
- MongoDB with Mongoose ODM
- JWT Authentication
- Bcrypt for password hashing
- Cloudinary for image upload

---


---

## 🛠️ Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB running locally or in cloud
- Backend server running

### Step-by-Step Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/travel-vista-frontend.git
cd travel-vista-frontend
