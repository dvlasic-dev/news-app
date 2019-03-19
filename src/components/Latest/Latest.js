import React from 'react';
import { Articles } from '../index';
import styles from './Latest.module.scss';

const Latest = props => {
  return (
    <section className={styles.container}>
      {props.newsArticles ? (
        <Articles newsArticles={props.newsArticles} />
      ) : null}
    </section>
  );
};
export default Latest;
