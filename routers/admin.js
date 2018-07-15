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
// connection.connect();
// var testd = [{tID: 't1'},{tName: 't2'}, {sex: 't3'}, {email: 't4'}];

module.exports = function(app){

  // app.get('/admin', function(req, res){       // 待修改 分为 /admin/course ....  使用get
  //   // send info_message
  //   connection.query('SELECT * FROM teacher',function (err, result) {
  //     if(err){
  //       console.log('[SELECT ERROR] - ',err.message);
  //       return;
  //     }
  //     for(var i = 0; i < result.length; i++)
  //     {
  //       var temp = [];
  //       temp.push({tID: result[i].tID});
  //       temp.push({tName: result[i].tName});
  //       temp.push({sex: result[i].sex});
  //       temp.push({email: result[i].email});
  //       data.push(temp);
  //     }
  //     // console.log(data);
  //   });
  //   res.render('admin', {info: data});
  //   // res.send(data);
  // });

  // app.post('/admin', function(req, res){

  //   var type = req.body.type;

  //   if(type == 'sModify'){
  //     var sql = 'UPDATE student SET password = \'' + req.body.password + '\', sName = \'' + req.body.sName +
  //       '\', classno = \'' + req.body.classno + '\', sex = \'' + req.body.sex +  '\' WHERE sID = \'' + req.body.sID + '\'';
  //     // console.log(sql);
  //     connection.query(sql, function (err, result) {
  //       if(err){
  //         console.log('[SELECT ERROR] - ',err.message);
  //         res.json({restype: 'failed'});
  //       }
  //       else{
  //         res.json({restype: 'success'});
  //       }
  //     });
  //   }
  //   else if(type == 'tModify'){
  //     var sql = 'UPDATE teacher SET password = \'' + req.body.password + '\', tName = \'' + req.body.tName +
  //       '\', email = \'' + req.body.email + '\', sex = \'' + req.body.sex +  '\' WHERE tID = \'' + req.body.tID + '\'';
  //     // console.log(sql);
  //     connection.query(sql, function (err, result) {
  //       if(err){
  //         console.log('[SELECT ERROR] - ',err.message);
  //         res.json({restype: 'failed'});
  //       }
  //       else{
  //         res.json({restype: 'success'});
  //       }
  //     });
  //   }
  //   else if(type == 'cModify'){
  //     var sql = 'UPDATE course SET tID = \'' + req.body.tID + '\', semester = \'' + req.body.semester +
  //       '\', credit = \'' + req.body.credit + '\', cName = \'' + req.body.cName +  '\' WHERE cID = \'' + req.body.cID + '\'';
  //     // console.log(sql);
  //     connection.query(sql, function (err, result) {
  //       if(err){
  //         console.log('[SELECT ERROR] - ',err.message);
  //         res.json({restype: 'failed'});
  //       }
  //       else{
  //         res.json({restype: 'success'});
  //       }
  //     });
  //   }
  //   else if(type == 'sSearch'){
  //     var sql = 'SELECT * FROM student ';
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
  //         data = [];
  //         for(var i = 0; i < result.length; i++)
  //         {
  //           temp = new Object();
  //           temp.sID = result[i].sID;
  //           temp.sName = result[i].sName;
  //           temp.classno = result[i].classno;
  //           temp.sex = result[i].sex;
  //           data.push(temp);
  //         }
  //         res.send(data);
  //       }
  //       // console.log(data);
  //     });
  //   }
  //   else if(type == 'tSearch'){
  //     var sql = 'SELECT * FROM teacher WHERE tID <> \'admin\'';
  //     connection.query(sql, function (err, result) {
  //       if(err){
  //         console.log('[SELECT ERROR] - ',err.message);
  //         data = [];
  //         temp = new Object();
  //         temp.tID = 'error';
  //         temp.tName = 'error';
  //         temp.email = 'error';
  //         temp.sex = 'error';
  //         data.push(temp);
  //         res.send(data);
  //       }
  //       else{
  //         data = [];
  //         for(var i = 0; i < result.length; i++)
  //         {
  //           temp = new Object();
  //           temp.tID = result[i].tID;
  //           temp.tName = result[i].tName;
  //           temp.email = result[i].email;
  //           temp.sex = result[i].sex;
  //           data.push(temp);
  //         }
  //         res.send(data);
  //       }
  //       // console.log(data);
  //     });
  //   }
  //   else if(type == 'cSearch'){
  //     var sql = 'SELECT * FROM course ';
  //     connection.query(sql, function (err, result) {
  //       if(err){
  //         console.log('[SELECT ERROR] - ',err.message);
  //         data = [];
  //         temp = new Object();
  //         temp.cID = 'error';
  //         temp.tID = 'error';
  //         temp.tName = 'error';
  //         temp.credit = 'error';
  //         temp.semester = 'error';
  //         data.push(temp);
  //         res.send(data);
  //       }
  //       else{
  //         data = [];
  //         for(var i = 0; i < result.length; i++)
  //         {
  //           temp = new Object();
  //           temp.cID = result[i].cID;
  //           temp.tID = result[i].tID;
  //           temp.tName = result[i].tName;
  //           temp.credit = result[i].credit;
  //           temp.semester = result[i].semester;
  //           data.push(temp);
  //         }
  //         res.send(data);
  //       }
  //       // console.log(data);
  //     });
  //   }
  //   else if(type == 'sAdd'){
  //     var sql = 'INSERT INTO student VALUES(\'' + req.body.sID + '\', \'' + req.body.sName + '\', \'' +
  //                 req.body.classno + '\', \'' + req.body.sex + '\', \'' + req.body.password + '\')';
  //     connection.query(sql, function (err, result) {
  //       if(err){
  //         console.log('[SELECT ERROR] - ',err.message);
  //         res.json({restype: 'failed'});
  //       }
  //       else
  //         res.json({restype: 'success'});
  //       // console.log(data);
  //     });
  //   }
  //   else if(type == 'tAdd'){
  //     var sql = 'INSERT INTO teacher VALUES(\'' + req.body.tID + '\', \'' + req.body.tName + '\', \'' +
  //                 req.body.password + '\', \'' + req.body.sex + '\', \'' + req.body.email + '\')';
  //     connection.query(sql, function (err, result) {
  //       if(err){
  //         console.log('[SELECT ERROR] - ',err.message);
  //         res.json({restype: 'failed'});
  //       }
  //       else
  //         res.json({restype: 'success'});
  //       // console.log(data);
  //     });
  //   }
  //   else if(type == 'cAdd'){
  //     var sql = 'INSERT INTO course VALUES(\'' + req.body.cID + '\', \'' + req.body.tID + '\', \'' +
  //                 req.body.cName + '\', \'' + req.body.credit + '\', \'' + req.body.semester + '\')';
  //     connection.query(sql, function (err, result) {
  //       if(err){
  //         console.log('[SELECT ERROR] - ',err.message);
  //         res.json({restype: 'failed'});
  //       }
  //       else
  //         res.json({restype: 'success'});
  //       // console.log(data);
  //     });
  //   }
  //   // else
  //   //   res.json({restype: 'error'})
  // });

  app.post('/admin/course', function(req, res){
    // course info add
    var sql = 'INSERT INTO course VALUES(\'' + req.body.cID + '\', \'' + req.body.tID + '\', \'' +
                  req.body.cName + '\', \'' + req.body.credit + '\', \'' + req.body.semester + '\')';
      connection.query(sql, function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          res.json({restype: 'failed'});
        }
        else
          res.json({restype: 'success'});
        // console.log(data);
      });
  });

  app.post('/admin/teacher', function(req, res){
    // teacher info update
    var sql = 'INSERT INTO teacher VALUES(\'' + req.body.tID + '\', \'' + req.body.tName + '\', \'' +
                  req.body.password + '\', \'' + req.body.sex + '\', \'' + req.body.email + '\')';
      connection.query(sql, function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          res.json({restype: 'failed'});
        }
        else
          res.json({restype: 'success'});
        // console.log(data);
      });
  });

  app.post('/admin/student', function(req, res){
    // teacher info delete
    console.log(req.body);
    var sql = 'INSERT INTO student VALUES(\'' + req.body.sID + '\', \'' + req.body.sName + '\', \'' +
                  req.body.classno + '\', \'' + req.body.sex + '\', \'' + req.body.password + '\')';
      connection.query(sql, function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          res.json({restype: 'failed'});
        }
        else
          res.json({restype: 'success'});
        // console.log(data);
      });
  });

  app.delete('/admin/course/:id', function(req, res){
    // delete courese info
    var re_flag = 1;
    // delete course
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
    // delete take
    sql = 'DELETE FROM take WHERE cID = \'' + req.params.id + '\'';
    console.log(sql);
    connection.query(sql, function(err){
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        // res.send({type: 'failed'});
        re_flag = 0;
        // return;
      }
    });
    if(!re_flag)
        res.send({restype: 'failed'});
    else
      res.send({restype: 'success'});
  });

  app.delete('/admin/teacher/:id', function(req, res){
    // delete teacher info
    var re_flag = 1;
    // delete take 
    var t_cid;
    var sql = 'SELECT cID FROM course WHERE tID = \'' + req.params.id + '\'';
    // console.log(sql);
    connection.query(sql, function(err){
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        // res.send({type: 'failed'});
        re_flag = 0;
        // return;
      }
      else
        t_cid = result[0].cID;
    });
    sql = 'DELETE FROM take WHERE cID = \'' + t_cid + '\'';
    console.log(sql);
    connection.query(sql, function(err){
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        // res.send({type: 'failed'});
        re_flag = 0;
        // return;
      }
    });
    // delete course
    sql = 'DELETE FROM course WHERE tID = \'' + req.params.id + '\'';
    console.log(sql);
    connection.query(sql, function(err){
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        // res.send({type: 'failed'});
        re_flag = 0;
        // return;
      }
    });
    // delete teacher
    sql = 'DELETE FROM teacher WHERE tID = \'' + req.params.id + '\'';
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
    if(!re_flag)
        res.send({restype: 'failed'});
    else
      res.send({restype: 'success'});
    // res.send({type: 'success'});
  });

  app.delete('/admin/student/:id', function(req, res){
    // delete student info
    var re_flag = 1;
    // delete student
    var sql = 'DELETE FROM student WHERE sID = \'' + req.params.id + '\'';
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
    // delete take
    sql = 'DELETE FROM take WHERE sID = \'' + req.params.id + '\'';
    console.log(sql);
    connection.query(sql, function(err){
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        // res.send({type: 'failed'});
        re_flag = 0;
        // return;
      }
    });
    if(re_flag == 0)
        res.send({restype: 'failed'});
    else
      res.send({restype: 'success'});
  });

  app.put('/admin/course/:id', function(req, res){
    // update course info
    // console.log(req.body)
    var sql = 'UPDATE course SET tID = \'' + req.body.tID + '\', cName = \'' + req.body.cName + '\', credit = \'' +
              req.body.credit + '\', semester = \'' + req.body.semester + '\' WHERE cID = \'' + req.params.id + '\'';
    // console.log(sql);
    connection.query(sql, function (err, result) {
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        res.json({restype: 'failed'});
      }
      else{
        res.json({restype: 'success'});
      }
    });
  });

  app.put('/admin/teacher/:id', function(req, res){
    // update teacher info
    var sql = 'UPDATE teacher SET email = \'' + req.body.email + '\', tName = \'' + req.body.tName + '\', sex = \'' +
              req.body.sex + '\', password = \'' + req.body.password + '\' WHERE tID = \'' + req.params.id + '\'';
    console.log(sql);
    connection.query(sql, function(err){
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        res.json({restype: 'failed'});
        // return;
      }
      else
        res.json({restype: 'success'});
    });
  });

  app.put('/admin/student/:id', function(req, res){
    // update student info
    var sql = 'UPDATE student SET classno = \'' + req.body.classno + '\', sName = \'' + req.body.sName + '\', sex = \'' +
              req.body.sex + '\', password = \'' + req.body.password + '\' WHERE sID = \'' + req.params.id + '\'';
    console.log(sql);
    connection.query(sql, function(err){
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        res.send({restype: 'failed'});
        // return;
      }
      else 
        res.send({restype: 'success'});
    });
  });

  app.get('/admin/student', function(req,res){
    // console.log(req.body);
    var sql = 'SELECT * FROM student ';
    connection.query(sql, function (err, result) {
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        data = [];
        temp = new Object();
        temp.sID = 'error';
        temp.sName = 'error';
        temp.classno = 'error';
        temp.password = 'error';
        temp.sex = 'error';
        data.push(temp);
        res.send(data);
      }
      else{
        data = [];
        for(var i = 0; i < result.length; i++)
        {
          temp = new Object();
          temp.sID = result[i].sID;
          temp.sName = result[i].sName;
          temp.classno = result[i].classno;
          temp.password = result[i].password;
          temp.sex = result[i].sex;
          data.push(temp);
        }
        res.send(data);
      }
      // console.log(data);
    });
  });

  app.get('/admin/teacher', function(req,res){
    var sql = 'SELECT * FROM teacher WHERE tID <> \'admin\'';
    connection.query(sql, function (err, result) {
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        data = [];
        temp = new Object();
        temp.tID = 'error';
        temp.tName = 'error';
        temp.email = 'error';
        temp.password = 'error';
        temp.sex = 'error';
        data.push(temp);
        res.send(data);
      }
      else{
        data = [];
        for(var i = 0; i < result.length; i++)
        {
          temp = new Object();
          temp.tID = result[i].tID;
          temp.tName = result[i].tName;
          temp.email = result[i].email;
          temp.password = result[i].password;
          temp.sex = result[i].sex;
          data.push(temp);
        }
        res.send(data);
      }
      // console.log(data);
    });
  });

  app.get('/admin/course', function(req,res){
    var sql = 'SELECT * FROM course ';
    connection.query(sql, function (err, result) {
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        data = [];
        temp = new Object();
        temp.cID = 'error';
        temp.tID = 'error';
        temp.cName = 'error';
        temp.credit = 'error';
        temp.semester = 'error';
        data.push(temp);
        res.send(data);
      }
      else{
        data = [];
        for(var i = 0; i < result.length; i++)
        {
          temp = new Object();
          temp.cID = result[i].cID;
          temp.tID = result[i].tID;
          temp.cName = result[i].cName;
          temp.credit = result[i].credit;
          temp.semester = result[i].semester;
          data.push(temp);
        }
        res.send(data);
      }
      // console.log(data);
    });
  });

  // app.post('/admin', function(req, res){
  //   // all info
  //   // student info
  //   var tdata = [];
  //   var sql = 'SELECT * FROM student ';
  //   connection.query(sql, function (err, result) {
  //     if(err){
  //       console.log('[SELECT ERROR] - ',err.message);
  //       data = [];
  //       temp = new Object();
  //       temp.sID = 'error';
  //       temp.sName = 'error';
  //       temp.classno = 'error';
  //       temp.sex = 'error';
  //       tdata.push(temp);
  //       data.push(tdata);
  //       // res.send(data);
  //     }
  //     else{
  //       data = [];
  //       for(var i = 0; i < result.length; i++)
  //       {
  //         temp = new Object();
  //         temp.sID = result[i].sID;
  //         temp.sName = result[i].sName;
  //         temp.classno = result[i].classno;
  //         temp.sex = result[i].sex;
  //         tdata.push(temp);
  //       }
  //       // res.send(data);
  //       data.push(tdata);
  //     }
  //   });

  //   sql = 'SELECT * FROM teacher WHERE tID <> \'admin\'';
  //   connection.query(sql, function (err, result) {
  //     if(err){
  //       console.log('[SELECT ERROR] - ',err.message);
  //       tdata = [];
  //       temp = new Object();
  //       temp.tID = 'error';
  //       temp.tName = 'error';
  //       temp.email = 'error';
  //       temp.sex = 'error';
  //       tdata.push(temp);
  //       // res.send(data);
  //       data.push(tdata);
  //     }
  //     else{
  //       tdata = [];
  //       for(var i = 0; i < result.length; i++)
  //       {
  //         temp = new Object();
  //         temp.tID = result[i].tID;
  //         temp.tName = result[i].tName;
  //         temp.email = result[i].email;
  //         temp.sex = result[i].sex;
  //         tdata.push(temp);
  //       }
  //       // res.send(data);
  //       data.push(tdata);
  //     }
  //   });


  //   var sql = 'SELECT * FROM course ';
  //   connection.query(sql, function (err, result) {
  //     if(err){
  //       console.log('[SELECT ERROR] - ',err.message);
  //       tdata = [];
  //       temp = new Object();
  //       temp.cID = 'error';
  //       temp.tID = 'error';
  //       temp.tName = 'error';
  //       temp.credit = 'error';
  //       temp.semester = 'error';
  //       tdata.push(temp);
  //       data.push(tdata);
  //       res.send(data);
  //     }
  //     else{
  //       tdata = [];
  //       for(var i = 0; i < result.length; i++)
  //       {
  //         temp = new Object();
  //         temp.cID = result[i].cID;
  //         temp.tID = result[i].tID;
  //         temp.tName = result[i].tName;
  //         temp.credit = result[i].credit;
  //         temp.semester = result[i].semester;
  //         tdata.push(temp);
  //       }
  //       data.push(tdata);
  //       res.send(data);
  //     }
  //   });
  // });
};
// connection.end();
