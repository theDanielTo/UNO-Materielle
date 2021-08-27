import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import { Paper, Grid } from '@material-ui/core';
// import gameBoard from './game-board';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#151224',
    color: '#DDE0EF',
    minHeight: '93.6vh',
    maxWidth: '1200px',
    paddingBottom: '1em',
    fontSize: '1.5rem'
  },
  rules: {
    padding: '20px'
  },
  ruleRow: {
    display: 'flex',
    marginBottom: '15px'
  },
  about: {
    backgroundColor: '#484040',
    borderRadius: '25px',
    paddingTop: '1em'
  },
  link: {
    backgroundColor: '#7e7e7e',
    display: 'flex',
    justifyContent: 'space-around',
    borderRadius: '0 0 25px 25px',
    paddingTop: '0.7em',
    paddingBottom: '0.5em'
  },
  container: {
    display: 'flex'
  },
  header: {
    fontFamily: 'Poppins, sans- serif',
    color: '#DDE0EF',
    textAlign: 'center',
    boxSizing: 'content-box'
  },
  infoText: {
    fontFamily: 'Raleway, sans-serif',
    color: '#DDE0EF',
    padding: '0 0.8em 0 0.8em'
  },
  trial: {
    width: '250px',
    height: '250px',
    display: 'block',
    margin: '0 auto 1em',
    borderRadius: '50%',
    overflow: 'hidden'
  }
}));
export default function Home(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h1>HELLO</h1>
    </div>
    // <>
    // <gameBoard />
    // </>
  );
}
