import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import SideNav from './components/SideNav';
import HowToPlay from './pages/HowToPlay';
import GameBoard from './pages/game-board';
import AboutUs from './pages/about-us';

export default function App() {
  return (
    <Router basename="/">
      <Switch>
        <Route path="/how-to-play">
          <HowToPlay />
        </Route>
        <Route path="/about-us">
          <AboutUs />
        </Route>
        <Route path="/games">
          <GameBoard />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>

      <SideNav />
    </Router>
  );
}

function Home() {
  return (
    <div
      style={
        {
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '64px',
          backgroundColor: '#151224',
          color: '#DDE0EF',
          height: '100vh',
          width: 'calc(100% - 300px)',
          float: 'right'
        }}
    >
      <h1>Home</h1>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function Games() {
  return (
    <div
      style={
        {
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '64px',
          backgroundColor: '#151224',
          color: '#DDE0EF',
          height: '100vh',
          width: 'calc(100% - 300px)',
          float: 'right'
        }}
    >
      <h1>Find a game</h1>
    </div>
  );

}
