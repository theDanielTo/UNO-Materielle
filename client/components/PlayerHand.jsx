import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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
  let prop = '';
  let margin = -70;
  switch (side) {
    case 'left':
      deg = '90deg';
      prop = 'marginTop';
      margin = -140;
      break;
    case 'top':
      deg = '180deg';
      prop = 'marginLeft';
      break;
    case 'right':
      deg = '-90deg';
      prop = 'marginTop';
      margin = -140;
      break;
    default:
      deg = '0deg';
      prop = 'marginLeft';
      break;
  }

  return (
    <>
      {
        player.hand.map((card, index) => {
          const src = `${card.color}-${card.type}`;
          return (
            <Grid item key={index}>
              <img src={`./images/${src}.png`} alt={src}
                className={classes.card} draggable
                style={{ transform: 'rotate(' + deg + ')', [prop]: margin }} />
            </Grid>
          );
        })
      }
    </>);
}
