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

export const CREATE_MATCHUP = gql`
  mutation CreateMatchup($tech1: String!, $tech2: String!) {
    createMatchup(tech1: $tech1, tech2: $tech2) {
      _id
    }
  }
`;

export const CREATE_VOTE = gql`
  mutation CreateVote($id: ID!, $techNum: Int!) {
    createVote(id: $id, techNum: $techNum) {
      _id
      tech1_votes
      tech2_votes
    }
  }
`;
