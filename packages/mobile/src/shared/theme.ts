export const theme = {
  colors: {
    white: '#fff',

    red: {
      light: '#F4E6E7',
      mid: '#F3BABD',
      dark: '#BF3B44',
    },

    green: {
      light: '#E5F0DB',
      mid: '#CBE4B4',
      dark: '#639339',
    },

    gray: {
      '100': '#1B1D1E',
      '200': '#333638',
      '300': '#5C6265',
      '400': '#B9BBBC',
      '500': '#DDDEDF',
      '600': '#EFF0F0',
      '700': '#FAFAFA',
    },
  },

  fonts: {
    regular: 'NunitoSans_400Regular',
    bold: 'NunitoSans_700Bold',
  },

  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
  },
} as const;

export type Theme = typeof theme;
