import React, { useState, useEffect, useContext } from 'react';
import parse from 'html-react-parser';
import { useHistory } from 'react-router-dom';

import PostHero from '../components/PostHero';
import AuthContext from '../components/AuthContext';
import DeleteButton from '../components/DeleteButton';

const PostPage = props => {
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [post, setPost] = useState({});
  const auth = useContext(AuthContext);
  const history = useHistory();
  const { slug } = props.match.params;

  useEffect(() => {
    const getPost = async () => {
      const result = await fetch(`/api/posts/${slug}`);

      if (!result.ok) {
        setIsLoading(false);
        return setNotFound(true);
      }

      const { post } = await result.json();

      setIsLoading(false);
      setPost(post);
    };

    getPost();
  }, []);

  const deletePost = async () => {
    await fetch(`/api/posts/${slug}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': auth.token,
      },
    });

    history.push('/');
  };

  let content;

  if (isLoading) {
    content = <div className="loading">در حال بارگزاری</div>;
  }

  if (notFound) {
    content = <div className="not-found-error">پستی یافت نشد.</div>;
  }

  if (!isLoading && !notFound && post.author) {
    content = (
      <>
        <PostHero title={post.title} author={post.author.name} />
        {auth.isLoggedIn && auth.user.admin && (
          <DeleteButton deletePost={deletePost} />
        )}
        {parse(post.html)}
      </>
    );
  }

  return <div className="container">{content}</div>;
};

export default PostPage;
