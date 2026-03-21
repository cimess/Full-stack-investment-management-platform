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
    <section id="market" className="py-32 bg-black relative">
        <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div>
                        <h2 className="text-4xl font-bold mb-3 tracking-tighter">Market Performance</h2>
                        <p className="text-slate-500 font-medium">Live index tracking across major sectors.</p>
                    </div>
                    <div className="flex gap-3 bg-white/[0.03] p-1.5 rounded-2xl border border-white/10">
                        {['1D', '1W', '1M', '1Y'].map((t) => (
                           <button key={t} className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${t === '1D' ? 'bg-white text-black' : 'text-slate-500 hover:text-white'}`}>{t}</button>
                        ))}
                    </div>
                </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
                <div className="h-[450px] w-full premium-card p-6 md:p-10 group">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={data}
                            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ffffff" stopOpacity={0.1}/>
                                    <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                            <XAxis
                                dataKey="name"
                                stroke="#555555"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#555555', fontSize: 11, fontWeight: 600 }}
                                dy={15}
                            />
                            <YAxis
                                stroke="#555555"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#555555', fontSize: 11, fontWeight: 600 }}
                                tickFormatter={(value) => `$${value}`}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
                                itemStyle={{ color: '#ffffff', fontWeight: 700 }}
                                labelStyle={{ color: '#888888', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="#ffffff"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorValue)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </ScrollReveal>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
                {[
                    { label: "S&P 500", val: "4,783.45", change: "+1.2%" },
                    { label: "NASDAQ", val: "16,248.12", change: "+2.4%" },
                    { label: "DOW J", val: "37,542.89", change: "+0.8%" },
                    { label: "BTC/USD", val: "64,230.10", change: "+4.5%" }
                ].map((item, i) => (
                    <ScrollReveal key={i} delay={0.4 + (i * 0.1)}>
                        <div className="premium-card p-6 group hover:translate-y-[-2px]">
                            <p className="premium-label mb-2">{item.label}</p>
                            <div className="flex items-baseline justify-between">
                                <span className="text-xl font-bold font-mono tracking-tighter">{item.val}</span>
                                <span className="text-emerald-400 text-xs font-bold font-mono">{item.change}</span>
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
