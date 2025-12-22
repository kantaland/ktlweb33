
import React from 'react';
import { INCUBATOR_TEXT } from '../constants';
import { ArrowRight, Activity, Zap, Globe, Users } from 'lucide-react';
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