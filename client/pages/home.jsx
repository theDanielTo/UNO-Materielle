import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#151224',
    color: '#DDE0EF',
    minHeight: '96.6vh',
    maxWidth: '1300px',
    fontSize: '1.5rem'
  },
  header: {
    fontFamily: 'Poppins, sans- serif',
    color: '#DDE0EF',
    textAlign: 'center',
    fontSize: '3.3rem'
  },
  infoText: {
    fontFamily: 'Raleway, sans-serif',
    color: '#F0F4F8',
    padding: '1em 2em 1em',
    backgroundColor: '#334e68',
    margin: '2em 2em',
    borderRadius: '21px'
  },
  image: {
    width: '85%',
    display: 'block',
    margin: '0 auto',
    paddingLeft: '1.5em'
  }

}));
export default function Home(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container direction="row">
        <Grid item xs={12}>
          <p className={classes.header}>
            UNO <em>Matérielle</em>
          </p>
        </Grid>
        </Grid>
        <Grid container>
        <Grid item lg={7}>
          <img src="/images/home-1.png" className={classes.image} alt="UNO made with React.js, Materail UI, and Socket.io" />
        </Grid>
        <Grid item lg={5}>
          <p className={classes.infoText}>
            UNO is back with a new look and feel! Players take turns matching a card in their hand with the current card shown on top of the deck either by color or number.
          </p>
        </Grid>
        <Grid item lg={5}>
          <p className={classes.infoText}>
            Delivering a responsive and an appealing aesthetic using React.js and Material UI, and with the addition of Socket.io, you can play with other players online!
          </p>
        </Grid>
        <Grid item lg={7}>
          <img src="/images/home-2.png" className={classes.image} alt="placeholder" />
        </Grid>
        <Grid item lg={7}>
          <img src="/images/home-3.png" className={classes.image} alt="placeholder" />
        </Grid>
        <Grid item lg={5}>
          <p className={classes.infoText}>
            So, what are you waiting for!? Grab some friends and get ready to battle it out online for the top prize of being the Uno master!
          </p>
        </Grid>
      </Grid>
    </div>
  );
}
