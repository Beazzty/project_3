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
