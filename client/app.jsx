import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import SideNav from './components/SideNav';
import Home from './pages/Home';
import HowToPlay from './pages/HowToPlay';
import AboutUs from './pages/AboutUs';
import Lobby from './pages/Lobby';
import GameBoard from './components/GameBoard';

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
