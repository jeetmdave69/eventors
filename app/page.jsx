'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import CategoryCard from '@/components/CategoryCard'
import VendorCard from '@/components/VendorCard'
import vendorsData from '@/data/vendors.json'

const categories = [
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
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop&q=80'
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

// Array of high-quality event/wedding images - will rotate on each page load
// Optimized with proper dimensions and quality settings
const heroImages = [
  'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&h=1080&fit=crop&q=85&auto=format',
  'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1920&h=1080&fit=crop&q=85&auto=format',
  'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1920&h=1080&fit=crop&q=85&auto=format',
]

export default function Home() {
  const featuredVendors = vendorsData.slice(0, 6)
  const [heroImage, setHeroImage] = useState('')
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    // Select a random image on each page load
    const randomIndex = Math.floor(Math.random() * heroImages.length)
    setHeroImage(heroImages[randomIndex])
  }, [])

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden">
        {/* Base Gradient - Always visible for good look */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-primary/30 to-secondary/60 z-0"></div>
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          {heroImage && (
            <>
              <Image
                src={heroImage}
                alt="Event celebration"
                fill
                className={`object-cover opacity-70 transition-opacity duration-300 ${imageLoaded ? 'opacity-70' : 'opacity-0'}`}
                priority
                sizes="100vw"
                quality={85}
                onLoad={() => setImageLoaded(true)}
                onError={(e) => {
                  if (e.target && e.target.parentElement) {
                    e.target.parentElement.style.display = 'none'
                  }
                  setImageLoaded(true)
                }}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-primary/30 to-secondary/60" />
              )}
            </>
          )}
        </div>
        
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/75 via-secondary/65 to-secondary/55 z-0"></div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance leading-tight">
              India's leading
              <br />
              <span className="text-primary">
                Event &
              </span>
              <br />
              <span className="text-primary">
                Wedding
              </span>
              <br />
              <span>
                Management Company
              </span>
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Link
                href="/request-quote"
                className="px-10 py-5 bg-primary text-white font-bold text-lg rounded-xl hover:bg-primary/90 transition-all duration-200 shadow-xl hover:shadow-lg"
              >
                Let's Talk - Send a Message
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-semibold text-secondary mb-4">
              Browse by Category
            </h2>
            <p className="text-lg text-gray-500">
              Find exactly what you need for your event
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category.name}
                category={category.name}
                description={category.description}
                imageUrl={category.imageUrl}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vendors Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-semibold text-secondary mb-4">
              Featured Vendors
            </h2>
            <p className="text-lg text-gray-500">
              Handpicked premium services for your special day
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredVendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/vendors"
              className="inline-block px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              View All Vendors
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold text-secondary mb-4">
              Hear from Trusted Clients
            </h2>
            <p className="text-lg text-gray-500">
              Real experiences from our satisfied customers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "Enventors made our wedding absolutely magical! From venue selection to catering, everything was perfect. The team was professional, responsive, and truly understood our vision. Highly recommended!"
              </p>
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-primary/20">
                  <Image
                    src="https://picsum.photos/seed/indian-woman-1/200/200"
                    alt="Priya Sharma"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-secondary">Priya Sharma</h4>
                  <p className="text-sm text-gray-500">Bangalore, Karnataka</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "We organized our corporate event through Enventors and it was a huge success! The attention to detail, vendor coordination, and execution was flawless. Our clients were impressed!"
              </p>
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-primary/20">
                  <Image
                    src="https://picsum.photos/seed/indian-man-1/200/200"
                    alt="Rahul Kapoor"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-secondary">Rahul Kapoor</h4>
                  <p className="text-sm text-gray-500">Bangalore, Karnataka</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "Best decision we made for our daughter's wedding! Enventors handled everything with such grace and professionalism. The photography, decoration, and catering were all top-notch. Thank you!"
              </p>
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-primary/20">
                  <Image
                    src="https://picsum.photos/seed/indian-woman-2/200/200"
                    alt="Anjali Reddy"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-secondary">Anjali Reddy</h4>
                  <p className="text-sm text-gray-500">Bangalore, Karnataka</p>
                </div>
              </div>
            </div>

            {/* Testimonial 4 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "Enventors exceeded all our expectations! They transformed our simple engagement into a grand celebration. The team was always available, listened to our ideas, and executed them beautifully."
              </p>
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-primary/20">
                  <Image
                    src="https://picsum.photos/seed/indian-man-2/200/200"
                    alt="Vikram Singh"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-secondary">Vikram Singh</h4>
                  <p className="text-sm text-gray-500">Bangalore, Karnataka</p>
                </div>
              </div>
            </div>

            {/* Testimonial 5 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "From planning to execution, Enventors made our anniversary celebration unforgettable. Their vendor network is amazing and the quality of service is unmatched. Worth every rupee!"
              </p>
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-primary/20">
                  <Image
                    src="https://picsum.photos/seed/indian-woman-3/200/200"
                    alt="Meera Patel"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-secondary">Meera Patel</h4>
                  <p className="text-sm text-gray-500">Bangalore, Karnataka</p>
                </div>
              </div>
            </div>

            {/* Testimonial 6 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "Enventors is the best event management company in Bangalore! They handled our baby shower with such care and attention. The decorations were beautiful and the food was delicious. Highly recommend!"
              </p>
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-primary/20">
                  <Image
                    src="https://picsum.photos/seed/indian-man-3/200/200"
                    alt="Arjun Nair"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-secondary">Arjun Nair</h4>
                  <p className="text-sm text-gray-500">Bangalore, Karnataka</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
