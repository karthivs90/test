var express = require("express");
var mysql = require('pg');
var port = process.env.PORT || 2000;
var app = express();
const bodyParser = require('body-parser');

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
    res.sendFile(__dirname + '/' + 'register.html')
})

app.post('/dash', (req, res) => {
    var firstName = req.body.inputfirst;
    var lastName = req.body.inputlast;
    var userName = req.body.inputuser;
    var password = req.body.password;

    const query = 'INSERT INTO "user" (firstname, lastname, username, password) VALUES ($1, $2, $3, $4)';
    const values = [firstName, lastName, userName, password];

    client.query(query, values)
        .then(() => {
            console.log('Data inserted successfully.');
            res.sendFile(__dirname + '/' + 'login.html');
        })
        .catch((err) => {
            console.error('Error inserting data:', err);
            res.status(500).send('Error inserting data into the database.');
        });
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/' + 'login.html')
})

app.post('/board', (req, res) => {
    var userName = req.body.inputuser;
    var password = req.body.password;

    const query = 'SELECT * FROM "user" WHERE username = $1 AND password = $2';
    const values = [userName, password];
  
    client.query(query, values)
      .then((result) => {
        if (result.rowCount > 0) {
          console.log(userName, "Your permission is granted.");
          res.sendFile(__dirname + '/' + 'task.html');
        } else {
          console.log(userName, "Unavailable user.");
          res.send("Unavailable user.");
        }
      })
      .catch((err) => {
        console.error('Error querying data:', err);
        res.status(500).send('Error querying data from the database.');
      });
})

app.get('/task', (req, res) => {
    res.sendFile(__dirname + '/' + 'task.html')
})

app.listen(port, (req, res) => {
    console.log(port, "listen")
});
