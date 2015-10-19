import express from 'express';
import graphQLHTTP from 'express-graphql';
import {Schema} from './src/schema';

const GRAPHQL_PORT = 8080;

const graphqlApp = express();

graphqlApp.use('/', graphQLHTTP({schema: Schema, pretty: true}));

graphqlApp.use(express.static(__dirname));

graphqlApp.listen(GRAPHQL_PORT, () => {
  console.log(
    `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
  );
});
