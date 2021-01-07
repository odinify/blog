import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Hero from '../components/Hero';

const RegisterPage = () => {
  const initialFormData = {
    username: '',
    password: '',
    phoneNumber: '',
    name: '',
  };

  const [error, setError] = useState('');
  const [formData, setFormData] = useState(initialFormData);
  const history = useHistory();

  const handleChange = event => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const result = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        name: formData.name,
      }),
    });

    const data = await result.json();

    if (!data.success && data.error) {
      return setError(data.error);
    }

    if (data.success) {
      history.push('/login/registered');
    }
  };

  return (
    <div className="auth-background">
      <div className="container">
        <Hero title="ثبت نام" description="هم اکنون ثبت نام کنید." />

        {error && <div className="auth-error">{error}</div>}

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

          <label htmlFor="name" className="auth-form__label">
            نام
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            className="auth-form__input"
            value={formData.name}
          />

          <label htmlFor="phoneNumber" className="auth-form__label">
            شماره تلفن
          </label>
          <input
            type="number"
            id="phoneNumber"
            name="phoneNumber"
            onChange={handleChange}
            className="auth-form__input"
            value={formData.phoneNumber}
          />

          <input type="submit" value="ثبت نام" className="auth-form__button" />
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
