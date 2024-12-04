// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { useUser } from './UserContext';

// const ProtectedRoute = ({ element, roles, ...props }) => {
//   const { user } = useUser();

//   // If the user is not logged in or doesn't have the required role
//   if (!user || !roles.includes(user.role)) {
//     return <Navigate to="/" />;
//   }

//   // If user has the right role, render the element (i.e., the protected route)
//   return <Route {...props} element={element} />;
// };

// export default ProtectedRoute;
