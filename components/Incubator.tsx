
import React from 'react';
import { INCUBATOR_TEXT } from '../constants';
import { ArrowRight, Activity, Zap, Globe, Users, Check } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';
import { EditableText } from './Editable';

const Incubator: React.FC = () => {
  const { siteData, updateSiteData, publish } = useAdmin();

  return (
    <div className="bg-white min-h-screen pt-32 pb-32">
       {/* Header */}
       <div className="max-w-[1600px] mx-auto px-6 md:px-12 mb-32">
            <h1 className="text-5xl md:text-7xl font-normal text-rover-obsidian tracking-hero leading-[1.1] mb-16 uppercase">
                THE LIGHT CAPITAL<br/><span className="text-gray-400">ADVANTAGE</span>
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-rover-border pt-16">
                <EditableText 
                    tag="p"
                    multiline
                    value={siteData.incubator.vision}
                    onSave={(val) => { updateSiteData('incubator', { vision: val }); publish(); }}
                    className="text-xl md:text-2xl font-normal leading-loose text-gray-900"
                />
                <div className="flex flex-col justify-between">
                    <div className="space-y-6">
                        {INCUBATOR_TEXT.process.map((p, i) => (
                             <div key={i} className="flex items-center gap-6 text-rover-obsidian group border-b border-transparent hover:border-black pb-2 transition-colors w-fit">
                                <span className="text-sm font-bold tracking-brand uppercase w-24">{p.step}</span>
                                <ArrowRight size={18} className="text-gray-400"/>
                                <span className="text-sm font-medium uppercase tracking-wide text-gray-600">{p.arrow}</span>
                             </div>
                        ))}
                    </div>
                </div>
            </div>
       </div>

       {/* Protocols Section - Psychological Pricing Design */}
       <div className="bg-black py-32 border-y border-white/10">
           <div className="max-w-[1600px] mx-auto px-6 md:px-12">
                <span className="text-xs font-bold tracking-brand uppercase text-gray-400 mb-16 block pl-4 border-l-2 border-white">Incubation Tools</span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-l border-t border-white/10">
                    {INCUBATOR_TEXT.protocols.map((protocol, idx) => (
                        <div key={idx} className="bg-black p-12 hover:bg-zinc-900 transition-all duration-500 h-full flex flex-col border-r border-b border-white/10 group">
                            <div className="mb-12">
                                <h3 className="text-2xl font-bold tracking-widest uppercase text-white mb-2">{protocol.title}</h3>
                                <p className="text-sm text-gray-500 uppercase tracking-wider mb-8">{protocol.subtitle}</p>
                                <div className="flex items-baseline gap-1 mb-12">
                                    <span className="text-xl text-gray-400 font-light">$</span>
                                    <span className="text-6xl font-normal text-white tracking-tighter">{protocol.price}</span>
                                </div>
                            </div>
                            
                            <div className="space-y-4 mb-16 flex-grow">
                                {protocol.features.map((feature, fIdx) => (
                                    <div key={fIdx} className="flex items-start gap-3">
                                        <Check size={16} className="text-white mt-1 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" />
                                        <span className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-200 transition-colors">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <button 
                                onClick={() => {
                                    if ((protocol as any).link) {
                                        window.open((protocol as any).link, '_blank');
                                    } else if ((protocol as any).email) {
                                        window.location.href = `mailto:${(protocol as any).email}`;
                                    }
                                }}
                                className="w-full py-6 px-8 border border-white/20 hover:border-white text-white text-xs font-bold tracking-[0.2em] uppercase transition-all flex items-center justify-between group/btn overflow-hidden relative"
                            >
                                <span className="relative z-10">{protocol.cta}</span>
                                <ArrowRight size={16} className="relative z-10 transform translate-x-0 group-hover/btn:translate-x-1 transition-transform" />
                                <div className="absolute inset-0 bg-white transform translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out opacity-10" />
                            </button>
                        </div>
                    ))}
                </div>
           </div>
       </div>

       {/* Features Grid - Precise 1px borders */}
       <div className="bg-white py-32 border-y border-rover-border">
           <div className="max-w-[1600px] mx-auto px-6 md:px-12">
                <span className="text-xs font-bold tracking-brand uppercase text-gray-500 mb-16 block pl-4 border-l-2 border-black">Strategic Infrastructure</span>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-l border-t border-rover-border">
                    {INCUBATOR_TEXT.advantage.map((item, idx) => (
                        <div key={idx} className="bg-white p-12 hover:bg-gray-50 transition-colors h-full flex flex-col justify-between group border-r border-b border-rover-border">
                            <div className="mb-12">
                                {idx === 0 && <Activity size={32} strokeWidth={1} className="mb-6 text-black" />}
                                {idx === 1 && <Globe size={32} strokeWidth={1} className="mb-6 text-black" />}
                                {idx === 2 && <Users size={32} strokeWidth={1} className="mb-6 text-black" />}
                                {idx === 3 && <Zap size={32} strokeWidth={1} className="mb-6 text-black" />}
                                <h3 className="text-lg font-bold tracking-brand uppercase text-rover-obsidian mb-4">{item.title}</h3>
                            </div>
                            <p className="text-base text-gray-600 font-normal leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
           </div>
       </div>

       {/* Mission */}
       <div className="max-w-[1600px] mx-auto px-6 md:px-12 pt-32 text-center">
            <span className="text-xs font-bold tracking-brand uppercase text-gray-500 mb-12 block">Our Mission</span>
            <div className="max-w-5xl mx-auto">
                 <EditableText 
                    tag="p"
                    multiline
                    value={siteData.incubator.mission}
                    onSave={(val) => { updateSiteData('incubator', { mission: val }); publish(); }}
                    className="text-3xl md:text-5xl font-normal text-rover-obsidian leading-tight text-center uppercase"
                 />
            </div>
       </div>
    </div>
  );
};

export default Incubator;