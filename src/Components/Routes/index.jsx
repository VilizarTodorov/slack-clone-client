import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { HOME, LOGIN, REGISTER } from "../../constants/routes";

const Home = React.lazy(() => import("../Home"));
const Register = React.lazy(() => import("../Register"));
const Login = React.lazy(() => import("../Login"));

const Routes = () => {
  return (
    <Suspense fallback={`...Loading`}>
      <Switch>
        <Route exact path={HOME}>
          <Home></Home>
        </Route>
        <Route exact path={REGISTER}>
          <Register></Register>
        </Route>
        <Route exact path={LOGIN}>
          <Login></Login>
        </Route>
      </Switch>
    </Suspense>
  );
};

export default Routes;
