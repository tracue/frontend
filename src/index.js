import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider
} from '@apollo/client';
import store from './store';

const client = new ApolloClient({
    uri: process.env.REACT_APP_API_ENDPOINT,
    cache: new InMemoryCache(),
});

ReactDOM.render(<ApolloProvider client={client}>
    <Provider store={store}>
        <App />
    </Provider>
</ApolloProvider>, document.getElementById('root'));
