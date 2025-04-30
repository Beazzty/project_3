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
    password: String!
    skillLevel: Level
    vocabProgress: [VocabProgess!]!
  }

  type Stat {
    id: ID!
    user: User! // 1
    vocab: Vocab! // XYZ - 123
    correct: Boolean! // incorect
  }
`;

export default typeDefs;