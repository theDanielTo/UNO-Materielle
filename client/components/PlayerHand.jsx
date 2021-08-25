import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  card: {
    height: 140,
    width: 100
  }
}));

export default function PlayerHand({ player }) {
  const classes = useStyles();

  let deg = '';
  switch (player) {
    case 'left':
      deg = '90deg';
      break;
    case 'top':
      deg = '180deg';
      break;
    case 'right':
      deg = '-90deg';
      break;
    default:
      deg = '0deg';
      break;
  }

  return (
    <>
    {
        [0, 1, 2, 3, 4].map(value => {
          return (
          <Grid item key={value} >
              {/* <Paper className={classes.card} draggable
              style={{ transform: 'rotate(' + deg + ')' }}>
              {value}
            </Paper> */}
            <img src="./images/uno-blue.png" alt=""
                className={classes.card} draggable
              style={{ transform: 'rotate(' + deg + ')' }} />
          </Grid>
          );
        })
      }
    </>
  );
}
