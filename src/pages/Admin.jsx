import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import vendorsData from '../data/vendors.json'

export default function Admin() {
  const [inquiries, setInquiries] = useState([])
  const [vendors, setVendors] = useState(vendorsData)
  const [editingVendor, setEditingVendor] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    city: '',
    rating: 0,
    priceRange: '',
    description: '',
    image: '',
    tags: '',
  })

  useEffect(() => {
    const stored = localStorage.getItem('inquiries')
    if (stored) {
      const parsed = JSON.parse(stored)
      const sorted = parsed.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      setInquiries(sorted)
    }
  }, [])

  const categories = ['Wedding Venues', 'Catering', 'Photography', 'Decoration', 'Entertainment', 'Makeup Artists', 'Transport', 'Corporate Events', 'Kids Events', 'Funeral Services', 'Wedding Planning']

  const clearAll = () => {
    if (window.confirm('Are you sure you want to clear all inquiries?')) {
      localStorage.removeItem('inquiries')
      setInquiries([])
    }
  }

  const handleEditVendor = (vendor) => {
    setEditingVendor(vendor.id)
    setFormData({
      name: vendor.name,
      category: vendor.category,
      city: vendor.city,
      rating: vendor.rating,
      priceRange: vendor.priceRange,
      description: vendor.description,
      image: vendor.image,
      tags: vendor.tags.join(', '),
    })
  }

  const handleSaveVendor = () => {
    const updated = vendors.map(v => {
      if (v.id === editingVendor) {
        return {
          ...v,
          ...formData,
          tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
        }
      }
      return v
    })
    setVendors(updated)
    setEditingVendor(null)
    setFormData({
      name: '',
      category: '',
      city: '',
      rating: 0,
      priceRange: '',
      description: '',
      image: '',
      tags: '',
    })
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="pt-20 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link
            to="/"
            className="text-sm text-neutral-500 hover:text-primary mb-4 inline-block transition-colors duration-200"
          >
            ← Back to Home
          </Link>
          <h1 className="text-5xl md:text-6xl font-bold mb-2">Admin Panel</h1>
          <p className="text-lg text-neutral-600">Manage vendors and inquiries</p>
        </div>

        {/* Inquiries Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-semibold">Inquiries</h2>
            {inquiries.length > 0 && (
              <button
                onClick={clearAll}
                className="px-6 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-colors duration-200 shadow-md"
              >
                Clear All
              </button>
            )}
          </div>
          {inquiries.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 shadow-md text-center">
              <p className="text-neutral-500 text-lg">No inquiries yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {inquiries.map((inquiry, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-semibold text-accent mb-4">
                        Inquiry for: {inquiry.vendorName}
                      </h3>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-semibold text-neutral-600">Name:</span>{' '}
                          <span className="text-neutral-700">{inquiry.name}</span>
                        </p>
                        <p>
                          <span className="font-semibold text-neutral-600">Email:</span>{' '}
                          <span className="text-neutral-700">{inquiry.email}</span>
                        </p>
                        <p>
                          <span className="font-semibold text-neutral-600">Phone:</span>{' '}
                          <span className="text-neutral-700">{inquiry.phone}</span>
                        </p>
                        <p>
                          <span className="font-semibold text-neutral-600">Submitted:</span>{' '}
                          <span className="text-neutral-700">{formatDate(inquiry.createdAt)}</span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-600 mb-2">Message:</p>
                      <p className="text-neutral-700 bg-neutral-50 rounded-xl p-4 text-sm">
                        {inquiry.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Vendor Management Section */}
        <div>
          <h2 className="text-3xl font-semibold mb-6">Vendor Management</h2>
          <div className="bg-white rounded-2xl p-8 shadow-md">
            {editingVendor ? (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">Edit Vendor</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Vendor Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200"
                  />
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200"
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200"
                  />
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    placeholder="Rating"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                    className="px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200"
                  />
                  <input
                    type="text"
                    placeholder="Price Range"
                    value={formData.priceRange}
                    onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
                    className="px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200"
                  />
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200"
                  />
                </div>
                <textarea
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200 resize-none"
                />
                <input
                  type="text"
                  placeholder="Tags (comma separated)"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200"
                />
                <div className="flex gap-4">
                  <button
                    onClick={handleSaveVendor}
                    className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors duration-200"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => {
                      setEditingVendor(null)
                      setFormData({
                        name: '',
                        category: '',
                        city: '',
                        rating: 0,
                        priceRange: '',
                        description: '',
                        image: '',
                        tags: '',
                      })
                    }}
                    className="px-6 py-3 bg-neutral-200 text-neutral-700 font-semibold rounded-xl hover:bg-neutral-300 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-neutral-600 mb-4">Select a vendor to edit:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {vendors.map(vendor => (
                    <button
                      key={vendor.id}
                      onClick={() => handleEditVendor(vendor)}
                      className="text-left p-4 border border-neutral-300 rounded-xl hover:border-primary hover:bg-primary/5 transition-all duration-200"
                    >
                      <p className="font-semibold text-accent">{vendor.name}</p>
                      <p className="text-sm text-neutral-500">{vendor.category}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

