// var bodyParser = require('body-parser');
// var urlencodedParser = bodyParser.urlencoded({exrended: false});
// var jsonParser = bodyParser.json();

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'stu_grade'
});

module.exports = function (app) {

  // app.get('/', function(req, res){
  //   // res.render('login');
  //   res.redirect('login');
  // });

  app.get('/login', function (req, res) {
    res.render('index.html');
  });

  app.post('/login', function (req, res) {
    console.log(req.body);
    if (req.body.username == 'admin') // admin
    {
      var sql = 'SELECT * FROM teacher WHERE tID = \'admin\'';
      console.log(sql);
      connection.query(sql, function (err, result) {
        if (err) {
          console.log('[SELECT ERROR] - ', err.message);
          res.json({
            usertype: 'failed'
          });
        } else {
          if (result.length > 0) {
            var pwd = result[0].password;
            if (pwd == req.body.password) {
              res.cookie('username', req.body.username, {
                signed: true
              });
              req.session.user = req.body.username;
              // console.log(req.session.user);
              res.json({
                usertype: 'admin'
              });
            } else
              res.json({
                usertype: 'failed'
              });
          } else
            res.json({
              usertype: 'failed'
            });
        }
      });
    } else {
      // var u_name = req.body.username;
      // console.log(u_name);
      var f_c = req.body.username[0];
      if (f_c == 'T') { // teacher
        var sql = 'SELECT * FROM teacher WHERE tID = \'' + req.body.username + '\'';
        console.log(sql);
        connection.query(sql, function (err, result) {
          if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.json({
              usertype: 'failed'
            });
          } else {
            if (result.length > 0) {
              var pwd = result[0].password;
              if (pwd == req.body.password) {
                res.cookie('username', req.body.username, {
                  signed: true
                });
                req.session.user = req.body.username;
                res.json({
                  usertype: 'teacher'
                });
              } else
                res.json({
                  usertype: 'failed'
                });
            } else
              res.json({
                usertype: 'failed'
              });
          }
        });
      } else if (f_c == 'S') { // student
        var sql = 'SELECT * FROM student WHERE sID = \'' + req.body.username + '\'';
        console.log(sql);
        connection.query(sql, function (err, result) {
          if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.json({
              usertype: 'failed'
            });
          } else {
            if (result.length > 0) {
              var pwd = result[0].password;
              if (pwd == req.body.password) {
                res.cookie('username', req.body.username, {
                  signed: true
                });
                req.session.user = req.body.username;
                res.json({
                  usertype: 'student'
                });
              } else
                res.json({
                  usertype: 'failed'
                });
            } else
              res.json({
                usertype: 'failed'
              });
          }
        });
      } else
        res.json({
          usertype: 'failed'
        });
    }
  });
};