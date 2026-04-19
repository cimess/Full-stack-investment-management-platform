import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  ArrowUpRight,
  Loader2,
  TrendingUp,
  TrendingDown,
  Activity,
  Bitcoin,
  ListFilter,
  ChevronDown,
  Globe
} from 'lucide-react';
import { useGetMarketCategories, useSearchStock, useFetchStockDetails } from '../../../hooks/useQuery';
import DetailsModal from '../../../components/DetailsModal';
import { StockCardProps } from '../../../types';
import { toast, Zoom } from 'react-toastify';
import { useVirtualizer } from '@tanstack/react-virtual';

type AssetClass = 'equity' | 'digital';
type EquityMarket = 'equity' | 'mostActive' | 'gainers' | 'losers';
type CryptoMarket = 'digital' | 'mostActiveCrypto' | 'cryptoGainers' | 'cryptoLosers';

const MarketView: React.FC = () => {
  const [columns, setColumns] = useState(3);
  const parentRef = useRef<HTMLDivElement>(null);

  // State for the new UI structure
  const [assetClass, setAssetClass] = useState<AssetClass>('equity');
  const [equityMarket, setequityMarket] = useState<EquityMarket>('equity');
  const [cryptoMarket, setcryptoMarket] = useState<CryptoMarket>('digital');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedStock, setSelectedStock] = useState<StockCardProps | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fetchingSymbol, setFetchingSymbol] = useState<string | null>(null);

  const {
    data,
    isLoading: isMarketLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useGetMarketCategories();
  const { mutate: searchStocks, isPending: isSearching } = useSearchStock();
  const { mutate: fetchDetails, isPending: isFetchingDetails } = useFetchStockDetails();

  // Responsive column logic
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

  // Search Debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.length > 0) {
        searchStocks(searchTerm, {
          onSuccess: (res) => {
            if (res.success && res.data) {
              setSearchResults(Array.isArray(res.data) ? res.data : [res.data]);
            } else {
              setSearchResults([]);
            }
          }
        });
      } else {
        setSearchResults([]);
      }
    }, 800);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, searchStocks]);

  const handleStockClick = (symbol: string, basicName: string) => {
    setFetchingSymbol(symbol);
    fetchDetails(symbol, {
      onSuccess: (res) => {
        setFetchingSymbol(null);
        if (res.success && res.data) {
          const apiData = res.data;
          // A much more reliable way for stocks:
          const domain = apiData.website?.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0] || 'google.com';
          const logoUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
          const detailItem: StockCardProps = {
            label: apiData.company || apiData.name || basicName || symbol,
            image: logoUrl,
            type: assetClass === 'equity' ? "STOCK" : "CRYPTO",
            return: `${apiData.changePercent >= 0 ? '+' : ''}${apiData.changePercent?.toFixed(2)}%`,
            risk: "Variable",
            invest: apiData.displayPrice,
            price: apiData.price,
            symbol: apiData.symbol || symbol,
            financial: apiData.financialSummary || "No financial summary available.",
            about: apiData.about || "No description available.",
            stats: {
              ceo: apiData.ceo || "N/A",
              more: `Sector: ${apiData.sector || "N/A"}`,
              industry: apiData.industry || "N/A",
              hq: apiData.hq || "N/A",
              founded: apiData.founded || "N/A"
            },
            startDate: apiData.startDate || "N/A",
            circulatingSupply: apiData.circulatingSupply || "N/A",
            maxSupply: apiData.maxSupply || "N/A",
            marketCapRank: apiData.marketCapRank || "N/A",
            marketCap: apiData.marketCap || "N/A",
            volume: apiData.volume || "N/A",
            peRatio: apiData.peRatio || "N/A",
            dividendYield: apiData.dividendYield || "N/A",
            eps: apiData.eps || "N/A",
            beta: apiData.beta || "N/A",
            fiftyTwoWeekHigh: apiData.fiftyTwoWeekHigh || "N/A",
            fiftyTwoWeekLow: apiData.fiftyTwoWeekLow || "N/A"
          };
          setSelectedStock(detailItem);
          setIsModalOpen(true);
        }
      },
      onError: () => setFetchingSymbol(null)
    });
  };

  // Determine current list based on Asset Class + Filter
  const isSearchActive = searchTerm.length > 0;
  const currentStocksList = isSearchActive
    ? searchResults
    : data?.pages.flatMap((page: any) =>
      assetClass === 'digital'
        ? (page.data?.[cryptoMarket] || [])
        : (page.data?.[equityMarket] || [])
    ) || [];

  const rowCount = Math.ceil(currentStocksList.length / columns);
  const virtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 240,
    overscan: 5,
  });

  // Infinite scroll trigger
  useEffect(() => {
    const virtualItems = virtualizer.getVirtualItems();
    if (!virtualItems.length) return;

    const lastItem = virtualItems[virtualItems.length - 1];
    if (lastItem.index >= rowCount - 1 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [virtualizer.getVirtualItems(), hasNextPage, isFetchingNextPage, rowCount, fetchNextPage]);

  const equityFilter = [
    { id: 'mostActive', label: 'Most Active', icon: Activity },
    { id: 'gainers', label: 'Top Gainers', icon: TrendingUp },
    { id: 'losers', label: 'Top Losers', icon: TrendingDown }
  ] as const

  const cryptoFilter = [
    { id: 'mostActiveCrypto', label: 'Most Active', icon: Activity },
    { id: 'cryptoGainers', label: 'Top Gainers', icon: TrendingUp },
    { id: 'cryptoLosers', label: 'Top Losers', icon: TrendingDown },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Header & Asset Toggle */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 lg:gap-6">
        <div>
          <h2 className="text-white font-bold text-xl lg:text-2xl">Market Explorer</h2>
          <div className="flex bg-white/5 p-1 rounded-xl mt-3 lg:mt-4 w-fit border border-white/10">
            <button
              onClick={() => setAssetClass('equity')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${assetClass === 'equity' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:text-white'}`}
            >
              <Globe className="w-4 h-4" /> Equity Assets
            </button>
            <button
              onClick={() => setAssetClass('digital')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${assetClass === 'digital' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'text-slate-400 hover:text-white'}`}
            >
              <Bitcoin className="w-4 h-4" /> Digital Assets
            </button>
          </div>
        </div>

        {/* Search & Filter Icon */}
        <div className="flex items-center gap-2 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <input
              type="text"
              placeholder={`Search...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50 w-full transition-all"
            />
          </div>

          {/* Filter Dropdown - Only show for Equity as per your request */}
          {!isSearchActive && (
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-all flex items-center gap-2"
              >
                <ListFilter className="w-4 h-4" />
                <ChevronDown className={`w-3 h-3 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
              </button>

              {isFilterOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#1a1c20] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
                  {assetClass === 'equity' ? equityFilter.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => {
                        setequityMarket(f.id);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-white/5 
                        ${equityMarket === f.id ? 'text-emerald-400 bg-emerald-400/5' : 'text-slate-400'}`}
                    >
                      <f.icon className="w-4 h-4" />
                      {f.label}
                    </button>
                  )) : cryptoFilter.map((f) => (
                    <button
                      key={f.label}
                      onClick={() => {
                        setcryptoMarket(f.id);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-white/5
                         ${cryptoMarket === f.id ? 'text-emerald-400 bg-emerald-400/5' : 'text-slate-400'}`}
                    >
                      <f.icon className="w-4 h-4" />
                      {f.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      {isMarketLoading || isSearching ? (
        <div className="flex justify-center items-center py-32">
          <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
        </div>
      ) : currentStocksList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-slate-500 border border-dashed border-white/10 rounded-3xl">
          <p>No results found for your current selection.</p>
        </div>
      ) : (
        <div ref={parentRef} className="max-h-[750px] overflow-auto pr-2 scrollbar-hide">
          <div style={{ height: `${virtualizer.getTotalSize()}px`, width: '100%', position: 'relative' }}>
            {virtualizer.getVirtualItems().map((virtualRow) => {
              const startIndex = virtualRow.index * columns;
              const rowItems = currentStocksList.slice(startIndex, startIndex + columns);

              return (
                <div
                  key={virtualRow.key}
                  style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4"
                >
                  {rowItems.map((s: any, index: any) => {
                    const symbol = s.symbol || 'N/A';
                    const name = s.company || s.name || symbol;
                    const price = Number(s.price || 0);
                    const change = Number(s.changePercent || 0);

                    return (
                      <div
                        key={`${symbol}-${index}`}
                        onClick={() => handleStockClick(symbol, name)}
                        className="premium-card p-4 sm:p-5 cursor-pointer hover:-translate-y-1 transition-all group flex flex-col justify-between border border-white/5 hover:border-emerald-500/30 mb-2 sm:mb-0 border-b md:border-b-transparent border-white/5 rounded-xl"
                      >
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold border border-white/10 group-hover:scale-110 transition-transform ${assetClass === 'digital' ? 'bg-orange-500/10' : 'bg-emerald-500/10'}`}>
                              {symbol.charAt(0)}
                            </div>
                            <div>
                              <h3 className="text-white font-bold text-sm tracking-tight">{symbol}</h3>
                              <p className="text-slate-500 text-[10px] uppercase tracking-wider truncate w-24">{name}</p>
                            </div>
                          </div>
                          <div className="p-2 rounded-lg bg-white/5 text-slate-500 group-hover:text-white transition-colors">
                            <ArrowUpRight className="w-4 h-4" />
                          </div>
                        </div>

                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-slate-500 text-[9px] font-bold uppercase tracking-widest mb-1">Price</p>
                            <p className="text-white text-xl font-mono font-bold">
                              ${price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </p>
                          </div>
                          <div className={`px-2 py-1 rounded-md text-[11px] font-bold font-mono ${change >= 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                            {change >= 0 ? '+' : ''}{change.toFixed(2)}%
                          </div>
                        </div>
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