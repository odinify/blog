import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';

import AuthContext from './AuthContext';

const AdminRoute = ({ component: Component, ...rest }) => {
  const auth = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props =>
        auth.isLoggedIn && auth.user.admin ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default AdminRoute;
