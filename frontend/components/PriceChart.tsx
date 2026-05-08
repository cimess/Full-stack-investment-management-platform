import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, AreaSeries, CandlestickSeries, ISeriesApi } from 'lightweight-charts';

interface PriceChartProps {
  data: any[];
  containerHeight?: number;
  isUp?: boolean;
  type?: 'area' | 'candles';
}

const PriceChart: React.FC<PriceChartProps> = ({ data, containerHeight = 250, isUp = true, type = 'area' }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const seriesRef = useRef<any>(null);

  useEffect(() => {
    if (!chartContainerRef.current || !data.length) return;

    const handleResize = () => {
      chartRef.current?.applyOptions({ width: chartContainerRef.current?.clientWidth });
    };

    const chartOptions = {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#64748b',
        fontSize: 10,
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { color: 'rgba(255, 255, 255, 0.03)' },
      },
      rightPriceScale: {
        borderVisible: false,
        textColor: '#64748b',
      },
      timeScale: {
        borderVisible: false,
        fixLeftEdge: true,
        fixRightEdge: true,
      },
      crosshair: {
        vertLine: {
          color: 'rgba(255, 255, 255, 0.2)',
          labelBackgroundColor: '#000000',
        },
        horzLine: {
          color: 'rgba(255, 255, 255, 0.2)',
          labelBackgroundColor: '#000000',
        },
      },
      handleScroll: false,
      handleScale: false,
    };

    const chart = createChart(chartContainerRef.current, {
      ...chartOptions as any,
      width: chartContainerRef.current.clientWidth,
      height: containerHeight,
    });

    let series: any;
    if (type === 'candles') {
      series = chart.addSeries(CandlestickSeries, {
        upColor: '#10b981',
        downColor: '#ef4444',
        borderVisible: false,
        wickUpColor: '#10b981',
        wickDownColor: '#ef4444',
      });
      
      // Map data for candlesticks
      const candleData = data.map(d => ({
        time: d.time,
        open: d.open || d.value,
        high: d.high || d.value,
        low: d.low || d.value,
        close: d.close || d.value,
      }));
      series.setData(candleData);
    } else {
      series = chart.addSeries(AreaSeries, {
        lineColor: isUp ? '#10b981' : '#ef4444',
        topColor: isUp ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
        bottomColor: 'rgba(0, 0, 0, 0)',
        lineWidth: 2,
      });
      series.setData(data);
    }

    chart.timeScale().fitContent();

    const tooltip = document.createElement('div');
    tooltip.className = 'absolute z-50 p-3 bg-slate-950/90 border border-white/10 rounded-xl text-[10px] text-white pointer-events-none hidden backdrop-blur-md';
    tooltip.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.5)';
    chartContainerRef.current?.appendChild(tooltip);

    chart.subscribeCrosshairMove((param) => {
      if (!param.time || param.point === undefined || !param.seriesData.size) {
        tooltip.style.display = 'none';
        return;
      }

      const seriesData = param.seriesData.get(series);
      if (seriesData) {
        tooltip.style.display = 'block';
        tooltip.style.left = `${param.point.x + 15}px`;
        tooltip.style.top = `${param.point.y + 15}px`;
        
        if (type === 'candles') {
          const d = seriesData as any;
          tooltip.innerHTML = `
            <div class="flex flex-col gap-1">
              <div class="flex justify-between gap-4"><span class="text-slate-500 uppercase font-bold">Open</span> <span class="font-mono">$${d.open.toFixed(2)}</span></div>
              <div class="flex justify-between gap-4"><span class="text-slate-500 uppercase font-bold">High</span> <span class="text-emerald-400 font-mono">$${d.high.toFixed(2)}</span></div>
              <div class="flex justify-between gap-4"><span class="text-slate-500 uppercase font-bold">Low</span> <span class="text-rose-400 font-mono">$${d.low.toFixed(2)}</span></div>
              <div class="flex justify-between gap-4"><span class="text-slate-500 uppercase font-bold">Close</span> <span class="font-mono text-white">$${d.close.toFixed(2)}</span></div>
            </div>
          `;
        } else {
          const d = seriesData as any;
          tooltip.innerHTML = `
            <div class="font-bold text-slate-500 uppercase mb-0.5">Price</div>
            <div class="text-white font-mono text-sm">$${d.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
          `;
        }
      }
    });

    chartRef.current = chart;
    seriesRef.current = series;

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      tooltip.remove();
      chart.remove();
    };
  }, [data, containerHeight, isUp, type]);

  return (
    <div className="w-full relative group">
      <div ref={chartContainerRef} className="w-full" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

export default PriceChart;
