/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        atacalma: {
          green: '#10b981',
          'green-light': '#d1fae5',
          'green-dark': '#059669',
          white: '#ffffff',
          brown: '#92400e',
          'brown-light': '#b45309',
          'gray-light': '#f9fafb',
          'gray-dark': '#374151',
        },
      },
    },
  },
  plugins: [],
}
