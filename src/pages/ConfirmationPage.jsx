import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

function MiniCover({ item }) {
  if (item.cover) {
    return (
      <img
        src={item.cover}
        alt={`Cover of ${item.title}`}
        className="w-12 h-16 object-cover flex-shrink-0 rounded-lg shadow-md"
        style={{ boxShadow: '2px 0 0 #f0a000' }}
      />
    )
  }

  return (
    <div
      className="w-12 h-16 flex-shrink-0 rounded-lg overflow-hidden shadow-md"
      style={{ background: 'linear-gradient(135deg, #1a1c34 0%, #0d0e1f 100%)', boxShadow: '2px 0 0 #f0a000' }}
      aria-hidden="true"
    >
      <div className="h-full flex items-center justify-center p-1">
        <p className="font-display text-amber-400 text-xs italic text-center leading-tight">
          {item.title.split(' ').map(w => w[0]).join('').slice(0, 4)}
        </p>
      </div>
    </div>
  )
}

export default function ConfirmationPage({ order }) {
  const navigate   = useNavigate()
  const headingRef = useRef(null)

  useEffect(() => { headingRef.current?.focus() }, [])
  useEffect(() => { if (!order) navigate('/') }, [order, navigate])
  if (!order) return null

  return (
    <main id="main-content" className="relative max-w-2xl mx-auto px-5 py-14" tabIndex={-1}>

      {/* Celebration glow */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-12"
          style={{ background: 'radial-gradient(circle, #f0a000 0%, transparent 60%)', filter: 'blur(80px)' }}
        />
      </div>

      <div className="relative z-10 space-y-6">

        {/* Success card */}
        <div className="card text-center py-14 border-amber-500/20 page-enter">
          <div className="relative w-24 h-24 mx-auto mb-6" aria-hidden="true">
            <div
              className="absolute inset-0 rounded-full border-2 border-amber-500/20 animate-ping"
              style={{ animationDuration: '2s' }}
            />
            <div
              className="relative w-24 h-24 rounded-full flex items-center justify-center shadow-xl"
              style={{
                background: 'linear-gradient(135deg, #f0a000 0%, #b86818 100%)',
                boxShadow: '0 10px 40px rgba(240,160,0,0.35)',
              }}
            >
              <svg className="w-12 h-12 text-night-950" viewBox="0 0 48 48" fill="none">
                <path
                  d="M12 25 L21 34 L36 16"
                  stroke="currentColor" strokeWidth="4"
                  strokeLinecap="round" strokeLinejoin="round"
                  strokeDasharray="100" strokeDashoffset="100"
                  style={{ animation: 'checkDraw 0.6s cubic-bezier(0.22,1,0.36,1) 0.3s forwards' }}
                />
              </svg>
            </div>
          </div>

          <h1
            ref={headingRef}
            tabIndex={-1}
            className="font-display text-5xl text-white font-light mb-3 focus:outline-none"
          >
            Order Confirmed
          </h1>
          <p className="text-night-200 mb-1">Thank you for your purchase.</p>
          <p className="text-night-300 text-sm">
            Order <span className="text-amber-400 font-semibold">#{order.id}</span> &mdash; confirmation sent to{' '}
            <span className="text-white font-medium">{order.email}</span>
          </p>
        </div>

        {/* Order details */}
        <section className="card space-y-4 page-enter stagger-1" aria-label="Order details">
          <h2 className="font-display text-2xl text-white font-light">Order Details</h2>
          {order.items.map(item => (
            <div key={item.id} className="flex gap-4 items-center">
              <MiniCover item={item} />
              <div className="flex-1">
                <p className="font-semibold text-white text-sm">{item.title}</p>
                <p className="text-night-300 text-xs mt-0.5">{item.author}</p>
              </div>
              <p className="font-display text-xl text-amber-400 font-light">
                ${(item.price * item.qty).toFixed(2)}
              </p>
            </div>
          ))}
          <div className="border-t border-night-600 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-night-200">
              <span>Subtotal</span>
              <span className="text-white">${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-night-200">
              <span>Shipping</span>
              {order.shipping === 0
                ? <span className="text-emerald-400 font-semibold">Free</span>
                : <span className="text-white">${order.shipping.toFixed(2)}</span>}
            </div>
            <div className="flex justify-between items-baseline pt-2 border-t border-night-600/60">
              <span className="text-night-300">Total charged</span>
              <span className="font-display text-3xl text-amber-400 font-light">
                ${order.total.toFixed(2)}
              </span>
            </div>
          </div>
        </section>

        {/* Shipping */}
        <section className="card page-enter stagger-2" aria-label="Shipping information">
          <h2 className="font-display text-2xl text-white font-light mb-4">Shipping To</h2>
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-amber-400/70 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div className="text-sm">
              <p className="font-semibold text-white">{order.shipping_address.name}</p>
              <p className="text-night-200 mt-0.5">{order.shipping_address.address}</p>
              <p className="text-night-200">
                {order.shipping_address.city}, {order.shipping_address.province} {order.shipping_address.postal}
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3 text-sm bg-night-700/50 rounded-xl px-4 py-3 border border-night-600/40">
            <svg className="w-5 h-5 text-amber-400/70 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-night-200">
              Estimated delivery: <strong className="text-white">2-4 business days</strong>
            </span>
          </div>
        </section>

        <div className="text-center page-enter stagger-3">
          <button onClick={() => navigate('/')} className="btn-primary px-10">
            Continue Shopping
          </button>
        </div>
      </div>

      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        Your order has been confirmed. Order number {order.id}. Confirmation sent to {order.email}.
      </div>

      <style>{`
        @keyframes checkDraw {
          from { stroke-dashoffset: 100; }
          to   { stroke-dashoffset: 0; }
        }
      `}</style>
    </main>
  )
}