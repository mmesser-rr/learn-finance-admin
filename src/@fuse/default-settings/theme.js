// import { Breakpoint } from "@mui/system";

// type MediaQueries<T> = {[key in Breakpoint]: T} & {xxl: T};

// const breakpoints: MediaQueries<number> = {
const breakpoints = {
  xs: 0,
  sm: 479,
  md: 767,
  lg: 991,
  xl: 1440,
  xxl: 1920,
};

export const theme = {
  colors: {
    background: {
      paper: "#F2F2F1",
      paperDark: "rgba(36, 39, 42, .1)",
      paperDialog: "#24272A",
    },
    primary: {
      black: "#000000",
      white: "#FFFFFF",
      rubineLight: "#ED0D6C",
      rubineDark: "#D10056",
      plum: "#8F1165",
      purple: "#5A2B6B",
      navy: "#122E52",
      chartreuse: "#DFFF00",
    },
    secondary: {
      gold: "#FFBB00",
      orange: "#FF730A",
      lime: "#90CC49",
      green: "#00A35E",
      skyBlue: "#01A9f4",
      blue: "#006CB8",
    },
    type: {
      white: "#ffffff",
      light: "#B2B2B2",
      medium: "#77787A",
      dark: "#24272A",
    },
    neutralGray: {
      100: "#F8F8F7",
      200: "#F2F2F1",
      300: "#EBEAE9",
      400: "#E5E5E4",
      450: "#E9E8E7",
      500: "#BBBBBB",
      600: "#898A8D",
      700: "#54565A",
      800: "#24272A",
    },
    neutralBlue: {
      100: "#006CB8",
      200: "#0060A3",
      300: "#00518F",
      400: "#00457A",
      500: "#003A66",
      600: "#122E52",
      700: "#0D223D",
      800: "#09182B",
    },
    messaging: { green: "#338E37", red: "#CC2D2D" },
    gradientVertical: {
      rubine: "linear-gradient(180deg, #ED0D6C, #D10056)",
      blue: "linear-gradient(180deg, #0060A3, #00457A)",
      grey: "linear-gradient(180deg, #E5E5E4, #BBBBBB)",
      shadow: "linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.08))",
    },
    gradientRadial: {
      rubine:
        "radial-gradient(circle farthest-corner at 0% 0%, #ED0D6C, #D10056)",
      blue: "radial-gradient(circle farthest-corner at 0% 0%, #0060A3, #00457A)",
      grey: "radial-gradient(circle farthest-corner at 0% 0%, #E5E5E4, #BBBBBB)",
      rubinePlum:
        "radial-gradient(circle farthest-corner at 0% 0%, #ED0D6C, #8F1165)",
      rubinePurple:
        "radial-gradient(circle farthest-corner at 0% 0%, #ED0D6C, #5A2B6B)",
      rubineBlue:
        "radial-gradient(circle farthest-corner at 0% 0%, #ED0D6C, #00457A)",
    },
    iconBarBG: "#696B70",
    darkBlue: "#003052",
  },
  fontSizes: {
    xl: "18px",
    l: "16px",
    m: "14px",
    s: "12px",
  },
  mediaQueries: {
    xs: `@media screen and (min-width: ${breakpoints.xs})`,
    sm: `@media screen and (min-width: ${breakpoints.sm}px)`,
    md: `@media screen and (min-width: ${breakpoints.md}px)`,
    lg: `@media screen and (min-width: ${breakpoints.lg}px)`,
    xl: `@media screen and (min-width: ${breakpoints.xl}px)`,
    xxl: `@media screen and (min-width: ${breakpoints.xxl}px)`,
  },
};

export const scrimBlack = (opacity: number): string =>
  `rgba(0, 0, 0, ${opacity})`;
export const scrimWhite = (opacity: number): string =>
  `rgba(255, 255, 255, ${opacity})`;
