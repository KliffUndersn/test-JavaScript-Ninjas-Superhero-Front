import { Route, Redirect } from "react-router-dom";
import useAuth from '../../hooks/useAuth';


const PrivateRoute = ({ children, redirectTo = "/", ...routeProps }) => {
    const isLoggedIn = useAuth();
    return (
      <Route {...routeProps}>
        {isLoggedIn ? children : <Redirect to={redirectTo} />}
      </Route>
    );
};

export default PrivateRoute;
