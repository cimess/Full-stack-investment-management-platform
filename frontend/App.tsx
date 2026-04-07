import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
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
const ConditionPage = lazy(() => import('./pages/terms/conditionPage'));
const PrivacyPage = lazy(() => import('./pages/terms/privacyPage'));
const RiskPage = lazy(() => import('./pages/terms/riskPage'));
const ConsentPreferencesPage = lazy(() => import('./pages/terms/consent-preference'));
// 3. A simple loading fallback to show while the chunk is downloading
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin h-10 w-10 border-4 border-blue-600 rounded-full border-t-transparent"></div>
  </div>
);
 function ScrollToTop():any {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // optional
    });
  }, [pathname]);

  return null;
}

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
        <ScrollToTop />
     <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify" element={<VerifyEmailPage />} />
        <Route path="/complete-registration" element={<CompleteRegistration />} />
        <Route path="/terms" element={<ConditionPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/risk" element={<RiskPage />} />
        <Route path="/cookies" element={<ConsentPreferencesPage />} />
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
