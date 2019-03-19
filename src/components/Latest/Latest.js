import React from 'react';
import axios from 'axios';
import { Articles } from '../index';
import { LATEST_URL, API_KEY, SOURCES } from '../../constants/index';

import styles from './Latest.module.scss';

class Latest extends React.Component {
  _isMounted = false; //flag so state doesn't update before component is mounted
  constructor() {
    super();
    this.state = {
      results: null,
      error: null
    };
    this.fetchLatestArticles = this.fetchLatestArticles.bind(this);
  }
  fetchLatestArticles() {
    axios(
      `${LATEST_URL}sources=${SOURCES}&from=${new Date()
        .toISOString()
        .slice(0, 10)}&apiKey=${API_KEY}`
    )
      .then(
        result => this._isMounted && this.setState({ results: result.data })
      )
      .catch(error => this._isMounted && this.setState({ error }));
  }
  componentDidMount() {
    this._isMounted = true;
    this.fetchLatestArticles();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    return (
      <section className={styles.container}>
        {this.state.results ? (
          <Articles newsArticles={this.state.results} />
        ) : null}
      </section>
    );
  }
}
export default Latest;
