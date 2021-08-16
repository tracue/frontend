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
  const [validation, { loading, data, error }] = useLazyQuery(ME, {
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
      history.push('/')
    }
  }, [cookies.TRACUE_AUTH, validation]);
  useEffect(() => {
    if (data?.me) {
      setAuth(true);
    }
  }, [data, history]);
  useEffect(() => {
    if (!loading && error) {
      history.replace('/')
    }
  }, [data, error])


  return (
    <>
      <Route
        {...rest}
        render={({ location }) => {
          return auth ? (
            children
          ) : (
            <div>loading</div>
          );
        }}
      />
    </>
  );
};

export default PrivateRoute;
