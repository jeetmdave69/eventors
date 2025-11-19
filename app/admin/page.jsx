'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import SkeletonLoader from '@/components/SkeletonLoader'

export default function Admin() {
  const router = useRouter()
  const [inquiries, setInquiries] = useState([])
  const [quotes, setQuotes] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  useEffect(() => {
    // Check authentication
    const auth = localStorage.getItem('adminAuth')
    if (auth) {
      const authData = JSON.parse(auth)
      if (authData.authenticated) {
        setIsAuthenticated(true)
        loadData()
      } else {
        router.push('/admin/login')
      }
    } else {
      router.push('/admin/login')
    }
    setIsLoading(false)
  }, [router])

  const loadData = () => {
    // Load inquiries
    const stored = localStorage.getItem('inquiries')
    if (stored) {
      const parsed = JSON.parse(stored)
      const sorted = parsed.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      setInquiries(sorted)
    }

    // Load quotes
    const storedQuotes = localStorage.getItem('quotes')
    if (storedQuotes) {
      const parsed = JSON.parse(storedQuotes)
      const sorted = parsed.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      setQuotes(sorted)
    }
  }

  const handleLogout = () => {
    setShowLogoutModal(true)
  }

  const confirmLogout = () => {
    localStorage.removeItem('adminAuth')
    router.push('/admin/login')
  }

  const clearAll = (type) => {
    if (window.confirm(`Are you sure you want to clear all ${type}?`)) {
      if (type === 'inquiries') {
        localStorage.removeItem('inquiries')
        setInquiries([])
      } else if (type === 'quotes') {
        localStorage.removeItem('quotes')
        setQuotes([])
      }
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const urgentQuotes = quotes.filter(q => q.urgent).length
  const totalQuotes = quotes.length
  const totalInquiries = inquiries.length

  if (isLoading) {
    return <SkeletonLoader type="admin" />
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Premium Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1920px] mx-auto px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary via-primary to-primary/90 rounded-lg flex items-center justify-center shadow-lg">
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
              <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Admin Dashboard</h1>
                <p className="text-xs text-gray-500 font-medium mt-0.5">
                  Enventors Management Panel
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-all duration-200 rounded-lg hover:bg-gray-100/80 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Visit Site
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-6 lg:px-8 py-10">
        {/* Premium Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="group relative bg-white rounded-xl p-7 shadow-md hover:shadow-lg border border-gray-100 transition-shadow duration-200 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 opacity-50 group-hover:opacity-70 transition-opacity"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600 mb-2">Total Quote Requests</p>
              <p className="text-4xl font-bold text-gray-900 mb-2">{totalQuotes}</p>
              <p className="text-xs text-gray-500 font-medium">All time requests</p>
            </div>
          </div>

          <div className="group relative bg-white rounded-xl p-7 shadow-md hover:shadow-lg border border-gray-100 transition-shadow duration-200 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full -mr-16 -mt-16 opacity-50 group-hover:opacity-70 transition-opacity"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600 mb-2">Urgent Requests</p>
              <p className="text-4xl font-bold text-gray-900 mb-2">{urgentQuotes}</p>
              <p className="text-xs text-gray-500 font-medium">Requires immediate attention</p>
            </div>
          </div>

          <div className="group relative bg-white rounded-xl p-7 shadow-md hover:shadow-lg border border-gray-100 transition-shadow duration-200 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 opacity-50 group-hover:opacity-70 transition-opacity"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600 mb-2">Vendor Inquiries</p>
              <p className="text-4xl font-bold text-gray-900 mb-2">{totalInquiries}</p>
              <p className="text-xs text-gray-500 font-medium">Direct vendor contacts</p>
            </div>
          </div>
        </div>

        {/* Premium Tabs */}
        <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-xl mb-8 overflow-hidden shadow-lg">
          <div className="border-b border-gray-200/50">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-8 py-4 text-sm font-semibold border-b-2 transition-all duration-200 relative ${
                  activeTab === 'overview'
                    ? 'border-primary text-primary bg-primary/5'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50/50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Overview
                </span>
              </button>
              <button
                onClick={() => setActiveTab('quotes')}
                className={`px-8 py-4 text-sm font-semibold border-b-2 transition-all duration-200 relative ${
                  activeTab === 'quotes'
                    ? 'border-primary text-primary bg-primary/5'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50/50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Quote Requests
                  {totalQuotes > 0 && (
                    <span className="ml-2 px-2 py-0.5 bg-primary/20 text-primary rounded-full text-xs font-bold">
                      {totalQuotes}
                    </span>
                  )}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('inquiries')}
                className={`px-8 py-4 text-sm font-semibold border-b-2 transition-all duration-200 relative ${
                  activeTab === 'inquiries'
                    ? 'border-primary text-primary bg-primary/5'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50/50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  Vendor Inquiries
                  {totalInquiries > 0 && (
                    <span className="ml-2 px-2 py-0.5 bg-primary/20 text-primary rounded-full text-xs font-bold">
                      {totalInquiries}
                    </span>
                  )}
                </span>
              </button>
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Recent Quote Requests */}
            <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-xl p-8 shadow-lg">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">Recent Quote Requests</h2>
                  <p className="text-sm text-gray-500">Latest customer quote submissions</p>
                </div>
                <button
                  onClick={() => setActiveTab('quotes')}
                  className="px-4 py-2 text-sm font-semibold text-primary hover:text-primary/80 hover:bg-primary/5 rounded-lg transition-all duration-200 flex items-center gap-2"
                >
                  View All
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              {quotes.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 text-base font-medium mb-1">No quote requests yet</p>
                  <p className="text-gray-500 text-sm">Quote requests will appear here when customers submit them</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {quotes.slice(0, 5).map((quote, index) => (
                    <div
                      key={quote.id || index}
                      className="border border-gray-200/50 rounded-xl p-5 hover:border-primary/30 hover:shadow-md bg-gradient-to-r from-white to-gray-50/50 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="font-bold text-lg text-gray-900">{quote.name}</h3>
                            {quote.urgent && (
                              <span className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-bold border border-red-200">
                                URGENT
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2 font-medium">{quote.email} • {quote.phone}</p>
                          {quote.eventType && (
                            <p className="text-xs text-primary font-semibold mb-1">Event: {quote.eventType}</p>
                          )}
                          {quote.budgetRange && (
                            <p className="text-xs text-gray-700 mb-2">Budget: {quote.budgetRange}</p>
                          )}
                          <p className="text-sm text-gray-700 line-clamp-2 mt-2 leading-relaxed">{quote.message}</p>
                        </div>
                        <span className="text-xs text-gray-500 ml-6 whitespace-nowrap font-medium">{formatDate(quote.createdAt)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Vendor Inquiries */}
            <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-xl p-8 shadow-lg">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">Recent Vendor Inquiries</h2>
                  <p className="text-sm text-gray-500">Latest customer inquiries for vendors</p>
                </div>
                <button
                  onClick={() => setActiveTab('inquiries')}
                  className="px-4 py-2 text-sm font-semibold text-primary hover:text-primary/80 hover:bg-primary/5 rounded-lg transition-all duration-200 flex items-center gap-2"
                >
                  View All
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              {inquiries.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 text-base font-medium mb-1">No inquiries yet</p>
                  <p className="text-gray-500 text-sm">Vendor inquiries will appear here when customers contact vendors</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {inquiries.slice(0, 5).map((inquiry, index) => (
                    <div
                      key={index}
                      className="border border-gray-200/50 rounded-xl p-5 hover:border-primary/30 hover:shadow-md bg-gradient-to-r from-white to-gray-50/50 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-gray-900 mb-3">
                            Inquiry for: <span className="text-primary">{inquiry.vendorName}</span>
                          </h3>
                          <p className="text-sm text-gray-600 mb-3 font-medium">
                            {inquiry.name} • {inquiry.email} • {inquiry.phone}
                          </p>
                          <p className="text-sm text-gray-700 line-clamp-2 mt-2 leading-relaxed">{inquiry.message}</p>
                        </div>
                        <span className="text-xs text-gray-500 ml-6 whitespace-nowrap font-medium">{formatDate(inquiry.createdAt)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Quote Requests Tab */}
        {activeTab === 'quotes' && (
          <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-xl p-8 shadow-lg">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">All Quote Requests</h2>
                <p className="text-sm text-gray-500">Manage all customer quote submissions</p>
              </div>
              {quotes.length > 0 && (
                <button
                  onClick={() => clearAll('quotes')}
                  className="px-5 py-2.5 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Clear All
                </button>
              )}
            </div>
            {quotes.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-gray-900 text-lg font-bold mb-2">No quote requests yet</p>
                <p className="text-gray-500 text-sm">Quote requests will appear here when customers submit them</p>
              </div>
            ) : (
              <div className="space-y-5">
                {quotes.map((quote, index) => (
                  <div
                    key={quote.id || index}
                    className="border border-gray-200/50 rounded-xl p-6 hover:border-primary/30 hover:shadow-md bg-gradient-to-r from-white to-gray-50/50 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <h3 className="text-xl font-bold text-gray-900">{quote.name}</h3>
                          {quote.urgent && (
                            <span className="px-3 py-1.5 bg-red-50 text-red-700 rounded-full text-xs font-bold border border-red-200 shadow-sm">
                              URGENT
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="font-medium">{quote.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span className="font-medium">{quote.phone}</span>
                          </div>
                          {quote.location && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span className="font-medium">{quote.location}</span>
                            </div>
                          )}
                        </div>
                        {(quote.eventType || quote.eventDate || quote.numberOfGuests || quote.budgetRange) && (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
                            {quote.eventType && (
                              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-4 border border-primary/20">
                                <p className="text-xs text-gray-600 mb-2 font-semibold uppercase tracking-wide">Event Type</p>
                                <p className="text-sm font-bold text-gray-900">{quote.eventType}</p>
                              </div>
                            )}
                            {quote.eventDate && (
                              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-4 border border-blue-200">
                                <p className="text-xs text-gray-600 mb-2 font-semibold uppercase tracking-wide">Event Date</p>
                                <p className="text-sm font-bold text-gray-900">
                                  {new Date(quote.eventDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </p>
                              </div>
                            )}
                            {quote.numberOfGuests && (
                              <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl p-4 border border-green-200">
                                <p className="text-xs text-gray-600 mb-2 font-semibold uppercase tracking-wide">Guests</p>
                                <p className="text-sm font-bold text-gray-900">{quote.numberOfGuests}</p>
                              </div>
                            )}
                            {quote.budgetRange && (
                              <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl p-4 border border-amber-200">
                                <p className="text-xs text-gray-600 mb-2 font-semibold uppercase tracking-wide">Budget</p>
                                <p className="text-sm font-bold text-gray-900">{quote.budgetRange}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="text-right ml-6">
                        <p className="text-xs text-gray-500 mb-1.5 font-semibold uppercase tracking-wide">Submitted</p>
                        <p className="text-sm text-gray-700 font-bold">{formatDate(quote.createdAt)}</p>
                      </div>
                    </div>
                    {quote.message && (
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl p-5 mb-5 border border-gray-200">
                        <p className="text-xs text-gray-600 mb-3 font-bold uppercase tracking-wide">Message</p>
                        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{quote.message}</p>
                      </div>
                    )}
                    {quote.urgent && (
                      <div className="p-4 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl">
                        <div className="flex items-center gap-3">
                          <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          <p className="text-sm text-red-700 font-bold">
                            Urgent Request - Executive should call within 12 hours
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Vendor Inquiries Tab */}
        {activeTab === 'inquiries' && (
          <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-xl p-8 shadow-lg">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">All Vendor Inquiries</h2>
                <p className="text-sm text-gray-500">Manage all customer vendor inquiries</p>
              </div>
              {inquiries.length > 0 && (
                <button
                  onClick={() => clearAll('inquiries')}
                  className="px-5 py-2.5 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Clear All
                </button>
              )}
            </div>
            {inquiries.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <p className="text-gray-900 text-lg font-bold mb-2">No inquiries yet</p>
                <p className="text-gray-500 text-sm">Vendor inquiries will appear here when customers contact vendors</p>
              </div>
            ) : (
              <div className="space-y-5">
                {inquiries.map((inquiry, index) => (
                  <div
                    key={index}
                    className="border border-gray-200/50 rounded-xl p-6 hover:border-primary/30 hover:shadow-md bg-gradient-to-r from-white to-gray-50/50 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-5">
                          Inquiry for: <span className="text-primary">{inquiry.vendorName}</span>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                          <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl p-4 border border-gray-200">
                            <p className="text-xs text-gray-600 mb-2 font-bold uppercase tracking-wide">Name</p>
                            <p className="text-sm font-bold text-gray-900">{inquiry.name}</p>
                          </div>
                          <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl p-4 border border-gray-200">
                            <p className="text-xs text-gray-600 mb-2 font-bold uppercase tracking-wide">Email</p>
                            <p className="text-sm font-bold text-gray-900">{inquiry.email}</p>
                          </div>
                          <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl p-4 border border-gray-200">
                            <p className="text-xs text-gray-600 mb-2 font-bold uppercase tracking-wide">Phone</p>
                            <p className="text-sm font-bold text-gray-900">{inquiry.phone}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right ml-6">
                        <p className="text-xs text-gray-500 mb-1.5 font-semibold uppercase tracking-wide">Submitted</p>
                        <p className="text-sm text-gray-700 font-bold">{formatDate(inquiry.createdAt)}</p>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl p-5 border border-gray-200">
                      <p className="text-xs text-gray-600 mb-3 font-bold uppercase tracking-wide">Message</p>
                      <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{inquiry.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 border border-gray-200">
            <div className="flex items-start gap-5 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-red-100 to-red-50 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm Logout</h3>
                <p className="text-sm text-gray-600 leading-relaxed">Are you sure you want to logout from the admin panel?</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-end">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
