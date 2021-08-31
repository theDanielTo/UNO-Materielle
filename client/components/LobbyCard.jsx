import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  card: {
    width: '159px',
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
  const { gameId } = game;
  const userId = JSON.parse(localStorage.getItem('mintbean-user')).id;
  const [participants, setParticipants] = useState(0);

  useEffect(() => {
    fetch(`/api/lobbies/count/${gameId}`)
      .then(res => res.json())
      .then(result => {
        if (result) setParticipants(result.participants);
      })
      .catch(err => console.error('fetch err:', err));
  }, [participants]);

  const joinGame = e => {
    fetch('/api/lobbies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ gameId, userId })
    })
      .then(res => res.json())
      .catch(err => console.error('fetch err:', err));
  };

  return (
    <>
      { participants < 2
        ? <Grid item>
          <Card className={classes.card}>
            <CardContent >
              <Typography>
                {`ID: ${gameId}`}
              </Typography>
              <Typography>
                {`Players: ${participants} / 2`}
              </Typography>
            </CardContent>
            <CardActions>
              <Link to={`/play?game-id=${gameId}`}>
                <Button className={classes.button}
                  onClick={joinGame}>
                  Join
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
        : null
      }
    </>
  );
}
