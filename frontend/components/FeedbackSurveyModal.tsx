import React, { useState, useEffect } from 'react';
import { X, Star, Send, Loader2, Sparkles, MessageSquare } from 'lucide-react';

interface FeedbackSurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: string;
  type: 'text' | 'rating';
  onSave: (feedback: string | number) => Promise<void>;
  title?: string;
}

const FeedbackSurveyModal: React.FC<FeedbackSurveyModalProps> = ({
  isOpen,
  onClose,
  question,
  type,
  onSave,
  title = "Help us improve"
}) => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setRating(0);
      setHoverRating(0);
      setComment('');
      setIsSubmitting(false);
      setIsSuccess(false);
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (type === 'rating' && rating === 0) return;
    if (type === 'text' && !comment.trim()) return;

    setIsSubmitting(true);
    try {
      await onSave(type === 'rating' ? rating : comment);
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      console.error("Failed to save feedback", error);
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      {/* Animated Backdrop */}
      <div 
        onClick={!isSubmitting ? onClose : undefined}
        className="absolute inset-0 bg-[#020617]/80 backdrop-blur-xl transition-all duration-700 animate-in fade-in"
      />
      
      {/* Modal Content - Glassmorphism Bento Box Style */}
      <div className="relative w-full max-w-[420px] animate-in fade-in zoom-in slide-in-from-bottom-8 duration-500 will-change-transform">
        
        {/* Glow Effects behind the modal */}
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-teal-500/20 rounded-[2.5rem] blur-2xl opacity-50" />
        
        <div className="relative bg-[#09090b]/90 backdrop-blur-3xl border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)] rounded-[2rem] overflow-hidden">
          
          {/* Top Decorative gradient */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-blue-500 opacity-80" />
          
          {/* Close button */}
          {!isSubmitting && !isSuccess && (
            <button 
              onClick={onClose}
              className="absolute right-5 top-5 p-2 rounded-full bg-white/[0.02] border border-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all z-10"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <div className="p-8">
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-8 animate-in zoom-in duration-500">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  <Sparkles className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight mb-2">Thank You</h3>
                <p className="text-slate-400 text-sm text-center">Your feedback helps us build a better platform.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Header Section */}
                <div className="space-y-3">
                  <div className="inline-flex items-center justify-center p-2.5 rounded-xl bg-white/[0.03] border border-white/5 mb-2">
                    {type === 'rating' ? (
                      <Star className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <MessageSquare className="w-5 h-5 text-blue-400" />
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight leading-tight">
                    {title}
                  </h3>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed">
                    {question}
                  </p>
                </div>

                {/* Input Section */}
                {type === 'rating' ? (
                  <div className="flex justify-between items-center px-2 py-4 bg-white/[0.02] rounded-2xl border border-white/5">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const isActive = (hoverRating || rating) >= star;
                      return (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(star)}
                          className="relative p-2 group transition-transform duration-300 hover:scale-125 active:scale-95"
                        >
                          <Star
                            className={`w-10 h-10 transition-all duration-300 ${
                              isActive
                                ? 'fill-emerald-400 text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.6)]'
                                : 'text-slate-700 hover:text-slate-500'
                            }`}
                            strokeWidth={isActive ? 1.5 : 1}
                          />
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="space-y-2 group">
                    <textarea
                      autoFocus
                      rows={4}
                      placeholder="Share your thoughts..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all resize-none placeholder:text-slate-600 shadow-inner group-hover:border-white/20"
                    />
                  </div>
                )}

                {/* Submit Action */}
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || (type === 'rating' ? rating === 0 : !comment.trim())}
                  className="relative w-full py-4 bg-white text-black font-black text-[13px] uppercase tracking-widest rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-40 disabled:scale-100 disabled:hover:shadow-none font-sans overflow-hidden group flex items-center justify-center gap-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-emerald-400/20 to-emerald-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Submit Feedback
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
                
                <p className="text-center text-[9px] text-slate-500 uppercase tracking-[0.2em] font-bold">
                  Institutional Grade Security • Encrypted Analytics
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackSurveyModal;
