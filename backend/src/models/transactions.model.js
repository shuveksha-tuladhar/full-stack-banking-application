const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  amount: {
    type: String,
  },
  dateCreated: {
    type: String,
  },
  transactionNumber: {
    type: String,
  }
});

const Transactions = mongoose.model('Transactions', transactionSchema);

module.exports = Transactions;
