import React, { useEffect } from "react";
import { useState } from "react";
import BoardList from "./components/BoardList";
import CardList from "./components/CardList";
import "./App.css";
import axios from "axios";
import NewBoardForm from "./components/NewBoardForm";
import NewCardForm from "./components/NewCardForm";

const kBaseUrl = "https://inspiration-board-back-end.herokuapp.com";

const convertFromApi = (apiBoard) => {
  const { board_id, ...rest } = apiBoard;
  // eslint-disable-next-line no-undef
  const newBoard = { boardId: board_id, ...rest };
  return newBoard;
};

const convertFromCardApi = (apiCard) => {
  const { likes_count, card_id, ...rest } = apiCard;
  // eslint-disable-next-line no-undef
  const newCard = { likesCount: likes_count, cardId: card_id, ...rest };
  return newCard;
};

const getAllBoardsApi = () => {
  return axios
    .get(`${kBaseUrl}/boards`)
    .then((response) => {
      return response.data.map(convertFromApi);
    })
    .catch((error) => {
      console.log(`error from get board api ${error}`);
    });
};

const getAllCardsApi = (boardId) => {
  return axios
    .get(`${kBaseUrl}/boards/${boardId}/cards`)
    .then((response) => {
      console.log(response.data.cards);
      return response.data.cards.map(convertFromCardApi);
    })
    .catch((error) => {
      console.log(`from card api call ${error}`);
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

const createCardApi = (boardId, newCardData) => {
  return axios
    .post(`${kBaseUrl}/boards/${boardId}/cards`, newCardData)
    .then((response) => {
      return convertFromCardApi(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const likeCardApi = (cardId) => {
  // return axios.patch(`${kBaseUrl}/boards/id/cards/${cardsId}/like`)
  return axios
    .patch(`${kBaseUrl}/cards/${cardId}`)
    .then((response) => {
      console.log(response.data.card);
      return convertFromCardApi(response.data.card);
    })
    .catch((error) => {
      console.log(error);
    });
};

const deleteCardApi = (cardId) => {
  // return axiosaxios.delete(`${kBaseUrl}/boards/id/cards/${cardsId}/like`)
  return axios.delete(`${kBaseUrl}/cards/${cardId}`).catch((error) => {
    console.log(error);
  });
};

function App() {
  const [cardData, setCardData] = useState([]);
  const [boardData, setBoardData] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState({
    boardName: "",
    boardId: null,
  });

  const getAllCards = (boardId) => {
    return getAllCardsApi(boardId).then((cards) => {
      console.log(cards);
      setCardData(cards);
    });
  };

  const getAllBoards = () => {
    return getAllBoardsApi().then((boards) => {
      setBoardData(boards);
    });
  };

  useEffect(() => {
    // getAllCards();
    getAllBoards();
  }, []);

  const likeCard = (cardId) => {
    return likeCardApi(cardId).then((cardResult) => {
      setCardData((cardData) =>
        cardData.map((card) => {
          if (card.cardId === cardResult.cardId) {
            return cardResult;
          } else {
            return card;
          }
        })
      );
    });
  };

  const deleteCard = (cardId) => {
    return deleteCardApi(cardId).then((cardResult) => {
      return getAllCards();
    });
  };

  const handleCardSubmit = (boardId, newCardData) => {
    createCardApi(boardId, newCardData)
      .then((newCard) => {
        setCardData([...cardData, newCard]);
      })
      .catch((error) => console.log(error));
  };

  const selectBoard = (title, owner, boardId) => {
    setSelectedBoard({ boardName: `${title} - ${owner}`, boardId: boardId });
    getAllCards(boardId);
    // return getAllCardsApi(id);
  };

  const currentBoard = selectedBoard.boardName
    ? selectedBoard.boardName
    : "Select a Board from the Board List!";

  const handleBoardSubmit = (data) => {
    createBoardsApi(data)
      .then((newBoard) => {
        setBoardData([...boardData, newBoard]);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="page_container">
      <div className="App">
        <h1>Inspiration Board</h1>
        <div className="board-container">
          <BoardList boards={boardData} onSelectBoard={selectBoard}></BoardList>
          <h2>Selected Board</h2>
          <p>{currentBoard}</p>
          <NewBoardForm handleBoardSubmit={handleBoardSubmit} />
        </div>
        <section className="cards-container">
          <div className="card-items_container">
          <h2>Cards For {currentBoard}</h2>
          <CardList
            cardData={cardData}
            onLikeCard={likeCard}
            onDeleteCard={deleteCard}
          />
          </div>
          <div className="new-card-form-container">
            <NewCardForm
              handleCardSubmit={handleCardSubmit}
              currentBoard={selectedBoard}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
