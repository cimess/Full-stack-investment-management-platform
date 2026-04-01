import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, AreaSeries, ISeriesApi } from 'lightweight-charts';

interface PriceChartProps {
  data: { time: number; value: number }[];
  containerHeight?: number;
  isUp?: boolean;
}

const PriceChart: React.FC<PriceChartProps> = ({ data, containerHeight = 250, isUp = true }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const seriesRef = useRef<any>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const handleResize = () => {
      chartRef.current?.applyOptions({ width: chartContainerRef.current?.clientWidth });
    };

    const chartOptions = {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#555555',
        fontSize: 10,
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

    const series = chart.addSeries(AreaSeries, {
      lineColor: isUp ? '#10b981' : '#ef4444',
      topColor: isUp ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
      bottomColor: 'rgba(0, 0, 0, 0)',
      lineWidth: 2,
    });

    series.setData(data as any);
    chart.timeScale().fitContent();

    chartRef.current = chart;
    seriesRef.current = series;

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data, containerHeight, isUp]);

  return (
    <div className="w-full relative group">
      <div ref={chartContainerRef} className="w-full" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

export default PriceChart;
