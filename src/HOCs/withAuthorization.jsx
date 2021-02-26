import React, { Fragment, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { HOME, LOGIN } from "../constants/routes";

const withAuthorization = (condition) => (Component) => {
  const WithAuthorization = () => {
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
      if (!condition({ token: localStorage.getItem("token"), refreshToken: localStorage.getItem("refreshToken") })) {
        if (location.pathname === "/sign-in" || location.pathname === "/sign-up" || location.pathname === "/admin") {
          history.push(HOME);
          return;
        }
        history.push(LOGIN, { from: location.pathname });
        return;
      }
    }, [history, location.pathname]);

    return (
      <Fragment>
        {condition({ token: localStorage.getItem("token"), refreshToken: localStorage.getItem("refreshToken") }) ? (
          <Component></Component>
        ) : null}
      </Fragment>
    );
  };

  return WithAuthorization;
};

export default withAuthorization;
