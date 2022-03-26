import { lazy, Suspense } from "react";
import { Switch } from "react-router-dom";

import PrivateRoute from "../shared/components/PrivateRoute";
import PublicRoute from "../shared/components/PublicRoute";

const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage/RegisterPage"));
const MainPage = lazy(() => import("../pages/MainPage/MainPage"));
const RedactorPage = lazy(() => import("../pages/RedactorPage/RedactorPage"));
const SuperheroPage = lazy(() =>
  import("../pages/SuperheroPage/SuperheroPage")
);
const Navbar = lazy(() => import("../client/Navbar/Navbar"));

const Routes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <PublicRoute restricted exact path="/" redirectTo="/">
          <Navbar />
          {/* <SuperheroPage /> */}
          {/* <MainPage /> */}
          <RedactorPage/>
        </PublicRoute>
        <PublicRoute restricted exact path="/login" redirectTo="/">
          <Navbar />
          <LoginPage />
        </PublicRoute>
        <PublicRoute restricted exact path="/register" redirectTo="/">
          <Navbar />
          <RegisterPage />
        </PublicRoute>
        <PrivateRoute exact path="/edit" redirectTo="/login">
          <Navbar />
          <RedactorPage />
        </PrivateRoute>
      </Switch>
    </Suspense>
  );
};

export default Routes;
