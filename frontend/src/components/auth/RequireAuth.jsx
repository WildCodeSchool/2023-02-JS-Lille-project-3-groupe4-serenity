import PropTypes from "prop-types";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function RequireAuth({ allowedRoles }) {
  const { auth } = useAuth();
  const location = useLocation();

  if (auth?.role === allowedRoles) {
    return <Outlet />;
  }

  if (auth?.email) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
}

RequireAuth.propTypes = {
  allowedRoles: PropTypes.string.isRequired,
};

export default RequireAuth;
