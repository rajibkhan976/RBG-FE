import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./auth/Login";
import Dashboard from "./dashboard";

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
