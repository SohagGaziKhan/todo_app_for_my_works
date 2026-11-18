/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#2B4FE0",
          dark: "#1E3BB8",
          light: "#5470E8",
        },
      },
    },
  },
  plugins: [],
};
