import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '84px 20px',
    backgroundColor: '#151224',
    color: '#DDE0EF',
    minHeight: '100vh',
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
  logo: {
    color: '#DDE0EF'
  },
  organize: {
    display: 'flex',
    flexDirection: 'column'
  },

  trial: {
    width: '250px',
    height: '250px',
    display: 'block',
    margin: '0 auto 1em',
    // position: 'relative',
    borderRadius: '50%',
    overflow: 'hidden'
  },
  images: {
    width: 'auto',
    marginLeft: '-20px'
  }
}));

export default function AboutUs() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1 className="poppins">About Us</h1>
      <hr />
      <Grid container spacing={6} direction="row" justifyContent="space-around">
        <Grid item lg={4}>
          <Paper className={classes.about}>
            <div className={classes.trial}>
              <img className={classes.images}src="/images/brianbozigian.png" alt="Brian's Picture"></img>
            </div>
            <p className={classes.header}>Brian Bozigan</p>
            <p className={classes.infoText}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta tempore quod ipsa, velit eveniet non nulla! Pariatur vero non provident temporibus sapiente a consectetur ad?</p>
            <Paper className={classes.link}>
              <a href="https://github.com/BrianBozi" target="_blank" rel="noreferrer"><span className={classes.logo}><i className="fab fa-github-square fa-2x"></i></span></a>
              <a href="https://www.linkedin.com/in/brian-bozigian/" target="_blank" rel="noreferrer"><span className={classes.logo}><i className="fab fa-linkedin fa-2x"></i></span></a>
            </Paper>
          </Paper>
        </Grid>
        <Grid item lg={4}>
          <Paper className={classes.about}>
            <div className={classes.trial}>
              <img className={classes.images} src="/images/danielto.jpg" alt="Daniel's Picture"></img>
            </div>
            <p className={classes.header}>Daniel To</p>
            <p className={classes.infoText}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta tempore quod ipsa, velit eveniet non nulla! Pariatur vero non provident temporibus sapiente a consectetur ad?</p>
            <Paper className={classes.link}>
              <a href="https://github.com/theDanielTo" target="_blank" rel="noreferrer"><span className={classes.logo}><i className="fab fa-github-square fa-2x"></i></span></a>
              <a href="https://www.linkedin.com/in/to-daniel/" target="_blank" rel="noreferrer"><span className={classes.logo}><i className="fab fa-linkedin fa-2x"></i></span></a>
            </Paper>
          </Paper>
        </Grid>
        <Grid item lg={4}>
          <Paper className={classes.about}>
            <span className={classes.circle}></span>
            <p className={classes.header}>Michael Aguilar</p>
            <p className={classes.infoText}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta tempore quod ipsa, velit eveniet non nulla! Pariatur vero non provident temporibus sapiente a consectetur ad?</p>
            <Paper className={classes.link}>
              <a href="https://github.com/Michael-M-Aguilar" target="_blank" rel="noreferrer"><span className={classes.logo}><i className="fab fa-github-square fa-2x"></i></span></a>
              <a href="https://www.linkedin.com/in/michael-m-aguilar/" target="_blank" rel="noreferrer"><span className={classes.logo}><i className="fab fa-linkedin fa-2x"></i></span></a>
            </Paper>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
