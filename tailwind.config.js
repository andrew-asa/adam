/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [require('tailwindcss'), require('autoprefixer')],
  corePlugins: {
    // 禁止tailwindcss的默认属性
    preflight: false
  }
}
