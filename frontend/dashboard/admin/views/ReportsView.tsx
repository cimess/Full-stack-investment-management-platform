import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Search,
  Filter,
  MoreVertical,
  Trash2,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Mail,
  User,
  ExternalLink,
  ChevronDown,
  X
} from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

import { toast } from 'react-toastify';
import { useGetUserReports, useUpdateReportStatus, useDeleteReport } from "../../../hooks/useQuery"

interface Report {
  id: string;
  type: 'BUG' | 'FRAUD' | 'SERVICE' | 'OTHER';
  subject: string;
  description: string;
  status: 'PENDING' | 'SUCCESS' | 'REJECTED';
  createdAt: string;
  reporter: {
    id: string;
    fullname: string;
    email: string;
    roles: string[];
  };
}

const ReportsView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('ALL');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [resolutionNote, setResolutionNote] = useState('');
  const [workingStatus, setWorkingStatus] = useState<'PENDING' | 'SUCCESS' | 'REJECTED'>('PENDING');

  useEffect(() => {
    if (selectedReport) {
      setWorkingStatus(selectedReport.status as any);
    }
  }, [selectedReport]);

  const queryClient = useQueryClient();

  const { data: reportsData, isLoading, error } = useGetUserReports();
  const { mutate: updateStatus, isPending: isUpdatingStatus, error: updateStatusError, isSuccess: updateStatusSuccess } = useUpdateReportStatus();
  const { mutate: deleteReport, isPending: isDeletingReport, error: deleteReportError, isSuccess: deleteReportSuccess } = useDeleteReport();

  useEffect(() => {
    if (error) {
      toast.error((error as any).response?.data?.message || 'Failed to fetch reports');
    }
    if (updateStatusError) {
      toast.error((updateStatusError as any).response?.data?.message || 'Failed to update report');
    }
    if (deleteReportError) {
      toast.error((deleteReportError as any).response?.data?.message || 'Failed to delete report');
    }
    if (updateStatusSuccess) {
      toast.success('Report updated successfully');
    }
    if (deleteReportSuccess) {
      toast.success('Report deleted successfully');
    }
  }, [error, updateStatusError, deleteReportError, updateStatusSuccess, deleteReportSuccess])




  const filteredReports = reportsData?.data?.filter((report: any) => {
    const matchesSearch = report.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reporter.fullname.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'ALL' || report.type === filterType;
    return matchesSearch && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SUCCESS': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'PENDING': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      default: return 'text-red-400 bg-red-500/10 border-red-500/20';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'BUG': return <Search className="w-3 h-3" />;
      case 'FRAUD': return <AlertTriangle className="w-3 h-3" />;
      case 'SERVICE': return <Clock className="w-3 h-3" />;
      default: return <ShieldAlert className="w-3 h-3" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header & Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">System Reports</h1>
          <p className="text-slate-500 text-sm">Monitor and resolve system issues, fraud alerts, and bugs</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-4">
            <div className="text-center">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total</p>
              <p className="text-lg font-bold text-white">{reportsData?.data?.length || 0}</p>
            </div>
            <div className="w-px h-8 bg-white/5" />
            <div className="text-center">
              <p className="text-[10px] font-bold text-amber-500/80 uppercase tracking-widest">Pending</p>
              <p className="text-lg font-bold text-amber-400">{reportsData?.data?.filter((r: any) => r.status === 'PENDING').length || 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search by subject or reporter..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/50 transition-all"
          />
        </div>
        <div className="flex gap-2">
          {['ALL', 'BUG', 'FRAUD', 'SERVICE', 'OTHER'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${filterType === type
                  ? 'bg-purple-500/10 border-purple-500/30 text-purple-400'
                  : 'bg-white/[0.02] border-white/5 text-slate-500 hover:text-slate-300'
                }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Reports Table/Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-48 rounded-3xl bg-white/[0.02] animate-pulse border border-white/5" />
          ))}
        </div>
      ) : filteredReports?.length === 0 ? (
        <div className="py-20 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-3xl bg-white/[0.02] border border-white/5 flex items-center justify-center mb-4">
            <ShieldAlert className="w-8 h-8 text-slate-700" />
          </div>
          <h3 className="text-white font-bold text-lg">No reports found</h3>
          <p className="text-slate-500 text-sm max-w-xs">Everything looks clear. No active system reports match your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredReports?.map((report: any) => (
            <div
              key={report.id}
              className="group relative bg-[#0A0A0B] border border-white/5 rounded-3xl p-5 hover:border-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/5"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${getStatusColor(report.status)}`}>
                  {report.status}
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => setSelectedReport(report)}
                    className="p-2 rounded-xl bg-white/[0.02] border border-white/5 text-slate-500 hover:text-white hover:bg-white/5 transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this report?')) {
                        deleteReport(report.id, {
                          onSuccess: () => {
                            toast.success('Report deleted successfully');
                            queryClient.invalidateQueries({ queryKey: ['userReports'] });
                          }
                        });
                      }
                    }}
                    className="p-2 rounded-xl bg-white/[0.02] border border-white/5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all lg:opacity-0 lg:group-hover:opacity-100"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[10px] font-bold text-purple-400 uppercase tracking-[0.2em]">
                  {getTypeIcon(report.type)}
                  {report.type}
                </div>
                <h3 className="text-white font-bold leading-snug line-clamp-1">{report.subject}</h3>
                <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">
                  {report.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-[10px] font-bold text-white border border-white/5">
                    {report.reporter.fullname.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-white text-xs font-semibold truncate">{report.reporter.fullname}</p>
                    <p className="text-slate-600 text-[10px]">{new Date(report.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedReport(report)}
                  className="text-[10px] font-bold text-purple-400 hover:text-purple-300 transition-colors"
                >
                OPEN REPORT
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Report Management Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center px-4 ">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setSelectedReport(null)} />
          <div className="relative w-full max-w-2xl bg-[#0A0A0B] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="p-8 space-y-8 ">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-purple-400 text-[10px] font-bold uppercase tracking-[0.3em]">
                    <ShieldAlert className="w-3 h-3" />
                    Report Investigation
                  </div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">{selectedReport.subject}</h2>
                </div>
                <button onClick={() => setSelectedReport(null)} className="p-2 rounded-2xl bg-white/5 text-slate-400 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6 min-w-0">
                  <div className="p-5 rounded-3xl bg-white/[0.02] border border-white/5 space-y-4">
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Reporter Details</h4>
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-12 h-12 flex-shrink-0 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                        <User className="w-6 h-6 text-purple-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-white font-bold truncate">{selectedReport.reporter.fullname}</p>
                        <p className="text-slate-500 text-sm flex items-center gap-1.5 min-w-0">
                          <Mail className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{selectedReport.reporter.email}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">

                      <span className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                        {Array.isArray(selectedReport.reporter.roles) ? selectedReport.reporter.roles.join(', ') : selectedReport.reporter.roles}
                      </span>

                    </div>
                  </div>

                  <div className="p-5 rounded-3xl bg-white/[0.02] border border-white/5 space-y-2">
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Description</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {selectedReport.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Resolution Note</label>
                    <textarea
                      rows={4}
                      placeholder="Explain the findings or resolution steps..."
                      value={resolutionNote}
                      onChange={(e) => setResolutionNote(e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white text-sm focus:outline-none focus:border-purple-500/50 transition-all resize-none"
                    />
                    <p className="text-[10px] text-slate-500 italic px-1">* This note will be emailed to the user.</p>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Update Status</label>
                    <div className="flex flex-col gap-4">
                      {/* Status selector — explicit classes so Tailwind JIT compiles them */}
                      <div className="grid grid-cols-3 gap-2">
                        {/* Hold / Investigating */}
                        <button
                          type="button"
                          onClick={() => setWorkingStatus('PENDING')}
                          className={`px-3 py-2.5 rounded-xl text-[10px] font-bold border transition-all ${
                            workingStatus === 'PENDING'
                              ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 shadow-sm shadow-amber-500/10'
                              : 'bg-white/[0.02] border-white/5 text-slate-500 hover:text-slate-300 hover:border-white/10'
                          }`}
                        >
                          Pending
                        </button>

                        {/* Resolved */}
                        <button
                          type="button"
                          onClick={() => setWorkingStatus('SUCCESS')}
                          className={`px-3 py-2.5 rounded-xl text-[10px] font-bold border transition-all ${
                            workingStatus === 'SUCCESS'
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-sm shadow-emerald-500/10'
                              : 'bg-white/[0.02] border-white/5 text-slate-500 hover:text-slate-300 hover:border-white/10'
                          }`}
                        >
                          Resolved
                        </button>

                        {/* Rejected */}
                        <button
                          type="button"
                          onClick={() => setWorkingStatus('REJECTED')}
                          className={`px-3 py-2.5 rounded-xl text-[10px] font-bold border transition-all ${
                            workingStatus === 'REJECTED'
                              ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 shadow-sm shadow-rose-500/10'
                              : 'bg-white/[0.02] border-white/5 text-slate-500 hover:text-slate-300 hover:border-white/10'
                          }`}
                        >
                          Rejected
                        </button>
                      </div>

                      {/* Confirm button — matches blue/indigo brand gradient */}
                      <button
                        onClick={() => {
                          updateStatus({ reportId: selectedReport.id, status: workingStatus, resolutionNote }, {
                            onSuccess: () => {
                              toast.success('Report updated successfully');
                              queryClient.invalidateQueries({ queryKey: ['userReports'] });
                              setSelectedReport(null);
                              setResolutionNote('');
                            }
                          });
                        }}
                        disabled={isUpdatingStatus}
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-blue-900/30 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isUpdatingStatus ? 'Updating...' : 'Confirm Update'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsView;
