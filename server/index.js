require('./src/check-env-vars');
const express = require('express');
const helmet = require('helmet');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const requestIp = require('request-ip');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const pick = require('lodash/pick');
const schema = require('./src/graphql/exec-schema');
const initDB = require('./src/models/init-db');
// const users = require('./src/routes/users');
// const auth = require('./src/routes/auth');
const login = require('./src/routes/login');
const events = require('./src/routes/events');

// Extend Joi validator by adding objectId type
Joi.objectId = require('joi-objectid')(Joi);

//------------------------------------------------------------------------------
// LOGS
//------------------------------------------------------------------------------
// Log env vars
const {
  NODE_ENV,
  PORT,
  MONGO_URL,
  JWT_PRIVATE_KEY,
} = process.env;

const isNotProduction = NODE_ENV !== 'production';

console.log(
  '\nprocess.env.NODE_ENV', NODE_ENV,
  '\nprocess.env.PORT', PORT,
  '\nprocess.env.MONGO_URL', MONGO_URL,
);

//------------------------------------------------------------------------------
// INIT EXPRESS SERVER
//------------------------------------------------------------------------------
// Initialize Express server. Port is set by Heroku when the app is deployed or
// when running locally using the 'heroku local' command.
const app = express();
app.set('port', (PORT || 5001));

//------------------------------------------------------------------------------
// MIDDLEWARES
//------------------------------------------------------------------------------
// Apply middleware to parse incoming body requests into JSON format.
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Enable the app to receive requests from the React app when running locally.
if (isNotProduction) {
  app.use('*', cors({ origin: 'http://localhost:5000' }));
}
app.use(requestIp.mw()); // req.clientIp

//------------------------------------------------------------------------------
// MONGO CONNECTION
//------------------------------------------------------------------------------
mongoose.connect(MONGO_URL, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', console.log.bind(console, `Database connected to ${MONGO_URL}`));

// Clean and populate DB
initDB();

//------------------------------------------------------------------------------
// SERVER STATIC FILE
//------------------------------------------------------------------------------
// Serve static files from the React app
const staticFiles = express.static(path.join(__dirname, '../../client/build'));
app.use(staticFiles);

//------------------------------------------------------------------------------
// APOLLO SERVER
//------------------------------------------------------------------------------
const getUser = async (req) => {
  const token = (req && req.headers && req.headers.authorization) || null;
  const ip = (req && req.clientIp) || null;
  // console.log('user IP', ip);
  // console.log('req.headers', req && req.headers);
  // console.log('req.headers', req && req.headers && req.headers.authorization);

  if (!token) {
    return { ip };
  }

  try {
    const json = await jwt.verify(token, JWT_PRIVATE_KEY);
    return Object.assign({}, pick(json, '_id'), { ip });
  } catch (exc) {
    console.error('Not authorized');
    return null;
  }
};

const server = new ApolloServer({
  schema,
  context: async ({ req }) => ({
    usr: await getUser(req),
    // usr: { _id: '5b7be6b5f799de5c5ce126a4' },
  }),
  playground: {
    settings: {
      'editor.theme': 'light',
    },
  },
});
server.applyMiddleware({ app, path: '/graphql' });

//------------------------------------------------------------------------------
// ROUTES
//------------------------------------------------------------------------------
// app.use('/api/users', users);
// app.use('/api/auth', auth);
app.use('/api/login', login);
app.use('/api/events', events);

//------------------------------------------------------------------------------
// CATCH ALL
//------------------------------------------------------------------------------
// The "catchall" handler: for any request that doesn't match one above, send
// back React's index.html file.
app.use('*', staticFiles);

//------------------------------------------------------------------------------
// LISTEN
//------------------------------------------------------------------------------
app.listen(app.get('port'), () => {
  console.log(`Apollo server listening on http://localhost:${app.get('port')}/graphql`);
});
