import React from 'react';
import PropTypes from 'prop-types';
import Board from './Board';

const BoardList = (props) => {
  return (
    <section>
      <h2>Boards</h2>
      <ol className="boards-list">
        {props.boardData.map((board) => (
          <Board
            key={board.id}
            id={board.id}
            title={board.title}
            owner={board.owner}
            onSelectBoard={props.onSelectBoard}
          />
        ))}
      </ol>
    </section>
  );
};

BoardList.propTypes = {
  boardData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    owner: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })),
  onSelectBoard: PropTypes.func.isRequired,
};

export default BoardList;
