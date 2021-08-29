/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Player, UnoCards, shuffleDeck, parseRoute } from '../lib';
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

let socket;
const ENDPOINT = 'http://localhost:3000';
const NUM_PLAYERS = 2;
const HAND_SIZE = 7;
// indices for 'skip', 'reverse', 'draw2'
const INVALID_ACTION_INDICES = [
  19, 20, 21, 22, 23, 24,
  44, 45, 46, 47, 48, 49,
  69, 70, 71, 72, 73, 74
];

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

  const [validColor, setValidColor] = useState('');
  const [topCard, setTopCard] = useState('mint-bean');
  const [playedCards, setPlayedCards] = useState([]);
  const [drawCardPile, setDrawCardPile] = useState([]);

  const [player1Hand, setPlayer1Hand] = useState([]);
  const [player2Hand, setPlayer2Hand] = useState([]);

  useEffect(() => {
    // const { players, shuffledDeck, topCard } = gameStart(NUM_PLAYERS);
    const players = [];
    const shuffledDeck = shuffleDeck(UnoCards);

    for (let i = 0; i < NUM_PLAYERS; i++) {
      players.push(new Player(i + 1, shuffledDeck.splice(0, HAND_SIZE)));
    }

    let randomIndex = Math.floor(Math.random() * 93);
    while (INVALID_ACTION_INDICES.includes(randomIndex)) {
      randomIndex = Math.floor(Math.random() * 93);
    }

    const topColor = shuffledDeck[randomIndex].color;
    const topType = shuffledDeck[randomIndex].type;
    const topCard = `${topColor}-${topType}`;

    const playedCards = shuffledDeck.splice(randomIndex, 1);

    socket.emit('initGameState', {
      gameOver: false,
      turn: 'Player 1',
      player1Hand: [...players[0].hand],
      player2Hand: [...players[1].hand],
      validColor: topCard.split('-')[0],
      topCard: topCard,
      playedCards: [...playedCards],
      drawCardPile: [...shuffledDeck]
    });
  }, []);

  useEffect(() => {
    socket.on('initGameState', ({
      gameOver, turn, player1Hand, player2Hand,
      validColor, topCard, playedCards, drawCardPile
    }) => {
      setGameOver(gameOver);
      setTurn(turn);
      setPlayer1Hand(player1Hand);
      setPlayer2Hand(player2Hand);
      setValidColor(validColor);
      setTopCard(topCard);
      setPlayedCards(playedCards);
      setDrawCardPile(drawCardPile);
    });

    socket.on('updateGameState', ({
      gameOver, winner, turn, player1Hand, player2Hand,
      validColor, topCard, playedCards, drawCardPile
    }) => {
      gameOver && setGameOver(gameOver);
      winner && setWinner(winner);
      turn && setTurn(turn);
      player1Hand && setPlayer1Hand(player1Hand);
      player2Hand && setPlayer2Hand(player2Hand);
      validColor && setValidColor(validColor);
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

  const checkGameOver = hand => {
    return hand.length === 1;
  };

  const checkWinner = (hand, player) => {
    return hand.length === 1 ? player : '';
  };

  const playCard = (player, card) => {
    let cardColor = card.split('-')[0];
    if (cardColor === 'black') {
      cardColor = prompt('Enter a color (red/green/blue/yellow)').toLowerCase();
    }

    switch (card) {
      case card.type === '0':
      case card.type === '1':
      case card.type === '2':
      case card.type === '3':
      case card.type === '4':
      case card.type === '5':
      case card.type === '6':
      case card.type === '7':
      case card.type === '8':
      case card.type === '9':

    }

    if (player === 'Player 1') {
      socket.emit('updateGameState', {
        gameOver: checkGameOver(player1Hand),
        winner: checkWinner(player1Hand, 'Player 1'),
        turn: 'Player 2',
        playedCards: [...playedCards, card],
        player1Hand: player1Hand.filter(c => `${c.color}-${c.type}` !== card),
        validColor: cardColor,
        topCard: card,
        drawCardPile: drawCardPile
      });
    } else {
      socket.emit('updateGameState', {
        gameOver: checkGameOver(player2Hand),
        winner: checkWinner(player2Hand, 'Player 2'),
        turn: 'Player 1',
        playedCards: [...playedCards, card],
        player2Hand: player2Hand.filter(c => `${c.color}-${c.type}` !== card),
        validColor: cardColor,
        topCard: card,
        drawCardPile: drawCardPile
      });
    }
  };

  const drawCard = () => {
    const cardDrawnBy = turn;
    const copiedDrawCardPile = [...drawCardPile];
    const drawCard = copiedDrawCardPile.pop();
    if (cardDrawnBy === 'Player 1') {
      socket.emit('updateGameState', {
        player1Hand: [...player1Hand.slice(0, player1Hand.length), drawCard, ...player1Hand.slice(player1Hand.length)],
        drawCardPile: [...copiedDrawCardPile]
      });
    } else {
      socket.emit('updateGameState', {
        player2Hand: [...player2Hand.slice(0, player2Hand.length), drawCard, ...player2Hand.slice(player2Hand.length)],
        drawCardPile: [...copiedDrawCardPile]
      });
    }
  };

  return (
    <div className={classes.root}>
      <div className='topInfo'>
        <h1>Game Code: {room}</h1>
        <h4>{turn + '\'s turn'}</h4>
      </div>

      { users.length === 1 && currentUser === 'Player 1' &&
        <h1>Waiting for another player to join the game.</h1>
      }

      { users.length === 2 && <>
        { gameOver
          ? <div>{winner !== '' && <><h1>GAME OVER</h1><h2>{winner} wins!</h2></>}</div>

          : <Grid container spacing={0}
              className={classes.columnSm}
              onDragOver={e => e.preventDefault()}
            >
              { currentUser === 'Player 1' &&
              <Player1View playCard={playCard} onCardClick={drawCard}
                validColor={validColor} topCard={topCard} playedCards={playedCards}
                player1Hand={player1Hand} player2Hand={player2Hand}
                turn={turn} username={username}
              />}
              { currentUser === 'Player 2' &&
              <Player2View playCard={playCard} onCardClick={drawCard}
                validColor={validColor} topCard={topCard} playedCards={playedCards}
                player1Hand={player1Hand} player2Hand={player2Hand}
                turn={turn} username={username}
              />}
            </Grid>
        }
        </>
      }
    </div>
  );
}
