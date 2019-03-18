import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Home, Headline, Latest } from '../index';
import styles from './App.module.scss';

class App extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Router>
          <nav>
            <ul className={styles.list}>
              <li>
                <Link to="/">Home </Link>
              </li>
              <li>
                <Link to="/headline">Headline news </Link>
              </li>
              <li>
                <Link to="/latest">Latest news </Link>
              </li>
            </ul>
          </nav>
          <Route exact path="/" render={() => <Home />} />
          <Route path="/headline" render={() => <Headline />} />
          <Route path="/latest" render={() => <Latest />} />
        </Router>
      </div>
    );
  }
}

export default App;
