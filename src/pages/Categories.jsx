import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import CategoryCard from '../components/CategoryCard'
import VendorGrid from '../components/VendorGrid'
import vendorsData from '../data/vendors.json'

const allCategories = [
  { name: 'Wedding Venues', description: 'Beautiful venues for your special day' },
  { name: 'Catering', description: 'Delicious cuisine for every occasion' },
  { name: 'Photography', description: 'Capture your precious moments' },
  { name: 'Decoration', description: 'Transform spaces into magic' },
  { name: 'Entertainment', description: 'Keep the party going all night' },
  { name: 'Makeup Artists', description: 'Look stunning on your big day' },
  { name: 'Transport', description: 'Arrive in style and comfort' },
  { name: 'Corporate Events', description: 'Professional event branding' },
  { name: 'Kids Events', description: 'Magical experiences for children' },
  { name: 'Funeral Services', description: 'Dignified and compassionate services' },
  { name: 'Wedding Planning', description: 'Stress-free wedding planning' },
]

export default function Categories() {
  const [searchParams] = useSearchParams()
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
      <div className="pt-20 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <button
              onClick={() => window.history.back()}
              className="text-sm text-neutral-500 hover:text-primary mb-4 inline-block transition-colors duration-200"
            >
              ← Back to Categories
            </button>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">{selectedCategory}</h1>
            <p className="text-lg text-neutral-600">
              {categoryVendors.length} vendor{categoryVendors.length !== 1 ? 's' : ''} available
            </p>
          </div>
          <VendorGrid vendors={categoryVendors} />
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">All Categories</h1>
          <p className="text-lg text-neutral-600">
            Explore our wide range of event service categories
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allCategories.map((category) => (
            <CategoryCard
              key={category.name}
              category={category.name}
              description={category.description}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

