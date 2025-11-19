export default function SkeletonLoader({ type = 'default' }) {
  if (type === 'admin') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header Skeleton */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-[1920px] mx-auto px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gray-200 rounded-lg animate-pulse"></div>
                <div>
                  <div className="h-5 w-40 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-24 bg-gray-200 rounded-md animate-pulse"></div>
                <div className="h-8 w-20 bg-gray-200 rounded-md animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1920px] mx-auto px-6 lg:px-8 py-8">
          {/* Stats Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse mb-4"></div>
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mb-1"></div>
                <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>

          {/* Tabs Skeleton */}
          <div className="bg-white border border-gray-200 rounded-lg mb-6 overflow-hidden">
            <div className="border-b border-gray-200">
              <div className="flex -mb-px">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="px-6 py-3">
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content Cards Skeleton */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="h-5 w-40 bg-gray-200 rounded animate-pulse mb-3"></div>
                      <div className="h-4 w-64 bg-gray-200 rounded animate-pulse mb-2"></div>
                      <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (type === 'card') {
    return (
      <div className="bg-white rounded-xl p-6 shadow-md animate-pulse">
        <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
        <div className="h-5 w-3/4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-1/2 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
      </div>
    )
  }

  // Default skeleton
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
  )
}

