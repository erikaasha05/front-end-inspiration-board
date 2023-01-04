import React from "react";
import PropTypes from "prop-types";
import Board from "./Board";
import "./BoardList.css";

const BoardList = (props) => {
  // console.log(props.boards);
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
  return (
    <section>
      <h2>Boards</h2>
      <ol className="boards-list">{boardComponent}</ol>
    </section>
  );
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
