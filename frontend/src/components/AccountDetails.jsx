import React from "react";
import { Button } from "react-bootstrap";
import Card from "./Card";

export default function AccountDetails(props) {
  const { name, balance, accountNumber } = props;
  const [show, setShow] = React.useState(false);

  const maskedAccountNumber = "******" + accountNumber.toString().slice(-4);

  return (
    <div className="px-3">
      <Card title="Account Details" className="bg-purple rounded p-3">
        <div className="d-flex  justify-content-between p-3 pt-0">
          <div>
            <h5 className="mb-2">
              Account Number:{" "}
              <h6>
                {(!show ? maskedAccountNumber : accountNumber) || "####"}{" "}
                <Button variant="link" size="sm" onClick={() => setShow(!show)}>
                  {!show ? "Show" : "Hide"}
                </Button>
              </h6>
            </h5>

            <h6>{name || "Shuveksha Tuladhar"}</h6>
          </div>
          <div className="text-right">
            <h6 className="mb-2">
              Balance: $
              {balance.toLocaleString("en-US", { minimumFractionDigits: 2 }) ||
                "0.00"}
            </h6>
          </div>
        </div>
      </Card>
    </div>
  );
}
