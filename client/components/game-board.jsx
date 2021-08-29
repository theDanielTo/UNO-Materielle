import React, { useState, useEffect } from 'react';
import gameStart from '../lib/game-start';
import parseRoute from '../lib/parse-route';
import Player1View from '../views/Player1View';
import Player2View from '../views/Player2View';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
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
      socket.emit('disconnection');
      socket.off();
    };
  }, []);

  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState('');
  const [turn, setTurn] = useState('');

  const [topCard, setTopCard] = useState('mint-bean');
  const [playedCards, setPlayedCards] = useState([]);
  const [drawCardPile, setDrawCardPile] = useState([]);

  const [player1Hand, setPlayer1Hand] = useState([]);
  const [player2Hand, setPlayer2Hand] = useState([]);

  useEffect(() => {
    const { players, shuffledDeck } = gameStart(NUM_PLAYERS);
    setPlayer1Hand([...players[0].hand]);
    setPlayer2Hand([...players[1].hand]);

    let startingCardIndex;
    while (true) {
      startingCardIndex = Math.floor(Math.random() * 100);
      if (shuffledDeck[startingCardIndex].color === 'black' ||
        shuffledDeck[startingCardIndex].type === 'skip' ||
        shuffledDeck[startingCardIndex].type === 'reverse' ||
        shuffledDeck[startingCardIndex].type === 'draw2') {
        continue;
      } else break;
    }

    const playedCards = shuffledDeck.splice(startingCardIndex, 1);

    const drawCardPile = shuffledDeck;

    const topCard = `${shuffledDeck[startingCardIndex].color}-${shuffledDeck[startingCardIndex].type}`;

    socket.emit('initGameState', {
      gameOver: false,
      turn: players[0].id,
      player1Hand: [...players[0].hand],
      player2Hand: [...players[1].hand],
      topCard: topCard,
      playedCards: [...playedCards],
      drawCardPile: [...drawCardPile]
    });
  }, []);

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

  const playCard = (player, cardSrc, card) => {
    setPlayedCards(prevCards => [...prevCards, cardSrc]);
    setTopCard(cardSrc);
    if (player === 'Player 1') {
      setPlayer1Hand(player1Hand.filter(c => `${c.color}-${c.type}` !== card.alt));
    } else {
      setPlayer2Hand(player2Hand.filter(c => `${c.color}-${c.type}` !== card.alt));
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={0}
        className={classes.columnSm}
        onDragOver={e => e.preventDefault()}
      >
        {currentUser === 'Player 1' &&
          <Player1View playCard={playCard}
            topCard={topCard} playedCards={playedCards}
            player1Hand={player1Hand} player2Hand={player2Hand}
          />}
        {currentUser === 'Player 2' &&
          <Player2View playCard={playCard}
            topCard={topCard} playedCards={playedCards}
            player1Hand={player1Hand} player2Hand={player2Hand}
          />}
      </Grid>
    </div>
  );
}
