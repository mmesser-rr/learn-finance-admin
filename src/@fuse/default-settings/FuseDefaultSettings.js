import { fuseDark } from "@fuse/colors";
import _ from "@lodash";
import { lightBlue, red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import qs from "qs";
import { scrimBlack, theme } from "./theme";

/**
 * SETTINGS DEFAULTS
 */
export const defaultSettings = {
  customScrollbars: true,
  direction: "ltr",
  theme: {
    main: "default",
    navbar: "default",
    toolbar: "default",
    footer: "default",
  },
};

export function getParsedQuerySettings() {
  const parsedQueryString = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  });

  if (parsedQueryString && parsedQueryString.defaultSettings) {
    return JSON.parse(parsedQueryString.defaultSettings);
  }
  return {};

  // Generating route params from settings
  /* const settings = qs.stringify({
        defaultSettings: JSON.stringify(defaultSettings, {strictNullHandling: true})
    });
    console.info(settings); */
}

/**
 * THEME DEFAULTS
 */
export const defaultThemeOptions = {
  typography: {
    fontFamily: [
      "Inter var",
      "Roboto",
      '"Helvetica"',
      "Arial",
      "sans-serif",
    ].join(","),
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        // enableColorOnDark: false,
      },
      styleOverrides: {
        root: {
          backgroundColor: theme.colors.background.paperDark, // "#e4e7eA", //"#24272A",
          backgroundImage: "none",
          color: "#FFFFFF",
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          backgroundColor: theme.colors.background.paperDialog,
          backgroundImage: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#FFFFFF",
          textTransform: "none",
          borderRadius: "18px",
        },
        sizeSmall: {
          borderRadius: "15px",
        },
        sizeLarge: {
          borderRadius: "21px",
        },
        contained: {
          boxShadow: "none",
          "&:hover, &:focus": {
            boxShadow: "none",
          },
        },
        textPrimary: {
          color: theme.colors.primary.rubineDark,
        },
        containedPrimary: {
          color: theme.colors.primary.white,
          fontWeight: 700,
          backgroundImage: `linear-gradient(180deg, ${theme.colors.primary.rubineLight}, ${theme.colors.primary.rubineDark})`,

          "&:hover": {
            backgroundColor: theme.colors.primary.rubineLight,
            boxShadow: "0 4px 16px 0 rgb(0 0 0 / 16%)",
            transform: "scale(1.03)",
          },

          "&.Mui-disabled": {
            opacity: 0.32,
            color: theme.colors.primary.white,
          },
        },
        containedSecondary: {
          color: theme.colors.primary.white,
          fontWeight: 700,
          backgroundImage: `linear-gradient(180deg, ${theme.colors.primary.rubineLight}, ${theme.colors.primary.rubineDark})`,
          backgroundColor: "#ffcc33",

          "&:hover": {
            backgroundColor: theme.colors.primary.rubineLight,
            boxShadow: "0 4px 16px 0 rgb(0 0 0 / 16%)",
            transform: "scale(1.03)",
          },

          "&.Mui-disabled": {
            opacity: 0.32,
            color: theme.colors.primary.white,
          },
        },
      },
    },

    MuiButtonGroup: {
      styleOverrides: {
        contained: {
          borderRadius: 18,
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          color: "#000000",
          backgroundColor: "#FFFFFF",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        // body1: {
        //   color: "#ffcc33",
        // },
        // root: {
        //   color: "#cc0000",
        // },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          textTransform: "none",
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 16,
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          borderRadius: 8,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        colorPrimary: {
          // backgroundColor: "#ffcc33",
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: theme.colors.background.paper,
          borderRadius: 4,
          "&:before, &:after": {
            display: "none",
          },
          "&:hover": {
            backgroundColor: theme.colors.background.paperDark,
          },
        },
      },
    },
    MuiSlider: {
      defaultProps: {
        color: "secondary",
      },
    },
    MuiCheckbox: {
      defaultProps: {
        color: "secondary",
      },
    },
    MuiRadio: {
      defaultProps: {
        color: "secondary",
      },
    },
    MuiSwitch: {
      defaultProps: {
        color: "secondary",
      },
    },
  },
};

export const mustHaveThemeOptions = {
  typography: {
    htmlFontSize: 10,
    fontSize: 13,
    body1: {
      fontSize: "1.3rem",
    },
    body2: {
      fontSize: "1.3rem",
    },
  },
};

export const defaultThemes = {
  default: {
    // palette: {
    //   mode: 'light',
    //   primary: fuseLight,
    //   secondary: {
    //     light: lightBlue[400],
    //     main: lightBlue[600],
    //     dark: lightBlue[700],
    //   },
    //   error: red,
    // },
    // status: {
    //   danger: 'orange',
    // },
  },
  defaultDark: {
    palette: {
      mode: "dark",
      primary: fuseDark,
      secondary: {
        light: lightBlue[400],
        main: lightBlue[600],
        dark: lightBlue[700],
      },
      error: red,
    },
    status: {
      danger: "orange",
    },
  },
};

export function extendThemeWithMixins(obj) {
  const theme = createTheme(obj);
  return {
    border: (width = 1) => ({
      borderWidth: width,
      borderStyle: "solid",
      borderColor: theme.palette.divider,
    }),
    borderLeft: (width = 1) => ({
      borderLeftWidth: width,
      borderStyle: "solid",
      borderColor: theme.palette.divider,
    }),
    borderRight: (width = 1) => ({
      borderRightWidth: width,
      borderStyle: "solid",
      borderColor: theme.palette.divider,
    }),
    borderTop: (width = 1) => ({
      borderTopWidth: width,
      borderStyle: "solid",
      borderColor: theme.palette.divider,
    }),
    borderBottom: (width = 1) => ({
      borderBottomWidth: width,
      borderStyle: "solid",
      borderColor: theme.palette.divider,
    }),
  };
}

export function mainThemeVariations(theme) {
  return {
    mainThemeDark: _.merge({}, theme, {
      palette: {
        mode: "dark",
        background: {
          paper: "#1E2125",
          default: "#121212",
        },
        text: {
          primary: "rgb(255,255,255)",
          secondary: "rgb(229, 231, 235)",
          disabled: "rgb(156, 163, 175)",
        },
      },
    }),
    mainThemeLight: _.merge({}, theme, {
      palette: {
        mode: "light",
        //   background: {
        //     paper: '#F2F2F1', // Toolbar Color
        //     default: '#F7F7F7',
        //   },
        //   text: {
        //     primary: 'rgb(17, 24, 39)',
        //     secondary: 'rgb(107, 114, 128)',
        disabled: "rgb(149, 156, 169)",
        //   },
      },
    }),
  };
}
