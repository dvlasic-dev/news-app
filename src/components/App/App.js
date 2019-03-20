import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Home, Headline, Latest } from '../index';
import { API_KEY, LATEST_URL } from '../../constants/index';
import styles from './App.module.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchValue: '',
      results: null,
      error: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.fetchLatestNews = this.fetchLatestNews.bind(this);
  }
  handleChange(event) {
    this.setState({
      searchValue: event.target.value
    });
  }

  fetchLatestNews(searchValue) {
    axios(
      `${LATEST_URL}q=${searchValue}&from=${new Date()
        .toISOString()
        .slice(0, 10)}&apiKey=${API_KEY}`
    )
      .then(result => this.setState({ results: result.data }))
      .catch(error => this.setState({ error }));
  }

  handleSearchSubmit(event) {
    const { searchValue } = this.state;
    const joinWords = searchValue.split(' ').join('+');
    this.fetchLatestNews(joinWords);
    event.preventDefault();
  }

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
          <Route
            exact
            path="/"
            render={() => (
              <Home
                searchValue={this.state.searchValue}
                handleChange={this.handleChange}
                handleSearchSubmit={this.handleSearchSubmit}
                newsArticles={this.state.results}
              />
            )}
          />
          <Route path="/headline" render={() => <Headline />} />
          <Route path="/latest" render={() => <Latest />} />
        </Router>
      </div>
    );
  }
}

export default App;
