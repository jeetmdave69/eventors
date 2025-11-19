import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="pt-20 py-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-6xl font-bold text-slate-700 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-slate-700 mb-4">Page Not Found</h2>
        <p className="text-slate-500 text-lg mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-4 bg-brand-500 text-white font-semibold rounded-lg hover:bg-brand-600 transition-colors shadow-md hover:shadow-xl"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  )
}

