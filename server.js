const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('I am sending something');
});

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
