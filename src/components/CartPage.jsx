import { useCart } from './CartContext'
import { Link } from 'react-router-dom'

export default function CartPage() {
  const { items, updateQty, removeFromCart, subtotal } = useCart()

  if (!items.length) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 text-center">
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">Add some products to see them here.</p>
          <Link to="/" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">Continue shopping</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div key={item._id} className="bg-white rounded-lg border p-4 flex gap-4">
              <img src={`${item.images?.[0]}?w=200&q=70`} alt={item.title} className="w-28 h-28 object-cover rounded" />
              <div className="flex-1">
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.brand}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-lg font-semibold">₹{item.price}</span>
                  {item.mrp && <span className="text-sm text-gray-400 line-through">₹{item.mrp}</span>}
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <button onClick={() => updateQty(item._id, item.qty - 1)} className="px-2 py-1 rounded border">-</button>
                  <span className="w-10 text-center">{item.qty}</span>
                  <button onClick={() => updateQty(item._id, item.qty + 1)} className="px-2 py-1 rounded border">+</button>
                  <button onClick={() => removeFromCart(item._id)} className="ml-4 text-sm text-red-600 hover:underline">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="bg-white rounded-lg border p-4">
            <h3 className="font-semibold mb-3">Price details</h3>
            <div className="flex justify-between text-sm mb-2">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>Delivery</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="border-t my-3"></div>
            <div className="flex justify-between font-semibold">
              <span>Total Amount</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <Link to="/checkout" className="mt-4 w-full inline-block text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">Checkout</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
