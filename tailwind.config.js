/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        primary: {
          DEFAULT: "#1e3a8a", // Azul FMM
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#f59e0b", // Ouro/Amarelo
          foreground: "#000000",
        },
      },
    },
  },
  plugins: [],
}