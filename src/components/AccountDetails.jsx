import React from "react";
import Card from "./Card";

export default function AccountDetails(props) {
  const { name, balance } = props;

  return (
    <Card title="Account Details">
      <h5>Account Number: ######</h5>
      <h5>{name || "Shuveksha Tuladhar"}</h5>
      Balance: $
      {balance.toLocaleString("en-US", { minimumFractionDigits: 2 }) || "0.00"}
    </Card>
  );
}
