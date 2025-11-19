import { Link } from 'react-router-dom'
import CategoryCard from '../components/CategoryCard'
import VendorGrid from '../components/VendorGrid'
import vendorsData from '../data/vendors.json'

const categories = [
  { name: 'Wedding Venues', description: 'Beautiful venues for your special day' },
  { name: 'Catering', description: 'Delicious cuisine for every occasion' },
  { name: 'Photography', description: 'Capture your precious moments' },
  { name: 'Decoration', description: 'Transform spaces into magic' },
  { name: 'Entertainment', description: 'Keep the party going all night' },
  { name: 'Makeup Artists', description: 'Look stunning on your big day' },
]

export default function Home() {
  const featuredVendors = vendorsData.slice(0, 6)

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-light to-primary/5">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
            Find the Right Event Vendors
          </h1>
          <p className="text-xl md:text-2xl text-neutral-600 mb-10 max-w-3xl mx-auto text-balance">
            Discover premium services for weddings, corporate events, and special occasions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/vendors"
              className="px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Browse Vendors
            </Link>
            <Link
              to="/categories"
              className="px-8 py-4 bg-white text-accent font-semibold rounded-xl border-2 border-neutral-300 hover:border-primary transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Explore Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Category Grid Section */}
      <section className="py-20 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold mb-4">
              Browse by Category
            </h2>
            <p className="text-lg text-neutral-600">
              Find exactly what you need for your event
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category.name}
                category={category.name}
                description={category.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vendors Section */}
      <section className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold mb-4">
              Featured Vendors
            </h2>
            <p className="text-lg text-neutral-600">
              Handpicked premium services for your special day
            </p>
          </div>
          <VendorGrid vendors={featuredVendors} />
          <div className="text-center mt-12">
            <Link
              to="/vendors"
              className="inline-block px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              View All Vendors
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

