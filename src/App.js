import './App.scss';
import LandingPage from './components/pages/landing-page/LandingPage';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from './components/private-route/PrivateRoute';
import Home from './components/pages/home/Home';
import { CookiesProvider } from 'react-cookie';
import { useCookies } from 'react-cookie';
import { TRENDING } from './resources/queries';
import { ME } from './resources/queries';
import SeeMore from './components/pages/trending/SeeMore';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { ToastContainer } from 'react-toastify';
import Account from './components/pages/account/Account';

function App({ isAuthenticate, Authenticate, disAuthenticate }) {
  const [cookies] = useCookies(['TRACUE_AUTH']);
  const [validation, { loading, data, error }] = useLazyQuery(ME, {
    context: {
      headers: {
        authorization: cookies.TRACUE_AUTH,
      },
    },
    fetchPolicy: 'no-cache',
  });
  useEffect(() => {
    if (!isAuthenticate) {
      if (cookies.TRACUE_AUTH) {
        validation();
      }
    }
  }, []);

  useEffect(() => {
    if (data?.me) {
      console.log('before:  ' + isAuthenticate);
      Authenticate();
      console.log('after:  ' + isAuthenticate);
    }
  }, [data]);

  return (
    <CookiesProvider>
      <Router>
        <div className="App">
          <Route exact path="/">
            <LandingPage />
          </Route>
          <PrivateRoute path="/home">
            <Home />
          </PrivateRoute>
          <PrivateRoute path="/account">
            <Account />
          </PrivateRoute>
          <PrivateRoute path="/trending/:page">
            <SeeMore title="Trending" QUERY={TRENDING} name={'trending'} />
          </PrivateRoute>
          <ToastContainer />
        </div>
      </Router>
    </CookiesProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticate: state.isAuthenticate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    Authenticate: () => {
      dispatch({ type: 'AUTHENTICATE' });
    },
    disAuthenticate: () => {
      dispatch({ type: 'DISAUTHENTICATE' });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
