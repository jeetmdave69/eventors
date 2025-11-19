'use client'

import Link from 'next/link'

const categories = [
  { name: 'Wedding venues', description: 'Beautiful venues for your special day' },
  { name: 'Catering', description: 'Delicious cuisine for every occasion' },
  { name: 'Photography', description: 'Capture your precious moments' },
  { name: 'Decoration', description: 'Transform spaces into magic' },
  { name: 'Makeup', description: 'Look stunning on your big day' },
  { name: 'DJs', description: 'Keep the party going all night' },
  { name: 'Transport', description: 'Arrive in style and comfort' },
  { name: 'Corporate branding', description: 'Professional event branding' },
  { name: 'Kids events', description: 'Magical experiences for children' },
  { name: 'Funerals', description: 'Dignified and compassionate services' },
  { name: 'Cakes', description: 'Artisanal cakes and desserts' },
  { name: 'Wedding planners', description: 'Stress-free wedding planning' },
]

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {categories.map((category) => (
        <Link key={category.name} href={`/category/${encodeURIComponent(category.name)}`}>
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer group h-full">
            <h3 className="text-lg font-semibold text-slate-700 mb-2 group-hover:text-brand-600 transition-colors duration-200">
              {category.name}
            </h3>
            <p className="text-sm text-slate-500 mb-4 line-clamp-2">
              {category.description}
            </p>
            <div className="flex items-center text-brand-500 font-medium text-sm">
              Explore →
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

