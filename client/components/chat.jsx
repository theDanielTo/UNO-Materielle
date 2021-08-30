import React from 'react';
// import { useState, useEffect } from 'react';
// import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
// import { io } from 'socket.io-client';

const useStyles = makeStyles(theme => ({
  body: {
    width: '300px',
    margin: 0,
    paddingBottom: '3rem',
    // font - family: -apple - system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans - serif;
    backgroundColor: 'black'
  },

  form: {
    background: 'rgba(0, 0, 0, 0.15)',
    padding: '0.25rem',
    position: 'fixed',
    bottom: 0,
    // left: 0,
    right: 0,
    display: 'flex',
    height: '3rem',
    width: '300px'
    // box - sizing: border - box;
    // backdrop - filter: blur(10px);
  },

  input: {
    border: 'none',
    padding: '0 1rem',
    flexGrow: '1',
    borderRadius: '2rem',
    margin: '0.25rem',
    width: '100px'
  },

  //     #input: focus {
  //   outline: none;
  // }

  button: {
    background: '#333',
    border: 'none',
    padding: '0 1rem',
    margin: '0.25rem',
    borderRadius: '3px',
    outline: 'none',
    color: '#fff'
  },

  messages: {
    listStyleType: 'none',
    margin: 0,
    padding: 0
  }
}));

export default function Chat() {
  const classes = useStyles();

  //     #messages > li {
  //   padding: 0.5rem 1rem;
  // }

  //     #messages > li: nth - child(odd) {
  //   background: #efefef;
  // }

  return (
    <div className={classes.body}>
        <ul id="messages"></ul>
        <form id="form" action="" className={classes.form}>
          <input className={classes.input} type="text" id="input" autoComplete="off" /><button className={classes.button}>Send</button>
        </form>
    </div>
  );

}
