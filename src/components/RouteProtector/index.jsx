import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuthState } from "../../store/selectors";

const RouteProtector = () => {
  const loggedIn = useSelector(getAuthState);

  if (!loggedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
};

export default RouteProtector;