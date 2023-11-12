const express = require('express');
const dotenv = require('dotenv')

const app = express();

dotenv.config();

// Require middleware functions
const corsMiddleware = require('./middlewares/corsMiddleware');
const jsonMiddleware = require('./middlewares/jsonMiddleware');
const urlencodedMiddleware = require('./middlewares/urlencodedMiddleware');

const port = process.env.PORT;

// Use Middleware
app.use(corsMiddleware);
app.use(jsonMiddleware);
app.use(urlencodedMiddleware);

// Import Route Files
const getRoute = require('./routes/getRoute');
const loginRoute = require('./routes/loginRoute');
const logoutRoute = require('./routes/logoutRoute');
const elementRoute = require('./routes/elementRoute');

// Use Routes
app.use('/api/login', loginRoute);
app.use('/api/logout', logoutRoute);
app.use('/api/elements', elementRoute);
app.use('/api/get', getRoute);

// Server Listener
app.listen(port, () => {
    console.log('====================================');
    console.log(`System Admin Server is running in ${port}`);
    console.log('====================================');
});