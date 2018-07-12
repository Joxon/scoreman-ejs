var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var login = require('./routers/login');
var admin = require('./routers/admin');
var stu = require('./routers/stu')
var tea = require('./routers/tea');

var app = express();

app.set('view engine', 'ejs');
app.use(cookieParser('my_cookie_secret'));
app.use(express.static('./public'));
app.use(cookieParser());
app.use(session({
  secret: '123',            // 用来对session id相关的cookie进行签名
  saveUninitialized: false, // 是否自动保存未初始化的会话，建议false
  resave: false,            // 是否每次都重新保存会话，建议false
  cookie: {
    maxAge: 10 * 1000       // 有效期，单位是毫秒
  }
}));

app.use(function (req, res, next){
  var url = req.originalUrl;
  if (url != '/login' && !req.session.user) {
    // res.status(500).json({ error: 'message' });
    return res.redirect('/login');
  }
  next();
});


login(app);
admin(app);
stu(app);

app.listen(3000);

console.log('Listening to port 3000');