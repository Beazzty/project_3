import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type VocabProgress {
    vocabId: ID
    correct: Int
    incorrect: Int
  }

  enum SkillLevel {
    Beginner
    Intermediate
    Advanced
  }

  type Vocab {
    _id: ID!
    english: String!
    spanish: String!
    incorrect: Int!
    createdAt: String!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String
    skillLevel: SkillLevel!
    vocabProgress: [VocabProgress]
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
    skillLevel: SkillLevel!
  }

  input ResultInput {
    numQuestions: Int!
    numCorrect: Int!
    skillLevel: SkillLevel!
  }

  type Query {
    me: User
    quiz(skillLevel: SkillLevel!): [Vocab!]!
  }

  type Mutation {
    addUser(input: UserInput!): User!
    addResult(input: ResultInput!): User!
    removeResult(resultId: ID!): User!
  }
`;

export default typeDefs;
