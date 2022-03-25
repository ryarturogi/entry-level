module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/img/hero-pattern.png')",
      },
      maxWidth: {
        hero: '76.25rem',
      },
      colors: {
        accent: {
          100: '#6791ff',
          500: '#6872ff',
          800: '#2b3298',
        },
        notice: {
          success: '#00d6c0',
          warn: '#ffc549',
          info: '#6791ff',
          'danger-100': '#ff5c49',
          'danger-200': '#cb3903',
          'danger-300': '#b60000',
        },
      },
    },
    variants: {
      extend: {},
    },
    plugins: [require('@tailwindcss/typography')],
  },
}
