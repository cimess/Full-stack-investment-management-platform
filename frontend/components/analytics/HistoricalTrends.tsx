import { useGetHistoricalFundamentals } from '../../hooks/useQuery';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import { Loader2, TrendingUp, AlertCircle } from 'lucide-react';

interface HistoricalTrendsProps {
    symbol: string;
}

export default function HistoricalTrends({ symbol }: HistoricalTrendsProps) {
    const { data: response, isLoading } = useGetHistoricalFundamentals(symbol);
    const fundamentalData = response?.data || [];

    if (isLoading) {
        return (
            <div className="py-12 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-2xl bg-white/[0.01] mt-8">
                <Loader2 className="w-8 h-8 animate-spin mb-4 text-emerald-500" />
                <p className="text-sm text-slate-400">Loading historical performance...</p>
            </div>
        );
    }

    if (!fundamentalData || fundamentalData.length === 0) {
        return (
            <div className="py-12 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-2xl bg-white/[0.01] mt-8">
                <AlertCircle className="w-8 h-8 mb-4 text-slate-600" />
                <p className="text-sm text-slate-400">Historical performance data not available for this asset.</p>
            </div>
        );
    }

    const formatCurrency = (val: number) => {
        // Formatting to Billions
        return `$${(val / 1000000000).toFixed(1)}B`;
    };

    return (
        <div className="border border-white/10 rounded-2xl p-8 bg-white/[0.01] shadow-xl mt-8">
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/5">
                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <TrendingUp className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">Enterprise Performance</h3>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mt-1">
                        Historical Revenue & Earnings
                    </p>
                </div>
            </div>

            <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={fundamentalData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                        <XAxis 
                            dataKey="year" 
                            stroke="#ffffff50" 
                            tick={{ fill: '#ffffff50', fontSize: 12 }} 
                            axisLine={false} 
                            tickLine={false}
                            dy={10} 
                        />
                        <YAxis 
                            yAxisId="left"
                            tickFormatter={formatCurrency} 
                            stroke="#ffffff50" 
                            tick={{ fill: '#ffffff50', fontSize: 12 }} 
                            axisLine={false} 
                            tickLine={false} 
                            dx={-10}
                        />
                        <YAxis 
                            yAxisId="right" 
                            orientation="right" 
                            tickFormatter={formatCurrency} 
                            stroke="#ffffff50" 
                            tick={{ fill: '#ffffff50', fontSize: 12 }} 
                            axisLine={false} 
                            tickLine={false} 
                            dx={10}
                        />
                        <Tooltip
                            cursor={{ fill: 'rgba(255, 255, 255, 0.03)', radius: 8 }}
                            contentStyle={{ 
                                backgroundColor: '#0f172a', 
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '12px',
                                padding: '12px',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
                            }}
                            formatter={(value: any) => {
                                return [formatCurrency(Number(value)), ''];
                            }}
                            labelStyle={{ color: '#94a3b8', fontWeight: 'bold', marginBottom: '8px' }}
                        />
                        <Legend 
                            wrapperStyle={{ paddingTop: '20px' }}
                            iconType="circle"
                        />
                        <Bar 
                            yAxisId="left" 
                            dataKey="revenue" 
                            name="Annual Revenue" 
                            fill="#60a5fa" 
                            radius={[6, 6, 0, 0]} 
                            barSize={30}
                        />
                        <Bar 
                            yAxisId="right" 
                            dataKey="netIncome" 
                            name="Net Income" 
                            fill="#34d399" 
                            radius={[6, 6, 0, 0]} 
                            barSize={30}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
