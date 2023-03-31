/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/html/utils/withMT");
 
module.exports = withMT({
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
});