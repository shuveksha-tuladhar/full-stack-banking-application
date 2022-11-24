import React, { useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import AccountDetails from "../../components/AccountDetails";
import Card from "../../components/Card";
import { Toast } from "react-bootstrap";
import { UserContext, API_BACKEND_URL } from "../../Context/Context";

import Navbar from "../../components/Navbar";

export default function Withdraw() {
  const [showToast, setShowToast] = React.useState(false);
  const [ctxValue] = React.useContext(UserContext);
  const [balance, setBalance] = React.useState(0);

  useEffect(() => {
    getBalance();
  }, []);

  const formik = useFormik({
    initialValues: {
      amount: 0,
    },
    onSubmit: (values) => {
      console.log("Withdraw amount:", values);
      // Call backend API for withdraw
      withdrawAmount(values);
    },
    validate: (values) => {
      let errors = {};

      if (!values.amount) {
        errors.amount = "Amount is required";
      } else {
        if (values.amount <= 0) {
          errors.amount = "Amount must be greater than 0";
        }

        let total = balance - values.amount;
        if (total < 0) {
          errors.amount = "Balance not enough to withdraw amount";
        }
      }
      return errors;
    },
  });

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

  const withdrawAmount = ({ amount }) => {
    axios
      .post(
        API_BACKEND_URL + "/api/withdraw",
        JSON.stringify({
          amount: Number(amount),
        }),
        {
          headers: {
            Authorization: "Bearer " + ctxValue.accessToken,
            "Content-Type": "application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        const data = resp.data;
        if (data === "Balance not enough to withdraw amount") {
          console.log(formik.errors);
        } else {
          console.log(data);
          // Show toast message
          const total = balance - amount;
          setBalance(total);
          setShowToast(true);
        }
      });
  };

  return (
    <>
      <Navbar />
      <div className="row g-0 h-100">
        {ctxValue.username && ctxValue.accessToken && (
          <>
            <div className="col-lg-4">
              <AccountDetails
                name={ctxValue.name}
                balance={balance}
                accountNumber={ctxValue.accountNumber}
              />
            </div>
            <div className="col-lg-8">
              <Card title="Withdraw">
                <Toast
                  bg="success"
                  onClose={() => setShowToast(false)}
                  show={showToast}
                  delay={3000}
                  autohide
                >
                  <Toast.Body className="text-white">
                    Withdrawn successfully
                  </Toast.Body>
                </Toast>
                <form onSubmit={formik.handleSubmit}>
                  <>
                    <br />
                    Withdraw Amount
                    <br />
                    <input
                      className="form-control"
                      type="number"
                      id="withdraw-amount"
                      placeholder="Withdraw Amount"
                      defaultValue={formik.values.amount}
                      onChange={(e) =>
                        formik.setFieldValue("amount", e.target.value)
                      }
                    />
                    {formik.errors.amount && (
                      <span className="text-danger">
                        {formik.errors.amount}
                      </span>
                    )}
                    <br />
                    <button type="submit" className="btn btn-primary">
                      Withdraw
                    </button>
                  </>
                </form>
              </Card>
            </div>
          </>
        )}

        {!(ctxValue.username && ctxValue.accessToken) && (
          <span className="text-secondary">
            User must be logged in to withdraw the amount.
          </span>
        )}
      </div>
    </>
  );
}
