import React from 'react';
import styles from './Articles.module.scss';

const Articles = props => {
  return (
    <div>
      {props.newsArticles.articles.map((article, index) => {
        return (
          <div key={index} className={styles.container}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <p>{article.author}</p>
              <p>{String(new Date(article.publishedAt)).slice(4, 21)}</p>
            </a>
          </div>
        );
      })}
    </div>
  );
};
export default Articles;
