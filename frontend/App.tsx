import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUp from './pages/SignUp';
import VerifyEmailPage from './pages/VerifyEmailPage';
import ClientDashboard from './dashboard/client/ClientDashboard';
import ManagerDashboard from './dashboard/manager/ManagerDashboard';
import AdminDashboard from './dashboard/admin/AdminDashboard';


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify" element={<VerifyEmailPage />} />

        {/* Client Dashboard */}
        <Route path="/dashboard/client" element={<ClientDashboard />} />
        <Route path="/dashboard/client/*" element={<ClientDashboard />} />

        {/* Manager Dashboard */}
        <Route path="/dashboard/manager" element={<ManagerDashboard />} />
        <Route path="/dashboard/manager/*" element={<ManagerDashboard />} />

        {/* Admin Dashboard */}
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/admin/*" element={<AdminDashboard />} />

        {/* Legacy fallback */}
        <Route path="/dashboard" element={<ClientDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
