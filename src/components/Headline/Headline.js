import React from 'react';
import axios from 'axios';
import { Articles } from '../index';
import { API_KEY, HEADLINES_URL } from '../../constants/index';
import styles from './Headline.module.scss';

class Headline extends React.Component {
  _isMounted = false; //flag so state doesn't update before component is mounted
  constructor() {
    super();
    this.state = {
      results: null
    };
  }
  fetchTopNews() {
    axios(`${HEADLINES_URL}country=us&apiKey=${API_KEY}`)
      .then(
        result => this._isMounted && this.setState({ results: result.data })
      )
      .catch(error => this._isMounted && this.setState({ error }));
  }
  componentDidMount() {
    this._isMounted = true;
    this.fetchTopNews();
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

export default Headline;
