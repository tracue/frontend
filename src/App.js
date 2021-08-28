import './App.scss';
import LandingPage from './components/pages/landing-page/LandingPage';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from './components/private-route/PrivateRoute';
import Home from './components/pages/home/Home';
import { CookiesProvider } from 'react-cookie';
import { useCookies } from 'react-cookie';
import { TRENDING, WATCHED, WATCHLATER, FAVORITES } from './resources/queries';
import { ME } from './resources/queries';
import SeeMore from './components/pages/see-more/SeeMore';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import Movie from './components/pages/movie/Movie';
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
      Authenticate();
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
          <PrivateRoute path="/movie/:id">
            <Movie />
          </PrivateRoute>
          <PrivateRoute path="/trending/:page">
            <SeeMore title='Trending' QUERY={TRENDING} name={'trending'} meQuery={false} />
          </PrivateRoute>
          <PrivateRoute path="/watched">
            <SeeMore title='Watched' QUERY={WATCHED} name={'watched'} meQuery={true} />
          </PrivateRoute>
          <PrivateRoute path="/watchLater">
            <SeeMore title='WatchLater' QUERY={WATCHLATER} name={'watchLater'} meQuery={true} />
          </PrivateRoute>
          <PrivateRoute path="/favorites">
            <SeeMore title='Favorites' QUERY={FAVORITES} name={'favorites'} meQuery={true} />
            <PrivateRoute path="/account">
              <Account />
            </PrivateRoute>

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
