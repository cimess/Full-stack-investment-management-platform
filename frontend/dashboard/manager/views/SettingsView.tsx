import React from 'react';
import { User, Shield, Bell, Globe, Mail } from 'lucide-react';
import Switch from '../../../components/switchButton/switch';

const SettingsView: React.FC = () => {
  const [tradeNotification, setTradeNotification] = React.useState(false);


  const handleTradeNotificationState = () => {
    setTradeNotification(!tradeNotification);
  }


  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h2 className="text-white font-bold text-2xl">Manager Settings</h2>
        <p className="text-slate-500 text-sm">Manage your profile, security, and notification preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-1">
          <h3 className="text-white font-bold text-sm">Profile Information</h3>
          <p className="text-slate-500 text-xs">Update your public profile and contact details.</p>
        </div>
        <div className="md:col-span-2 glass-panel p-6 rounded-2xl border border-white/5 space-y-6">
          <div className="flex items-center gap-4">
             <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                S
             </div>
             <div>
                <button className="px-4 py-2 bg-white/5 text-white text-xs font-bold rounded-lg border border-white/10 hover:bg-white/10 transition-colors">Change Photo</button>
                <p className="text-slate-500 text-[10px] mt-2">JPG, GIF or PNG. Max size of 800K</p>
             </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
               <label className="text-slate-400 text-xs font-medium">Full Name</label>
               <input type="text" defaultValue="Sarah Mitchell" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500/50" />
            </div>
            <div className="space-y-1.5">
               <label className="text-slate-400 text-xs font-medium">Email Address</label>
               <input type="email" defaultValue="sarah.m@novainvest.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500/50" />
            </div>
          </div>
        </div>
      </div>

      <div className="h-px bg-white/5" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-1">
          <h3 className="text-white font-bold text-sm">Security</h3>
          <p className="text-slate-500 text-xs">Manage your password and authentication methods.</p>
        </div>
        <div className="md:col-span-2 space-y-3">
          <div className="glass-panel p-4 rounded-xl border border-white/5 flex items-center justify-between hover:bg-white/2 transition-colors cursor-pointer">
             <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-emerald-400" />
                <span className="text-white text-sm font-medium">Two-Factor Authentication</span>
             </div>
             <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest bg-emerald-500/10 px-2 py-1 rounded-md">Enabled</span>
          </div>
          <div className="glass-panel p-4 rounded-xl border border-white/5 flex items-center justify-between hover:bg-white/2 transition-colors cursor-pointer">
             <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-amber-400" />
                <span className="text-white text-sm font-medium">Trade Notifications</span>
             </div>
             <button className='relative w-8 h-4 bg-white/10 rounded-full ' onClick={handleTradeNotificationState}>
             <Switch state={tradeNotification}
             />
             </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
         <button className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all">
            Save All Changes
         </button>
      </div>
    </div>
  );
};

export default SettingsView;
