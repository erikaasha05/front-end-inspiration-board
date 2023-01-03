import React from "react";
import Board from "./Board";

const BoardList = (props) => {
  const boardComponents = props.boards.map((board) => {
    return (
      <Board
        key={board.boardId}
        id={board.boardId}
        title={board.title}
        owner={board.owners}
      />
    );
  });
  return <ol className="boards-list">{boardComponents}</ol>;
};

export default BoardList;
