import React from 'react';
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
  const { gameId, code } = game;

  return (
    <Grid item>
      <Card className={classes.card}>
        <CardContent >
          <Typography>
            {`Code: ${code}`}
          </Typography>
        </CardContent>
        <CardActions>
          <Link to={`/play?game-id=${gameId}`}>
            <Button className={classes.button}>
              Join
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  );
}
