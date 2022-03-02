const express = require('express');
// import Apollo Server
const { ApolloServer } = require('apollo-server-express');
// import our typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');

const db = require('./config/connection');


const PORT = process.env.PORT || 3001;
const app = express();

const startServer = async () => {
  // create a new Apollo server and pass in our schema data
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  // start the Apollo server
  await server.start();

  // integrate our Apollo server with the express application as middleware
  server.applyMiddleware({ app });

  // log where we can go to test our graphql api
  console.log(`Use GraphQl at https://localhost:${PORT}${server.graphqlPath}`)
};

// initialize the Apollo server
startServer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
