import { Images } from "./assets/index";
import './input.css'
import FirstComponent from "./components";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-right font-bold underline">Hello world!</h1>
        <img src={Images.lightLogo} className="App-logo" alt="logo" />
        <FirstComponent />
      </header>
    </div>
  );
}

export default App;
