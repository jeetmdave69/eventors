import { useState, useMemo } from 'react'
import VendorGrid from '../components/VendorGrid'
import vendorsData from '../data/vendors.json'

export default function Vendors() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', ...new Set(vendorsData.map(v => v.category))]

  const filteredVendors = useMemo(() => {
    return vendorsData.filter(vendor => {
      const matchesSearch =
        vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.city.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = selectedCategory === 'All' || vendor.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  return (
    <div className="pt-20 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">All Vendors</h1>
          <p className="text-lg text-neutral-600">
            Discover premium event services for your special occasion
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4 md:space-y-0 md:flex md:gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search vendors by name, description, or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-3.5 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200 shadow-sm"
            />
          </div>
          <div className="md:w-64">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-6 py-3.5 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200 shadow-sm bg-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-neutral-600">
            Showing <span className="font-semibold text-accent">{filteredVendors.length}</span> vendor{filteredVendors.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Vendor Grid */}
        {filteredVendors.length > 0 ? (
          <VendorGrid vendors={filteredVendors} />
        ) : (
          <div className="text-center py-16">
            <p className="text-neutral-500 text-lg mb-4">No vendors found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('All')
              }}
              className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors duration-200"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

