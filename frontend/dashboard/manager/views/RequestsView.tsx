import React, { useState } from 'react';
import { CheckCircle, XCircle, TrendingUp, ArrowLeftRight, Clock } from 'lucide-react';
import ExecutionModal from '../../../components/ui/ExecutionModal';
import { useGetManagerDashboard, handleUserRequest } from '../../../hooks/useQuery';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

const RequestsView: React.FC = () => {
  const { data: managerData, isLoading, refetch } = useGetManagerDashboard();
  const { mutate: handleTradeAction } = handleUserRequest();
  const [processingId, setProcessingId] = useState<string | null>(null);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [actionType, setActionType] = useState<'APPROVED' | 'REJECTED'>('APPROVED');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  const clients = managerData?.data || [];
  
  
  // Extract pending requests from all clients
  const pendingRequests = clients.flatMap((client: any) => 
    (client.portfolio?.trade_request || [])
      .filter((req: any) => req.status === 'PENDING')
      .map((req: any) => ({
        ...req,
        clientName: client.fullname,
        total: req.quantity * (req.stock?.price || 0)
      }))
  ).sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
console.log(pendingRequests)
  const handleActionClick = (request: any, type: 'APPROVED' | 'REJECTED') => {
    setSelectedRequest(request);
    setActionType(type);
    setIsModalOpen(true);
  };

  const handleConfirmExecution = (data: { price: number; response: string }) => {
    if (!selectedRequest) return;
    
    if(actionType==="APPROVED"){
      if(!data.price||!data.response){
        toast.error("Please insert price and response in input field");
        return;
      }
    }else{
      if(!data.response){
        toast.error("Please insert response in input field");
        return;
      }
    }
    setProcessingId(selectedRequest.id);
    handleTradeAction(
      { 
        requestId: selectedRequest.id, 
        status: actionType, 
        response: data.response,
        price: data.price
      },
      {
        onSuccess: () => {
          toast.success(`Trade ${actionType.toLowerCase()} successfully`);
          refetch();
          setProcessingId(null);
          setIsModalOpen(false);
        },
        onError: (err: any) => {
          toast.error(err.response?.data?.message || "Failed to process request");
          setProcessingId(null);
        }
      }
    );
  };

  const getTimeAgo = (date: string) => {
    const diff = new Date().getTime() - new Date(date).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-white font-bold text-2xl">Trade Requests</h2>
          <p className="text-slate-500 text-sm">Review and execute orders from your active clients</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-xl self-start sm:self-center">
           <Clock className="w-4 h-4 text-amber-500" />
           <span className="text-amber-500 text-sm font-bold">{pendingRequests.length} Pending Approval</span>
        </div>
      </div>

      <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
        <div className="divide-y divide-white/3">
          {pendingRequests.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-slate-500">No pending trade requests at the moment.</p>
            </div>
          ) : (
            pendingRequests.map((req: any) => (
              <div key={req.id} className="flex flex-col md:flex-row md:items-center gap-4 px-6 py-5 hover:bg-white/2 transition-colors group">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${req.type === 'BUY' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'} border border-white/5`}>
                  {req.type === 'BUY' ? <TrendingUp className="w-6 h-6" /> : <ArrowLeftRight className="w-6 h-6" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="text-white text-lg font-bold">{req.clientName}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest ${req.type === 'BUY' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                      {req.type}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-400 text-sm">
                    <span className="flex items-center gap-1.5"><strong className="text-slate-200">{req.quantity}</strong> {req.stock?.symbol}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-700 md:block hidden" />
                    <span>Price: <strong className="text-slate-200">${(req.stock?.price || 0)}</strong></span>
                    <span className="w-1 h-1 rounded-full bg-slate-700 md:block hidden" />
                    <span>Total: <strong className="text-white font-bold">${req.total}</strong></span>
                  </div>
                  <p className="text-slate-600 text-xs mt-2 font-medium">Requested {getTimeAgo(req.createdAt)}</p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    disabled={processingId === req.id}
                    onClick={() => handleActionClick(req, 'REJECTED')}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 text-slate-400 border border-white/10 text-sm font-bold hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition-all disabled:opacity-50"
                  >
                    <XCircle className="w-4 h-4" /> Reject
                  </button>
                  <button
                    disabled={processingId === req.id}
                    onClick={() => handleActionClick(req, 'APPROVED')}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-white text-sm font-black hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50"
                  >
                    {processingId === req.id && !isModalOpen ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                    Approve
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <ExecutionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmExecution}
        request={selectedRequest}
        status={actionType}
        isProcessing={processingId === selectedRequest?.id}
      />
    </div>
  );
};

export default RequestsView;

