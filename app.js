var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
// var urlencodedParser = bodyParser.urlencoded({exrended: false});
// var jsonParser = bodyParser.json();
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'stu_grade'
});

var login = require('./routers/login');
var admin = require('./routers/admin');
var stu = require('./routers/stu')
var tea = require('./routers/tea');

var app = express();

app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
// app.set('view engine', 'ejs');
app.use(cookieParser('my_cookie_secret'));
app.use(express.static('./public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(session({
  secret: '123', // 用来对session id相关的cookie进行签名
  saveUninitialized: false, // 是否自动保存未初始化的会话，建议false
  resave: false, // 是否每次都重新保存会话，建议false
  cookie: {
    maxAge: 60 * 60 * 1000 // 有效期，单位是毫秒
  }
}));

// 跨域问题解决方法
// app.use(cors({
//   origin:['http://localhost:3000'],
//   methods:['GET','POST','PUT','OPTIONS'],
//   alloweHeaders:['Content-Type', 'Authorization']
// }));

var allowCrossDomain = function (req, res, next) {
  // var originurl = 'http://' + req.hostname + ':3000';
  // var originurl = 'http://10.206.12.202:3000';
  var originurl = 'http://localhost:8080';
  // console.log(originurl);
  res.header('Access-Control-Allow-Origin', originurl);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method == "OPTIONS") res.sendStatus(200); /*让options请求快速返回*/
  else next();
};
app.use(allowCrossDomain);

// 登陆拦截：
// app.use(function (req, res, next){
//   var url = req.originalUrl;
//   // console.log('user : ' + req.session.user);
//   if (url != '/login' && !req.session.user) {
//     // res.status(500).json({ error: 'message' });
//     return res.redirect('/');
//   }
//   next();
// });

login(app);
admin(app);
stu(app);
tea(app);

app.put('/password', function (req, res) {
  console.log(req.body);
  var name = req.body.username;
  if (name[0] == 'T' || name == 'admin') {
    // password judge
    var sql = 'SELECT password FROM teacher WHERE tID = \'' + req.body.username + '\'';
    connection.query(sql, function (err, result) {
      if (err) {
        console.log('[SELECT ERROR] - ', err.message);
        // res.json({restype: 'failed'});
        res.json({
          restype: 'failed'
        });
      } else {
        // res.json({restype: 'success'});
        if (result.length > 0) {
          var pwd = result[0].password;
          // console.log(pwd);
          if (pwd != req.body.password_old)
            res.json({
              restype: 'failed'
            });
          else {
            sql = 'UPDATE teacher SET password = \'' + req.body.password_new + '\' WHERE tID = \'' + req.body.username + '\'';
            // console.log(sql);
            connection.query(sql, function (err, result) {
              if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.json({
                  restype: 'failed'
                });
              } else {
                res.json({
                  restype: 'success'
                });
              }
              // console.log(data);
            });
          }
        } else {
          res.json({
            restype: 'failed'
          });
        }
      }
    });
  } else if (name[0] == 'S') {
    // password judge
    var sql = 'SELECT password FROM student WHERE sID = \'' + req.body.username + '\'';
    connection.query(sql, function (err, result) {
      if (err) {
        console.log('[SELECT ERROR] - ', err.message);
        // res.json({restype: 'failed'});
        res.json({
          restype: 'failed'
        });
      } else {
        // res.json({restype: 'success'});
        if (result.length > 0) {
          var pwd = result[0].password;
          if (pwd != req.body.password_old)
            res.json({
              restype: 'failed'
            });
          else {
            sql = 'UPDATE student SET password = \'' + req.body.password_new + '\' WHERE sID = \'' + req.body.sID + '\'';
            // sql = 'UPDATE student SET password = \'' + req.body.password + '\' WHERE sID = \'' + req.signedcookies.username + '\'';
            // console.log(sql);
            connection.query(sql, function (err, result) {
              if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.json({
                  restype: 'failed'
                });
              } else {
                res.json({
                  restype: 'success'
                });
              }
              // console.log(data);
            });
          }
        } else {
          res.json({
            restype: 'failed'
          });
        }
      }
    });
  }
});

app.listen(3000, '0.0.0.0');

console.log('Listening to port 3000');