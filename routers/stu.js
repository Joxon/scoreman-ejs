var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({exrended: false});

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
      // student info
      var sql = 'SELECT * FROM student WHERE sID = \'' + req.signedCookies.username + '\'';
      // console.log(sql);
      connection.query(sql, function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        data.push({sID: result[0].sID});
        data.push({sName: result[0].sName});
        data.push({sex: result[0].sex});
        data.push({classno: result[0].classno});
        // console.log(data);
      });
      res.send(data);
    });

    app.post('/stu', function(req, res){
      // take info
      var sql = 'SELECT * FROM take NATURAL JOIN course WHERE sID = \'' + req.signedCookies.username + '\'';
      console.log(sql);
      connection.query(sql, function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        for(var i = 0; i < result.length; i++)
        {
          temp = [];
          temp.push({cID: result[i].cID});
          temp.push({cName: result[i].cName});
          temp.push({grade: result[i].grade});
          data.push(temp);
        }
        console.log(data);
      });
      res.send(data);
    })
};