var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({exrended: false});
var jsonParser = bodyParser.json();
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'stu_grade'
});

var mInfo = [];
var cInfo = [];
var sInfo = [];

module.exports = function (app) {
    app.get('/tea', function (req, res) {
        cInfo = [];
        // 需要确定教师ID是否存储在cookies里
        var sql = 'select * from course where tID = "' + req.cookies.authorized + '"';
        connection.query(sql, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                // res.render('tea', {courseInfo: ['错误']});
                res.send({type: 'failed'});
            } else if (result.length === 0) {
                // res.render('tea', {courseInfo: ['无']});
                res.send({type: 'failed'});
            } else {
                for (var i = 0; i < result.length; i++) {
                    var temp = [];
                    temp.push({cID: result[i].cID});
                    temp.push({cName: result[i].cName});
                    temp.push({credit: result[i].credit});
                    temp.push({semester: result[i].semester});
                    cInfo.push(temp);
                }
                // res.render('tea', {courseInfo: cInfo});
                res.send(cInfo);
            }
        });
    });

    // app.post('/tea/tIDmodify', urlencodedParser, function (req, res) {
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

    app.post('/tea/getGradeBySID', urlencodedParser, function (req, res) {
        sInfo = [];
        var sql = 'select * from take natural join student natural join course ' +
            'where tID = "' + req.cookies.authorized +
            '" and sID = "' + req.body.sID + '"';
        connection.query(sql, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                // res.render('tea', {gradeInfo: ['错误']});
                res.send({type: 'failed'});
            } else if (result.length === 0) {
                // res.render('tea', {gradeInfo: ['无']});
                res.send({type: 'failed'});
            } else {
                for (var i = 0; i < result.length; i++) {
                    var temp = [];
                    temp.push({sID: result[i].sID});
                    temp.push({sName: result[i].sName});
                    temp.push({classno: result[i].classno});
                    temp.push({cID: result[i].cID});
                    temp.push({cName: result[i].cName});
                    temp.push({credit: result[i].credit});
                    temp.push({grade: result[i].grade});
                    sInfo.push(temp);
                }
                // res.render('tea', {gradeInfo: sInfo});
                res.send({type: 'success'});
            }
        });
    });

    app.post('/tea/getGradeByCID', urlencodedParser, function (req, res) {
        sInfo = [];
        var sql = 'select * from take natural join student natural join course ' +
            'where tID = "' + req.cookies.authorized +
            '" and cID = "' + req.body.cID + '"';
        connection.query(sql, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                // res.render('tea', {gradeInfo: ['错误']});
                res.send({type: 'failed'});
            } else if (result.length === 0) {
                // res.render('tea', {gradeInfo: ['无']});
                res.send({type: 'failed'});
            } else {
                for (var i = 0; i < result.length; i++) {
                    var temp = [];
                    temp.push({sID: result[i].sID});
                    temp.push({sName: result[i].sName});
                    temp.push({classno: result[i].classno});
                    temp.push({cID: result[i].cID});
                    temp.push({cName: result[i].cName});
                    temp.push({credit: result[i].credit});
                    temp.push({grade: result[i].grade});
                    sInfo.push(temp);
                }
                // res.render('tea', {gradeInfo: sInfo});
                res.send({type: 'success'});
            }
        });
    });

    app.post('/tea/editGrade', urlencodedParser, function (req, res) {
        var sql = 'select * from course natural join take where tID = "' + req.cookies.authorized +
            '" and sID = "' + req.body.sID +
            '" and cID = "' + req.body.cID + '"';
        connection.query(sql, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send({type: 'failed'});
                // res.json(错误1);
            } else if (result.length === 0) {
                console.log('没有选了这门课的这个学生');
                res.send({type: 'failed'});
                // res.json('没有');
            } else {
                sql = 'update take set grade = ' + req.body.newScore +
                    ' where sID = "' + req.body.sID +
                    '" and cID = "' + req.body.cID + '"';
                console.log(sql);
                connection.query(sql, function (err) {
                    if (err) {
                        console.log('[SELECT ERROR] - ', err.message);
                        res.send({type: 'failed'});
                        // res.json('错误2');
                    } else {
                        res.send({type: 'success'});
                    }
                });
            }
        });
    });

    app.post('/tea/newGrade', urlencodedParser, function (req, res) {
        var sql = 'select * from take where sID = "' + req.body.sID +
            '" and cID = "' + req.body.cID + '"';
        connection.query(sql, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send({type: 'failed'});
            } else if (result.length !== 0) {
                console.log('已经有了');
                res.send({type: 'failed'});
            } else {
                sql = 'insert into take values("' + req.body.sID +
                    '", "' + req.body.cID +
                    '", ' + req.body.newGrade + ')';
                console.log(sql);
                connection.query(sql, function (err) {
                    if (err) {
                        console.log('[SELECT ERROR] - ', err.message);
                        res.send({type: 'failed'});
                    } else {
                        res.send({type: 'success'});
                    }
                });
            }
        });
    });

    app.post('/tea/courseAdd', urlencodedParser, function (req, res) {
        var sql = 'insert into take values("' + req.body.sID +
            '", "' + req.body.cID + '", null)';
        console.log(sql);
        connection.query(sql, function (err) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send({type: 'failed'});
            } else {
                res.send({type: 'success'});
            }
        });
    });

    app.delete('/tea/takeDelete', urlencodedParser, function (req, res) {
        var sql = 'delete from take where sID = "' + req.body.sID +
            '" and cID = "' + req.body.cID + '"';
        console.log(sql);
        connection.query(sql, function (err) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send({type: 'failed'});
            } else {
                res.send({type: 'success'});
            }
        });
    });
};