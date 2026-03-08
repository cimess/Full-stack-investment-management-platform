import React from 'react';
import { Briefcase, ShieldOff, ShieldCheck } from 'lucide-react';

const allManagers = [
  { id: 1, name: 'Sarah Mitchell', email: 'sarah@email.com', clients: 4, aum: '$548,000', joined: 'Jan 2024', status: 'active', approved: 34 },
  { id: 2, name: 'Robert Adams', email: 'robert@email.com', clients: 7, aum: '$1,240,000', joined: 'Jun 2023', status: 'active', approved: 88 },
  { id: 3, name: 'Linda Park', email: 'linda@email.com', clients: 2, aum: '$310,500', joined: 'Feb 2025', status: 'restricted', approved: 12 },
];

const ManagersView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white font-bold text-2xl">Portfolio Managers</h2>
        <p className="text-slate-500 text-sm">Monitor manager reach, performance and compliance</p>
      </div>

      <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5 bg-white/2">
                <th className="text-left text-slate-500 text-xs font-medium uppercase tracking-wider px-6 py-4">Manager</th>
                <th className="text-right text-slate-500 text-xs font-medium uppercase tracking-wider px-4 py-4">Clients</th>
                <th className="text-right text-slate-500 text-xs font-medium uppercase tracking-wider px-4 py-4">AUM</th>
                <th className="text-right text-slate-500 text-xs font-medium uppercase tracking-wider px-4 py-4">Approved</th>
                <th className="text-center text-slate-500 text-xs font-medium uppercase tracking-wider px-4 py-4">Status</th>
                <th className="text-center text-slate-500 text-xs font-medium uppercase tracking-wider px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/3">
              {allManagers.map(m => {
                const isRestricted = m.status === 'restricted';
                return (
                  <tr key={m.id} className="hover:bg-white/2 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-white text-sm font-bold border border-white/5">
                          {m.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">{m.name}</p>
                          <p className="text-slate-500 text-xs">{m.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right text-slate-300 text-sm font-medium">{m.clients}</td>
                    <td className="px-4 py-4 text-right text-white text-sm font-semibold">{m.aum}</td>
                    <td className="px-4 py-4 text-right text-emerald-400 text-sm font-bold">{m.approved}</td>
                    <td className="px-4 py-4 text-center">
                      <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider ${isRestricted ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                        {m.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className={`flex items-center gap-1.5 mx-auto px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${isRestricted ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20'}`}>
                        {isRestricted ? <><ShieldCheck className="w-3.5 h-3.5" /> Unrestrict</> : <><ShieldOff className="w-3.5 h-3.5" /> Restrict</>}
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
