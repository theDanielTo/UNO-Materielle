import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import BoardCenter from '../components/BoardCenter';
import PlayerHand from '../components/PlayerHand';
import CpuHand from '../components/CpuHand';
import { makeStyles } from '@material-ui/core/styles';
// import Chat from '../components/chat';
// import MessageIcon from '@material-ui/icons/Message';
// import { IconButton, Drawer } from '@material-ui/core';
// import { Drawer } from '@material-ui/core';

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

export default function Player1View({ onCardClick, playCard, turn, validColor, topCard, playedCards, player1Hand, player2Hand, socket }) {
  const classes = useStyles();
  const curColor = topCard.split('-')[0];

  const drop = e => {
    e.preventDefault();
    e.target.style.background = '';

    const cardSrc = e.dataTransfer.getData('card');
    playCard('Player 1', cardSrc);
  };
  // const [mobileOpen, setMobileOpen] = useState(false);

  // const handleDrawerToggle = () => {
  //   setMobileOpen(!mobileOpen);
  // };

  // const drawer = (
  //   <Chat socket={socket} />
  // );

  return (
    <>
      {/* <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle} >
        <MessageIcon className={classes.message} />
      </IconButton>
      <Drawer
        anchor='right'
        className={classes.drawer}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        classes={{
          paper: classes.drawerPaper
        }}
        ModalProps={{
          keepMounted: true
        }}
      >
        {drawer}
      </Drawer> */}
      {/* <Grid className={classes.columnSm}
          container item xl={2} spacing={0}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <CpuHand side={'left'} player={players[0]}/>
        </Grid> */}

      <Grid className={classes.columnSm}
        container item xl={8} spacing={0}
      >
        <Grid className={classes.midCards}
          container item xl={12} spacing={1}
          direction="row-reverse"
          justifyContent="center"
          alignItems="center"
        >
          <CpuHand side={'top'} hand={player2Hand} />
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
            player={'Player 1'}
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
            player={'Player 1'}
            playerHand={player1Hand}
            turn={turn}
            topCard={topCard}
            validColor={validColor}
          />
        </Grid>
      </Grid>
      {/* <Chat socket={socket}/> */}
      {/* <Grid className={classes.columnSm}
          container item xl={2} spacing={0}
          direction="column-reverse"
          justifyContent="center"
          alignItems="center"
        >
          <CpuHand side={'right'} player={players[3]} />
        </Grid> */}
    </>
  );
}
