import React from "react";
import LoginImage from "../../images/bank.svg";
import Card from "../../components/Card";
import Navbar from "../../components/Navbar";

export default function CreateAccount() {

  const [showSuccessMsg, setShowSuccessMsg] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const [validationMsg, setValidationMsg] = React.useState({
    name: false,
    email: false,
    password: false,
    passwordLength: false,
  });

  function clearForm() {
    setName("");
    setEmail("");
    setPassword("");
    setShowSuccessMsg(false);
  }

   const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password && name && password.length >=8) {
      setValidationMsg({ name: false, email: false, password: false, passwordLength: false });
      console.log("complete");
      setShowSuccessMsg(true);
    } else {
      setShowSuccessMsg(false);
      if (!name && !email && !password) {
        setValidationMsg({ name: true, email: true, password: true, passwordLength: false });
      } else if (!name) {
        setValidationMsg({ name: true, email: false, password: false, passwordLength: false });
      } else if (!email) {
        setValidationMsg({ name: false, email: true, password: false, passwordLength: false });
      } else if (!password) {
        setValidationMsg({ name: false, email: false, password: true, passwordLength: false });
      } else if (password && password.length < 8) {
        setValidationMsg({ name: false, email: false, password: false, passwordLength: true });
      }
    }
  };
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
              <form onSubmit={handleSubmit}>
                <>
                  Name
                  <br />
                  <input
                    type="input"
                    className="form-control"
                    id="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.currentTarget.value)}
                  />
                  {validationMsg.name && (
                    <small className="text-danger mb-2">
                      Name is required.
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
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                  />
                  {validationMsg.email && (
                    <small className="text-danger mb-2">
                      Email is required.
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
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                  />
                  {validationMsg.password && (
                    <small className="text-danger mb-2">
                      Password is required.
                    </small>
                  )}
                  {validationMsg.passwordLength && (
                    <small className="text-danger mb-2">
                      Password must be at least 8 characters long.
                    </small>
                  )}
                  <br />
                  Confirm Password
                  <br />
                  <input
                    type="password"
                    className="form-control"
                    id="confirm-password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                  />
                  <br/>
                  <button
                    type="submit"
                    disabled={!name && !password && !email}
                    className="btn btn-primary w-100"
                  >
                    Create Account
                  </button>
                </>
              </form>
            ) : (
              <>
                <button
                  type="submit"
                  className="btn btn-light mt-4"
                  onClick={clearForm}
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
