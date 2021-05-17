import { useEffect } from "react";

function Login(props) {
  const changeLogState = () => {
    props.setLogState(!props.logState);
  };
  useEffect(() => {});
  return (
    <div className="mainComponent">
      <div className="authBody d-flex f-align-center f-justify-center">
        Login
        <button onClick={changeLogState}>Login</button>
      </div>
    </div>
  );
}

export default Login;
