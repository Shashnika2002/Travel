import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Store } from "../../Store"; // Importing the context to access global state

// The AdminRoute component is a wrapper to protect routes accessible only to admins.
export default function AdminRoute({ children }) {
  // Access global state from the Store context
  const { state } = useContext(Store);
  const { userInfo } = state;

  // Conditionally render children if the user is an admin; otherwise, redirect to "/signin"
  return userInfo && userInfo.isAdmin ? children : <Navigate to="/signin" />;
}

/*
**What does this code do?**
1. **Global State Access**: Retrieves the user's information from the global state using the context API.
2. **Conditional Rendering**: If `userInfo` exists and `isAdmin` is `true`, the component renders its children (admin content). Otherwise, it redirects the user to the `/signin` route.
3. **Usage**: 
   <AdminRoute>
     <AdminDashboard /> // Admin-specific content
   </AdminRoute>
   
   Here, `<AdminDashboard />` is rendered only for admin users. If not an admin, the user is redirected.
4. **Use of `Navigate`**: Handles client-side redirection seamlessly within React Router.
*/
