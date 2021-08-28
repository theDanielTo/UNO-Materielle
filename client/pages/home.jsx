import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#151224',
    color: '#DDE0EF',
    minHeight: '93.6vh',
    paddingBottom: '1em',
    fontSize: '1.5rem',
    flexGrow: '1'
  },
  container: {
    display: 'flex'
  },
  header: {
    fontFamily: 'Poppins, sans- serif',
    color: '#DDE0EF',
    textAlign: 'center',
    fontSize: '2.9rem'
  },
  infoText: {
    fontFamily: 'Raleway, sans-serif',
    color: '#DDE0EF',
    padding: '1em 2em 1em',
    backgroundColor: '#B96D40',
    marginRight: '1em',
    marginLeft: '1em'
  },
  image: {
    width: '85%',
    display: 'block',
    margin: '0 auto',
    paddingTop: '0.3em'
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
        <Grid item md={7}>
          <img src="/images/placeholder.png" className={classes.image} alt="placeholder"></img>
        </Grid>
        <Grid item md={5}>
          <p className={classes.infoText}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae voluptatum officia maxime, odit
            adipisci nam fugit qui asperiores obcaecati cupiditate accusamus dicta excepturi, exercitationem neque.</p>
        </Grid>
        <Grid item md={5}>
          <p className={classes.infoText}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae voluptatum officia maxime, odit
            adipisci nam fugit qui asperiores obcaecati cupiditate accusamus dicta excepturi, exercitationem neque.</p>
        </Grid>
        <Grid item md={7}>
          <img src="/images/placeholder.png" className={classes.image} alt="placeholder"></img>
        </Grid>
        <Grid item md={7}>
          <img src="/images/placeholder.png" className={classes.image} alt="placeholder"></img>
        </Grid>
        <Grid item md={5}>
          <p className={classes.infoText}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae voluptatum officia maxime, odit
            adipisci nam fugit qui asperiores obcaecati cupiditate accusamus dicta excepturi, exercitationem neque.</p>
        </Grid>
      </Grid>
    </div>
  );
}
