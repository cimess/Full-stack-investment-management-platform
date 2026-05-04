// frontend/components/ReportProblemModal.tsx

import React, { useState, useEffect } from 'react';
import { X, AlertCircle, Send, ShieldAlert, Bug, HelpCircle, UserX } from 'lucide-react';
import { useReportProblem } from '../hooks/useQuery';
import { toast } from 'react-toastify';
import { useAnalytics } from '../hooks/useAnalysis';

interface ReportProblemModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetId?: string;
}

const ReportProblemModal: React.FC<ReportProblemModalProps> = ({ isOpen, onClose, targetId }) => {
  const [formData, setFormData] = useState({
    type: 'OTHER',
    subject: '',
    description: '',
  });

   const { trackEvent } = useAnalytics();
   
  const { mutate: reportMutation, isPending } = useReportProblem();

  // Handle successful submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
   
    trackEvent("USED REPORT PROBLEM MODAL", 
      { type: formData.type });

    reportMutation({ ...formData, targetId }, {
      onSuccess: () => {
        toast.success('Report submitted! Our team will investigate.');
        setFormData({ type: 'OTHER', subject: '', description: '' }); // Reset
        onClose(); // Close modal
      },
      onError: (error: any) => {
        const msg = error.response?.data?.message || 'Failed to submit report';
        toast.error(msg);
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-lg bg-[#0A0A0B] border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-red-500/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
              <ShieldAlert className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg tracking-tight">Report a Problem</h2>
              <p className="text-slate-500 text-xs">Target: {targetId ? "Manager / Entity" : "System"}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Problem Type Grid */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Problem Type</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                // Show "Report Manager" only if targetId exists
                ...(targetId ? [{ id: 'FRAUD', label: 'Report Manager', icon: <UserX className="w-3.5 h-3.5" /> }] : []),
                { id: 'BUG', label: 'Software Bug', icon: <Bug className="w-3.5 h-3.5" /> },
                { id: 'SERVICE', label: 'Service Issue', icon: <HelpCircle className="w-3.5 h-3.5" /> },
                { id: 'OTHER', label: 'Other', icon: <Send className="w-3.5 h-3.5" /> },
              ].map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, type: type.id })}
                  className={`flex items-center gap-2 px-4 py-3 rounded-2xl border text-xs font-semibold transition-all ${
                    formData.type === type.id 
                    ? 'bg-red-500/10 border-red-500/30 text-red-400' 
                    : 'bg-white/[0.02] border-white/5 text-slate-400'
                  }`}
                >
                  {type.icon}
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Subject & Description */}
          <div className="space-y-4">
            <input
              type="text"
              required
              placeholder="Subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-3 text-white focus:border-red-500/50"
            />
            <textarea
              required
              rows={4}
              placeholder="Please provide details..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-3 text-white focus:border-red-500/50 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="pt-2 flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 px-6 py-3.5 rounded-2xl bg-white/5 text-slate-300 font-bold text-xs uppercase">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-[1.5] px-6 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-xs uppercase"
            >
              {isPending ? 'Submitting...' : 'Submit Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportProblemModal;
