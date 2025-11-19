import { Link } from 'react-router-dom'

export default function VendorCard({ vendor }) {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    const stars = []

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i}>★</span>)
    }
    if (hasHalfStar) {
      stars.push(<span key="half">☆</span>)
    }
    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-neutral-300">★</span>)
    }

    return stars
  }

  return (
    <Link to={`/vendors/${vendor.id}`}>
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer h-full flex flex-col hover:scale-[1.02]">
        {/* Image */}
        <div className="relative w-full h-56 bg-gradient-to-br from-primary/20 to-primary/40">
          {vendor.image ? (
            <img
              src={vendor.image}
              alt={vendor.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-4xl font-bold text-primary/60">{vendor.name.charAt(0)}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <div className="mb-3">
            <h3 className="text-xl font-semibold text-accent mb-2 line-clamp-1">
              {vendor.name}
            </h3>
            <p className="text-sm text-neutral-500 mb-2">{vendor.category}</p>
            <div className="flex items-center gap-1 text-yellow-500 text-sm mb-2">
              {renderStars(vendor.rating)}
              <span className="text-neutral-600 ml-2">{vendor.rating}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-neutral-600">📍 {vendor.city}</p>
            <p className="text-sm font-semibold text-primary">{vendor.priceRange}</p>
          </div>

          <button className="w-full mt-auto px-4 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors duration-200">
            View Details
          </button>
        </div>
      </div>
    </Link>
  )
}

