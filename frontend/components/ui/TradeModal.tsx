import React, { useState } from 'react';
import { X, TrendingUp, TrendingDown } from 'lucide-react';

interface TradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'buy' | 'sell';
  stock?: { symbol: string; name: string; price: number };
}

const TradeModal: React.FC<TradeModalProps> = ({ isOpen, onClose, mode, stock }) => {
  const [quantity, setQuantity] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const total = stock ? parseFloat(quantity || '0') * stock.price : 0;
  const isBuy = mode === 'buy';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setQuantity('');
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative glass-panel rounded-2xl w-full max-w-md border border-white/10 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className={`px-6 py-4 border-b border-white/5 flex items-center justify-between ${isBuy ? 'bg-emerald-500/5' : 'bg-red-500/5'}`}>
          <div className="flex items-center gap-3">
            {isBuy
              ? <TrendingUp className="w-5 h-5 text-emerald-400" />
              : <TrendingDown className="w-5 h-5 text-red-400" />
            }
            <h2 className="text-white font-bold text-lg">
              {isBuy ? 'Buy' : 'Sell'} {stock?.symbol || 'Stock'}
            </h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          {stock && (
            <div className="flex items-center justify-between p-4 bg-white/3 rounded-xl border border-white/5">
              <div>
                <p className="text-white font-semibold">{stock.symbol}</p>
                <p className="text-slate-400 text-sm">{stock.name}</p>
              </div>
              <div className="text-right">
                <p className="text-white font-bold">${stock.price.toFixed(2)}</p>
                <p className="text-slate-500 text-xs">per share</p>
              </div>
            </div>
          )}

          <div>
            <label className="text-slate-400 text-sm block mb-1.5">Number of Shares</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
              placeholder="Enter quantity..."
              className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500/50 transition-colors"
              required
            />
          </div>

          {quantity && parseFloat(quantity) > 0 && (
            <div className="p-4 bg-white/3 rounded-xl border border-white/5 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Subtotal</span>
                <span className="text-white">${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Est. Fee (0.1%)</span>
                <span className="text-slate-300">${(total * 0.001).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold border-t border-white/5 pt-2 mt-1">
                <span className="text-white">Total</span>
                <span className={isBuy ? 'text-emerald-400' : 'text-red-400'}>
                  ${(total * 1.001).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={submitted}
            className={`w-full py-2.5 sm:py-3 rounded-xl font-bold text-white text-sm sm:text-base transition-all ${
              submitted
                ? 'bg-slate-700 cursor-not-allowed'
                : isBuy
                ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 shadow-lg shadow-emerald-500/20'
                : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 shadow-lg shadow-red-500/20'
            }`}
          >
            {submitted ? '✓ Order Placed!' : `Confirm ${isBuy ? 'Buy' : 'Sell'}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TradeModal;
