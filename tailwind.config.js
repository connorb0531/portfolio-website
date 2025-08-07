/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'custom-dark-grey': '#141414',
          'navbar-grey': '#1f1e1e'
        },
        fontFamily: {
          roboto: ['Roboto, sans-serif'],
        },
      },
    },
    plugins: [],
  }
  