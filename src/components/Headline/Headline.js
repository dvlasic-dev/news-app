import React from 'react';
import { Articles } from '../index';
import styles from './Headline.module.scss';

const Headline = props => {
  return (
    <section className={styles.container}>
      {props.newsArticles ? (
        <Articles newsArticles={props.newsArticles} />
      ) : null}
    </section>
  );
};

export default Headline;
