import { gql } from 'apollo-server-express';

const typeDefs = gql`
enum SkillLevel {
Beginner
Intermediate
Advanced
}
// Main object types



type User {
_id: ID!
username: String!
email: String!
password: String!
skillLevel: SkillLevel!
}

type Vocab {
_id: ID!
english: String!
spanish: String!
incorrect: Int!
createdAt: String!

}

input UserInput {
username: String!
email: String!
password: String!
skillLevel: SkillLevel!
}

input ResultInput {
id: ID!
userId: ID!
numQuestions: int!
skillLevel: SkillLevel!
}

type Query {
    # Return the current logged-in user
    me: User

    # Fetch a quiz (list of flashcards) for the requested level
    quiz(skillLevel: SkillLevel!): [Vocab!]!
  }

  type Mutation {
    # Create a new user account
    addUser(input: UserInput!): User!

    # Record a quiz result (updates User.vocabProgress under the hood)
    addResult(input: ResultInput!): User!

    # Remove one past Result by its ID
    removeResult(resultId: ID!): User!
  }
`;

export default typeDefs;
