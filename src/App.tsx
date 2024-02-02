import "./input.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PrimarySearchAppBar from "./components/header";
import CreatePost from "./components/create-post";
import Posts from "./pages/posts";
import ProfileSection from "./components/profile-section";

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
      <div className="App bg-[#546e7a] bg-opacity-15 min-h-screen">
        <header className="App-header">
          <PrimarySearchAppBar />
          <div className="grid grid-cols-5 py-4 gap-4">
            <ProfileSection />
            <div className="max-w-[555px] col-span-2 col-start-3">
              <CreatePost />
              <Posts />
            </div>
          </div>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
