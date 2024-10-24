/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./templates/*html"],
  theme: {
    extend: {
      colors: {
        'green-button': '#007300',
        'velo-kaki': '#EAE2D7',
        'grey-500': '#6b7280',
        'grey-200': '#e5e7eb',
        'calm-green': '#5c6e5c',
        'footer-green': '#252A25',
        'secondary-button': '#527B96',
      },
      borders: {
        'border-1': '1px',
      },
    },
  },
  plugins: [],
}

