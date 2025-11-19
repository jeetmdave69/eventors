'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import CategoryCard from '@/components/CategoryCard'
import VendorCard from '@/components/VendorCard'
import vendorsData from '@/data/vendors.json'

const allCategories = [
  { 
    name: 'Wedding Venues', 
    description: 'Beautiful venues for your special day',
    imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop'
  },
  { 
    name: 'Catering', 
    description: 'Delicious cuisine for every occasion',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop'
  },
  { 
    name: 'Photography', 
    description: 'Capture your precious moments',
    imageUrl: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&h=600&fit=crop'
  },
  { 
    name: 'Decoration', 
    description: 'Transform spaces into magic',
    imageUrl: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop'
  },
  { 
    name: 'Corporate Events', 
    description: 'Professional event branding',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop'
  },
  { 
    name: 'Birthday Parties', 
    description: 'Magical experiences for children',
    imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop'
  },
  { 
    name: 'Funeral Services', 
    description: 'Dignified and compassionate services',
    imageUrl: 'https://images.pexels.com/photos/442587/pexels-photo-442587.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
  },
  { 
    name: 'Mehendi / Makeup Artists', 
    description: 'Look stunning on your big day',
    imageUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&h=600&fit=crop'
  },
  { 
    name: 'Entertainment', 
    description: 'Keep the party going all night',
    imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop'
  },
]

function CategoriesContent() {
  const searchParams = useSearchParams()
  const selectedCategory = searchParams.get('category')
  const [categoryVendors, setCategoryVendors] = useState([])

  useEffect(() => {
    if (selectedCategory) {
      const filtered = vendorsData.filter(v => v.category === selectedCategory)
      setCategoryVendors(filtered)
    } else {
      setCategoryVendors([])
    }
  }, [selectedCategory])

  if (selectedCategory) {
    return (
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <button
              onClick={() => window.history.back()}
              className="text-sm text-gray-500 hover:text-primary mb-4 inline-block transition-colors duration-200"
            >
              ← Back to Categories
            </button>
            <h1 className="text-5xl md:text-6xl font-bold text-secondary mb-4">{selectedCategory}</h1>
            <p className="text-xl text-gray-600 font-medium">
              {categoryVendors.length} vendor{categoryVendors.length !== 1 ? 's' : ''} available
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryVendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-secondary mb-4">All Categories</h1>
          <p className="text-xl text-gray-600 font-medium">
            Explore our wide range of event service categories
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allCategories.map((category) => (
            <CategoryCard
              key={category.name}
              category={category.name}
              description={category.description}
              imageUrl={category.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Categories() {
  return (
    <Suspense fallback={
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-secondary mb-4">All Categories</h1>
            <p className="text-xl text-gray-600 font-medium">
              Explore our wide range of event service categories
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCategories.map((category) => (
              <CategoryCard
                key={category.name}
                category={category.name}
                description={category.description}
                imageUrl={category.imageUrl}
              />
            ))}
          </div>
        </div>
      </div>
    }>
      <CategoriesContent />
    </Suspense>
  )
}

