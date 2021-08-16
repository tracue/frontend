import { gql } from '@apollo/client';

export const SIGN_UP = gql`
  mutation ($email: String!, $password: String!, $username: String!) {
    signup(email: $email, username: $username, password: $password) {
      token
    }
  }
`;

export const LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const AUTHENTICATE = gql`
  query {
    me {
      email
    }
  }
`;

export const ME = gql`
  query {
    me {
      username
      avatar
      bio
      email
    }
  }
`;

export const TRENDING = gql`
  query($page:Int!){
    trending(page:$page){
      movies{
        id
        title
        description
        posterUrl
        isWatched
      }
      totalPages
    }
  }
`;

export const ADDTOWATCHED = gql`
  mutation($movieId:String!){
    addToWatched(movieId:$movieId){
      email
    }
  }
`;
export const REMOVEFROMWATCHED = gql`
  mutation($movieId:String!){
    removeFromWatched(movieId:$movieId){
      email
    }
  }
`;

export const getRequestOptions = (cookies) => {
  return {
    context: {
      headers: {
        authorization: cookies.TRACUE_AUTH ?? '',
      },
    },
    fetchPolicy: 'no-cache',
  };
};

