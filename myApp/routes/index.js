var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose()

//Global Variables
var userName = '';
var returnScores  = [];
var returnIds     = [];

/* GET home page. */

//Home Page
router.get('/', function(req, res) {
  res.render('index', { title: 'Clash of Trash' });
});

//Open the Leaderboard

router.get('/leaderboard', function(req, res) {
  //Reinitialize the variables


  //Make a Query that delects the top 10 or so people
  var db = new sqlite3.Database('./database.db');
  
  let sql = ` SELECT users.username username, stats.points points from users 
              JOIN stats
              WHERE users.id = stats.id
              ORDER BY stats.points DESC
              LIMIT 5;`

  db.each(sql, (err, row) => {
    if (err) {
      throw err;
    } else {
      console.log(`${row.username} ${row.points}`);
      returnScores.push(row.points);
      returnIds.push(row.username);
    }
  });
   
  // close the database connection
  db.close();

  res.render('leaderboard', { 
    title: 'Leaderboard',
    scores: returnScores,
    ids: returnIds
  });

  returnIds     = [];
  returnScores  = [];
});

//Open the profile page rendered with the data
//of the curret user
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

  db.close();

  res.render('profile', { 
    title: 'Profile', 
    name: userName
  });
});

router.get('/login', function(req, res) {
  res.render('login', { title: 'Login!' });
});

//Posting on our site
router.get('/post', function(req, res) {
  res.render('post', { title: 'Share with your friends!' });
});

module.exports = router;
