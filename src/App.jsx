import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loader from "./components/Loader";
import { useAuth } from "./contexts/authContext";
import PrivateRoute from "./services/PrivateRoute.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Home = lazy(() => import("./pages/Home"));
const Settings = lazy(() => import("./pages/Settings"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <div className="min-h-screen flex flex-col bg-gray-100">
        {isLoggedIn && <Header />}
        <div className=" flex-grow flex items-center justify-center">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <PrivateRoute path="/home" component={Home} />
            <PrivateRoute path="/settings" component={Settings} />
            <Route component={NotFound} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Suspense>
  );
}

export default App;
