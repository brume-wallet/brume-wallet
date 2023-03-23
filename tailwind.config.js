const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('aria-selected', '[aria-selected=true]&')
      addVariant('aria-unselected', '[aria-selected=false]&')

      addVariant('ahover', ['&:active', '@media(hover: hover){&:hover}'])
    })
  ],
  theme: {
    extend: {
      colors: {
        violet1: "#fdfcfe",
        violet2: "#fbfaff",
        violet3: "#f5f2ff",
        violet4: "#ede9fe",
        violet5: "#e4defc",
        violet6: "#d7cff9",
        violet7: "#c4b8f3",
        violet8: "#aa99ec",
        violet9: "#6e56cf",
        violet10: "#644fc1",
        violet11: "#5746af",
        violet12: "#20134b",
        violet13: "#110a29",

        mauve1: "#fdfcfd",
        mauve2: "#f9f8f9",
        mauve3: "#f4f2f4",
        mauve4: "#eeedef",
        mauve5: "#e9e8ea",
        mauve6: "#e4e2e4",
        mauve7: "#dcdbdd",
        mauve8: "#c8c7cb",
        mauve9: "#908e96",
        mauve10: "#86848d",
        mauve11: "#6f6e77",
        mauve12: "#1a1523",

        grass1: "#fbfefb",
        grass2: "#f3fcf3",
        grass3: "#ebf9eb",
        grass4: "#dff3df",
        grass5: "#ceebcf",
        grass6: "#b7dfba",
        grass7: "#97cf9c",
        grass8: "#65ba75",
        grass9: "#46a758",
        grass10: "#3d9a50",
        grass11: "#297c3b",
        grass12: "#1b311e",
      },
    },
  },
};
