import React from 'react';
import { ArrowUpRight, ArrowDownRight, Clock, Loader2 } from 'lucide-react';
import { getUserDashboard } from "../../../hooks/useQuery";
import { useVirtualizer } from '@tanstack/react-virtual';

const TransactionsView: React.FC = () => {

  const { data, isLoading, isError } = getUserDashboard();

  const parentRef = React.useRef<HTMLDivElement>(null);

  const transactions = React.useMemo(() => {
    // 1. Get all executed transactions (These always show as "Completed")
    const executed = data?.data?.transactions || [];

    // 2. Only show requests if they are still Pending or have been Rejected
    // Successful requests are already represented by the 'executed' transactions above
    const requests = (data?.data?.trade_requests || []).filter(
      (req: any) => req.status === 'PENDING' || req.status === 'REJECTED'
    );

    return [...executed, ...requests].sort(
      (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [data?.data?.transactions, data?.data?.trade_requests]);


  const virtualizer = useVirtualizer({
    count: transactions.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 72, // Rough estimate of row height
    overscan: 5,
  });

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center p-12">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    );
  }


  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white font-bold text-xl lg:text-2xl">Transaction History</h2>
        <p className="text-slate-500 text-xs lg:text-sm">Review your past trades and pending requests</p>
      </div>

      <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
        {transactions.length === 0 ? (
          <div className="text-center p-12 text-slate-400 ">
            No transaction history found.
          </div>
        ) : (
          <div ref={parentRef} className="max-h-[600px] overflow-auto scrollbar-hide">
            {/* Mobile Card View - Not virtualized for now to keep simplicity */}
            <div className="grid grid-cols-1 divide-y divide-white/5 md:hidden">
              {transactions.map((act: any) => {
                const isBuy = act.type === 'BUY';
                const price = act.price ? Number(act.price) : Number(act.stock?.price || 0);
                const total = price * act.quantity;
                const status = act.status ? act.status.toLowerCase() : 'completed';
                const date = new Date(act.createdAt).toLocaleDateString();

                return (
                  <div key={act.id} className="p-3.5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isBuy ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'} border border-white/5`}>
                          {isBuy ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm tracking-tight">{act.type} {act.stock.symbol}</p>
                          <p className="text-slate-500 text-[9px] uppercase tracking-wider font-bold">{act.stock.company}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${status === 'completed' || status === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
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

            {/* Desktop Table View - Virtualized */}

            <div className="hidden md:block">
              {/* Header */}
              <div className="flex items-center border-b border-white/5 bg-black sticky top-0 z-10 px-6 py-4">
                <div className="flex-[2] text-slate-500 text-xs font-medium uppercase tracking-wider">Transaction</div>
                <div className="flex-1 text-right text-slate-500 text-xs font-medium uppercase tracking-wider pr-8">Quantity</div>
                <div className="flex-1 text-right text-slate-500 text-xs font-medium uppercase tracking-wider pr-8">Price / Total</div>
                <div className="flex-1 text-left text-slate-500 text-xs font-medium uppercase tracking-wider">Date</div>
                <div className="w-24 text-center text-slate-500 text-xs font-medium uppercase tracking-wider">Status</div>
              </div>

              <div
                style={{ height: `${virtualizer.getTotalSize()}px`, position: 'relative' }}
              >
                {virtualizer.getVirtualItems().map((virtualRow) => {
                  const act = transactions[virtualRow.index];
                  const isBuy = act.type === 'BUY';
                  const price = act.price ? Number(act.price) : Number(act.stock?.price || 0);
                  const total = price * act.quantity;
                  const status = act.status ? act.status.toLowerCase() : 'completed';

                  return (
                    <div
                      key={virtualRow.key}
                      className="flex items-center px-6 py-4 hover:bg-white/2 transition-colors absolute top-0 left-0 w-full border-b border-white/[0.02]"
                      style={{ transform: `translateY(${virtualRow.start}px)`, height: `${virtualRow.size}px` }}
                    >
                      {/* Column 1: Info */}
                      <div className="flex-[2] flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${isBuy ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'} border border-white/5`}>
                          {isBuy ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                        </div>
                        <div>
                          <p className="text-white text-sm font-semibold">{act.type} {act.stock.symbol}</p>
                          <p className="text-slate-500 text-[10px] uppercase tracking-tight">{status === 'pending' || status === 'rejected' ? 'OTC Request' : 'Market Order'}</p>
                        </div>
                      </div>

                      {/* Column 2: Qty */}
                      <div className="flex-1 text-right pr-8 text-slate-300 text-sm font-mono">{act.quantity}</div>

                      {/* Column 3: Value */}
                      <div className="flex-1 text-right pr-8">
                        <p className="text-white text-sm font-bold">${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                        <p className="text-slate-500 text-[10px]">${price.toLocaleString(undefined, { minimumFractionDigits: 2 })} / share</p>
                      </div>

                      {/* Column 4: Date */}
                      <div className="flex-1 text-slate-400 text-sm">{new Date(act.createdAt).toLocaleDateString()}</div>

                      {/* Column 5: Status */}
                      <div className="w-24 flex justify-center">
                        <span className={`text-[9px] px-2 py-1 rounded-full font-bold uppercase tracking-wider ${status === 'completed' || status === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : status === 'pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              : 'bg-red-500/10 text-red-400 border border-red-500/20'
                          }`}>
                          {status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionsView;
