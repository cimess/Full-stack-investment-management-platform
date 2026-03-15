import React, { useState } from 'react';
import { useGetAdminDashboard, adminRestrictManager } from '../../../hooks/useQuery';
import { Loader2, ShieldOff, ShieldCheck, Briefcase } from 'lucide-react';
import { toast } from 'react-toastify';

const ManagersView: React.FC = () => {
  const { data: adminData, isLoading, refetch } = useGetAdminDashboard();
  const { mutate: restrictManagerAction } = adminRestrictManager();
  const [processingId, setProcessingId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
      </div>
    );
  }

  const allManagers = adminData?.data?.managers || [];

  const handleRestrictToggle = (manager: any) => {
    setProcessingId(manager.id);
    restrictManagerAction(
      { manager_id: manager.id, super_admin_access: "super-secure-key" },
      {
        onSuccess: () => {
          toast.success(`Manager ${manager.fullname} updated successfully`);
          refetch();
          setProcessingId(null);
        },
        onError: (err: any) => {
          toast.error(err.response?.data?.message || "Failed to update manager");
          setProcessingId(null);
        }
      }
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white font-bold text-2xl">Portfolio Managers</h2>
        <p className="text-slate-500 text-sm">Monitor manager reach, performance and compliances</p>
      </div>

      <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5 bg-white/2">
                <th className="text-left text-slate-500 text-xs font-medium uppercase tracking-wider px-6 py-4">Manager</th>
                <th className="text-right text-slate-500 text-xs font-medium uppercase tracking-wider px-4 py-4">Clients</th>
                <th className="text-right text-slate-500 text-xs font-medium uppercase tracking-wider px-4 py-4">AUM</th>
                <th className="text-right text-slate-500 text-xs font-medium uppercase tracking-wider px-4 py-4">Status</th>
                <th className="text-center text-slate-500 text-xs font-medium uppercase tracking-wider px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/3">
              {allManagers.map((m: any) => {
                const isRestricted = m.restricted;
                // Since backend doesn't provide client count directly in this specific object in dashboard data, 
                // we might need to point this out or if it's there use it.
                // Assuming it might be there as 'managedClients' count if the backend was updated or just show 0
                return (
                  <tr key={m.id} className="hover:bg-white/2 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-white text-sm font-bold border border-white/5">
                          {m.fullname.charAt(0)}
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">{m.fullname}</p>
                          <p className="text-slate-500 text-xs">{m.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right text-slate-300 text-sm font-medium">—</td>
                    <td className="px-4 py-4 text-right text-white text-sm font-semibold">—</td>
                    <td className="px-4 py-4 text-right">
                      <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider ${isRestricted ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                        {isRestricted ? 'Restricted' : 'Active'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        disabled={processingId === m.id}
                        onClick={() => handleRestrictToggle(m)}
                        className={`flex items-center gap-1.5 mx-auto px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          isRestricted
                            ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20'
                            : 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20'
                        } disabled:opacity-50`}
                      >
                        {processingId === m.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : isRestricted ? <><ShieldCheck className="w-3.5 h-3.5" /> Unrestrict</> : <><ShieldOff className="w-3.5 h-3.5" /> Restrict</>}
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

export default ManagersView;
