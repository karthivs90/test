var http=require("http");
var express = require("express");
var mysql = require("mysql2");
var port = process.env.PORT || 3000;
var app = express();
const bodyParser = require('body-parser');
const { Client } = require('pg');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const client = new Client({
  user: 'roor',
  host: 'dpg-cht1o78rddlc2mflvbng-a',
  database: 'register_ccl4',
  password: '0oOCKtgpEEbxgS59NS9J3drQfCFBPLwY',
  port: 5432,
});

client.connect();


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

    const query = 'INSERT INTO users (firstname, lastname, username, password) VALUES ($ firstName, $ lastName, $ userName, $ password)';

client.query(query)
  .then(() => {
    console.log('Data inserted successfully.');
    res.sendFile(__dirname + '/' + 'login.html')
  })
  .catch((err) => {
    console.error('Error inserting data:', err);
  })
  .finally(() => {
    client.end();
  });

})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/' + 'login.html')
})

app.post('/board', (req, res) => {
    var userName = req.body.inputuser;
    var password = req.body.password;

    client.connect(function (err) {
        if (err) {
            console.log(err);
        }else{
            console.log("checking")
            query.query('SELECT * FROM user WHERE username = $ userName AND password = $ password', function (err, result) {
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
