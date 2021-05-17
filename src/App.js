import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./components/authentication/login/Login";
import Dashboard from "./components/";

import "./App.css";

function App() {
  const [logState, setLogState] = useState(true);

  useEffect(() => {
    
  });

  return (
    <div className="App">
      <Router>
        {logState ? (
          <Dashboard />
        ) : (
          <Login logState={logState} setLogState={setLogState} />
        )}
      </Router>
    </div>
  );
}

export default App;
