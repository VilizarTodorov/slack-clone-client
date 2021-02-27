import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { CREATE_TEAM, HOME, LOGIN, REGISTER, TEAM } from "../../constants/routes";

const Home = React.lazy(() => import("../Home"));
const Register = React.lazy(() => import("../Register"));
const Login = React.lazy(() => import("../Login"));
const CreateTeam = React.lazy(() => import("../CreateTeam"));
const Team = React.lazy(() => import("../Team"));

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
        <Route exact path={CREATE_TEAM}>
          <CreateTeam></CreateTeam>
        </Route>
        <Route exact path={TEAM}>
          <Team></Team>
        </Route>
      </Switch>
    </Suspense>
  );
};

export default Routes;
