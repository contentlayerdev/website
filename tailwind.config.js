module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './content/**/*.{md,mdx}'],
  theme: {
    extend: {
      colors: {
        cl: {
          'gray-100': '#F6F6F6',
          'gray-500': '#808080',
          'gray-900': '#2C2C2C',
          'gray-925': '#202124',
          'gray-950': '#171717',
          'gray-975': '#0F0F0F',
          black: '#000000',
          blue: '#00D1FF',
          white: '#ffffff',
          yellow: '#DDFF56',
        },
        gray: {
          850: '#18202F',
          950: '#0b0f1a',
        },
      },
    },
  },
  plugins: [],
}
