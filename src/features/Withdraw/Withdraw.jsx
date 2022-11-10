import React from "react";
import Card from "../../components/Card";

import Navbar from "../../components/Navbar";
export default function Deposit() {
  const [balance, setBalance] = React.useState(0);
  const [withdrawAmount, setWithdrawAmount] = React.useState(0);
  const [validationMsg, setValidationMsg] = React.useState("");
  const [showWithdrawSuccessMsg, setShowWithdrawSuccessMsg] =
    React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (withdrawAmount) {
      if (typeof withdrawAmount === "number") {
        if (withdrawAmount < 0) {
          setValidationMsg("Withdraw Amount must be greater than 0");
        } else {
          if (withdrawAmount > balance) {
            setValidationMsg(
              "Withdraw Amount must be less than balance amount"
            );
          } else {
            setBalance(balance - withdrawAmount);
            setValidationMsg("");
            setShowWithdrawSuccessMsg(true);
          }
        }
      } else {
        setValidationMsg("Withdraw Amount must be number");
      }
    } else {
      setValidationMsg("Withdraw Amount is required");
    }
  };
  return (
    <>
      <Navbar />
      <div className="row g-0 h-100">
        <div className="col-lg-4">
          <Card title="Smart Bank">Balance:</Card>
        </div>
        <div className="col-lg-8">
          <Card title="Withdraw">
            {showWithdrawSuccessMsg && (
              <span className="text-success fw-bold">
                Withdrawn Successfully
              </span>
            )}
            <div className="fw-bold">Balance: ${balance}</div>
            <form onSubmit={handleSubmit}>
              <>
                <br />
                Withdraw Amount
                <br />
                <input
                  type="number"
                  min={0}
                  className="form-control"
                  id="withdraw-amount"
                  placeholder="Withdraw Amount"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(+e.currentTarget.value)}
                />
                {validationMsg && (
                  <span className="text-danger">{validationMsg}</span>
                )}
                <br />
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!withdrawAmount}
                >
                  Withdraw
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
