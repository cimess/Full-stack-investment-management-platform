import React from 'react';
import { ArrowLeftRight } from 'lucide-react';

const recentTransactions = [
  { id: 1, client: 'Alex Johnson', manager: 'Sarah M.', symbol: 'NVDA', type: 'buy', qty: 5, total: 3366.00, date: 'Feb 26', status: 'completed' },
  { id: 2, client: 'Priya Sharma', manager: 'Sarah M.', symbol: 'AAPL', type: 'sell', qty: 10, total: 1823.00, date: 'Feb 25', status: 'completed' },
  { id: 3, client: 'James Wilson', manager: 'Robert A.', symbol: 'TSLA', type: 'buy', qty: 4, total: 885.60, date: 'Feb 24', status: 'pending' },
  { id: 4, client: 'Maria Chen', manager: 'Sarah M.', symbol: 'MSFT', type: 'buy', qty: 6, total: 1791.00, date: 'Feb 23', status: 'completed' },
];

const TransactionsView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white font-bold text-2xl">Platform Transactions</h2>
        <p className="text-slate-500 text-sm">Real-time log of all trade activities across the platform</p>
      </div>

      <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5 bg-white/2">
                <th className="text-left text-slate-500 text-xs font-medium uppercase tracking-wider px-6 py-4">Client</th>
                <th className="text-left text-slate-500 text-xs font-medium uppercase tracking-wider px-4 py-4">Manager</th>
                <th className="text-center text-slate-500 text-xs font-medium uppercase tracking-wider px-4 py-4">Type</th>
                <th className="text-center text-slate-500 text-xs font-medium uppercase tracking-wider px-4 py-4">Stock</th>
                <th className="text-right text-slate-500 text-xs font-medium uppercase tracking-wider px-4 py-4">Total</th>
                <th className="text-left text-slate-500 text-xs font-medium uppercase tracking-wider px-4 py-4">Date</th>
                <th className="text-center text-slate-500 text-xs font-medium uppercase tracking-wider px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/3">
              {recentTransactions.map(tx => (
                <tr key={tx.id} className="hover:bg-white/2 transition-colors">
                  <td className="px-6 py-4 text-white text-sm font-medium">{tx.client}</td>
                  <td className="px-4 py-4 text-slate-400 text-sm">{tx.manager}</td>
                  <td className="px-4 py-4 text-center">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${tx.type === 'buy' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center text-white text-sm font-bold tracking-wider">{tx.symbol}</td>
                  <td className="px-4 py-4 text-right text-white text-sm font-semibold">${tx.total.toLocaleString()}</td>
                  <td className="px-4 py-4 text-slate-400 text-sm">{tx.date}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${tx.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                      {tx.status}
                    </span>
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

export default TransactionsView;
