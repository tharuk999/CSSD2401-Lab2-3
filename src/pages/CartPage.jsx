import { useNavigate } from 'react-router-dom'

// Renders the book cover thumbnail. Falls back to a styled placeholder
// if item.cover is not set.
function MiniCover({ item }) {
  if (item.cover) {
    return (
      <img
        src={item.cover}
        alt={`Cover of ${item.title}`}
        className="w-14 h-20 object-cover flex-shrink-0 rounded-lg shadow-lg"
        style={{ boxShadow: '2px 0 0 #f0a000' }}
      />
    )
  }

  // Fallback: CSS-drawn placeholder
  return (
    <div
      className="w-14 h-20 flex-shrink-0 rounded-lg shadow-lg overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1a1c34 0%, #0d0e1f 100%)', boxShadow: '2px 0 0 #f0a000' }}
      aria-hidden="true"
    >
      <div className="h-full flex flex-col justify-between p-2">
        <p className="font-display text-amber-400 text-xs leading-tight italic">
          {item.title.split(' ').map(w => w[0]).join('').slice(0, 4)}
        </p>
        <div className="w-5 h-px bg-amber-500/60" />
      </div>
    </div>
  )
}

export default function CartPage({ cartItems, onRemove }) {
  const navigate = useNavigate()
  const total    = cartItems.reduce((s, i) => s + i.price * i.qty, 0)
  const shipping = total > 25 ? 0 : 4.99

  return (
    <main id="main-content" className="relative max-w-5xl mx-auto px-5 py-12" tabIndex={-1}>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0">
        <div
          className="absolute top-1/3 right-1/3 w-80 h-80 rounded-full opacity-8"
          style={{ background: 'radial-gradient(circle, #f0a000 0%, transparent 70%)', filter: 'blur(90px)' }}
        />
      </div>

      <div className="relative z-10">
        <h1 className="font-display text-4xl text-white font-light mb-8 page-enter">
          Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="card text-center py-20 page-enter">
            <div className="w-16 h-16 rounded-full bg-night-700 flex items-center justify-center mx-auto mb-5" aria-hidden="true">
              <svg className="w-8 h-8 text-night-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <p className="text-night-200 text-lg mb-6">Your cart is empty.</p>
            <button onClick={() => navigate('/')} className="btn-primary">Browse Books</button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {/* Items */}
            <div className="md:col-span-2 space-y-3">
              {cartItems.map((item, idx) => (
                <div
                  key={item.id}
                  className="card flex gap-4 items-center page-enter"
                  style={{ animationDelay: `${idx * 0.06}s` }}
                >
                  <MiniCover item={item} />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white truncate">{item.title}</p>
                    <p className="text-sm text-night-300 mt-0.5">{item.author}</p>
                    <p className="text-amber-400 font-semibold mt-1.5 font-display text-lg">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-xs text-night-200 bg-night-700 px-2.5 py-1 rounded-full font-medium">
                      Qty: {item.qty}
                    </span>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="text-xs text-night-300 hover:text-red-400 transition-colors duration-150 underline underline-offset-2"
                      aria-label={`Remove ${item.title} from cart`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <button onClick={() => navigate('/')} className="btn-secondary text-sm h-10 px-5 mt-2">
                &larr; Continue Shopping
              </button>
            </div>

            {/* Summary */}
            <aside className="card h-fit space-y-5 page-enter stagger-2" aria-label="Order summary">
              <h2 className="font-display text-2xl text-white font-light">Summary</h2>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-night-200">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-night-200">
                  <span>Shipping</span>
                  {shipping === 0
                    ? <span className="text-emerald-400 font-semibold">Free</span>
                    : <span className="text-white font-medium">${shipping.toFixed(2)}</span>}
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-amber-300 bg-amber-500/10 border border-amber-500/25 rounded-lg p-2.5 leading-relaxed">
                    Add ${(25 - total).toFixed(2)} more for free shipping
                  </p>
                )}
              </div>

              <div className="border-t border-night-600 pt-4 flex justify-between items-baseline">
                <span className="text-night-300 text-sm">Total</span>
                <span className="font-display text-3xl text-amber-400 font-light">
                  ${(total + shipping).toFixed(2)}
                </span>
              </div>

              <button onClick={() => navigate('/checkout')} className="btn-primary w-full h-12 text-base">
                Proceed to Checkout
              </button>

              <p className="text-xs text-center text-night-300 flex items-center justify-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Encrypted secure checkout
              </p>
            </aside>
          </div>
        )}
      </div>
    </main>
  )
}