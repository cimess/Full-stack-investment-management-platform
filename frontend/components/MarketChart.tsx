import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, AreaSeries } from 'lightweight-charts';
import ScrollReveal from './ScrollReveal';

const data = [
  { time: '2024-01-01', value: 4000 },
  { time: '2024-02-01', value: 3000 },
  { time: '2024-03-01', value: 5000 },
  { time: '2024-04-01', value: 4500 },
  { time: '2024-05-01', value: 6000 },
  { time: '2024-06-01', value: 5500 },
  { time: '2024-07-01', value: 8000 },
];

const MarketChart: React.FC = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current?.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#555555',
        fontSize: 11,
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { color: 'rgba(255, 255, 255, 0.03)' },
      },
      rightPriceScale: {
        borderVisible: false,
        textColor: '#555555',
      },
      timeScale: {
        borderVisible: false,
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
      handleScroll: false,
      handleScale: false,
    });

    const series = chart.addSeries(AreaSeries, {
      lineColor: '#ffffff',
      topColor: 'rgba(255, 255, 255, 0.1)',
      bottomColor: 'rgba(255, 255, 255, 0)',
      lineWidth: 2,
    });

    series.setData(data as any);
    chart.timeScale().fitContent();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, []);

  return (
    <section id="market" className="py-32 bg-black relative">
        <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div>
                        <h2 className="text-4xl font-bold mb-3 tracking-tighter text-white">Market Performance</h2>
                        <p className="text-slate-500 font-medium">Live index tracking across major sectors.</p>
                    </div>
                    <div className="flex gap-3 bg-white/[0.03] p-1.5 rounded-2xl border border-white/10">
                        {['1D', '1W', '1M', '1Y'].map((t) => (
                           <button key={t} className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${t === '1M' ? 'bg-white text-black' : 'text-slate-500 hover:text-white'}`}>{t}</button>
                        ))}
                    </div>
                </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
                <div className="premium-card p-6 md:p-10 group overflow-hidden">
                    <div ref={chartContainerRef} className="w-full" />
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
                            <p className="premium-label mb-2 uppercase tracking-widest text-[10px] font-bold text-gray-500">{item.label}</p>
                            <div className="flex items-baseline justify-between">
                                <span className="text-xl font-bold font-mono tracking-tighter text-white">{item.val}</span>
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
