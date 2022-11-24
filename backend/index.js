require("dotenv").config();
var express = require("express");
var app = express();
var cors = require("cors");
var dal = require("./src/dal.js");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

console.log("NODE env:", process.env.NODE_ENV);
console.log("Mongo URL:", process.env.MONGO_URL);
console.log("Origin URL:", process.env.ORIGIN_URL);

const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || "somerandomaccesstoken";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "somerandomstringforrefreshtoken";

const originUrl = process.env.ORIGIN_URL || "http://localhost:3000";
const origins = [originUrl];

const corsOptions = {
  origin: origins,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
// ===============================================================================
// Authentication (Login, Logout)
// ===============================================================================
let refreshTokens = [];

app.post("/login", async (request, response) => {
  // read username and password from request body
  const { username, password } = request.body;

  // filter user from the users collection in mongoDB by username and password
  const userInfo = await dal.findUser(username, password);

  if (userInfo.length > 0) {
    const user = userInfo[0];
    // generate an access token
    const accessToken = jwt.sign(
      { username: user.email, role: user.role },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "20m" }
    );
    const refreshToken = jwt.sign(
      { username: user.email, role: user.role },
      REFRESH_TOKEN_SECRET
    );

    refreshTokens.push(refreshToken);

    response.json({
      accessToken,
      refreshToken,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } else {
    response.send("Username or password incorrect");
  }
});

app.post("/token", (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.sendStatus(401);
  }

  if (!refreshTokens.includes(token)) {
    return res.sendStatus(403);
  }

  jwt.verify(token, REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    const accessToken = jwt.sign(
      { username: user.username, role: user.role },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "20m" }
    );

    res.json({
      accessToken,
    });
  });
});

app.post("/logout", (req, res) => {
  const { token } = req.body;
  refreshTokens = refreshTokens.filter((t) => t !== token);

  res.send("Logout successful");
});

// ===============================================================================
// API (Create Account, Deposit, Withdraw, Transactions, Balance)
// ===============================================================================
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log(`Headers: ${JSON.stringify(req.headers)}`);
  // console.log(`Body: ${JSON.stringify(req.body)}`);
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
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
};

// Create account
app.post("/api/create-account", function (req, res) {
  const userInfo = req.body;
  // check if account exists
  dal.findUser(userInfo.email).then((users) => {
    // if user exists, return error message
    if (users.length > 0) {
      console.log("User already in exists");
      res.send("User already in exists");
    } else {
      // else create user
      dal
        .create(userInfo.name, userInfo.email, userInfo.password)
        .then((user) => {
          console.log(user);
          res.send(user);
        });
    }
  });
});

// Get transactions
app.get("/api/transactions", authenticateJWT, function (req, res) {
  const email = req.user.username;

  dal.getTransactions(email).then((transactions) => {
    res.send(transactions);
  });
});

// Get total balance
app.get("/api/balance", authenticateJWT, function (req, res) {
  const email = req.user.username;

  dal.getBalance(email).then((balance) => {
    res.send(balance);
  });
});

// Make deposit
app.post("/api/deposit", authenticateJWT, function (req, res) {
  const { amount } = req.body;
  const email = req.user.username;
  if (email) {
    dal.insertTransaction(email, amount).then((result) => {
      res.send(result);
    });
  } else {
    res.send("Email is empty");
  }
});

// Make withdrawal
app.post("/api/withdraw", authenticateJWT, function (req, res) {
  const { amount } = req.body;
  const email = req.user.username;
  if (email) {
    dal.getBalance(email).then((balance) => {
      const totalBalanceAfterWithdraw = balance.totalBalance - Number(amount);

      console.log("Total Balance after withdraw", totalBalanceAfterWithdraw);
      if (totalBalanceAfterWithdraw >= 0) {
        dal.insertTransaction(email, amount * -1).then((result) => {
          res.send(result);
        });
      } else {
        res.send("Balance not enough to withdraw amount");
      }
    });
  } else {
    res.send("Email is empty");
  }
});

// Get user details
app.get("/api/account-detail", authenticateJWT, function (req, res) {
  const email = req.user.username;
  if (email) {
    dal.getAccountDetail(email).then((user) => {
      // Filtering password
      const userInfo = {
        name: user.name,
        email: user.email,
        accountNumber: user.accountNumber,
      };
      res.send(userInfo);
    });
  } else {
    res.send("Email is empty");
  }
});

// Update password
app.post("/api/update-password", authenticateJWT, function (req, res) {
  const email = req.user.username;
  const { oldpassword, newpassword, confirmPassword } = req.body;

  if (email && newpassword === confirmPassword) {
    dal.getAccountDetail(email).then((account) => {
      if (account && account.password === oldpassword) {
        dal.updatePassword(email, newpassword).then((user) => {
          res.send("Password updated");
        });
      } else {
        res.send("Password Mismatch");
      }
    });
  } else {
    res.send("Email is empty");
  }
});

var port = 8080;
app.listen(port, function () {
  console.log("Running on port: " + port);
});
