import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Route, useNavigate} from 'react-router-dom';

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
 const Navigate=useNavigate();
 
  return (
    <Fragment>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              return <Navigate to="/login" />;
            }

            if (isAdmin === true && user.role !== "admin") {
              return <Navigate to="/login" />;
            }

            return <Component {...props} />;
          }}
        />
      )}
    </Fragment>
  );
};

export default ProtectedRoute;
