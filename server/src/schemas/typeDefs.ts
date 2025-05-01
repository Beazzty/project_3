import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type VocabProgress {
    vocabId: ID
    correct: Int
    incorrect: Int
  }

  type User {
    _id: ID
    username: String
    email: String
    skillLevel: String
    vocabProgress: [VocabProgress]
  }

  type Auth {
    token: String
    user: User
  }

  input UserInput {
    username: String
    email: String
    password: String
    skillLevel: String
  }

  type Query {
    me: User
  }

  type Mutation {
    addUser(input: UserInput): Auth
    login(input: UserInput): Auth
  }
`;

export default typeDefs;
