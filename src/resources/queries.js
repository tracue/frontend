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
query($page:Int!,$limit:Int){
  trending(page:$page,limit:$limit){
    movies{
      id
      title
      description
      posterUrl
      isWatched
      isWatchLater
      isFavorite
      tmdbId

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

export const ADDTOFAVORITES = gql`
  mutation($movieId:String!){
    addToFavorites(movieId:$movieId){
      email
    }
  }
`;

export const REMOVEFROMFAVORITES = gql`
  mutation($movieId:String!){
    removeFromFavorites(movieId:$movieId){
      email
    }
  }
`;

export const ADDTOWATCHLATER = gql`
  mutation($movieId:String!){
    addToWatchLater(movieId:$movieId){
      email
    }
  }
`;

export const REMOVEFROMWATCHLATER = gql`
  mutation($movieId:String!){
    removeFromWatchLater(movieId:$movieId){
      email
    }
  }
`;

export const UPCOMING = gql`
  query {
    upcoming {
      id
      title
      backdropUrl
      releaseDate
    }
  }
`;

export const MOVIE = gql`
  query($tmdbId:Int!){
    movie(tmdbId:$tmdbId){
      id
      title
      releaseDate
      description
      genres
      length
      posterUrl
      backdropUrl
      imdbUrl
      isFavorite
      isWatched
      isWatchLater
      counts{
        favorites
        watched
        watchLater
      }
    }
  }
`;

export const WATCHED = gql`
  query($limit:Int){
    me{
      watched(limit:$limit){
        id
        title
        description
        posterUrl
        isWatched
        isWatchLater
        isFavorite
        tmdbId
      }
    }
  }
`;

export const WATCHLATER = gql`
  query($limit:Int){
    me{
      watchLater(limit:$limit){
        id
        title
        description
        posterUrl
        isWatched
        isWatchLater
        isFavorite
        tmdbId
      }
    }
  }
`;

export const FAVORITES = gql`
  query($limit:Int){
    me{
      favorites(limit:$limit){
        id
        title
        description
        posterUrl
        isWatched
        isWatchLater
        isFavorite
        tmdbId
      }
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

