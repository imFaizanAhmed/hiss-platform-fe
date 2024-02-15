import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "@mui/material/styles";
import { RouterProvider } from "react-router-dom";
import { darkTheme, lightTheme } from "./themes";
import { router } from "./routes";
import { GoogleOAuthProvider } from "@react-oauth/google";
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
    <GoogleOAuthProvider clientId="62504745258-hc067obu4kk8s7s5emhv0t6r5ma5d6kf.apps.googleusercontent.com">
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
    </GoogleOAuthProvider>
  );
}

export default App;
