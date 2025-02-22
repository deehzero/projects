/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'theme-working': '#f0f9ff',
        'theme-break': '#f0fdf4',
        'theme-finished': '#fdf2f8',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}