import { User } from '../models';
import { signToken } from '../utils/auth';
import { AuthenticationError } from 'apollo-server-express';

const resolvers = {
  Query: {
    me: async (_parent, _args, context) => {
      if (context.user) {
        return await User.findById(context.user._id);
      }
      throw new AuthenticationError('You must be logged in');
    },
  },

  Mutation: {
    addUser: async (_parent, { input }) => {
      const user = await User.create(input);
      const token = signToken(user);
      return { token, user };
    },

    login: async (_parent, { input }) => {
      const user = await User.findOne({ email: input.email });

      if (!user) {
        throw new AuthenticationError('No user found with this email');
      }

      const isPwCorrect = await user.isCorrectPassword(input.password);

      if (!isPwCorrect) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },

    // Placeholder for future stat saving
    saveStat: async () => {
      throw new Error('saveStat not implemented yet');
    },
  },
};

export default resolvers;
