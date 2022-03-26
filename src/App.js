import Routes from "./navigation/Routes";
import { useDispatch, useSelector } from "react-redux";

import authOperations from "./redux/auth/auth-operations";

import { useEffect } from "react";
import { fetchToken } from "./redux/auth/auth-selectors";

function App() {
  const dispatch = useDispatch();
  const isLoggin = useSelector(fetchToken);

  useEffect(() => {
    isLoggin && dispatch(authOperations.CheckedIsLoginCurrentUser());
  }, []);


  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
