/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        assassin: "#eec54d",
        guardian: "#91d014",
        hunter: "#ff9c2b",
        mage: "#8f69ef",
        warrior: "#ff5c3d",
      },
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
  },
  plugins: [],
  safelist: [
    {
      pattern:
        /(bg|text|from|to|border)-(assassin|guardian|hunter|mage|warrior)/,
    },
  ],
};
