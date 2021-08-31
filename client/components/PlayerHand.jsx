import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from './Card';

export default function PlayerHand({ playerHand, turn, player, curColor, topCard }) {
  const topType = topCard.split('-')[1];

  return (
    <>
      {
        playerHand.map((card, index) => {
          const src = `${card.color}-${card.type}`;
          const valid = (
            curColor === card.color ||
            topType === card.type ||
            card.color === 'black' ||
            card.color === 'mint'
          );
          const draggable = (turn === player && valid) ? 'true' : 'false';
          const cursor = (turn === player && valid) ? 'pointer' : 'not-allowed';
          return (
            <Grid item key={index}>
              <Card
                src={src}
                draggable={draggable}
                cursor={cursor}
                valid={valid}
              />
            </Grid>
          );
        })
      }
    </>);
}
