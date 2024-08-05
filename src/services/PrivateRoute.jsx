import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useAuth();
  console.log("is logged in", isLoggedIn);

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
