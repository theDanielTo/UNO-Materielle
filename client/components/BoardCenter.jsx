import React from 'react';
import Grid from '@material-ui/core/Grid';

export default function BoardCenter({ cardStyle, topCard, playedCards }) {
  const displayPlayedCards = () => {
    // eslint-disable-next-line no-console
    console.log(playedCards);
  };

  return (
    <>
      <Grid item
        id="played-cards"
        onClick={displayPlayedCards}
      >
        <img src={`./images/cards/${topCard}.png`} alt=""
          className={cardStyle} draggable="false"
        />
      </Grid>
      <Grid item>
        <img src="./images/cards/back-of-card.png" alt="Uno Card"
          className={cardStyle} draggable="false"
          style={{ cursor: 'pointer' }} />
      </Grid>
    </>
  );
}
