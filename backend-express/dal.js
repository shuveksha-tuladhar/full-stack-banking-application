const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
let db = null;

// connect to mongo
MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
  console.log("Connected successfully to db server");

  // connect to myproject database
  db = client.db("smart-bank");
});

// create user account with role customer using the collection.insertOne function
function create(name, email, password) {
  return new Promise((resolve, reject) => {
    const collection = db.collection("users");
    const doc = { name, email, password, role: "customer" };
    collection.insertOne(doc, { w: 1 }, function (err, result) {
      err ? reject(err) : resolve(doc);
    });
  });
}

// find user account 
function findUser(email) {
    return new Promise((resolve, reject) => {
        db
            .collection('users')
            .find({ email: email })
            .toArray(function (err, docs) {
                err ? reject(err) : resolve(docs);
            });
    })
}

// get all transactions
function getTransactions(email) {
    return new Promise((resolve, reject) => {
        db
            .collection('transactions')
            .find({email: email})
            .toArray(function(err, transactions) {
                err ? reject(err) : resolve(transactions)
            });
        
    });
}

// insert transaction
function insertTransaction(email, amount) {
    return new Promise((resolve, reject) => {
        const doc = {email, amount, dateCreated: new Date()}
        db.collection('transactions')
            .insertOne(doc, {w: 1}, function(err, result) {
                err ? reject(err) : resolve(doc)
            });
    })
}

function getBalance(email) {
    return new Promise((resolve, reject) => {
        db.collection("transactions")
            .find({ email: email })
            .toArray(function (err, transactions) {
            if (err) {
                reject(err);
            } else {
                if (transactions.length > 0) {
                    let balance = 0;
                    transactions.forEach((tran) => {
                        balance += Number(tran.amount);
                    });
                    resolve({ totalBalance: balance });
                } else {
                    resolve({ totalBalance: 0 });
                }
            }
            });
        });
}

module.exports = { create, findUser, getTransactions, insertTransaction, getBalance };
