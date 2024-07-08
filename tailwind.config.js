/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        'custom': '4px 4px black',
        'bold': '0px 0px 0px 5px black'
      },
      colors: {
        'neu-sky-mist': '#DAF5F0',
        'neu-mint-leaf': '#B5D2AD',
        'neu-sunshine': '#FDFD96',
        'neu-peach-fuzz': '#F8D6B3',
        'neu-lavender-blush': '#FCDFFF',
        'neu-ice-blue': '#E3DFF2',
        'neu-seafoam': '#A7DBD8',
        'neu-spring-green': '#BAFCA2',
        'neu-goldenrod': '#FFDB58',
        'neu-coral-blush': '#FFA07A',
        'neu-pink-sherbet': '#FFC0CB',
        'neu-lilac': '#C4A1FF',
        'neu-cool-blue': '#87CEEB',
        'neu-fresh-mint': '#90EE90',
        'neu-marigold': '#F4D738',
        'neu-sunset-orange': '#FF7A5C',
        'neu-bubblegum': '#FFB2EF',
        'neu-periwinkle': '#A388EE',
        'neu-cerulean': '#69D2E7',
        'neu-moss-green': '#7FBC8C',
        'neu-honey': '#E3A018',
        'neu-rosewood': '#FF6B6B',
        'neu-candy-floss': '#FF69B4',
        'neu-plum': '#9723C9'
      },

    },
  },
  plugins: [
    require("@designbycode/tailwindcss-text-stroke")
  ],
}

