/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.ejs',
    './public/**/*.html',
    './public/JS/**/*.js',
    './node_modules/daisyui/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'), // Add DaisyUI here
  ],
};
