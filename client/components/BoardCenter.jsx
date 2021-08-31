import React from 'react';
import Grid from '@material-ui/core/Grid';

export default function BoardCenter({ player, turn, onCardClick, cardStyle, topCard, playedCards }) {
  const pEvents = (player === turn)
    ? 'auto'
    : 'none';
  const cursor = (turn === player) ? 'pointer' : 'not-allowed';

  return (
    <>
      <Grid item id="played-cards" className="mid">
        <img src={`./images/cards/${topCard}.png`} alt=""
          className={cardStyle + ' mid'} draggable="false"
        />
      </Grid>
      <Grid item
        className="mid"
        onClick={onCardClick}
        style={{ pointerEvents: pEvents }}>
        <img src="./images/cards/back-of-card.png" alt="Uno Card"
          className={cardStyle + ' mid'} draggable="false"
          style={{ cursor: cursor }} />
      </Grid>
    </>
  );
}
