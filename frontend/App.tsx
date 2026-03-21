import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// 1. Critical component that needs to load immediately
import ProtectedRoute from './components/protectedRoute';

// 2. Lazy loaded page components (This triggers Vite code-splitting)
const LandingPage = lazy(() => import('./pages/LandingPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignUp = lazy(() => import('./pages/SignUp'));
const VerifyEmailPage = lazy(() => import('./pages/VerifyEmailPage'));
const CompleteRegistration = lazy(() => import('./pages/CompleteRegistration'));
const ClientDashboard = lazy(() => import('./dashboard/client/ClientDashboard'));
const ManagerDashboard = lazy(() => import('./dashboard/manager/ManagerDashboard'));
const AdminDashboard = lazy(() => import('./dashboard/admin/AdminDashboard'));

// 3. A simple loading fallback to show while the chunk is downloading
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin h-10 w-10 border-4 border-blue-600 rounded-full border-t-transparent"></div>
  </div>
);


const App = () => {
  return (
    <>
      <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        draggablePercent={10}
        theme="dark"
      />
      <Router>
     <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify" element={<VerifyEmailPage />} />
        <Route path="/complete-registration" element={<CompleteRegistration />} />

        {/* Client Dashboard */}

        <Route path="/dashboard/client" element={
             <ProtectedRoute allowedRoles={['USER']}>
              <ClientDashboard />
             </ProtectedRoute>
        } />
        <Route path="/dashboard/client/*" element={
             <ProtectedRoute allowedRoles={['USER']}>
              <ClientDashboard />
             </ProtectedRoute>
        } />

        {/* Manager Dashboard */}
        <Route path="/dashboard/manager" element={
             <ProtectedRoute allowedRoles={['MANAGER']}>
              <ManagerDashboard />
             </ProtectedRoute>
        } />
        <Route path="/dashboard/manager/*" element={
             <ProtectedRoute allowedRoles={['MANAGER']}>
              <ManagerDashboard />
             </ProtectedRoute>
        } />

        {/* Admin Dashboard */}
        <Route path="/dashboard/admin" element={
             <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminDashboard />
             </ProtectedRoute>
        } />
        <Route path="/dashboard/admin/*" element={
             <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminDashboard />
             </ProtectedRoute>
        } />

        {/* Legacy fallback */}
        <Route path="/dashboard" element={
                <ProtectedRoute allowedRoles={['USER']}>
        <ClientDashboard />
      </ProtectedRoute>
        } />
      </Routes>
      </Suspense>
    </Router>
    </>
  );
};

export default App;
