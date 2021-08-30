import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import SideNav from './components/sidenav';
import Home from './pages/home';
import HowToPlay from './pages/how-to-play';
import AboutUs from './pages/about-us';
import Lobby from './pages/lobby';
import GameBoard from './components/game-board';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    paddingTop: 50,
    backgroundColor: '#151224'
  }
}));

export default function App() {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.root}>
        <Route path="/" exact component={Home} />
        <Route path="/how-to-play" exact component={HowToPlay} />
        <Route path="/about-us" exact component={AboutUs} />
        <Route path="/play" exact component={GameBoard} />
        <Route path="/games" exact component={Lobby} />
        <SideNav />
      </div>
    </Router>
  );
}
