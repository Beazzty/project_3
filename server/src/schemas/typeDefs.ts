import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
  }

  type Auth {
    token: String
    user: User
  }

  input UserInput {
    username: String
    email: String
    password: String
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
