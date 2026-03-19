import React, { useState, useEffect } from 'react';
import { X, CheckCircle, XCircle, DollarSign, MessageSquare, AlertCircle, Loader2 } from 'lucide-react';

interface ExecutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: { price: number; response: string }) => void;
  request: any;
  status: 'APPROVED' | 'REJECTED';
  isProcessing: boolean;
}

const ExecutionModal: React.FC<ExecutionModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  request,
  status,
  isProcessing,
}) => {
  const [price, setPrice] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setPrice(request?.stock?.price?.toString() || '');
      setResponse(status === 'APPROVED' ? 'Trade approved and executed at market price.' : 'Trade request declined based on portfolio strategy.');
      setError(null);
    }
  }, [isOpen, request, status]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericPrice = parseFloat(price);
    
    if (status === 'APPROVED' && (isNaN(numericPrice) || numericPrice <= 0)) {
      setError('Please enter a valid execution price.');
      return;
    }

    if (!response.trim()) {
      setError('Please provide a response or reason for the client.');
      return;
    }

    onConfirm({
      price: status === 'APPROVED' ? numericPrice : 0,
      response: response.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="glass-panel w-full max-w-lg rounded-3xl border border-white/10 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className={`px-6 py-4 flex items-center justify-between border-b border-white/5 ${status === 'APPROVED' ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
              {status === 'APPROVED' ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-white font-bold">{status === 'APPROVED' ? 'Confirm Trade Execution' : 'Reject Trade Request'}</h3>
              <p className="text-slate-400 text-xs">Client: {request?.clientName}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Summary */}
          <div className="p-4 rounded-2xl bg-white/3 border border-white/5 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Requested Action</p>
              <p className="text-white font-bold">
                {request?.type} {request?.quantity} shares of {request?.stock?.symbol}
              </p>
            </div>
            <div className="text-right space-y-1">
              <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Current Market</p>
              <p className="text-white font-bold">${request?.stock?.price || '0.00'}</p>
            </div>
          </div>

          <div className="space-y-4">
            {status === 'APPROVED' && (
              <div className="space-y-2">
                <label className="text-slate-400 text-sm font-medium flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  Execution Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter exact execution price..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-all font-mono"
                  disabled={isProcessing}
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-slate-400 text-sm font-medium flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-400" />
                Manager Note
              </label>
              <textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Message to the client..."
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-all text-sm resize-none"
                disabled={isProcessing}
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs italic animate-in slide-in-from-top-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isProcessing}
              className="flex-1 py-3 rounded-xl border border-white/10 text-slate-400 font-bold hover:bg-white/5 transition-all text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className={`flex-1 py-3 rounded-xl font-black text-white text-sm shadow-xl transition-all flex items-center justify-center gap-2 ${
                status === 'APPROVED' 
                ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20' 
                : 'bg-red-500 hover:bg-red-600 shadow-red-500/20'
              } disabled:opacity-50`}
            >
              {isProcessing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                status === 'APPROVED' ? 'Execute Trade' : 'Reject Request'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExecutionModal;
