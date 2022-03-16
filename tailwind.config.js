module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './content/**/*.{md,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        handwritten: 'Virgil',
      },
      colors: {
        gray: {
          850: '#18202F',
          950: '#0b0f1a',
        },
      },
    },
  },
  plugins: [require('tailwindcss-radix')()],
}
