// Assuming you have recharts installed: npm install recharts
import { LineChart, Line, ResponsiveContainer, YAxis, Tooltip } from 'recharts';

import { useState, useEffect, useMemo } from 'react';
import { useSearchStock } from '../hooks/useQuery';
import { toast } from 'react-toastify';
import api from '../lib/axios';



export default function Watchlist() {

  const [featuredStocks, setFeaturedStocks] = useState<any[]>([]);
  const [watchlist, setWatchlist] = useState<any[]>([]);
  const [stockChange, setStockChange] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);




  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [featuredRes, watchlistRes] = await Promise.all([
          api.get('/watchlist/featured'),
          api.get('/watchlist')
        ]);

        // Helper function to map missing UI fields
        const enrichStockData = (stock: any) => {
          const currentPrice = Number(stock.price || 0);
          const iValue = Number(stock.intrinsicValue || 0);
          const wsTarget = Number(stock.wallStTarget || 0);

          // 🚨 SAFE GUARD: detect broken intrinsic scale
          const intrinsicIsInvalid =
            iValue <= 0 || iValue < currentPrice * 0.2; // clearly mismatched scale

          // If invalid → disable buy logic completely
          const safeIntrinsic = intrinsicIsInvalid ? null : iValue;

          // --- Proper valuation ratio ---
          const valueRatio =
            safeIntrinsic && currentPrice
              ? safeIntrinsic / currentPrice
              : null;

          // --- Buy zone logic (ratio-based, not fake price multiplication) ---
          let buyLabel = "Evaluating";

          if (!valueRatio) {
            buyLabel = "Evaluating";
          } else if (valueRatio >= 1.2) {
            buyLabel = "Strong Buy";
          } else if (valueRatio >= 1.0) {
            buyLabel = "Buy";
          } else if (valueRatio >= 0.8) {
            buyLabel = "Hold";
          } else {
            buyLabel = "Premium";
          }

          // --- Wall Street upside (still valid) ---
          const percentageUpside =
            wsTarget && currentPrice
              ? ((wsTarget - currentPrice) / currentPrice) * 100
              : null;

          return {
            ...stock,


            buyPrice: safeIntrinsic ? safeIntrinsic * 0.8 : null,

            buyLabel,

            intrinsicValuation: safeIntrinsic
              ? currentPrice > safeIntrinsic
                ? "Overvalued"
                : "Undervalued"
              : "No Valuation Data",

            wallStUpside:
              percentageUpside !== null
                ? `${percentageUpside >= 0 ? "+" : ""}${percentageUpside.toFixed(2)}%`
                : "N/A",

            chartData: stock.chartData || [
              { value: currentPrice },
              { value: currentPrice },
            ],
          };
        };


        setFeaturedStocks(featuredRes.data.data.map(enrichStockData));
        // 2. Process Watchlist Stocks WITH asynchronous chart fetching!
        const enrichedWatchlistWithCharts = await Promise.all(
          watchlistRes.data.data.map(async (stock: any) => {
            // First run your normal enrich logic
            const processedStock = enrichStockData(stock);

            try {
              // Fetch exact 7-day historical data like DetailsModal does
              const historyRes = await api.post('/market/history', {
                symbol: stock.symbol,
                range: '7d' // Perfect range for the mini sparkline
              });
              if (historyRes.data?.success && historyRes.data?.data) {
                // If successful, overwrite the fake flat chart with real data!
                processedStock.chartData = historyRes.data.data;
              }
            } catch (err) {
              console.warn(`Could not fetch chart for ${stock.symbol}`);
            }

            return processedStock;
          })
        );

        setWatchlist(enrichedWatchlistWithCharts);

      } catch (error) {
        toast.error("Error loading market data.");
      }finally{
        setLoading(false);
      }
    };
    fetchData();
  }, [stockChange]);


  const handleAddToWatchlist = async (stock: any) => {
    const isAlreadyAdded = watchlist.some(s => s.symbol === stock.symbol);
    if (isAlreadyAdded) {
      toast.info(`${stock.symbol} is already in your watchlist.`);
      return;
    }

    try {
      setLoading(true);
      const res = await api.post('/watchlist/add', {
        symbol: stock.symbol,
        name: stock.company || stock.name
      });
      toast.success(res.data.message);
      setStockChange(prev => !prev);
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWatchlist = async (symbol: string) => {
    try {
      setLoading(true);
      const res = await api.delete('/watchlist/remove', { data: { symbol } });
      setStockChange(true);
      if(res.data.success){
        setWatchlist(prev => prev.filter(s => s.symbol !== symbol));
      }
      toast.success(res.data.message);
    } catch (error:any) {
      toast.error(error.response.data.message);
    }finally{
      setLoading(false);
      setStockChange(false);
    }
  };




  const { topGainer, topLoser, topOpportunity } = useMemo(() => {
    if (!watchlist || watchlist.length === 0) {
      return { topGainer: null, topLoser: null, topOpportunity: null };
    }

    // Top Gainer Fix
    const gainer = [...watchlist].reduce((prev, current) => {
      const p = Number(prev.changePercent) || -10000; // fallback to huge negative number if missing
      const c = Number(current.changePercent) || -10000;
      return p > c ? prev : current;
    });

    // Top Loser Fix
    let loser: any = [...watchlist].reduce((prev, current) => {
      const p = Number(prev.changePercent) || 10000; // fallback to huge positive number if missing
      const c = Number(current.changePercent) || 10000;
      return p < c ? prev : current;
    });

    // Prevent topGainer and topLoser from being the same
    // Only show loser if change is actually negative or strictly less than gainer
    const gainerChange = Number(gainer.changePercent) || 0;
    const loserChange = Number(loser?.changePercent) || 0;
    if (gainer.symbol === loser?.symbol || loserChange >= gainerChange) {
      loser = null;
    }

    // Top Opportunity Fix
    const opp = [...watchlist].reduce((prev, current) => {
      let p = parseFloat(prev?.wallStUpside);
      if (isNaN(p)) p = -10000; // Treat "N/A" as the worst possible
      
      let c = parseFloat(current?.wallStUpside);
      if (isNaN(c)) c = -10000;
      
      return c > p ? current : prev;
    });

    return { topGainer: gainer, topLoser: loser, topOpportunity: opp };
  }, [watchlist]);


  const tooltipFormatter = (value: any) => {
    const num = Number(value);
    return [`$${num.toFixed(2)}`, "Price"];
  };


  return (
    <div className="w-full   bg-from-to-br from-gray-900 to-black rounded-2xl shadow-sm border border-gray-900 overflow-hidden">

      {/* Header Section */}
      <div className="p-6  border-gray-800">
        <h2 className="text-2xl font-bold text-center">Your Investment Radar</h2>
        <p className="text-sm text-gray-400 mt-1">Detailed valuation and tracking for your Watchlist.</p>
      </div>

      {/* Highlights Section (Gainers / Buy Zone) */}
      {/* Highlights Section (Gainers / Buy Zone) */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x 
       border-gray-800 divide-gray-200 divide-gray-800 
      bg-gray-50 bg-gray-800/50">

        {/* TOP OPPORTUNITY */}
        <div className="p-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Top Opportunity</h3>
          {topOpportunity ? (
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-white text-lg truncate max-w-[150px]" title={topOpportunity.name}>
                  {topOpportunity.company || topOpportunity.name}
                </p>
                <p className="text-xs text-gray-500">{topOpportunity?.buyLabel}</p>
              </div>
              <span className="text-green-500 font-bold bg-green-500/10 px-3 py-1 rounded-lg">
                {topOpportunity.wallStUpside || 'N/A'}
              </span>
            </div>
          ) : (
            <p className="text-sm text-gray-400 italic">Analyzing market...</p>
          )}
        </div>

        {/* TOP GAINER */}
        <div className="p-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Top Gainer</h3>
          {topGainer ? (
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-white text-lg">{topGainer.symbol}</p>
                <p className="text-xs text-gray-500">{topGainer.price} USD</p>
              </div>
              <span className={`font-bold px-3 py-1 rounded-lg ${topGainer.changePercent >= 0 ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10'}`}>
                {topGainer.changePercent >= 0 ? '+' : ''}{Number(topGainer.changePercent).toFixed(2)}%
              </span>
            </div>
          ) : (
            <p className="text-sm text-gray-400 italic">No Top Gainer Today From Your Watchlist</p>
          )}
        </div>

        {/* TOP LOSER */}
        <div className="p-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Top Loser</h3>
          {topLoser ? (
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-white text-lg">{topLoser.symbol}</p>
                <p className="text-xs text-gray-500">{topLoser.price} USD</p>
              </div>
              <span className={`font-bold px-3 py-1 rounded-lg ${topLoser.changePercent > 0 ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10'}`}>
                {topLoser.changePercent > 0 ? '+' : ''}{Number(topLoser.changePercent).toFixed(2)}%
              </span>
            </div>
          ) : (
            <p className="text-sm text-gray-400 italic">No Top Loser Today From Your Watchlist</p>
          )}
        </div>

      </div>


      {/* Detailed Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 bg-gray-800/80 text-xs uppercase tracking-wider text-gray-400  border-gray-800">
              <th className="p-4 font-semibold pb-3 pl-6">Symbol</th>
              <th className="p-4 font-semibold pb-3 w-32">Price Performance (7D)</th>
              <th className="p-4 font-semibold pb-3 text-right">Last Price</th>
              <th className="p-4 font-semibold pb-3 text-right">Fair Entry Zone</th>
              <th className="p-4 font-semibold pb-3 text-right">Estimated Fair Value</th>
              <th className="p-4 font-semibold pb-3 text-right">Analyst Price Target</th>
              <th className="p-4 font-semibold pb-3 pr-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 divide-gray-800">
            {watchlist?.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-gray-500 italic">
                  Your watchlist is empty. Add stocks from the featured list below!
                </td>
              </tr>
            ) : watchlist.map((stock) => (
              <tr key={stock?.symbol} className="hover:bg-gray-50 hover:bg-gray-800/50 transition-colors group">

                {/* Company Name & Symbol */}
                <td className="p-4 pl-6">
                  <div className="font-bold text-gray-900 text-white text-base">{stock?.name || stock?.company}</div>
                  <div className="text-sm text-gray-500 font-medium">{stock?.symbol}</div>
                </td>

                {/* Mini Graph (Sparkline) */}
                <td className="p-4 w-32 h-16">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stock?.chartData}>

                      <YAxis domain={['dataMin', 'dataMax']} hide />

                      {/* 👇 THIS is what enables hover / click details */}
                      <Tooltip
                        formatter={tooltipFormatter}
                        labelFormatter={(label: any) => `${label}`}
                        contentStyle={{
                          backgroundColor: "#111",
                          border: "1px solid #333",
                          borderRadius: "8px",
                          fontSize: "12px",
                          color: "#fff"
                        }}
                        labelStyle={{ color: "#aaa" }}
                      />

                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={stock?.change >= 0 ? '#10B981' : '#EF4444'}
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4 }}
                        isAnimationActive={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </td>

                {/* Last Price */}
                <td className="p-4 text-right">
                  <div className="font-bold text-gray-900 text-white">{stock?.price} USD</div>
                  <div className={`text-sm font-semibold ${stock?.changePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {stock?.changePercent >= 0 ? '+' : ''}{stock?.changePercent}%
                  </div>
                </td>

                {/* Buy Price */}
                <td className="p-4 text-right">
                  <div className="font-bold text-white">{stock?.buyPrice?.toFixed(2) || 'N/A'} USD</div>
                  <div className={`text-sm ${stock?.buyLabel?.includes('Premium') ? 'text-red-500' : 'text-green-500'}`}>
                    {stock?.buyLabel || 'Evaluating'}
                  </div>
                </td>

                {/* Intrinsic Value */}
                <td className="p-4 text-right">
                  <div className="font-bold  text-white">{stock?.intrinsicValue || 'N/A'} USD</div>
                  <div className={`text-sm ${stock?.intrinsicValuation?.includes('Overvalued') ? 'text-red-500' : 'text-green-500'}`}>
                    {stock?.intrinsicValuation || 'Calculating...'}
                  </div>
                </td>

                {/* Wall St Target */}
                <td className="p-4 text-right">
                  <div className="font-bold text-white">{stock?.wallStTarget || 'N/A'} USD</div>
                  <div className="text-sm font-medium text-blue-500">
                    {stock?.wallStUpside || 'N/A'}
                  </div>
                </td>

                {/* Actions */}
                <td className="p-4 pr-6 text-center">
                  <button
                    onClick={() => handleRemoveFromWatchlist(stock.symbol)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    title="Remove from Watchlist"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Featured Stocks Discovery Section */}
      <div className="p-8 bg-gray-900/30 border-t border-gray-800">
        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
          <span className="p-1.5 bg-blue-500/10 text-blue-500 rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </span>
          Featured Opportunities
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {featuredStocks.slice(0, 10).map((stock) => {
            const inWatchlist = watchlist.some(s => s.symbol === stock.symbol);
            return (
              <div key={stock.symbol} className="bg-white bg-gray-800 p-4 rounded-xl border border-gray-100 border-gray-700 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-gray-900 text-white">{stock.symbol}</span>
                  <span className={`text-xs font-bold ${stock.changePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent}%
                  </span>
                </div>
                <p className="text-xs text-gray-400 truncate mb-4">{stock.company || stock.name}</p>
                <div className="flex justify-between items-end">
                  <div className="text-sm font-bold lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                    {stock.price} USD
                  </div>
                  <button
                    disabled={inWatchlist||loading}
                    onClick={() => handleAddToWatchlist(stock)}
                    className={`p-2 rounded-lg transition-all ${inWatchlist
                      ? 'bg-green-500/10 text-green-500 cursor-default'
                      : 'bg-blue-500 text-white hover:bg-blue-600 shadow-sm hover:shadow'
                      }`}
                  >
                  {loading ? (
                    <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                  ) : inWatchlist ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
