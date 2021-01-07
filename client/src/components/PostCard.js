import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => (
  <div className="post-card">
    <div className="post-card__container">
      <h2 className="post-card__title">{post.title}</h2>
      <p className="post-card__summary">{post.summary}</p>
      <Link className="post-card__button" to={`/post/${post.slug}`}>
        بیشتر
      </Link>
    </div>
  </div>
);

export default PostCard;
