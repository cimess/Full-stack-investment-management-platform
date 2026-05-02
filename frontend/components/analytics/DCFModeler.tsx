import { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { calculateProfessionalDCF } from '../../workers/dcfcalculate';
import { useGetFundamentals } from '../../hooks/useQuery';
import { Search, Loader2, ArrowUpRight, ArrowDownRight, Info, Calculator } from 'lucide-react';
import { toast } from "react-toastify"
import PeerComparison from './peerComparison';
import HistoricalTrends from './HistoricalTrends';


export default function DCFModeler() {
    const location = useLocation();
    
    // 1. Assumption State (What the Manager controls)
    const [ticker, setTicker] = useState<string>(() => {
        const params = new URLSearchParams(location.search);
        return params.get('symbol')?.toUpperCase() || "";
    });
    const [revenueGrowth, setRevenueGrowth] = useState<number>(10); // Default 10%
    const [operatingMargin, setOperatingMargin] = useState<number>(20); // Default 20%
    const [discountRate, setDiscountRate] = useState<number>(9);
    const [terminalGrowth, setTerminalGrowth] = useState<number>(2.5);
    const [projectionYears, setProjectionYears] = useState<number>(5);
    const [reinvestmentMargin, setReinvestmentMargin] = useState<number>(5);

    // 2. Data Fetching
    const { mutate: getFundamentals, isPending: isLoading, data: fundamentalsResponse, error } = useGetFundamentals();
    const stockData = fundamentalsResponse?.data;

    // 3. Search Effect
    useEffect(() => {
        if (ticker.length < 1) return;
        const delaySearch = setTimeout(() => getFundamentals(ticker), 1200);
        return () => clearTimeout(delaySearch);
    }, [ticker, getFundamentals]);

    useEffect(() => {

        if (error) {

            // Important: Axios/Fetch errors are usually in error.response.data
            const message = (error as any)?.response?.data?.message || "Failed to fetch stock data";
            toast.info(`${message}  pls try again later`);
        }
    }, [error]);

    // 4. DCF Calculation Engine
    const dcfResult = useMemo(() => {
        if (!stockData) return null;

        return calculateProfessionalDCF({
            currentRevenue: stockData.currentRevenue,
            totalDebt: stockData.totalDebt,
            totalCash: stockData.totalCash,
            sharesOutstanding: stockData.sharesOutstanding,

            taxRate: 0.21,
            // These come from the sliders:
            revenueGrowthRate: revenueGrowth / 100,
            targetOperatingMargin: operatingMargin / 100,
            reinvestmentMargin: reinvestmentMargin / 100,
            years: projectionYears,
            discountRate: discountRate / 100,
            terminalGrowthRate: terminalGrowth / 100
        });
    }, [stockData, revenueGrowth, operatingMargin, discountRate, terminalGrowth, projectionYears, reinvestmentMargin]);

    // Comparison Logic
    const fairValue = dcfResult?.intrinsicValue || 0;
    const currentPrice = stockData?.currentPrice || 0;
    const upside = currentPrice > 0 ? ((fairValue - currentPrice) / currentPrice) * 100 : 0;
    const isUndervalued = upside > 0;

    return (
        <div className="flex flex-col gap-4 border border-white/10 rounded-2xl p-8 text-white max-w-4xl mx-auto shadow-2xl ">

            {/* Search Top Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-10 border-b border-white/5">
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search Symbol (e.g. MSFT)..."
                        value={ticker}
                        onChange={(e) => setTicker(e.target.value.toUpperCase())}
                        className="bg-white/[0.03] border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/50 w-full transition-all"
                    />
                </div>

                {stockData && (
                    <div className="flex gap-8 items-center">
                        
                        <div className="text-right">
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Market Price</p>
                            <p className="text-2xl font-mono">${currentPrice.toLocaleString()}</p>
                        </div>
                        <div className="h-10 w-[1px] bg-white/10 hidden md:block"></div>
                        <div className="text-right">
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Fair Value (DCF)</p>
                            <p className="text-3xl font-mono font-bold text-emerald-400">${fairValue.toFixed(2)}</p>
                        </div>
                    </div>
                )}
            </div>

            {isLoading ? (
                <div className="py-20 flex flex-col items-center justify-center text-slate-500">
                    <Loader2 className="w-8 h-8 animate-spin mb-4 text-emerald-500" />
                    <p className="text-sm font-medium animate-pulse">Syncing with SEC EDGAR...</p>
                </div>
            ) : !stockData ? (
                <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
                    <Info className="w-10 h-10 text-slate-700 mx-auto mb-4" />
                    <p className="text-slate-500 font-medium">Search for a company to begin professional valuation</p>
                </div>
            ) : (
                <>
                <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/5">
                            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                                <Calculator className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white tracking-tight">Discounted Cash Flow (DCF) Model</h3>
                                <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mt-1">
                                    Future Cash Flow Analysis
                                </p>
                            </div>
                        </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    

                    {/* Left: Interactive Controls */}
                    <div className="space-y-8">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">Modeling Assumptions</h3>

                        {/* Revenue Growth Slider and year slider*/}
                        <div className="grid grid-cols-2 gap-6">
                            <SliderControl
                                label="Revenue Growth (Annual)"
                                value={revenueGrowth}
                                min={-10} max={40} unit="%"
                                onChange={setRevenueGrowth}
                                description="Expected sales expansion per year."
                            />
                            <SliderControl
                                label="Projection Horizon"
                                value={projectionYears}
                                min={1}
                                max={10}
                                unit=" Years"
                                onChange={setProjectionYears}
                                description="The 'High Growth' window. Usually 5 or 10 years."
                            />
                        </div>
                        {/* Operating Margin Slider */}
                        <SliderControl
                            label="Target Operating Margin"
                            value={operatingMargin}
                            min={1} max={60} unit="%"
                            onChange={setOperatingMargin}
                            description="Profitability after operating expenses."
                        />

                        <div className="grid grid-cols-2 gap-6">


                            <SliderControl
                                label="WACC (Discount)"
                                value={discountRate}
                                min={5} max={15} step={0.5} unit="%"
                                onChange={setDiscountRate}
                            />
                            <SliderControl
                                label="Term. Growth"
                                value={terminalGrowth}
                                min={1} max={5} step={0.1} unit="%"
                                onChange={setTerminalGrowth}
                            />
                        </div>

                        <SliderControl
                            label="Reinvestment Margin"
                            value={reinvestmentMargin}
                            min={1} max={25} unit="%"
                            onChange={setReinvestmentMargin}
                            description="Portion of cash flow put back into the business."
                        />
                    </div>

                    {/* Right: Valuation Breakdown */}
                    <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Analysis Summary</h3>
                            <div className={`px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 ${upside > 0 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                                {upside > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                {Math.abs(upside).toFixed(1)}% {upside > 0 ? 'UPSIDE' : 'DOWNSIDE'}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <ValueRow label="Enterprise Value" value={dcfResult?.enterpriseValue} />
                            <ValueRow label="Total Debt" value={-stockData.totalDebt} isNegative />
                            <ValueRow label="Total Cash" value={stockData.totalCash} />
                            <div className="border-t border-white/5 pt-4 my-2">
                                <ValueRow label="Equity Value" value={dcfResult?.equityValue} isBold />
                            </div>
                        </div>

                        <div className="mt-10 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                            <p className="text-[10px] text-emerald-500/70 font-bold uppercase mb-2">Manager Verdict</p>
                            <p className="text-sm text-slate-300 leading-relaxed">
                                Based on a <span className="text-white font-bold">{revenueGrowth}%</span> growth rate,
                                this stock is currently <span className={`font-bold ${upside > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{isUndervalued ? 'Undervalued' : 'Overvalued'}</span>.
                            </p>
                        </div>
                    </div>
                </div>
                </>
            )}
            <HistoricalTrends symbol={ticker} />
            <PeerComparison symbol={ticker} />
        </div>
    );
}

// --- Helper Components for clean UI ---

function SliderControl({ label, value, min, max, unit, step = 1, onChange, description }: any) {
    return (
        <div className="group">
            <div className="flex justify-between items-center mb-3">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{label}</label>
                <span className="text-sm font-mono font-bold text-emerald-400">{value}{unit}</span>
            </div>
            <input
                type="range" min={min} max={max} step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-400 transition-all"
            />
            {description && <p className="text-[10px] text-slate-600 mt-2 italic">{description}</p>}
        </div>
    );
}

function ValueRow({ label, value, isNegative, isBold }: any) {
    return (
        <div className="flex justify-between items-center">
            <span className={`text-xs ${isBold ? 'text-white font-bold' : 'text-slate-400'}`}>{label}</span>
            <span className={`font-mono text-sm ${isBold ? 'text-lg text-emerald-400 font-bold' : isNegative ? 'text-rose-400' : 'text-slate-200'}`}>
                {isNegative ? '-' : ''}${Number(Math.abs(value)).toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </span>
        </div>
    );
}
