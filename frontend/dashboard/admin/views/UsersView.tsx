import React, { useState } from 'react';
import { Users, ShieldOff, ShieldCheck } from 'lucide-react';

const allUsers = [
  { id: 1, name: 'Alex Johnson', email: 'alex@email.com', role: 'USER', portfolio: '$112,480', joined: 'Jan 2025', status: 'active', manager: 'Sarah Mitchell' },
  { id: 2, name: 'Maria Chen', email: 'maria@email.com', role: 'USER', portfolio: '$87,320', joined: 'Mar 2025', status: 'active', manager: 'Sarah Mitchell' },
  { id: 3, name: 'Tom Baker', email: 'tom@email.com', role: 'USER', portfolio: '$63,200', joined: 'Nov 2025', status: 'restricted', manager: 'None' },
  { id: 4, name: 'Priya Sharma', email: 'priya@email.com', role: 'USER', portfolio: '$230,100', joined: 'Aug 2024', status: 'active', manager: 'Sarah Mitchell' },
];

const UsersView: React.FC = () => {
  const [userFilter, setUserFilter] = useState<'all' | 'active' | 'restricted'>('all');
  const [restrictedMap, setRestrictedMap] = useState<Record<number, boolean>>({
    3: true,
  });

  const toggleRestrict = (id: number) => {
    setRestrictedMap(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredUsers = allUsers.filter(u => {
    if (userFilter === 'active') return !restrictedMap[u.id];
    if (userFilter === 'restricted') return restrictedMap[u.id];
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
              {filteredUsers.map(u => {
                const isRestricted = !!restrictedMap[u.id];
                return (
                  <tr key={u.id} className="hover:bg-white/2 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500/20 to-blue-500/20 flex items-center justify-center text-white text-sm font-bold border border-white/5">
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">{u.name}</p>
                          <p className="text-slate-500 text-xs">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-slate-300 text-sm font-medium">{u.manager}</td>
                    <td className="px-4 py-4 text-right text-white text-sm font-semibold">{u.portfolio}</td>
                    <td className="px-4 py-4 text-center">
                      <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider ${isRestricted ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                        {isRestricted ? 'Restricted' : 'Active'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-slate-400 text-sm">{u.joined}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => toggleRestrict(u.id)}
                        className={`flex items-center gap-1.5 mx-auto px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          isRestricted
                            ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20'
                            : 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20'
                        }`}
                      >
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

export default UsersView;
