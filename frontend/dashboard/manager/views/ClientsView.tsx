import React, { useState } from 'react';
import { Eye, Search } from 'lucide-react';

const clients = [
  { id: 1, name: 'Alex Johnson', email: 'alex@email.com', portfolioValue: 112480, joined: 'Jan 2025', status: 'active', requests: 3 },
  { id: 2, name: 'Maria Chen', email: 'maria@email.com', portfolioValue: 87320, joined: 'Mar 2025', status: 'active', requests: 0 },
  { id: 3, name: 'James Wilson', email: 'james@email.com', portfolioValue: 54900, joined: 'Jun 2025', status: 'active', requests: 1 },
  { id: 4, name: 'Priya Sharma', email: 'priya@email.com', portfolioValue: 230100, joined: 'Aug 2024', status: 'active', requests: 2 },
  { id: 5, name: 'Tom Baker', email: 'tom@email.com', portfolioValue: 63200, joined: 'Nov 2025', status: 'restricted', requests: 0 },
];

const ClientsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'restricted'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClients = clients.filter(c => {
    const matchesTab = activeTab === 'all' || c.status === activeTab;
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-white font-bold text-2xl">Client Management</h2>
          <p className="text-slate-500 text-sm">Monitor and manage your portfolio clients</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50 w-64"
            />
          </div>
          <div className="flex gap-1 p-1 bg-white/3 rounded-lg border border-white/5">
            {(['all', 'active', 'restricted'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 rounded-md text-xs font-medium capitalize transition-colors ${activeTab === tab ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:text-white'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5 bg-white/2">
                <th className="text-left text-slate-500 text-xs font-medium uppercase tracking-wider px-6 py-4">Client</th>
                <th className="text-right text-slate-500 text-xs font-medium uppercase tracking-wider px-4 py-4">Portfolio Value</th>
                <th className="text-center text-slate-500 text-xs font-medium uppercase tracking-wider px-4 py-4">Status</th>
                <th className="text-center text-slate-500 text-xs font-medium uppercase tracking-wider px-4 py-4">Active Requests</th>
                <th className="text-left text-slate-500 text-xs font-medium uppercase tracking-wider px-4 py-4">Joined</th>
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-white/3">
              {filteredClients.map(c => (
                <tr key={c.id} className="hover:bg-white/2 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-white text-sm font-bold border border-white/5">
                        {c.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-white text-sm font-semibold">{c.name}</p>
                        <p className="text-slate-500 text-xs">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right text-white text-sm font-bold">
                    ${c.portfolioValue.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider ${c.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    {c.requests > 0
                      ? <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold ring-1 ring-inset ring-amber-500/20">{c.requests} pending</span>
                      : <span className="text-slate-600 text-sm">—</span>
                    }
                  </td>
                  <td className="px-4 py-4 text-slate-400 text-sm">{c.joined}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 rounded-lg bg-white/5 text-slate-400 hover:bg-emerald-500/10 hover:text-emerald-400 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClientsView;
