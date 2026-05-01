'use client'

import { RootState } from '@/redux/store'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, isCheckingAuth } = useSelector(
    (state: RootState) => state.auth
  )

  const router = useRouter()

  useEffect(() => {
    if (isCheckingAuth) return

    if (!user) {
      router.replace('/login')
      return
    }

    if (user.role !== 'admin') {
      router.replace('/dashboard')
      return
    }
  }, [user, isCheckingAuth, router])

  //  ONLY loading state block
  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    )
  };

  if (!user || user.role !== "admin") return null;


  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-[#00295D] text-white p-5">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

        <ul className="space-y-3">
          <li><Link href="/admin">Dashboard</Link></li>
          <li><Link href="/admin/users">Users</Link></li>
          <li><Link href="/admin/orders">Orders</Link></li>
          <li><Link href="/admin/products">Products</Link></li>
          <li><Link href="/admin/tours">Tours</Link></li>
          <li><Link href="/admin/tours/create">Create Tour</Link></li>
        </ul>
      </aside>

      <main className="flex-1 p-5 bg-gray-100">
        {children}
      </main>
    </div>
  )
}

export default AdminLayout