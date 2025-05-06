import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($input: AddUserInput!) {
    addUser(input: $input) {
      token
      user { _id username }
    }
  }
`;

export const LOGIN = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      token
      user { _id username }
    }
  }
`;

export const SAVE_STAT = gql`
  mutation addResult($input: ResultInput!) {
    addResult(input: $input) { _id }
  }
`;
