import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ScrollReveal from './ScrollReveal';

const data = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
  { name: 'Jul', value: 8000 },
];

const MarketChart: React.FC = () => {
  return (
    <section id="market" className="py-24 bg-surface relative">
        <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">Market Performance</h2>
                        <p className="text-slate-400">Live index tracking across major sectors.</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="px-4 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm font-medium border border-emerald-500/20">1D</button>
                        <button className="px-4 py-2 rounded-lg bg-white/5 text-slate-400 hover:text-white text-sm font-medium transition-colors">1W</button>
                        <button className="px-4 py-2 rounded-lg bg-white/5 text-slate-400 hover:text-white text-sm font-medium transition-colors">1M</button>
                        <button className="px-4 py-2 rounded-lg bg-white/5 text-slate-400 hover:text-white text-sm font-medium transition-colors">1Y</button>
                    </div>
                </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
                <div className="h-[400px] w-full glass-panel rounded-2xl p-4 md:p-8 border border-white/5 spotlight group">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={data}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                </linearGradient>
                                <filter id="glow" height="300%" width="300%" x="-100%" y="-100%">
                                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                                    <feMerge>
                                        <feMergeNode in="coloredBlur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                            <XAxis
                                dataKey="name"
                                stroke="#64748b"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#64748b', fontSize: 12 }}
                                dy={10}
                            />
                            <YAxis
                                stroke="#64748b"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#64748b', fontSize: 12 }}
                                tickFormatter={(value) => `$${value}`}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                                itemStyle={{ color: '#10b981' }}
                                labelStyle={{ color: '#94a3b8' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="#10b981"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorValue)"
                                style={{ filter: 'drop-shadow(0px 0px 8px rgba(16, 185, 129, 0.4))' }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </ScrollReveal>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                {[
                    { label: "S&P 500", val: "4,783.45", change: "+1.2%" },
                    { label: "NASDAQ", val: "16,248.12", change: "+2.4%" },
                    { label: "DOW J", val: "37,542.89", change: "+0.8%" },
                    { label: "BTC/USD", val: "64,230.10", change: "+4.5%" }
                ].map((item, i) => (
                    <ScrollReveal key={i} delay={0.4 + (i * 0.1)}>
                        <div className="bg-white/5 rounded-xl p-4 border border-white/5 hover:border-emerald-500/30 transition-colors">
                            <p className="text-slate-400 text-sm mb-1">{item.label}</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-xl font-bold">{item.val}</span>
                                <span className="text-emerald-400 text-xs font-medium">{item.change}</span>
                            </div>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </div>
    </section>
  );
};

export default MarketChart;
