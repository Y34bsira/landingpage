'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Button from '../components/Button'
import { useRouter, usePathname } from 'next/navigation'

// Navigation items configuration
const navigationItems = [
  {
    name: 'Home',
    path: '/dashboard',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    )
  },
  {
    name: 'Members',
    path: '/dashboard/members',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  },
  {
    name: 'Member Access',
    path: '/dashboard/member-access',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    )
  },
  {
    name: 'Payments',
    path: '/dashboard/payments',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    )
  },
  {
    name: 'Performance',
    path: '/dashboard/performance',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v5" />
        <path d="M3 12l9 7 9-7" />
      </svg>
    )
  },
  {
    name: 'Classes',
    path: '/dashboard/classes',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    )
  },
  {
    name: 'Reports',
    path: '/dashboard/reports',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    )
  }
];

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <div className="flex min-h-screen bg-black text-foreground">
      {/* Left Navigation */}
      <div className={`fixed top-0 left-0 h-full bg-neutral-900 border-r border-neutral-800 transition-all duration-300 ${isNavCollapsed ? 'w-16' : 'w-64'} z-20`}>
        <div className="flex items-center justify-between p-4 border-b border-neutral-800">
          {!isNavCollapsed && <Link href="/" className="text-lg font-semibold">Gymers</Link>}
          <button 
            onClick={() => setIsNavCollapsed(!isNavCollapsed)}
            className="p-1 hover:bg-neutral-800 rounded-lg transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {isNavCollapsed ? (
                <path d="M13 17l5-5-5-5M6 17l5-5-5-5" />
              ) : (
                <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" />
              )}
            </svg>
          </button>
        </div>
        <nav className="p-2">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                pathname === item.path 
                  ? 'bg-[#F86422] text-white' 
                  : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
              }`}
            >
              {item.icon}
              {!isNavCollapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isNavCollapsed ? 'ml-16' : 'ml-64'}`}>
        {/* Header */}
        <header className="flex items-center justify-between py-4 px-6 border-b border-neutral-800/50">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold">
              {navigationItems.find(item => item.path === pathname)?.name || 'Dashboard'}
            </h1>
          </div>
          <nav className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              Log out
            </Button>
            <Button size="sm" asChild>
              <a href="https://calendly.com/gymersapp/30min" target="_blank" rel="noopener noreferrer">Book a Demo</a>
            </Button>
          </nav>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>

        <footer className="py-8 px-6 border-t border-neutral-800/50">
          <div className="max-w-[1200px] mx-auto text-sm text-neutral-400">
            © 2024 Gymers, Inc. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}