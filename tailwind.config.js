/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"Outfit"', 'system-ui', 'sans-serif'],
      },
      colors: {
        night: {
          950: '#070811',
          900: '#0d0e1f',
          800: '#131428',
          700: '#1a1c34',
          600: '#22253f',
          500: '#2e3258',
          400: '#454a80',
          300: '#6b72b0',
          200: '#a0a5cc',
          100: '#d0d3e8',
          50:  '#ecedF5',
        },
        amber: {
          900: '#451a00',
          800: '#6b2e00',
          700: '#924a0a',
          600: '#b86818',
          500: '#f0a000',
          400: '#f5b835',
          300: '#f8cc6a',
          200: '#fbe09e',
          100: '#fdf0d0',
          50:  '#fffaee',
        },
        coral: {
          500: '#e8634a',
          400: '#ee8070',
          300: '#f4a090',
        },
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideRight: {
          '0%':   { transform: 'scaleX(0)', transformOrigin: 'left' },
          '100%': { transform: 'scaleX(1)', transformOrigin: 'left' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        badgePop: {
          '0%':   { transform: 'scale(0.5)', opacity: '0' },
          '60%':  { transform: 'scale(1.25)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        ringPulse: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(240,160,0,0)' },
          '50%':      { boxShadow: '0 0 0 8px rgba(240,160,0,0.2)' },
        },
        floatBook: {
          '0%, 100%': { transform: 'translateY(0px) rotate(-2deg)' },
          '50%':      { transform: 'translateY(-10px) rotate(-2deg)' },
        },
      },
      animation: {
        'fade-up':     'fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) both',
        'fade-in':     'fadeIn 0.4s ease both',
        'slide-right': 'slideRight 0.6s cubic-bezier(0.22,1,0.36,1) both',
        'badge-pop':   'badgePop 0.35s cubic-bezier(0.34,1.56,0.64,1) both',
        'ring-pulse':  'ringPulse 2s ease-in-out infinite',
        'float-book':  'floatBook 4s ease-in-out infinite',
        'shimmer':     'shimmer 2.4s linear infinite',
      },
    },
  },
  plugins: [],
}
