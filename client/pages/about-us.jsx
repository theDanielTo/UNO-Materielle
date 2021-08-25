import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '84px 20px',
    backgroundColor: '#151224',
    color: '#DDE0EF',
    height: '100vh',
    width: 'calc(100% - 300px)',
    float: 'right',
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
    backgroundColor: '#484040'
  },
  link: {
    backgroundColor: '#7e7e7e',
    width: '50%',
    display: 'flex',
    justifyContent: 'space-around'
  },
  container: {
    display: 'flex'
  },
  header: {
    fontFamily: 'Poppins, sans- serif',
    color: '#DDE0EF',
    textAlign: 'center'
  },
  infoText: {
    fontFamily: 'Raleway, sans-serif',
    color: '#DDE0EF'
  },
  logo: {
    color: '#DDE0EF'
  },
  trial: {
    maxWidth: '33%',
    boxSizing: 'border-box'
  }
}));

export default function AboutUs() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1 className="poppins">About Us</h1>
      <hr />
      <Grid container spacing={2} direction="row" justifyContent="space-between">
        <Grid item className={classes.trial}>
          <Paper className={classes.about}>
            <p className={classes.header}>THEBrianBozigan</p>
            <p className={classes.infoText}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta tempore quod ipsa, velit eveniet non nulla! Pariatur vero non provident temporibus sapiente a consectetur ad?</p>
            <Paper className={classes.link}>
              <span className={classes.logo}><i className="fab fa-github-square fa-2x"></i></span>
              <span className={classes.logo}><i className="fab fa-linkedin fa-2x"></i></span>
            </Paper>
          </Paper>
        </Grid>
        <Grid item className={classes.trial}>
          <Paper className={classes.about}>
            <p className={classes.header}>THEDanielTo</p>
            <p className={classes.infoText}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta tempore quod ipsa, velit eveniet non nulla! Pariatur vero non provident temporibus sapiente a consectetur ad?</p>
            <Paper className={classes.link}>
              <span className={classes.logo}><i className="fab fa-github-square fa-2x"></i></span>
              <span className={classes.logo}><i className="fab fa-linkedin fa-2x"></i></span>
            </Paper>
          </Paper>
        </Grid>
        <Grid item className={classes.trial}>
          <Paper className={classes.about}>
            <p className={classes.header}>THEMichaelAguilar</p>
            <p className={classes.infoText}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta tempore quod ipsa, velit eveniet non nulla! Pariatur vero non provident temporibus sapiente a consectetur ad?</p>
            <Paper className={classes.link}>
              <span className={classes.logo}><i className="fab fa-github-square fa-2x"></i></span>
              <span className={classes.logo}><i className="fab fa-linkedin fa-2x"></i></span>
            </Paper>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
