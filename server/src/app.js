require("dotenv").config();

const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const app = express();
const cors = require('cors');

const port = process.env.PORT || 4444;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database
require('./config/database');

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));


app.listen(port, console.log("Server listening on port: " + port));
