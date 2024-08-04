import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loader from "./components/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";

const Login = lazy(() => import("./pages/Login"));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <div className="min-h-screen h-screen flex flex-col items-center justify-between bg-gray-100">
        <div className="container flex h-full items-center justify-center">
          <Switch>
            <Route path="/login" component={Login} />
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
