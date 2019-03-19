import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Home, Headline, Latest } from '../index';
import { API_KEY, HEADLINES_URL, LATEST_URL } from '../../constants/index';
import styles from './App.module.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchValue: '',
      topResults: null,
      latestResults: null,
      error: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.fetchTopNews = this.fetchTopNews.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      searchValue: event.target.value
    });
  }
  fetchTopNews(searchValue) {
    axios(`${HEADLINES_URL}q=${searchValue}&apiKey=${API_KEY}`)
      .then(result => this.setState({ topResults: result.data }))
      .catch(error => this.setState({ error }));
  }
  fetchLatestNews(searchValue) {
    axios(
      `${LATEST_URL}q=${searchValue}&from=${new Date()
        .toISOString()
        .slice(0, 10)}&apiKey=${API_KEY}`
    )
      .then(result => this.setState({ latestResults: result.data }))
      .catch(error => this.setState({ error }));
  }
  handleSearchSubmit(event) {
    const { searchValue } = this.state;
    const joinWords = searchValue.split(' ').join('+');
    this.fetchTopNews(joinWords);
    this.fetchLatestNews(joinWords);
    event.preventDefault();
  }
  componentDidMount() {}

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
              />
            )}
          />
          <Route
            path="/headline"
            render={() => <Headline newsArticles={this.state.topResults} />}
          />
          <Route
            path="/latest"
            render={() => <Latest newsArticles={this.state.latestResults} />}
          />
        </Router>
      </div>
    );
  }
}

export default App;
