import React from "react";
import { Link } from "react-router-dom";

import BankImage from "../../images/bank.svg";
import Card from "../../components/Card";
import Navbar from "../../components/Navbar";

export default function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
  
    return (
      <>
        <Navbar />
        <div className="row g-0 h-100">
          <div className="col-lg-6 text-center m-auto">
            <h1 className="text-primary">Welcome to Smart Bank</h1>
            <img src={BankImage} alt="Bank" />
          </div>
          <div className="col-lg-6 mx-auto">
            <Card title="Sign on to manage your account">
             
                <small className="text-danger mb-3">
                  Email/Password is incorrect.
                </small>
              <form onSubmit={() => console.log('Submit here')}>
                <>
                  Email
                  <br />
                  <input
                    type="input"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                  />
                  {/* {validationMsg.email && ( */}
                    <small className="text-danger mb-3">Email is required.</small>
                  {/* )} */}
                  <br />
                  Password
                  <br />
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                  />
                  {/* {validationMsg.password && ( */}
                    <small className="text-danger mb-3">
                      Password is required.
                    </small>
                  {/* )} */}
                  <br />
                  <button type="submit" className="btn btn-primary w-100">
                    Login
                  </button>
                </>
              </form>
              <>
                <h6 className="text-center mt-4">
                  Don't have an account? Click here to
                  <Link to="/create-account" className="d-block">
                    Create an account
                  </Link>
                  <p>Or using [google] [facebook]</p>
                </h6>
              </>
            </Card>
            {/* {redirectToMain && <Navigate to="home" />} */}
          </div>
        </div>
      </>
    );
  }
  