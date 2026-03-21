import React from 'react';
import { X, Globe, Building2, Calendar, Briefcase, TrendingUp } from 'lucide-react';
import{StockCardProps} from '../types'
import { useNavigate } from 'react-router-dom';


const DetailsModal = React.memo(({ 
  item, 
  onClose, 
  targetPath = "/signup",
  onConfirm,
  tradeType,
  isPending
}: {
  item: StockCardProps,
  onClose: () => void,
  targetPath?: string,
  onConfirm?: (id: string) => void,
  tradeType?: 'BUY' | 'SELL',
  isPending?: boolean
}) => {

  const navigate = useNavigate();
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-2 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg sm:max-w-2xl bg-black backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-500">

        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-5 border-b border-white/5 bg-white/5 backdrop-blur-sm flex-shrink-0">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl border border-white/10 p-1 flex-shrink-0">
              <img src={item.image} alt={item.label} className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="min-w-0">
              <h2 className="text-lg sm:text-2xl font-bold text-white tracking-tighter truncate">{item.label}</h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-medium text-emerald-400">
                  {item.symbol}
                </span>
                <span className="text-[10px] text-gray-500">{item.type}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="group p-1.5 sm:p-2 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 text-gray-400 hover:text-white transition-all duration-300 flex-shrink-0 ml-2"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-3 sm:p-5 space-y-3 sm:space-y-5 custom-scrollbar flex-1">

          {/* Key Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {[
              { 
                icon: Briefcase, 
                label: item.type === 'CRYPTO' ? 'Network' : 'Industry', 
                value: item.stats?.industry 
              },
              { 
                icon: Building2, 
                label: item.type === 'CRYPTO' ? 'Exchange' : 'HQ', 
                value: item.stats?.hq 
              },
              { 
                icon: Calendar, 
                label: item.type === 'CRYPTO' ? 'Protocol' : 'Founded', 
                value: item.stats?.founded 
              },
              { 
                icon: item.type === 'CRYPTO' ? TrendingUp : Globe, 
                label: item.type === 'CRYPTO' ? 'Market Rank' : 'CEO', 
                value: item.stats?.ceo 
              },
            ].map((stat, idx) => (
              <div key={idx} className="group p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300">
                <div className="flex items-center gap-1.5 mb-2 text-gray-400 text-xs group-hover:text-emerald-400 transition-colors">
                  <stat.icon className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span>{stat.label}</span>
                </div>
                <p className="font-semibold text-white truncate text-xs sm:text-sm" title={stat.value}>
                  {stat.value || 'N/A'}
                </p>
              </div>
            ))}
          </div>

          {/* Dynamic Summary Section */}
          <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/5">
            <h3 className="text-sm sm:text-base font-bold text-white mb-2 flex items-center gap-2">
              <span className={`w-1 h-4 rounded-full shadow-lg ${item.type === 'CRYPTO' ? 'bg-orange-500 shadow-orange-500/50' : 'bg-emerald-500 shadow-emerald-500/50'}`}></span>
              {item.type === 'CRYPTO' ? 'Coin Metrics' : 'Financial Summary'}
            </h3>
            <p className="text-gray-300 leading-relaxed text-xs sm:text-sm font-light tracking-wide italic">
              {item.financial}
            </p>
          </div>

          {/* About Section */}
          <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/5">
            <h3 className="text-sm sm:text-base font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-1 h-4 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
              About {item.label}
            </h3>
            <p className="text-gray-300 leading-relaxed text-xs sm:text-sm font-light tracking-wide">
              {item.about}
            </p>
          </div>

           {/* Additional Info */}
           {item.stats?.more && (
            <div className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/10 text-blue-200/80 text-xs backdrop-blur-sm">
              <p>{item.stats.more}</p>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-white/5 bg-white/[0.02] flex justify-end items-center gap-3 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-slate-400 hover:text-white transition-all"
          >
            Cancel
          </button>
          {onConfirm ? (
            <button
              onClick={() => onConfirm(item.id)}
              disabled={isPending}
              className={`px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-white transition-all active:scale-[0.98] disabled:opacity-50 ${
                tradeType === 'BUY' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-red-500 hover:bg-red-600'
              }`}
            >
              {isPending ? 'Processing...' : `Confirm ${tradeType === 'BUY' ? 'Purchase' : 'Sale'}`}
            </button>
          ) : (
            <button
              onClick={() => navigate(targetPath)}
              className="px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-black bg-white hover:bg-slate-200 transition-all active:scale-[0.98]"
            >
              Invest Now
            </button>
          )}
        </div>

      </div>
    </div>
  );
});

export default DetailsModal;
