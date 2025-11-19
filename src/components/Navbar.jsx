import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-200">
              <span className="text-white font-bold text-lg">EA</span>
            </div>
            <span className="text-xl font-bold text-accent hidden sm:block">EventAura Lite</span>
          </Link>

          {/* Center Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors duration-200 ${
                location.pathname === '/'
                  ? 'text-primary'
                  : 'text-neutral-600 hover:text-primary'
              }`}
            >
              Home
            </Link>
            <Link
              to="/vendors"
              className={`text-sm font-medium transition-colors duration-200 ${
                location.pathname === '/vendors'
                  ? 'text-primary'
                  : 'text-neutral-600 hover:text-primary'
              }`}
            >
              Vendors
            </Link>
            <Link
              to="/categories"
              className={`text-sm font-medium transition-colors duration-200 ${
                location.pathname === '/categories'
                  ? 'text-primary'
                  : 'text-neutral-600 hover:text-primary'
              }`}
            >
              Categories
            </Link>
          </div>

          {/* Admin Button */}
          <Link
            to="/admin"
            className="px-4 py-2 bg-accent text-white text-sm font-medium rounded-xl hover:bg-neutral-800 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  )
}

