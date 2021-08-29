import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  card: {
    width: 210,
    borderRadius: 10,
    color: 'white',
    background: '#484040'
  },
  button: {
    background: '#D3A500',
    color: 'white'
  }
}));

export default function LobbyCard({ game }) {
  const classes = useStyles();
  const { gameId, isStarted } = game;

  const joinGame = () => {
    const userId = JSON.parse(localStorage.getItem('mintbean-user')).id;
    fetch('/api/lobbies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, gameId })
    })
      .then(res => res.json())
      .catch(err => console.error('fetch err:', err));
  };

  return (
    <Grid item>
      <Card className={classes.card}>
        <CardContent >
          <Typography>
            {`ID: ${gameId}`}
          </Typography>
          <Typography>
            {'Players: 1 / 4'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            className={classes.button}
            onClick={joinGame}
            disabled={isStarted}
          >
            <Link to={`/play?game-id=${gameId}`}>
              Join
            </Link>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
