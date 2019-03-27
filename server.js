const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

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
  ],
  login: [
    {
      id: '987',
      hash: 'hash',
      email: 'test@tes.com'
    }
  ]
};

app.get('/', (req, res) => {
  res.send(database.users);
});

app.post('/signin', (req, res) => {
  // Load hash from your password DB.
  bcrypt.compare(
    'apples',
    '$2a$10$42LLHhTP4wOc8QBk9gV91.4czxrujThr5LR/DmVI86psS0r4GCEBC',
    function(err, res) {
      console.log('1st guess', res);
    }
  );
  bcrypt.compare(
    'veggies',
    '$2a$10$42LLHhTP4wOc8QBk9gV91.4czxrujThr5LR/DmVI86psS0r4GCEBC',
    function(err, res) {
      console.log('2nd guess', res);
    }
  );
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

app.post('/register', (req, res) => {
  const { email, name, password } = req.body;
  // bcrypt.hash(password, null, null, function(err, hash) {
  //   console.log(hash);
  //   // Store hash in your password DB.
  // });
  database.users.push({
    id: '125',
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date()
  });
  res.json(database.users[database.users.length - 1]);
});

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(400).json('User not found');
  }
});

app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(400).json('User not found');
  }
});

// bcrypt.hash('bacon', null, null, function(err, hash) {
//   // Store hash in your password DB.
// });

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
