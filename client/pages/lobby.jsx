import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import LobbyCard from '../components/LobbyCard';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#151224',
    color: '#DDE0EF',
    height: '100vh',
    maxWidth: '1200px',
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

  useEffect(() => {
    fetch('/api/games')
      .then(res => res.json())
      .then(result => setGames(result))
      .catch(err => console.error('fetch err:', err));
  }, []);

  const title = 'new game';

  const createGame = () => {
    fetch('/api/games', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title })
    })
      .then(res => res.json())
      .then(result => setGames([...games, result]))
      .catch(err => console.error('fetch err:', err));
  };

  return (
    <div className={classes.root}>
      <h2>Choose a game:</h2>
      <Grid container spacing={6} direction="row" justifyContent="flex-start">
        {
          games.map(game => (
            <LobbyCard key={game.gameId}/>
          ))
        }
      </Grid>

      <h2>Create Game</h2>
      <Button
        variant="contained"
        className={classes.button}
        onClick={createGame}
      >
        Create Game
      </Button>
    </div>
  );
}
