import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  enum Level {
    BEGINNER
    INTERMEDIATE
    ADVANCED
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    skillLevel: Level!
  }

  type Vocab {
    _id: ID!
    word: String!
    translation: String!
    level: Level!
    options: [String!]!
  }

  type Stat {
    _id: ID!
    userId: ID!
    vocabId: ID!
    correct: Boolean!
    level: Level
    createdAt: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input AddUserInput {
    username: String!
    email: String!
    password: String!
    skillLevel: Level!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input SaveStatInput {
    vocabId: ID!
    correct: Boolean!
  }

  type Query {
    me: User
    flashcardsByLevel(level: Level!): [Vocab]!
    getStats: [Stat]!
  }

  type Mutation {
    addUser(input: AddUserInput!): AuthPayload!
    login(input: LoginInput!): AuthPayload!
    saveStat(input: SaveStatInput!): Stat!
  }
`;

export default typeDefs;
