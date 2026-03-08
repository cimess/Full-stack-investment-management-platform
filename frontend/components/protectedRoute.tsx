import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useGetMe} from '../hooks/useQuery';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[]; // e.g., ['USER', 'MANAGER', 'ADMIN']
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { data, isLoading,isError } = useGetMe();
  const location = useLocation();
  const user=data?.data;
  // 1. Handle Loading State
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#020617]">
        <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
      </div>
    );
  }

  // 2. Handle Not Logged In
  if (isError || !user) {
    // Save the attempted location to redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
    
  }

  const userRole = user?.roles;

  // 3. Handle Role-Based Access Control (RBAC)
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Redirect to their specific "home" dashboard if they try to access a forbidden area
    const defaultPath = userRole === 'ADMIN' ? '/dashboard/admin' 
                      : userRole === 'MANAGER' ? '/dashboard/manager' 
                      : '/dashboard/client';
    return <Navigate to={defaultPath} replace />;
  }

  // 4. Authorized: Render the Dashboard
  return <>{children}</>;
};

export default ProtectedRoute;
