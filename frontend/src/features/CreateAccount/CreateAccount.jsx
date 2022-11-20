import React from "react";
import LoginImage from "../../images/bank.svg";
import Card from "../../components/Card";
import Navbar from "../../components/Navbar";
import { useFormik } from "formik";
import axios from "axios";

const API_BACKEND_URL = process.env.BACKEND_EXPRESS || "http://localhost:8080/api";

export default function CreateAccount() {
  const [showSuccessMsg, setShowSuccessMsg] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      // Create an account
      createAccount(values);
    },
    validate: (values) => {
      let errors = {};
      if (!values.name) errors.name = "Name is required";
      if (!values.email) {
        errors.email = "Email is required";
      } else {
        if (
          !values.email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
        ) {
          errors.email = "Email address should be valid";
        }
      }
      if (!values.password) {
        errors.password = "Password is required";
      } else {
        if (values.password.length < 8)
          errors.password = "Password must be at least 8 characters";
      }

      if (!values.confirmPassword) {
        errors.confirmPassword = "Re-type password";
      } else {
        if (values.confirmPassword != values.password)
          errors.confirmPassword = "Password mismatch";
      }
      return errors;
    },
  });

  function createAccount({ name, email, password }) {
    axios
      .post(
        API_BACKEND_URL + "/create-account",
        JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      .then((resp) => {
        const data = resp.data;
        if (data === "User already in exists") {
          console.log(data);
        } else {
          setShowSuccessMsg(true);
        }
      });
  }
  return (
    <>
      <Navbar />
      <div className="row g-0 h-100">
        <div className="col-lg-6 text-center m-auto">
          <img src={LoginImage} alt="Bank" />
        </div>
        <div className="col-lg-6 mx-auto">
          <Card title="Sign up to create an account.">
            {showSuccessMsg && (
              <span className="text-success fw-bold">
                Your Account has been Created Successfully.
              </span>
            )}
            {!showSuccessMsg ? (
              <form onSubmit={formik.handleSubmit}>
                <>
                  Name
                  <br />
                  <input
                    type="input"
                    className="form-control"
                    id="name"
                    placeholder="Enter name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.name && (
                    <small className="text-danger mb-2">
                      {formik.errors.name}
                    </small>
                  )}
                  <br />
                  Email
                  <br />
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.email && (
                    <small className="text-danger mb-2">
                      {formik.errors.email}
                    </small>
                  )}
                  <br />
                  Password
                  <br />
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.password && (
                    <small className="text-danger mb-2">
                      {formik.errors.password}
                    </small>
                  )}
                  <br />
                  Confirm Password
                  <br />
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Confirm password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                  />
                   {formik.errors.confirmPassword && (
                    <small className="text-danger mb-2">
                      {formik.errors.confirmPassword}
                    </small>
                  )}
                  <br />
                  <button type="submit" className="btn btn-primary w-100">
                    Create Account
                  </button>
                </>
              </form>
            ) : (
              <>
                <button
                  type="submit"
                  className="btn btn-light mt-4"
                  onClick={() => {
                    formik.handleReset();
                    setShowSuccessMsg(false);
                  }}
                >
                  Add another account
                </button>
              </>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}
