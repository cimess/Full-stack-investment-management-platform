import React, { useState } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useGetAdminDashboard, adminRestrictUser, useGenerateAccessKey } from '../../../hooks/useQuery';
import { Loader2, ShieldOff, ShieldCheck, Users, UserPlus, Copy, Check, X, ShieldAlert } from 'lucide-react';
import { toast } from 'react-toastify';

interface PromotionModalProps {
  user: any;
  type: 'manager' | 'admin';
  onClose: () => void;
  onSuccess: (code: string) => void;
}

const PromotionModal: React.FC<PromotionModalProps> = ({ user, type, onClose, onSuccess }) => {
  const [usedCode, setUsedCode] = useState(false);
  const [emailConfirm, setEmailConfirm] = useState(user.email);
  const { mutate: generateKey, isPending,data } = useGenerateAccessKey();
  console.log(data)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailConfirm) {
      toast.error("Please fill all fields");
      return;
    }
    if (emailConfirm.toLowerCase() !== user.email.toLowerCase()) {
      toast.error("Email confirmation does not match");
      return;
    }

    generateKey({ userid: user.id, role: type.toUpperCase() as any }, {
      onSuccess: (data: any) => {
        onSuccess(data.key);
      },
      onError: (err: any) => {
        if(err.status===409){
            toast.error(err.response?.data?.message || `Access code for ${type} already exists`);
          onSuccess(err.response?.data?.key);
          setUsedCode(true)
        return}
        toast.error(err.response?.data?.message || `Failed to generate ${type} code`);
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="glass-panel w-full max-w-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${type === 'manager' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}`}>
              <UserPlus className="w-4 h-4" />
            </div>
            <h3 className="text-white font-bold">Promote to {type.charAt(0).toUpperCase() + type.slice(1)}</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
       {usedCode && <div className="p-6 space-y-4">the code is  {data?.key}</div>}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-slate-400 text-xs font-medium uppercase tracking-wider">User Email Confirmation</label>
            <input 
              type="email" 
              value={emailConfirm}
              onChange={e => setEmailConfirm(e.target.value)}
              placeholder={"enter user email"}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/50" 
            />
          </div>
          <div className="space-y-2 ">
            <label className="text-slate-400 text-xs font-medium uppercase tracking-wider">Approval Code</label>
          </div>
          <button 
            type="submit"
            disabled={isPending}
            className={`w-full py-3 rounded-xl font-bold text-white transition-all shadow-lg flex items-center justify-center gap-2 ${type === 'manager' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 shadow-blue-500/20' : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 shadow-purple-500/20'}`}
          >
            {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : `Generate ${type.charAt(0).toUpperCase() + type.slice(1)} Access`}
          </button>
        </form>
      </div>
    </div>
  );
};

const UsersView: React.FC = () => {
  const { data: adminData, isLoading, refetch } = useGetAdminDashboard();
  const { mutate: restrictUserAction } = adminRestrictUser();
  const queryClient = useQueryClient();
  
  // Robust check for superadmin status using both current query and cache fallback
  const { data: meQueryData } = useQuery({ queryKey: ["me"] }) as any;
  const meCacheData = queryClient.getQueryData(["me"]) as any;

  const currentUser = meQueryData?.data || meCacheData?.data;
  
  const isSuperAdmin = currentUser?.admin?.super_admin === true;

  const [userFilter, setUserFilter] = useState<'all' | 'active' | 'restricted' | 'admins'>('all');
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [modalData, setModalData] = useState<{ user: any, type: 'manager' | 'admin' } | null>(null);
  const [activeCode, setActiveCode] = useState<{ id: string, code: string } | null>(null);
  const [copied, setCopied] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
      </div>
    );
  }

  const allUsers = adminData?.data?.users || [];
  const allAdmins = (adminData?.data?.admins || []).map((a: any) => ({
      ...a.user,
      id: a.user_id, // Normalize ID for existing components
      isAdminEntry: true,
      isSuperAdmin: a.super_admin
  }));

  const handleRestrictToggle = (user: any) => {
    setProcessingId(user.id);
    restrictUserAction(
      { user_id: user.id, super_admin_access: "super-secure-key" },
      {
        onSuccess: (data: any) => {
          toast.success(data.message || `User ${user.fullname} updated successfully`);
          refetch();
          setProcessingId(null);
        },
        onError: (err: any) => {
          toast.error(err.response?.data?.message || "Failed to update user");
          setProcessingId(null);
        }
      }
    );
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.info("Code copied to clipboard");
  };

  const filteredUsers = userFilter === 'admins' 
    ? allAdmins 
    : allUsers.filter((u: any) => {
        if (userFilter === 'active') return !u.restricted;
        if (userFilter === 'restricted') return u.restricted;
        return true;
      });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-white font-bold text-2xl">User Management</h2>
          <p className="text-slate-500 text-sm">Monitor and manage all platform users</p>
        </div>
        <div className="flex gap-1 p-1 bg-white/3 rounded-lg border border-white/5 self-start sm:self-center">
          {(['all', 'active', 'restricted'] as const).map(f => (
            <button
              key={f}
              onClick={() => setUserFilter(f)}
              className={`flex-1 sm:flex-none px-4 py-1.5 rounded-md text-xs font-medium capitalize transition-colors ${userFilter === f ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:text-white'}`}
            >
              {f}
            </button>
          ))}
          {isSuperAdmin && (
            <button
              onClick={() => setUserFilter('admins')}
              className={`flex-1 sm:flex-none px-4 py-1.5 rounded-md text-xs font-medium capitalize transition-colors ${userFilter === 'admins' ? 'bg-purple-500/20 text-purple-400' : 'text-slate-400 hover:text-white'}`}
            >
              Admins
            </button>
          )}
        </div>
      </div>

      <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5 bg-white/2">
                <th className="text-left text-slate-500 text-xs font-medium uppercase tracking-wider px-6 py-4">User</th>
                <th className="text-left text-slate-500 text-xs font-medium uppercase tracking-wider px-4 py-4">Manager</th>
                <th className="text-right text-slate-500 text-xs font-medium uppercase tracking-wider px-4 py-4">Portfolio</th>
                <th className="text-left text-slate-500 text-xs font-medium uppercase tracking-wider px-4 py-4">Status</th>
                <th className="text-left text-slate-500 text-xs font-medium uppercase tracking-wider px-4 py-4">Promotion</th>
                <th className="text-center text-slate-500 text-xs font-medium uppercase tracking-wider px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/3">
              {filteredUsers.map((u: any) => {
                const isRestricted = u.restricted;
                return (
                  <tr key={u.id} className="hover:bg-white/2 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold border border-white/5 ${u.isAdminEntry ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20' : 'bg-gradient-to-br from-emerald-500/20 to-blue-500/20'}`}>
                          {u.fullname.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-white text-sm font-medium">{u.fullname}</p>
                            {u.isSuperAdmin && (
                              <span className="text-[8px] bg-purple-500 text-white px-1 rounded font-bold uppercase">Super</span>
                            )}
                          </div>
                          <p className="text-slate-500 text-xs">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-slate-300 text-sm font-medium">{u.isAdminEntry ? 'N/A' : (u.manager_id ? 'Assigned' : 'None')}</td>
                    <td className="px-4 py-4 text-right text-white text-sm font-semibold">—</td>
                    <td className="px-4 py-4">
                      <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider ${isRestricted ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                        {isRestricted ? 'Restricted' : 'Active'}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-2">
                        {u.isAdminEntry ? (
                          <span className="text-slate-600 text-[10px] italic">No actions available</span>
                        ) : activeCode?.id === u.id ? (
                          <div className="flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 px-2 py-1 rounded-lg">
                            <span className="text-purple-400 font-mono text-xs">{activeCode.code}</span>
                            <button onClick={() => copyToClipboard(activeCode.code)} className="text-purple-400 hover:text-purple-300">
                              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            </button>
                            <button onClick={() => setActiveCode(null)} className="text-slate-500 hover:text-slate-300 ml-1">
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <button
                              disabled={processingId === u.id}
                              onClick={() => setModalData({ user: u, type: 'manager' })}
                              className="px-2 py-1 rounded bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/10 text-[10px] font-bold transition-all"
                            >
                              + Manager
                            </button>
                            <button
                              disabled={processingId === u.id}
                              onClick={() => setModalData({ user: u, type: 'admin' })}
                              className="px-2 py-1 rounded bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/10 text-[10px] font-bold transition-all"
                            >
                              + Admin
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {/* Super Admins cannot be restricted, and only Super Admins can restrict other Admins */}
                      {(!u.isSuperAdmin || !u.isAdminEntry) && (
                        <button
                          disabled={processingId === u.id}
                          onClick={() => handleRestrictToggle(u)}
                          className={`flex items-center gap-1.5 mx-auto px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                            isRestricted
                              ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20'
                              : 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20'
                          } disabled:opacity-50`}
                        >
                          {processingId === u.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : isRestricted ? <><ShieldCheck className="w-3.5 h-3.5" /> Unrestrict</> : <><ShieldOff className="w-3.5 h-3.5" /> Restrict</>}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {modalData && (
        <PromotionModal 
          user={modalData.user} 
          type={modalData.type} 
          onClose={() => setModalData(null)}
          onSuccess={(code) => {
            setActiveCode({ id: modalData.user.id, code });
            setModalData(null);
          }}
        />
      )}
    </div>
  );
};

export default UsersView;
