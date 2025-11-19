'use client'

import { useEffect } from 'react'

export default function Toast({ show, onClose, type = 'success', title, message, urgent = false }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose()
      }, 6000)
      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  if (!show) return null

  return (
    <div className="fixed top-20 right-2 sm:right-4 z-[100] max-w-md w-[calc(100%-1rem)] sm:w-full">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden transition-all duration-300">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center ${
                  urgent 
                    ? 'bg-gradient-to-br from-red-500 to-red-600' 
                    : 'bg-gradient-to-br from-green-500 to-green-600'
                } shadow-lg`}>
                  {urgent ? (
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  ) : (
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{message}</p>
                  {urgent && (
                    <div className="mt-3 p-3 bg-red-50 rounded-lg border border-red-200">
                      <p className="text-xs font-semibold text-red-700">
                        ⚡ Priority Response: Our executive will call you within <span className="text-base">12 hours</span>
                      </p>
                    </div>
                  )}
                  {!urgent && (
                    <p className="mt-3 text-xs text-gray-500 font-medium">
                      We'll contact you within 24 hours with a personalized quote.
                    </p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="flex-shrink-0 w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors duration-200"
                >
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className={`h-1 bg-gradient-to-r ${
              urgent 
                ? 'from-red-500 to-orange-500' 
                : 'from-green-500 to-emerald-500'
            }`}></div>
      </div>
    </div>
  )
}

