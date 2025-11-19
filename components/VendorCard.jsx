'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function VendorCard({ vendor }) {
  const [imgError, setImgError] = useState(false)
  const [imgSrc, setImgSrc] = useState(vendor.thumbnail)
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleImageError = () => {
    if (!imgError) {
      setImgError(true)
      // Fallback to a placeholder service
      const categorySlug = vendor.category.toLowerCase().replace(/\s+/g, '-')
      setImgSrc(`https://picsum.photos/800/600?random=${vendor.id}`)
    }
  }

  return (
    <Link href={`/vendors/${vendor.id}`}>
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col hover:-translate-y-1 group">
        {/* Image */}
        <div className="relative w-full h-56 bg-gradient-to-br from-primary/20 to-primary/40 overflow-hidden">
          {!imgError ? (
            <>
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300" />
              )}
              <Image
                src={imgSrc}
                alt={vendor.name}
                fill
                className={`object-cover transition-all duration-500 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="lazy"
                quality={75}
                onLoad={() => setImageLoaded(true)}
                onError={handleImageError}
              />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary/30 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-3xl font-bold text-primary">{vendor.name.charAt(0)}</span>
                </div>
                <p className="text-xs text-gray-500">{vendor.category}</p>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <div className="mb-3">
            <h3 className="text-xl font-semibold text-secondary mb-2 line-clamp-1 group-hover:text-primary transition-colors duration-300">
              {vendor.name}
            </h3>
            <p className="text-sm text-gray-500 mb-2">{vendor.category}</p>
            <p className="text-sm text-gray-500 mb-3">📍 {vendor.city}</p>
          </div>

          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-primary">{vendor.price}</p>
          </div>

          <button className="w-full mt-auto px-4 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
            View Details
          </button>
        </div>
      </div>
    </Link>
  )
}
