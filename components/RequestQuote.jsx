'use client'

import { useState } from 'react'
import Toast from '@/components/Toast'

export default function RequestQuote() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    numberOfGuests: '',
    budgetRange: '',
    location: '',
    message: '',
    urgent: false,
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [wasUrgent, setWasUrgent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Get existing quotes from localStorage
    const existingQuotes = JSON.parse(localStorage.getItem('quotes') || '[]')

    // Create new quote request
    const newQuote = {
      ...formData,
      createdAt: new Date().toISOString(),
      id: Date.now().toString(),
    }

    // Add to localStorage
    existingQuotes.push(newQuote)
    localStorage.setItem('quotes', JSON.stringify(existingQuotes))

    // Remember if it was urgent for the success message
    setWasUrgent(formData.urgent)

    // Reset form and show success
    setFormData({
      name: '',
      email: '',
      phone: '',
      eventType: '',
      eventDate: '',
      numberOfGuests: '',
      budgetRange: '',
      location: '',
      message: '',
      urgent: false,
    })
    setIsSubmitting(false)
    setSubmitted(true)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  return (
    <div className="bg-white border border-gray-200 shadow-sm">
      {/* Header Section */}
      <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white px-8 md:px-12 py-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-3 tracking-tight">
            Request a Quote
          </h1>
          <p className="text-gray-600 text-base leading-relaxed">
            Please provide the following information to receive a detailed quotation for your event. Our team will review your requirements and contact you within 24 hours with a customized proposal.
          </p>
        </div>
      </div>

      <Toast
        show={submitted}
        onClose={() => setSubmitted(false)}
        type="success"
        title="Quote Request Submitted Successfully!"
        message="Thank you for choosing Enventors! We've received your details and will get back to you soon."
        urgent={wasUrgent}
      />

      <form onSubmit={handleSubmit} className="px-8 md:px-12 py-10">
        {/* Personal Information */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-secondary mb-6 pb-3 border-b border-gray-200">
            Contact Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2.5">
                Full Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 bg-white text-gray-900 placeholder-gray-400"
                placeholder="Ruby Saha"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2.5">
                Email Address <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 bg-white text-gray-900 placeholder-gray-400"
                placeholder="rubysaha2902@gmail.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2.5">
                Phone Number <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 bg-white text-gray-900 placeholder-gray-400"
                placeholder="+91 80 1234 5678"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2.5">
                Event Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 bg-white text-gray-900 placeholder-gray-400"
                placeholder="Bengaluru, Karnataka"
              />
            </div>
          </div>
        </div>

        {/* Event Details */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-secondary mb-6 pb-3 border-b border-gray-200">
            Event Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="eventType" className="block text-sm font-semibold text-gray-700 mb-2.5">
                Event Type <span className="text-red-600">*</span>
              </label>
              <select
                id="eventType"
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 bg-white text-gray-900"
              >
                <option value="">Select event type</option>
                <option value="Wedding">Wedding</option>
                <option value="Corporate Event">Corporate Event</option>
                <option value="Birthday Party">Birthday Party</option>
                <option value="Anniversary">Anniversary</option>
                <option value="Engagement">Engagement</option>
                <option value="Baby Shower">Baby Shower</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="eventDate" className="block text-sm font-semibold text-gray-700 mb-2.5">
                Event Date <span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                id="eventDate"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 bg-white text-gray-900"
              />
            </div>

            <div>
              <label htmlFor="numberOfGuests" className="block text-sm font-semibold text-gray-700 mb-2.5">
                Expected Number of Guests
              </label>
              <input
                type="number"
                id="numberOfGuests"
                name="numberOfGuests"
                value={formData.numberOfGuests}
                onChange={handleChange}
                min="1"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 bg-white text-gray-900 placeholder-gray-400"
                placeholder="e.g., 100"
              />
            </div>

            <div>
              <label htmlFor="budgetRange" className="block text-sm font-semibold text-gray-700 mb-2.5">
                Estimated Budget Range
              </label>
              <select
                id="budgetRange"
                name="budgetRange"
                value={formData.budgetRange}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 bg-white text-gray-900"
              >
                <option value="">Select budget range</option>
                <option value="Under ₹50,000">Under ₹50,000</option>
                <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                <option value="₹1,00,000 - ₹2,50,000">₹1,00,000 - ₹2,50,000</option>
                <option value="₹2,50,000 - ₹5,00,000">₹2,50,000 - ₹5,00,000</option>
                <option value="₹5,00,000 - ₹10,00,000">₹5,00,000 - ₹10,00,000</option>
                <option value="Above ₹10,00,000">Above ₹10,00,000</option>
              </select>
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="mb-10">
          <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2.5">
            Additional Requirements & Details <span className="text-red-600">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 resize-none bg-white text-gray-900 placeholder-gray-400"
            placeholder="Please provide details about your event, specific requirements, preferred vendors, theme preferences, and any other relevant information that will help us prepare an accurate quotation."
          />
        </div>

        {/* Urgent Option - Professional Design */}
        <div className="mb-10">
          <div className="border border-gray-300 rounded-md bg-gray-50 p-6">
            <label className="flex items-start gap-4 cursor-pointer group">
              <div className="flex-shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  id="urgent"
                  name="urgent"
                  checked={formData.urgent}
                  onChange={handleChange}
                  className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary cursor-pointer"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-base font-bold text-gray-900">Priority Response Request</span>
                  {formData.urgent && (
                    <span className="px-2.5 py-1 bg-red-600 text-white text-xs font-semibold uppercase tracking-wide rounded">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {formData.urgent ? (
                    <>
                      <span className="font-semibold text-gray-900">Priority processing enabled.</span> Your request will be reviewed by our executive team within <span className="font-semibold text-gray-900">12 hours</span> instead of the standard 24-hour response time. This service is recommended for time-sensitive events or urgent inquiries.
                    </>
                  ) : (
                    <>
                      Select this option if you require expedited processing of your quotation request. Our executive team will prioritize your inquiry and contact you within <span className="font-semibold text-gray-900">12 hours</span> instead of the standard 24-hour response window.
                    </>
                  )}
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6 border-t border-gray-200">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto md:min-w-[200px] px-8 py-3.5 bg-secondary text-white font-semibold rounded-md hover:bg-secondary/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md text-base"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              'Submit Request'
            )}
          </button>
          <p className="text-xs text-gray-500 mt-4">
            By submitting this form, you agree to be contacted by our team regarding your quotation request.
          </p>
        </div>
      </form>
    </div>
  )
}
