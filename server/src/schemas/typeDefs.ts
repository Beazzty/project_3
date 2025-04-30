const typeDefs = `
  enum Level {
    Beginner
    Intermediate
    Advanced
  }

  type Vocab {
    id: ID!
    word: String!
    translation: String!
    level: Level!
  }

  type User {
    id: ID!
    username: String
    email: String
    skillLevel: Level!
    vocabProgress: [VocabProgess!]!
  }

  type Stat {
    id: ID!
    user: User!
    vocab: Vocab!
    correct: Boolean!
    createdAt: String!
  }

  input AddUserInput {
    username: String
    email: String
    password: String!
    skillLevel: SkillLevel!
  }

  input LoginInput {
    username: String
    passsword: String!
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
    flashcardsByLevel(level: Level!): [Vocabs!]!
    statsByUser(userId: ID!): [Stat!]!
  }

  type Mutations {
    addUser(input: AddUserInput!): AuthPayload!
    login(input: LoginInput!): AuthPayload!
    saveStat(input: SaveStatInput!): Stat!
  }
`;

export default typeDefs;