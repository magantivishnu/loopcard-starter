
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f5faff",
          100: "#e6f3ff",
          200: "#cfe8ff",
          300: "#a5d4ff",
          400: "#6eb7ff",
          500: "#3a97ff",
          600: "#1b79e6",
          700: "#155fb4",
          800: "#134f91",
          900: "#113f73"
        }
      },
      borderRadius: {
        '2xl': '1rem'
      }
    },
  },
  plugins: [],
}
