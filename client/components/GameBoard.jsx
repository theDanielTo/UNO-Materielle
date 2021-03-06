/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Player, shuffleDeck, parseRoute } from '../lib';
import UnoCards from '../lib/UnoCards';
import Player1View from '../views/Player1View';
import Player2View from '../views/Player2View';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, IconButton, Drawer, Button, Box } from '@material-ui/core';
import MessageIcon from '@material-ui/icons/Message';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#151224',
    color: '#DDE0EF',
    minHeight: '100vh',
    fontSize: '1.5rem'
  },
  topInfo: {
    display: 'flex',
    justifyContent: 'center',
    color: 'yellow'
  },
  chatIcon: {
    position: 'fixed',
    bottom: 100,
    right: 25,
    fontSize: '3rem'
  },
  chatIconShadow: {
    color: '#151224',
    backgroundColor: 'yellow',
    boxShadow: '0 0 5px 5px yellow'
  },
  chatBox: {
    height: '100%',
    width: '400px',
    margin: 0,
    paddingBottom: '3rem'
  },
  messagesContainer: {
    height: '100%',
    padding: 10
  },
  form: {
    background: 'rgba(0, 0, 0, 0.15)',
    padding: '0.25rem',
    position: 'fixed',
    bottom: 0,
    right: 0,
    display: 'flex',
    height: '3rem',
    width: '400px'
  },
  input: {
    border: 'none',
    padding: '0 1rem',
    flexGrow: '1',
    borderRadius: '2rem',
    margin: '0.25rem',
    width: '300px'
  },
  sendButton: {
    background: '#333',
    border: 'none',
    padding: '0 1rem',
    margin: '0.25rem',
    borderRadius: '3px',
    outline: 'none',
    color: '#fff'
  },
  message: {
    marginTop: 10,
    padding: '10px 15px',
    width: 'fit-content',
    borderRadius: 10,
    fontSize: '1.2rem',
    overflowWrap: 'break-word'
  },
  messageP1: {
    background: 'linear-gradient(#e66465, #38008c)',
    color: '#ffffff'
  },
  messageP2: {
    background: 'linear-gradient(#cdb4db, #a2d2ff)',
    color: '#212529'
  },
  username: {
    listStyleType: 'none',
    color: '#666666',
    marginLeft: 15
  },
  quitBtn: {
    position: 'fixed',
    bottom: 25,
    right: 25,
    fontSize: '1.2rem'
  }
}));

let socket;
// const ENDPOINT = 'http://localhost:3000';
const ENDPOINT = 'https://mintbean-uno.herokuapp.com/';
const NUM_PLAYERS = 2;
const HAND_SIZE = 7;
// indices for 'skip', 'reverse', 'draw2', black cards
const INVALID_ACTION_INDICES = [
  19, 20, 21, 22, 23, 24,
  44, 45, 46, 47, 48, 49,
  69, 70, 71, 72, 73, 74,
  94, 95, 96, 97, 98, 99,
  100, 101, 102, 103,
  104, 105, 106, 107
];

export default function GameBoard() {
  const classes = useStyles();

  const route = parseRoute(window.location.hash);
  const gameId = route.params.get('game-id');

  const [room, setRoom] = useState(gameId);
  const [roomFull, setRoomFull] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
  const [username, setUsername] = useState(() => {
    return JSON.parse(localStorage.getItem('mintbean-user')).username;
  });

  const [chatDrawerOpen, setChatDrawerOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState(false);

  // Socket init
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

    return () => {
      socket.emit('disconnection', gameId);
      socket.off();
    };
  }, []);

  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState('');
  const [turn, setTurn] = useState('');

  const [curColor, setCurColor] = useState('');
  const [curType, setCurType] = useState('');
  const [topCard, setTopCard] = useState('mint-bean');
  const [notification, setNotification] = useState('');
  const [playedCards, setPlayedCards] = useState([]);
  const [drawCardPile, setDrawCardPile] = useState([]);

  const [player1Hand, setPlayer1Hand] = useState([]);
  const [player2Hand, setPlayer2Hand] = useState([]);

  // Game pieces init (player hands, deck, top card)
  useEffect(() => {
    const players = [];
    const shuffledDeck = shuffleDeck(UnoCards);

    for (let i = 0; i < NUM_PLAYERS; i++) {
      players.push(new Player(i + 1, shuffledDeck.splice(0, HAND_SIZE)));
    }

    let randomIndex = Math.floor(Math.random() * 108);
    while (INVALID_ACTION_INDICES.includes(randomIndex)) {
      randomIndex = Math.floor(Math.random() * 108);
    }

    const topColor = shuffledDeck[randomIndex]
      ? shuffledDeck[randomIndex].color
      : 'mint';
    const topType = shuffledDeck[randomIndex]
      ? shuffledDeck[randomIndex].type
      : 'bean';
    const topCard = `${topColor}-${topType}`;

    const playedCards = shuffledDeck.splice(randomIndex, 1);

    socket.emit('initGameState', {
      gameOver: false,
      turn: 'Player 1',
      player1Hand: [...players[0].hand],
      player2Hand: [...players[1].hand],
      curColor: topColor,
      curType: topType,
      topCard: topCard,
      playedCards: [...playedCards],
      drawCardPile: [...shuffledDeck]
    });
  }, []);

  // Game state events init
  useEffect(() => {
    socket.on('initGameState', ({
      gameOver, turn, player1Hand, player2Hand,
      curColor, curType, topCard, playedCards, drawCardPile
    }) => {
      setGameOver(gameOver);
      setTurn(turn);
      setPlayer1Hand(player1Hand);
      setPlayer2Hand(player2Hand);
      setCurColor(curColor);
      setCurType(curType);
      setTopCard(topCard);
      setPlayedCards(playedCards);
      setDrawCardPile(drawCardPile);
    });

    socket.on('updateGameState', ({
      gameOver, winner, turn, player1Hand, player2Hand,
      curColor, curType, topCard, playedCards, drawCardPile
    }) => {
      gameOver && setGameOver(gameOver);
      winner && setWinner(winner);
      turn && setTurn(turn);
      player1Hand && setPlayer1Hand(player1Hand);
      player2Hand && setPlayer2Hand(player2Hand);
      curColor && setCurColor(curColor);
      curType && setCurType(curType);
      topCard && setTopCard(topCard);
      playedCards && setPlayedCards(playedCards);
      drawCardPile && setDrawCardPile(drawCardPile);
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });

    socket.on('currentUserData', ({ player, username }) => {
      setCurrentUser(player);
      setUsername(username);
    });

    socket.on('message', message => {
      setMessages(messages => [...messages, message]);
      const chatBody = document.getElementById('chat-body');
      chatBody.scrollTop = chatBody.scrollHeight;
    });
  }, []);

  useEffect(() => {
    if (
      curType === 'reverse' ||
      curType === 'skip' ||
      curType === 'draw2' ||
      curType === 'wild' ||
      curType === 'draw4'
    ) {
      setNotification(`${turn}'s turn. ${curType} was played!`);
    } else setNotification(`${turn}'s turn.`);
  }, [curType]);

  // Utility functions
  const checkGameOver = hand => {
    return hand.length === 1;
  };

  const checkWinner = (hand, player) => {
    return hand.length === 1 ? player : '';
  };

  // Game driver
  const playCard = (player, card) => {
    let cardColor = card.split('-')[0];
    const cardType = card.split('-')[1];

    if (cardColor === 'black') {
      cardColor = prompt('Enter a color (red/green/blue/yellow)').toLowerCase();
      if (cardType === 'draw4') {
        if (player === 'Player 1') {
          const copiedDeck = [...drawCardPile];
          const card1 = copiedDeck.pop();
          const card2 = copiedDeck.pop();
          const card3 = copiedDeck.pop();
          const card4 = copiedDeck.pop();
          socket.emit('updateGameState', {
            gameOver: checkGameOver(player1Hand),
            winner: checkWinner(player1Hand, 'Player 1'),
            turn: 'Player 2',
            playedCards: [...playedCards, card],
            player1Hand: player1Hand.filter(c => `${c.color}-${c.type}` !== card),
            player2Hand: [...player2Hand, card1, card2, card3, card4],
            curColor: cardColor,
            curType: cardType,
            topCard: card,
            drawCardPile: drawCardPile
          });
        } else {
          const copiedDeck = [...drawCardPile];
          const card1 = copiedDeck.pop();
          const card2 = copiedDeck.pop();
          const card3 = copiedDeck.pop();
          const card4 = copiedDeck.pop();
          socket.emit('updateGameState', {
            gameOver: checkGameOver(player2Hand),
            winner: checkWinner(player2Hand, 'Player 2'),
            turn: 'Player 1',
            playedCards: [...playedCards, card],
            player1Hand: [...player1Hand, card1, card2, card3, card4],
            player2Hand: player2Hand.filter(c => `${c.color}-${c.type}` !== card),
            curColor: cardColor,
            curType: cardType,
            topCard: card,
            drawCardPile: drawCardPile
          });
        }
      } else {
        if (player === 'Player 1') {
          socket.emit('updateGameState', {
            gameOver: checkGameOver(player1Hand),
            winner: checkWinner(player1Hand, 'Player 1'),
            turn: 'Player 2',
            playedCards: [...playedCards, card],
            player1Hand: player1Hand.filter(c => `${c.color}-${c.type}` !== card),
            curColor: cardColor,
            curType: cardType,
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
            curColor: cardColor,
            curType: cardType,
            topCard: card,
            drawCardPile: drawCardPile
          });
        }
      }
    } else {
      switch (cardType) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          if (player === 'Player 1') {
            socket.emit('updateGameState', {
              gameOver: checkGameOver(player1Hand),
              winner: checkWinner(player1Hand, 'Player 1'),
              turn: 'Player 2',
              playedCards: [...playedCards, card],
              player1Hand: player1Hand.filter(c => `${c.color}-${c.type}` !== card),
              curColor: cardColor,
              curType: cardType,
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
              curColor: cardColor,
              curType: cardType,
              topCard: card,
              drawCardPile: drawCardPile
            });
          }
          break;
        case 'skip':
          if (player === 'Player 1') {
            socket.emit('updateGameState', {
              gameOver: checkGameOver(player1Hand),
              winner: checkWinner(player1Hand, 'Player 1'),
              turn: 'Player 1',
              playedCards: [...playedCards, card],
              player1Hand: player1Hand.filter(c => `${c.color}-${c.type}` !== card),
              curColor: cardColor,
              curType: cardType,
              topCard: card,
              drawCardPile: drawCardPile
            });
          } else {
            socket.emit('updateGameState', {
              gameOver: checkGameOver(player2Hand),
              winner: checkWinner(player2Hand, 'Player 2'),
              turn: 'Player 2',
              playedCards: [...playedCards, card],
              player2Hand: player2Hand.filter(c => `${c.color}-${c.type}` !== card),
              curColor: cardColor,
              curType: cardType,
              topCard: card,
              drawCardPile: drawCardPile
            });
          }
          break;
        case 'reverse':
          if (player === 'Player 1') {
            socket.emit('updateGameState', {
              gameOver: checkGameOver(player1Hand),
              winner: checkWinner(player1Hand, 'Player 1'),
              turn: 'Player 1',
              playedCards: [...playedCards, card],
              player1Hand: player1Hand.filter(c => `${c.color}-${c.type}` !== card),
              curColor: cardColor,
              curType: cardType,
              topCard: card,
              drawCardPile: drawCardPile
            });
          } else {
            socket.emit('updateGameState', {
              gameOver: checkGameOver(player2Hand),
              winner: checkWinner(player2Hand, 'Player 2'),
              turn: 'Player 2',
              playedCards: [...playedCards, card],
              player2Hand: player2Hand.filter(c => `${c.color}-${c.type}` !== card),
              curColor: cardColor,
              curType: cardType,
              topCard: card,
              drawCardPile: drawCardPile
            });
          }
          break;
        case 'draw2':
          if (player === 'Player 1') {
            const copiedDeck = [...drawCardPile];
            const card1 = copiedDeck.pop();
            const card2 = copiedDeck.pop();
            socket.emit('updateGameState', {
              gameOver: checkGameOver(player1Hand),
              winner: checkWinner(player1Hand, 'Player 1'),
              turn: 'Player 2',
              playedCards: [...playedCards, card],
              player1Hand: player1Hand.filter(c => `${c.color}-${c.type}` !== card),
              player2Hand: [...player2Hand, card1, card2],
              curColor: cardColor,
              curType: cardType,
              topCard: card,
              drawCardPile: drawCardPile
            });
          } else {
            const copiedDeck = [...drawCardPile];
            const card1 = copiedDeck.pop();
            const card2 = copiedDeck.pop();
            socket.emit('updateGameState', {
              gameOver: checkGameOver(player2Hand),
              winner: checkWinner(player2Hand, 'Player 2'),
              turn: 'Player 1',
              playedCards: [...playedCards, card],
              player1Hand: [...player1Hand, card1, card2],
              player2Hand: player2Hand.filter(c => `${c.color}-${c.type}` !== card),
              curColor: cardColor,
              curType: cardType,
              topCard: card,
              drawCardPile: drawCardPile
            });
          }
          break;
      }
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

  // Chat handlers
  const handleDrawerToggle = () => {
    setChatDrawerOpen(drawerOpen => !drawerOpen);
    if (newMsg) setNewMsg(false);
  };

  const handleNewMessageChange = event => {
    setMessage(() => event.target.value);
  };

  const sendMessage = e => {
    e.preventDefault();
    if (message) {
      socket.emit('sendMessage', { message: message }, () => {
        setMessage('');
      });
    }
  };

  const handleKeyUp = e => {
    e.preventDefault();
    if (event.key === 'Enter') {
      if (message) {
        socket.emit('sendMessage', { message: message }, () => {
          setMessage('');
        });
      }
    }
  };

  useEffect(() => {
    setNewMsg(true);
  }, [messages]);

  const msgNotification = newMsg
    ? classes.chatIconShadow
    : '';

  const chatBox = (
    <div className={classes.chatBox}>
      <Box id="chat-body"
        className={classes.messagesContainer}
        display="flex"
        flexDirection="column"
        justifyContent="flex-end">
        {
          messages.map((message, i) => {
            const msgStyle = message.player === 'Player 1'
              ? `${classes.message} ${classes.messageP1}`
              : `${classes.message} ${classes.messageP2}`;
            const msgAlign = message.player === 'Player 1'
              ? 'flex-start'
              : 'flex-end';
            return (
              <Box key={i} alignSelf={msgAlign}>
                <Box className={msgStyle}>
                  {message.text}
                </Box>
                <Box className={classes.username}>
                  {message.user}
                </Box>
              </Box>
            );
          })
        }
      </Box>
      <form id="form" action="" className={classes.form}>
        <input className={classes.input}
          type="text" id="input" autoComplete="off" value={message}
          onChange={handleNewMessageChange}
          onKeyUp={handleKeyUp} />
        <button className={classes.sendButton} onClick={sendMessage}>
          Send
        </button>
      </form>
    </div>
  );

  return (
    <div className={classes.root}>
      {(!roomFull)
        ? <>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle} >
            <MessageIcon className={`${classes.chatIcon} ${msgNotification}`} />
        </IconButton>
        <Drawer
          anchor='right'
          className={classes.drawer}
          variant="temporary"
          open={chatDrawerOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true
          }}
        >
          {chatBox}
        </Drawer>

          <div className={classes.topInfo}>
            {users.length < 2
              ? <h3>{`Game Code: ${room}`}</h3>
              : <h3>{ notification }</h3>
            }
          </div>

        { users.length === 1 && currentUser === 'Player 2' &&
          <h1>Player 1 has left the game.</h1>
        }

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
                  curColor={curColor} topCard={topCard} playedCards={playedCards}
                  player1Hand={player1Hand} player2Hand={player2Hand}
                  turn={turn} users={users} notification={notification}
                />}
                { currentUser === 'Player 2' &&
                <Player2View playCard={playCard} onCardClick={drawCard}
                  curColor={curColor} topCard={topCard} playedCards={playedCards}
                  player1Hand={player1Hand} player2Hand={player2Hand}
                  turn={turn} users={users} notification={notification}
                />}
              </Grid>
          }
          </>
        }
      </>
        : <h1>Room full</h1> }

      <br />
      <Link to={'/games'}>
        <Button variant="contained" color="secondary" className={classes.quitBtn} >
          QUIT
        </Button>
      </Link>
    </div>
  );
}
