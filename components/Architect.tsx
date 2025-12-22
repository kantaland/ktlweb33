
import React from 'react';
import { KANTA_BIO } from '../constants';
import { Quote, ArrowRight, ShieldCheck, Globe, Zap } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';
import { EditableText, EditableImage } from './Editable';

const Architect: React.FC = () => {
    const { siteData, updateSiteData, publish } = useAdmin();
    
  return (
    <div className="bg-white min-h-screen pt-40 pb-40">
        <div className="max-w-[1800px] mx-auto px-6 md:px-16">
            <div className="border-t border-black pt-16">
                
                {/* Section Header */}
                <div className="flex flex-col lg:flex-row justify-between items-start mb-24 md:mb-32 gap-12">
                    <div className="flex-1">
                        <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-gray-400 mb-8 block pl-6 border-l border-black">Origin // Tokyo-LA</span>
                        <h1 className="text-5xl md:text-8xl font-serif italic text-black tracking-tighter leading-[0.85] uppercase mb-8">
                            Sonic <span className="text-gray-300">Identity</span> Architect
                        </h1>
                        <div className="flex flex-wrap gap-4 mt-12">
                            <span className="px-4 py-2 bg-gray-50 border border-gray-100 text-[9px] font-bold tracking-brand text-black uppercase">Master Rights Holder</span>
                            <span className="px-4 py-2 bg-gray-50 border border-gray-100 text-[9px] font-bold tracking-brand text-black uppercase">Sound Engineering</span>
                            <span className="px-4 py-2 bg-gray-50 border border-gray-100 text-[9px] font-bold tracking-brand text-black uppercase">Cultural Strategy</span>
                        </div>
                    </div>
                    <div className="lg:max-w-xs w-full pt-10">
                        <div className="space-y-6">
                             <div>
                                <span className="text-[9px] font-bold uppercase tracking-brand text-gray-300 block mb-1">Position</span>
                                <span className="text-sm font-bold uppercase text-black">Founder & Architect</span>
                             </div>
                             <div>
                                <span className="text-[9px] font-bold uppercase tracking-brand text-gray-300 block mb-1">Base</span>
                                <span className="text-sm font-bold uppercase text-black">Hollywood, CA</span>
                             </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:grid lg:grid-cols-12 gap-16 lg:gap-32">
                    
                    {/* Visual & Narrative Column */}
                    <div className="lg:col-span-8">
                        <div className="aspect-[4/5] bg-gray-100 mb-20 relative group overflow-hidden border border-gray-100 shadow-2xl">
                            <EditableImage 
                                src={siteData.architect.image}
                                onSave={(src) => { updateSiteData('architect', { image: src }); publish(); }}
                                className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-[2000ms] ease-luxury scale-105 group-hover:scale-100"
                                containerClassName="w-full h-full"
                            />
                            {/* Technical Overlay */}
                            <div className="absolute top-8 left-8 p-4 border border-white/20 backdrop-blur-sm hidden md:block">
                                <span className="text-[9px] font-bold tracking-brand text-white uppercase block mb-1">Blueprint Profile</span>
                                <span className="text-xs font-light text-white/60">KANTA // ARCHITECT_001</span>
                            </div>
                        </div>

                        <div className="max-w-3xl">
                            <EditableText 
                                tag="p"
                                multiline
                                value={siteData.architect.bio}
                                onSave={(val) => { updateSiteData('architect', { bio: val }); publish(); }}
                                className="text-2xl md:text-4xl font-light leading-snug text-gray-900 mb-16"
                            />
                            
                            {/* CORPORATE PARTNERS GRID - The requested brands */}
                            <div className="mb-24">
                                <div className="flex items-center gap-4 mb-12 border-b border-gray-100 pb-4">
                                    <ShieldCheck size={18} className="text-black" />
                                    <h3 className="text-xs font-bold tracking-widest uppercase text-black">Legacy Corporate Clients // Sonic Brand Identity</h3>
                                </div>
                                
                                <div className="grid grid-cols-2 md:grid-cols-3 border-t border-l border-black/5">
                                    {KANTA_BIO.highlights.map((brand, idx) => (
                                        <div key={idx} className="p-10 md:p-14 border-r border-b border-black/5 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors group">
                                            <span className="text-xl md:text-2xl font-bold tracking-[0.2em] text-black group-hover:scale-110 transition-transform duration-500 uppercase">{brand}</span>
                                            <span className="text-[8px] font-bold text-gray-300 mt-4 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Global Placement</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-black p-12 md:p-20 text-white relative overflow-hidden mb-32">
                                <Quote className="absolute -top-10 -left-10 w-40 h-40 text-white/5" />
                                <EditableText 
                                    tag="p"
                                    multiline
                                    value={siteData.architect.quote}
                                    onSave={(val) => { updateSiteData('architect', { quote: val }); publish(); }}
                                    className="text-2xl italic font-serif leading-relaxed relative z-10"
                                />
                                <div className="mt-12 flex items-center gap-4">
                                    <div className="w-12 h-px bg-white/40"></div>
                                    <span className="text-[10px] font-bold uppercase tracking-brand text-white/60">Architectural Philosophy</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Cultural Impact Column */}
                    <div className="lg:col-span-4">
                         <div className="sticky top-40">
                            <h3 className="text-xs font-bold tracking-brand uppercase text-black mb-12 border-b border-black pb-4 flex items-center gap-2">
                                <Zap size={14} /> Cultural Milestones
                            </h3>
                            <ul className="space-y-16">
                                {KANTA_BIO.legacy.map((h, i) => (
                                    <li key={i} className="flex flex-col gap-6 group">
                                        <div className="flex items-center gap-4">
                                            <span className="text-[9px] font-bold text-gray-300 transition-colors group-hover:text-black">
                                                0{i+1}
                                            </span>
                                            <div className="h-px flex-1 bg-gray-100"></div>
                                        </div>
                                        <span className="text-lg md:text-xl font-light text-gray-900 group-hover:text-black transition-colors leading-tight uppercase tracking-tight">
                                            {h}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-32 p-10 bg-gray-50 border border-gray-100">
                                <h4 className="text-[10px] font-bold uppercase tracking-brand text-black mb-4">Board Advisory</h4>
                                <p className="text-sm text-gray-500 font-light leading-relaxed">
                                    Strategic advisory on sonic architecture and cultural identity available for select luxury and legacy brands.
                                </p>
                                <a href="mailto:aoi@urbanhippyfantasy.com" className="inline-flex items-center gap-3 mt-8 text-[10px] font-bold uppercase tracking-brand text-black border-b border-black pb-2 hover:opacity-60 transition-opacity">
                                    Consult Architect <ArrowRight size={14} />
                                </a>
                            </div>
                         </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
  );
};

export default Architect;
