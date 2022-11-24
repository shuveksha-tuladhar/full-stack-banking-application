import React from "react";
import LoginImage from "../../images/bank.svg";
import Card from "../../components/Card";
import Navbar from "../../components/Navbar";
import { useFormik } from "formik";
import axios from "axios";
import { Toast } from "react-bootstrap";

import { UserContext, API_BACKEND_URL } from "../../Context/Context";

export default function CreateAccount() {
  const [showToast, setShowToast] = React.useState(false);
  const [errorToast, setErrorToast] = React.useState(false);
  const [ctxValue, setCtxValue] = React.useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      oldpassword: "",
      newpassword: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      updateAccount(values);
    },
    validate: (values) => {
      let errors = {};
      if (!values.oldpassword) errors.oldpassword = "Old Password is required";
      if (!values.newpassword) {
        errors.newpassword = "New Password is required";
      } else {
        if (values.newpassword.length < 8)
          errors.newpassword = "Password must be at least 8 characters";
      }
      if (!values.confirmPassword) {
        errors.confirmPassword = "Re-type password";
      } else {
        if (values.confirmPassword != values.newpassword)
          errors.confirmPassword = "Password mismatch";
      }

      return errors;
    },
  });

  function updateAccount({ oldpassword, newpassword, confirmPassword }) {
    axios
      .post(
        API_BACKEND_URL + "/api/update-password",
        JSON.stringify({
          oldpassword: oldpassword,
          newpassword: newpassword,
          confirmPassword: confirmPassword,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + ctxValue.accessToken
          },
        }
      )
      .then((resp) => {
        const data = resp.data;
        if (data === "Password updated") {
          setShowToast(true);
          setErrorToast(false);
        } else {
          setErrorToast(true);
          setShowToast(false);
        }
      });
  }
  return (
    <>
      <Navbar />
      <div className="row g-0 h-100">
        {ctxValue.username && ctxValue.accessToken && (
          <>
            <div className="col-lg-6 text-center m-auto">
              <img src={LoginImage} alt="Bank" />
            </div>
            <div className="col-lg-6 mx-auto">
              <Card title="Profile">
                <Toast
                  bg="success"
                  onClose={() => setShowToast(false)}
                  show={showToast}
                  delay={3000}
                  autohide
                >
                  <Toast.Body className="text-white">
                    Your Password has been updated Successfully.
                  </Toast.Body>
                </Toast>
                <Toast
                  bg="danger"
                  onClose={() => setErrorToast(false)}
                  show={errorToast}
                  delay={3000}
                  autohide
                >
                  <Toast.Body className="text-white">
                    Error updating a password.
                  </Toast.Body>
                </Toast>
                <form onSubmit={formik.handleSubmit}>
                  <>
                    Old Password
                    <br />
                    <input
                      type="password"
                      className="form-control"
                      id="oldpassword"
                      placeholder="Old Password"
                      value={formik.values.oldpassword}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.oldpassword && (
                      <small className="text-danger mb-2">
                        {formik.errors.oldpassword}
                      </small>
                    )}
                    <br />
                    New Password
                    <br />
                    <input
                      type="password"
                      className="form-control"
                      id="newpassword"
                      placeholder="New Password"
                      value={formik.values.newpassword}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.newpassword && (
                      <small className="text-danger mb-2">
                        {formik.errors.newpassword}
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
                      Update Password
                    </button>
                  </>
                </form>
              </Card>
            </div>
          </>
        )}
         {!(ctxValue.username && ctxValue.accessToken) && (
          <span className="text-secondary">
            User must be logged in to view this profile.
          </span>
        )}
      </div>
    </>
  );
}
