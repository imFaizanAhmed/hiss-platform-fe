import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
    palette: {
      primary: {
        main: "#1DA1F2",
      },
      secondary: {
        main: "#546e7a",
      },
      common: {
        white: "#546e7a",
      },
      info: {
        main: "#fff"
      },
      background: {
        default: "#e5e9eb",
      },
      // mode: 'dark'
    },
    typography: {
      fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"].join(","),
    },
  });
  
  export const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    },
    typography: {
      fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"].join(","),
    },
  });