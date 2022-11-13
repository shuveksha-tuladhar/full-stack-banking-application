const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const MongoClient = require('mongodb').MongoClient;

const app = express();

const accessTokenSecret = 'somerandomaccesstoken';
const refreshTokenSecret = 'somerandomstringforrefreshtoken';

let refreshTokens = [];

app.use(bodyParser.json());

const url = 'mongodb://localhost:27017';
let db = null;

// connect to mongo
MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
    console.log("Connected successfully to db server");
    // connect to myproject database
    db = client.db('smart-bank');
});

app.post('/login', async (request, response) => {
    // read username and password from request body
    const { username, password } = request.body;

    // filter user from the users collection in mongoDB by username and password
    const userInfo = await db.collection('users').find({ email: username, password: password }).toArray();

    if (userInfo.length > 0) {
        const user = userInfo[0];
        // generate an access token
        const accessToken = jwt.sign({ username: user.email, role: user.role }, accessTokenSecret, { expiresIn: '20m' });
        const refreshToken = jwt.sign({ username: user.email, role: user.role }, refreshTokenSecret);

        refreshTokens.push(refreshToken);

        response.json({
            accessToken,
            refreshToken
        });
    } else {
        response.send('Username or password incorrect');
    }
});


app.post('/token', (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.sendStatus(401);
    }

    if (!refreshTokens.includes(token)) {
        return res.sendStatus(403);
    }

    jwt.verify(token, refreshTokenSecret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        const accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret, { expiresIn: '20m' });

        res.json({
            accessToken
        });
    });
});

app.post('/logout', (req, res) => {
    const { token } = req.body;
    refreshTokens = refreshTokens.filter(t => t !== token);

    res.send("Logout successful");
});

const port = 3001;
app.listen(port, () => {
    console.log(`Authentication service started on port ${port}`);
});
