import { Route, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useLazyQuery } from '@apollo/client';
import { ME } from '../../resources/queries';
import { useState } from 'react';
import { useEffect } from 'react';

const PrivateRoute = ({ children, ...rest }) => {
  const [cookies, setCookie] = useCookies(['token']);
  const [auth, setAuth] = useState(false);

  const [validation, { loading, data, error }] = useLazyQuery(ME, {
    context: {
      headers: {
        authorization: cookies.token,
      },
    },
    fetchPolicy: 'no-cache',
  });

  const isAuthenticated = () => {
    if (!cookies.token) {
      return false;
    }
    validation();
    return true;
  };
  
  useEffect(() => {
      if(data && !error) {
          setAuth(true);
      }
  }, [data, error]);


  return (
    <Route
      {...rest}
      render={({ location }) => {
        return isAuthenticated() && auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
