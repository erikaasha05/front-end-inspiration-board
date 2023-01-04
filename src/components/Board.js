import React from "react";
import PropTypes from "prop-types";
import "./Board.css";

const Board = (props) => {
  return (
    <li>
      <button className="board-name">
        {props.title} - {props.owner}
      </button>
    </li>
  );
};

Board.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  onSelectBoard: PropTypes.func,
};

export default Board;
