import { gql } from "@apollo/client";

export const SIGN_UP = gql`
mutation($email:String!,$password:String!,$username:String!){
  signup(email:$email,username:$username,password:$password){
    token
  }
}
  `

export const LOGIN = gql`
mutation($email:String!,$password:String!){
  login(email:$email,password:$password){
    token
  }
}
  `