import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link, NavLink } from 'react-router-dom';
import LoginImage from "../images/logo.svg";


export default function Navbar() {
  const [isLoggedIn, setisLoggedIn] = React.useState(true);
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
          <a className="navbar-brand d-flex align-items-center" href ="/">
          <img src={LoginImage} alt="Bank" height={40} />
            <h6 className="ml-3">Smart Bank</h6> </a>
              <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse d-flex align-item-center justify-content-between" id="navbarNav">
              <ul className="navbar-nav header">
                <li className="nav-item">
                  <NavLink className={`nav-link `} to="/aboutus" data-toggle="tooltip" data-placement="bottom" title="This is the main page">About Us</NavLink>
                </li>
             
                {isLoggedIn && (
                <>
                  <li className="nav-item">
                    <NavLink className={`nav-link`} role="button" to="/deposit" data-toggle="tooltip" data-placement="bottom" title="You can deposit your money here.">Deposit</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/withdraw" role="button" data-toggle="tooltip" data-placement="bottom" title="You can withdraw your money.">Withdraw</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/alldata" role="button" data-toggle="tooltip" data-placement="bottom" title="Details of the data.">AllData</NavLink>
                  </li>
                
                </>
                )}
                {!isLoggedIn && (
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/create-account" role="button" data-toggle="tooltip" data-placement="bottom" title="Create Account">Create Account</NavLink>
                  </li>
                )}
              </ul>
              {isLoggedIn && (
                <> <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  Logged in as [Shuveksha]
                </Dropdown.Toggle>
          
                <Dropdown.Menu>
                  <Dropdown.Item href="#/profile">Profile</Dropdown.Item>
                  <Dropdown.Item href="#/logout">Log Out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
                </>
              )}
            </div>

        </nav>
      </>
    );
}
