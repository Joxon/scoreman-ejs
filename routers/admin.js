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
// connection.connect();
// var testd = [{tID: 't1'},{tName: 't2'}, {sex: 't3'}, {email: 't4'}];

module.exports = function(app){

  app.get('/admin', function(req, res){       // 待修改 分为 /admin/course ....  使用get
    // send info_message
    connection.query('SELECT * FROM teacher',function (err, result) {
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        return;
      }
      for(var i = 0; i < result.length; i++)
      {
        var temp = [];
        temp.push({tID: result[i].tID});
        temp.push({tName: result[i].tName});
        temp.push({sex: result[i].sex});
        temp.push({email: result[i].email});
        data.push(temp);
      }
      // console.log(data);
    });
    res.render('admin', {info: data});
    // res.send(data);
  });

  app.post('/admin/course', urlencodedParser, function(req, res){
    // add course info
    // console.log(req.body);
    var sql = 'INSERT INTO course VALUES(\'' + req.body.cID + '\', \'' + req.body.tID + '\', \'' +
              req.body.cName + '\', \'' + req.body.credit + '\', \'' + req.body.semester + '\')';
    console.log(sql);
    connection.query(sql, function(err){
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        res.send({type: 'failed'});
        // return;
      }
      else 
        res.send({type: 'success'});
    });
    // res.send({type: 'success'});
  });

  app.post('/admin/teacher', urlencodedParser, function(req, res){
    // add teacher info
    var sql = 'INSERT INTO teacher VALUES(\'' + req.body.tID + '\', \'' + req.body.tName + '\', \'' +
              req.body.password + '\', \'' + req.body.sex + '\', \'' + req.body.email + '\')';
    console.log(sql);
    connection.query(sql, function(err){
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        res.send({type: 'failed'});
        // return;
      }
      else
        res.send({type: 'success'});
    });
    // res.send({type: 'success'});
  });

  app.post('/admin/student', urlencodedParser, function(req, res){
    // add student info
    var sql = 'INSERT INTO student VALUES(\'' + req.body.sID + '\', \'' + req.body.sName + '\', \'' +
              req.body.classno + '\', \'' + req.body.sex + '\', \'' + req.body.password + '\')';
    console.log(sql);
    connection.query(sql, function(err){
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        res.send({type: 'failed'});
        // return;
      }
      else
        res.send({type: 'success'});
    });
    // res.send({type: 'success'});
  });

  app.post('/admin/course/:id', urlencodedParser, function(req, res){
    // update course info
    // console.log(req.body)
    var sql = 'UPDATE course SET tID = \'' + req.body.tID + '\', cName = \'' + req.body.cName + '\', credit = \'' +
              req.body.credit + '\', semester = \'' + req.body.semester + '\' WHERE cID = \'' + req.params.id + '\'';
    console.log(sql);
    connection.query(sql, function(err){
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        res.send({type: 'failed'});
        // return;
      }
      else
        res.send({type: 'success'});
    });
    // res.send({type: 'success'});
  });

  app.post('/admin/teacher/:id', urlencodedParser, function(req, res){
    // update teacher info
    var sql = 'UPDATE teacher SET email = \'' + req.body.email + '\', tName = \'' + req.body.tName + '\', sex = \'' +
              req.body.sex + '\', password = \'' + req.body.password + '\' WHERE tID = \'' + req.params.id + '\'';
    console.log(sql);
    connection.query(sql, function(err){
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        res.send({type: 'failed'});
        // return;
      }
      else
        res.send({type: 'success'});
    });
    // res.send({type: 'success'});
  });

  app.post('/admin/student/:id', urlencodedParser, function(req, res){
    // update student info
    var sql = 'UPDATE student SET classno = \'' + req.body.classno + '\', sName = \'' + req.body.sName + '\', sex = \'' +
              req.body.sex + '\', password = \'' + req.body.password + '\' WHERE tID = \'' + req.params.id + '\'';
    console.log(sql);
    connection.query(sql, function(err){
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        res.send({type: 'failed'});
        // return;
      }
      else 
        res.send({type: 'success'});
    });
    // res.send({type: 'success'});
  });

  app.delete('/admin/course/:id', urlencodedParser, function(req, res){
    // delete courese info
    var re_flag = 1;
    var sql = 'DELETE FROM course WHERE cID = \'' + req.params.id + '\'';
    console.log(sql);
    connection.query(sql, function(err){
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        // res.send({type: 'failed'});
        re_flag = 0;
        // return;
      }
      // else
      //   res.send({type: 'success'});
    });

    var sql = 'DELETE FROM take WHERE cID = \'' + req.params.id + '\'';
    console.log(sql);
    connection.query(sql, function(err){
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        // res.send({type: 'failed'});
        re_flag = 0;
        // return;
      }
    });
    if(re_flag)
        res.send({type: 'failed'});
    else
      res.send({type: 'success'});
  });

  app.delete('/admin/teacher/:id', urlencodedParser, function(req, res){
    // delete teacher info
    var sql = 'DELETE FROM teacher WHERE tID = \'' + req.params.id + '\'';
    console.log(sql);
    connection.query(sql, function(err){
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        res.send({type: 'failed'});
        // return;
      }
      else
        res.send({type: 'success'});
    });
    // res.send({type: 'success'});
  });

  app.delete('/admin/student/:id', urlencodedParser, function(req, res){
    // delete student info
    var sql = 'DELETE FROM student WHERE sID = \'' + req.params.id + '\'';
    console.log(sql);
    connection.query(sql, function(err){
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        res.send({type: 'failed'});
        // return;
      }
      else
        res.send({type: 'success'});
    });
    // res.send({type: 'success'});
  });
  
};
// connection.end();
