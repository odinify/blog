import React, { useState, useContext } from 'react';

import AuthContext from '../components/AuthContext';
import Hero from '../components/Hero';

const LoginPage = props => {
  const auth = useContext(AuthContext);

  const initialFormData = {
    username: '',
    password: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(
    props.match.params.registered === 'registered'
      ? 'با موفقیت ثبت نام کردید.'
      : ''
  );

  const handleChange = event => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const result = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await result.json();

    if (!data.success && data.error) {
      setSuccess('');
      return setError(data.error);
    }

    if (data.success) {
      const { token, user } = data;

      auth.login({ token, user });
    }
  };

  return (
    <div className="auth-background">
      <div className="container">
        <Hero title="ورود" description="از اینجا وارد حساب خود شوید." />

        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success">{success}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="username" className="auth-form__label">
            یوزرنیم
          </label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={handleChange}
            className="auth-form__input"
            value={formData.username}
          />

          <label htmlFor="password" className="auth-form__label">
            پسورد
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            className="auth-form__input"
            value={formData.password}
          />

          <input type="submit" value="ورود" className="auth-form__button" />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
