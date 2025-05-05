import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($input: AddUserInput!) {
    addUser(input: $input) {
      token
      user { 
      id
      }
}
  }
`;

export const REMOVE_RESULT = gql`
mutation removeResult($resultId: ID!) {
  removeResult(resultId: $resultId)

  }
`;