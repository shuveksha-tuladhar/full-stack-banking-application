import React from "react";

export default function Card(props) {
  const { children, title } = props;
  return (
    <>
      <div className="card border-0">
        <h5 className="text-center text-secondary mb-4">{title}</h5>
        <div className="card-inner shadow-sm">{children}</div>
      </div>
    </>
  );
}