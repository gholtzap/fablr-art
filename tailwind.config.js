/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      textColor: {
        'fablr-purple': '#8a5cb5',
        'fablr-purple-dark': '#6b24ad',
        'fablr-white': '#f5f5f5' 
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow:{
        'darker-xl': '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      },
      fontFamily: {
        'sans': ['Roboto', 'ui-sans-serif', 'system-ui'],
        'blackbox':['BlackBox','sans-serif'],
        'santello':['Santello','sans-serif'],
      },
    },
  },
  variants:{},
  plugins: [],
}
