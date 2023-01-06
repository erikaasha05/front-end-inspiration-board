import React, { useEffect } from "react";
import { useState } from "react";
import BoardList from "./components/BoardList";
import CardList from "./components/CardList";
import "./App.css";
import axios from "axios";
import NewBoardForm from "./components/NewBoardForm";
import NewCardForm from "./components/NewCardForm";

const kBaseUrl = 'https://inspiration-board-back-end.herokuapp.com'


const convertFromApi = (apiBoard) => {
  const {boardId, ...rest} = apiBoard;
  // eslint-disable-next-line no-undef
  const newBoard = {boardId: board_id, ...rest};
  return newBoard
};

const convertFromCardApi = (apiCard) => {
  const {likesCount, cardId, ...rest} = apiCard;
  // eslint-disable-next-line no-undef
  const newCard = {likesCount: likes_count, cardId: card_id, ...rest};
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

const createCardApi = (id) => {
  return axios.post(`${kBaseUrl}/boards/${id}/cards`)
  .then(response => {
    return convertFromCardApi(response.data.cards)
  })
  .catch(error=> {
    console.log(error);
  });
};

const likeCardApi = (cardsId) => {
  // return axios.patch(`${kBaseUrl}/boards/id/cards/${cardsId}/like`)
  return axios.patch(`${kBaseUrl}/cards/${cardsId}`)
  .then(response => {
    return convertFromCardApi(response.data.cards)
  })
  .catch(error => {
    console.log(error);
  })
};

const getAllCardsApi = (boardId) => {
  return axios.get(`${kBaseUrl}/boards/${boardId}`)
  .then(response => {
    return convertFromCardApi(response.data.cards);
  })
  .catch(error => {
    console.log(error);
  });
};

const deleteCardApi = (cardsId) => {
  // return axiosaxios.delete(`${kBaseUrl}/boards/id/cards/${cardsId}/like`)
  return axios.delete(`${kBaseUrl}/cards/${cardsId}`)
  .catch(error => {
    console.log(error);
  });
};

function App() {
  const [cardData, setCardData] = useState([]);
  const [boardData, setBoardData] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState("");

  const getAllCards = () => {
    return getAllCardsApi()
    .then(cards => {
      setCardData(cards);
    })
  };

  const getAllBoards = () => {
    return getAllBoardsApi().then((boards) => {
      setBoardData(boards);
    });
  };

  useEffect(() => {
    getAllCards();
    getAllBoards();
  }, []);

  const likeCard = (id) => {
    return likeCardApi(id)
    .then(cardResult => {
      setCardData(cardData => cardData.map(card => {
        if(card.id === cardResult.id) {
          return cardResult;
        } else {
          return card;
        }
      }));
    })
  };


  const deleteCard = id => {
    return deleteCardApi(id)
    .then(cardResult => {
      return getAllCards();
    });
  };

  const handleCardSubmit = (data) => {
    createCardApi(data)
    .then(newCard => {
      setCardData([...cardData, newCard])
    })
    .catch(error => console.log(error));
  };

  const selectBoard = (title, owner) => {
    setSelectedBoard(`${title} - ${owner}`);
    // return getAllCardsApi(id);
  };

  const currentBoard = selectedBoard ? selectedBoard : "Select a Board from the Board List!"

  const handleBoardSubmit = (data) => {
    createBoardsApi(data)
      .then((newBoard) => {
        setBoardData([...boardData, newBoard]);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <h1>Inspiration Board</h1>
      <div className="board-container">
        <BoardList boards={boardData} onSelectBoard={selectBoard}></BoardList>
        <h2>Selected Board</h2>
        <p>{currentBoard}</p>
        <NewBoardForm handleBoardSubmit={handleBoardSubmit} />
      </div>
      <div className="cards-container">
      <h2>Cards For ...</h2>
      <CardList cardData={cardData} onLikeCard={likeCard} onDeleteCard={deleteCard}/>
      </div>
      <div className="new-card-form-container">
      <NewCardForm handleCardSubmit={handleCardSubmit}/>
      </div>
    </div>
  );
}

export default App;
