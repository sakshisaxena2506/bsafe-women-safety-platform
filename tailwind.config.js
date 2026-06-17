/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#effdf8",
          100: "#d7f7eb",
          500: "#0f9f8a",
          600: "#087f76",
          700: "#08645f",
          900: "#103532"
        },
        roseguard: {
          50: "#fff1f3",
          100: "#ffe0e5",
          500: "#e23d57",
          600: "#cb2443",
          700: "#a71935"
        },
        ink: "#102027"
      },
      boxShadow: {
        glass: "0 24px 80px rgba(16, 32, 39, 0.14)",
        soft: "0 18px 45px rgba(16, 32, 39, 0.10)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
