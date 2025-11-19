'use client'

import RequestQuote from '@/components/RequestQuote'
import Link from 'next/link'

export default function RequestQuotePage() {
  return (
    <div className="pt-20 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-secondary font-medium inline-flex items-center gap-1.5 transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>
        <RequestQuote />
      </div>
    </div>
  )
}

