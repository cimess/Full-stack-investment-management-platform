import { useGetStockPeers, useFetchStockDetails } from '../../hooks/useQuery';
import { Loader2, TrendingUp, AlertCircle, Building2 } from 'lucide-react';

export default function PeerComparison({ symbol }: { symbol: string }) {
    const { data: peerData, isLoading: peersLoading } = useGetStockPeers(symbol);
    
    // Safety check auto-fetch target details
    const { data: targetData } = useFetchStockDetails();
    
    if (peersLoading) {
        return (
            <div className="py-20 flex flex-col items-center justify-center text-slate-500 bg-white/[0.02] border border-white/10 rounded-2xl">
                <Loader2 className="w-8 h-8 animate-spin mb-4 text-emerald-500" />
                <p className="text-sm font-medium">Scanning sector for market peers...</p>
            </div>
        );
    }

    const peers = peerData?.data || [];

    if (peers.length === 0) {
        return (
            <div className="py-12 flex flex-col items-center text-center border border-dashed border-white/10 rounded-2xl bg-white/[0.01]">
                <AlertCircle className="w-10 h-10 text-slate-600 mb-4" />
                <p className="text-slate-400 font-medium">No direct peers found for {symbol}.</p>
                <p className="text-xs text-slate-500 mt-2">This usually happens for highly specialized assets.</p>
            </div>
        );
    }

    return (
        <div className="border border-white/10 rounded-2xl p-6 md:p-8 bg-black/40 backdrop-blur-xl shadow-2xl mt-8">
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/5">
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <Building2 className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">Sector Leaders & Peers</h3>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mt-1">
                        Relative Valuation Analysis
                    </p>
                </div>
            </div>

            <div className="overflow-x-auto custom-scrollbar pb-4">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b-2 border-white/10">
                            <th className="pb-4 pt-2 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Company</th>
                            <th className="pb-4 pt-2 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Market Cap</th>
                            <th className="pb-4 pt-2 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Price</th>
                            <th className="pb-4 pt-2 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">P/E Ratio</th>
                            <th className="pb-4 pt-2 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Div Yield</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {peers.map((peer: any, idx: number) => {
                            const isValuationLow = peer.peRatio && peer.peRatio > 0 && peer.peRatio < 20;
                            const isPositiveReturn = peer.changePercent && peer.changePercent >= 0;

                            return (
                                <tr key={peer.symbol} className="hover:bg-white/[0.03] transition-colors group">
                                    <td className="py-5 px-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                                <span className="text-xs font-bold text-slate-300">{peer.symbol.substring(0, 2)}</span>
                                            </div>
                                            <div>
                                                <p className="text-white font-bold tracking-tight">{peer.symbol}</p>
                                                <p className="text-[10px] text-slate-500 truncate max-w-[150px]">{peer.company}</p>
                                            </div>
                                        </div>
                                    </td>
                                    
                                    <td className="py-5 px-4 text-right">
                                        <span className="font-mono text-sm text-slate-300">
                                            {peer.displayMarketCap}
                                        </span>
                                    </td>
                                    
                                    <td className="py-5 px-4 text-right">
                                        <div className="flex justify-end items-center gap-2">
                                            <span className="font-mono text-sm text-white font-bold">
                                                {peer.displayPrice}
                                            </span>
                                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 ${isPositiveReturn ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                                                {isPositiveReturn ? '+' : ''}{Number(peer.changePercent || 0).toFixed(2)}%
                                            </span>
                                        </div>
                                    </td>
                                    
                                    {/* P/E Ratio with Color coding for Valuation */}
                                    <td className="py-5 px-4 text-right">
                                        {peer.peRatio ? (
                                            <span className={`font-mono text-sm font-bold ${isValuationLow ? 'text-emerald-400' : 'text-slate-300'}`}>
                                                {peer.peRatio.toFixed(2)}
                                            </span>
                                        ) : (
                                            <span className="text-slate-600 text-xs">-</span>
                                        )}
                                    </td>
                                    
                                    <td className="py-5 px-4 text-right">
                                        <span className="font-mono text-sm text-slate-300">
                                            {peer.dividendYield ? `${(peer.dividendYield * 100).toFixed(2)}%` : '-'}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            
            <div className="mt-6 pt-4 border-t border-white/5 flex items-start gap-3 p-4 bg-blue-500/5 rounded-xl">
                <TrendingUp className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-400 leading-relaxed">
                    <span className="text-white font-bold">Manager Tip:</span> Look for peers with a lower P/E ratio but similar or higher market caps, which could indicate a relative market undervaluation.
                </p>
            </div>
        </div>
    );
}
