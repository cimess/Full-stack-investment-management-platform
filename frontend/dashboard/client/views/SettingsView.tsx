import React from 'react';
import { Shield, Bell, ChevronRight } from 'lucide-react';
import Switch from '../../../components/switchButton/switch';


const SettingsView: React.FC = () => {
  const [marketbutton, setmarketbutton] = React.useState(false);
  const [tradebutton, settradebutton] = React.useState(false);

  const handleMarketButtonState = () => {
    setmarketbutton(!marketbutton);
  }

  const handleTradeButtonState = () => {
    settradebutton(!tradebutton);
  }


  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h2 className="text-white font-bold text-2xl">Account Settings</h2>
        <p className="text-slate-500 text-sm">Manage your personal information and account preferences</p>
      </div>

      <div className="space-y-4">
        {/* Profile Section */}
        <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5 bg-white/2">
            <h3 className="text-white font-bold text-sm">Profile Overview</h3>
          </div>
          <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg flex-shrink-0">
              A
            </div>
            <div className="flex-1 space-y-4 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-500 text-xs font-medium">Display Name</label>
                  <input type="text" defaultValue="Alex Johnson" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500/50" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-500 text-xs font-medium">Email Address</label>
                  <input type="email" defaultValue="alex.j@example.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500/50" />
                </div>
              </div>
              <div className="flex justify-center sm:justify-end pt-2">
                <button className="w-full sm:w-auto px-5 py-2.5 bg-white/5 text-white text-xs font-bold rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Security & Preferences grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Security */}
          <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
            <div className="flex items-center gap-3 text-white mb-2">
              <Shield className="w-5 h-5 text-blue-400" />
              <h3 className="font-bold text-sm">Security</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/2 border border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
                <span className="text-slate-300 text-sm">Change Password</span>
                <ChevronRight className="w-4 h-4 text-slate-600 hidden sm:block" />
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/2 border border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
                <span className="text-slate-300 text-sm">Two-Factor Auth</span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-bold uppercase">ON</span>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
            <div className="flex items-center gap-3 text-white mb-2">
              <Bell className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-sm">Notifications</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 text-sm">Trade Confirmations</span>
                <button onClick={handleTradeButtonState} className="w-8 h-4 bg-white/10 rounded-full relative"><Switch state={tradebutton} /></button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300 text-sm">Market Alerts</span>
                <button onClick={handleMarketButtonState} className="w-8 h-4 bg-white/10 rounded-full relative"><Switch state={marketbutton} /></button>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="flex justify-center sm:justify-end pt-4 pb-8 sm:pb-0">
        <button className="w-full sm:w-auto px-8 py-4 sm:py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-2xl sm:rounded-xl shadow-xl shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default SettingsView;
