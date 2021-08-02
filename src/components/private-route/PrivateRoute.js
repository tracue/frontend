import { Route, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useLazyQuery } from '@apollo/client';
import { ME } from '../../resources/queries';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

const PrivateRoute = ({ children, ...rest }) => {
  const [cookies] = useCookies(['TRACUE_AUTH']);
  const [auth, setAuth] = useState(false);
  const history = useHistory();
  const [validation, { data }] = useLazyQuery(ME, {
    context: {
      headers: {
        authorization: cookies.TRACUE_AUTH,
      },
    },
    fetchPolicy: 'no-cache',
  });
  useEffect(() => {
    if (cookies.TRACUE_AUTH) {
      //check if cookie is valid
      validation();
    } else {
      setAuth(false);
    }
  }, [cookies.TRACUE_AUTH, validation]);
  useEffect(() => {
    if (data && data.me) {
      setAuth(true);
    }
  }, [data, history]);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return auth ? (
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
