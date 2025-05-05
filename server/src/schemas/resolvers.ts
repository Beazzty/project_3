import { UserInputError, AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { User, VocabSet, Result } from '../models/index.js';

const SECRET = process.env.JWT_SECRET || 'mysecretkey';

interface GraphQLContext {
  user: { _id: string } | null;
}

function shuffleArray<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5);
}

const resolvers = {
  Query: {
    me: async (_parent: unknown, _args: unknown, context: GraphQLContext) => {
      if (!context.user) throw new AuthenticationError('Not authenticated');
      return await User.findById(context.user._id);
    },
    flashcardsByLevel: async (
      _parent: unknown,
      { level }: { level: string }
    ) => {
      const allVocabs = await VocabSet.find();
      const levelVocabs = await VocabSet.find({ level });

      return levelVocabs.map((vocab) => {
        const incorrects = shuffleArray(
          allVocabs.filter(v => v._id.toString() !== vocab._id.toString())
        ).slice(0, 3).map(v => v.translation);

        const options = shuffleArray([vocab.translation, ...incorrects]);

        return {
          ...vocab.toObject(),
          options,
        };
      });
    },
    getStats: async (_parent: unknown, _args: unknown, context: GraphQLContext) => {
      if (!context.user) throw new AuthenticationError('Not authenticated');
      const stats = await Result.find({ userId: context.user._id });
    
      const enrichedStats = await Promise.all(stats.map(async stat => {
        const vocab = await VocabSet.findById(stat.vocabId);
        return {
          ...stat.toObject(),
          level: vocab?.level || 'BEGINNER',
        };
      }));
    
      return enrichedStats;
    }
  },
  Mutation: {
    addUser: async (
      _parent: unknown,
      { input }: { input: { username: string; email: string; password: string; skillLevel: string } }
    ) => {
      const { username, email, password, skillLevel } = input;
      if (!username || !email || !password)
        throw new UserInputError('All fields required');
      const existing = await User.findOne({ email });
      if (existing) throw new UserInputError('Email already in use');
      const hashed = await bcrypt.hash(password, 10);
      const user = await User.create({ username, email, password: hashed, skillLevel });
      const token = jwt.sign({ _id: user._id }, SECRET);
      return { token, user };
    },
    login: async (
      _parent: unknown,
      { input }: { input: { email: string; password: string } }
    ) => {
      const { email, password } = input;
      const user = await User.findOne({ email });
      if (!user) throw new AuthenticationError('Invalid credentials');
      const match = await bcrypt.compare(password, user.password);
      if (!match) throw new AuthenticationError('Invalid credentials');
      const token = jwt.sign({ _id: user._id }, SECRET);
      return { token, user };
    },
    saveStat: async (
      _parent: unknown,
      { input }: { input: { vocabId: string; correct: boolean } },
      context: GraphQLContext
    ) => {
      if (!context.user) throw new AuthenticationError('Login required');
    
      const { vocabId, correct } = input;
      const user = await User.findById(context.user._id);
      if (!user) throw new AuthenticationError('User not found');
    
      const stat = await Result.create({
        userId: user._id,
        vocabId,
        correct,
      });
    
      return stat;
    }
  },
};

export default resolvers;
