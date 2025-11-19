export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center space-y-3">
          <p className="text-gray-500 text-sm">
            Enventors — All rights reserved
          </p>
          <p className="text-gray-500 text-sm">
            Created by <span className="font-semibold text-secondary">Ruby Saha</span>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm">
            <a 
              href="mailto:rubysaha2902@gmail.com" 
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              rubysaha2902@gmail.com
            </a>
            <span className="hidden sm:inline text-gray-400">•</span>
            <p className="text-gray-500">
              Contact for website development & design
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
