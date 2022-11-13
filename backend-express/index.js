var express = require('express');
var app     = express();
var cors    = require('cors');
var dal     = require('./dal.js');
const bodyParser = require('body-parser');


app.use(cors());
app.use(bodyParser.json());

// Create account
app.post('/create-account', function(req, res) {
    const userInfo = req.body;
    // check if account exists
    dal.findUser(userInfo.email).
        then((users) => {
            // if user exists, return error message
            if(users.length > 0){
                console.log('User already in exists');
                res.send('User already in exists');    
            }
            else {
                // else create user
                dal.create(userInfo.name, userInfo.email, userInfo.password).
                    then((user) => {
                        console.log(user);
                        res.send(user);            
                    });            
            }
        });
});

// Get transactions
app.get('/transactions/:email', function(req, res) {
    const email = req.params.email;

    dal.getTransactions(email).
        then((transactions) => {
            console.log('Email:', email, 'Transactions:', transactions)
            res.send(transactions);
        });
});

// Get total balance
app.get('/balance/:email', function(req, res) {
    const email = req.params.email;

    dal.getTransactions(email).
        then((transactions) => {
            if (transactions.length > 0) {
                let balance = 0;
                transactions.forEach((tran) => {
                    balance += tran.amount;
                })    
                res.send({totalBalance: balance});
            } else {
                res.send("Error");
            }
        });
});

// Make deposit
app.post('/deposit', function(req, res) {
    const {email, amount} = req.body;
    dal.insertTransaction(email, amount).
        then((result) => {
            res.send(result);
        });
});

// Make withdrawal
app.post('/withdraw', function(req, res) {
    const {email, amount} = req.body;
    dal.insertTransaction(email, amount * -1).
        then((result) => {
            res.send(result);
        });
});

var port = 4000;
app.listen(port);
console.log('Running on port: ' + port);