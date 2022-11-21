import React, {useEffect, useContext, useState} from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";

import BankImage from "../../images/bank.svg";
import Card from "../../components/Card";
import Navbar from "../../components/Navbar";
import { UserContext, API_BACKEND_URL } from "../../Context/Context";

export default function Login() {
    const navigate = useNavigate();

    const [validationMsg, setValidationMsg] = useState(false);
    const [ctxValue, setCtxValue] = useContext(UserContext);
    const [redirection, setRedirection] = useState(false);

    useEffect(() => {
      if (!!ctxValue.username && !!ctxValue.name && !!ctxValue.role && !!ctxValue.accessToken && !!ctxValue.refreshToken)
       setRedirection(true);
      else
        setRedirection(false);
    }, [JSON.stringify(ctxValue)])

    const formik = useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      onSubmit: values => {
        loginUser(values);
      },
      validate: values => {
        let errors = {};
        if (!values.email) {
          errors.email = "Email is required";
        } else {
          if (
            !values.email.match(
              /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
          ) {
            errors.email = "Username should be an email";
          }
        }
        if (!values.password) errors.password = "Password is required";
        return errors;
      }
    })

    if (ctxValue.username && ctxValue.name && ctxValue.role && ctxValue.accessToken && ctxValue.refreshToken) setRedirection(true);

    const loginUser = ({email, password}) => { 
      // Set the logged in to true for a user
      axios.post(API_BACKEND_URL + "/login", {
          username: email,
          password: password,
      })
      .then(resp => {
        const data = resp.data;
        console.log(data);
        if(data === "Username or password incorrect") {
          setValidationMsg(true);
        } 
        setCtxValue({
          username: data.user.email,
          name: data.user.name,
          role: data.user.role,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken
        });

        navigate("/alldata");

      });
  }
  
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
             {validationMsg && (
              <small className="text-danger mb-3">
                Email/Password is incorrect.
              </small>
             )}
              <form onSubmit={formik.handleSubmit}>
                <>
                  Email
                  <br />
                  <input
                    type="input"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                  {formik.errors.email && (
                    <small className="text-danger mb-3">{formik.errors.email}</small>
                  )}
                  <br />
                  Password
                  <br />
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  {formik.errors.password && (
                    <small className="text-danger mb-3">{formik.errors.password}</small>
                  )}
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
                </h6>
              </>
            </Card>
            {redirection && <Navigate to="/alldata" />}
          </div>
        </div>
      </>
    );
  }
  