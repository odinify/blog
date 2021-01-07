import React, { useState, useEffect } from 'react';

import PostCard from './PostCard';

const BlogPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const result = await fetch('/api/posts');
      const { posts } = await result.json();

      setPosts(posts);
    };

    getPosts();
  }, []);

  return (
    <div className="posts-section">
      {posts.map(post => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
};

export default BlogPosts;
