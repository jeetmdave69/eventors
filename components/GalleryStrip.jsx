'use client'

import Image from 'next/image'

export default function GalleryStrip({ images }) {
  if (!images || images.length === 0) return null

  const displayImages = images.slice(0, 3)

  return (
    <div className="grid grid-cols-3 gap-4">
      {displayImages.map((image, index) => (
        <div key={index} className="relative aspect-square rounded-xl overflow-hidden bg-slate-200">
          {image ? (
            <Image
              src={image}
              alt={`Gallery image ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 33vw, 200px"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-brand-200 to-brand-400" />
          )}
        </div>
      ))}
    </div>
  )
}

