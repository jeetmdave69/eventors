'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import vendorsData from '@/data/vendors.json'

export default function VendorDetails() {
  const params = useParams()
  const router = useRouter()
  const [vendor, setVendor] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const found = vendorsData.find(v => v.id === params.id)
    if (!found) {
      router.push('/vendors')
      return
    }
    setVendor(found)
  }, [params.id, router])

  if (!vendor) {
    return null
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]')
    inquiries.push({
      vendorId: vendor.id,
      vendorName: vendor.name,
      ...formData,
      createdAt: new Date().toISOString(),
    })
    localStorage.setItem('inquiries', JSON.stringify(inquiries))
    setSubmitted(true)
    setFormData({ name: '', email: '', phone: '', message: '' })
    setTimeout(() => setSubmitted(false), 5000)
  }

  const bannerImage = `https://picsum.photos/1600/900?random=${vendor.id}-banner`

  return (
    <div className="pt-20">
      {/* Hero Banner */}
      <div className="relative w-full h-64 md:h-96 bg-gradient-to-br from-primary/30 to-secondary/40">
        <Image
          src={bannerImage}
          alt={vendor.name}
          fill
          className="object-cover opacity-90"
          priority
          sizes="100vw"
          unoptimized
          onError={(e) => {
            e.target.style.display = 'none'
          }}
        />
        <div className="absolute inset-0 bg-secondary/60" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-7xl mx-auto">
            <Link
              href="/vendors"
              className="text-sm font-medium hover:underline mb-2 inline-block"
            >
              ← Back to Vendors
            </Link>
            <h1 className="text-3xl md:text-5xl font-semibold mb-2">{vendor.name}</h1>
            <p className="text-lg opacity-90">{vendor.category} • {vendor.city}</p>
          </div>
        </div>
      </div>

      <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Gallery */}
              {vendor.gallery && vendor.gallery.length > 0 && (
                <div className="bg-white rounded-xl p-8 shadow-md">
                  <h2 className="text-3xl font-semibold text-secondary mb-6">Gallery</h2>
                  <div className="grid grid-cols-3 gap-4">
                    {vendor.gallery.map((image, index) => (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-primary/40">
                        <Image
                          src={image}
                          alt={`${vendor.name} gallery ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 33vw, 200px"
                          unoptimized
                          onError={(e) => {
                            e.target.style.display = 'none'
                            e.target.parentElement.innerHTML = `
                              <div class="w-full h-full flex items-center justify-center">
                                <span class="text-2xl font-bold text-primary">${vendor.name.charAt(0)}</span>
                              </div>
                            `
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="bg-white rounded-xl p-8 shadow-md">
                <h2 className="text-3xl font-semibold text-secondary mb-4">About</h2>
                <p className="text-gray-500 leading-relaxed text-lg">{vendor.description}</p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Info Card */}
              <div className="bg-white rounded-xl p-8 shadow-md mb-6 sticky top-24">
                <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Price Range</p>
                    <p className="text-2xl font-semibold text-primary">{vendor.price}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Location</p>
                    <p className="text-lg font-medium text-secondary">📍 {vendor.city}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Category</p>
                    <p className="text-lg font-medium text-secondary">{vendor.category}</p>
                  </div>
                  {vendor.contact && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Contact</p>
                      <p className="text-sm text-secondary">{vendor.contact.email}</p>
                      <p className="text-sm text-secondary">{vendor.contact.phone}</p>
                    </div>
                  )}
                </div>

                {/* Contact Form */}
                <div>
                  <h3 className="text-xl font-semibold text-secondary mb-4">Send Inquiry</h3>
                  {submitted && (
                    <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                      <p className="text-green-700 font-medium text-sm">✓ Inquiry submitted successfully!</p>
                    </div>
                  )}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200"
                    />
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200"
                    />
                    <textarea
                      placeholder="Message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200 resize-none"
                    />
                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors duration-200 shadow-md hover:shadow-lg"
                    >
                      Submit Inquiry
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
