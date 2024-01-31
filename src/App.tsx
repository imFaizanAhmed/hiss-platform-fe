import React from "react";
import logo from "./logo.svg";
import { Images } from "./assets/index";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={Images.lightLogo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
