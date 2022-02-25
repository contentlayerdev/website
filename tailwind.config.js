module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './content/**/*.{md,mdx}'],
  theme: {
    colors: {
      black: '#000024',
      blue: '#00D1FF',
      white: '#ffffff',
      lime: '#DDFF56',
    },
    extend: {
      colors: {
        gray: {
          // defaults
          50: '#f9fafb',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          // overrides
          100: '#F6F6F6',
          500: '#808080',
          900: '#2C2C2C',
          925: '#202124',
          950: '#171717',
          975: '#0F0F0F',
        },
      },
      fontFamily: {
        sans: [
          'fkdisplay-regular',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
      },
    },
  },
  plugins: [],
}
