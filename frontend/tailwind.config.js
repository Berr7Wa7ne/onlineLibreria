/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sf-pro-rounded': ['"SF Pro Rounded"', 'sans-serif'],
        'courgette': ['Courgette', 'cursive'],
        'quicksand': ['Quicksand', 'sanserif'],
        
      },
    },
  },
  plugins: [],
}