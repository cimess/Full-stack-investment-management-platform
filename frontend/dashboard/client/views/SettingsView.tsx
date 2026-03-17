import React from 'react';
import { Shield, Bell, ChevronRight, UserPlus, Loader2 } from 'lucide-react';
import Switch from '../../../components/switchButton/switch';
import { useRedeemAdmin, useRedeemManager, useAddManagerToClient, useGetMe } from '../../../hooks/useQuery';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';


const SettingsView: React.FC = () => {
  const [marketbutton, setmarketbutton] = React.useState(false);
  const [tradebutton, settradebutton] = React.useState(false);
  const [promoCode, setPromoCode] = React.useState('');
  const [managerId, setManagerId] = React.useState('');
  const [isRedeeming, setIsRedeeming] = React.useState(false);
  const [isLinking, setIsLinking] = React.useState(false);

  const { mutate: redeemAdmin } = useRedeemAdmin();
  const { mutate: redeemManager } = useRedeemManager();
  const { mutate: linkManager } = useAddManagerToClient();
  const { data: meData } = useGetMe();
  const queryClient = useQueryClient();

  const user = meData?.data;
  const currentManager = user?.client_manager?.user?.fullname;

  const handleRedeem = () => {
    // ... existing redeem logic ...
    if (!promoCode.trim()) {
      toast.error("Please enter a promotion code");
      return;
    }
    setIsRedeeming(true);
    
    redeemManager({ access_key: promoCode }, {
      onSuccess: () => {
        toast.success("Successfully promoted to Manager! Please log in again.");
        setIsRedeeming(false);
        setPromoCode('');
        window.location.href="/dashboard"
      },
      onError: (err:any) => {
        toast.error(err.response?.data?.message || "Invalid or expired promotion code");
        setIsRedeeming(false);
      }
    });
  };

  const handleLinkManager = () => {
    if (!managerId.trim()) {
      toast.error("Please enter a Manager ID");
      return;
    }
    setIsLinking(true);
    linkManager({ manager_id: managerId }, {
      onSuccess: () => {
        toast.success("Manager linked successfully!");
        setIsLinking(false);
        setManagerId('');
        queryClient.invalidateQueries({ queryKey: ["me"] });
        queryClient.invalidateQueries({ queryKey: ["userDashboard"] });
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.message || "Failed to link manager. Verify the ID.");
        setIsLinking(false);
      }
    });
  };


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
              {user?.fullname?.charAt(0) || "A"}
            </div>
            <div className="flex-1 space-y-4 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-500 text-xs font-medium">Display Name</label>
                  <input type="text" value={user?.fullname || ""} readOnly className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-slate-400 text-sm focus:outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-500 text-xs font-medium">Email Address</label>
                  <input type="email" value={user?.email || ""} readOnly className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-slate-400 text-sm focus:outline-none" />
                </div>
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
                <button onClick={() => settradebutton(!tradebutton)} className="w-8 h-4 bg-white/10 rounded-full relative">
                  <Switch state={tradebutton} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300 text-sm">Market Alerts</span>
                <button onClick={() => setmarketbutton(!marketbutton)} className="w-8 h-4 bg-white/10 rounded-full relative">
                  <Switch state={marketbutton} />
                </button>
              </div>
            </div>
          </div>

          {/* Link Manager Section */}
          <div className="md:col-span-2 glass-panel p-6 rounded-2xl border border-white/5 space-y-4 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 overflow-hidden relative">
            <div className="flex items-center gap-3 text-white mb-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <UserPlus className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Link Your Manager</h3>
                <p className="text-slate-500 text-xs text font-normal">Connect with an Investment Manager using their referral ID</p>
              </div>
            </div>
            
            {currentManager ? (
              <div className="flex items-center justify-between p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold uppercase">
                    {currentManager.charAt(0)}
                  </div>
                  <div>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Current Manager</p>
                    <p className="text-white text-sm font-bold">{currentManager}</p>
                  </div>
                </div>
                <div className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full font-bold uppercase border border-emerald-500/20"> Linked </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="text" 
                  value={managerId}
                  onChange={(e) => setManagerId(e.target.value)}
                  placeholder="Paste Manager ID here..." 
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500/50" 
                />
                <button 
                  onClick={handleLinkManager}
                  disabled={isLinking}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-blue-600 text-white text-xs font-bold rounded-xl border border-white/10 hover:from-emerald-500 hover:to-blue-500 transition-all flex items-center justify-center gap-2"
                >
                  {isLinking ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Link Manager"}
                </button>
              </div>
            )}
          </div>

          {/* Promotion Code Redemption */}
          <div className="md:col-span-2 glass-panel p-6 rounded-2xl border border-white/5 space-y-4 bg-gradient-to-br from-purple-500/5 to-indigo-500/5">
            <div className="flex items-center gap-3 text-white mb-2">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Shield className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Redeem Promotion Code</h3>
                <p className="text-slate-500 text-xs text font-normal">Enter the code provided by an admin to upgrade your account role</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="text" 
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.trim())}
                placeholder="PROMO-CODE-123" 
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500/50 font-mono tracking-wider" 
              />
              <button 
                onClick={handleRedeem}
                disabled={isRedeeming}
                className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold rounded-xl border border-white/10 hover:from-purple-500 hover:to-indigo-500 transition-all flex items-center justify-center gap-2"
              >
                {isRedeeming ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Redeem Code"}
              </button>
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
