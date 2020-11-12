import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Sample from "./components/sample";
import 'bootstrap/dist/css/bootstrap.css'
function App() {
  return (
    <React.Fragment>
      <div className="App">
        <Sample />
      </div>
    </React.Fragment>
  );
}

export default App;
