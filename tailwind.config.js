/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: '#0f0f0f',
        text: '#f7f7f7',
        primary: '#999999',
        secondary: '#1f1f1f',
        accent: '#858585',
        error: '#9e3641',
        info: '#999999',
        success: '#2b6963',
      },
      brightness: {
        25: '.25',
      },
      fontFamily: {
        mono: 'CourierPrime, courier',
      },
    },
  },
  plugins: [],
};
