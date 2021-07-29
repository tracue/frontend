import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {ApolloClient,InMemoryCache,ApolloProvider,useQuery,gql} from "@apollo/client";
import dotenv from "dotenv";
dotenv.config({ silent: process.env.NODE_ENV === 'production' });

const client = new ApolloClient({
    uri: process.env.API_ENDPOINT,
    cache: new InMemoryCache()
  });

ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
    , document.getElementById('root'));