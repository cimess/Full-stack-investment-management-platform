import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid
} from 'recharts';
import { Activity, Users, Zap, AlertCircle, RefreshCw } from 'lucide-react';
import api from '../../../lib/axios';

interface AcquisitionData {
  source: string;
  count: number;
}

interface AnalyticsData {
  totalUsers: number;
  dau: number;
  topFeatures: { eventName: string; _count: { eventName: number } }[];
}

export default function AnalyticsView() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [acquisitionData, setAcquisitionData] = useState<AcquisitionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [analyticsRes, acquisitionRes] = await Promise.all([
        api.get('/admin/stream/overview'),
        api.get('/admin/acquisition-analytics')
      ]);

      if (analyticsRes.data.success) {
        setData(analyticsRes.data.data);
      }
      if (acquisitionRes.data.success) {
        setAcquisitionData(acquisitionRes.data.data);
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to load analytics dashboard.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  // Format data for Recharts
  const chartData = data?.topFeatures.map(f => ({
    name: f.eventName.replace(/_/g, ' ').toUpperCase(),
    events: f._count.eventName
  })) || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Analytics Engine</h2>
          <p className="text-slate-400 mt-1">Live telemetry and behavioral insights.</p>
        </div>
        <button 
          onClick={fetchAnalytics}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors border border-white/10"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {error ? (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-400" />
          <span className="text-red-200">{error}</span>
        </div>
      ) : isLoading ? (
        <div className="h-64 flex items-center justify-center border border-white/10 rounded-2xl bg-white/[0.02]">
          <div className="animate-spin w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full" />
        </div>
      ) : (
        <>
          {/* Top KPI Bento Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* DAU Metric */}
            <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                <Activity className="w-16 h-16 text-emerald-400" />
              </div>
              <p className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-2">Daily Active Users</p>
              <p className="text-5xl font-black text-white">{data?.dau}</p>
              <p className="text-xs text-emerald-400 mt-2 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live in last 24h
              </p>
            </div>

            {/* Total Users Metric */}
            <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                <Users className="w-16 h-16 text-blue-400" />
              </div>
              <p className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-2">Total Accounts</p>
              <p className="text-5xl font-black text-white">{data?.totalUsers}</p>
              <p className="text-xs text-blue-400 mt-2 font-medium">Verified platform users</p>
            </div>

            {/* Total Telemetry Triggers */}
            <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                <Zap className="w-16 h-16 text-purple-400" />
              </div>
              <p className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-2">Events Logged</p>
              <p className="text-5xl font-black text-white">
                 {data?.topFeatures.reduce((acc, curr) => acc + curr._count.eventName, 0) || 0}
              </p>
              <p className="text-xs text-purple-400 mt-2 font-medium">Across top features</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Main Chart Bento Box */}
            <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-6">Top Platform Interactions</h3>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="#94a3b8" 
                      fontSize={11} 
                      tickLine={false} 
                      axisLine={false}
                    />
                    <YAxis 
                      stroke="#94a3b8" 
                      fontSize={11} 
                      tickLine={false} 
                      axisLine={false}
                    />
                    <Tooltip 
                      cursor={{fill: 'rgba(255,255,255,0.02)'}}
                      contentStyle={{
                        backgroundColor: '#09090b',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px'
                      }}
                    />
                    <Bar dataKey="events" fill="#34d399" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Acquisition Source Chart */}
            <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white">Acquisition Sources</h3>
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-blue-500/10 text-blue-400 rounded-md">Growth Data</span>
              </div>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={acquisitionData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                    <XAxis type="number" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis type="category" dataKey="source" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ backgroundColor: '#09090b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                    <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
