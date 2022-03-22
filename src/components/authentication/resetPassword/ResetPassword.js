import { useState, useEffect } from "react";
import Loader from "../../shared/Loader";
import likePic from "../../../assets/images/like.svg";
import logo from "../../../assets/images/logo_128_28.svg";
import tick from "../../../assets/images/tick.svg";
import { NavLink, useLocation } from "react-router-dom";
import { ResetPasswordServices } from "../../../services/authentication/ResetPasswordServices";

const ResetPassword = (props) => {
  document.title = "Red Belt Gym - Reset Password";
  const [isLoader, setIsLoader] = useState(false);
  const [resetPass, setResetPass] = useState(true);
  const [confirmPassMsg, setConfirmPassMsg] = useState(false);

  const [passwordReset, setPasswordReset] = useState("");
  const [confirmPasswordReset, setConfirmPasswordReset] = useState("");
  const [formErrors, setFormErrors] = useState({
    passwordError: "",
    confirmPasswordError: "",
  });
  const [charCount, setCharCount] = useState("");
  const [charType, setCharType] = useState("");
  const [matchPassword, setMatchPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const messageDelay = 5000; // ms
  const pathURL = useLocation().pathname;

  /**
   * Auto hide success or error message
   */
  useEffect(() => {
    if (successMsg) setTimeout(() => { setSuccessMsg("") }, messageDelay);
    if (errorMsg) setTimeout(() => { setErrorMsg("") }, messageDelay);
    if (formErrors.passwordError) setTimeout(() => {
      setFormErrors({
        ...formErrors,
        passwordError: ""
      })
    }, messageDelay);
    if (formErrors.confirmPasswordError) setTimeout(() => {
      setFormErrors({
        ...formErrors,
        confirmPasswordError: "",
      })
    }, messageDelay);
  }, [successMsg, errorMsg, formErrors])


  const validateField = (type = null) => {
    //Reset form errors
    setFormErrors({
      ...formErrors,
      passwordError: "",
      confirmPasswordError: "",
    });
    let passwordValid;
    passwordValid = passwordReset.match(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{4,}$/);
    if (passwordReset.length > 0) {
      if (passwordReset.length >= 8) {
        setCharCount(true);
        console.log("charcount valid")
      } else {
        setCharCount(false);
        console.log("charcount not valid")
      };
      if (!passwordValid) {
        setCharType(false);
        console.log("chartype not valid")
      } else {
        setCharType(true);
        console.log("chartype valid")
      }
    }
    if (confirmPasswordReset.length > 0) {
      if (confirmPasswordReset === passwordReset) {
        setMatchPassword(true);
        console.log("a", confirmPasswordReset, "b", passwordReset)
      } else {
        setMatchPassword(false);
        console.log("c", confirmPasswordReset, "d", passwordReset)
      }
    } else {
      setMatchPassword(false);
      console.log("e", confirmPasswordReset, "f", passwordReset)
    }

    //if both the password not present
    if(!passwordReset.length && !confirmPasswordReset.length) {
      console.log('both the pass not present');
      setCharCount("");
      setCharType("");
      setMatchPassword("");
    }


  }
  const handlePasswordChange = (event) => {
    event.preventDefault();
    setPasswordReset(event.target.value);
  };
  const handleConfirmPasswordChange = (event) => {
    event.preventDefault();
    setConfirmPasswordReset(event.target.value);

  };

  const resetPassSubmit = async (event) => {
    event.preventDefault();
    let formErrorsCopy = formErrors;
    let isError = false;
    if (!passwordReset) {
      isError = true;
      formErrorsCopy.passwordError = "Please fillup the new password";
    } else {
      isError = false;
      formErrorsCopy.passwordError = "";
    }

    if (!confirmPasswordReset) {
      isError = true;
      formErrorsCopy.confirmPasswordError = "Please fillup the confirm password";
    } else {
      isError = false;
      formErrorsCopy.confirmPasswordError = "";
    }

    //Password validation
    isError = !(charType && charCount && matchPassword);

    if (isError) {
      /**
       * Set form errors
       */
      setFormErrors({
        ...formErrors,
        passwordError: formErrorsCopy.passwordError,
        confirmPasswordError: formErrorsCopy.confirmPasswordError,
      });
      console.log('moon light');
    } else {
      /**
       * Submit the form
       */
      setIsLoader(true);
      setFormErrors({
        ...formErrors,
        passwordError: "",
        confirmPasswordError: "",
      });
      console.log('sun light');
      let payload = {
        token: pathURL.substring(pathURL.lastIndexOf('/') + 1),
        newPassword: passwordReset,
        confirmPassword: confirmPasswordReset
      };
      let oprationMethod = "resetPassword";
      try {
        const result = await ResetPasswordServices[oprationMethod](payload)
        if (result) {
          console.log('result', result);
          setResetPass(false);
          setConfirmPassMsg(true);
        } else {
          console.log('else result');
        }
      } catch (e) {
        setIsLoader(false);
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
        <div className="loginRightPart reset">
          <div className="login_head">

            <img src={logo} alt="" />
          </div>

          <form className="formBody forgotPassword">
            {resetPass &&
              <>
                <h1 className="slim">Reset Password</h1>
                <p className="login_box_text">
                  Hey! Sit back relaxed. You are almost there to<br />
                  reset your account password
                </p>
                {errorMsg &&
                  <div className="popupMessage error innerDrawerMessage">
                    <p>{errorMsg}</p>
                  </div>
                }
                <ul className="validationParam">
                  <li className={charType === true ? "done" : charType === false ? "notdone" : "normal"}>
                    <span className="tick"><img src={tick} alt="" /></span>
                    <span className="exClam">i</span>Password is containing @/#/!, numeric, character , one upper case, one lower case
                  </li>
                  <li className={charCount === true ? "done" : charCount === false ? "notdone" : "normal"}>
                    <span className="tick"><img src={tick} alt="" /></span>
                    <span className="exClam">i</span> At least 8 char should be there
                  </li>
                  <li className={matchPassword === true ? "done" : matchPassword === false ? "notdone" : "normal"}>
                    <span className="tick"><img src={tick} alt="" /></span>
                    <span className="exClam">i</span>New Password and Confirm Password Should match.
                  </li>

                </ul>
                <div className="passwordProgressor">
                  <div className={

                    ((passwordReset.length >= 1 && (charType === true && charCount === false && matchPassword === false)) ||
                      (passwordReset.length >= 1 && (charType === false && charCount === true && matchPassword === false))) ? "pass_indicator weak" :
                      (passwordReset.length >= 1 && (charType === true && charCount === true && matchPassword === false)) ? "pass_indicator medium" :
                        (passwordReset.length >= 1 && (charType === true && charCount === true && matchPassword === true)) ? "pass_indicator strong" :
                          (passwordReset.length >= 1) ? "pass_indicator started" : "pass_indicator"}></div>
                  <span>
                    {

                      ((passwordReset.length >= 1 && (charType === true && charCount === false && matchPassword === false)) ||
                        (passwordReset.length >= 1 && (charType === false && charCount === true && matchPassword === false))) ? "30%" :
                        (passwordReset.length >= 1 && (charType === true && charCount === true && matchPassword === false)) ? "60%" :
                          (passwordReset.length >= 1 && (charType === true && charCount === true && matchPassword === true)) ? "100%" :
                            (passwordReset.length >= 1) ? "8%" : "0%"}
                  </span>

                </div>


                <div className="formInputs">

                  <label>Enter New Password</label>
                  <div className={formErrors.passwordError ? "inFormField errorField" : "inFormField"}>
                    <input
                      type="password"
                      name="password"
                      onChange={handlePasswordChange}
                      onKeyUp={() => validateField("password")}
                      placeholder="Password"
                    />
                    {formErrors.passwordError ? (
                      <div className="errorMsg">{formErrors.passwordError}</div>
                    ) : null}
                  </div>
                </div>
                <div className="formInputs">
                  <label>Confirm New Password</label>

                  <div className={formErrors.confirmPasswordError ? "inFormField errorField" : "inFormField"}>
                    <input
                      type="password"
                      name="password"
                      onChange={handleConfirmPasswordChange}
                      onKeyUp={() => validateField("password")}
                      placeholder="Password"
                    />
                    {formErrors.confirmPasswordError ? (
                      <div className="errorMsg">{formErrors.confirmPasswordError}</div>
                    ) : null}
                  </div>
                </div>

                <div className="formInputs">
                  <button className="btn orangeBtn" onClick={resetPassSubmit}>Submit</button>
                </div>
              </>
            }
            {confirmPassMsg &&
              <div className="addConfirmation">
                <div className="confirmThumbsUp">
                  <img src={likePic} alt="" />
                </div>
                <h2> Congratulations!</h2>
                <p> You have successfully updated <br />
                  your password.</p>
              </div>
            }
            <div className="text-center"><NavLink className="link_to_login " to="/login">Return to Login</NavLink></div>

          </form>

          <div className="login_footer">
            &copy; 2022 Red Belt Gym, Inc. All rights reserved
          </div>
        </div>

      </div>
    </div>
  );
};

export default ResetPassword;
