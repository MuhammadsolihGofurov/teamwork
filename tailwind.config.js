/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // '.s/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: ["myFont", "SF Pro Display", "sans-serif"],
      colors: {
        main: "#98BE00",
        primary: "#222222",
        blue: "#00A8DD",
        facebook: "#3C7EBA",
        orange: "#FF9533",
        date: "#BABABA",
        selection: "#C4F500",
        some_red: "#FF6320",
        some_btn: "#B7E500",
        bg: {
          1: "#F8F8F8",
          2: "#F5F5F5",
          3: "#E4E4E4",
          4: "#DDDDDD",
        },
      },
      screens: {
        small: "360px",
        // => @media (min-width: 360px) { ... }

        xs: "450px",
        // => @media (min-width: 450px) { ... }

        sm: "650px",
        // => @media (min-width: 576px) { ... }

        // ms: "650px",
        // => @media (min-width: 650px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "992px",
        // => @media (min-width: 992px) { ... }

        "2xl": "1200px",
        // => @media (min-width: 1200px) { ... }

        "4xl": "1300px",
        // => @media (min-width: 1200px) { ... }

        "6xl": "1440px",
        // => @media (min-width: 1440px) { ... }

        "8xl": "1540px",
        // => @media (min-width: 1540px) { ... }
      },
    },
  },
  plugins: [],
};
