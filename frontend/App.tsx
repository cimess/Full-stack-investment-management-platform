import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUp from './pages/SignUp';
import VerifyEmailPage from './pages/VerifyEmailPage';
import CompleteRegistration from './pages/CompleteRegistration';
import ClientDashboard from './dashboard/client/ClientDashboard';
import ManagerDashboard from './dashboard/manager/ManagerDashboard';
import AdminDashboard from './dashboard/admin/AdminDashboard';
import ProtectedRoute from './components/protectedRoute';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <ToastContainer />
      <Router>

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
    </Router>
    </>
  );
};

export default App;
