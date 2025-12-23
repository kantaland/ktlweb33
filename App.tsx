import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VideoGrid from './components/VideoGrid';
import MusicSection from './components/MusicSection';
import Placements from './components/Placements';
import Incubator from './components/Incubator';
import Architect from './components/Architect';
import AdminLogin from './components/AdminLogin';
import PressSection from './components/PressSection';
import GlobalEditorMenu from './components/GlobalEditorMenu';
import InvestorLogin from './components/InvestorLogin';
import InvestorDashboard from './components/InvestorDashboard';
import SimpleContentPage from './components/SimpleContentPage';
import SystemLoader from './components/SystemLoader';
import LabCursor from './components/LabCursor';
import { Tab } from './types';
import { Instagram, Linkedin, Music } from 'lucide-react';
import { useAdmin } from './contexts/AdminContext';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.HOME);
  const { isAuthenticated } = useAdmin();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case Tab.HOME:
        return (
          <>
            <Hero onNavigate={setActiveTab} />
            <Incubator />
            <PressSection 
                limit={3} 
                onViewAll={() => setActiveTab(Tab.PRESS)} 
            />
          </>
        );
      case Tab.INCUBATOR:
        return <Incubator />;
      case Tab.HOLLYWOOD:
        return (
            <>
                <MusicSection />
                <Placements />
            </>
        );
      case Tab.M3:
        return <VideoGrid />;
      case Tab.ARCHITECT:
        return <Architect />;
      case Tab.PRESS:
        return <PressSection />;
      case Tab.ADMIN:
        return <AdminLogin onLoginSuccess={() => setActiveTab(Tab.HOME)} />;
      case Tab.INVESTOR_LOGIN:
        if (isAuthenticated) {
            return <InvestorDashboard onLogout={() => setActiveTab(Tab.HOME)} />; 
        }
        return <InvestorLogin onNavigate={setActiveTab} />;
      case Tab.CONTACT:
        return (
          <div className="bg-white min-h-screen pt-48 pb-32">
            <div className="max-w-[1800px] mx-auto px-6 md:px-16">
               <div className="border-t border-black pt-24">
                   <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-gray-400 mb-20 block pl-6 border-l border-black">Establish Contact</span>
                   <h1 className="text-6xl md:text-9xl font-serif italic text-black mb-32 tracking-tighter leading-[0.8] max-w-6xl uppercase">
                     Join the <span className="text-gray-300">Movement</span>
                   </h1>
                   
                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 mb-48 border-t border-rover-border pt-20">
                       <p className="text-2xl md:text-4xl text-gray-900 leading-snug font-light max-w-2xl">
                         For high-level partnerships, bespoke creative commissions, and strategic cultural initiatives.
                       </p>
                       <div className="flex flex-col gap-16 md:items-end">
                           <div className="flex flex-col items-start md:items-end gap-4">
                                <span className="text-[10px] font-bold tracking-brand uppercase text-gray-300">Correspondence</span>
                                <a href="mailto:aoi@urbanhippyfantasy.com" className="text-3xl md:text-5xl font-serif italic text-black hover:text-gray-400 transition-colors border-b border-black pb-2">
                                    aoi@urbanhippyfantasy.com
                                </a>
                           </div>
                           <div className="flex flex-col items-start md:items-end gap-4">
                                <span className="text-[10px] font-bold tracking-brand uppercase text-gray-300">Global Hub</span>
                                <span className="text-3xl md:text-5xl font-serif italic text-black">Hollywood, CA</span>
                           </div>
                       </div>
                   </div>
               </div>
            </div>
          </div>
        );
      
      case Tab.DISTRIBUTION:
        return (
            <SimpleContentPage 
                title="Distribution" 
                subtitle="Hollywood Division" 
                content={
                    <div className="space-y-12">
                        <section>
                            <h3 className="text-xs font-bold uppercase tracking-brand text-black mb-6">Master Distribution Network</h3>
                            <p className="text-xl font-light leading-relaxed">Global music distribution powered by our strategic technology partners AWAL and Sony Music UK. We empower independent creators with the infrastructure to reach 180+ territories while maintaining 100% master ownership.</p>
                        </section>
                    </div>
                } 
            />
        );
      case Tab.PUBLISHING:
        return (
            <SimpleContentPage 
                title="Publishing" 
                subtitle="Rights Management" 
                content={
                    <div className="space-y-12">
                        <section>
                            <h3 className="text-xs font-bold uppercase tracking-brand text-black mb-6">Administration</h3>
                            <p className="text-xl font-light leading-relaxed">Global publishing administration and rights management powered by our tech partner <strong>Kobalt Music</strong>. We protect intellectual property and collect global royalties across all performance and mechanical societies.</p>
                        </section>
                    </div>
                } 
            />
        );
      case Tab.CREATIVE_DIRECTION:
        return (
            <SimpleContentPage 
                title="Creative Direction" 
                subtitle="M3 Division" 
                content={
                    <div className="space-y-12">
                        <section>
                            <h3 className="text-xs font-bold uppercase tracking-brand text-black mb-6">Cultural Architecture</h3>
                            <p className="text-xl font-light leading-relaxed">Strategic visionary guidance for brands and high-profile artists. We provide the architectural blueprint for cultural resonance, focusing on world-building and narrative evolution.</p>
                        </section>
                    </div>
                } 
            />
        );
      case Tab.VISUAL_IDENTITY:
        return (
            <SimpleContentPage 
                title="Visual Identity" 
                subtitle="M3 Division" 
                content={
                    <div className="space-y-12">
                        <section>
                            <h3 className="text-xs font-bold uppercase tracking-brand text-black mb-6">Design Language</h3>
                            <p className="text-xl font-light leading-relaxed">High-fidelity design language and visual systems. We create the aesthetic DNA that makes brands instantly recognizable and culturally significant in a digital-first landscape.</p>
                        </section>
                    </div>
                } 
            />
        );
      case Tab.PRIVACY_POLICY:
        return (
            <SimpleContentPage 
                title="Privacy Policy" 
                subtitle="Legal Protocol" 
                lastUpdated="March 2025"
                content={
                    <div className="space-y-16">
                        <section className="border-b border-gray-100 pb-12">
                            <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-4 block">0.0 Legal Status</span>
                            <p className="text-lg font-light leading-relaxed text-gray-900 italic">
                                KANTALAND is a brand identity and proprietary digital ecosystem under the ownership of <span className="text-black font-medium">URBAN HIPPY FANTASY</span>, a California-based corporation.
                            </p>
                        </section>
                        
                        <div className="space-y-12">
                            <section className="reveal-on-scroll">
                                <h4 className="text-xs font-bold uppercase tracking-brand text-black mb-4">1.0 Data Stewardship</h4>
                                <p className="text-base font-light leading-relaxed text-gray-600">The Company adheres to strict data minimization protocols. We collect only information essential for the execution of creative strategy and investment fulfillment. All data processing is performed in compliance with California privacy standards.</p>
                            </section>
                        </div>
                    </div>
                } 
            />
        );
      case Tab.TERMS_OF_USE:
        return (
            <SimpleContentPage 
                title="Terms of Use" 
                subtitle="Legal Protocol" 
                lastUpdated="March 2025"
                content={
                    <div className="space-y-16">
                         <section className="border-b border-gray-100 pb-12">
                            <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-4 block">Executive Notice</span>
                            <p className="text-lg font-light leading-relaxed text-gray-900 italic">
                                Use of this platform constitutes a binding agreement between the end-user and <span className="text-black font-medium">URBAN HIPPY FANTASY</span>. Access is granted exclusively for the exploration of our architectural methodologies.
                            </p>
                        </section>
                    </div>
                } 
            />
        );
      case Tab.SUBMISSIONS:
        return (
            <SimpleContentPage 
                title="Submissions" 
                subtitle="Talent Inquiry" 
                content={
                    <div className="space-y-12">
                        <section>
                            <h3 className="text-xs font-bold uppercase tracking-brand text-black mb-6">Strategic Talent Acquisition</h3>
                            <p className="text-xl font-light leading-relaxed">We are always seeking disruptors who operate at the intersection of culture and capital. Music submissions and creative portfolios are reviewed by our General Partners on a rolling basis.</p>
                        </section>
                    </div>
                } 
            />
        );
      case Tab.CAREERS:
        return (
            <SimpleContentPage 
                title="Careers" 
                subtitle="Join the Movement" 
                content={
                    <div className="space-y-12">
                        <section>
                            <h3 className="text-xs font-bold uppercase tracking-brand text-black mb-6">The Culture</h3>
                            <p className="text-xl font-light leading-relaxed">KANTALAND is a high-performance ecosystem for visionaries in technology, design, and music strategy. We value autonomy, rapid iteration, and cultural intuition.</p>
                        </section>
                    </div>
                } 
            />
        );
        
      default:
        return <Hero onNavigate={setActiveTab} />;
    }
  };

  return (
    <>
        {isLoading && <SystemLoader onComplete={() => setIsLoading(false)} />}
        
        {!isLoading && (
            <div className="animate-[fadeIn_0.8s_ease-out] cursor-none">
                <LabCursor />
                <div className="noise-overlay fixed inset-0 z-50 pointer-events-none opacity-[0.03]"></div>
                {/* Global Scanlines */}
                <div className="fixed inset-0 z-40 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%]"></div>
                
                <div className={`bg-white text-rover-text font-sans selection:bg-black selection:text-white min-h-screen flex flex-col lab-grid`}>
                    <Navbar currentTab={activeTab} onTabChange={setActiveTab} />
                    {isAuthenticated && <GlobalEditorMenu onNavigate={setActiveTab} />}
                    
                    <main className="flex-grow w-full">
                        {renderContent()}
                    </main>
                    
                    <footer className="w-full bg-white border-t border-rover-border pt-32 pb-16">
                        <div className="max-w-[1800px] mx-auto px-6 md:px-16">
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-y-24 gap-x-16 mb-32">
                                <div className="col-span-2 md:col-span-1">
                                    <h3 className="text-[10px] font-bold tracking-[0.4em] uppercase text-black mb-10">ARCHIVE</h3>
                                    <ul className="space-y-5">
                                        <li><button onClick={() => setActiveTab(Tab.INCUBATOR)} className="text-[11px] text-gray-400 hover:text-black transition-colors uppercase tracking-[0.2em] font-medium">The Vision</button></li>
                                        <li><button onClick={() => setActiveTab(Tab.HOLLYWOOD)} className="text-[11px] text-gray-400 hover:text-black transition-colors uppercase tracking-[0.2em] font-medium">Hollywood</button></li>
                                        <li><button onClick={() => setActiveTab(Tab.M3)} className="text-[11px] text-gray-400 hover:text-black transition-colors uppercase tracking-[0.2em] font-medium">Design</button></li>
                                        <li><button onClick={() => setActiveTab(Tab.ARCHITECT)} className="text-[11px] text-gray-400 hover:text-black transition-colors uppercase tracking-[0.2em] font-medium">Architect</button></li>
                                    </ul>
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <h3 className="text-[10px] font-bold tracking-[0.4em] uppercase text-black mb-10">DIVISIONS</h3>
                                    <ul className="space-y-5">
                                        <li><button onClick={() => setActiveTab(Tab.DISTRIBUTION)} className="text-[11px] text-gray-400 hover:text-black transition-colors uppercase tracking-[0.2em] font-medium">Distribution</button></li>
                                        <li><button onClick={() => setActiveTab(Tab.PUBLISHING)} className="text-[11px] text-gray-400 hover:text-black transition-colors uppercase tracking-[0.2em] font-medium">Publishing</button></li>
                                        <li><button onClick={() => setActiveTab(Tab.CREATIVE_DIRECTION)} className="text-[11px] text-gray-400 hover:text-black transition-colors uppercase tracking-[0.2em] font-medium">Direction</button></li>
                                        <li><button onClick={() => setActiveTab(Tab.VISUAL_IDENTITY)} className="text-[11px] text-gray-400 hover:text-black transition-colors uppercase tracking-[0.2em] font-medium">Identity</button></li>
                                    </ul>
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <h3 className="text-[10px] font-bold tracking-[0.4em] uppercase text-black mb-10">PROTOCOL</h3>
                                    <ul className="space-y-5">
                                        <li><button onClick={() => setActiveTab(Tab.PRIVACY_POLICY)} className="text-[11px] text-gray-400 hover:text-black transition-colors uppercase tracking-[0.2em] font-medium">Privacy</button></li>
                                        <li><button onClick={() => setActiveTab(Tab.TERMS_OF_USE)} className="text-[11px] text-gray-400 hover:text-black transition-colors uppercase tracking-[0.2em] font-medium">Terms</button></li>
                                        <li><button onClick={() => setActiveTab(Tab.SUBMISSIONS)} className="text-[11px] text-gray-400 hover:text-black transition-colors uppercase tracking-[0.2em] font-medium">Submissions</button></li>
                                    </ul>
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <h3 className="text-[10px] font-bold tracking-[0.4em] uppercase text-black mb-10">ACCESS</h3>
                                    <ul className="space-y-5">
                                        <li><button onClick={() => setActiveTab(Tab.INVESTOR_LOGIN)} className="text-[11px] text-gray-400 hover:text-black transition-colors uppercase tracking-[0.2em] font-medium">Investor Portal</button></li>
                                        <li><button onClick={() => setActiveTab(Tab.PRESS)} className="text-[11px] text-gray-400 hover:text-black transition-colors uppercase tracking-[0.2em] font-medium">Press Room</button></li>
                                        <li><button onClick={() => setActiveTab(Tab.CAREERS)} className="text-[11px] text-gray-400 hover:text-black transition-colors uppercase tracking-[0.2em] font-medium">Careers</button></li>
                                    </ul>
                                </div>
                                <div className="col-span-2 lg:col-span-1 flex justify-start md:justify-end gap-10 items-start">
                                    <a href="https://www.instagram.com/kantaland" target="_blank" className="text-black hover:opacity-40 transition-all duration-500"><Instagram size={24} strokeWidth={1}/></a>
                                    <a href="https://www.linkedin.com/in/kanta-kudo-5b018785/" target="_blank" className="text-black hover:opacity-40 transition-all duration-500"><Linkedin size={24} strokeWidth={1}/></a>
                                    <a href="https://open.spotify.com/artist/1sb3bbYGpYX84TKUvdw2dO?si=br_43bPvTb2FFoylyYC1Lg" target="_blank" className="text-black hover:opacity-40 transition-all duration-500"><Music size={24} strokeWidth={1}/></a>
                                </div>
                            </div>

                            <div className="border-t border-rover-border pt-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                                <div className="flex flex-col gap-2">
                                    <p className="text-[10px] text-gray-900 uppercase tracking-[0.5em] font-bold">© {new Date().getFullYear()} KANTALAND.</p>
                                    <p className="text-[9px] text-gray-400 uppercase tracking-[0.3em] font-medium">A subsidiary of URBAN HIPPY FANTASY, a California Corporation.</p>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        )}
    </>
  );
};

export default App;