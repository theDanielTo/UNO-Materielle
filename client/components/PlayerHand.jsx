import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from './Card';

const useStyles = makeStyles(theme => ({
  card: {
    height: 200,
    width: 140,
    borderRadius: 10,
    marginLeft: -70
  }
}));

export default function PlayerHand({ playerHand, turn, player }) {
  const classes = useStyles();
  const draggable = turn === player ? 'true' : 'false';
  const cursor = turn === player ? 'pointer' : 'not-allowed';

  return (
    <>
      {
        playerHand.map((card, index) => {
          const src = `${card.color}-${card.type}`;
          return (
            <Grid item key={index}>
              <Card
                src={src}
                className={classes.card}
                draggable={draggable}
                cursor={cursor}
              />
            </Grid>
          );
        })
      }
    </>);
}
