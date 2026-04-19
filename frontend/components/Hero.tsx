import React, { useRef, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowRight, ShieldCheck, Zap, Globe } from 'lucide-react';
import Features from './Features';
import MarketChart from './MarketChart';
import GeminiAdvisor from './GeminiAdvisor';
import DiscoverPage from './DiscoverPage';
import ContactUs from './ContactUs';
import DetailsModal from './DetailsModal';
import Header from './Header';
import Footer from './Footer';


interface HeroProps {
  onGetStarted?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(titleRef.current, { y: 50, opacity: 0, duration: 1 })
        .from(subtitleRef.current, { y: 30, opacity: 0, duration: 0.8 }, '-=0.6')
        .from(buttonsRef.current, { y: 20, opacity: 0, duration: 0.8 }, '-=0.6')
        .from(statsRef.current?.children || [], {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1
        }, '-=0.4');
    }, containerRef);

    return () => ctx.revert();
  }, []);
  const navigate=useNavigate()

  return (
    <>
    <Header/>
        <section ref={containerRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-black">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 bg-black">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-emerald-500/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[700px] h-[700px] bg-blue-600/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-16 items-center">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
            Platform Status: Live
          </div>

          <h1 ref={titleRef} className="text-6xl md:text-8xl font-bold leading-[1.05] mb-10 tracking-tighter">
            Invest in the <br />
            <span className="premium-text-gradient">Future in Style</span>
          </h1>

          <p ref={subtitleRef} className="text-xl text-slate-400 mb-12 leading-relaxed max-w-lg font-medium">
            Next generation financial tools. Real-time analytics, AI insights, and institutional-grade security.
          </p>

          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-5 mb-20  items-center">
            <button
              onClick={()=>navigate('/signup')}
              className=" w-[70%] flex items-center justify-center gap-3 bg-white text-black hover:bg-slate-100 px-4 py-2 md:px-6 rounded-2xl font-bold transition-all group shadow-xl shadow-white/5 active:scale-95"
            >
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
            </button>
            <button
               onClick={()=>navigate('/login')}
               className="w-[70%] flex items-center justify-center gap-3 bg-white/[0.03] border border-white/10 text-white hover:bg-white/[0.06] px-4 py-2 md:px-6 rounded-2xl font-bold transition-all active:scale-95"
            >
              Sign In
            </button>
          </div>

          <div ref={statsRef} className="grid grid-cols-3 gap-10 border-t border-white/5 pt-10">
            <div>
              <div className="flex items-center gap-2 text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-2">
                <ShieldCheck className="w-3.5 h-3.5" strokeWidth={1.5} /> Security
              </div>
              <p className="text-2xl font-bold text-white font-mono tracking-tighter">AES-256</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-2">
                <Zap className="w-3.5 h-3.5" strokeWidth={1.5} /> Latency
              </div>
              <p className="text-2xl font-bold text-white font-mono tracking-tighter">&lt;30ms</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-2">
                <Globe className="w-3.5 h-3.5" strokeWidth={1.5} /> Scope
              </div>
              <p className="text-2xl font-bold text-white font-mono tracking-tighter">Global</p>
            </div>
          </div>
        </div>

        {/* Visual / Chart Area Mockup */}
        <div className="relative hidden lg:block h-[580px] w-full">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.05] to-transparent rounded-full blur-[100px]" />
            <div className="relative z-10 bg-[#0a0a0a]/80 backdrop-blur-2xl rounded-[2.5rem] p-10 border border-white/[0.08] shadow-2xl h-full flex flex-col justify-between transform transition-all duration-1000">
               <div className="flex justify-between items-start mb-10">
                  <div>
                    <h3 className="premium-label mb-2">Available Balance</h3>
                    <p className="text-4xl font-bold text-white font-mono tracking-tighter">$124,592.45</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 text-white px-3 py-1.5 rounded-xl text-xs font-bold font-mono">
                    +14.2%
                  </div>
               </div>

               {/* Decorative Chart Lines */}
               <div className="flex-1 flex items-end gap-2.5 px-2 pb-8">
                  {[40, 65, 50, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((h, i) => (
                    <div
                      key={i}
                      className="w-full bg-white/[0.03] border-t border-white/20 rounded-t-lg transition-all duration-700 hover:bg-white/10"
                      style={{ height: `${h}%` }}
                    />
                  ))}
               </div>

               <div className="grid grid-cols-2 gap-6 mt-6">
                  <div className="bg-white/[0.03] border border-white/5 p-5 rounded-3xl">
                     <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center mb-3 border border-white/10">
                        <span className="text-white text-xs font-bold font-mono">BTC</span>
                     </div>
                     <p className="font-bold text-white tracking-tight">Bitcoin</p>
                     <p className="text-sm text-slate-500 font-mono">$64,230.10</p>
                  </div>
                  <div className="bg-white/[0.03] border border-white/5 p-5 rounded-3xl">
                     <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center mb-3 border border-white/10">
                        <span className="text-white text-xs font-bold font-mono">ETH</span>
                     </div>
                     <p className="font-bold text-white tracking-tight">Ethereum</p>
                     <p className="text-sm text-slate-500 font-mono">$3,450.85</p>
                  </div>
               </div>
            </div>
        </div>
      </div>
    </section>
     <DiscoverPage />
    <Features />
    <MarketChart />
    <GeminiAdvisor />
    <ContactUs />
    <section>

    </section>
    <Footer/>
    </>
  );
};

export default Hero;
