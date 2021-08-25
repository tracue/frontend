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
      email
      username
      gender
      avatar
      bio
    }
  }
`;

export const TRENDING = gql`
  query ($page: Int!) {
    trending(page: $page) {
      movies {
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
  mutation ($movieId: String!) {
    addToWatched(movieId: $movieId) {
      email
    }
  }
`;
export const REMOVEFROMWATCHED = gql`
  mutation ($movieId: String!) {
    removeFromWatched(movieId: $movieId) {
      email
    }
  }
`;

export const UPDATEUSER = gql`
  mutation ($input: UserEditInput) {
    updateUser(input: $input) {
      email
      username
      gender
      avatar
      bio
    }
  }
`;

export const CHANGEEMAIL = gql`
  mutation ($newEmail: String) {
    changeEmail(newEmail: $newEmail) {
      email
    }
  }
`;

export const CHANGEPASSWORD = gql`
  mutation ($input: PasswordEditInput) {
    changePassword(input: $input) {
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
