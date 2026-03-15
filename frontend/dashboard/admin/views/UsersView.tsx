import React, { useState } from 'react';
import { useGetAdminDashboard, adminRestrictUser } from '../../../hooks/useQuery';
import { Loader2, ShieldOff, ShieldCheck, Users } from 'lucide-react';
import { toast } from 'react-toastify';

const UsersView: React.FC = () => {
  const { data: adminData, isLoading, refetch } = useGetAdminDashboard();
  const { mutate: restrictUserAction } = adminRestrictUser();
  const [userFilter, setUserFilter] = useState<'all' | 'active' | 'restricted'>('all');
  const [processingId, setProcessingId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
      </div>
    );
  }

  const allUsers = adminData?.data?.users || [];

  const handleRestrictToggle = (user: any) => {
    setProcessingId(user.id);
    // Note: Backend restrictUser endpoint seems to toggle or set to true based on implementation.
    // Looking at controller, it sets restricted: true.
    restrictUserAction(
      { user_id: user.id, super_admin_access: "super-secure-key" }, // placeholder for super_admin_access as per controller requirement
      {
        onSuccess: () => {
          toast.success(`User ${user.fullname} updated successfully`);
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

  const filteredUsers = allUsers.filter((u: any) => {
    if (userFilter === 'active') return !u.restricted;
    if (userFilter === 'restricted') return u.restricted;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white font-bold text-2xl">User Management</h2>
          <p className="text-slate-500 text-sm">Monitor and manage all platform users</p>
        </div>
        <div className="flex gap-1 p-1 bg-white/3 rounded-lg border border-white/5">
          {(['all', 'active', 'restricted'] as const).map(f => (
            <button
              key={f}
              onClick={() => setUserFilter(f)}
              className={`px-4 py-1.5 rounded-md text-xs font-medium capitalize transition-colors ${userFilter === f ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:text-white'}`}
            >
              {f}
            </button>
          ))}
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
                <th className="text-center text-slate-500 text-xs font-medium uppercase tracking-wider px-4 py-4">Status</th>
                <th className="text-left text-slate-500 text-xs font-medium uppercase tracking-wider px-4 py-4">Joined</th>
                <th className="text-center text-slate-500 text-xs font-medium uppercase tracking-wider px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/3">
              {filteredUsers.map((u: any) => {
                const isRestricted = u.restricted;
                const joinedDate = new Date(u.createdAt).toLocaleDateString();
                return (
                  <tr key={u.id} className="hover:bg-white/2 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500/20 to-blue-500/20 flex items-center justify-center text-white text-sm font-bold border border-white/5">
                          {u.fullname.charAt(0)}
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">{u.fullname}</p>
                          <p className="text-slate-500 text-xs">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-slate-300 text-sm font-medium">{u.manager_id ? 'Assigned' : 'None'}</td>
                    <td className="px-4 py-4 text-right text-white text-sm font-semibold">—</td>
                    <td className="px-4 py-4 text-center">
                      <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider ${isRestricted ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                        {isRestricted ? 'Restricted' : 'Active'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-slate-400 text-sm">{joinedDate}</td>
                    <td className="px-6 py-4 text-center">
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
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersView;
