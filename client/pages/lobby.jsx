import React, { useState, useEffect } from 'react';
import randomize from 'randomatic';
import { Link } from 'react-router-dom';
import NewUser from '../components/NewUser';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import LobbyCard from '../components/LobbyCard';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '69%',
    backgroundColor: '#151224',
    color: '#DDE0EF',
    height: '100vh',
    fontSize: '1.5rem'
  },
  button: {
    background: '#D3A500',
    color: 'white'
  }
}));

export default function Lobby() {
  const classes = useStyles();
  const [games, setGames] = useState([]);
  const code = randomize('aA0', 6);

  useEffect(() => {
    fetch('/api/games')
      .then(res => res.json())
      .then(result => setGames(result))
      .catch(err => console.error('fetch err:', err));
  }, [games]);

  const title = 'new game';

  const createGame = () => {
    fetch('/api/games', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, code })
    })
      .then(res => res.json())
      .then(result => setGames([...games, result]))
      .catch(err => console.error('fetch err:', err));
  };

  return (
    <div className={classes.root}>
      <h2>Choose a game:</h2>
      <Grid container spacing={2} direction="row" justifyContent="flex-start" >
          {
            games.map(game => (
              <LobbyCard key={game.gameId} game={game} />
            ))
          }
      </Grid>

      <h2>Create Game</h2>
      <Link to={`/play?game-id=${code}`}>
        <Button
          variant="contained"
          className={classes.button}
          onClick={createGame}
        >
          Create Game
        </Button>
      </Link>
      <NewUser />
    </div>
  );
}
