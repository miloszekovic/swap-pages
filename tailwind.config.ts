import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        base: {
          light: '#F5F8FF',
          dark: '#02050A',
        },
        dark: '#0C0F14',
        gray: '#ACADB1',
        yellow: '#FFEF46',
      },
      fontFamily: {
        sans: ['FK Grotesk Trial', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        base: ['1rem', '1.5rem'], // 16px 24px
        lg: ['1.125rem', '1.5rem'], // 18px 24px
        xl: ['1.75rem', '1.5'], // 28px 1.5
        xxl: ['2.75rem', '1.5'], // 44px 1.5
      },
    },
  },
  plugins: [],
}

export default config
