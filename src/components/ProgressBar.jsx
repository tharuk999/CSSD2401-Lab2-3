const STEPS = [
  { label: 'Browse',       path: '/'            },
  { label: 'Cart',         path: '/cart'         },
  { label: 'Checkout',     path: '/checkout'     },
  { label: 'Confirmation', path: '/confirmation' },
]

export default function ProgressBar({ currentPath }) {
  const currentIndex = STEPS.findIndex(s => s.path === currentPath)

  return (
    <nav
      aria-label="Checkout progress"
      className="border-b border-night-600 page-enter"
      style={{ background: 'rgba(13,14,31,0.8)' }}
    >
      <div className="max-w-5xl mx-auto px-5 py-4">
        <ol className="flex items-center">
          {STEPS.map((step, i) => {
            const done   = i < currentIndex
            const active = i === currentIndex
            return (
              <li key={step.path} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div
                    aria-current={active ? 'step' : undefined}
                    className={[
                      'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300',
                      done   ? 'bg-amber-500 border-amber-500 text-night-950 shadow-md shadow-amber-500/30' : '',
                      active ? 'bg-transparent border-amber-400 text-amber-400 animate-ring-pulse' : '',
                      !done && !active ? 'bg-transparent border-night-500 text-night-300' : '',
                    ].join(' ')}
                  >
                    {done ? (
                      <svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : i + 1}
                  </div>
                  <span className={[
                    'text-xs mt-1.5 font-medium tracking-wide',
                    active ? 'text-amber-400' : done ? 'text-amber-600' : 'text-night-300',
                  ].join(' ')}>
                    {step.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="flex-1 mx-2 mb-5 h-px overflow-hidden bg-night-600" aria-hidden="true">
                    {done && (
                      <div
                        className="h-full bg-amber-500 animate-slide-right"
                        style={{ animationDuration: '0.5s', animationDelay: `${i * 0.1}s` }}
                      />
                    )}
                  </div>
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}
