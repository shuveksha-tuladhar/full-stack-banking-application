import React, { useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import AccountDetails from "../../components/AccountDetails";
import Card from "../../components/Card";
import { Toast } from "react-bootstrap";
import UserContext from "../../Context/Context";

import Navbar from "../../components/Navbar";

const API_BACKEND_URL = process.env.BACKEND_EXPRESS || "http://localhost:4000";

export default function Deposit() {
  const [showToast, setShowToast] = React.useState(false);
  const [ctxValue, setCtxValue] = React.useContext(UserContext);
  const [balance, setBalance] = React.useState(0);

  useEffect(() => {
    getBalance();
  }, []);

  const formik = useFormik({
    initialValues: {
      amount: 0,
    },
    onSubmit: (values) => {
      console.log("Deposit amount:", values);
      // Call backend API for withdraw
      depositAmount(values);
    },
    validate: (values) => {
      let errors = {};

      if (!values.amount) {
        errors.amount = "Amount is required";
      } else {
        if (values.amount <= 0) {
          errors.amount = "Amount must be greater than 0";
        }
      }
      return errors;
    },
  });
  
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

  const depositAmount = ({ amount }) => {
    axios
      .post(
        API_BACKEND_URL + "/deposit",
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
        if (data) {
          console.log(data);
          // Show toast message
          const total = Number(balance) + Number(amount);
          setBalance(total);
          setShowToast(true);
        }
      });
  };

  return (
    <>
      <Navbar />
      <div className="row g-0 h-100">
        <div className="col-lg-4">
          <AccountDetails balance={balance} name={ctxValue.name} />
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
                Deposit successfully
              </Toast.Body>
            </Toast>
            <form onSubmit={formik.handleSubmit}>
              <>
                <br />
                Deposit Amount
                <br />
                <input
                  className="form-control"
                  type="number"
                  id="deposit-amount"
                  placeholder="Deposit Amount"
                  defaultValue={formik.values.amount}
                  onChange={(e) =>
                    formik.setFieldValue("amount", e.target.value)
                  }
                />
                {formik.errors.amount && (
                  <span className="text-danger">{formik.errors.amount}</span>
                )}
                <br />
                <button type="submit" className="btn btn-primary">
                  Deposit
                </button>
              </>
            </form>
          </Card>
        </div>

        {/* <span className="text-secondary">
            User must be logged in to withdraw amount.
          </span> */}
      </div>
    </>
  );
}
