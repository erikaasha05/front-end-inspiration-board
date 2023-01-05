import React, {useState} from "react";

const kDefaultFormState = {
  message: ""
};

const NewCardForm = ({handleCardSubmit}) => {
  
  const [cardData, setCardData] = useState(kDefaultFormState);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleCardSubmit(cardData);
    setCardData(kDefaultFormState);
  };
  
  const handleCardFormData = (event) => {
    const dataValue = event.target.value;
    const dataName = event.target.name;

    const newCardData = {...cardData, [dataName]: dataValue}
    setCardData(newCardData);
  };

  const invalidInput = cardData.message ? "" : "empty"

  return (
    <section>
      <h2>Create a New Card</h2>
      <form className="new-card-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="message">Message</label>
          <input
            className={invalidInput}
            type="text" 
            id="message" 
            name="message" 
            value={cardData.message} 
            onChange={handleCardFormData} 
          />
          <p>
            Preview: {cardData.message}
          </p>
        </div>
        <div>
          <input type="submit" value="Add a Card" />
        </div>
      </form>
    </section>
  )
};

export default NewCardForm;