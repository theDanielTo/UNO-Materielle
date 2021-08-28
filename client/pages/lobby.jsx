import React from 'react';
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
  return (
    <div className={classes.root}>
      <h2>Choose a game:</h2>
      <Grid container spacing={6} direction="row" justifyContent="flex-start">
        <LobbyCard />
        <LobbyCard />
      </Grid>

      <h2>Create Game</h2>
      <Button variant="contained" className={classes.button}>
        Create Game
      </Button>
    </div>
  );
}
