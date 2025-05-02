import User from '../models/User.js';
import { AuthenticationError } from 'apollo-server-express';
import { signToken } from '../utils/auth.js';
import { IUser } from '../models/User';

const resolvers = {
  Query: {
    me: async (_parent: unknown, _args: unknown, context: { user: IUser }) => {
      if (context.user) {
        return await User.findById(context.user._id).populate('vocabProgress.vocabId');
      }
      throw new AuthenticationError('You must be logged in');
    },
  },
  Mutation: {
    addUser: async (_parent: unknown, { input }: { input: Partial<IUser> }) => {
      const { email, skillLevel, vocabProgress, ...rest } = input;

      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new AuthenticationError('User already exists with this email');
      }

      // Validate skillLevel
      if (skillLevel !== 'Beginner' && skillLevel !== 'Intermediate' && skillLevel !== 'Advanced') {
        throw new AuthenticationError('Invalid skill level. Must be Beginner, Intermediate, or Advanced');
      }

      // Create the user
      const user = await User.create({
        ...rest,
        email,
        skillLevel,
        vocabProgress: vocabProgress || [], // Default to an empty array if not provided
      });

      // Generate a token
      const token = signToken(user.toObject()); // Convert Mongoose document to plain object

      return { token, user };
    },
    login: async (
      _parent: unknown,
      { input: { email, password } }: { input: { email: string; password: string } }
    ) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('No user found with this email');
      }

      const isPwCorrect = await user.isCorrectPassword(password);
      if (!isPwCorrect) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user.toObject()); // Convert Mongoose document to plain object
      return { token, user };
    },
  },
};

export default resolvers;
