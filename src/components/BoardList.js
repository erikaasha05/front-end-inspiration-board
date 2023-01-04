import React from "react";
import PropTypes from "prop-types";
import Board from "./Board";

const BoardList = (props) => {
  console.log(props.boards);
  const boardComponent = props.boards.map((board) => {
    return (
      <Board
        key={board.id}
        id={board.id}
        title={board.title}
        owner={board.owner}
        onSelectBoard={props.onSelectBoard}
      />
    );
  });
  return <ol className="boards-list">{boardComponent}</ol>;
};

BoardList.propTypes = {
  boards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      owner: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
  onSelectBoard: PropTypes.func,
};

export default BoardList;
