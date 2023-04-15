/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    colors: {
      'latte': {
        DEFAULT: '#FFFAE8',
        50: '#FFFFFF',
        100: '#FFFEFA',
        200: '#FFFDF5',
        300: '#FFFCF0',
        400: '#FFFAE8',
        500: '#FFE999',
        600: '#FFD747',
        700: '#F5C000',
        800: '#A38000',
        900: '#524000',
        950: '#292000'
      },
      'lavender': {
        DEFAULT: '#D0D8FC',
        50: '#FAFBFF',
        100: '#F5F7FE',
        200: '#E7EBFD',
        300: '#DDE3FD',
        400: '#D0D8FC',
        500: '#879CF7',
        600: '#3F60F3',
        700: '#0E33D8',
        800: '#092290',
        900: '#051148',
        950: '#020926'
      },
      'pistacchio': {
        DEFAULT: '#71997A',
        50: '#EDF2EE',
        100: '#DBE5DE',
        200: '#B8CCBC',
        300: '#94B29B',
        400: '#71997A',
        500: '#5E8366',
        600: '#4B6851',
        700: '#374D3D',
        800: '#243228',
        900: '#131B15',
        950: '#090C09'
      },
      'peach': {
        DEFAULT: '#F0BE8F',
        50: '#FDF7F2',
        100: '#FBEFE4',
        200: '#F8E0C9',
        300: '#F4CDAA',
        400: '#F0BE8F',
        500: '#E99E59',
        600: '#E17C1E',
        700: '#AB5E17',
        800: '#703E0F',
        900: '#3A2008',
        950: '#1B0F04'
      },
      'red': {
        DEFAULT: '#FFDADA',
        50: '#FFFAFA',
        100: '#FFF5F5',
        200: '#FFEBEB',
        300: '#FFE5E5',
        400: '#FFDADA',
        500: '#FF8A8A',
        600: '#FF3D3D',
        700: '#EB0000',
        800: '#9E0000',
        900: '#4D0000',
        950: '#290000'
      },
      'gray': {
        DEFAULT: '#494949',
        50: '#E8E8E8',
        100: '#D1D1D1',
        200: '#A3A3A3',
        300: '#757575',
        400: '#494949',
        500: '#3D3D3D',
        600: '#303030',
        700: '#242424',
        800: '#1A1A1A',
        900: '#0D0D0D',
        950: '#050505'
      },
    },
    fontFamily: {
      sans: ['Livvic', 'sans-serif'],
    }
  },
  plugins: [],
}

