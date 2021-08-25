import React from 'react';
import Home from './pages/home';
import About from './pages/about';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Route renders component based on URL.
function App() {
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

export default App;
