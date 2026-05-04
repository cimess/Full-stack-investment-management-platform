import React from 'react';
import { Shield, Bell, ChevronRight, UserPlus, Loader2, User, Mail, Lock, X, CheckCircle2, Eye, EyeOff, AlertTriangle, Trash2 } from 'lucide-react';
import Switch from '../../../components/switchButton/switch';
import {
  useRedeemAdmin, useRedeemManager, useAddManagerToClient, useGetMe,
  useUpdateUserProfile, useGetPublicManagerProfile, useDeactivateAccount
} from '../../../hooks/useQuery';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { useAnalytics } from '../../../hooks/useAnalysis';



const SettingsView: React.FC = () => {


  const queryClient = useQueryClient();
  const { data: meData } = useGetMe();
  const user = meData?.data;

  // Profile Form State
  const [fullname, setFullname] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');

  // Settings State
  const [marketbutton, setmarketbutton] = React.useState(false);
  const [tradebutton, settradebutton] = React.useState(false);

  // Manager Link State
  const [managerId, setManagerId] = React.useState('');
  const [isLinking, setIsLinking] = React.useState(false);

  // Promo Code State
  const [promoCode, setPromoCode] = React.useState('');
  const [isRedeeming, setIsRedeeming] = React.useState(false);
  const [redeemType, setRedeemType] = React.useState<'MANAGER' | 'ADMIN'>('MANAGER');

  // Password Modal State
  const [isPassModalOpen, setIsPassModalOpen] = React.useState(false);
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  // Deactivate State
  const [showDeactivateConfirm, setShowDeactivateConfirm] = React.useState(false);

  // Mutations
  const { mutate: updateUser, isPending: isUpdatingUser } = useUpdateUserProfile();
  const { mutate: redeemAdmin } = useRedeemAdmin();
  const { mutate: redeemManager } = useRedeemManager();
  const { mutate: linkManager } = useAddManagerToClient();
  const { mutate: deactivateAccount, isPending: isDeactivating } = useDeactivateAccount();



  // Manager Preview Hook
  const { data: managerPreview, isLoading: isLoadingPreview } = useGetPublicManagerProfile(managerId);

  React.useEffect(() => {
    if (user) {
      setFullname(user.fullname || '');
      setEmail(user.email || '');
      setUsername(user.username || '');
    }
  }, [user]);

  const currentManager = user?.client_manager?.user?.fullname;

  const { trackEvent } = useAnalytics();

  const handleSaveProfile = () => {
    if (!fullname.trim() || !email.trim()) {
      toast.error("Name and Email are required");
      return;
    }
    trackEvent("UPDATE PROFILE", { fieldsUpdated: "fullname,email,username"} );
    updateUser({ fullname, email, username }, {


      onSuccess: () => {
        toast.success("Profile updated successfully!");
        queryClient.invalidateQueries({ queryKey: ["me"] });
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.message || "Failed to update profile");
      }
    });
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    updateUser({ password: newPassword }, {
      onSuccess: () => {
        toast.success("Password changed successfully!");
        setIsPassModalOpen(false);
        setNewPassword('');
        setConfirmPassword('');
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.message || "Failed to change password");
      }
    });
  };

  const handleRedeem = () => {
    if (!promoCode.trim()) {
      toast.error("Please enter a promotion code");
      return;
    }
    setIsRedeeming(true);

    const action = redeemType === 'ADMIN' ? redeemAdmin : redeemManager;
    const roleLabel = redeemType === 'ADMIN' ? 'Admin' : 'Manager';

    action({ access_key: promoCode }, {
      onSuccess: () => {
        toast.success(`Successfully promoted to ${roleLabel}! Please log in again.`);
        setIsRedeeming(false);
        setPromoCode('');
        window.location.href = "/dashboard";
      },
      onError: (err: any) => {
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
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.message || "Failed to link manager");
        setIsLinking(false);
      }
    });
  };

  const handleDeactivate = () => {
    trackEvent("DEACTIVATE ACCOUNT", { userId: user?.id } );

    deactivateAccount(undefined, {
      onSuccess: () => {
        toast.success("Account deactivated. We're sorry to see you go.");
        queryClient.clear();
        window.location.href = "/login";
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.message || "Failed to deactivate account");
        setShowDeactivateConfirm(false);
      }
    });
  };

  return (

    <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-white font-bold text-2xl tracking-tight">Account Settings</h2>
        <p className="text-slate-500 text-sm">Manage your personal identity and secure your digital assets</p>
      </div>

      <div className="space-y-6">
        {/* Profile Section */}
        <div className="glass-panel rounded-3xl border border-white/5 overflow-hidden transition-all hover:border-white/10">
          <div className="px-6 py-4 border-b border-white/5 bg-white/2 flex justify-between items-center">
            <h3 className="text-white font-bold text-xs uppercase tracking-widest opacity-60">Profile Overview</h3>
            <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full font-bold uppercase border border-blue-500/20">Active Account</span>
          </div>
          <div className="p-4 sm:p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
            <div className="relative group">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-emerald-500 to-blue-600 flex 
              items-center justify-center text-4xl font-black text-white shadow-[0_20px_40px_-15px_rgba(16,185,129,0.3)] 
              transform transition-transform group-hover:scale-105 duration-300">
                {user?.fullname?.charAt(0) || "U"}
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-xl bg-gray-900 border-2 border-emerald-500 flex 
              items-center justify-center text-emerald-500 shadow-lg">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>

            <div className="flex-1 space-y-6 w-full">
              <div className="pb-2 border-b border-white/5">
                <h4 className="text-white font-bold text-xl">{fullname || "Nova User"}</h4>
                <p className="text-emerald-500 text-sm font-medium tracking-wide">@{username || "handle"}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-slate-500 text-[10px] font-bold uppercase tracking-wider ml-1">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
                    <input
                      type="text"
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-white 
                      text-sm focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.07] transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-slate-500 text-[10px] font-bold uppercase tracking-wider ml-1">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3 
                      text-white text-sm focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.07] transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security & Preferences grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Security */}
          <div className="glass-panel p-4 sm:p-6 rounded-3xl border border-white/5 space-y-4 hover:border-white/10 transition-colors">
            <div className="flex items-center gap-3 text-white mb-2">
              <div className="p-2 rounded-xl bg-blue-500/10">
                <Shield className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="font-bold text-sm">Security & Access</h3>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => setIsPassModalOpen(true)}
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/2 
                border border-white/5 hover:bg-white/5 hover:border-white/10 transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <Lock className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-300 text-sm font-medium">Change Password</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </button>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white/2 border border-white/5 opacity-50">
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-300 text-sm font-medium">Auto-Lock Session</span>
                </div>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-black uppercase">ON</span>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="glass-panel p-4 sm:p-6 rounded-3xl border border-white/5 space-y-4 hover:border-white/10 transition-colors">
            <div className="flex items-center gap-3 text-white mb-2">
              <div className="p-2 rounded-xl bg-amber-500/10">
                <Bell className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="font-bold text-sm">Communication</h3>
            </div>
            <div className="space-y-4 px-1">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-slate-300 text-sm font-medium block">Trade Confirmations</span>
                  <span className="text-slate-600 text-[10px]">Real-time execution alerts</span>
                </div>
                <div onClick={() => settradebutton(!tradebutton)} className="cursor-pointer">
                  <Switch state={tradebutton} />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-slate-300 text-sm font-medium block">Market Highlights</span>
                  <span className="text-slate-600 text-[10px]">Daily performance summary</span>
                </div>
                <div onClick={() => setmarketbutton(!marketbutton)} className="cursor-pointer">
                  <Switch state={marketbutton} />
                </div>
              </div>
            </div>
          </div>

          {/* Manager Management Section */}
          <div className="md:col-span-2 glass-panel p-4 sm:p-8 rounded-3xl border border-white/5 space-y-6 bg-gradient-to-br 
          from-emerald-500/5 via-transparent to-blue-500/5 relative overflow-hidden group">
            <div className="flex items-center gap-4 text-white">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center 
              justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform duration-500">
                <UserPlus className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="font-bold text-base">Manager Connection</h3>
                <p className="text-slate-500 text-xs">Authorize a professional to oversee your investment strategies</p>
              </div>
            </div>

            {currentManager ? (
              <div className="flex items-center justify-between p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 shadow-lg animate-in zoom-in-95">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-lg border border-emerald-500/30">
                    {currentManager.charAt(0)}
                  </div>
                  <div>
                    <label className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded uppercase font-bold mb-1 inline-block">Managed Account</label>
                    <p className="text-white text-base font-bold tracking-tight">{currentManager}</p>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Status</span>
                    <span className="text-xs text-emerald-400 font-black tracking-widest uppercase flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Synchronized
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4 relative">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={managerId}
                      onChange={(e) => setManagerId(e.target.value)}
                      placeholder="Enter Referral Code..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white text-sm 
                      focus:outline-none focus:border-emerald-500/50 shadow-inner transition-all"
                    />
                    {isLoadingPreview && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <Loader2 className="w-4 h-4 text-emerald-500 animate-spin" />
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleLinkManager}
                    disabled={isLinking || !managerPreview}
                    className="md:px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 
                    text-white text-sm font-bold rounded-2xl border border-white/10 hover:shadow-[0_10px_30px_-5px_rgba(16,185,129,0.3)] 
                    transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {isLinking ? <Loader2 className="w-4 h-4 animate-spin" /> : "Link Manager"}
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Manager Preview Card */}
                {managerPreview?.data && (
                  <div className="p-5 rounded-2xl bg-white/2 border border-white/5 animate-in slide-in-from-top-4 duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 
                      flex items-center justify-center text-emerald-500 font-bold text-xl">
                        {managerPreview.data.fullname.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h5 className="text-white font-bold">{managerPreview.data.fullname}</h5>
                          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-bold uppercase">Candidate</span>
                        </div>
                        <p className="text-slate-400 text-xs mt-0.5">{managerPreview.data.title || "Elite Investment Manager"}</p>
                        <div className="flex gap-4 mt-2">
                          <span className="text-[10px] text-slate-500 font-medium">Exp: <span className="text-slate-300">{
                            managerPreview.data.years_experience || 5}+ Years</span></span>
                          <span className="text-[10px] text-slate-500 font-medium">Spec: <span className="text-slate-300">{
                            managerPreview.data.specialization || "Global Equities"}</span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Promotion Code Redemption */}
          <div className="md:col-span-2 glass-panel p-4 sm:p-8 rounded-3xl border border-white/5 
          space-y-6 bg-gradient-to-br from-purple-500/10 to-transparent">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-white">
                <div className="p-2 rounded-xl bg-purple-500/10">
                  <Shield className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Privileged Access</h3>
                  <p className="text-slate-500 text-[10px]">Enter an administrative key to upgrade your account status</p>
                </div>
              </div>

              {/* Segmented Control */}
              <div className="flex p-1 bg-white/5 rounded-2xl border border-white/5 self-start sm:self-center">
                <button
                  onClick={() => setRedeemType('MANAGER')}
                  className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${redeemType === 'MANAGER'
                      ? "bg-purple-600 text-white shadow-lg"
                      : "text-slate-500 hover:text-slate-300"
                    }`}
                >
                  Manager
                </button>
                <button
                  onClick={() => setRedeemType('ADMIN')}
                  className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${redeemType === 'ADMIN'
                      ? "bg-purple-600 text-white shadow-lg"
                      : "text-slate-500 hover:text-slate-300"
                    }`}
                >
                  Admin
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.trim())}
                placeholder={`ENTER ${redeemType} CODE...`}
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 
                  text-white text-sm focus:outline-none focus:border-purple-500/50 font-mono 
                  tracking-widest transition-all"
              />
              <button
                onClick={handleRedeem}
                disabled={isRedeeming}
                className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 
                  text-white text-xs font-black rounded-2xl border border-white/10 hover:shadow-lg 
                  hover:shadow-purple-500/20 transition-all uppercase tracking-widest disabled:opacity-50 
                  min-w-[140px]"
              >
                {isRedeeming ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Redeem Key"}
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="md:col-span-2 glass-panel p-4 sm:p-8 rounded-3xl border border-red-500/10 
          space-y-6 bg-red-500/[0.02] relative overflow-hidden group hover:border-red-500/30 transition-all">
            <div className="flex items-center gap-4 text-white">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center 
              justify-center border border-red-500/20 group-hover:scale-110 transition-transform duration-500">
                <AlertTriangle className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="font-bold text-base text-red-500">Danger Zone</h3>
                <p className="text-slate-500 text-xs">Irreversible actions concerning your account status</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between p-6 rounded-2xl bg-red-500/[0.03] border border-red-500/10 gap-4">
              <div className="text-center sm:text-left">
                <h4 className="text-white font-bold text-sm">Deactivate Account</h4>
                <p className="text-slate-500 text-xs mt-1">This will disable your access and release your manager connection.</p>
              </div>
              <button
                onClick={() => setShowDeactivateConfirm(true)}
                className="w-full sm:w-auto px-6 py-2.5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white 
                text-[10px] font-black uppercase tracking-widest rounded-xl border border-red-500/20 
                transition-all duration-300"
              >
                Deactivate
              </button>
            </div>
          </div>
        </div>
      </div>


      <div className="flex justify-center sm:justify-end pt-8 pb-12 sm:pb-0">
        <button
          onClick={handleSaveProfile}
          disabled={isUpdatingUser}
          className="w-full sm:w-auto px-12 py-4 bg-gradient-to-r from-emerald-600 
           to-emerald-500 text-white font-black text-sm uppercase tracking-widest rounded-2xl 
           shadow-[0_20px_40px_-10px_rgba(16,185,129,0.3)] hover:scale-[1.03] active:scale-[0.97] 
           transition-all disabled:opacity-50"
        >
          {isUpdatingUser ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Commit All Changes"}
        </button>
      </div>

      {/* Password Modal */}
      {isPassModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsPassModalOpen(false)} />
          <div className="relative w-full max-w-md glass-panel p-8 rounded-[2.5rem] 
          border border-white/10 shadow-2xl animate-in fade-in zoom-in-95 duration-300">
            <button onClick={() => setIsPassModalOpen(false)}
              className="absolute right-6 top-6 p-2 rounded-full hover:bg-white/5 
            text-slate-500 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div className="mb-8">
              <h3 className="text-white font-bold text-xl mb-2">Change Password</h3>
              <p className="text-slate-500 text-sm">Create a secure new passphrase for your account access</p>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-slate-500 text-[10px] font-bold uppercase tracking-wider ml-1">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 
                    pr-4 py-3.5 text-white focus:outline-none focus:border-emerald-500/50"
                  />
                  {showNewPassword ? <Eye className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 cursor-pointer"
                    onClick={() => setShowNewPassword(!showNewPassword)} /> :
                    <EyeOff className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 cursor-pointer"
                      onClick={() => setShowNewPassword(!showNewPassword)} />}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-slate-500 text-[10px] font-bold uppercase tracking-wider ml-1">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl 
                    pl-11 pr-4 py-3.5 text-white focus:outline-none focus:border-emerald-500/50"
                  />

                  {showConfirmPassword ?
                    <Eye className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 cursor-pointer"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)} /> :
                    <EyeOff className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 cursor-pointer"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)} />}
                </div>
              </div>
              <button
                onClick={handleChangePassword}
                disabled={isUpdatingUser}
                className="w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-500/20 uppercase tracking-widest text-xs disabled:opacity-50"
              >
                {isUpdatingUser ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Update Password"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Deactivate Confirmation Modal */}
      {showDeactivateConfirm && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setShowDeactivateConfirm(false)} />
          <div className="relative w-full max-w-sm glass-panel p-8 rounded-[2rem] border border-red-500/20 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-6 border border-red-500/20">
              <Trash2 className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-white font-bold text-xl text-center mb-2">Final Confirmation</h3>
            <p className="text-slate-400 text-sm text-center mb-8">
              Are you absolutely sure you want to deactivate your account? This action is immediate and will log you out.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleDeactivate}
                disabled={isDeactivating}
                className="w-full py-4 bg-red-500 text-white font-bold rounded-2xl hover:bg-red-600 transition-all flex items-center justify-center gap-2"
              >
                {isDeactivating ? <Loader2 className="w-4 h-4 animate-spin" /> : "Yes, Deactivate Account"}
              </button>
              <button
                onClick={() => setShowDeactivateConfirm(false)}
                className="w-full py-4 bg-white/5 text-slate-300 font-bold rounded-2xl hover:bg-white/10 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

  );
};

export default SettingsView;
