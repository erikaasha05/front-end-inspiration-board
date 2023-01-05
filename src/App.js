import React from "react";
import { useState } from "react";
import BoardList from "./components/BoardList";
import CardList from "./components/CardList";
import "./App.css";
import axios from "axios";
import NewBoardForm from "./components/NewBoardForm";
import NewCardForm from "./components/NewCardForm";

const boardData = [
  {
    id: 1,
    title: "Title",
    owner: "Erika",
  },
  {
    id: 2,
    title: "Title2",
    owner: "erika",
  },
  {
    id: 3,
    title: "title3",
    owner: "hakai",
  },
];

// const selectBoard = id => {
//   console.log("pass")
// };

function App() {
  return (
    <div className="App">
      <h1>Inspiration Board</h1>
      <div className="board-container">
        <BoardList boards={boardData}></BoardList>
        <h2>Selected Board</h2>
        <NewBoardForm />
      </div>
      <h2>Cards For ...</h2>
      {/* <CardList />
      <NewCardForm /> */}
    </div>
  );
}

export default App;
