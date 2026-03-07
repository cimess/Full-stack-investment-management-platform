import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DashboardSidebar from '../../components/ui/DashboardSidebar';
import TopBar from '../../components/ui/TopBar';

// Views
import Overview from './views/Overview';
import MarketView from './views/MarketView';
import PortfolioView from './views/PortfolioView';
import TransactionsView from './views/TransactionsView';
import ManagerView from './views/ManagerView';
import SettingsView from './views/SettingsView';


 const ClientDashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-[#020617] overflow-hidden">
      <DashboardSidebar role="client" userName="Alex Johnson" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar pageTitle="Client Dashboard" userName="Alex Johnson" />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          <Routes>
            <Route index element={<Overview />} />
            <Route path="market" element={<MarketView />} />
            <Route path="portfolio" element={<PortfolioView />} />
            <Route path="transactions" element={<TransactionsView />} />
            <Route path="manager" element={<ManagerView />} />
            <Route path="settings" element={<SettingsView />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default ClientDashboard;

