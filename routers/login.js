var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({exrended: false});

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'stu_grade'
});

module.exports = function(app){
  
  // app.get('/', function(req, res){
  //   // res.render('login');
  //   res.redirect('login');
  // });
  
  app.get('/login', function(req, res){
    res.render('login');
  });

  app.post('/login', urlencodedParser, function(req, res){
    if(req.body.username == 'admin')              // admin
    {
      var sql = 'SELECT * FROM teacher WHERE tID = \'admin\'';
      console.log(sql);
      connection.query(sql, function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          res.send({type: 'failed'});
        }
        else{
          var pwd = result[0].password;
          if(pwd == req.body.password)
            res.send({type: 'adm_success'});
          else
            res.send({type: 'failed'});
        }
      });
    }
    else
    {
      var f_c = req.body.username[0];
      if(f_c == 'T'){ // teacher
        var sql = 'SELECT * FROM teacher WHERE tID = \'' + req.body.username + '\'';
        console.log(sql);
        connection.query(sql, function (err, result) {
          if(err){
            console.log('[SELECT ERROR] - ',err.message);
            res.send({type: 'failed'});
          }
          else{
            if(result.length > 0){
              var pwd = result[0].password;
              if(pwd == req.body.password)
                res.send({type: 'tea_success'});
              else
                res.send({type: 'failed'});
            }
            else
              res.send({type: 'failed'});
          }
        });
      }
      else if(f_c == 'S'){           // student
        var sql = 'SELECT * FROM student WHERE sID = \'' + req.body.username + '\'';
        console.log(sql);
        connection.query(sql, function (err, result) {
          if(err){
            console.log('[SELECT ERROR] - ',err.message);
            res.send({type: 'failed'});
          }
          else{
            if(result.length > 0){
              var pwd = result[0].password;
              if(pwd == req.body.password)
                res.send({type: 'stu_success'});
              else
                res.send({type: 'failed'});
            }
            else
              res.send({type: 'failed'});
          }
        });
      }
      else
        res.send({type: 'failed'});
    }
  });
};
