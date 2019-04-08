const handleSignin = (req, res, db, bcrypt) => {
  const { email, password } = req.body; // destructure req.body to save some code
  if (!email || !password) {
    return res.status(400).json('Incorrect form submission'); // form validation to make sure user enters correct format and does not leave inputs blank --> never trust the frontend validation
  }
  db.select('email', 'hash')
    .from('login')
    .where('email', '=', email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash); // true
      if (isValid) {
        return db
          .select('*')
          .from('users')
          .where('email', '=', email)
          .then(user => {
            res.json(user[0]);
          })
          .catch(err => res.status(400).json('user not found, pls try again'));
      } else {
        res.status(400).json('Wrong credentials');
      }
    })
    .catch(err => res.status(400).json('wrong credentials'));
};

module.exports = {
  handleSignin: handleSignin
};
