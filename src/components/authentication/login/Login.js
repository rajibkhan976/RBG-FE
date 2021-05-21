import { useState, useEffect } from "react";
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

  const handleEmailChange = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Event handle', email, password);
    dispatch(AuthActions.login(email, password))
  }

  return (
    <div className="mainComponent">
      <div className="authBody d-flex f-align-center f-justify-center">
        <form className="formBody" onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div>
            <label>Email</label>
            <input type="text" name="email" onChange={handleEmailChange} />
          </div>
          <div>
            <label>Password</label>
            <input type="password" name="password" onChange={handlePasswordChange} />
          </div>
          <button className="btn btn-primary btn-lg">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
