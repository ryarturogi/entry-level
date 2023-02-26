/* eslint-disable quotes */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/img/hero-pattern.png')",
      },
      fontFamily: {
        sans: ['Lexend', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#CCE2E4',
          100: '#C9E8E7',
          200: '#97D7D6',
          300: '#54CFCF',
          400: '#35C4C7',
          500: '#1CBAC1',
          600: '#1BAAAF',
          700: '#1B9597',
          800: '#198180',
          900: '#165D58',
          1000: '#093232',
        },
        secondary: {
          100: '#FDD2D6',
          200: '#ECA3A2',
          300: '#E2817F',
          400: '#EC675F',
          500: '#F25D49',
          600: '#E35447',
          700: '#D04A40',
          800: '#C3453A',
          900: '#B23D30',
        },
        gray: {
          100: '#F5F5F5',
          200: '#F7F7F7',
          300: '#DCEAEA',
          400: '#CED4DA',
          500: '#ADB5BD',
          600: '#6C757D',
          700: '#495057',
          800: '#343A40',
          900: '#212529',
        },
        error: {
          100: '#ff5c49',
          200: '#cb3903',
          300: '#b60000',
        },
        info: '#6791ff',
        success: '#00d6c0',
        warning: '#ffc549',
      },
      maxWidth: {
        '8xl': '76.25rem',
      },
      screens: {
        xs: '480px',
        '2xl': '1536px',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
        '7xl': '3.5rem',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};
