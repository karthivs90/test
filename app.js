var http=require("http");
var express = require("express");
var mysql = require("mysql2");
var port = process.env.PORT || 3000;
var app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var connection = mysql.createConnection({
    host: 'dpg-cht1o78rddlc2mflvbng-a',
    user: 'roor',
    password: '0oOCKtgpEEbxgS59NS9J3drQfCFBPLwY',
    database: 'register_ccl4',
    port: '5432'
});

connection.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log('connencted');
    }
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/' + 'index.html')
})

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/' + 'index.html')
})

app.post('/dash', (req, res) => {
    var firstName = req.body.inputfirst;
    var lastName = req.body.inputlast;
    var userName = req.body.inputuser;
    var password = req.body.password;

    var sql = `INSERT INTO user (firstname, lastname, username, password) VALUES ('${firstName}', '${lastName}', '${userName}', '${password}')`;
    connection.query(sql, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(firstName,"file is updated");
            res.sendFile(__dirname + '/' + 'login.html')
        }
    });
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/' + 'login.html')
})

app.post('/board', (req, res) => {
    var userName = req.body.inputuser;
    var password = req.body.password;

    connection.connect(function (err) {
        if (err) {
            console.log(err);
        }else{
            console.log("checking")
            connection.query(`SELECT * FROM user WHERE username = '${userName}' AND password = '${password}'`, function (err, result) {
                if (err) {
                    console.log(err);
                    res.write("unavailable user")
                }else{
                    console.log(userName,"Your permission is Granded");
                    res.sendFile(__dirname+'/'+'task.html')
                }
            })
        }
    })
})

app.listen(port, (req, res) => {
    console.log("listen")
});
