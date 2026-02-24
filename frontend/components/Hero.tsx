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
        <section ref={containerRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] left-[20%] w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            v2.0 is now live
          </div>

          <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6 tracking-tight">
            Invest in the <br />
            <span className="gradient-text">Future of Wealth</span>
          </h1>

          <p ref={subtitleRef} className="text-lg text-slate-400 mb-8 leading-relaxed max-w-lg">
            Experience the next generation of financial tools. Real-time analytics, AI-driven insights, and institutional-grade security for the modern investor.
          </p>

          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 mb-16">
            <button
              onClick={()=>navigate('/signup')}
              className="flex items-center justify-center gap-2 bg-white text-dark hover:bg-slate-200 px-8 py-4 rounded-xl font-semibold transition-all group"
            >
              Start Investing
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

          </div>

          <div ref={statsRef} className="grid grid-cols-3 gap-8 border-t border-white/5 pt-8">
            <div>
              <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
                <ShieldCheck className="w-4 h-4" /> Security
              </div>
              <p className="text-2xl font-bold text-white">AES-256</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
                <Zap className="w-4 h-4" /> Speed
              </div>
              <p className="text-2xl font-bold text-white">&lt;50ms</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
                <Globe className="w-4 h-4" /> Global
              </div>
              <p className="text-2xl font-bold text-white">120+ Countries</p>
            </div>
          </div>
        </div>

        {/* Visual / Chart Area Mockup */}
        <div className="relative hidden lg:block h-[600px] w-full">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-blue-500/20 rounded-full blur-[80px]" />
            <div className="relative z-10 glass-panel rounded-2xl p-6 border border-white/10 shadow-2xl h-full flex flex-col justify-between transform rotate-[-2deg] hover:rotate-0 transition-transform duration-700">
               <div className="flex justify-between items-center mb-8">
                  <div>
                    <h3 className="text-slate-400 text-sm">Total Balance</h3>
                    <p className="text-3xl font-bold text-white">$124,592.45</p>
                  </div>
                  <div className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-lg text-sm font-medium">
                    +14.2%
                  </div>
               </div>

               {/* Decorative Chart Lines */}
               <div className="flex-1 flex items-end gap-2 px-2 pb-4">
                  {[40, 65, 50, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((h, i) => (
                    <div
                      key={i}
                      className="w-full bg-gradient-to-t from-emerald-500/50 to-emerald-400 rounded-t-sm transition-all duration-500 hover:opacity-80"
                      style={{ height: `${h}%` }}
                    />
                  ))}
               </div>

               <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-white/5 p-4 rounded-xl">
                     <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mb-2">
                        <span className="text-blue-400 text-xs">BTC</span>
                     </div>
                     <p className="font-semibold">Bitcoin</p>
                     <p className="text-sm text-slate-400">$64,230.10</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl">
                     <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mb-2">
                        <span className="text-purple-400 text-xs">ETH</span>
                     </div>
                     <p className="font-semibold">Ethereum</p>
                     <p className="text-sm text-slate-400">$3,450.85</p>
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
