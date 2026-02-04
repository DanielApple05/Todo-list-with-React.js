/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",         // your main HTML
    "./src/**/*.{js,jsx}"   // all your React components
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar'), // this enables scrollbar classes
  ],
};
