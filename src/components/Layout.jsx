import Navbar from './Navbar'
import { CartProvider } from './CartContext'

export default function Layout({ children, onSearch }) {
  return (
    <CartProvider>
      <Navbar onSearch={onSearch} />
      {children}
    </CartProvider>
  )
}
