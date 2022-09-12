const daisyui = require("daisyui");
const forms = require("@tailwindcss/forms");

const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {},
  },

  plugins: [forms, daisyui],
  daisyui: {
    themes: false, //["light", "dark", "cmyk"],
  },
};

module.exports = config;
