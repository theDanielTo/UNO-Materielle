import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#151224',
    color: '#DDE0EF',
    minHeight: '93.6vh',
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
          <p className={classes.header}>Lorem ipsum</p>
        </Grid>
        <Grid item lg={7}>
          <img src="/images/home-1.png" className={classes.image} alt="placeholder"></img>
        </Grid>
        <Grid item lg={5}>
          <p className={classes.infoText}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae voluptatum officia maxime, odit
            adipisci nam fugit qui asperiores obcaecati cupiditate accusamus dicta excepturi, exercitationem neque.</p>
        </Grid>
        <Grid item lg={5}>
          <p className={classes.infoText}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae voluptatum officia maxime, odit
            adipisci nam fugit qui asperiores obcaecati cupiditate accusamus dicta excepturi, exercitationem neque.</p>
        </Grid>
        <Grid item lg={7}>
          <img src="/images/home-2.png" className={classes.image} alt="placeholder"></img>
        </Grid>
        <Grid item lg={7}>
          <img src="/images/home-3.png" className={classes.image} alt="placeholder"></img>
        </Grid>
        <Grid item lg={5}>
          <p className={classes.infoText}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae voluptatum officia maxime, odit
            adipisci nam fugit qui asperiores obcaecati cupiditate accusamus dicta excepturi, exercitationem neque.</p>
        </Grid>
      </Grid>
    </div>
  );
}
