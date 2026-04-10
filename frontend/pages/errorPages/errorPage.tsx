import { AlertTriangle, Home, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ErrorPage({ errorPage, resetErrorBoundary }: { errorPage: boolean, resetErrorBoundary?: () => void }) {
    const navigate = useNavigate();

    const handleGoBack = () => {
        resetErrorBoundary();
        navigate(-1);
    }
    const handleGoHome = () => {
        resetErrorBoundary();
        navigate("/");
    }




    return (
        <div className="min-h-screen w-full bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden font-sans">

            {/* Animated Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse delay-700" />

            {/* Huge Background Text Decor */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.02]">
                <h1 className="text-[40vw] font-black text-white">{errorPage ? "ERR" : "404"}</h1>
            </div>

            <div className="relative z-10 max-w-lg w-full">
                {/* Glassmorphic Card */}
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl text-center">

                    {/* Icon Container */}
                    <div className="w-20 h-20 bg-gradient-to-br from-amber-400/20 to-orange-600/20 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-amber-500/20 shadow-lg shadow-amber-500/5">
                        <AlertTriangle className="w-10 h-10 text-amber-500" />
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                        {errorPage ? "System Disturbance" : "Page Not Found"}
                    </h1>

                    <p className="text-slate-400 text-lg mb-10 leading-relaxed font-light">
                        {errorPage
                            ? "An unexpected error occurred in the platform core. Our engineers have been notified of the anomaly."
                            : "The asset or page you are looking for has moved or no longer exists in our database."
                        }
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={handleGoBack}
                            className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 hover:border-white/20 transition-all active:scale-[0.98]"
                        >
                            <RotateCcw size={18} className="text-slate-400" />
                            Go Back
                        </button>

                        <button
                            onClick={handleGoHome}
                            className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-600 text-white font-bold shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all active:scale-[0.98]"
                        >
                            <Home size={18} />
                            Portal Home
                        </button>
                    </div>

                    {/* Footer Note */}
                    <div className="mt-12 pt-8 border-t border-white/5">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold">
                            Cimess Invest Portfolio Management System
                        </p>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 0.5; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(1.1); }
                }
                .animate-pulse {
                    animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
            `}</style>
        </div>
    );
}
