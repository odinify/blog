import React from 'react';

const PostHero = ({ title, author }) => (
  <div className="post-hero">
    <div className="post-hero__content">
      <h1 className="post-hero__title">{title}</h1>
      <p className="post-hero__author">
        نوشته شده توسط <span className="post-hero__author-name">{author}</span>
      </p>
    </div>
  </div>
);

export default PostHero;
