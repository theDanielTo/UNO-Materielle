import React from 'react';
import Grid from '@material-ui/core/Grid';

export default function BoardCenter({ player, turn, onCardClick, cardStyle, topCard, playedCards }) {
  const pEvents = (player === turn)
    ? 'auto'
    : 'none';
  const cursor = (turn === player) ? 'pointer' : 'not-allowed';

  return (
    <>
      <Grid item id="played-cards">
        <img src={`./images/cards/${topCard}.png`} alt=""
          className={cardStyle} draggable="false"
        />
      </Grid>
      <Grid item onClick={onCardClick} style={{ pointerEvents: pEvents }}>
        <img src="./images/cards/back-of-card.png" alt="Uno Card"
          className={cardStyle} draggable="false"
          style={{ cursor: cursor }} />
      </Grid>
    </>
  );
}
