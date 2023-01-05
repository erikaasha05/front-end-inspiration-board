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

const cardData = [
  {
    id: 1, 
    message: "hey there", 
    likesCount: 0
  }, 
  {
    id: 2, 
    message: "hello", 
    likesCount: 0
  },
  {
    id: 3,
    message: "this is the message", 
    likesCount: 0
  }
]
// const selectBoard = id => {
//   console.log("pass")
// };

// const likeCardApi = (id) => {
//   return axios.patch(`${kBaseUrl}/board/${id}/like`)
//   .then(response => {
//     return response.data;
//   })
//   .catch(error => {
//     console.log(error);
//   })
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
      <div className="cards-container">
      <h2>Cards For ...</h2>
      <CardList cardData={cardData} />
      </div>
      <div className="new-card-form-container">
      <h2>Create a New Card</h2>
      <NewCardForm/>
      </div>
    </div>
  );
}

export default App;
