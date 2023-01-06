import React, { useEffect } from "react";
import { useState } from "react";
import BoardList from "./components/BoardList";
import CardList from "./components/CardList";
import "./App.css";
import axios from "axios";
import NewBoardForm from "./components/NewBoardForm";
import NewCardForm from "./components/NewCardForm";

const kBaseUrl = "https://inspiration-board-back-end.herokuapp.com";

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

const cardData = [
  {
    id: 1,
    message: "hey there",
    likesCount: 0,
  },
  {
    id: 2,
    message: "hello",
    likesCount: 0,
  },
  {
    id: 3,
    message: "this is the message",
    likesCount: 0,
  },
];

const convertFromApi = (apiBoard) => {
  const { board_id: boardId, ...rest } = apiBoard;
  // eslint-disable-next-line no-undef
  const newBoard = { boardId, ...rest };
  return newBoard;
};

// const convertFromCardApi = (apiCard) => {
//   const { likesCount, ...rest } = apiCard;
//   // eslint-disable-next-line no-undef
//   const newCard = { likesCount: likes_count, ...rest };
//   return newCard;
// };
const getAllBoardsApi = () => {
  return axios
    .get(`${kBaseUrl}/boards`)
    .then((response) => {
      return response.data.map(convertFromApi);
    })
    .catch((error) => {
      console.log(error);
    });
};

const createBoardsApi = (newBoardData) => {
  // const requestBody = {...boardData};
  return axios
    .post(`${kBaseUrl}/boards`, newBoardData)
    .then((response) => {
      return convertFromApi(response.data.board);
      // return response.data.board;
    })
    .catch((error) => {
      console.log(error);
    });
};

// const selectBoard = id => {
//   return getAllCardsApi(${id});
// };

// const createCardApi = (id) => {
//   return axios
//     .post(`${kBaseUrl}/boards/${id}`)
//     .then((response) => {
//       return convertFromCardApi(response.data.cards);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// const likeCardApi = (cardsId) => {
//   return axios
//     .patch(`${kBaseUrl}/boards/id/cards/${cardsId}/like`)
//     .then((response) => {
//       return convertFromCardApi(response.data.cards);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// const getAllCardsApi = (id) => {
//   return axios
//     .get(`${kBaseUrl}/boards/${id}`)
//     .then((response) => {
//       return convertFromCardApi(response.data.cards);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// const deleteCardApi = (cardsId) => {
//   return axios
//     .delete(`${kBaseUrl}/boards/id/cards/${cardsId}`)
//     .catch((error) => {
//       console.log(error);
//     });
// };

function App() {
  // const [cardData, setCardData] = useState([]);
  const [boardData, setBoardData] = useState([]);

  // const getAllCards = () => {
  //   return getAllCardsApi()
  //   .then(cards => {
  //     setCardData(cards);
  //   })
  // };

  useEffect(() => {
    // getAllCards();
    getAllBoards();
  }, []);

  const getAllBoards = () => {
    return getAllBoardsApi().then((boards) => {
      setBoardData(boards);
      console.log(boards);
    });
  };

  // const likeCard = (id) => {
  //   return likeCardApi(id)
  //   .then(cardResult => {
  //     setCardData(cardData => cardData.map(card => {
  //       if(card.id === cardResult.id) {
  //         return cardResult;
  //       } else {
  //         return card;
  //       }
  //     }));
  //   })
  // };

  // const deleteCard = id => {
  //   return deleteCardApi(id)
  //   .then(cardResult => {
  //     return getAllCards();
  //   });
  // };

  // const handleCardSubmit = (data) => {
  //   createCardApi(data)
  //   .then(newCard => {
  //     setCardData([...cardData, newCard])
  //   })
  //   .catch(error => console.log(error));
  // };

  const handleBoardSubmit = (data) => {
    createBoardsApi(data)
      .then((newBoard) => {
        console.log(newBoard);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <h1>Inspiration Board</h1>
      <div className="board-container">
        <BoardList boards={boardData}></BoardList>
        <h2>Selected Board</h2>
        <NewBoardForm handleBoardSubmit={handleBoardSubmit} />
      </div>
      <div className="cards-container">
        <h2>Cards For ...</h2>
        <CardList cardData={cardData} />
      </div>
      <div className="new-card-form-container">
        <NewCardForm />
      </div>
    </div>
  );
}

export default App;
