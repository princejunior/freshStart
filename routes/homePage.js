const express = require('express');
const router = express.Router();
const { Pool, Client } = require('pg');

require('dotenv').config();
const connectionString =
  process.env.DATABASE_URL ||
  'postgres://cbahupxdqoapyr:0b0a85067d5a9c201796c1a8e3bd08abbe3eb36f1a6497e7575cb05174a181f5@ec2-34-202-7-83.compute-1.amazonaws.com:5432/d4m43fi6em110?ssl=true';

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

var getTrainer_sql = 'SELECT * FROM trainer';
var getTrainerDescription_sql = 'SELECT * FROM trainer_description';

router.get('/', (req, response) => {
  var pool = connectToDb();

  pool.query(getTrainer_sql, (err, res) => {
    if (err) {
      throw err;
    }
    // console.log('user:', res.rows);
    pool.query(getTrainerDescription_sql, (err, resp) => {
      if (err) {
        throw err;
      }
      // console.log('trainer_description:', resp.rows);
      response.render('pages/home', {
        trainer: res.rows
      });
    });
  });
});

module.exports = router;
