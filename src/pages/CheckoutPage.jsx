import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Field({ id, label, type='text', value, onChange, error, required, placeholder, autoComplete, hint, inputMode }) {
  const errorId   = `${id}-error`
  const hintId    = `${id}-hint`
  const described = [error ? errorId : '', hint ? hintId : ''].filter(Boolean).join(' ') || undefined

  return (
    <div className="space-y-1">
      <label htmlFor={id} className="label">
        {label}
        {required && <span aria-hidden="true" className="text-amber-500 ml-1">*</span>}
      </label>
      {hint && <p id={hintId} className="text-xs text-night-300 mb-1">{hint}</p>}
      <input
        id={id} name={id} type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        className={['input-field', error ? 'input-error' : ''].join(' ')}
        required={required}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={described}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
      />
      {error && (
        <p id={errorId} className="error-msg" role="alert" aria-live="assertive">
          <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  )
}

function validate(f) {
  const e = {}
  if (!f.firstName.trim()) e.firstName = 'First name is required.'
  if (!f.lastName.trim())  e.lastName  = 'Last name is required.'
  if (!f.email.trim())     e.email     = 'Email address is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))
    e.email = 'Enter a valid email (e.g. name@example.com).'
  if (!f.address.trim())   e.address   = 'Street address is required.'
  if (!f.city.trim())      e.city      = 'City is required.'
  if (!f.province.trim())  e.province  = 'Province is required.'
  if (!f.postal.trim())    e.postal    = 'Postal code is required.'
  else if (!/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(f.postal))
    e.postal = 'Enter a valid Canadian postal code (e.g. M5V 3A8).'
  if (!f.cardNumber.trim()) e.cardNumber = 'Card number is required.'
  else if (f.cardNumber.replace(/\s/g,'').length !== 16)
    e.cardNumber = 'Enter a valid 16-digit card number.'
  if (!f.expiry.trim())    e.expiry    = 'Expiry date is required.'
  else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(f.expiry))
    e.expiry = 'Use MM/YY format (e.g. 08/27).'
  if (!f.cvv.trim())       e.cvv       = 'CVV is required.'
  else if (!/^\d{3,4}$/.test(f.cvv))
    e.cvv = 'CVV must be 3 or 4 digits.'
  if (!f.nameOnCard.trim()) e.nameOnCard = 'Name on card is required.'
  return e
}

export default function CheckoutPage({ cartItems, onPlaceOrder }) {
  const navigate    = useNavigate()
  const summaryRef  = useRef(null)
  const [submitted, setSubmitted] = useState(false)
  const [fields, setFields] = useState({
    firstName:'', lastName:'', email:'',
    address:'', city:'', province:'', postal:'',
    cardNumber:'', expiry:'', cvv:'', nameOnCard:'',
  })
  const [errors, setErrors] = useState({})

  const set = k => v => setFields(p => ({ ...p, [k]: v }))
  const total    = cartItems.reduce((s,i) => s + i.price * i.qty, 0)
  const shipping = total > 25 ? 0 : 4.99

  useEffect(() => {
    if (submitted && Object.keys(errors).length && summaryRef.current)
      summaryRef.current.focus()
  }, [errors, submitted])

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
    const errs = validate(fields)
    setErrors(errs)
    if (!Object.keys(errs).length) { onPlaceOrder(fields); navigate('/confirmation') }
  }

  const fmt4   = v => v.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim()
  const fmtExp = v => { const d = v.replace(/\D/g,'').slice(0,4); return d.length>=3 ? d.slice(0,2)+'/'+d.slice(2) : d }
  const errorList = Object.entries(errors)

  return (
    <main id="main-content" className="relative max-w-5xl mx-auto px-5 py-12" tabIndex={-1}>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0">
        <div className="absolute top-1/2 left-1/3 w-96 h-96 rounded-full opacity-6"
          style={{ background: 'radial-gradient(circle, #f0a000 0%, transparent 70%)', filter: 'blur(100px)' }} />
      </div>

      <div className="relative z-10">
        <h1 className="font-display text-4xl text-white font-light mb-8 page-enter">Checkout</h1>

        {/* Error summary */}
        {submitted && errorList.length > 0 && (
          <div ref={summaryRef} tabIndex={-1}
            role="alert" aria-labelledby="err-title"
            className="card border-red-500/50 bg-red-950/30 mb-6 focus:outline-none page-enter"
          >
            <h2 id="err-title" className="text-red-300 font-semibold mb-2 flex items-center gap-2 text-sm">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errorList.length} error{errorList.length > 1 ? 's' : ''} need attention:
            </h2>
            <ul className="space-y-1">
              {errorList.map(([field, msg]) => (
                <li key={field} className="text-sm text-red-300">
                  <a href={`#${field}`} className="underline hover:text-red-200">{msg}</a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-5">

              {/* Contact */}
              <fieldset className="card space-y-4 page-enter stagger-1">
                <legend className="font-display text-2xl text-white font-light mb-1">Contact</legend>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field id="firstName" label="First Name" value={fields.firstName} onChange={set('firstName')} error={errors.firstName} required placeholder="Jane" autoComplete="given-name" />
                  <Field id="lastName"  label="Last Name"  value={fields.lastName}  onChange={set('lastName')}  error={errors.lastName}  required placeholder="Smith" autoComplete="family-name" />
                </div>
                <Field id="email" label="Email Address" type="email" value={fields.email} onChange={set('email')} error={errors.email} required placeholder="jane@example.com" autoComplete="email" hint="Order confirmation will be sent here." />
              </fieldset>

              {/* Shipping */}
              <fieldset className="card space-y-4 page-enter stagger-2">
                <legend className="font-display text-2xl text-white font-light mb-1">Shipping</legend>
                <Field id="address"  label="Street Address" value={fields.address}  onChange={set('address')}  error={errors.address}  required placeholder="123 Main St"  autoComplete="street-address" />
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field id="city"     label="City"     value={fields.city}     onChange={set('city')}     error={errors.city}     required placeholder="Toronto" autoComplete="address-level2" />
                  <Field id="province" label="Province" value={fields.province} onChange={set('province')} error={errors.province} required placeholder="ON"      autoComplete="address-level1" />
                </div>
                <Field id="postal" label="Postal Code" value={fields.postal} onChange={set('postal')} error={errors.postal} required placeholder="M5V 3A8" autoComplete="postal-code" hint="Canadian postal code (e.g. M5V 3A8)" inputMode="text" />
              </fieldset>

              {/* Payment */}
              <fieldset className="card space-y-4 page-enter stagger-3">
                <legend className="font-display text-2xl text-white font-light mb-1">Payment</legend>
                <p className="text-xs text-night-300 border border-night-500 bg-night-700/50 rounded-lg px-3 py-2 flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-amber-400/80" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Demo only -- do not enter real payment details
                </p>
                <Field id="cardNumber" label="Card Number"
                  value={fields.cardNumber} onChange={v => set('cardNumber')(fmt4(v))}
                  error={errors.cardNumber} required
                  placeholder="1234 5678 9012 3456" autoComplete="cc-number" inputMode="numeric"
                  hint="16-digit number on front of card." />
                <Field id="nameOnCard" label="Name on Card" value={fields.nameOnCard} onChange={set('nameOnCard')} error={errors.nameOnCard} required placeholder="Jane Smith" autoComplete="cc-name" />
                <div className="grid grid-cols-2 gap-4">
                  <Field id="expiry" label="Expiry"
                    value={fields.expiry} onChange={v => set('expiry')(fmtExp(v))}
                    error={errors.expiry} required placeholder="MM/YY" autoComplete="cc-exp" inputMode="numeric" />
                  <Field id="cvv" label="CVV"
                    value={fields.cvv} onChange={set('cvv')}
                    error={errors.cvv} required placeholder="123"
                    autoComplete="cc-csc" inputMode="numeric"
                    hint="3 digits on card back." />
                </div>
              </fieldset>
            </div>

            {/* Sidebar */}
            <aside className="card h-fit space-y-5 page-enter stagger-2" aria-label="Order summary">
              <h2 className="font-display text-2xl text-white font-light">Summary</h2>
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="truncate pr-2 text-night-200">{item.title}</span>
                  <span className="font-semibold text-white whitespace-nowrap">
                    ${(item.price * item.qty).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="border-t border-night-600 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-night-200">
                  <span>Subtotal</span><span className="text-white">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-night-200">
                  <span>Shipping</span>
                  {shipping === 0
                    ? <span className="text-emerald-400 font-semibold">Free</span>
                    : <span className="text-white">${shipping.toFixed(2)}</span>}
                </div>
                <div className="flex justify-between items-baseline pt-1 border-t border-night-600/60">
                  <span className="text-night-300 text-sm">Total</span>
                  <span className="font-display text-3xl text-amber-400 font-light">
                    ${(total + shipping).toFixed(2)}
                  </span>
                </div>
              </div>
              <button type="submit" className="btn-primary w-full h-12 text-base">
                Place Order
              </button>
              <p className="text-xs text-center text-night-400">
                By ordering you agree to our Terms of Service.
              </p>
            </aside>
          </div>
        </form>
      </div>
    </main>
  )
}
