/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-pink": "#E84D70",
        "custom-purple": "#A337F6",
        "custom-blue": "#28A7ED",
      },
    },
  },
  plugins: [],
};
