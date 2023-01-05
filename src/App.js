import React from "react";
import { useState } from "react";
import BoardList from "./components/BoardList";
import CardList from "./components/CardList";
import "./App.css";
import axios from "axios";
import NewBoardForm from "./components/NewBoardForm";
import NewCardForm from "./components/NewCardForm";

const kBaseUrl = 'https://inspiration-board-back-end.herokuapp.com/boards'

// const boardData = [
//   {
//     id: 1,
//     title: "Title",
//     owner: "Erika",
//   },
//   {
//     id: 2,
//     title: "Title2",
//     owner: "erika",
//   },
//   {
//     id: 3,
//     title: "title3",
//     owner: "hakai",
//   },
// ];

// const cardData = [
//   {
//     id: 1, 
//     message: "hey there", 
//     likesCount: 0
//   }, 
//   {
//     id: 2, 
//     message: "hello", 
//     likesCount: 0
//   },
//   {
//     id: 3,
//     message: "this is the message", 
//     likesCount: 0
//   }
// ]

const convertFromApi = (apiBoard) => {
  const {cardsId, ...rest} = apiBoard;
  // eslint-disable-next-line no-undef
  const newBoard = {cardsId: cards_id, ...rest};
  return newBoard
};

const convertFromCardApi = (apiCard) => {
  const {likesCount, ...rest} = apiCard;
  // eslint-disable-next-line no-undef
  const newCard = {likesCount: likes_count, ...rest};
  return newCard;
};
const getAllBoardsApi = () => {
  return axios.get(`${kBaseUrl}/boards`)
  .then(response => {
    return response.data.map(convertFromApi);
  })
  .catch(error => {
    console.log(error);
  });
};

const createBoardsApi = (boardData) => {
  const requestBody = {...boardData};
  return axios.post(`${kBaseUrl}/boards`, requestBody)
  .then(response => {
    return convertFromApi(response.data.boards);
  })
  .catch(error => {
    console.log(error);
  });
};

// const selectBoard = id => {
//   return getAllCardsApi(${id});
// };

const createCardApi = (id) => {
  return axios.post(`${kBaseUrl}/boards/${id}`)
  .then(response => {
    return convertFromCardApi(response.data.cards)
  })
  .catch(error=> {
    console.log(error);
  });
};

const likeCardApi = (cardsId) => {
  return axios.patch(`${kBaseUrl}/boards/id/cards/${cardsId}/like`)
  .then(response => {
    return convertFromCardApi(response.data.cards)
  })
  .catch(error => {
    console.log(error);
  })
};

const getAllCardsApi = (id) => {
  return axios.get(`${kBaseUrl}/boards/${id}`)
  .then(response => {
    return convertFromCardApi(response.data.cards);
  })
  .catch(error => {
    console.log(error);
  });
};

const deleteCardApi = (cardsId) => {
  return axios.delete(`${kBaseUrl}/boards/id/cards/${cardsId}`)
  .catch(error => {
    console.log(error);
  });
};

function App() {
  return (
    <div className="App">
      <h1>Inspiration Board</h1>
      <div className="board-container">
        <BoardList boards={boardData} selectBoard={getAllCardsApi}></BoardList>
        <h2>Selected Board</h2>
        <NewBoardForm />
      </div>
      <div className="cards-container">
      <h2>Cards For ...</h2>
      <CardList cardData={cardData} />
      </div>
      <div className="new-card-form-container">
      <NewCardForm/>
      </div>
    </div>
  );
}

export default App;
