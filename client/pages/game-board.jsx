import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import BoardCenter from '../components/BoardCenter';
import PlayerHand from '../components/PlayerHand';
import CpuHand from '../components/CpuHand';
import gameStart from '../lib/gameStart';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#151224',
    color: '#DDE0EF',
    height: '100vh',
    maxWidth: '1200px',
    fontSize: '1.5rem'
  },
  columnSm: {
    height: '100%'
  },
  midRow: {
    height: '50%'
  },
  midCards: {
    height: '25%'
  },
  card: {
    height: 210,
    width: 150,
    borderRadius: 10
  }
}));

const NUM_PLAYERS = 4;

export default function GameBoard() {
  const classes = useStyles();
  const players = gameStart(NUM_PLAYERS);

  return (
    <div className={classes.root}>
      <Grid container spacing={0} className={classes.columnSm}
        onDragOver={e => e.preventDefault()}>

        <Grid className={classes.columnSm}
          container item xl={2} spacing={0}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <CpuHand side={'left'} player={players[0]}/>
        </Grid>

        <Grid className={classes.columnSm}
          container item xl={8} spacing={0}
        >
          <Grid className={classes.midCards}
            container item xl={12} spacing={1}
            direction="row-reverse"
            justifyContent="center"
            alignItems="center"
          >
            <CpuHand side={'top'} player={players[1]} />
          </Grid>

          <Grid className={classes.midRow}
            container item xl={12} spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <BoardCenter cardStyle={classes.card}/>
          </Grid>

          <Grid className={classes.midCards}
            container item xl={12} spacing={1}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <PlayerHand side={'bottom'} player={players[2]} />
          </Grid>
        </Grid>

        <Grid className={classes.columnSm}
          container item xl={2} spacing={0}
          direction="column-reverse"
          justifyContent="center"
          alignItems="center"
        >
          <CpuHand side={'right'} player={players[3]} />
        </Grid>

      </Grid>
    </div >
  );
}
