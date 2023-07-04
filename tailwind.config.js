/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#101626",
        accent : "#FBBF24",
      },
      backgroundImage : {
        "hero-pattern-dark" : "url('/images/hero-dark.jpg')",
        "hero-pattern-light" : "url('/images/hero-light.png')",
        "code" : "url('/images/bg-code.png')",
        // "footer" : "url('/images/bg-footer.png')",
        // "happy-coding" : "url('/images/happy-coding.png')",
      }
    },
  },
  plugins: [],
  darkMode : 'class'
}