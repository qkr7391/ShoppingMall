// //rafce
// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";

// const NotAuthRoutes = ({ isAuth }) => {
// 	return isAuth ? <Navigate to={"/"} /> : <Outlet />;
// };

// export default NotAuthRoutes;

// NotAuthRoutes.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const NotAuthRoutes = ({ isAuth }) => {
	return isAuth ? <Navigate to={"/"} /> : <Outlet />;
};

NotAuthRoutes.propTypes = {
	isAuth: PropTypes.bool.isRequired,
};

export default NotAuthRoutes;
