import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import vendorsData from '../data/vendors.json'

export default function VendorDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [vendor, setVendor] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const found = vendorsData.find(v => v.id === id)
    if (!found) {
      navigate('/vendors')
      return
    }
    setVendor(found)
  }, [id, navigate])

  if (!vendor) {
    return null
  }

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    const stars = []

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-500">★</span>)
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-500">☆</span>)
    }
    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-neutral-300">★</span>)
    }

    return stars
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

  return (
    <div className="pt-20">
      {/* Hero Image */}
      <div className="relative w-full h-64 md:h-96 bg-gradient-to-br from-primary/20 to-primary/40">
        {vendor.image ? (
          <img
            src={vendor.image}
            alt={vendor.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
        ) : null}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-7xl mx-auto">
            <Link
              to="/vendors"
              className="text-sm font-medium hover:underline mb-2 inline-block"
            >
              ← Back to Vendors
            </Link>
            <h1 className="text-3xl md:text-5xl font-bold mb-2">{vendor.name}</h1>
            <p className="text-lg opacity-90">{vendor.category} • {vendor.city}</p>
          </div>
        </div>
      </div>

      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="bg-white rounded-2xl p-8 shadow-md">
                <h2 className="text-3xl font-semibold mb-4">About</h2>
                <p className="text-neutral-600 leading-relaxed text-lg">{vendor.description}</p>
              </div>

              {/* Services/Tags */}
              {vendor.tags && vendor.tags.length > 0 && (
                <div className="bg-white rounded-2xl p-8 shadow-md">
                  <h2 className="text-3xl font-semibold mb-4">Services</h2>
                  <div className="flex flex-wrap gap-3">
                    {vendor.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-primary/10 text-primary rounded-xl text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Info Card */}
              <div className="bg-white rounded-2xl p-8 shadow-md mb-6 sticky top-24">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-1 text-yellow-500 text-xl mb-3">
                    {renderStars(vendor.rating)}
                  </div>
                  <p className="text-2xl font-bold text-accent mb-1">{vendor.rating}</p>
                  <p className="text-sm text-neutral-500 mb-6">Rating</p>
                </div>

                <div className="space-y-4 mb-6 pb-6 border-b border-neutral-200">
                  <div>
                    <p className="text-sm text-neutral-500 mb-1">Price Range</p>
                    <p className="text-lg font-semibold text-primary">{vendor.priceRange}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500 mb-1">Location</p>
                    <p className="text-lg font-medium text-accent">📍 {vendor.city}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500 mb-1">Category</p>
                    <p className="text-lg font-medium text-accent">{vendor.category}</p>
                  </div>
                </div>

                {/* Contact Form */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Send Inquiry</h3>
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
                      className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200"
                    />
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200"
                    />
                    <textarea
                      placeholder="Message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200 resize-none"
                    />
                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors duration-200 shadow-md hover:shadow-lg"
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

