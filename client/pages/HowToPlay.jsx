import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginLeft: '300px',
    marginTop: '64px',
    backgroundColor: 'blue',
    height: '100vh',
    width: '100%'
  }
}));

export default function HowToPlay() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1>Rules</h1>
    </div>
  );
}
