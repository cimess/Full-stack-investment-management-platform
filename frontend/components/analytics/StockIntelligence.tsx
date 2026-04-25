import React from 'react';
import { ShieldAlert, TrendingUp, AlertCircle, ExternalLink, Clock } from 'lucide-react';

interface NewsItem {
  title: string;
  publisher: string;
  link: string;
  publishTime: string | number;
  thumbnail?: string;
}

interface AnalystRatings {
  period: string;
  strongBuy: number;
  buy: number;
  hold: number;
  sell: number;
  strongSell: number;
}

interface StockIntelligenceProps {
  intelligence: {
    analystRatings: AnalystRatings | null;
    news: NewsItem[];
  };
  symbol: string;
  isManager: boolean;
}

export const StockIntelligence: React.FC<StockIntelligenceProps> = ({ intelligence, symbol, isManager }) => {
  if (!intelligence) return null;

  const { analystRatings, news } = intelligence;

  // Calculate rating percentages for the progress bars
  const totalRatings = analystRatings 
    ? (analystRatings.strongBuy || 0) + 
      (analystRatings.buy || 0) + 
      (analystRatings.hold || 0) + 
      (analystRatings.sell || 0) + 
      (analystRatings.strongSell || 0) 
    : 0;

  // HIDE COMPONENT COMPLETELY IF NO NEWS AND NO RATINGS
  if (totalRatings === 0 && (!news || news.length === 0)) {
    return null;
  }

  const getPercentage = (val: number) => totalRatings > 0 ? `${(val / totalRatings) * 100}%` : '0%';

  // Calculate a "Consensus String"
  let consensus = "Unknown";
  let consensusColor = "text-gray-400";
  if (totalRatings > 0 && analystRatings) {
    const buyPower = analystRatings.strongBuy + analystRatings.buy;
    const sellPower = analystRatings.strongSell + analystRatings.sell;
    if (buyPower > sellPower * 2 && buyPower > analystRatings.hold) {
      consensus = "Strong Buy";
      consensusColor = "text-green-500";
    } else if (buyPower > sellPower && buyPower > analystRatings.hold) {
      consensus = "Buy";
      consensusColor = "text-emerald-400";
    } else if (sellPower > buyPower && sellPower > analystRatings.hold) {
      consensus = "Sell";
      consensusColor = "text-rose-500";
    } else {
      consensus = "Hold";
      consensusColor = "text-yellow-500";
    }
  }

  const formatTime = (time: string | number) => {
    if (!time) return '';
    const date = new Date(typeof time === 'number' && time < 10000000000 ? time * 1000 : time);
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  return (
    <div className="mt-8 space-y-6">
      
   

      <div className="grid grid-cols-1 gap-6">
        
        {/* LEFT PANEL: Institutional Analyst Ratings */}
        {analystRatings && totalRatings > 0 && (
          <div className="bg-[#1C1F26]/60 backdrop-blur-md rounded-2xl border border-gray-800/80 p-6 flex flex-col relative overflow-hidden">
               {/* Decorative Background Blob */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl" />
            
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6">Analyst Consensus</h4>
            
            <div className="space-y-6 relative z-10">
              <div className="flex items-end gap-3 mb-2">
                <span className={`text-4xl font-extrabold ${consensusColor} tracking-tight`}>
                  {consensus}
                </span>
                <span className="text-sm text-gray-500 font-medium mb-1 tracking-wide">
                  Based on {totalRatings} Analysts
                </span>
              </div>

              {/* Rating Bars */}
              <div className="space-y-3">
                {[
                  { label: 'Strong Buy', count: analystRatings.strongBuy, color: 'bg-green-500' },
                  { label: 'Buy', count: analystRatings.buy, color: 'bg-emerald-400' },
                  { label: 'Hold', count: analystRatings.hold, color: 'bg-yellow-500' },
                  { label: 'Sell', count: analystRatings.sell, color: 'bg-rose-400' },
                  { label: 'Strong Sell', count: analystRatings.strongSell, color: 'bg-red-600' },
                ].map((rating) => (
                  <div key={rating.label} className="flex items-center text-sm">
                    <span className="w-24 text-gray-400 font-medium">{rating.label}</span>
                    <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden mx-3">
                      <div 
                        className={`h-full ${rating.color} transition-all duration-1000 ease-out rounded-full`}
                        style={{ width: getPercentage(rating.count) }}
                      />
                    </div>
                    <span className="w-8 text-right text-gray-300 font-semibold">{rating.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* RIGHT PANEL: Latest Intelligence / News */}
        {news && news.length > 0 && (
          <div className="bg-[#1C1F26]/60 backdrop-blur-md rounded-2xl border border-gray-800/80 p-6 flex flex-col">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6">Latest Developments</h4>
            
            <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar max-h-[250px]">
              {news.map((item, idx) => (
                <a 
                  key={idx} 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex gap-4 bg-[#242832]/40 hover:bg-[#2A2F3A] transition-colors border border-gray-800 hover:border-gray-700 rounded-xl p-4"
                >
                  {item.thumbnail && (
                    <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
                      <img 
                        src={item.thumbnail} 
                        alt="" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" 
                      />
                    </div>
                  )}
                  <div className="flex flex-col justify-center flex-1">
                    <h5 className="text-gray-200 text-sm font-medium leading-relaxed group-hover:text-indigo-400 transition-colors ">
                      {item.title}
                    </h5>
                    <div className="flex items-center gap-4 mt-3 text-xs text-gray-500 font-medium">
                      <span className="text-indigo-400/80 uppercase tracking-wider">{item.publisher}</span>
                      <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {formatTime(item.publishTime)}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* STRICT LEGAL DISCLAIMER */}
      <div className="rounded-xl border border-amber-900/30 bg-amber-950/10 p-4 flex items-start gap-3 mt-4">
        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-amber-600/80 leading-relaxed font-medium">
          <span className="font-bold text-amber-500 uppercase tracking-wider">Disclaimer:</span> The analyst ratings and news headlines provided above are aggregated from independent third-party sources. CimessInvest does not endorse these ratings and they do not constitute professional investment advice. All trading involves risk.
        </p>
      </div>
    </div>
  );
};
