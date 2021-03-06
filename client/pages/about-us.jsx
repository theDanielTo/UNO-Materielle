import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#151224',
    color: '#DDE0EF',
    minHeight: '95.6vh',
    maxWidth: '1200px',
    fontSize: '1.5rem'
  },
  about: {
    backgroundColor: '#484040',
    borderRadius: '25px',
    paddingTop: '1em',
    margin: '0 1rem'
  },
  link: {
    backgroundColor: '#7e7e7e',
    display: 'flex',
    justifyContent: 'space-around',
    borderRadius: '0 0 25px 25px',
    paddingTop: '0.7em',
    paddingBottom: '0.5em',
    marginBottom: '10px'
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
    padding: '1em 0.8em 1em 0.8em',
    fontSize: '1.2rem'
  },
  logo: {
    color: '#DDE0EF'
  },
  trial: {
    width: '250px',
    height: '250px',
    display: 'block',
    margin: '0 auto 1em',
    borderRadius: '50%',
    overflow: 'hidden'
  },
  brian: {
    width: 'auto',
    marginLeft: '-20px',
    marginTop: '-5px'
  },
  daniel: {
    width: 'auto',
    marginLeft: '-1px',
    marginTop: '-40px'
  },
  michael: {
    width: 'auto',
    marginLeft: '-100px',
    marginTop: '-5px'
  },
  title: {
    marginLeft: '10px',
    marginTop: '18px'
  }
}));

export default function AboutUs() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h3" className={classes.title}> About Us</Typography>
      <hr />
      <Grid container spacing={6} direction="row" justifyContent="space-around">
        <Grid item md={4}>
          <Paper className={classes.about}>
            <div className={classes.trial}>
              <img className={classes.brian}src="/images/devs/brianbozigian.png" alt="Brian's Picture"></img>
            </div>
            <Typography variant="h4" className={classes.header}>
              Brian Bozigian
            </Typography>
            <Typography variant="h6" className={classes.infoText}>
              Brian is a  self-motivated Full-Stack developer and clean design enthusiast who enjoys problem-solving.  He has experience with HTML, CSS3, JavaScript and React.js but is always excited to learn different technologies.
            </Typography>
            <Paper className={classes.link}>
              <a href="https://github.com/BrianBozi" target="_blank" rel="noreferrer">
                <span className={classes.logo}>
                  <i className="fab fa-github-square fa-2x" />
                </span>
              </a>
              <a href="https://www.linkedin.com/in/brian-bozigian/" target="_blank" rel="noreferrer">
                <span className={classes.logo}>
                  <i className="fab fa-linkedin fa-2x" />
                </span>
              </a>
            </Paper>
          </Paper>
        </Grid>
        <Grid item md={4}>
          <Paper className={classes.about}>
            <div className={classes.trial}>
              <img className={classes.daniel} src="/images/devs/danielto.png" alt="Daniel's Picture"></img>
            </div>
            <Typography variant="h4" className={classes.header}>
              Daniel To
            </Typography>
            <Typography variant="h6" className={classes.infoText}>
              Daniel is a driven Full-Stack developer whose main objective is the provide the best that he can offer to those who work alongside him. His experience with Javascript, React, CSS3 and HTML furthers his passion of problem solving and creating impactful products.
            </Typography>
            <Paper className={classes.link}>
              <a href="https://github.com/theDanielTo" target="_blank" rel="noreferrer">
                <span className={classes.logo}>
                  <i className="fab fa-github-square fa-2x" />
                </span>
              </a>
              <a href="https://www.linkedin.com/in/to-daniel/" target="_blank" rel="noreferrer">
                <span className={classes.logo}>
                  <i className="fab fa-linkedin fa-2x" />
                </span>
              </a>
            </Paper>
          </Paper>
        </Grid>
        <Grid item md={4}>
          <Paper className={classes.about}>
            <div className={classes.trial}>
              <img className={classes.michael} src="/images/devs/michaelaguilar.png" alt="Michael's Picture" />
            </div>
            <Typography variant="h4" className={classes.header}>
              Michael Aguilar
            </Typography>
            <Typography className={classes.infoText}>
              Michael is a full stack engineer and graduate from UC Merced holding a B.S. in Biological Sciences.
            He has experience with technologies such as React, JavaScript, CSS, and Python.
            In his spare time he enjoys watching sports, traveling, or learning new technologies.
            </Typography>
            <Paper className={classes.link}>
              <a href="https://github.com/Michael-M-Aguilar" target="_blank" rel="noreferrer">
                <span className={classes.logo}>
                  <i className="fab fa-github-square fa-2x" />
                </span>
              </a>
              <a href="https://www.linkedin.com/in/michael-m-aguilar/" target="_blank" rel="noreferrer">
                <span className={classes.logo}>
                  <i className="fab fa-linkedin fa-2x" />
                </span>
              </a>
            </Paper>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
