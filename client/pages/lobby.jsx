import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
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
    // maxWidth: '1200px',
    fontSize: '1.5rem'
  },
  card: {
    height: 210,
    width: 210,
    borderRadius: 10
    // marginLeft: '-20px'
  }

}));

export default function Lobby() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h2>Choose a game:</h2>
      <Grid container spacing={6} direction="row" justifyContent="flex-start">
        <Grid item>
          <Card >
            <CardContent className={classes.card}>
              <Typography color="textSecondary" >
                Game: 1
              </Typography>
              <Typography>
                Players: 1 / 4
              </Typography>
            </CardContent>
            <CardActions>
              <Button>Join</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item>
          <Card>
          <CardContent className={classes.card}>
          <Typography color="textSecondary" >
            Game: 1
          </Typography>
          <Typography>
            Players: 1 / 4
          </Typography>
        </CardContent >
          <CardActions>
            <Button>Join</Button>
          </CardActions>
          </Card>
          </Grid>
      </Grid>

    </div>
  );
}
