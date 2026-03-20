import React, { useState, useEffect } from 'react';
import { Search, ArrowUpRight, Loader2 } from 'lucide-react';
import { useGetMarketQuotes, useSearchStock, useFetchStockDetails } from '../../../hooks/useQuery';
import DetailsModal from '../../../components/DetailsModal';
import { StockCardProps } from '../../../types';
import { toast, Zoom } from 'react-toastify';
import { useVirtualizer } from '@tanstack/react-virtual';

const MarketView: React.FC = () => {
  const [columns, setColumns] = useState(3);
  const parentRef = React.useRef<HTMLDivElement>(null);

  // Update columns based on window width
  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 768) setColumns(1);
      else if (window.innerWidth < 1024) setColumns(2);
      else setColumns(3);
    };
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);
  const [searchTerm, setSearchTerm] = useState('');
  const [marketStocks, setMarketStocks] = useState<any[]>([]);
  const [selectedStock, setSelectedStock] = useState<StockCardProps | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fetchingSymbol, setFetchingSymbol] = useState<string | null>(null);

  const { data, isLoading: isMarketLoading,isError } = useGetMarketQuotes();
  const { mutate: searchStocks, isPending: isSearching } = useSearchStock();
  const { mutate: fetchDetails, isPending: isFetchingDetails } = useFetchStockDetails();

  const rowCount = Math.ceil(marketStocks.length / columns);
  const virtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 220, // Estimated height of a stock card row
    overscan: 5,
  });

  // Load stocks from DB on mount / when search is cleared
  useEffect(() => {
    if (data?.success && data.data) {
      setMarketStocks(Array.isArray(data.data) ? data.data : []);
       toast.success("Fetched market data.", {
            position:"top-center",
            autoClose:5000,
            hideProgressBar:true,
            closeOnClick:true,
            pauseOnHover:true,
            draggable:true,
            theme:"colored",
            transition:Zoom,
            });
    }
    if(isError){
       toast.error("Failed to fetch market data. Please try again later.", {
            position:"top-center",
            autoClose:5000,
            hideProgressBar:true,
            closeOnClick:true,
            pauseOnHover:true,
            draggable:true,
            theme:"colored",
            transition:Zoom,
            });
          }
  }, [data, searchTerm === '',isError]);

  // Simple debounce for search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.length > 0) {
        searchStocks(searchTerm, {
          onSuccess: (res) => {
            if (res.success && res.data) {
              const results = Array.isArray(res.data) ? res.data : [res.data];
              setMarketStocks(results);
               toast.success("Fetched market data.", {
      position:"top-center",
      autoClose:5000,
      hideProgressBar:true,
      closeOnClick:true,
      pauseOnHover:true,
      draggable:true,
      theme:"colored",
      transition:Zoom,
      });
            } else {
              setMarketStocks([]);
            }
          }
        });
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleStockClick = (symbol: string, basicName: string) => {
    setFetchingSymbol(symbol);
    fetchDetails(symbol, {
      onSuccess: (res) => {
        setFetchingSymbol(null);
        if (res.success && res.data) {
          const apiData = res.data;

          const detailItem: StockCardProps = {
            label: apiData.company || basicName || symbol,
            image: `https://logo.clearbit.com/${apiData.website?.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0] || 'apple.com'}`,
            type: "STOCK",
            return: `${apiData.changePercent >= 0 ? '+' : ''}${apiData.changePercent?.toFixed(2)}%`,
            risk: "Variable",
            invest: apiData.price?.toFixed(2) || "0.00",
            symbol: apiData.symbol || symbol,
            financial: apiData.financialSummary || "No financial summary available.",
            about: apiData.about || "No description available.",
            stats: {
              ceo: apiData.ceo || "N/A",
              more: `Employees: ${apiData.employees || "N/A"}. Sector: ${apiData.sector || "N/A"}`,
              industry: apiData.industry || "N/A",
              hq: apiData.hq || "N/A",
              founded: "N/A"
            }
          };
          setSelectedStock(detailItem);
          setIsModalOpen(true);
        }
      },
      onError: () => {
        setFetchingSymbol(null);
      }
    });
  };

  const loading = isMarketLoading || isSearching;

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-white font-bold text-xl lg:text-2xl">Market Explorer</h2>
          <p className="text-slate-500 text-xs lg:text-sm">Discover and analyze global stocks</p>
        </div>
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
          <input
            type="text"
            placeholder="Search symbol or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-all w-full md:w-64"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-24">
          <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
        </div>
      ) : marketStocks.length === 0 ? (
        <div className="flex justify-center items-center py-24 text-slate-500 text-sm">
          No stocks found
        </div>
      ) : (
        <div 
          ref={parentRef} 
          className="max-h-[800px] overflow-auto pr-2 scrollbar-hide"
        >
          <div
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {virtualizer.getVirtualItems().map((virtualRow) => {
              const startIndex = virtualRow.index * columns;
              const rowItems = marketStocks.slice(startIndex, startIndex + columns);

              return (
                <div
                  key={virtualRow.key}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                  className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4`}
                >
                  {rowItems.map((s, index) => {
                    const symbol = s.symbol || 'N/A';
                    const name = s.company || s.name || symbol;
                    const price = Number(s.price || 0);
                    const change = Number(s.changePercent || 0);
                    const marketCap = s.displayMarketCap || (s.marketCap ? `${(Number(s.marketCap) / 1e9).toFixed(1)}B` : 'N/A');
                    const volume = s.displayVolume || (s.volume ? `${(Number(s.volume) / 1e6).toFixed(1)}M` : 'N/A');

                    return (
                      <div key={`${symbol}-${index}`} className="h-full">
                        {isFetchingDetails && fetchingSymbol === symbol ? (
                          <div className="flex justify-center items-center h-full glass-panel rounded-2xl border border-emerald-500/30 min-h-[200px]">
                            <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                          </div>
                        ) : (
                          <div
                            onClick={() => handleStockClick(symbol, name)}
                            className={`glass-panel p-5 rounded-2xl border h-full ${isFetchingDetails && fetchingSymbol === symbol ? 'border-emerald-500 opacity-50' : 'border-white/5 hover:border-emerald-500/30'} transition-all group cursor-pointer flex flex-col justify-between`}
                          >
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white font-bold border border-white/5 group-hover:bg-emerald-500/10 group-hover:text-emerald-400 transition-colors">
                                  {symbol !== 'N/A' ? symbol.charAt(0) : '?'}
                                </div>
                                <div>
                                  <p className="text-white font-bold">{symbol}</p>
                                  <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest truncate max-w-[120px]">{name === symbol ? 'Company N/A' : name}</p>
                                </div>
                              </div>
                              <button className="p-2 rounded-lg bg-white/5 text-slate-400 hover:bg-emerald-500/10 hover:text-emerald-400 transition-colors">
                                {isFetchingDetails && fetchingSymbol === symbol ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowUpRight className="w-4 h-4" />}
                              </button>
                            </div>

                            <div className="flex items-baseline justify-between mb-4">
                              <div>
                                <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">Price</p>
                                <p className="text-white text-lg font-bold">${price > 0 ? price.toLocaleString(undefined, { minimumFractionDigits: 2 }) : '0.00'}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">24h Change</p>
                                <p className={`text-sm font-bold ${change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                  {change >= 0 ? '+' : ''}{change.toFixed(2)}%
                                </p>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                              <div>
                                <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-0.5">Mkt Cap</p>
                                <p className="text-slate-300 text-xs font-semibold">{marketCap}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-0.5">Volume</p>
                                <p className="text-slate-300 text-xs font-semibold">{volume}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {isModalOpen && selectedStock && (
        <DetailsModal
          item={selectedStock}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedStock(null);
          }}
          targetPath={"/dashboard/client/portfolio"}
        />
      )}
    </div>
  );
};

export default MarketView;
