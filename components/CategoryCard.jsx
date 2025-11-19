'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function CategoryCard({ category, description, imageUrl }) {
  const [imgError, setImgError] = useState(false)
  const [imgSrc, setImgSrc] = useState(imageUrl)
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleImageError = () => {
    if (!imgError) {
      setImgError(true)
    }
  }

  const categoryConfig = getCategoryConfig(category)

  return (
    <Link href={`/categories?category=${encodeURIComponent(category)}`}>
      <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group h-full flex flex-col hover:-translate-y-1">
        {/* Image */}
        <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden flex-shrink-0">
          {/* Gradient Background - Always visible */}
          <div className={`absolute inset-0 ${categoryConfig.gradient} opacity-90`}></div>
          
          {/* Image Layer */}
          {!imgError ? (
            <>
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300" />
              )}
              <Image
                src={imgSrc}
                alt={category}
                fill
                className={`object-cover opacity-80 transition-all duration-500 group-hover:scale-110 ${imageLoaded ? 'opacity-80' : 'opacity-0'}`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="lazy"
                quality={75}
                onLoad={() => setImageLoaded(true)}
                onError={handleImageError}
              />
              {/* Overlay to blend image with gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            </>
          ) : null}
        </div>
        
        {/* Content */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-lg font-semibold text-secondary mb-2 group-hover:text-primary transition-colors duration-200">
            {category}
          </h3>
          <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-1">
            {description}
          </p>
          <div className="flex items-center text-primary font-medium text-sm mt-auto group-hover:gap-2 transition-all duration-300">
            <span>Explore</span>
            <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block">→</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

function getCategoryConfig(category) {
  const configs = {
    'Wedding Venues': {
      gradient: 'bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600',
      icon: `<svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>`
    },
    'Catering': {
      gradient: 'bg-gradient-to-br from-orange-400 via-orange-500 to-red-500',
      icon: `<svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>`
    },
    'Photography': {
      gradient: 'bg-gradient-to-br from-purple-400 via-purple-500 to-indigo-600',
      icon: `<svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>`
    },
    'Decoration': {
      gradient: 'bg-gradient-to-br from-pink-400 via-rose-500 to-pink-600',
      icon: `<svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>`
    },
    'Corporate Events': {
      gradient: 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600',
      icon: `<svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>`
    },
    'Birthday Parties': {
      gradient: 'bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500',
      icon: `<svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
    },
    'Funeral Services': {
      gradient: 'bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600',
      icon: `<svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>`
    },
    'Mehendi / Makeup Artists': {
      gradient: 'bg-gradient-to-br from-rose-400 via-pink-500 to-rose-600',
      icon: `<svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z"></path></svg>`
    },
    'Entertainment': {
      gradient: 'bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500',
      icon: `<svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>`
    },
  }
  return configs[category] || {
    gradient: 'bg-gradient-to-br from-primary/40 to-primary/60',
    icon: `<svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>`
  }
}

