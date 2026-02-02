/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          50: "#f5f7ff",
          100: "#ebf0fe",
          200: "#ced9fd",
          300: "#adc0fb",
          400: "#6a8af9",
          500: "#2755f7",
          600: "#1145f6",
          700: "#0d37c5",
          800: "#0a2a94",
          900: "#082279",
        },
      },
    },
  },
  plugins: [],
};
