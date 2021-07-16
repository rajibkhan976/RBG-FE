// import { JsonWebTokenError } from "jsonwebtoken";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthActions from "../../../actions/AuthActions";

const Login = (props) => {
  document.title = "Login";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.auth.message ? state.auth.message.error : null);

  const handleEmailChange = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  const validateField = (type = null) => {
    let emailValid = props.emailValid;
    let passwordValid = props.passwordValid;
    emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    passwordValid = password.length >= 6;
    if (type === "email" && email.length) {
      setFormErrors({
        ...formErrors,
        email: !emailValid ? "Invalid email address" : "",
      });
    } else if (type === "password" && password.length) {
      setFormErrors({
        ...formErrors,
        password: !passwordValid ? "Please enter a valid password." : "",
      });
    } else {
      setFormErrors({
        ...formErrors,
        email: "",
        password: "",
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let formErrorsCopy = formErrors;
    let isError = false;

    /**
     * Check email field
     */
    if (!email) {
      isError = true;
      formErrorsCopy.email = "Please fillup the email";
    }
    /**
     * Check password field
     */
    if (!password) {
      isError = true;
      formErrorsCopy.password = "Please fillup the password";
    }

    /**
     * Check the erros flag
     */
    if (isError) {
      /**
       * Set form errors
       */
      setFormErrors({
        ...formErrors,
        email: formErrorsCopy.email,
        password: formErrorsCopy.password,
      });
    } else {
      /**
       * Submit the registration form
       */
      setLoader(true);
      setFormErrors({
        ...formErrors,
        email: "",
        password: "",
      });
      dispatch(AuthActions.login(email, password));
    }
  };

  return (
    <div className="mainComponent">
      <div className="authBody d-flex f-align-center f-justify-center">
        <figure className="loginLogo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="128"
            height="28"
            viewBox="0 0 128 28"
            className="logoRBG"
          >
            <text className="a" transform="translate(0 21)">
              <tspan x="0" y="0">
                RedBelt
              </tspan>
              <tspan className="b" y="0">
                Gym
              </tspan>
            </text>
          </svg>
        </figure>
        <form className="formBody" onSubmit={handleSubmit}>
          {errorMessage ? (
            <div className="errorLogin text-center">{errorMessage}</div>
          ) : null}
          <h1>Login</h1>
          <div className="formInputs">
            <label>Email</label>

            <div className="inFormField">
              <input
                type="text"
                name="email"
                onChange={handleEmailChange}
                onBlur={() => validateField("email")}
                placeholder="Email"
              />
            </div>
          </div>
          <div className="formInputs">
            <label>Password</label>

            <div className="inFormField">
              <input
                type="password"
                name="password"
                onChange={handlePasswordChange}
                onBlur={() => validateField("password")}
                placeholder="Password"
              />
            </div>
          </div>
          <div className="formInputs">
            <button className="btn btn-dBlue">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
