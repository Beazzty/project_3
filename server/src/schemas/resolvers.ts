import User from '../models/User.js'; // Add .js extension
import { AuthenticationError } from 'apollo-server-express';
import { signToken } from '../utils/auth.js'; // Add .js extension
import { IUser } from '../models/User';

const resolvers = {
  Query: {
    me: async (_parent: unknown, _args: unknown, context: { user: IUser }) => {
      if (context.user) {
        return await User.findById(context.user._id);
      }
      throw new AuthenticationError('You must be logged in');
    },
  },
  Mutation: {
    addUser: async (_parent: unknown, { input }: { input: IUser }) => {
      const user = await User.create(input);
      const token = signToken(user.toObject()); // Convert Mongoose document to plain object
      return { token, user };
    },
    login: async (_parent: unknown, { input }: { input: { email: string; password: string } }) => {
      const user = await User.findOne({ email: input.email });
      if (!user) {
        throw new AuthenticationError('No user found with this email');
      }
      const isPwCorrect = await user.isCorrectPassword(input.password);
      if (!isPwCorrect) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user.toObject()); // Convert Mongoose document to plain object
      return { token, user };
    },
  },
};

export default resolvers;
