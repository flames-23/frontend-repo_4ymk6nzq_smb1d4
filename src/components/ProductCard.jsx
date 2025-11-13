import { Star } from 'lucide-react'

export default function ProductCard({ product }) {
  const discount = product.mrp ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : null
  return (
    <div className="group rounded-lg border border-gray-200 hover:border-blue-300 bg-white overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="aspect-[4/3] bg-gray-50">
        <img src={`${product.images?.[0] || 'https://images.unsplash.com/photo-1512446733611-9099a758e5b1'}?w=600&q=80`} alt={product.title} className="w-full h-full object-cover" />
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium line-clamp-2 min-h-[2.5rem]">{product.title}</h3>
        <div className="mt-1 flex items-center gap-1 text-[11px]">
          <span className="inline-flex items-center gap-1 bg-green-600 text-white px-1.5 py-0.5 rounded">
            <Star size={12} className="fill-white" /> {product.rating?.toFixed(1) || '4.2'}
          </span>
          <span className="text-gray-500">({product.rating_count || '1,234'})</span>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-bold">₹{product.price}</span>
          {product.mrp && <span className="text-gray-400 line-through text-sm">₹{product.mrp}</span>}
          {discount !== null && <span className="text-green-600 text-sm font-medium">{discount}% off</span>}
        </div>
        <button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-1.5 rounded-md">Add to cart</button>
      </div>
    </div>
  )
}
