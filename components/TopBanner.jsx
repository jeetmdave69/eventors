'use client'

export default function TopBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-secondary text-white py-2.5 px-4 text-center">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2.5">
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
        <span className="text-sm font-medium">We believe in good management. Do you?</span>
      </div>
    </div>
  )
}

