import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';

import AuthContext from './AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props =>
        auth.isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
