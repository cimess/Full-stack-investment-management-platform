import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { 
  Shield, 
  User, 
  RefreshCcw, 
  Database, 
  Share2, 
  Globe, 
  Clock, 
  Scale, 
  EyeOff, 
  Mail,
  UserCheck,
  Zap,
  Lock
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

export default function PrivacyPage() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".animate-up", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
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
                <Shield className="w-3 h-3" /> Data Shield Active
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
                Privacy <br /> <span className="premium-text-gradient">Notice</span>
              </h1>
              <p className="text-xl text-slate-500 font-medium max-w-2xl leading-relaxed">
                Last updated <span className="text-white">April 07, 2026</span>. This notice outlines our strict protocols for accessing, collecting, and securing your digital footprint.
              </p>
            </div>

            <div className="animate-up">
              <LegalSection id="summary" title="Summary of Key Points" icon={Zap}>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { label: "Personal Info", text: "Processed based on your unique interactions with our investment platform." },
                    { label: "Sensitve Data", text: "We do NOT process sensitive biometric or genetic information." },
                    { label: "Third Parties", text: "Data may be synthesized from public databases and social frameworks." },
                    { label: "Your Rights", text: "You maintain sovereign control over your data, regardless of location." }
                  ].map((item, i) => (
                    <div key={i} className="p-6 glass-panel rounded-3xl border border-white/5 bg-white/[0.01]">
                      <h4 className="text-white text-[10px] font-black uppercase tracking-[0.2em] mb-3">{item.label}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </LegalSection>

              <LegalSection id="collection" title="1. Information Collection" icon={Database}>
                <p>We collect personal information that you voluntarily provide when registering, contacting support, or executing transactions.</p>
                <div className="bg-emerald-500/5 p-6 rounded-3xl border border-emerald-500/10 mb-6">
                  <p className="text-sm text-emerald-400 italic font-bold">
                    System Protocol: We automatically capture IP signatures, browser headers, and approximate geolocation to verify session authenticity.
                  </p>
                </div>
                <ul className="grid grid-cols-2 gap-x-8 gap-y-2">
                  {['IP Address', 'Browser Type', 'Device Metadata', 'Usage Patterns', 'Approximate Location'].map(item => (
                    <li key={item} className="flex gap-3 items-center text-sm text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </LegalSection>

              <LegalSection id="processing" title="2. Processing Logic" icon={RefreshCcw}>
                <p>Digital footprints are processed to maintain platform integrity, improve UX, and prevent adversarial actors.</p>
                <div className="space-y-4">
                  {[
                    "Maintaining high-performance asset visualization.",
                    "Executing security-critical fraud prevention algorithms.",
                    "Compliance with international financial reporting laws."
                  ].map((text, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                      <Lock className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                      <span className="text-sm">{text}</span>
                    </div>
                  ))}
                </div>
              </LegalSection>

              <LegalSection id="sharing" title="3. Data Sharing" icon={Share2}>
                <p>Situational data exchange occurs only under regulated scenarios:</p>
                <ul className="space-y-6">
                  {[
                    { title: "Business Transfers", text: "Strategic shifts including mergers or asset liquidation." },
                    { title: "Affiliated Entities", text: "Consistent protection across our parent and subsidiary network." },
                    { title: "Strategic Partners", text: "Collaborative promotions and specialized service delivery." }
                  ].map((item, i) => (
                    <li key={i}>
                      <h4 className="text-white text-sm font-bold mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-500">{item.text}</p>
                    </li>
                  ))}
                </ul>
              </LegalSection>

              <LegalSection id="tracking" title="4. Tracking & Cookies" icon={Globe}>
                <p>We utilize encrypted tracking technologies to fix latent bugs and store layout preferences.</p>
                <div className="p-6 glass-panel rounded-3xl border border-white/5">
                  <p className="text-sm italic">
                    "Third-party partners may deploy tracking nodes for cross-platform analytics and ad-targeting."
                  </p>
                </div>
              </LegalSection>

              <LegalSection id="social" title="5. Social Architectures" icon={UserCheck}>
                <p>Authenticating via social APIs grants us access to specific profile markers including your name, email signature, and profile image.</p>
              </LegalSection>

              <LegalSection id="retention" title="6. Data Cycles" icon={Clock}>
                <p>Your data resides within our ecosystem only for the duration required by business logic or statutory mandate.</p>
              </LegalSection>

              <LegalSection id="rights" title="7. Sovereign Rights" icon={Scale}>
                <p>You possess the absolute right to review, rectify, or purge your data footprint via our encrypted request portal.</p>
              </LegalSection>

              <LegalSection id="dnt" title="8. Do-Not-Track" icon={EyeOff}>
                <p>Our infrastructure currently lacks the hardware-level integration to respond to automated browser DNT signals.</p>
              </LegalSection>

              <LegalSection id="contact" title="9. Contact Division" icon={Mail}>
                <p>For escalation of privacy concerns, synthesize a secure communication to:</p>
                <div className="p-8 glass-panel rounded-[2.5rem] border border-white/10 bg-emerald-500/[0.02]">
                  <p className="text-white font-bold text-xl uppercase tracking-tighter mb-4">Cimess Invest HQ</p>
                  <p className="text-slate-400 text-sm leading-loose">
                    Legal & Privacy Compliance Unit<br />
                    54, Olude Bustop, Ipaja, Lagos<br />
                    Nigeria<br />
                    <span className="text-emerald-500 italic">privacy@cimessinvest.com</span>
                  </p>
                </div>
              </LegalSection>
            </div>
          </div>

          {/* Sidebar Navigation */}
          <aside className="hidden lg:block">
            <div className="sticky top-40 p-10 glass-panel rounded-[3rem] border border-white/5 shadow-2xl">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 mb-8 flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" /> Index
              </h3>
              <nav className="space-y-1">
                <NavLink href="#summary">Key Summary</NavLink>
                <NavLink href="#collection">Collection</NavLink>
                <NavLink href="#processing">Processing</NavLink>
                <NavLink href="#sharing">Sharing</NavLink>
                <NavLink href="#tracking">Cookies</NavLink>
                <NavLink href="#retention">Retention</NavLink>
                <NavLink href="#rights">Your Rights</NavLink>
                <NavLink href="#contact">Contact HQ</NavLink>
              </nav>

              <div className="mt-12 pt-8 border-t border-white/5">
                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-700">
                   <Shield className="w-3 h-3" /> Encrypted Access
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

