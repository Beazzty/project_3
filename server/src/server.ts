import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';

import db from './config/connection';
import { authMiddleware } from './utils/auth';
import typeDefs from './schemas/typeDefs';
import resolvers from './schemas/resolvers';

const PORT = process.env.PORT || 3001;
const app = express();
const httpServer = http.createServer(app);

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: authMiddleware,
    })
  );

  db.once('open', () => {
    httpServer.listen(PORT, () => {
      console.log(`🌍 Server ready at http://localhost:${PORT}/graphql`);
    });
  });
}

startApolloServer();
