'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import vendorsData from '@/data/vendors.json'
import VendorCard from '@/components/VendorCard'

export default function CategoryPage({ params }) {
  const { name } = params
  const decodedName = decodeURIComponent(name)
  const categoryVendors = vendorsData.filter(v => v.category === decodedName)

  if (categoryVendors.length === 0) {
    notFound()
  }

  // Get unique services from vendors in this category
  const allServices = new Set()
  categoryVendors.forEach(vendor => {
    if (vendor.services) {
      vendor.services.forEach(service => allServices.add(service))
    }
  })
  const uniqueServices = Array.from(allServices)

  return (
    <div className="pt-20 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-sm text-slate-500 hover:text-brand-600 mb-4 inline-block"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-700 mb-4">
            {decodedName}
          </h1>
          <p className="text-slate-500 text-lg">
            {categoryVendors.length} vendor{categoryVendors.length !== 1 ? 's' : ''} available
          </p>
        </div>

        {/* Service Chips */}
        {uniqueServices.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-slate-700 mb-4">Available Services</h2>
            <div className="flex flex-wrap gap-3">
              {uniqueServices.map((service, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-white text-slate-700 rounded-lg text-sm font-medium shadow-sm border border-slate-200"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Vendor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryVendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      </div>
    </div>
  )
}

