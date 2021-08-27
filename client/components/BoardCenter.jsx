import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';

export default function BoardCenter(props) {
  const [topCard, setTopCard] = useState('mint-bean');
  const [playedCards, setPlayedCards] = useState([]);
  const { cardStyle, player } = props;

  const drop = e => {
    e.preventDefault();

    const cardId = e.dataTransfer.getData('card-id');
    const cardSrc = e.dataTransfer.getData('card');

    if (e.target.closest('div').id === 'played-cards') {
      setPlayedCards(prevCards => [...prevCards, cardSrc]);
      setTopCard(cardSrc);
      const card = document.getElementById(cardId);
      player.playCard(card.alt);
    }
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
        id="played-cards"
        onDrop={drop}
        onDragOver={dragOver}
        onClick={displayPlayedCards}
      >
        <img src={`./images/${topCard}.png`} alt=""
          className={cardStyle} draggable="false"
        />
      </Grid>
      <Grid item>
        <img src="./images/back-of-card.png" alt="Uno Card"
          className={cardStyle} draggable="false"
          style={{ cursor: 'pointer' }} />
      </Grid>
    </>
  );
}
