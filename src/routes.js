import React, { useEffect, useState } from "react";
import { Switch } from "react-router-dom";

import Login from "./components/authentication/login/Login";
import Dashboard from './components/ComponentsRouting'

const Routes = () => {
  const [logState, setLogState] = useState(true);

  useEffect(() => {});

  return (
    <React.Suspense fallback={<div />}>
      <Switch>
        {logState ? (
          <Dashboard />
        ) : (
          <Login logState={logState} setLogState={setLogState} />
        )}
      </Switch>
    </React.Suspense>
  );
};

export default Routes;