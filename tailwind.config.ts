import type { Config } from 'tailwindcss';
import { iconsPlugin, getIconCollections } from '@egoist/tailwindcss-icons';
import colors from 'tailwindcss/colors';

export default {
  content: [],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: {
          // 50: '#FFF8F6',
          50: '#FFEFEA',
          100: '#FFD7CD',
          200: '#FFC0B0',
          300: '#FFAD8E', // base peachy
          400: '#FF9772',
          500: '#F77D5B',
          600: '#DA654A',
          700: '#B34F3C',
          800: '#8C3B2F',
        },
        secondary: colors.purple,
        surface: colors.zinc,
      },
    },
  },
  plugins: [
    iconsPlugin({
      collections: getIconCollections(['mdi']),
    }),
  ],
} satisfies Config;
