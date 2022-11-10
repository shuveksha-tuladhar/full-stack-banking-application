import React from "react";

import Card from "../../components/Card";

import Navbar from "../../components/Navbar";
export default function Deposit() {
  const [balance, setBalance] = React.useState(0);
  const [depositAmount, setDepositAmount] = React.useState("");
  const [validationMsg, setValidationMsg] = React.useState("");
  const [showDepositSuccessMsg, setShowDepositSuccessMsg] =
    React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (depositAmount) {
      if (typeof depositAmount === "number") {
        if (depositAmount < 0) {
          setValidationMsg("Deposit Amount must be greater than 0");
        } else {
          setBalance(balance + depositAmount);
          setShowDepositSuccessMsg(true);
          setValidationMsg("");
        }
      } else {
        setValidationMsg("Deposit Amount must be number");
      }
    } else {
      setValidationMsg("Deposit Amount is required");
    }
  };
  return (
    <>
      <Navbar />
      <div className="row g-0 h-100">
      <div className="col-lg-4">
        <Card title="Account Balance">Balance:</Card>
      </div>
      
      <div className="col-lg-8">
        <Card title="Smart Bank">
          <>
            <div className="fw-bold">Balance: ${balance}</div>
            <form onSubmit={handleSubmit}>
              <>
                <br />
                Deposit Amount
                <br />
                <input
                  type="number"
                  min={0}
                  className="form-control"
                  id="deposit-amount"
                  placeholder="Deposit Amount"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(+e.currentTarget.value)}
                />
                {validationMsg && (
                  <span className="text-danger">{validationMsg}</span>
                )}
                <br />
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!depositAmount}
                >
                  Deposit
                </button>
                <div className="mt-4">
                  {showDepositSuccessMsg && (
                    <>
                      <span className="text-success fw-bold">
                        Deposited Successfully{" "}
                      </span>
                      <p>Your Total Amount is ${balance}</p>{" "}
                    </>
                  )}
                </div>
              </>
            </form>
          </>
        </Card>
      </div>
      </div>
    </>
  );
}
