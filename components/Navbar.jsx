'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-[36px] left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-200 group-hover:scale-105 relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90">
              {/* Professional E Logo */}
              <svg 
                className="w-7 h-7 text-white" 
                viewBox="0 0 24 24" 
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 4h10a3 3 0 0 1 3 3v2H9v1h11v2H9v1h11v2a3 3 0 0 1-3 3H7V4z" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <span className="text-2xl font-bold text-secondary group-hover:text-primary transition-colors duration-200 tracking-tight">
                Enventors
              </span>
            </div>
          </Link>

          {/* Center Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`text-base font-medium transition-colors duration-200 ${
                pathname === '/'
                  ? 'text-primary'
                  : 'text-gray-500 hover:text-primary'
              }`}
            >
              Home
            </Link>
            <Link
              href="/vendors"
              className={`text-base font-medium transition-colors duration-200 ${
                pathname === '/vendors'
                  ? 'text-primary'
                  : 'text-gray-500 hover:text-primary'
              }`}
            >
              Vendors
            </Link>
            <Link
              href="/categories"
              className={`text-base font-medium transition-colors duration-200 ${
                pathname === '/categories'
                  ? 'text-primary'
                  : 'text-gray-500 hover:text-primary'
              }`}
            >
              Categories
            </Link>
            <Link
              href="/request-quote"
              className={`text-base font-medium transition-colors duration-200 ${
                pathname === '/request-quote'
                  ? 'text-primary'
                  : 'text-gray-500 hover:text-primary'
              }`}
            >
              Request Quote
            </Link>
          </div>

          {/* Admin Button */}
          <Link
            href="/admin/login"
            className="px-4 py-2 bg-secondary text-white text-sm font-medium rounded-xl hover:bg-secondary/90 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  )
}
