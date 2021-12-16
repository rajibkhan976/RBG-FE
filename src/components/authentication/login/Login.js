// import { JsonWebTokenError } from "jsonwebtoken";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthActions from "../../../actions/AuthActions";
import Loader from "../../shared/Loader";
import login_side_img from "../../../assets/images/login_side_img.png";
import logo from "../../../assets/images/logo_128_28.svg";
import {
  NavLink
} from "react-router-dom";



const Login = (props) => {
  document.title = "Red Belt Gym - Login";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });
  const [loader, setLoader] = useState(false);
  const [hidePss, setHidePass] = useState(true);

  const togglePass = () => {
    setHidePass(!hidePss);
  };

  const dispatch = useDispatch();
  const errorMessage = useSelector((state) =>
    // console.log('auth store', state.auth)
    state.auth.message ? state.auth.message : null
  );

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
    passwordValid = password.length >= 1;
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
    } else {
      isError = false;
      formErrorsCopy.email = "";
    }
    /**
     * Check password field
     */
    if (!password) {
      isError = true;
      formErrorsCopy.password = "Please fillup the password";
    } else {
      isError = false;
      formErrorsCopy.password = "";
    }

    /**
     * Validation
     */
    if (formErrorsCopy.email || formErrorsCopy.password) {
      isError = true;
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
      dispatch(AuthActions.login(email, password))
        .then(() => {
          // console.log('then');
        })
        .catch(() => {
          // console.log('catch');
        })
        .finally(() => {
          setLoader(false);
          // console.log('dispatch finished');
        });
    }
  };

  return (
    <div className="mainComponent">
      {loader ? <Loader /> : ""}
      <div className="authBody d-flex f-align-center login_outer">
        <div className="loginRightPart">
          <div className="login_head">
            {/* <figure className="loginLogo">
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
            </figure> */}
            <img src={logo} alt="" />
          </div>

          <form className="formBody" onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            {/* <p className="login_box_text">
              Please login below to access RedBeltGym.
            </p> */}
            {errorMessage ? (
              <div className="errorLogin text-center">{errorMessage}</div>
            ) : null}
            <div className="formInputs">
              <label>Email</label>

              <div
                className={
                  formErrors.email ? "inFormField errorField" : "inFormField"
                }
              >
                <input
                  type="email"
                  name="email"
                  onChange={handleEmailChange}
                  onBlur={() => validateField("email")}
                  placeholder="Email"
                />
                {formErrors.email ? (
                  <div className="errorMsg">{formErrors.email}</div>
                ) : null}
              </div>
            </div>
            <div className="formInputs">
              <label>Password</label>
              <NavLink className="login_forget_link" to="/forgot-password">Forgot?</NavLink>
              <div
                className={
                  formErrors.password ? "inFormField errorField" : "inFormField"
                }
              >
                <input
                  type={hidePss ? "password" : "text"}
                  name="password"
                  onChange={handlePasswordChange}
                  onBlur={() => validateField("password")}
                  placeholder="Password"
                  className="loginPassField"
                />
                <button type="button" className={hidePss ? "hidePass" : "hidePass show"} onClick={togglePass}></button>
                {formErrors.password ? (
                  <div className="errorMsg">{formErrors.password}</div>
                ) : null}
              </div>
            </div>
            {/* ......... implemented later .................... */}
            {/* <div className="formInputs remember">
            <label>
              <div class="customCheckbox"><input type="checkbox" name="categories" value=""/><span></span></div>
              Remember me
            </label>     
          </div> */}
            {/* ;,.,.,.,.,.,.,.,.,.,*/}
            <div className="formInputs">
              <button className="btn orangeBtn">Sign In</button>
            </div>
          </form>
          <div className="login_footer">
            &copy; 2021 Red Belt Gym, Inc. All rights reserved
          </div>
        </div>
        <div className="loginLeftPart">
          <img src={login_side_img} alt="" />
          <span className="overlay"></span>
          <div className="login_left_text">
            <h2>Black Friday 2021 🎉</h2>
            <p>Enjoy 30% off our Premium Plans for a limited time only<br />
              <button className="link_btn">Get This Deal NOW</button></p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
