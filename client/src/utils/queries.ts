import { gql } from '@apollo/client';

export const GET_ME = gql`
  query Me {
    me { _id username email skillLevel }
  }
`;

export const GET_QUIZ = gql`
  query Quiz($level: Level!) {
     flashcardsByLevel(level: $level) {
      _id
      word
      options
    }
  }
`;

export const GET_STATS = gql`
  query Stats($userId: ID!) {
    statsByUser(userId: $userId) {
      _id
      numQuestions
      numCorrect
      skillLevel
      createdAt
    }
  }
`;
