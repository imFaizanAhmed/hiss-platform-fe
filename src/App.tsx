import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "@mui/material/styles";
import { RouterProvider } from "react-router-dom";
import { darkTheme, lightTheme } from "./themes";
import { router } from "./routes";
import "./input.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  },
});

function App() {
  const [theme, setTheme] = useState(lightTheme);
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <div
          className="App bg-opacity-15 min-h-screen"
          style={{ backgroundColor: theme.palette.background.default }}
        >
          <RouterProvider router={router} />
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
