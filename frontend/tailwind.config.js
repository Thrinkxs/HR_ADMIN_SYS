/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        heroBg: "#e2deec",
        herobt: "#D2BADC",
        bG: "#71799E",
        button: "#6339B9",
        button2: "#B396D6",
      },
      fontFamily: {
        inter: "Inter",
        sans: [
          "Inter var, sans-serif",
          ...defaultTheme.fontFamily.sans,
          // {
          //   fontFeatureSettings: '"cv11", "ss01"',
          //   fontVariationSettings: '"opsz" 32',
          // },
        ],
      },
    },
  },
  plugins: [],
};
