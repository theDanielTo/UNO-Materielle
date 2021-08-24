import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';

// Route renders component based on URL.
export default function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
        </Switch>
      </div>
    </Router>
  );
}
