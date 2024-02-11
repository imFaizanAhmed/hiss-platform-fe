import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./input.css";
import MainPage from "./pages";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  },
});

const lightTheme = createTheme({
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

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  },
  typography: {
    fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"].join(","),
  },
});

function App() {
  const [light, setLight] = useState(true);
  return (
    <ThemeProvider theme={light? lightTheme: darkTheme}>
      <QueryClientProvider client={queryClient}>
        <MainPage />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
