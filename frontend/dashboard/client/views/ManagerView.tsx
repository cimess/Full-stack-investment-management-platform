import React, { useState } from 'react';
import { Mail, Phone, Calendar, Award, MessageSquare, ExternalLink, ShieldCheck, UserPlus, UserMinus, Search, Info, Loader2 } from 'lucide-react';
import { getUserDashboard, useAddManagerToClient, useRemoveManagerFromClient, useGetMe } from '../../../hooks/useQuery';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { useAnalytics } from '../../../hooks/useAnalysis';

const ManagerView: React.FC = () => {

const { trackEvent } = useAnalytics();

  const queryClient = useQueryClient();
  const { data, isLoading: isDashboardLoading } = getUserDashboard();
  const { data: meData, isLoading: isMeLoading } = useGetMe();
  const { mutate: assignManager, isPending: isAssigning } = useAddManagerToClient();
  const { mutate: detachManager, isPending: isRemoving} = useRemoveManagerFromClient();
  
  const [managerId, setManagerId] = useState('');

  // Source manager status from getMe — this works even without a portfolio
  const meUser = meData?.data;
  const managerData = meUser?.client_manager || data?.data?.user?.client_manager;
  const hasManager = !!managerData;
  const isLoading = isMeLoading;

  const handleAssign = () => {
    if (!managerId.trim()) return;
    
    trackEvent("ASSIGN MANAGER", { managerId });
    
    assignManager({ manager_id: managerId }, {
      onSuccess: () => {
        
        setManagerId('');
        queryClient.invalidateQueries({ queryKey: ["me"] });
        queryClient.invalidateQueries({ queryKey: ["userDashboard"] });
        toast.success("Manager assigned successfully!");
        
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message || "Failed to assign manager");
      }
    });
  };

  const handleRemove = () => {
    if (!managerData?.id) return;
    
    trackEvent("REMOVE MANAGER", { managerId: managerData.id });
    const confirmed = window.confirm("Are you sure you want to remove your manager? You will lose access to specialized portfolio guidance.");
    if (confirmed) {
      detachManager({ manager_id: managerData.id }, {
        onSuccess: () => {
          toast.success("Manager removed successfully.");
          queryClient.invalidateQueries({ queryKey: ["me"] });
          queryClient.invalidateQueries({ queryKey: ["userDashboard"] });
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.message || "Failed to remove manager");
        }
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center p-12">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  if (!hasManager) {
    return (
      <div className="max-w-4xl mx-auto py-6 sm:py-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="text-center space-y-4 mb-8 sm:mb-12">
          <div className="inline-flex p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-blue-500/10 border border-blue-500/20 mb-2">
            <UserPlus className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight px-4">Connect with a Manager</h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-lg mx-auto leading-relaxed px-6">
            Assign a professional manager to your account to receive personalized investment strategies and portfolio oversight.
          </p>
        </div>

        <div className="glass-panel p-6 sm:p-10 rounded-3xl sm:rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden mx-4 sm:mx-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -ml-32 -mb-32" />

          <div className="relative z-10 max-w-md mx-auto space-y-8">
            <div className="space-y-3 text-center">
              <label className="text-blue-200/60 text-[10px] font-bold uppercase tracking-[0.2em]">Manager Access Identification</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                  <Search className="w-5 h-5 text-slate-500" />
                </div>
                <input
                  type="text"
                  placeholder="Enter Manager ID (e.g. MGR-1029)"
                  value={managerId}
                  onChange={(e) => setManagerId(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-mono tracking-wider shadow-inner"
                />
              </div>
              <p className="text-slate-600 text-[10px] italic">Your unique manager ID is provided by your assigned financial representative.</p>
            </div>

            <button
              onClick={handleAssign}
              disabled={!managerId.trim() || isAssigning}
              className="w-full group relative flex items-center justify-center p-[2px] rounded-2xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 rounded-2xl animate-gradient-x opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center justify-center gap-2 w-full bg-[#020617]/40 backdrop-blur-xl py-4 rounded-2xl text-white font-bold tracking-wide border border-white/10 group-hover:bg-transparent transition-colors">
                {isAssigning ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Verifying Credentials...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5" /> Assign Account Manager
                  </>
                )}
              </div>
            </button>

            <div className="pt-4 border-t border-white/5 flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                <Info className="w-5 h-5 text-amber-400" />
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                Once assigned, your financial representative will have unrestricted access to view your portfolio and suggest trade executions and buying and selling of stocks on your behalf. Your financial representative will not be able to execute trades without your approval or your consent inside our platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-1000">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-white font-black text-3xl tracking-tight">Active Management</h2>
          <p className="text-slate-500 text-sm">Professional portfolio oversight is currently active</p>
        </div>
        <button
          onClick={handleRemove}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-bold uppercase tracking-wider hover:bg-red-500/20 transition-all group"
        >
          <UserMinus className="w-4 h-4 group-hover:rotate-12 transition-transform" /> Remove Manager
        </button>
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-8">
        {/* Manager Profile Card */}
        <div className="w-full lg:w-96 space-y-6">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl sm:rounded-[2.5rem] border border-white/5 flex flex-col items-center text-center space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-blue-600/20 to-indigo-600/20" />

            <div className="relative pt-4">
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center border-4 border-[#020617] shadow-2xl group transition-transform hover:scale-105">
                <span className="text-white text-5xl font-black">{managerData.user.fullname.charAt(0).toUpperCase()}</span>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 rounded-full p-2 border-4 border-[#020617] text-white shadow-lg">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>

            <div className="relative">
              <h2 className="text-white font-black text-2xl tracking-tight">{managerData.user.fullname}</h2>
              <p className="text-blue-400/80 text-[10px] font-bold uppercase tracking-[0.25em] mt-1">{managerData.title || 'Senior Portfolio Manager'}</p>
            </div>

            <div className="flex gap-3 w-full">
              <button className="flex-1 py-4 bg-blue-600 text-white rounded-2xl text-xs font-black tracking-widest uppercase hover:bg-blue-700 transition shadow-xl shadow-blue-500/20 active:scale-95">
                Message {managerData.user.fullname.split(' ')[0]}
              </button>
              <button className="p-4 bg-white/5 text-slate-400 rounded-2xl border border-white/10 hover:bg-white/10 transition active:scale-95">
                <Phone className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-[2rem] border border-white/5 space-y-5">
             <h3 className="text-white/60 font-bold text-[10px] uppercase tracking-widest px-1">Secured Communication</h3>
             <div className="space-y-4">
                <div className="flex items-center gap-4 text-slate-400 group cursor-pointer">
                   <div className="p-2.5 bg-white/5 rounded-xl border border-white/5 group-hover:border-blue-500/30 transition-colors"><Mail className="w-4 h-4 text-blue-400/70" /></div>
                   <span className="text-xs font-medium group-hover:text-blue-300 transition-colors">{managerData.contact_email || managerData.user.email}</span>
                </div>
                <div className="flex items-center gap-4 text-slate-400">
                   <div className="p-2.5 bg-white/5 rounded-xl border border-white/5"><Calendar className="w-4 h-4 text-emerald-400/70" /></div>
                   <span className="text-xs font-medium">{managerData.availability || 'Available Mon-Fri, 9am-5pm EST'}</span>
                </div>
             </div>
          </div>
        </div>

        {/* Manager Details Area */}
        <div className="flex-1 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="glass-panel p-8 rounded-[2rem] border border-white/5 space-y-3 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3 opacity-10"><Award className="w-12 h-12 text-blue-400" /></div>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Industry Tenure</p>
              <div className="flex items-baseline gap-2">
                <span className="text-white text-4xl font-black">{managerData.years_experience !== null ? managerData.years_experience : '12+'}</span>
                <span className="text-slate-400 text-sm font-medium">Years</span>
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed line-clamp-2">Specializing in {managerData.specialization || 'quantitative tech & emerging market disruption'}.</p>
            </div>

            <div className="glass-panel p-8 rounded-[2rem] border border-white/5 space-y-3 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3 opacity-10"><MessageSquare className="w-12 h-12 text-emerald-400" /></div>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Success Rating</p>
              <div className="flex items-baseline gap-2">
                <span className="text-emerald-400 text-4xl font-black">{managerData.success_rate !== null ? managerData.success_rate : '98'}%</span>
                <span className="text-slate-400 text-sm font-medium">Positive</span>
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed">Top-tier satisfaction rating based on audited client reviews.</p>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-[2rem] border border-white/5 space-y-8 relative shadow-2xl">
            <div className="space-y-4">
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-blue-500" />
                 <h3 className="text-white font-black text-xl tracking-tight">Executive Summary</h3>
               </div>
               <p className="text-slate-400 text-sm leading-relaxed font-medium">
                 {managerData.bio || `${managerData.user.fullname} is an award-winning portfolio manager with a decade of experience in quantitative analysis and growth-focused investment strategies. Leading the growth equity division and managing client assets with a focus on sustainable long-term returns.`}
               </p>
            </div>

            <div className="h-px bg-white/5" />

            <div className="space-y-5">
               <h3 className="text-white/60 font-bold text-[10px] uppercase tracking-widest">Recent Performance Briefs</h3>
               <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 flex items-center justify-between hover:bg-white/[0.05] hover:border-blue-500/20 transition-all cursor-pointer group shadow-lg">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                        <MessageSquare className="w-6 h-6" />
                     </div>
                     <div>
                        <p className="text-white text-sm font-bold">Monthly Portfolio Intelligence</p>
                        <p className="text-slate-500 text-[10px] font-medium mt-0.5">{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric'})} • Published by {managerData.user.fullname}</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 group-hover:text-blue-400 transition-colors">
                    <span className="text-[10px] font-black uppercase tracking-widest">View Report</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerView;
