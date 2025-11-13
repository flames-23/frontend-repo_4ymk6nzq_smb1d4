import { useState } from 'react'
import { useCart } from './CartContext'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [orderId, setOrderId] = useState(null)
  const [form, setForm] = useState({
    name: '', phone: '', address_line1: '', address_line2: '', city: '', state: '', pincode: ''
  })

  async function placeOrder() {
    if (!items.length) return
    setLoading(true)
    try {
      const payload = {
        items: items.map(i => ({ product_id: i._id, title: i.title, quantity: i.qty, price: i.price })),
        address: { ...form, country: 'India' },
        payment: { method: 'cod', status: 'pending', transaction_id: '' },
        subtotal,
        total: subtotal,
      }
      const res = await fetch(`${API}/orders`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const data = await res.json()
      setOrderId(data._id || 'success')
      clearCart()
    } catch (e) {
      console.error(e)
      alert('Failed to place order')
    } finally {
      setLoading(false)
    }
  }

  if (orderId) {
    return (
      <div className="min-h-screen grid place-items-center bg-gray-50 p-6">
        <div className="bg-white rounded-lg border p-6 text-center max-w-md">
          <h2 className="text-2xl font-bold mb-2">Order placed!</h2>
          <p className="text-gray-600">Your order id: {orderId}</p>
          <a href="/" className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">Continue shopping</a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg border p-4">
          <h2 className="text-lg font-semibold mb-3">Delivery Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input className="border rounded px-3 py-2" placeholder="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <input className="border rounded px-3 py-2" placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
            <input className="border rounded px-3 py-2 md:col-span-2" placeholder="Address Line 1" value={form.address_line1} onChange={e => setForm({ ...form, address_line1: e.target.value })} />
            <input className="border rounded px-3 py-2 md:col-span-2" placeholder="Address Line 2" value={form.address_line2} onChange={e => setForm({ ...form, address_line2: e.target.value })} />
            <input className="border rounded px-3 py-2" placeholder="City" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
            <input className="border rounded px-3 py-2" placeholder="State" value={form.state} onChange={e => setForm({ ...form, state: e.target.value })} />
            <input className="border rounded px-3 py-2" placeholder="Pincode" value={form.pincode} onChange={e => setForm({ ...form, pincode: e.target.value })} />
          </div>
          <button disabled={loading || !items.length} onClick={placeOrder} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
            {loading ? 'Placing order…' : 'Place Order'}
          </button>
        </div>
        <div>
          <div className="bg-white rounded-lg border p-4">
            <h3 className="font-semibold mb-3">Order Summary</h3>
            <ul className="space-y-2 max-h-64 overflow-auto pr-2">
              {items.map(i => (
                <li key={i._id} className="flex justify-between text-sm">
                  <span className="truncate mr-2">{i.title} × {i.qty}</span>
                  <span>₹{(i.price * i.qty).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="border-t my-3"></div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
