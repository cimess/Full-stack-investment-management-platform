import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { 
  Cookie, 
  ShieldCheck, 
  Globe, 
  Settings, 
  MousePointer2, 
  ShieldAlert, 
  Info,
  HelpCircle
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

/**
 * Reusable layout components for legal pages
 */
const LegalSection = ({ id, title, icon: Icon, children }: { id: string; title: string; icon: any; children: React.ReactNode }) => (
  <section id={id} className="mb-20 scroll-mt-32 group">
    <div className="flex items-center gap-4 mb-6">
      <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 text-emerald-500 group-hover:scale-110 transition-transform duration-500">
        <Icon className="w-6 h-6" />
      </div>
      <h2 className="text-2xl font-bold tracking-tight text-white">{title}</h2>
    </div>
    <div className="space-y-6 text-slate-400 leading-relaxed font-medium text-lg">
      {children}
    </div>
  </section>
);

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a 
    href={href} 
    className="block py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-all border-l-2 border-transparent hover:border-emerald-500 pl-4"
  >
    {children}
  </a>
);

const CookiePolicy = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".animate-up", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-emerald-500 selection:text-black">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 pt-40 pb-24" ref={containerRef}>
        <div className="grid lg:grid-cols-[1fr_300px] gap-20">
          
          {/* Content Column */}
          <div className="max-w-4xl">
            <div className="mb-20 animate-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-emerald-500 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                <Cookie className="w-3 h-3" /> Compliance Division
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
                Cookie <br /> <span className="premium-text-gradient">Policy</span>
              </h1>
              <p className="text-xl text-slate-500 font-medium max-w-2xl leading-relaxed">
                Last updated <span className="text-white">April 07, 2026</span>. This policy governs how we utilize digital signatures and recognition patterns via cookies.
              </p>
            </div>

            <div className="animate-up">
              <LegalSection id="intro" title="Introduction" icon={ShieldCheck}>
                <p>
                  This Cookie Policy explains how <strong>Cimess Invest</strong> ("Company," "we," "us," and "our") 
                  uses cookies and similar technologies to recognize you when you visit our secure portal at{' '}
                  <a href="http://www.cimessinvest.com" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:underline">
                    www.cimessinvest.com
                  </a>.
                </p>
                <div className="p-6 glass-panel rounded-3xl border border-white/5 bg-emerald-500/5">
                  <p className="text-sm italic">
                    "Recognizing your behavior allows us to optimize your investment dashboard and ensure session security 
                    against unauthorized access."
                  </p>
                </div>
              </LegalSection>

              <LegalSection id="what" title="What are cookies?" icon={Globe}>
                <p>
                  Cookies are high-speed data fragments placed on your device to facilitate identity verification 
                  and platform efficiency.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                    <h4 className="text-white text-sm font-bold mb-2">First-Party</h4>
                    <p className="text-xs">Directly issued by Cimess Invest for core authentication and security.</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                    <h4 className="text-white text-sm font-bold mb-2">Third-Party</h4>
                    <p className="text-xs">Issued by verified partners to provide analytics and advanced market insights.</p>
                  </div>
                </div>
              </LegalSection>

              <LegalSection id="why" title="Analytical Intent" icon={Settings}>
                <p>
                  We deploy cookies for technical synchronization, interest-based targeting, and algorithmic analytics.
                </p>
                <ul className="space-y-4">
                  {[
                    "Session Continuity: Keeping you securely authenticated during trading.",
                    "Performance Tuning: Identifying high-latency areas in our reporting tools.",
                    "Preference Storage: Remembering your layout and asset filter selections."
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2.5 shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </LegalSection>

              <LegalSection id="control" title="User Autonomy" icon={MousePointer2}>
                <p>
                  You possess the inherent right to accept or modulate your cookie footprint. 
                  Use our <span className="text-white">Cookie Preference Center</span> to execute granular control.
                </p>
                <div className="bg-white/[0.03] border border-white/10 p-6 rounded-3xl mt-4">
                  <div className="flex items-center gap-3 mb-3 text-emerald-500">
                    <ShieldAlert className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-widest text-white">Critical Note</span>
                  </div>
                  <p className="text-xs leading-relaxed uppercase tracking-wider">
                    Essential cookies are the backbone of our secure environment and cannot be deactivated. 
                    Rejecting other patterns may result in diminished analytical oversight of your assets.
                  </p>
                </div>
              </LegalSection>

              <LegalSection id="browser" title="Browser Management" icon={Info}>
                <p>
                  Standard browser architectures allow for manual exclusion of tracking patterns. 
                  Consult your specific interface documentation for advanced revocation instructions.
                </p>
              </LegalSection>

              <LegalSection id="contact" title="Queries" icon={HelpCircle}>
                <p>
                  For detailed information regarding our data recognition algorithms, 
                  synthesize a request to <a href="mailto:support@cimessinvest.com" className="text-white underline">legal@cimessinvest.com</a>.
                </p>
              </LegalSection>
            </div>
          </div>

          {/* Sidebar Navigation */}
          <aside className="hidden lg:block">
            <div className="sticky top-40 p-8 glass-panel rounded-[2.5rem] border border-white/5 shadow-2xl">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 mb-8 flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-emerald-500" /> Navigation
              </h3>
              <nav className="space-y-2">
                <NavLink href="#intro">Introduction</NavLink>
                <NavLink href="#what">What are cookies?</NavLink>
                <NavLink href="#why">Why we use them</NavLink>
                <NavLink href="#control">How to control</NavLink>
                <NavLink href="#browser">Browser management</NavLink>
                <NavLink href="#contact">Contact Support</NavLink>
              </nav>

              <div className="mt-12 pt-8 border-t border-white/5">
                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest leading-loose">
                  Your protection is our primary synchronization.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CookiePolicy;






