import React from 'react';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import DashboardSidebar from '../../components/ui/DashboardSidebar';
import TopBar from '../../components/ui/TopBar';
import { SiGoogle } from 'react-icons/si';
import { Link } from 'react-router-dom';
import AppTour from '../../components/ui/AppTour';
// Views
import Overview from './views/Overview';
import ClientsView from './views/ClientsView';
import RequestsView from './views/RequestsView';
import AnalyticsView from './views/AnalyticsView';
import SettingsView from './views/SettingsView';

import { logout } from '../../hooks/useQuery';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

const ManagerDashboard: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const { mutate: performLogout } = logout();
  const queryClient = useQueryClient();
  const [runTour,setRunTour]=useState(false)


  useEffect(() => {
  const done = localStorage.getItem("tour_done");
  if (!done) setRunTour(true);
}, []);

const handleFinish = () => {
  localStorage.setItem("tour_done", "true");
  setRunTour(false);
};
  const handleLogout = () => {
    performLogout();
    queryClient.clear();
    navigate('/login');
  };

  const meData: any = queryClient.getQueryData(["me"]);
  const user = meData?.data;
  const firstName = user?.fullname?.split(" ")[0];
  return (
    <div className="flex h-screen bg-black overflow-hidden">
      <AppTour
        run={runTour}
        onFinish={handleFinish}
        role="MANAGER"
        mobileOpen={isMobileMenuOpen}
        setMobileOpen={setIsMobileMenuOpen}
      />
      <DashboardSidebar 
        role="manager" 
        userName={firstName || "Manager"} 
        mobileOpen={isMobileMenuOpen}
        setMobileOpen={setIsMobileMenuOpen}
        handleLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar 
          pageTitle="Manager Dashboard" 
          userName={firstName || "Manager"} 
          onToggleSidebar={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          handleLogout={handleLogout}
          role="MANAGER"
          managerSlot={user?.manager?.manager_slot}
        />
        {/* Google Verify Banner - shown when user is NOT verified */}
                 {user && !user?.isVerified && <div className="flex justify-center mb-4 items-center gap-2 text-sm text-amber-400 md:text-base mt-2 underline">
                      <SiGoogle />
                      <Link to="http://localhost:4000/api/auth/google">
                    verify your email address
                    </Link>
                  </div>}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          <Routes>
            <Route index element={<Overview />} />
            <Route path="clients" element={<ClientsView />} />
            <Route path="requests" element={<RequestsView />} />
            <Route path="analytics" element={<AnalyticsView />} />
            <Route path="settings" element={<SettingsView />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default ManagerDashboard;
