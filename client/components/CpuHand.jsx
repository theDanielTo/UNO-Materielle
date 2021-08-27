import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from './Card';

const useStyles = makeStyles(theme => ({
  card: {
    height: 200,
    width: 140,
    borderRadius: 10
  }
}));

export default function PlayerHand({ side, player }) {
  const classes = useStyles();

  let deg = '';
  let prop = 'marginTop';
  let margin = -140;
  switch (side) {
    case 'left':
      deg = '90deg';
      break;
    case 'top':
      deg = '180deg';
      prop = 'marginLeft';
      margin = -70;
      break;
    case 'right':
      deg = '-90deg';
      break;
    default:
      break;
  }

  return (
    <>
      {
        player.hand.map((card, index) => {
          const src = 'back-of-card';
          return (
            <Grid item key={index}>
              <Card
                src={src} className={classes.card}
                deg={deg} prop={prop} margin={margin}
                draggable="false"
              />
            </Grid>
          );
        })
      }
    </>);
}
