import React, { useEffect } from "react";
import axios from "axios";

import { Table } from "react-bootstrap";
import UserContext from "../../Context/Context";
import Navbar from "../../components/Navbar";
import Card from "../../components/Card";
import AccountDetails from "../../components/AccountDetails";

const API_BACKEND_URL = process.env.BACKEND_EXPRESS || "http://localhost:4000";

export default function AllData() {
  const [ctxValue, setCtxValue] = React.useContext(UserContext);
  const [transactions, setTransactions] = React.useState([]);
  const [balance, setBalance] = React.useState(0);


  useEffect(() => {
    getTransactions();
    getBalance();
  }, []);

  function getBalance() {
    axios
      .get(API_BACKEND_URL + "/balance", {
        headers: {
          Authorization: "Bearer " + ctxValue.accessToken,
        },
      })
      .then((resp) => {
        if (resp.data) {
          setBalance(resp.data.totalBalance);
        }
      });
  }

  function getTransactions() {
    axios
      .get(API_BACKEND_URL + "/transactions", {
        headers: {
          Authorization: "Bearer " + ctxValue.accessToken,
        },
      })
      .then((resp) => {
        if (resp.data) {
            let sumBalance = 0;
            const transactionsMapped = resp.data.map(t => {
                sumBalance += Number(t.amount);
                return {...t, sumBalance: sumBalance};
            })
          setTransactions(transactionsMapped);
        }
      });
  }

  return (
    <>
      <Navbar />
      <div className="row g-0 h-100">
        <div className="col-lg-4">
          <AccountDetails name={ctxValue.name} balance={balance} />
        </div>

        <div className="col-lg-8">
          <Card title="Transactions">
            <Table striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Transaction Number</th>
                  <th>Transaction Date</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td></td>
                    <td>
                      {transaction.dateCreated
                        ? transaction.dateCreated.split("T")[0]
                        : ""}
                    </td>
                    <td>{transaction.amount > 0 ? "Deposit" : "Withdraw"}</td>
                    <td>${Math.abs(transaction.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
                    <td>${transaction.sumBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </div>
      </div>
    </>
  );
}