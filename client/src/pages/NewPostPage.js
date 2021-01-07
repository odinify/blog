import React, { useState, useContext } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'draft-js/dist/Draft.css';

import AuthContext from '../components/AuthContext';
import Hero from '../components/Hero';

const NewPostPage = () => {
  const initialFormData = {
    title: '',
    summary: '',
    markdown: '',
  };

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState(initialFormData);
  const auth = useContext(AuthContext);

  const handleChange = event => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const result = await fetch('/api/posts/', {
      method: 'POST',
      headers: {
        'auth-token': auth.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await result.json();

    if (!data.success && data.error) {
      return setError(data.error);
    }

    setError('');
    setSuccess('پست با موفقیت ذخیره شد.');
  };

  return (
    <div className="container">
      <Hero title="پست جدید" description="یک پست جدید بنویسید." />

      {error && <div className="new-post__error">{error}</div>}
      {success && <div className="new-post__success">{success}</div>}

      <form className="new-post__form" onSubmit={handleSubmit}>
        <label htmlFor="title" className="new-post__label">
          تیتر
        </label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={handleChange}
          className="new-post__input"
          value={formData.title}
        />

        <label htmlFor="summary" className="new-post__label">
          خلاصه
        </label>
        <input
          type="text"
          id="summary"
          name="summary"
          onChange={handleChange}
          className="new-post__input"
          value={formData.summary}
        />

        <label htmlFor="markdown" className="new-post__label">
          محتوا
        </label>
        <textarea
          id="markdown"
          name="markdown"
          onChange={handleChange}
          className="new-post__text-area"
        ></textarea>

        <input type="submit" value="ذخیره" className="new-post__button" />
      </form>
    </div>
  );
};

export default NewPostPage;
