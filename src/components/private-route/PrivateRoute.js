import { Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import Loading from '../loading/Loading';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.authentication);
  const [auth, setAuth] = useState(false);
  const history = useHistory();;

  useEffect(() => {
    if (isAuthenticated === 'true') {
      setAuth(true)
    } else if (isAuthenticated === 'false') {
      history.push('/')
    }
  }, [isAuthenticated])


  return (
    <>
      <Route
        {...rest}
        render={({ location }) => {
          return auth ? (
            children
          ) : (
            <Loading />
          );
        }}
      />
    </>
  );
};


export default PrivateRoute;
