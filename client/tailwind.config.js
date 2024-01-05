/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "mainColor":"#324A72",
        "secondaryColor":"#D8D3DE"
      }
    },
    flex:{
      fluid:"max(32rem,(100% -6rem) / 2)"
    }
  },
  plugins: [],
}