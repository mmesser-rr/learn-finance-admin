import { skyBlue } from "@fuse/colors";
import { red } from "@mui/material/colors";

const themesConfig = {
  default: {
    palette: {
      mode: "light",
      // text: darkText,
      text: {
        primary: "#000000",
        secondary: "#77787A",
        disabled: "#A6A6A6",
        icon: "#FFFFFF",
      },
      common: {
        black: "rgb(17, 24, 39)", // ?
        white: "rgb(255, 255, 255)", // ?
      },
      divider: "rgba(255, 255, 255, 0)",
      primary: {
        light: "#FFFFFF", // ?
        main: "#DC085F", // "#E80A68", // '#E80A68', // '#00518E', // Active Tab/Button & Right side of header (Gradient)
        dark: "#D2075A", // "#FF066D", // Hover State Active Tab/Button & Left side of header (Graident)
        contrastText: "#000000",
      },
      secondary: {
        light: "#cc0000",
        main: "#DC085F",
        dark: "#24272A", // "#FF066D",
        contrastText: "#ffffff",
      },
      disabled: {
        backgroundColor: "#000000",
      },
      background: {
        paper: "#ffffff", // Forms Page,
        default: "#F2F2F1", // Background behind paper. Example page
      },
      error: red,
    },
    status: {
      danger: "orange",
    },
  },

  // defaultDark: {
  //   palette: {
  //     mode: 'dark',
  //     text: {
  //       primary: '#FFFFFF',
  //       secondary: '#77787A',
  //       disabled: '#A6A6A6',
  //       icon: '#000000',
  //     },
  //     divider: 'rgba(255, 255, 255, 0)',
  //     primary: {
  //       light: '#252F3E', // Right side of header (Gradient)
  //       main: '#DC075F', //
  //       dark: '#FF066D', // Left side of header (Gradient)
  //       contrastText: '#FFFFFF',
  //     },
  //     secondary: {
  //       light: skyBlue[100],
  //       main: skyBlue[500],
  //       dark: skyBlue[900],
  //       contrastText: '#FFFFFF',
  //     },
  //     background: {
  //       paper: '#252F3E',
  //       default: '#1B2330',
  //     },
  //     error: red,
  //   },
  //   status: {
  //     danger: 'orange',
  //   },
  // },
  // defaultDark: {
  //   palette: {
  //     mode: 'dark',
  //     text: darkText,
  //     primary: fuseDark,
  //     secondary: {
  //       light: skyBlue[100],
  //       main: skyBlue[500],
  //       dark: skyBlue[900],
  //     },
  //     background: {
  //       paper: '#1E2125',
  //       default: '#121212',
  //     },
  //     error: red,
  //   },
  //   status: {
  //     danger: 'orange',
  //   },
  // },

  // legacy: {
  //   palette: {
  //     mode: 'light',
  //     text: {
  //       primary: '#FFFFFF',
  //       secondary: '#FFFFFF',
  //       disabled: '#A6A6A6',
  //       icon: '#FFFFFF',
  //     },
  //     primary: fuseDark,
  //     secondary: {
  //       light: skyBlue[400],
  //       main: skyBlue[600],
  //       dark: skyBlue[700],
  //     },
  //     background: {
  //       paper: '#FFFFFF',
  //       default: '#F7F7F7',
  //     },
  //     error: red,
  //   },
  //   status: {
  //     danger: 'orange',
  //   },
  // },

  greyDark: {
    palette: {
      mode: "dark",
      text: {
        primary: "#FFFFFF",
        secondary: "#FFFFFF",
        disabled: "#A6A6A6",
        icon: "#FFFFFF",
      },
      primary: {
        light: "#FF00FF",
        main: "#24272A",
        dark: "#0000FF",
      },
      secondary: {
        light: skyBlue[100],
        main: skyBlue[500],
        dark: skyBlue[900],
      },
      background: {
        paper: "#24272A",
        default: "#24272A",
      },
      error: red,
    },
    status: {
      danger: "orange",
    },
  },
};

export default themesConfig;
