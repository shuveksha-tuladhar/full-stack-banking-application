import React from "react";
import Card from "./Card";

export default function AccountDetails(props) {
  const { name, balance } = props;

  return (
    <div className="px-3">
      <Card title="Account Details" className="bg-purple rounded p-3">
        <div className="d-flex  justify-content-between p-3 pt-0">
          <div>
            <h5 className="mb-2">Account Number: #####</h5>

            <h6>{name || "Shuveksha Tuladhar"}</h6>
          </div>
          <div className="text-right">
            <h6 className="mb-2">Balance:       ${" "}
              {balance.toLocaleString("en-US", { minimumFractionDigits: 2 }) ||
                "0.00"}</h6>
    
        
          </div>
        </div>
      </Card>
    </div>
  );
}
