import { Search, ShoppingCart, User, Menu } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from './CartContext'

export default function Navbar({ onSearch }) {
  const { itemCount } = useCart()
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center gap-4">
          <button className="p-2 rounded-md hover:bg-gray-100 md:hidden">
            <Menu size={20} />
          </button>
          <Link to="/" className="font-extrabold text-xl text-blue-600">Flipkart+</Link>

          <div className="hidden md:block flex-1">
            <div className="relative max-w-2xl">
              <input
                type="text"
                placeholder="Search for products, brands and more"
                onChange={(e) => onSearch?.(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>

          <nav className="ml-auto flex items-center gap-2">
            <Link to="/" className="px-3 py-1.5 rounded-md text-sm font-medium hover:bg-blue-50 text-blue-700">Login</Link>
            <button className="px-3 py-1.5 rounded-md text-sm font-medium hover:bg-gray-100">Become a Seller</button>
            <button className="px-3 py-1.5 rounded-md text-sm font-medium hover:bg-gray-100">More</button>
            <Link to="/cart" className="flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-gray-100">
              <ShoppingCart size={18} /> Cart {itemCount > 0 && (<span className="ml-1 inline-flex items-center justify-center px-2 py-0.5 text-xs bg-blue-600 text-white rounded-full">{itemCount}</span>)}
            </Link>
          </nav>
        </div>
        <div className="md:hidden pb-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for products, brands and more"
              onChange={(e) => onSearch?.(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>
      </div>
    </header>
  )
}
