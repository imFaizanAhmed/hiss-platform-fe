import "./input.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PrimarySearchAppBar from "./components/Header";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "#607d8b"
    },
    common: {
      white: "#546e7a"
    },
    background: {
      default: '#000'
    }
    // mode: 'dark'
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <PrimarySearchAppBar />
          <h1 className="text-right font-bold underline">Hello world!</h1>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
