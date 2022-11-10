import React from 'react';
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Deposit from "./features/Deposit/Deposit";
import WithDraw from "./features/Withdraw/Withdraw";
import CreateAccount from "./features/CreateAccount/CreateAccount.jsx";
import Login from "./features/Login/Login";
// import Main from "./component/Main/Main";
// import AllData from "./component/AllData";

import "./styles/base.scss";
import "bootstrap/dist/css/bootstrap.css";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="create-account" element={<CreateAccount />} />
      {/* <Route path="home" element={<Main />} /> */}
      <Route path="deposit" element={<Deposit />} />
      <Route path="withdraw" element={<WithDraw />} />
      {/* <Route path="alldata" element={<AllData />} />  */}
    </Routes>
  );
}

export default App;
