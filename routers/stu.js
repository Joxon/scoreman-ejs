// var bodyParser = require('body-parser');
// var urlencodedParser = bodyParser.urlencoded({exrended: false});

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'stu_grade'
});
var data = [];

module.exports = function(app){

  app.get('/stu', function(req, res){
    var sql = 'SELECT * FROM student WHERE sID = \'' + req.query.sID + '\'';
    // sql = 'SELECT * FROM student WHERE sID = \'' + req.signedcookies.username + '\'';
    // console.log(sql);
    connection.query(sql, function (err, result) {
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        temp = new Object();
        temp.sID = 'error';
        temp.sName = 'error';
        temp.classno = 'error';
        temp.sex = 'error';
        res.send(temp);
      }
      else{
        temp = new Object();
        temp.sID = result[0].sID;
        temp.sex = result[0].sex;
        temp.sName = result[0].sName;
        temp.classno = result[0].classno;
        res.send(temp);
      }
      // console.log(data);
    });
  });
  app.post('/stu/take', function(req, res){
    // get take info
    // var sql = 'SELECT * FROM take NATURAL JOIN course WHERE sID = \'' + req.signedCookies.username + '\'';
    var sql = 'SELECT * FROM take NATURAL JOIN course WHERE sID = \'' + req.body.sID + '\'';
    // console.log(sql);
    connection.query(sql, function (err, result) {
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        data = [];
        temp = new Object();
        temp.cID = 'error';
        temp.cName = 'error';
        temp.grade = 'error';
        data.push(temp);
        res.send(data);
      }
      else{
        data = [];
        for(var i = 0; i < result.length; i++)
        {
          temp = new Object();
          temp.cID = result[i].cID;
          temp.cName = result[i].cName;
          temp.grade = result[i].grade;
          data.push(temp);
        }
        res.send(data);
      }
      // console.log(data);
    });
  });
  
  // app.post('/stu', function(req, res){
  //   // get student info
  //   var sql = 'SELECT * FROM student WHERE sID = \'' + req.body.sID + '\'';
  //   // sql = 'SELECT * FROM student WHERE sID = \'' + req.signedcookies.username + '\'';
  //   // console.log(sql);
  //   connection.query(sql, function (err, result) {
  //     if(err){
  //       console.log('[SELECT ERROR] - ',err.message);
  //       temp = new Object();
  //       temp.sID = 'error';
  //       temp.sName = 'error';
  //       temp.classno = 'error';
  //       temp.sex = 'error';
  //       res.send(temp);
  //     }
  //     else{
  //       temp = new Object();
  //       temp.sID = result[0].sID;
  //       temp.sex = result[0].sex;
  //       temp.sName = result[0].sName;
  //       temp.classno = result[0].classno;
  //       res.send(temp);
  //     }
  //   });
  // });

  // app.post('/stu', function(req, res){
  //   // take info
  //   console.log(req.body);
  //   var type = req.body.type;
  //   if(type == 'sModify'){            // modify {sID :} {sName :} {classno :} {sex :} {password :}
  //     // req.signedCookies.username
  //     var sql = 'UPDATE student SET password = \'' + req.body.password +
  //               '\' WHERE sID = \'' + req.body.sID + '\'';
  //     // console.log(sql);
  //     connection.query(sql, function (err, result) {
  //       if(err){
  //         console.log('[SELECT ERROR] - ',err.message);
  //         res.json({restype: 'failed'});
  //       }
  //       else{
  //         res.json({restype: 'success'});
  //       }
  //       // console.log(data);
  //     });
  //   }
  //   else if(type == 'sSearch'){       // search {sID ; }
  //     // var sql = 'SELECT * FROM take NATURAL JOIN course WHERE sID = \'' + req.signedCookies.username + '\'';
  //     var sql = 'SELECT * FROM take NATURAL JOIN course WHERE sID = \'' + req.body.sID + '\'';
  //     // console.log(sql);
  //     connection.query(sql, function (err, result) {
  //       if(err){
  //         console.log('[SELECT ERROR] - ',err.message);
  //         data = [];
  //         temp = new Object();
  //         temp.cID = 'error';
  //         temp.cName = 'error';
  //         temp.grade = 'error';
  //         data.push(temp);
  //         res.send(data);
  //       }
  //       else{
  //         data = [];
  //         for(var i = 0; i < result.length; i++)
  //         {
  //           temp = new Object();
  //           temp.cID = result[i].cID;
  //           temp.cName = result[i].cName;
  //           temp.grade = result[i].grade;
  //           data.push(temp);
  //         }
  //         res.send(data);
  //       }
  //       // console.log(data);
  //     });
  //   }
  //   else if(type == 'sInfo'){       // info {sID :}
  //     var sql = 'SELECT * FROM student WHERE sID = \'' + req.body.sID + '\'';
  //     // console.log(sql);
  //     connection.query(sql, function (err, result) {
  //       if(err){
  //         console.log('[SELECT ERROR] - ',err.message);
  //         data = [];
  //         temp = new Object();
  //         temp.sID = 'error';
  //         temp.sName = 'error';
  //         temp.classno = 'error';
  //         temp.sex = 'error';
  //         data.push(temp);
  //         res.send(data);
  //       }
  //       else{
  //         temp = new Object();
  //         temp.sID = result[0].sID;
  //         temp.sex = result[0].sex;
  //         temp.sName = result[0].sName;
  //         temp.classno = result[0].classno;
  //         res.send(temp);
  //       }
  //       // console.log(data);
  //     });
  //   }
  //   else{
  //     res.json({restype : 'error'});
  //   }
  // });


};