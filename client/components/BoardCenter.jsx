import React from 'react';
import Grid from '@material-ui/core/Grid';

export default function BoardCenter({ onCardClick, cardStyle, topCard, playedCards }) {
  return (
    <>
      <Grid item id="played-cards">
        <img src={`./images/cards/${topCard}.png`} alt=""
          className={cardStyle} draggable="false"
        />
      </Grid>
      <Grid item onClick={onCardClick}>
        <img src="./images/cards/back-of-card.png" alt="Uno Card"
          className={cardStyle} draggable="false"
          style={{ cursor: 'pointer' }} />
      </Grid>
    </>
  );
}
