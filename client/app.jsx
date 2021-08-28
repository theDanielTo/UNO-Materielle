import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import SideNav from './components/SideNav';
import HowToPlay from './pages/HowToPlay';
// import GameBoard from './pages/game-board';
import AboutUs from './pages/about-us';
import Home from './pages/home';
import Lobby from './pages/lobby';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    paddingTop: 84,
    backgroundColor: '#151224'
  },
  lobby: {
    maxWidth: '1200px'
  }
}));

export default function App() {
  const classes = useStyles();

  return (
    <Router basename="/">
      <div className={classes.root}>
        <Switch>
          <Route path="/how-to-play">
            <HowToPlay />
          </Route>
          <Route path="/about-us">
            <AboutUs />
          </Route>
          <Route path="/games">
            <Grid container spacing={6} direction="row" justifyContent="flex-start" className={classes.lobby}>
            <Grid item>
              <Lobby />
            </Grid>
          </Grid>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>

        <SideNav />
      </div>
    </Router>
  );
}
