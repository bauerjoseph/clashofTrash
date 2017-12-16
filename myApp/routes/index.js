var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose()

//Global Variables
var userName = 'shit';

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Clash of Trash' });
});

router.get('/leaderboard', function(req, res) {
  res.render('leaderboard', { title: 'Leaderboard' });
});

router.get('/profile', function(req, res) {

  var db = new sqlite3.Database('./database.db');


  let sql = `SELECT username name,
            id id
            FROM users
            WHERE id = ?`;

  let playlistId = 001;

  // first row only
  db.get(sql, [playlistId], (err, row) => {
    if (err) {
      return console.error(err.message);
    } else{
      console.log(row.id, row.name);
      userName = row.name;
    }
  
  });

  res.render('profile', { 
    title: 'Profile', 
    name: userName
  });
});

module.exports = router;
