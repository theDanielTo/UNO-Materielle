import React from 'react';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#151224',
    color: '#DDE0EF',
    height: '100vh',
    maxWidth: '1200px',
    fontSize: '1.5rem'
  },
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

export default function Lobby() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h2>Choose a game:</h2>
      <Grid container spacing={6} direction="row" justifyContent="flex-start">
        <Grid item>
          <Card className={classes.card}>
            <CardContent >
              <Typography>
                Game: 1
              </Typography>
              <Typography>
                Players: 1 / 4
              </Typography>
            </CardContent>
            <CardActions>
              <Button className={classes.button}>Join</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item>
          <Card className={classes.card}>
          <CardContent>
          <Typography>
            Game: 1
          </Typography>
          <Typography>
            Players: 1 / 4
          </Typography>
        </CardContent >
          <CardActions>
            <Button className={classes.button}>Join</Button>
          </CardActions>
          </Card>
          </Grid>
      </Grid>

      <h2>Create Game</h2>
      <Button variant="contained" className={classes.button}>
        Create Game
      </Button>
      </div>
  );
}
