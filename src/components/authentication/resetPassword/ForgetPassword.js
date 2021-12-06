import { useState, useEffect } from "react";
import Loader from "../../shared/Loader";
import login_side_img from "../../../assets/images/login_side_img.png";
import logo from "../../../assets/images/logo_128_28.svg";
import likePic from "../../../assets/images/like.svg";
import { NavLink } from "react-router-dom";
import { ResetPasswordServices } from "../../../services/authentication/ResetPasswordServices";

const ForgetPassword = (props) => {
  document.title = "Red Belt Gym - Forget Password";

  const [forgetPass, setForgetPass] = useState(true);
  const [confirmSendMsg, setConfirmSendMsg] = useState(false);

  const [isLoader, setIsLoader] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [formErrors, setFormErrors] = useState({
    resetEmail: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const messageDelay = 5000; // ms

  const handleforgetEmailChange = (event) => {
    event.preventDefault();
    setResetEmail(event.target.value);
  };


  const emailValidation = () => {
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!resetEmail || regex.test(resetEmail) === false) {
      setFormErrors({
        ...formErrors,
        resetEmail: "Invalid email address",
      });
      return false;
    }
    return true;
  }

  /**
     * Auto hide success or error message
     */
  useEffect(() => {
    if (successMsg) setTimeout(() => { setSuccessMsg("") }, messageDelay)
    if (errorMsg) setTimeout(() => { setErrorMsg("") }, messageDelay)
    if (formErrors.resetEmail) setTimeout(() => {
      setFormErrors({
        ...formErrors,
        resetEmail: "",
      }) 
    }, messageDelay)
  }, [successMsg, errorMsg, formErrors])

  const handleResetSubmit = async (event) => {
    event.preventDefault();
    let formErrorsCopy = formErrors;
    let isError = false;
    /**
     * Check email field
     */
    if (!resetEmail) {
      isError = true;
      formErrorsCopy.resetEmail = "Please enter your registered email";
    } else {
      isError = false;
      formErrorsCopy.resetEmail = "";
    }

    /**
     * Validation
     */
    if (resetEmail && !emailValidation()) {
      isError = true;
      formErrorsCopy.resetEmail = "Invalid email address";
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
        resetEmail: formErrorsCopy.resetEmail,
      });
    } else {
      /**
       * Submit the form
       */
      setIsLoader(true);
      setFormErrors({
        ...formErrors,
        resetEmail: "",
      });

      let payload = {
        to: resetEmail,
      };
      let oprationMethod = "resetPasswordEmail";
      try {
        const result = await ResetPasswordServices[oprationMethod](payload)
        if (result) {
          console.log('result', result);
          setForgetPass(false);
          setConfirmSendMsg(true);
        } else {
          console.log('else result');
        }
      } catch (e) {
        // console.log("Error in reset password link", e)
        if (e.message) setErrorMsg(e.message);
      } finally {
        setIsLoader(false);
      }
    }
  };

  return (
    <div className="mainComponent">
      {isLoader ? <Loader /> : ""}
      <div className="authBody d-flex f-align-center login_outer">
        <div className="loginRightPart">
          <div className="login_head">
            <img src={logo} alt="" />
          </div>

          <form className="formBody forgotPassword" onSubmit={handleResetSubmit}>
            {forgetPass &&
              <>
                <h1 className="slim">Forgot Password?</h1>
                <p className="login_box_text bottomGap">
                  Please enter your registered email address, we will
                  send you instruction to reset your password.
                </p>
                {errorMsg &&
                  <div className="popupMessage error innerDrawerMessage">
                    <p>{errorMsg}</p>
                  </div>
                }
                <div className="formInputs">
                  <label>Email Address</label>

                  <div className={formErrors.resetEmail ? "inFormField errorField" : "inFormField"}>
                    <input
                      type="email"
                      name="email"
                      onChange={handleforgetEmailChange}
                      placeholder="Email"
                    />

                    {formErrors.resetEmail ? (
                      <div className="errorMsg">{formErrors.resetEmail}</div>
                    ) : null}
                  </div>
                </div>

                <div className="formInputs">
                  <button className="btn orangeBtn">Submit</button>
                </div>

              </>
            }
            {confirmSendMsg &&
              <div className="addConfirmation">
                <div className="confirmThumbsUp">
                  <img src={likePic} alt="" />
                </div>
                <h2> Congratulations!</h2>
                <p> You have successfully send the request to reset the password for your account <br />
                  Go to your Registered Email Id and follow instructions.</p>
              </div>
            }
            <div className="text-center"><NavLink className="link_to_login " to="/login">Return to Login</NavLink></div>
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

export default ForgetPassword;
