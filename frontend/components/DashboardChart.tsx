import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, AreaSeries, LineSeries, HistogramSeries } from 'lightweight-charts';

export interface SeriesConfig {
  type: 'area' | 'line' | 'bar';
  data: any[];
  color: string;
  dataKey: string;
  title?: string;
}

interface DashboardChartProps {
  series: SeriesConfig[];
  height?: number;
  loading?: boolean;
}

const DashboardChart: React.FC<DashboardChartProps> = ({ 
  series, 
  height = 260, 
  loading = false 
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current || !series.length) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#64748b',
        fontSize: 11,
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { color: 'rgba(255, 255, 255, 0.05)' },
      },
      rightPriceScale: {
        visible: false,
      },
      leftPriceScale: {
        visible: false,
      },
      timeScale: {
        borderVisible: false,
        fixLeftEdge: true,
        fixRightEdge: true,
      },
      width: chartContainerRef.current.clientWidth,
      height: height,
      handleScroll: false,
      handleScale: false,
    });

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current?.clientWidth });
    };

    series.forEach((s) => {
      let seriesInst: any;
      if (s.type === 'area') {
        seriesInst = chart.addSeries(AreaSeries, {
          lineColor: s.color,
          topColor: `${s.color}33`,
          bottomColor: `${s.color}00`,
          lineWidth: 3,
        });
      } else if (s.type === 'line') {
        seriesInst = chart.addSeries(LineSeries, {
          color: s.color,
          lineWidth: 3,
        });
      } else if (s.type === 'bar') {
        seriesInst = chart.addSeries(HistogramSeries, {
          color: s.color,
        });
      }

      const formattedData = s.data.map((d, i) => ({
        time: i + 1,
        value: Number(d[s.dataKey] || 0),
      }));

      seriesInst.setData(formattedData);
    });

    chart.timeScale().fitContent();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [series, height]);

  return (
    <div className={`relative w-full transition-opacity duration-300 ${loading ? 'opacity-30' : 'opacity-100'}`}>
      <div ref={chartContainerRef} className="w-full" />
    </div>
  );
};

export default DashboardChart;
