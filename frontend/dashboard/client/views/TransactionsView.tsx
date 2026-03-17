import React from 'react';
import { ArrowUpRight, ArrowDownRight, Clock, Loader2 } from 'lucide-react';
import { getUserDashboard } from "../../../hooks/useQuery";

const TransactionsView: React.FC = () => {
  const { data, isLoading, isError } = getUserDashboard();

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center p-12">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    );
  }



  const transactions = [...(data?.data?.transactions || []), ...(data?.data?.trade_requests || [])]
    .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white font-bold text-2xl">Transaction History</h2>
        <p className="text-slate-500 text-sm">Review your past trades and pending requests</p>
      </div>

      <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
        {transactions.length === 0 ? (
          <div className="text-center p-12 text-slate-400 ">
            No transaction history found.
          </div>
        ) : (
          <>
            {/* Mobile Card View */}
            <div className="grid grid-cols-1 divide-y divide-white/5 md:hidden">
              {transactions.map((act: any) => {
                const isBuy = act.type === 'BUY';
                const price = act.price ? Number(act.price) : 0;
                const total = price ? price * act.quantity : 0;
                const status = act.status ? act.status.toLowerCase() : 'completed';
                const date = new Date(act.createdAt).toLocaleDateString();

                return (
                  <div key={act.id} className="p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isBuy ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'} border border-white/5`}>
                          {isBuy ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                        </div>
                        <div>
                          <p className="text-white font-bold">{act.type} {act.stock.symbol}</p>
                          <p className="text-slate-500 text-[10px] uppercase tracking-wider">{act.stock.company}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                          status === 'completed' || status === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                          : status === 'pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-red-500/10 text-red-400 border border-red-500/20'
                        }`}>
                          {status}
                        </span>
                        <p className="text-slate-500 text-[10px] mt-1">{date}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5">
                      <div>
                        <p className="text-slate-500 text-[10px] uppercase font-bold tracking-tighter">Quantity</p>
                        <p className="text-slate-300 text-xs font-medium">{act.quantity}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 text-[10px] uppercase font-bold tracking-tighter">Price</p>
                        <p className="text-white text-xs font-bold">${price.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-slate-500 text-[10px] uppercase font-bold tracking-tighter">Total</p>
                        <p className="text-emerald-400 text-xs font-bold">${total.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5 bg-white/2">
                    <th className="text-left text-slate-500 text-xs font-medium uppercase tracking-wider px-6 py-4">Transaction</th>
                    <th className="text-right text-slate-500 text-xs font-medium uppercase tracking-wider px-4 py-4">Quantity</th>
                    <th className="text-right text-slate-500 text-xs font-medium uppercase tracking-wider px-4 py-4">Price / Total Value</th>
                    <th className="text-left text-slate-500 text-xs font-medium uppercase tracking-wider px-4 py-4">Date</th>
                    <th className="text-center text-slate-500 text-xs font-medium uppercase tracking-wider px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/3">
                  {transactions.map((act: any) => {
                    const isBuy = act.type === 'BUY';
                    const price = act.price ? Number(act.price) : 0;
                    const total = price ? price * act.quantity : 0;
                    const status = act.status ? act.status.toLowerCase() : 'completed';
                    
                    return (
                      <tr key={act.id} className="hover:bg-white/2 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${isBuy ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'} border border-white/5`}>
                               {isBuy ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                            </div>
                            <div>
                              <p className="text-white text-sm font-semibold">{act.type} {act.stock.symbol}</p>
                              <p className="text-slate-500 text-xs">Market Order</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-right text-slate-300 text-sm">{act.quantity}</td>
                        <td className="px-4 py-4 text-right">
                           <p className="text-white text-sm font-bold">{total ? `$${total.toLocaleString()}` : '--'}</p>
                           {price > 0 && <p className="text-slate-500 text-xs">${price.toLocaleString()} per share</p>}
                        </td>
                        <td className="px-4 py-4 text-slate-400 text-sm text-left">
                           {new Date(act.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider ${
                            status === 'completed' || status === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                            : status === 'pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : 'bg-red-500/10 text-red-400 border border-red-500/20'
                          }`}>
                            {status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TransactionsView;
