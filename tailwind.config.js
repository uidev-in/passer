/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-orange": "#FCAF3B",
        "primary-black": "#050101",
        "primary-grey": "#2b2b2b",
        "secondary-orange": "#fcaf3b",
        "secondary-black": "#222222",
      },
    },
  },
  plugins: [],
};
