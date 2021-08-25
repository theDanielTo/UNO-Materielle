import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SideNav from './components/SideNav';
import HowToPlay from './pages/HowToPlay';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/how-to-play">
          <HowToPlay />
        </Route>
        <Route path="/about-us">
          <About />
        </Route>
        <Route path="/games">
          <Games />
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
          backgroundColor: 'green',
          height: '100vh',
          width: '100%'
        }}
    />
  );
}

function About() {
  return (
    <div
      style={
        {
          backgroundColor: 'red',
          height: '100vh',
          width: '100%'
        }}
    />
  );
}

function Games() {
  return (
    <div
      style={
        {
          backgroundColor: 'pink',
          height: '100vh',
          width: '100%'
        }}
    />
  );
}
