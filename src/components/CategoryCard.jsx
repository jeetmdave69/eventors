import { Link } from 'react-router-dom'

const categoryIcons = {
  'Wedding Venues': '🏛️',
  'Catering': '🍽️',
  'Photography': '📸',
  'Decoration': '🎨',
  'Entertainment': '🎵',
  'Makeup Artists': '💄',
  'Transport': '🚗',
  'Corporate Events': '💼',
  'Kids Events': '🎈',
  'Funeral Services': '🕊️',
  'Wedding Planning': '💍',
}

export default function CategoryCard({ category, description }) {
  const icon = categoryIcons[category] || '✨'

  return (
    <Link to={`/categories?category=${encodeURIComponent(category)}`}>
      <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer group h-full hover:scale-[1.02]">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-semibold text-accent mb-3 group-hover:text-primary transition-colors duration-200">
          {category}
        </h3>
        <p className="text-sm text-neutral-600 mb-6 line-clamp-2">
          {description}
        </p>
        <div className="flex items-center text-primary font-medium text-sm group-hover:translate-x-1 transition-transform duration-200">
          Explore →
        </div>
      </div>
    </Link>
  )
}

