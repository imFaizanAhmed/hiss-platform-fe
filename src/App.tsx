import "./input.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PrimarySearchAppBar from "./components/header";
import CreatePost from "./components/create-post";
import RecipeReviewCard from "./components/post";

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
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App bg-[#546e7a] bg-opacity-15 min-h-screen">
        <header className="App-header">
          <PrimarySearchAppBar />
          <div className="flex justify-center flex-wrap h-full mt-8 mx-2">
            <CreatePost />
            <div className="max-w-[555px] w-full mt-8 bg-white rounded-lg">
              <RecipeReviewCard />
            </div>
          </div>
          <h1 className="text-right font-bold underline">Hello world!</h1>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
