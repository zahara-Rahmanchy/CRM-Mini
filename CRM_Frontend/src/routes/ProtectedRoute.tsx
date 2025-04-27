import { Navigate } from 'react-router-dom';
import { getToken } from '../utils/cookieHelper';

import { ReactNode } from 'react';
import { decodeToken } from '../utils/decodeToken';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children}: ProtectedRouteProps) => {
  const token = getToken("accessToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decodedToken = decodeToken(token); 
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
 
    if (decodedToken?.exp as number < currentTime) {
      return <Navigate to="/login" replace />;
    }

    // Role-based access control
   

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>; // Ensure the children are rendered
};

export default ProtectedRoute;
