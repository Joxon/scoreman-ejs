/*
1. get 返回所有課程名和ID
    活动名：/tea/cInfo
    返回：一个Object列表cInfo，每个Object包含cID、cName，错误的话全是error
2. get 返回教師個人信息
    活动名：/tea/mInfo
    返回：一个Object，名为mInfo，包含所有个人信息。错误的话全是error
3. get 返回某一門課的所有成績
    活动名：/tea/getGradeByCID
    返回：一个列表，首项是一个整数n代表信息条数，错误则为0且没有后续信息。
        之后是n个Object，包含sID、sName、classno、sex、cID、cName、grade。
        末项是一个字典，键为above90、above80、above70、above60、others，值为这些成绩段的人数
4. post 修改一條成績
    活动名：/tea/editGrade
    body参数：tID、sID、cID、newGrade
    返回：字符串，'成功'或错误原因
5. put 增加一條成績
    活动名：/tea/newGrade
    body参数：tID、sID、cID、newGrade
    返回：字符串，'成功'或错误原因
6. put 增加一条选课记录
    活动名：/tea/takeAdd
    body参数：tID、sID、cID
    返回：字符串，'成功'或错误原因
7. delete 删除一条选课记录（成绩）
    活动名：/tea/takeDelete
    body参数：tID、sID、cID
    返回：字符串，'成功'或错误原因
*/

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
  app.get('/tea/cInfo', function (req, res) {
    console.log(req.query);
    var cInfo = [];
    var sql = 'select cID, cName from course where tID = "' + req.query.tID + '"';
    console.log(sql);
    connection.query(sql, function (err, result) {
      if (err) {
        console.log('[SELECT ERROR] - ', err.message);
        res.end();
      } else if (result.length === 0) {
        console.log('无结果');
        res.end();
      } else {
        for (var i = 0; i < result.length; i++) {
          var temp = new Object();
          temp.cID = result[i].cID;
          temp.cName = result[i].cName;
          cInfo.push(temp);
        }
        res.send(cInfo);
      }
    });
  });

  app.get('/tea/mInfo', function (req, res) {
    console.log(req.query);
    var mInfo = new Object();
    var sql = 'select * from teacher where tID = "' + req.query.tID + '"';
    console.log(sql);
    connection.query(sql, function (err, result) {
      if (err) {
        console.log('[SELECT ERROR] - ', err.message);
        res.end();
      } else if (result.length === 0) {
        console.log('无结果');
        res.end();
      } else {
        mInfo.tID = result[0].tID;
        mInfo.tName = result[0].tName;
        mInfo.password = result[0].password;
        mInfo.sex = result[0].sex;
        mInfo.email = result[0].email;
        res.send(mInfo);
      }
    });
  });

  // app.post('/tea/tIDmodify', function (req, res) {
  //     var sql = 'update teacher set ' +
  //         'tID = "' + req.body.tID + '", ' +
  //         'tName = "' + req.body.tName + '", ' +
  //         'password = "' + req.body.password + '", ' +
  //         'sex = "' + req.body.sex + '", ' +
  //         'email = "' + req.body.email + '"';
  //     console.log(sql);
  //     connection.query(sql, function (err) {
  //         if (err) {
  //             console.log('[UPDATE ERROR] - ', err.message);
  //             res.json({type: 'failed'});
  //         } else {
  //             res.json({type: 'success'});
  //         }
  //     });
  // });

  // app.post('/tea/getGradeBySID', function (req, res) {
  //     sInfo = [];
  //     var sql = 'select * from take natural join student natural join course ' +
  //         'where tID = "' + req.cookies.authorized +
  //         '" and sID = "' + req.body.sID + '"';
  //     connection.query(sql, function (err, result) {
  //         if (err) {
  //             console.log('[SELECT ERROR] - ', err.message);
  //             // res.render('tea', {gradeInfo: ['错误']});
  //             res.send({type: 'failed'});
  //         } else if (result.length === 0) {
  //             // res.render('tea', {gradeInfo: ['无']});
  //             res.send({type: 'failed'});
  //         } else {
  //             for (var i = 0; i < result.length; i++) {
  //                 var temp = [];
  //                 temp.push({sID: result[i].sID});
  //                 temp.push({sName: result[i].sName});
  //                 temp.push({classno: result[i].classno});
  //                 temp.push({cID: result[i].cID});
  //                 temp.push({cName: result[i].cName});
  //                 temp.push({credit: result[i].credit});
  //                 temp.push({grade: result[i].grade});
  //                 sInfo.push(temp);
  //             }
  //             // res.render('tea', {gradeInfo: sInfo});
  //             res.send({type: 'success'});
  //         }
  //     });
  // });

  app.get('/tea/getGradeByCID', function (req, res) {
    console.log(req.query);
    var gInfo = [];
    var sql = 'select * from take natural join student natural join course ' +
      'where tID = "' + req.query.tID +
      '" and cID = "' + req.query.cID + '"';
    console.log(sql);
    connection.query(sql, function (err, result) {
      if (err) {
        console.log('[SELECT ERROR] - ', err.message);
      } else if (result.length === 0) {
        console.log('无');
      } else {
        for (var i = 0; i < result.length; i++) {
          var temp = new Object();
          temp.sID = result[i].sID;
          temp.sName = result[i].sName;
          temp.classno = result[i].classno;
          temp.sex = result[i].sex;
          temp.cID = result[i].cID;
          temp.cName = result[i].cName;
          temp.grade = result[i].grade;
          gInfo.push(temp);
        }
      }
      res.send(gInfo);
    });
  });

  app.get('/tea/pic', function (req, res) {
    console.log(req.query);
    var info = [0, 0, 0, 0, 0];
    var sql = 'select grade from take natural join student natural join course ' +
      'where tID = "' + req.query.tID +
      '" and cID = "' + req.query.cID + '"';
    console.log(sql);
    connection.query(sql, function (err, result) {
      if (err) {
        console.log('[SELECT ERROR] - ', err.message);
      } else if (result.length === 0) {
        console.log('无');
      } else {
        for (var i = 0; i < result.length; i++) {
          if (result[i].grade >= 90) {
            info[4]++;
          } else if (result[i].grade >= 80) {
            info[3]++;
          } else if (result[i].grade >= 70) {
            info[2]++;
          } else if (result[i].grade >= 60) {
            info[1]++;
          } else {
            info[0]++;
          }
        }
      }
      res.send(info);
    });
  });

  app.post('/tea/editGrade', function (req, res) {
    console.log(req.body);
    var sql = 'select * from course natural join take where tID = "' + req.body.tID +
      '" and sID = "' + req.body.sID +
      '" and cID = "' + req.body.cID + '"';
    console.log(sql);
    connection.query(sql, function (err1, result) {
      if (err1) {
        console.log('[SELECT ERROR] - ', err1.message);
        res.send('查询错误');
      } else if (result.length === 0) {
        console.log('没有选了这门课的这个学生或这个老师不教这门课');
        res.send('没有选了这门课的这个学生或您不教这门课');
      } else {
        sql = 'update take set grade = ' + req.body.newGrade +
          ' where sID = "' + req.body.sID +
          '" and cID = "' + req.body.cID + '"';
        console.log(sql);
        connection.query(sql, function (err2) {
          if (err2) {
            console.log('[UPDATE ERROR] - ', err2.message);
            res.send('修改错误');
          } else {
            res.send('成功');
          }
        });
      }
    });
  });

  app.put('/tea/newGrade', function (req, res) {
    console.log(req.body);
    var sql = 'select * from course where tID = "' + req.body.tID +
      '" and cID = "' + req.body.cID + '"';
    connection.query(sql, function (err1, result) {
      if (err1) {
        console.log('[SELECT ERROR] - ', err1.message);
        res.send('查询错误');
      } else if (result.length === 0) {
        console.log('这个老师不教这门课');
        res.send('您不教这门课');
      } else {
        sql = 'insert into take values("' + req.body.sID +
          '", "' + req.body.cID +
          '", ' + req.body.newGrade + ')';
        console.log(sql);
        connection.query(sql, function (err2) {
          if (err2) {
            console.log('[INSERT ERROR] - ', err2.message);
            res.send('插入错误');
          } else {
            res.send('成功');
          }
        });
      }
    });
  });

  app.put('/tea/takeAdd/:tID/:sID/:cID', function (req, res) {
    console.log(req.params);
    var sql = 'select * from course where tID = "' + req.params.tID +
      '" and cID = "' + req.params.cID + '"';
    connection.query(sql, function (err1, result) {
      if (err1) {
        console.log('[SELECT ERROR] - ', err1.message);
        res.send('查询失败');
      } else if (result.length === 0) {
        console.log('这个老师不教这门课');
        res.send('您不教这门课');
      } else {
        sql = 'insert into take values("' + req.params.sID +
          '", "' + req.params.cID + '", null)';
        console.log(sql);
        connection.query(sql, function (err) {
          if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send('插入错误');
          } else {
            res.send('成功');
          }
        });
      }
    });
  });

  app.delete('/tea/takeDelete/:tID/:sID/:cID', function (req, res) {
    console.log(req.params);
    var sql = 'select * from course where tID = "' + req.params.tID +
      '" and cID = "' + req.params.cID + '"';
    connection.query(sql, function (err1, result) {
      if (err1) {
        console.log('[SELECT ERROR] - ', err1.message);
        res.send('查询失败');
      } else if (result.length === 0) {
        console.log('这个老师不教这门课');
        res.send('您不教这门课');
      } else {
        sql = 'delete from take where sID = "' + req.params.sID +
          '" and cID = "' + req.params.cID + '"';
        console.log(sql);
        connection.query(sql, function (err2) {
          if (err2) {
            console.log('[DELETE ERROR] - ', err2.message);
            res.send('删除失败');
          } else {
            res.send('成功');
          }
        });
      }
    });
  });
};