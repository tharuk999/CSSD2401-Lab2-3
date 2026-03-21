import { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import ProgressBar from './components/ProgressBar'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import ConfirmationPage from './pages/ConfirmationPage'

function AppInner() {
  const location = useLocation()
  const [cartItems,      setCartItems]      = useState([])
  const [completedOrder, setCompletedOrder] = useState(null)

  function addToCart(book) {
    setCartItems(prev => {
      const ex = prev.find(i => i.id === book.id)
      if (ex) return prev.map(i => i.id === book.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...book, qty: 1 }]
    })
  }

  function removeFromCart(id) { setCartItems(prev => prev.filter(i => i.id !== id)) }

  function placeOrder(fields) {
    const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0)
    const shipping = subtotal > 25 ? 0 : 4.99
    setCompletedOrder({
      id: 'SE-' + Math.random().toString(36).slice(2,9).toUpperCase(),
      items: cartItems,
      subtotal,
      shipping,
      total: subtotal + shipping,
      email: fields?.email || 'customer@example.com',
      shipping_address: {
        name:     `${fields?.firstName || 'Jane'} ${fields?.lastName || 'Smith'}`,
        address:  fields?.address  || '123 Main St',
        city:     fields?.city     || 'Toronto',
        province: fields?.province || 'ON',
        postal:   fields?.postal   || 'M5V 3A8',
      },
    })
    setCartItems([])
  }

  const cartCount    = cartItems.reduce((s, i) => s + i.qty, 0)
  const showProgress = ['/cart','/checkout','/confirmation'].includes(location.pathname)

  return (
    <div className="grain min-h-screen flex flex-col">
      <Header cartCount={cartCount} />
      {showProgress && <ProgressBar currentPath={location.pathname} />}
      <div className="flex-1">
        <Routes>
          <Route path="/"             element={<ProductPage onAddToCart={addToCart} />} />
          <Route path="/cart"         element={<CartPage cartItems={cartItems} onRemove={removeFromCart} />} />
          <Route path="/checkout"     element={<CheckoutPage cartItems={cartItems} onPlaceOrder={placeOrder} />} />
          <Route path="/confirmation" element={<ConfirmationPage order={completedOrder} />} />
        </Routes>
      </div>
      <footer
        className="border-t border-night-600 text-night-400 text-xs text-center py-6"
        style={{ background: 'rgba(7,8,17,0.9)' }}
        role="contentinfo"
      >
        ShopEase &mdash; CSSD2401 Lab 2 and 3 &mdash; 2026
      </footer>
    </div>
  )
}

export default function App() {
  return <BrowserRouter><AppInner /></BrowserRouter>
}
