import "./input.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PrimarySearchAppBar from "./components/header";
import CreatePost from "./components/create-post";
import Posts from "./pages/posts";
import ProfileSection from "./components/profile-section";
import {
  QueryClient,
  QueryClientProvider
} from 'react-query'
import CallAPI from "./pages/basic";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true, 
      refetchOnReconnect: true 
    }
  }
})

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "#607d8b",
    },
    common: {
      white: "#546e7a",
    },
    background: {
      default: "#000",
    },
    // mode: 'dark'
  },
  typography: {
    fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
      <div className="App bg-[#546e7a] bg-opacity-15 min-h-screen">
        <header className="App-header">
          {/* <CallAPI /> */}
          <PrimarySearchAppBar />
          <div className="grid grid-cols-2 pt-20 pb-4 gap-4 mx-4 sm:grid-cols-3 md:mx-0 md:grid-cols-5">
            <ProfileSection />
            <div className="max-w-full col-start-1 col-span-2 sm:col-start-2 sm:max-w-[555px] md:col-start-3">
              <CreatePost />
              <Posts />
            </div>
          </div>
        </header>
      </div>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
