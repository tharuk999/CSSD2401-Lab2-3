import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Header({ cartCount = 0 }) {
  const location  = useLocation()
  const isConfirm = location.pathname === '/confirmation'
  const [prevCount, setPrevCount] = useState(cartCount)
  const [bump, setBump]           = useState(false)

  useEffect(() => {
    if (cartCount > prevCount) { setBump(true); setTimeout(() => setBump(false), 400) }
    setPrevCount(cartCount)
  }, [cartCount])

  return (
    <header
      className="sticky top-0 z-40 border-b border-night-600"
      style={{ background: 'rgba(13,14,31,0.92)', backdropFilter: 'blur(16px)' }}
      role="banner"
    >
      <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="font-display text-2xl font-light tracking-wider text-amber-400 hover:text-amber-300 transition-colors duration-200 rounded"
          aria-label="ShopEase home"
        >
          Shop<span className="font-semibold italic">Ease</span>
        </Link>

        {!isConfirm && (
          <Link
            to="/cart"
            className="relative flex items-center gap-2 text-night-200 hover:text-amber-400 transition-colors duration-200 rounded px-2 py-1 group"
            aria-label={`Cart, ${cartCount} item${cartCount !== 1 ? 's' : ''}`}
          >
            <svg
              aria-hidden="true"
              className="h-6 w-6 group-hover:scale-110 transition-transform duration-200"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartCount > 0 && (
              <span
                key={cartCount}
                aria-hidden="true"
                className={[
                  'absolute -top-1.5 -right-1.5 bg-amber-500 text-night-950 text-xs font-black w-5 h-5 rounded-full flex items-center justify-center',
                  bump ? 'animate-badge-pop' : '',
                ].join(' ')}
              >
                {cartCount}
              </span>
            )}
            <span className="text-sm font-medium hidden sm:inline">Cart</span>
          </Link>
        )}
      </div>
    </header>
  )
}
