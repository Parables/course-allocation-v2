const daisyui = require("daisyui");
const forms = require("@tailwindcss/forms");

const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {},
  },

  plugins: [daisyui],
  daisyui: {
    themes: ["light"],
  },
};

module.exports = config;
