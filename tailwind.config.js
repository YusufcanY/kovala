// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin')

module.exports = {
  darkMode: 'class',
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
    './plugins/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-accent': '#00DC82',
        'secondary-accent': '#002E3B',
        'page-foreground': '#F7F8FA',
        'dark-page-body': '#191919',
        'dark-foreground': '#201f1f',
      },
      gridTemplateColumns: {
        16: 'repeat(16, minmax(0, 1fr))',
      },
      gridColumn: {
        'span-13': 'span 13 / span 13',
        'span-14': 'span 14 / span 14',
      },
      boxShadow: {
        'primary-blurred': '0px 0px 9px rgba(0, 220, 130, 0.75)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.hide-scrollbar': {
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          '-ms-overflow-style:': 'none',
          'scrollbar-width:': 'none',
        },
      })
    }),
  ],
}
