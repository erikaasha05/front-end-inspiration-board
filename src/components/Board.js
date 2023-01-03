import React from 'react';
import PropTypes from 'prop-types';

const Board = (props) => {
  return (
    <li>
      <button onClick={() => props.onSelectBoard(props.id)}>{props.title}</button>
    </li>
  );
};

Board.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  onSelectBoard: PropTypes.func.isRequired,
};

export default Board;