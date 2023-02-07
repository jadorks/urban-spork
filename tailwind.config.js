/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "inter-med": ["Inter-Medium", "sans-serif"],
        "lato-reg": ["Lato-Bold", "sans-serif"],
        "freude-reg": ["Freude", "sans-serif"],
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities, theme }) {
      const dwormTypography = {
        ".freude-15": {
          fontFamily: theme("fontFamily.freude-reg"),
          fontStyle: "normal",
          fontSize: "15px",
        },
        ".freude-16": {
          fontFamily: theme("fontFamily.freude-reg"),
          fontStyle: "normal",
          fontSize: "16px",
        },
        ".freude-18": {
          fontFamily: theme("fontFamily.freude-reg"),
          fontStyle: "normal",
          fontSize: "18px",
        },
        ".freude-22": {
          fontFamily: theme("fontFamily.freude-reg"),
          fontStyle: "normal",
          fontSize: "22px",
        },
        ".freude-24": {
          fontFamily: theme("fontFamily.freude-reg"),
          fontStyle: "normal",
          fontSize: "24px",
        },
        ".freude-28": {
          fontFamily: theme("fontFamily.freude-reg"),
          fontStyle: "normal",
          fontSize: "28px",
        },
        ".freude-32": {
          fontFamily: theme("fontFamily.freude-reg"),
          fontStyle: "normal",
          fontSize: "32px",
        },
        ".freude-38": {
          fontFamily: theme("fontFamily.freude-reg"),
          fontStyle: "normal",
          fontSize: "38px",
        },
        ".freude-48": {
          fontFamily: theme("fontFamily.freude-reg"),
          fontStyle: "normal",
          fontSize: "48px",
        },
        ".freude-64": {
          fontFamily: theme("fontFamily.freude-reg"),
          fontStyle: "normal",
          fontSize: "64px",
        },
        ".inter-med-8": {
          fontFamily: theme("fontFamily.inter-med"),
          fontSize: "8px",
        },
        ".inter-med-10": {
          fontFamily: theme("fontFamily.inter-med"),
          fontSize: "10px",
        },
        ".inter-med-12": {
          fontFamily: theme("fontFamily.inter-med"),
          fontSize: "12px",
        },
        ".inter-med-15": {
          fontFamily: theme("fontFamily.inter-med"),
          fontSize: "15px",
        },
        ".inter-med-16": {
          fontFamily: theme("fontFamily.inter-med"),
          fontSize: "16px",
        },
        ".inter-med-18": {
          fontFamily: theme("fontFamily.inter-med"),
          fontSize: "18px",
        },
        ".lato-11": {
          fontFamily: theme("fontFamily.lato-reg"),
          fontStyle: "normal",
          fontSize: "11px",
        },
        ".lato-12": {
          fontFamily: theme("fontFamily.lato-reg"),
          fontStyle: "normal",
          fontSize: "12px",
        },
        ".lato-14": {
          fontFamily: theme("fontFamily.lato-reg"),
          fontStyle: "normal",
          fontSize: "14px",
        },
        ".lato-15": {
          fontFamily: theme("fontFamily.lato-reg"),
          fontStyle: "normal",
          fontSize: "15px",
        },
        ".lato-16": {
          fontFamily: theme("fontFamily.lato-reg"),
          fontStyle: "normal",
          fontSize: "16px",
        },
        ".lato-18": {
          fontFamily: theme("fontFamily.lato-reg"),
          fontStyle: "normal",
          fontSize: "18px",
        },
        ".lato-20": {
          fontFamily: theme("fontFamily.lato-reg"),
          fontStyle: "normal",
          fontSize: "20px",
        },
        ".lato-24": {
          fontFamily: theme("fontFamily.lato-reg"),
          fontStyle: "normal",
          fontSize: "24px",
        },
        ".lato-36": {
          fontFamily: theme("fontFamily.lato-reg"),
          fontStyle: "normal",
          fontSize: "36px",
        },
        ".lato-med-11": {
          fontFamily: theme("fontFamily.lato-reg"),
          fontStyle: "normal",
          fontSize: "11px",
          fontWeight: "500",
        },
      };

      addUtilities(dwormTypography, ["responsive"]);
    }),
  ],
};
