import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import AuthContext from './AuthContext';

const GuestRoute = ({ component: Component, ...rest }) => {
  const auth = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props =>
        auth.isLoggedIn ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default GuestRoute;
