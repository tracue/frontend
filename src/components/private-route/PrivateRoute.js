import { Route } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useLazyQuery } from '@apollo/client';
import { ME } from '../../resources/queries';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import Loading from '../loading/Loading';
import { connect } from 'react-redux';

const PrivateRoute = ({ children, isAuthenticate, ...rest }) => {
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
    if (isAuthenticate) {
      setAuth(true)
    }
  }, [isAuthenticate])


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

const mapStateToProps = (state) => {
  return {
    isAuthenticate: state.isAuthenticate
  }
}


export default connect(mapStateToProps)(PrivateRoute);
