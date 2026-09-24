/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#e23744",
          dark: "#c81f2c",
        },
      },
    },
  },
  plugins: [],
};
