import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductCard from './components/ProductCard'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function App() {
  const [banners, setBanners] = useState([])
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [bRes, cRes] = await Promise.all([
          fetch(`${API}/banners`),
          fetch(`${API}/categories`),
        ])
        const banners = await bRes.json()
        const categories = await cRes.json()
        setBanners(banners)
        setCategories(categories)
        await fetchProducts()
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  async function fetchProducts(params = {}) {
    const sp = new URLSearchParams()
    if (query) sp.set('q', query)
    if (params.category) sp.set('category', params.category)
    const res = await fetch(`${API}/products?${sp.toString()}`)
    const data = await res.json()
    setProducts(data)
  }

  const filtered = useMemo(() => products, [products])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onSearch={(v) => { setQuery(v); fetchProducts() }} />
      <Hero banners={banners} />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="hidden md:grid grid-cols-8 gap-6">
          <aside className="col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <h3 className="font-semibold mb-2">Categories</h3>
              <ul className="space-y-1 text-sm">
                {categories.map((c) => (
                  <li key={c._id}>
                    <button onClick={() => fetchProducts({ category: c.slug })} className="w-full text-left px-2 py-1 rounded hover:bg-gray-100">
                      {c.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <section className="col-span-6">
            {loading ? (
              <div className="text-center py-20 text-gray-500">Loading products…</div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filtered.map((p) => (
                  <ProductCard key={p._id} product={p} />
                ))}
              </div>
            )}
          </section>
        </div>

        <div className="md:hidden">
          {loading ? (
            <div className="text-center py-10 text-gray-500">Loading products…</div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {filtered.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="border-t bg-white mt-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-sm text-gray-500 flex items-center justify-between">
          <p>© {new Date().getFullYear()} Flipkart+. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#">Help</a>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
