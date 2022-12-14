import React, { useEffect } from "react";
import axios from "axios";

import { Table } from "react-bootstrap";
import { UserContext, API_BACKEND_URL } from "../../Context/Context";
import Navbar from "../../components/Navbar";
import Card from "../../components/Card";
import AccountDetails from "../../components/AccountDetails";

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
      .get(API_BACKEND_URL + "/api/balance", {
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
      .get(API_BACKEND_URL + "/api/transactions", {
        headers: {
          Authorization: "Bearer " + ctxValue.accessToken,
        },
      })
      .then((resp) => {
        if (resp.data) {
          let sumBalance = 0;
          const transactionsMapped = resp.data.map((t) => {
            sumBalance += Number(t.amount);
            return { ...t, sumBalance: sumBalance };
          });
          setTransactions(transactionsMapped);
        }
      });
  }

  return (
    <>
      <Navbar />
      <div className="row g-0 h-100 ">
        {(ctxValue.username && ctxValue.accessToken) && (
          <>
            <div className="col-lg-4 mt-5">
              <AccountDetails
                name={ctxValue.name}
                balance={balance}
                accountNumber={ctxValue.accountNumber}
              />
            </div>
            <div className="col-lg-8">
              <h5 className="text-center text-secondary my-4">Transactions</h5>
              <div className="px-3">
                <div className="table-responsive">
                  <Table className="table-stripe">
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
                          <td>{transaction.transactionNumber}</td>
                          <td>
                            {transaction.dateCreated
                              ? transaction.dateCreated.split("T")[0]
                              : ""}
                          </td>
                          <td>
                            {transaction.amount > 0 ? "Deposit" : "Withdraw"}
                          </td>
                          <td>
                            $
                            {Math.abs(transaction.amount).toLocaleString(
                              "en-US",
                              { minimumFractionDigits: 2 }
                            )}
                          </td>
                          <td>
                            $
                            {transaction.sumBalance.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                            })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </>
        )}
        {!(ctxValue.username && ctxValue.accessToken) && (
          <span className="text-secondary">
            User must be logged in to view the transaction history.
          </span>
        )}
      </div>
    </>
  );
}
