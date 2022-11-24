import React from 'react';
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Deposit from "./features/Deposit/Deposit";
import WithDraw from "./features/Withdraw/Withdraw";
import CreateAccount from "./features/CreateAccount/CreateAccount.jsx";
import Login from "./features/Login/Login";
import AboutUs from "./features/AboutUs/AboutUs";
import AllData from "./features/AllData/AllData";
import Profile from "./features/Profile/Profile";

import "./styles/main.scss";


import UserContext from "./Context/Context";

const userContextValue = {
  name: '', email: '', accessToken: '', refreshToken: '', role: '', accountNumber: '',
};

function App() {
  const [val, setVal] = React.useState(userContextValue);

  return (
    <UserContext.Provider value={[val, setVal]}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="create-account" element={<CreateAccount />} />
        <Route path="aboutus" element={<AboutUs />} />
        <Route path="deposit" element={<Deposit />} />
        <Route path="withdraw" element={<WithDraw />} />
        <Route path="alldata" element={<AllData />} /> 
        <Route path="profile" element={<Profile />} /> 
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
