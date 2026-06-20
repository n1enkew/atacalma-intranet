/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'medical-green': '#10b981',
        'medical-dark-green': '#059669',
        'medical-light-green': '#d1fae5',
        'medical-brown': '#92400e',
        'medical-light-brown': '#fcd34d',
      },
    },
  },
  plugins: [],
}
