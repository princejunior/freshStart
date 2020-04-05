var express = require('express');
var app = express();
var path = require('path');
const { Pool, Client } = require('pg');

app.use(express.static('public'));
// set the view engine to ejs
app.set('view engine', 'ejs');

const home = require('./routes/homePage');
const login = require('./routes/loginPage');
const viewProfile = require('./routes/trainerProfilePage');

app.use('/', home);
app.use('/login', login);

// app.use('/viewProfile', viewProfile);

function connectToDb() {
  //   const pool = new Pool({ connectionString: connectionString });
  const pool = new Pool({
    user: 'elijah',
    host: 'localhost',
    database: 'postgres',
    password: 'elijah',
    port: 5432
  });
  return pool;
}

app.get('/viewProfile/:id', (req, response) => {
  var pool = connectToDb();
  var getTrainer_sql = 'SELECT * FROM trainer where id = ' + req.params.id;
  var getTrainerDescription_sql =
    'SELECT * FROM trainer_description where trainer_id = (select id from trainer where id = ' +
    req.params.id +
    ')';
  var getTrainerContent_sql =
    'SELECT * FROM content where trainer_id = (select id from trainer where id = ' +
    req.params.id +
    ')';

  pool.query(getTrainer_sql, (err, res) => {
    if (err) {
      throw err;
    }
    console.log('user:', res.rows[0]);

    pool.query(getTrainerDescription_sql, (err, resp) => {
      if (err) {
        throw err;
      }
      console.log('description:', resp.rows[0]);

      pool.query(getTrainerContent_sql, (err, respo) => {
        if (err) {
          throw err;
        }
        console.log('content:', respo.rows);

        response.render('pages/viewTrainer', {
          trainer: res.rows[0],
          desc: resp.rows[0],
          content: respo.rows
        });
      });
    });
  });
});

app.listen(5000, function() {
  console.log('Server is listening');
});

app.use('pages/error', function(err, req, res, next) {
  render.status(err.status || 500);
  res.render('error');
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;

// app.get('/', (req, res) => {
//   var drinks = [
//     { name: 'Bloody Mary', drunkness: 3 },
//     { name: 'Martini', drunkness: 5 },
//     { name: 'Scotch', drunkness: 10 }
//   ];
//   var tagline =
//     "Any code of your own that you haven't looked at for six or more months might as well have been written by someone else.";

//   res.render('pages/home', {
//     drinks: drinks,
//     tagline: tagline
//   });
//   console.log('home');
//   //   res.render('pages/home');
// });

// app.get('/login', login (req, res) => {
//   console.log('login');
//   res.render('pages/loginForm');
// });

// app.get('/home', function(req, res) {
//   console.log('In home page');
//   res.write('this is home');
//   res.end();
// });
