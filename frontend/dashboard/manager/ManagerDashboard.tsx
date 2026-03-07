import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DashboardSidebar from '../../components/ui/DashboardSidebar';
import TopBar from '../../components/ui/TopBar';

// Views
import Overview from './views/Overview';
import ClientsView from './views/ClientsView';
import RequestsView from './views/RequestsView';
import AnalyticsView from './views/AnalyticsView';
import SettingsView from './views/SettingsView';

const ManagerDashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-[#020617] overflow-hidden">
      <DashboardSidebar role="manager" userName="Sarah Mitchell" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar pageTitle="Manager Dashboard" userName="Sarah Mitchell" />

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
