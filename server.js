const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
const database = {
  users: [
    {
      id: '123',
      name: 'Dan',
      email: 'test@tes.com',
      password: 'cookies',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'Sally',
      email: 'sally@tes.com',
      password: 'ice',
      entries: 0,
      joined: new Date()
    }
  ]
};

app.get('/', (req, res) => {
  res.send('I am sending something');
});

app.post('/signin', (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json('success');
  } else {
    res.status(400).json('error logging in');
  }
  res.json('signin');
});

app.post('/register', (req, res) => {});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

/*

/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userID --> GET = user
/image --> PUT --> user

*/
