var express = require('express');
var app     = express();
var cors    = require('cors');
var dal     = require('./dal.js');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const accessTokenSecret = 'somerandomaccesstoken';
const origins = ["http://localhost:3000"];

const corsOptions =  {
    origin: origins
}

app.use(cors(corsOptions));
app.use(bodyParser.json());

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    // console.log(`Headers: ${JSON.stringify(req.headers)}`);
    // console.log(`Body: ${JSON.stringify(req.body)}`);
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            // console.log('User:', user);
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

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
app.get('/transactions', authenticateJWT, function(req, res) {
    const email = req.user.username;

    dal.getTransactions(email).
        then((transactions) => {
            console.log('Email:', email, 'Transactions:', transactions)
            res.send(transactions);
        });
});

// Get total balance
app.get('/balance', authenticateJWT, function(req, res) {
    const email = req.user.username;

    dal.getBalance(email).
        then((balance) => {
            res.send(balance);
        });
});

// Make deposit
app.post('/deposit', authenticateJWT, function(req, res) {
    const {amount} = req.body;
    const email = req.user.username;
    if (email){
        dal.insertTransaction(email, amount).
        then((result) => {
            res.send(result);
        });
    }
    else {
        res.send("Email is empty");
    }
});

// Make withdrawal
app.post('/withdraw', authenticateJWT, function(req, res) {
    const {amount} = req.body;
    const email = req.user.username;
    console.log('Request body:', req.body, 'Amount:', amount, 'Email:', email);
    if (email){
        dal.getBalance(email).then(balance => {
            const totalBalanceAfterWithdraw = balance.totalBalance - Number(amount);

            console.log('Total Balance after withdraw', totalBalanceAfterWithdraw);
            if (totalBalanceAfterWithdraw >= 0) {
                dal.insertTransaction(email, amount * -1).
                then((result) => {
                    res.send(result);
                });
            } else {
                res.send("Balance not enough to withdraw amount");
            }
        });
    }
    else {
        res.send("Email is empty");
    }
});

var port = 4000;
app.listen(port);
console.log('Running on port: ' + port);