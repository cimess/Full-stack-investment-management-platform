import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { AlertTriangle, TrendingDown, Clock, ShieldAlert, Zap, Globe, FileWarning, Search, HelpCircle } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const LegalSection = ({ id, title, icon: Icon, children }: { id: string; title: string; icon: any; children: React.ReactNode }) => (
  <div id={id} className="legal-section glass-panel p-8 rounded-3xl mb-8 border border-white/5 hover:border-white/10 transition-colors">
    <div className="flex items-center gap-4 mb-6">
      <div className="p-3 bg-white/5 rounded-2xl">
        <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
      </div>
      <h2 className="text-2xl font-bold gradient-text">{title}</h2>
    </div>
    <div className="text-slate-400 leading-relaxed space-y-4 text-sm md:text-base">
      {children}
    </div>
  </div>
);

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a 
    href={href} 
    className="block py-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors border-l-2 border-transparent hover:border-white pl-4"
  >
    {children}
  </a>
);

export default function RiskPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.legal-section', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24" ref={containerRef}>
        <div className="grid lg:grid-cols-[1fr_300px] gap-16">
          {/* Content Column */}
          <div className="space-y-4">
            <div className="mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                Important Disclaimer
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 premium-text-gradient">
                Risk <br /> Disclosure
              </h1>
              <p className="text-xl text-slate-500 font-medium max-w-2xl leading-relaxed">
                All forms of investments carry risk. This disclosure outlines the potential financial and operational risks associated with using our platform.
              </p>
            </div>

            <LegalSection id="market" title="1. Market Risks" icon={TrendingDown}>
              <p>The value of investments and the income from them can go down as well as up. You may not get back the full amount you invested. Past performance is not a reliable indicator of future results.</p>
              <ul className="list-disc ml-5 space-y-2">
                <li><strong>Volatility:</strong> High fluctuations in market prices may result in significant capital loss.</li>
                <li><strong>Liquidity:</strong> Certain assets or strategies may be difficult to buy or sell quickly at a stable price.</li>
                <li><strong>Economic Factors:</strong> Inflation, interest rate changes, and geopolitical events can impact portfolio values.</li>
              </ul>
            </LegalSection>

            <LegalSection id="platform" title="2. Platform Scope" icon={Globe}>
              <p>CimessInvest is purely a portfolio tracking and analytics tool. We do not provide trading execution or brokerage services.</p>
              <div className="bg-white/[0.03] border border-white/10 p-5 rounded-2xl mt-4">
                <p className="font-bold text-white mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-emerald-500" />
                  SOFTWARE LIMITATIONS
                </p>
                <p className="text-xs uppercase tracking-wider leading-relaxed">
                  We are not responsible for software bugs, API latency, or third-party data errors that may lead to inaccurate portfolio representations.
                </p>
              </div>
            </LegalSection>

            <LegalSection id="leverage" title="3. Leverage Risks" icon={Zap}>
              <p>Leveraging assets (using borrowed funds to invest) can amplify both gains and losses. It is possible to lose more than your initial investment when using leverage.</p>
              <p>CimessInvest analytics may show leveraged positions; however, we do not verify the margin requirements or liquidation risks of your external brokerage accounts.</p>
            </LegalSection>

            <LegalSection id="technical" title="4. Technical Risks" icon={Clock}>
              <p>Electronic systems are inherently subject to failure or delay. We are not liable for any losses resulting from technical issues, including service interruptions, cyberattacks, or data breaches.</p>
            </LegalSection>

            <LegalSection id="manager" title="5. Third-Party Managers" icon={ShieldAlert}>
              <p>If you use CimessInvest to track a portfolio managed by a third party, you acknowledge that:</p>
              <ul className="list-disc ml-5 space-y-2">
                <li>We do not vet or endorse any portfolio manager.</li>
                <li>Managers operate independently.</li>
                <li>We have no control over their investment decisions or fund handling.</li>
              </ul>
            </LegalSection>

            <LegalSection id="crypto" title="6. Cryptocurrency Risks" icon={FileWarning}>
              <p>Cryptocurrencies are highly volatile and largely unregulated. They carry unique risks including exchange failures, wallet security, and protocol-level vulnerabilities.</p>
            </LegalSection>

            <LegalSection id="compliance" title="7. User Due Diligence" icon={Search}>
              <p>It is your sole responsibility to conduct proper research and due diligence before making any investment. You should consult with professional financial, legal, and tax advisors.</p>
            </LegalSection>

            <LegalSection id="contact" title="8. Questions" icon={HelpCircle}>
              <p>If you have any questions regarding these risks, please consult with a qualified professional or contact us for clarification on platform functionality.</p>
              <div className="mt-4 p-6 glass-panel rounded-2xl border border-white/5 text-slate-400">
                Email: <a href="mailto:risk@cimessdev.com" className="text-white hover:underline">risk@cimessdev.com</a>
              </div>
            </LegalSection>
          </div>

          {/* Sidebar Navigation */}
          <div className="hidden lg:block">
            <div className="sticky top-32 space-y-8">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-6">Navigation</h3>
                <nav className="space-y-1">
                  <NavLink href="#market">Market Risks</NavLink>
                  <NavLink href="#platform">Platform Scope</NavLink>
                  <NavLink href="#leverage">Leverage</NavLink>
                  <NavLink href="#technical">Technical Risks</NavLink>
                  <NavLink href="#manager">Third-Party Managers</NavLink>
                  <NavLink href="#crypto">Crypto Assets</NavLink>
                  <NavLink href="#compliance">Due Diligence</NavLink>
                  <NavLink href="#contact">Questions</NavLink>
                </nav>
              </div>

              <div className="p-6 glass-panel rounded-3xl border border-white/5">
                <p className="text-xs font-bold text-white uppercase tracking-widest mb-4">Risk Awareness</p>
                <p className="text-slate-500 text-xs leading-relaxed mb-6">
                  Investments are subject to market risks. Read carefully.
                </p>
                <button className="w-full py-3 bg-white text-black rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-100 transition-all">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
