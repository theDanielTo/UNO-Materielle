import React from 'react';
import Grid from '@material-ui/core/Grid';
import BoardCenter from '../components/BoardCenter';
import PlayerHand from '../components/PlayerHand';
import CpuHand from '../components/CpuHand';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
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

export default function Player2View({ onCardClick, playCard, turn, validColor, topCard, playedCards, player1Hand, player2Hand, socket }) {
  const classes = useStyles();
  const curColor = topCard.split('-')[0];

  const drop = e => {
    e.preventDefault();
    e.target.style.background = '';

    const cardSrc = e.dataTransfer.getData('card');
    playCard('Player 2', cardSrc);
  };
  return (
    <>
      <Grid className={classes.columnSm}
        container item xl={8} spacing={0}
      >
        <Grid className={classes.midCards}
          container item xl={12} spacing={1}
          direction="row-reverse"
          justifyContent="center"
          alignItems="center"
        >
          <CpuHand side={'top'} hand={player1Hand} />
        </Grid>

        <Grid className={classes.midRow} id='midRow'
          container item xl={12} spacing={2}
          justifyContent="center"
          alignItems="center"
          onDrop={drop}
          onDragEnter={e => { if (e.target.closest('div').id === 'midRow') e.target.style.background = curColor; }}
          onDragLeave={e => { if (e.target.closest('div').id === 'midRow') e.target.style.background = ''; }}
        >
          <BoardCenter
            player={'Player 2'}
            turn={turn}
            onCardClick={onCardClick}
            cardStyle={classes.card}
            topCard={topCard}
            playedCards={playedCards}
          />
        </Grid>

        <Grid className={classes.midCards}
          container item xl={12} spacing={1}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <PlayerHand
            player={'Player 2'}
            playerHand={player2Hand}
            turn={turn}
            topCard={topCard}
            validColor={validColor}
          />
        </Grid>
      </Grid>
    </>
  );
}
