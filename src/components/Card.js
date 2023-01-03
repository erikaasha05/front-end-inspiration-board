import React from "react";
import PropTypes from 'prop-types';

const Card = (props) => {
  return (
    <div>
      <p>{props.message}</p>
      <li>
        <p>{props.likesCount}</p>
        <button onClick={() => props.onLikeCard(props.id)}>Like</button>
        <button onClick={() => props.onDeleteCard(props.id)}>Delete</button>
      </li>
    </div>
  );
};

Card.propTypes = {
  id: PropTypes.number.isRequired,
  likesCount: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  onDeleteCard: PropTypes.func.isRequired,
  onLikeCard: PropTypes.func.isRequired,
};

export default Card;