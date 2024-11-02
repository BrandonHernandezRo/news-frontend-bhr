import React from 'react';
import ArticleItem from './ArticleItem';

const ArticleList = ({ articles }) => {
  return (
    <div>
      {articles.length === 0 ? (
        <p>No se encontraron artículos.</p>
      ) : (
        articles.map((article,index) => <ArticleItem key={article.url} article={article} index={index}/>)
      )}
    </div>
  );
};

export default ArticleList;
