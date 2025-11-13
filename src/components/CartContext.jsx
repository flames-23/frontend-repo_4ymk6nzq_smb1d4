import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem('fk_cart')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('fk_cart', JSON.stringify(items))
    } catch {}
  }, [items])

  function addToCart(product, qty = 1) {
    setItems(prev => {
      const idx = prev.findIndex(i => i._id === product._id)
      if (idx !== -1) {
        const next = [...prev]
        next[idx] = { ...next[idx], qty: next[idx].qty + qty }
        return next
      }
      return [...prev, { ...product, qty }]
    })
  }

  function removeFromCart(id) {
    setItems(prev => prev.filter(i => i._id !== id))
  }

  function updateQty(id, qty) {
    setItems(prev => prev.map(i => i._id === id ? { ...i, qty: Math.max(1, qty) } : i))
  }

  function clearCart() {
    setItems([])
  }

  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items])
  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.price * i.qty, 0), [items])

  const value = { items, addToCart, removeFromCart, updateQty, clearCart, itemCount, subtotal }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
