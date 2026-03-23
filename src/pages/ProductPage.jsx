import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const BOOK = {
  id: 1,
  title: 'The Great Gatsby',
  author: 'F. Scott Fitzgerald',
  price: 18.99,
  rating: 4.4,
  reviews: 1894,
  // Set this to your filename inside /public 
  cover: '/gatsby.jpg',
  description:
    'The Great Gatsby, F. Scott Fitzgerald’s third book, stands as the supreme achievement of his career. First published in 1925, this quintessential novel of the Jazz Age has been acclaimed by generations of readers. The story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan, of lavish parties on Long Island at a time when The New York Times noted “gin was the national drink and sex the national obsession,” it is an exquisitely crafted tale of America in the 1920s.',
  tags: ['Design', 'UX', 'Psychology'],
}

export default function ProductPage({ onAddToCart }) {
  const [added, setAdded] = useState(false)
  const navigate = useNavigate()

  function handleAdd() {
    onAddToCart(BOOK)
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }
  function handleBuyNow() {
    onAddToCart(BOOK)
    navigate('/cart')
  }

  return (
    <main id="main-content" className="max-w-5xl mx-auto px-5 py-14" tabIndex={-1}>

      {/* Ambient glow */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #f0a000 0%, transparent 70%)', filter: 'blur(70px)' }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full opacity-6"
          style={{ background: 'radial-gradient(circle, #454a80 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
      </div>

      <div className="relative z-10 grid md:grid-cols-2 gap-14 items-center">

        {/*  Book cover image  */}
        <div className="page-enter stagger-1 flex justify-center">
          <div className="animate-float-book">
            <img
              src={BOOK.cover}
              alt={`Cover of ${BOOK.title} by ${BOOK.author}`}
              className="w-56 h-80 object-cover rounded-xl select-none"
              style={{
                boxShadow: '0 30px 80px rgba(0,0,0,0.7), 4px 0 0 rgba(240,160,0,0.6)',
              }}
            />
          </div>
        </div>

        {/*  Product info  */}
        <div className="space-y-6">
          <div className="page-enter stagger-1">
            <div className="flex flex-wrap gap-2 mb-4">
              {BOOK.tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs font-semibold tracking-widest uppercase text-amber-400 border border-amber-500/40 bg-amber-500/8 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="font-display text-4xl md:text-5xl text-white font-light leading-tight">
              {BOOK.title}
            </h1>
            <p className="text-night-200 mt-2 font-medium tracking-wide">by {BOOK.author}</p>
          </div>

          {/* Rating */}
          <div
            className="page-enter stagger-2 flex items-center gap-3"
            aria-label={`Rated ${BOOK.rating} out of 5 from ${BOOK.reviews.toLocaleString()} reviews`}
          >
            <div className="flex gap-0.5" aria-hidden="true">
              {[1, 2, 3, 4, 5].map(s => (
                <svg
                  key={s}
                  className={`w-5 h-5 ${s <= Math.round(BOOK.rating) ? 'text-amber-400' : 'text-night-500'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-white font-medium">{BOOK.rating}</span>
            <span className="text-sm text-night-300">({BOOK.reviews.toLocaleString()} reviews)</span>
          </div>

          <p className="page-enter stagger-3 text-night-100 leading-relaxed text-[15px]">
            {BOOK.description}
          </p>

          {/* Price */}
          <div className="page-enter stagger-3 flex items-baseline gap-4">
            <span className="font-display text-5xl text-amber-400 font-light">
              ${BOOK.price.toFixed(2)}
            </span>
            <span className="text-night-400 line-through text-lg">$24.99</span>
            <span className="text-xs font-bold text-emerald-300 bg-emerald-900/40 border border-emerald-500/30 px-2.5 py-1 rounded-full">
              24% off
            </span>
          </div>

          {/* Stock */}
          <p className="page-enter stagger-3 text-sm text-emerald-400 flex items-center gap-2 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" aria-hidden="true" />
            In stock -- ships within 2 business days
          </p>

          {/* CTAs */}
          <div className="page-enter stagger-4 flex flex-col sm:flex-row gap-3 pt-1">
            <button
              onClick={handleAdd}
              className="btn-secondary flex-1 flex items-center justify-center gap-2 h-12"
              aria-label={`Add ${BOOK.title} to cart`}
            >
              {added ? (
                <>
                  <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Added to cart
                </>
              ) : 'Add to Cart'}
            </button>
            <button
              onClick={handleBuyNow}
              className="btn-primary flex-1 h-12"
              aria-label={`Buy ${BOOK.title} now`}
            >
              Buy Now
            </button>
          </div>

          {/* Screen reader live region */}
          <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
            {added ? `${BOOK.title} has been added to your cart.` : ''}
          </div>
        </div>
      </div>

      {/* Decorative divider */}
      <div className="page-enter stagger-5 mt-20 flex items-center gap-4" aria-hidden="true">
        <div className="flex-1 h-px bg-night-600" />
        <div className="w-1.5 h-1.5 rounded-full bg-amber-500/50" />
        <div className="flex-1 h-px bg-night-600" />
      </div>
    </main>
  )
}