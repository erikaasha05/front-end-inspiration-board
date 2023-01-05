import React from "react";
import PropTypes from 'prop-types';
import "./Card.css";

const Card = (props) => {
  return (
    <div className="cards-item">
      <p>{props.message}</p>
      <li className="cards-options">
        <p className="likes-count">{props.likesCount}</p>
        <button className="like" onClick={() => props.onLikeCard(props.id)}>❤️</button>
        <button className="card-item-remove_button" onClick={() => props.onDeleteCard(props.id)}>❌</button>
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