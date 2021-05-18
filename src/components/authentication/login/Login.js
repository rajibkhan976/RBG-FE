import { useState, useEffect } from "react";

const Login = (props) => {
  document.title = "Login";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });
  const [loader, setLoader] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault(); 
    console.log('Event handle', event)
  }
  
  return (
    <div className="mainComponent">
      <div className="authBody d-flex f-align-center f-justify-center">
        <form className="formBody" onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div>
            <label>Email</label>
            <input type="text" name="email" />
          </div>
          <div>
            <label>Password</label>
            <input type="password" name="password" />
          </div>
          <button className="btn btn-primary btn-lg">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
