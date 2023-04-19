/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlu: "#2B2741",
        customGreen: "#8FEBD5",
        customWhite: "#E7F7F4",
        customRhino: "#343F71",
        customTwilight: "#E9D8E4",
        customPeachy: "#ea8a81",
        customBlackCherry: "#301008",
        customGreenBlue: "#488A99",
        customGrey: "#7E909A",
        customlight: "#A5D8DD",
      },
    },
  },
  plugins: [],
};
