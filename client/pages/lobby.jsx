import React, { useState, useEffect } from 'react';
import NewUser from '../components/NewUser';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import LobbyCard from '../components/LobbyCard';
import { makeStyles } from '@material-ui/core';

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
  }, [games]);

  const createGame = () => {
    fetch('/api/games', { method: 'POST' })
      .then(res => res.json())
      .catch(err => console.error('fetch err:', err));
  };

  return (
    <div className={classes.root}>
      <h2>Choose a game:</h2>
      <Grid container spacing={6} direction="row" justifyContent="flex-start">
        {
          games.map(game => (
            <LobbyCard key={game.gameId} game={game} />
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
      <NewUser />
    </div>
  );
}
