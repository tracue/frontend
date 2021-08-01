import './App.scss';
import LandingPage from './components/pages/landing-page/LandingPage';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from './components/private-route/PrivateRoute';
import Home from './components/pages/home/Home';
import { CookiesProvider } from 'react-cookie';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from '@apollo/client';



const client = new ApolloClient({
  uri: process.env.REACT_APP_API_ENDPOINT,
  cache: new InMemoryCache(),
});

function App() {


  return (
    <ApolloProvider client={client}>
      <CookiesProvider>
        <Router>
          <div className="App">
            <Route exact path="/">
              <LandingPage />
            </Route>
            <PrivateRoute path="/home">
              <Home />
            </PrivateRoute>
          </div>
        </Router>
      </CookiesProvider>
    </ApolloProvider>
  );
}

export default App;
