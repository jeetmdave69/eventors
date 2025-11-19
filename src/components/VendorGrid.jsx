import VendorCard from './VendorCard'

export default function VendorGrid({ vendors }) {
  if (!vendors || vendors.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-neutral-500 text-lg">No vendors found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vendors.map((vendor) => (
        <VendorCard key={vendor.id} vendor={vendor} />
      ))}
    </div>
  )
}

