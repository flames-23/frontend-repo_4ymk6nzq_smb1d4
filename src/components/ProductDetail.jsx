import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Star } from 'lucide-react'
import { useCart } from './CartContext'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API}/products/${id}`)
        const data = await res.json()
        setProduct(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  if (loading) return <div className="min-h-screen grid place-items-center">Loading…</div>
  if (!product) return <div className="min-h-screen grid place-items-center">Not found</div>

  const discount = product.mrp ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : null

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg border p-4">
          <img src={`${product.images?.[0]}?w=1000&q=80`} alt={product.title} className="w-full h-96 object-cover rounded" />
          <div className="mt-3 grid grid-cols-4 gap-2">
            {product.images?.slice(0,4).map((img, idx) => (
              <img key={idx} src={`${img}?w=200&q=60`} className="w-full h-20 object-cover rounded border" />
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-gray-600 mt-1">Brand: {product.brand}</p>
          <div className="mt-2 flex items-center gap-2 text-sm">
            <span className="inline-flex items-center gap-1 bg-green-600 text-white px-2 py-0.5 rounded">
              <Star size={14} className="fill-white" /> {product.rating?.toFixed(1) || '4.2'}
            </span>
            <span className="text-gray-500">{product.rating_count || '1,234'} ratings</span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold">₹{product.price}</span>
            {product.mrp && <span className="text-gray-400 line-through">₹{product.mrp}</span>}
            {discount !== null && <span className="text-green-600 font-medium">{discount}% off</span>}
          </div>
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Highlights</h3>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              {(product.highlights || product.specs || []).slice(0,6).map((h, i) => (
                <li key={i}>{typeof h === 'string' ? h : `${h.key}: ${h.value}`}</li>
              ))}
            </ul>
          </div>
          <div className="mt-6 flex gap-3">
            <button onClick={() => addToCart(product, 1)} className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-4 py-3 rounded-md">Add to cart</button>
            <button onClick={() => { addToCart(product, 1); location.href = '/checkout' }} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-3 rounded-md">Buy now</button>
          </div>
        </div>
      </div>
    </div>
  )
}
