
const path = require('path'); 
const express = require('express');
// import Apollo Server
const { ApolloServer } = require('apollo-server-express');
// import our typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
// import middleware functions
const { authMiddleware } = require('./utils/auth')

const db = require('./config/connection');


const PORT = process.env.PORT || 3001;
const app = express();

const startServer = async () => {
  // create a new Apollo server and pass in our schema data
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // insure every request performs an authentication check.. updated request object will be passed to resolver as context
    context: authMiddleware
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

// Serve up static assets
// check to see if node environment is in production... if yes express.js to sserver to serve any files in the react app build directory in the client folder
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}
// wildcard get route
app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
})

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
