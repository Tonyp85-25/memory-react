import React from "react";
//import logo from './logo.svg';
import "./App.css";
import Board from "./components/board";
import Timer from "./components/timer";

function App() {
  return (
    <div>
      <Board></Board>
      <Timer />
    </div>
  );
}

export default App;
