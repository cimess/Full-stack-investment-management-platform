import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useGetMe } from '../hooks/useQuery';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../lib/axios';
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[]; // e.g., ['USER', 'MANAGER', 'ADMIN']
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { data, isLoading, isError } = useGetMe();
  const location = useLocation();
  const user = data?.data;
 

  useEffect(()=>{

const userTerms = localStorage.getItem(`${user?.email}-cimessinvest-userTerms`);
const pendingGoogle = localStorage.getItem("pending-google-terms");

if (!user?.termsAccepted && (userTerms !== null || pendingGoogle !== null)) {
    api.post("/user/terms", { termsAccepted: true })
      .then(() => {
          localStorage.setItem(`${user?.email}-cimessinvest-userTerms`, "true");
          localStorage.removeItem("pending-google-terms"); // clean up temp key
      })
      .catch(console.log);
}


},[user?.termsAccepted])
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
    toast.error("Please log in to access this page");
    return <Navigate to="/login" state={{ from: location }} replace />;

  }

  if (!user.hasPassword && location.pathname !== '/complete-registration') {
    return <Navigate to="/complete-registration" replace />;
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
