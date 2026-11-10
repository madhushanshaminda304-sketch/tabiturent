/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tabi: {
          navy: '#19212c',
          navyDark: '#121720',
          navyLight: '#243040',
          card: '#ffffff',
          bg: '#f4f6f8',
          border: '#e2e8f0',
          positive: '#10b981',
          positiveBg: '#ecfdf5',
          positiveBorder: '#a7f3d0',
          neutral: '#f59e0b',
          neutralBg: '#fffbeb',
          neutralBorder: '#fde68a',
          negative: '#ef4444',
          negativeBg: '#fef2f2',
          negativeBorder: '#fecaca',
          accent: '#3b82f6',
          accentHover: '#2563eb',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 8px -1px rgba(0, 0, 0, 0.06), 0 1px 3px -1px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 10px 25px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
}
