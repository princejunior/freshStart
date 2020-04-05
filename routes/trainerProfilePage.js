const express = require('express');
const router = express.Router();
const { Pool, Client } = require('pg');

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

router.get('/', function(req, res) {
  res.send('you requested to trainer id: ' + req.params.id);

  //   var getTrainer_sql = 'SELECT * FROM trainer where id = ' + req.params.id;
  //   console.log(getTrainer_sql);

  //   var pool = connectToDb();

  //   pool.query(getTrainer_sql, (err, res) => {
  //     if (err) {
  //       throw err;
  //     }
  //     // console.log('user:', res.row[0]);

  //     var getTrainerDescription_sql =
  //       'SELECT * FROM trainer_description where trainer_id = (select id from trainer where id = ' +
  //       req.params.id +
  //       ')';

  //     pool.query(getTrainerDescription_sql, (err, resp) => {
  //       if (err) {
  //         throw err;
  //       }
  //       //   console.log('trainer_description:', resp.rows);
  //       res.render('pages/viewTrainer', {
  //         trainer: res.rows,
  //         description: resp.row
  //       });
  //     });
  //   });
});

module.exports = router;
