import React from 'react';
import { X, Globe, Building2, Calendar, Briefcase } from 'lucide-react';
import{StockCardProps} from '../types'
import { useNavigate } from 'react-router-dom';


const DetailsModal = ({ item, onClose,targetPath="/signup" }:{item:StockCardProps,onClose:()=>void,targetPath?:string}) => {

  const navigate=useNavigate();
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-2 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg sm:max-w-2xl bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] overflow-hidden flex flex-col max-h-[80vh] sm:max-h-[82vh] animate-in fade-in zoom-in-95 duration-300 ring-1 ring-white/5">

        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-5 border-b border-white/5 bg-white/5 backdrop-blur-sm flex-shrink-0">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden bg-gradient-to-br from-white/10 to-white/5 border border-white/10 shadow-inner p-1 flex-shrink-0">
              <img src={item.image} alt={item.label} className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 truncate">{item.label}</h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-xs font-medium text-emerald-400">
                  {item.symbol}
                </span>
                <span className="text-xs text-gray-400">{item.type}</span>
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
              { icon: Briefcase, label: 'Industry', value: item.stats?.industry },
              { icon: Building2, label: 'HQ', value: item.stats?.hq },
              { icon: Calendar, label: 'Founded', value: item.stats?.founded },
              { icon: Globe, label: 'CEO', value: item.stats?.ceo },
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

          {/* Financial Summary */}
          <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/5">
            <h3 className="text-sm sm:text-base font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-1 h-4 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
              Financial Summary
            </h3>
            <p className="text-gray-300 leading-relaxed text-xs sm:text-sm font-light tracking-wide">
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
        <div className="p-3 sm:p-4 border-t border-white/5 bg-black/20 backdrop-blur-md flex justify-end gap-2 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl font-semibold text-xs sm:text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10"
          >
            Close
          </button>
          <button
          onClick={()=>navigate(targetPath)}
          className="px-5 py-2 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] border border-emerald-400/20 transform hover:scale-105 active:scale-95"
          >
            Invest Now
          </button>
        </div>

      </div>
    </div>
  );
};

export default DetailsModal;
