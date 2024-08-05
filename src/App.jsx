import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loader from "./components/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import { AuthProvider, useAuth } from "./contexts/authContext";
import PrivateRoute from "./services/PrivateRoute.jsx";
import Header from "./components/Header.jsx";

const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Home = lazy(() => import("./pages/Home"));
const Settings = lazy(() => import("./pages/Settings"));

function App() {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <div className="min-h-screen  flex flex-col items-center justify-between bg-gray-100">
        {isLoggedIn && <Header />}
        <div className="container flex h-full items-center justify-center">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <PrivateRoute path="/home" component={Home} />
            <PrivateRoute path="/settings" component={Settings} />
          </Switch>
        </div>
        <footer className="bottom-0 text-center py-4 bg-gray-100 mt-4">
          <FontAwesomeIcon icon={faCopyright} /> All Rights reserved to{" "}
          <a href="mailto:adityarastogi1801@gmail.com">
            adityarastogi1801@gmail.com
          </a>
        </footer>
      </div>
    </Suspense>
  );
}

export default App;
