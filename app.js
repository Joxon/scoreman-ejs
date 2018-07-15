var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
// var urlencodedParser = bodyParser.urlencoded({exrended: false});
// var jsonParser = bodyParser.json();

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
app.use(bodyParser.urlencoded({exrended: false}));
app.use(session({
  secret: '123',            // 用来对session id相关的cookie进行签名
  saveUninitialized: false, // 是否自动保存未初始化的会话，建议false
  resave: false,            // 是否每次都重新保存会话，建议false
  cookie: {
    maxAge: 10 * 1000       // 有效期，单位是毫秒
  }
}));

// 登陆拦截：
// app.use(function (req, res, next){
//   var url = req.originalUrl;
//   if (url != '/login' && !req.session.user) {
//     // res.status(500).json({ error: 'message' });
//     return res.redirect('/login');
//   }
//   next();
// });

// 跨域问题解决方法
// app.use(cors({
//   origin:['http://localhost:8080'],
//   methods:['GET','POST'],
//   alloweHeaders:['Content-Type', 'Authorization']
// }));
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  next();
});

login(app);
admin(app);
stu(app);
tea(app);

app.put('/password', function(req, res){
  var name = req.body.username;
  if(name[0] == 'T' || name == 'admin'){
    // password judge
    var re_flag = 1;
    var sql = 'SELECT password FROM teacher WHERE tID = \'' + req.body.sID +'\'';
    connection.query(sql, function (err, result) {
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        // res.json({restype: 'failed'});
        re_flag = 0;
      }
      else{
        // res.json({restype: 'success'});
        if(result.length > 0){
          var pwd = result[0].password;
          if(pwd != req.body.password_old)
            re_flag = 0;
        }
        else{
          re_flag = 0;
        }
      }
    });
    if(re_flag){
      sql = 'UPDATE teacher SET password = \'' + req.body.password_new + '\' WHERE tID = \'' + req.body.sID +'\'';
      // console.log(sql);
      connection.query(sql, function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          res.json({restype: 'failed'});
        }
        else{
          res.json({restype: 'success'});
        }
        // console.log(data);
      });
    }
    else{
      res.json({restype: 'failed'});
    }
  }
  else if(name[0] == 'S'){
    // password judge
    var re_flag = 1;
    var sql = 'SELECT password FROM student WHERE sID = \'' + req.body.sID +'\'';
    connection.query(sql, function (err, result) {
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        // res.json({restype: 'failed'});
        re_flag = 0;
      }
      else{
        // res.json({restype: 'success'});
        if(result.length > 0){
          var pwd = result[0].password;
          if(pwd != req.body.password_old)
            re_flag = 0;
        }
        else{
          re_flag = 0;
        }
      }
    });
    if(re_flag){
      sql = 'UPDATE student SET password = \'' + req.body.password_new + '\' WHERE sID = \'' + req.body.sID + '\'';
      // sql = 'UPDATE student SET password = \'' + req.body.password + '\' WHERE sID = \'' + req.signedcookies.username + '\'';
      // console.log(sql);
      connection.query(sql, function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          res.json({restype: 'failed'});
        }
        else{
          res.json({restype: 'success'});
        }
        // console.log(data);
      });
    }
    else{
      res.json({restype: 'failed'});
    }
  }
});

app.listen(3000);

console.log('Listening to port 3000');