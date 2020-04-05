const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const session = require('express-session');

router.get('/', (req, res) => {
  res.render('pages/loginForm');
});

function connectToDb() {
  const pool = new Pool({
    user: 'elijah',
    host: 'localhost',
    database: 'postgres',
    password: 'elijah',
    port: 5432
  });
  return pool;
}

function validateUser(user) {
  const valiedEmail = typeof user.email == 'string' && user.email.trim() != ' ';
  const valiedPassword =
    typeof user.password == 'string' &&
    user.password.trim() != ' ' &&
    user.password.trim().length >= 6;
  return valiedEmail && valiedPassword;
}

var verifyLogin = function(req, res, next) {
  if (req.session.username) {
    next();
  } else {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ status: 401, success: false }));
    res.end();
  }
};

router.use(
  session({
    secret: 'much secret',
    resave: false,
    saveUninitialized: true
  })
);

router.post('/loggedIn', (req, res) => {
  console.log('client sign up was clicked');
  res.json({ message: 'logged in ' });
  // var email = req.body.email;
  // var password = req.body.password;
  // console.log(email);
  // console.log(password);
  // bcrypt.hash(password, 10, function(err, hash) {
  //   console.log(hash);
  // });
  // var id = null;
  // var pool = connectToDb();
  // var params = [email];
  // var sql = 'SELECT password FROM member WHERE username = $1';
  // pool.query(sql, params, function(err, result) {
  //   if (err) {
  //     console.log('in the error for pool');
  //     res.status(500).json({ success: false, data: err });
  //   }

  //   var hash = result.rows[0].password;

  //   bcrypt.compare(password, hash, function(err, result) {
  //     var json = { success: false };
  //     if (result) {
  //       json.success = true;
  //       req.session.email = email;
  //       req.session.password = password;
  //     }
  //     res.json(json);
  //   });
  // });
});

router.post('/signUp', (req, res, next) => {
  if (validateUser(req.body)) {
    res.json({ message: 'signed up' });
  } else {
    next(new Error('Invalid user'));
  }
  console.log('Sign up was clicked');
});

router.post('/trainerSignUp', (req, res) => {
  res.json({ message: 'trainer signed up ' });

  console.log('trainer sign up was clicked');
});

module.exports = router;
