import { gql } from 'apollo-server-express';

const typeDefs = gql`
  enum Level {
    Beginner
    Intermediate
    Advanced
  }

  type Vocab {
    _id: ID!
    word: String!
    translation: String!
    level: Level!
  }

  type VocabProgress {
    vocabId: ID!
    correct: Int
    incorrect: Int
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    skillLevel: Level!
    vocabProgress: [VocabProgress!]!
  }

  type Stat {
    _id: ID!
    user: User!
    vocab: Vocab!
    correct: Boolean!
    createdAt: String!
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

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    me: User
    flashcardsByLevel(level: Level!): [Vocab!]!
    statsByUser(userId: ID!): [Stat!]!
  }

  type Mutation {
    addUser(input: AddUserInput!): AuthPayload!
    login(input: LoginInput!): AuthPayload!
    saveStat(input: SaveStatInput!): Stat!
  }
`;

export default typeDefs;
