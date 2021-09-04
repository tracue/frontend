import './App.scss';
import LandingPage from './components/pages/landing-page/LandingPage';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from './components/private-route/PrivateRoute';
import Home from './components/pages/home/Home';
import { CookiesProvider } from 'react-cookie';
import { useCookies } from 'react-cookie';
import { TRENDING, WATCHED, WATCHLATER, FAVORITES, getRequestOptions } from './resources/queries';
import { ME } from './resources/queries';
import SeeMore from './components/pages/see-more/SeeMore';
import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import Movie from './components/pages/movie/Movie';
import { ToastContainer } from 'react-toastify';
import Account from './components/pages/account/Account';
import { useSelector, useDispatch } from 'react-redux';
import authenticate from './actionCreators/authenticate';

function App() {
  const [cookies] = useCookies(['TRACUE_AUTH']);
  const isAuthenticated = useSelector((state) => state.authentication)
  const dispatch = useDispatch();
  const [validation, { loading, data, error }] = useLazyQuery(ME);
  useEffect(() => {
    if (!isAuthenticated) {
      if (cookies.TRACUE_AUTH) {
        validation(getRequestOptions(cookies));
      } else {
        dispatch(authenticate(false));
      }
    }
  }, [cookies.TRACUE_AUTH]);

  useEffect(() => {
    console.log(error);
    if (data && data.me) {
      dispatch(authenticate(true));
    }
  }, [error, data]);

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
          </PrivateRoute>
          <PrivateRoute path="/account">
            <Account />
          </PrivateRoute>


          <ToastContainer />
        </div>
      </Router>
    </CookiesProvider>
  );
}

export default App;
