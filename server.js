const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

require('dotenv').config();

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1', //localhost
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_USER
  }
});

db.select('*')
  .from('users')
  .then(data => {
    //console.log(data);
  });

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('it is working');
});

app.post('/signin', (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

app.post('/register', (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get('/profile/:id', (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.put('/image', (req, res) => {
  image.handleImage(req, res, db);
});

app.post('/imageurl', (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

/*

/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userID --> GET = user
/image --> PUT --> user

*/
