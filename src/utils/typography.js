import Typography from "typography";

const typography = new Typography({
  baseFontSize: "18px",
  baseLineHeight: 1.45,
  googleFonts: [
    {
      name: "Merriweather",
      styles: ["800"],
    },
    {
      name: "Roboto",
      styles: ["400"]
    }
  ],
  headerFontFamily: ["Merriweather", "serif"],
  bodyFontFamily: ["Roboto", "sans-serif"]
});

typography.injectStyles();

export default typography;
