import React, { useState, useEffect } from 'react';
import { Search, ArrowUpRight, Loader2, TrendingUp, TrendingDown, Activity, Bitcoin } from 'lucide-react';
import { useGetMarketCategories, useSearchStock, useFetchStockDetails } from '../../../hooks/useQuery';
import DetailsModal from '../../../components/DetailsModal';
import { StockCardProps } from '../../../types';
import { toast, Zoom } from 'react-toastify';
import { useVirtualizer } from '@tanstack/react-virtual';

type CategoryType = 'mostActive' | 'gainers' | 'losers' | 'crypto';

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
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<CategoryType>('mostActive');
  
  const [selectedStock, setSelectedStock] = useState<StockCardProps | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fetchingSymbol, setFetchingSymbol] = useState<string | null>(null);

  const { data, isLoading: isMarketLoading, isError } = useGetMarketCategories();
  const { mutate: searchStocks, isPending: isSearching } = useSearchStock();
  const { mutate: fetchDetails, isPending: isFetchingDetails } = useFetchStockDetails();

  // Load stocks on mount / error
  useEffect(() => {
    if (isError) {
       toast.error("Failed to fetch categorized market data. Please try again later.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
            transition: Zoom,
        });
    }
  }, [isError]);

  // Simple debounce for search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.length > 0) {
        searchStocks(searchTerm, {
          onSuccess: (res) => {
            if (res.success && res.data) {
              const results = Array.isArray(res.data) ? res.data : [res.data];
              setSearchResults(results);
              toast.success("Found search results.", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                transition: Zoom,
              });
            } else {
              setSearchResults([]);
            }
          }
        });
      } else {
        setSearchResults([]);
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
      onError: (err: any) => {
        setFetchingSymbol(null);
        toast.error(`Failed to fetch stock details: ${err?.response?.data?.message || 'Please try again later.'}`, {
          position: "top-center",
          autoClose: 5000,
          theme: "colored",
          transition: Zoom,
        });
      }
    });
  };

  const loading = isMarketLoading || isSearching;
  
  // Decide which list to show
  const isSearchActive = searchTerm.length > 0;
  const currentStocksList = isSearchActive 
    ? searchResults 
    : (data?.data && data.data[activeTab] ? data.data[activeTab] : []);

  const rowCount = Math.ceil(currentStocksList.length / columns);
  const virtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 250, 
    overscan: 5,
  });

  const categories = [
    { id: 'mostActive', label: 'Most Active', icon: Activity, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { id: 'gainers', label: 'Top Gainers', icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { id: 'losers', label: 'Top Losers', icon: TrendingDown, color: 'text-red-400', bg: 'bg-red-400/10' },
    { id: 'crypto', label: 'Crypto', icon: Bitcoin, color: 'text-orange-400', bg: 'bg-orange-400/10' }
  ] as const;

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-white font-bold text-xl lg:text-2xl">Market Explorer</h2>
          <p className="text-slate-500 text-xs lg:text-sm">Discover and analyze global stocks & crypto</p>
        </div>
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
          <input
            type="text"
            placeholder="Search symbol or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-all w-full md:w-64"
          />
        </div>
      </div>

      {!isSearchActive && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {categories.map((cat) => {
            const isActive = activeTab === cat.id;
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id as CategoryType)}
                className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                  isActive 
                  ? `border-white/20 bg-white/5` 
                  : `border-transparent hover:bg-white-[0.02] opacity-60 hover:opacity-100`
                }`}
              >
                <div className={`p-2 rounded-lg ${cat.bg} ${cat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`font-semibold text-sm ${isActive ? 'text-white' : 'text-slate-400'}`}>
                  {cat.label}
                </span>
              </button>
            )
          })}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-24">
          <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
        </div>
      ) : currentStocksList.length === 0 ? (
        <div className="flex justify-center items-center py-24 text-slate-500 text-sm">
          No stocks found in this category
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
              const rowItems = currentStocksList.slice(startIndex, startIndex + columns);

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
                  className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4`}
                >
                  {rowItems.map((s:any, index:any) => {
                    const symbol = s.symbol || 'N/A';
                    const name = s.company || s.name || symbol;
                    const price = Number(s.price || 0);
                    const change = Number(s.changePercent || 0);
                    const marketCap = s.displayMarketCap || (s.marketCap ? `${(Number(s.marketCap) / 1e9).toFixed(1)}B` : 'N/A');
                    const volume = s.displayVolume || (s.volume && Number(s.volume) > 0 ? `${(Number(s.volume) / 1e6).toFixed(1)}M` : 'N/A');

                    return (
                      <div key={`${symbol}-${index}`} className="h-full">
                        {isFetchingDetails && fetchingSymbol === symbol ? (
                          <div className="flex justify-center items-center h-full premium-card border-emerald-500/30 min-h-[200px]">
                            <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                          </div>
                        ) : (
                          <div
                            onClick={() => handleStockClick(symbol, name)}
                            className={`premium-card p-5 h-full ${isFetchingDetails && fetchingSymbol === symbol ? 
                              'border-emerald-500 opacity-50' : 
                              ''} transition-all group cursor-pointer 
                              flex flex-col justify-between hover:-translate-y-1 `}
                          >
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3 w-3/4">
                                <div className="w-9 h-9 rounded-lg bg-white/[0.03] flex items-center justify-center text-white font-bold border border-white/5 group-hover:border-white/20 transition-colors shrink-0 font-mono">
                                  {symbol !== 'N/A' ? symbol.charAt(0) : '?'}
                                </div>
                                <div className="min-w-0 pr-2">
                                  <p className="text-white font-bold text-sm truncate tracking-tight">{symbol}</p>
                                  <p className="text-slate-500 text-[8px] uppercase font-bold tracking-[0.2em] truncate">{name === symbol ? 'Company N/A' : name}</p>
                                </div>
                              </div>
                              <button className="p-2 rounded-lg bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors shrink-0">
                                {isFetchingDetails && fetchingSymbol === symbol ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />}
                              </button>
                            </div>

                            <div className="flex items-baseline justify-between mb-4">
                              <div>
                                <p className="text-slate-500 text-[9px] uppercase font-bold tracking-[0.2em] mb-1">Price</p>
                                <p className="text-white text-lg font-bold font-mono tracking-tighter">${price > 0 ? price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-slate-500 text-[9px] uppercase font-bold tracking-[0.2em] mb-1">24h Change</p>
                                <p className={`text-sm font-bold font-mono ${change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                  {change >= 0 ? '+' : ''}{change.toFixed(2)}%
                                </p>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/[0.05]">
                              <div>
                                <p className="text-slate-500 text-[9px] uppercase font-bold tracking-[0.2em] mb-0.5">Mkt Cap</p>
                                <p className="text-slate-300 text-xs font-semibold font-mono">{marketCap}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-slate-500 text-[9px] uppercase font-bold tracking-[0.2em] mb-0.5">Volume</p>
                                <p className="text-slate-300 text-xs font-semibold font-mono">{volume}</p>
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
