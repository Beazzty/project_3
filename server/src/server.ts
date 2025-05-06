import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import path from 'path'; // Add this import

import db from './config/connection.js';
import { authMiddleware } from './utils/auth.js';
import typeDefs from './schemas/typeDefs.js';
import resolvers from './schemas/resolvers.js';

const PORT = process.env.PORT || 3001;
const app = express();

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors<cors.CorsRequest>());

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }) => {
        const modifiedReq = authMiddleware({ req });
        return { user: modifiedReq.user };
      },
    }),
  );

  // If we're in production, serve client/dist as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, '../../client/dist')));

    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, '../../client/dist/index.html')); // Use absolute path
    });
  }

  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  app.listen(PORT, () => {
    console.log(`🌍 Server ready at http://localhost:${PORT}/graphql`);
  });
}

startApolloServer();
