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
      translation
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

export const QUERY_MATCHUPS = gql`
  query Matchups {
    matchups {
      _id
      tech1
      tech2
      tech1_votes
      tech2_votes
    }
  }
`;

export const QUERY_TECH = gql`
  query Tech {
    tech {
      _id
      name
    }
  }
`;
