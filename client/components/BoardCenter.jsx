import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';

export default function BoardCenter(props) {
  const [topCard, setTopCard] = useState('');
  const [playedCards, setPlayedCards] = useState([]);
  const { cardStyle } = props;

  const drop = e => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('card_id');
    const cardSrc = e.dataTransfer.getData('card');
    setPlayedCards(prevCards => [...prevCards, cardSrc]);
    setTopCard(cardSrc);

    const card = document.getElementById(cardId);
    card.style.display = 'block';
  };

  const dragOver = e => {
    e.preventDefault();
  };

  const displayPlayedCards = () => {
    // eslint-disable-next-line no-console
    console.log(playedCards);
  };

  return (
    <>
      <Grid item
        onDrop={drop}
        onDragOver={dragOver}
        onClick={displayPlayedCards}
      >
        <img src={`./images/${topCard}.png`} alt=""
          className={cardStyle} draggable="false"
          id="played-cards" />
      </Grid>
      <Grid item>
        <img src="./images/back-of-card.png" alt="Uno Card"
          className={cardStyle} draggable="false"
          style={{ cursor: 'pointer' }} />
      </Grid>
    </>
  );
}
