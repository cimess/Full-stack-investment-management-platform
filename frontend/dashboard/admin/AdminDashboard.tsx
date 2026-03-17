import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  Users,
  Briefcase,
  UserPlus,
} from 'lucide-react';
import DashboardSidebar from '../../components/ui/DashboardSidebar';
import TopBar from '../../components/ui/TopBar';

// Views
import Overview from './views/Overview';
import UsersView from './views/UsersView';
import ManagersView from './views/ManagersView';
import TransactionsView from './views/TransactionsView';

import { logout } from '../../hooks/useQuery';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

const AdminDashboard: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSuperAdminForm, setShowSuperAdminForm] = useState(false);
  const [superAdminEmail, setSuperAdminEmail] = useState('');
  const navigate = useNavigate();
  const { mutate: performLogout } = logout();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    performLogout();
    queryClient.clear();
    navigate('/login');
  };

  const meData: any = queryClient.getQueryData(["me"]);
  const user = meData?.data;
  const firstName = user?.fullname?.split(" ")[0];




  return (
    <div className="flex h-screen bg-[#020617] overflow-hidden">
      <DashboardSidebar 
        role={"admin"} 
        userName={firstName || "Admin"} 
        mobileOpen={isMobileMenuOpen}
        setMobileOpen={setIsMobileMenuOpen}
        handleLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar 
          pageTitle="Admin Control Centre" 
          userName={firstName || "Admin"} 
          onToggleSidebar={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          handleLogout={handleLogout}
        />

        <main className="flex-1 overflow-y-auto p-6 space-y-6">

          <Routes>
            <Route index element={<Overview />} />
            <Route path="users" element={<UsersView />} />
            <Route path="managers" element={<ManagersView />} />
            <Route path="transactions" element={<TransactionsView />} />
            {/* Fallbacks for other routes */}
            <Route path="portfolios" element={<div className="text-white p-6 glass-panel rounded-2xl border border-white/5">Portfolios Management - Coming Soon</div>} />
            <Route path="trade-requests" element={<div className="text-white p-6 glass-panel rounded-2xl border border-white/5">Trade Requests - Coming Soon</div>} />
            <Route path="stocks" element={<div className="text-white p-6 glass-panel rounded-2xl border border-white/5">Stock Management - Coming Soon</div>} />
            <Route path="security" element={<div className="text-white p-6 glass-panel rounded-2xl border border-white/5">Security Settings - Coming Soon</div>} />
          </Routes>

          {/* Promote Super Admin - Always visible or potentially moved to Security? Let's keep it here for now or wrap in Overview */}
          <div className="glass-panel rounded-2xl border border-white/5 p-6 mt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <UserPlus className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-white font-bold">Promote to Super Admin</h2>
                  <p className="text-slate-500 text-sm">Grant full platform admin privileges to a user</p>
                </div>
              </div>
              <button
                onClick={() => setShowSuperAdminForm(!showSuperAdminForm)}
                className="px-4 py-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 text-sm font-medium hover:bg-purple-500/20 transition-colors"
              >
                {showSuperAdminForm ? 'Cancel' : '+ Promote User'}
              </button>
            </div>

            {showSuperAdminForm && (
              <div className="mt-4 flex gap-3">
                <input
                  type="email"
                  value={superAdminEmail}
                  onChange={e => setSuperAdminEmail(e.target.value)}
                  placeholder="Enter user email address..."
                  className="flex-1 bg-white/5 border border-white/10 text-white placeholder-slate-600 rounded-xl px-4 py-2.5 focus:outline-none focus:border-purple-500/50 transition-colors text-sm"
                />
                <button className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-xl text-sm hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/20">
                  Confirm
                </button>
              </div>
            )}
          </div>

        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
