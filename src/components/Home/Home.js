import React from 'react';
import { Articles } from '../index';

import styles from './Home.module.scss';

const Home = props => {
  return (
    <React.Fragment>
      <section className={styles.container}>
        <div className={styles.form}>
          <form onSubmit={props.handleSearchSubmit}>
            <label>
              <input
                type="text"
                value={props.searchValue}
                onChange={props.handleChange}
                required
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
          {props.newsArticles ? (
            <Articles newsArticles={props.newsArticles} />
          ) : null}
        </div>
      </section>
    </React.Fragment>
  );
};
export default Home;
