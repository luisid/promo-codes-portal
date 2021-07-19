// eslint-disable-next-line
const colors = require("tailwindcss/colors");

// eslint-disable-next-line no-undef
module.exports = {
  mode: "jit",
  purge: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      blue: {
        lighter: "#CCE7FF",
        light: "#2F80ED",
        DEFAULT: "#0085FF",
      },
      "gray-blue": {
        lightest: "#E5E5E5",
        lighter: "#E2E5EC",
        light: "#F5F7FA",
        DEFAULT: "#888991",
        dark: "#1B1D29",
      },
      "gray-pure": {
        lighter: "#CFD2D9",
        DEFAULT: "#7D7D7D",
        dark: "#262626",
      },
    },
  },
  variants: {},
  plugins: [],
};
