import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import AuthContext from './AuthContext';

class AuthProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: localStorage.getItem('token') ? true : false,
      token: localStorage.getItem('token') || '',
      user: localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))
        : {},
    };

    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
    // this.verify = this.verify.bind(this);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.setState({
      isLoggedIn: false,
      token: '',
      user: {},
    });

    this.props.history.push('/');
  }

  login({ token, user }) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.setState({
      isLoggedIn: true,
      token,
      user,
    });

    this.props.history.push('/');
  }

  async verify() {
    const shouldVerify =
      this.state.isLoggedIn && this.state.token && this.state.user.id;

    if (!shouldVerify) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      return this.setState({
        isLoggedIn: false,
        token: '',
        user: {},
      });
    }

    const result = await fetch(`/api/users/${this.state.user.id}`, {
      headers: {
        'auth-token': this.state.token,
      },
    });
    const data = await result.json();

    if (!data.success) {
      return this.logout();
    }

    const normalizedUser = {
      id: data.user.id,
      username: data.user.username,
      name: data.user.name,
      admin: data.user.role === 'admin',
    };

    localStorage.setItem('user', JSON.stringify(normalizedUser));

    this.setState({
      ...this.state,
      user: normalizedUser,
    });
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          isLoggedIn: this.state.isLoggedIn,
          user: this.state.user,
          token: this.state.token,
          logout: this.logout,
          login: this.login,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }

  componentDidMount() {
    this.verify();
  }
}

export default withRouter(AuthProvider);
