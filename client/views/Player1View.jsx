import React from 'react';
import Grid from '@material-ui/core/Grid';
import BoardCenter from '../components/BoardCenter';
import PlayerHand from '../components/PlayerHand';
import CpuHand from '../components/CpuHand';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  midRow: {
    paddingTop: '1.3em',
    paddingBottom: '1.3em'
  },
  midCards: {
    paddingTop: '1.3em'
  },
  card: {
    height: 200,
    width: 140,
    borderRadius: 10
  }
}));

export default function Player1View({ onCardClick, playCard, turn, curColor, topCard, playedCards, player1Hand, player2Hand, users, notification }) {
  const classes = useStyles();

  const drop = e => {
    e.preventDefault();
    e.target.style.background = '';

    const cardSrc = e.dataTransfer.getData('card');
    playCard('Player 1', cardSrc);
  };

  return (
    <Grid className={classes.columnSm}
      container item xl={12} md={12} sm={12} spacing={0}
    >
      <Grid className={classes.midCards}
        container item xl={12} md={12} sm={12} spacing={1}
        direction="row-reverse"
        justifyContent="center"
        alignItems="center"
      >
        <CpuHand side={'top'} hand={player2Hand} />
      </Grid>

      <p>{`Player 2: ${users[1].username}`}</p>

      <Grid className={classes.midRow + ' mid'}
        container item xl={12} lg={12} md={12} sm={12} spacing={8}
        justifyContent="center"
        alignItems="center"
        onDrop={drop}
        onDragEnter={e => { if (e.target.classList.contains('mid')) e.target.style.background = curColor; }}
        onDragLeave={e => { if (e.target.classList.contains('mid')) e.target.style.background = ''; }}
      >
        <BoardCenter
          player={'Player 1'}
          turn={turn}
          onCardClick={onCardClick}
          cardStyle={classes.card}
          topCard={topCard}
          playedCards={playedCards}
        />
      </Grid>

      <p>{`Player 1: ${users[0].username}`}</p>

      <Grid className={classes.midCards}
        container item xl={12} md={12} sm={12} spacing={1}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <PlayerHand
          player={'Player 1'}
          playerHand={player1Hand}
          turn={turn}
          topCard={topCard}
          curColor={curColor}
        />
      </Grid>
    </Grid>
  );
}
