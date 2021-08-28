import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import BoardCenter from '../components/BoardCenter';
import PlayerHand from '../components/PlayerHand';
import CpuHand from '../components/CpuHand';
import gameStart from '../lib/gameStart';
import parseRoute from '../lib/parse-route';
import { io } from 'socket.io-client';

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

// NUMBER CODES FOR ACTION CARDS
// SKIP - 404
// DRAW 2 - 252
// WILD - 300
// DRAW 4 WILD - 600

let socket;
const ENDPOINT = 'http://localhost:3000';
const NUM_PLAYERS = 2;

export default function GameBoard() {
  const classes = useStyles();
  const players = gameStart(NUM_PLAYERS);
  const route = parseRoute(window.location.hash);
  const gameId = route.params.get('game-id');
  const username = JSON.parse(localStorage.getItem('mintbean-user'));

  const [room, setRoom] = useState(gameId);
  const [roomFull, setRoomFull] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    const connectionOptions = {
      forceNew: true,
      reconnectionAttempts: 'Infinity',
      timeout: 10000,
      transports: ['websocket']
    };
    socket = io.connect(ENDPOINT, connectionOptions);

    socket.emit('join', { username, room }, error => {
      if (error) { setRoomFull(true); }
    });

    return function cleanup() {
      socket.emit('disconnect');
      socket.off();
    };
  }, []);

  const [topCard, setTopCard] = useState('mint-bean');
  const [playedCards, setPlayedCards] = useState([]);
  const [player1Hand, setPlayer1Hand] = useState(players[0].hand);
  const [player2Hand, setPlayer2Hand] = useState(players[1].hand);

  const [gameOver, setGameOver] = useState(true);
  const [winner, setWinner] = useState('');
  const [turn, setTurn] = useState('');

  // const [drawCardPile, setDrawCardPile] = useState([]);

  useEffect(() => {
    socket.on('initGameState', ({ gameOver, turn, player1Hand, player2Hand, topCard, playedCards, drawCardPile }) => {
      setGameOver(gameOver);
      setTurn(turn);
      setPlayer1Hand(player1Hand);
      setPlayer2Hand(player2Hand);
      setTopCard(topCard);
      setPlayedCards(playedCards);
      setDrawCardPile(drawCardPile);
    });

    socket.on('updateGameState', ({ gameOver, winner, turn, player1Hand, player2Hand, topCard, playedCards, drawCardPile }) => {
      gameOver && setGameOver(gameOver);
      gameOver === true;
      winner && setWinner(winner);
      turn && setTurn(turn);
      player1Hand && setPlayer1Hand(player1Hand);
      player2Hand && setPlayer2Hand(player2Hand);
      topCard && setTopCard(topCard);
      playedCards && setPlayedCards(playedCards);
      drawCardPile && setDrawCardPile(drawCardPile);
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });

    socket.on('currentUserData', ({ name }) => {
      setCurrentUser(name);
    });
  }, []);

  const drop = e => {
    e.preventDefault();
    e.target.style.background = '';

    const cardId = e.dataTransfer.getData('card-id');
    const cardSrc = e.dataTransfer.getData('card');
    const card = document.getElementById(cardId);

    setPlayedCards(prevCards => [...prevCards, cardSrc]);
    setTopCard(cardSrc);
    setPlayer1Hand(player1Hand.filter(c => `${c.color}-${c.type}` !== card.alt));
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={0} className={classes.columnSm}
        onDragOver={e => e.preventDefault()}
      >

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
            <CpuHand side={'top'} player={players[1]} />
          </Grid>

          <Grid className={classes.midRow} id='midRow'
            container item xl={12} spacing={2}
            justifyContent="center"
            alignItems="center"
            onDrop={drop}
            onDragEnter={e => { if (e.target.closest('div').id === 'midRow') e.target.style.background = 'purple'; }}
            onDragLeave={e => { if (e.target.closest('div').id === 'midRow') e.target.style.background = ''; }}
          >
            <BoardCenter
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
            <PlayerHand player1Hand={player1Hand} />
          </Grid>
        </Grid>

        {/* <Grid className={classes.columnSm}
          container item xl={2} spacing={0}
          direction="column-reverse"
          justifyContent="center"
          alignItems="center"
        >
          <CpuHand side={'right'} player={players[3]} />
        </Grid> */}

      </Grid>
    </div >
  );
}
