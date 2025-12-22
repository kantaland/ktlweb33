
import React from 'react';
import { ShieldCheck, ArrowRight, Lock, FileText, Globe } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';
import { EditableText } from './Editable';

const Placements: React.FC = () => {
    const { siteData, updateSiteData, publish } = useAdmin();
    
    return (
        <div className="bg-white py-32 md:py-48">
            <div className="max-w-[1600px] mx-auto px-6 md:px-12">
                
                {/* Header Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 border-t border-black pt-16">
                    <div className="lg:col-span-5">
                        <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-gray-400 mb-8 block border-l-2 border-black pl-6">Hollywood Division // 02</span>
                        <h2 className="text-4xl md:text-6xl font-normal text-rover-obsidian tracking-tight uppercase leading-none mb-8">
                            Publishing &<br/>Licensing
                        </h2>
                        
                        <div className="flex flex-col gap-6 mt-12">
                            <div className="flex items-center gap-4 text-gray-300">
                                <Globe size={14} />
                                <span className="text-[10px] font-bold uppercase tracking-brand">Global Admin: Kobalt Music</span>
                            </div>
                            <div className="flex items-center gap-4 text-gray-300">
                                <ShieldCheck size={14} />
                                <span className="text-[10px] font-bold uppercase tracking-brand">100% Master & Publishing Control</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="lg:col-span-7 flex flex-col justify-between">
                         <div className="max-w-xl">
                            <EditableText 
                                tag="p"
                                multiline
                                value={siteData.placements.description}
                                onSave={(val) => { updateSiteData('placements', { description: val }); publish(); }}
                                className="text-xl md:text-2xl text-gray-900 font-light leading-relaxed mb-12"
                            />
                            
                            <div className="space-y-12">
                                <div className="p-10 bg-gray-50 border border-gray-100 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <Lock size={80} strokeWidth={0.5} />
                                    </div>
                                    <div className="relative z-10">
                                        <h3 className="text-sm font-bold uppercase tracking-brand text-black mb-4 flex items-center gap-2">
                                            <FileText size={16} /> Private Curated Catalog
                                        </h3>
                                        <p className="text-sm text-gray-500 font-light leading-relaxed mb-8">
                                            To maintain the exclusivity and creative integrity of our sonic assets, the commercial sync catalog is restricted to authorized music supervisors, brand directors, and creative agencies.
                                        </p>
                                        <a 
                                            href="mailto:aoi@urbanhippyfantasy.com" 
                                            className="inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-brand text-black border-b border-black pb-2 hover:gap-8 transition-all"
                                        >
                                            Request Access to Private Catalog <ArrowRight size={14} />
                                        </a>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-gray-100">
                                    <div>
                                        <h4 className="text-[10px] font-bold uppercase tracking-brand text-gray-400 mb-2">Sync Licensing</h4>
                                        <p className="text-xs text-gray-500 font-light leading-relaxed">
                                            Bespoke sonic identities and high-fidelity masters for global film, broadcast, and digital campaigns.
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="text-[10px] font-bold uppercase tracking-brand text-gray-400 mb-2">Admin Protocol</h4>
                                        <p className="text-xs text-gray-500 font-light leading-relaxed">
                                            Full rights administration managed through our strategic partnership with Kobalt Music.
                                        </p>
                                    </div>
                                </div>
                            </div>
                         </div>
                    </div>
                </div>

                {/* Decorative Tech Grid Line */}
                <div className="mt-24 w-full h-px bg-black opacity-10"></div>
            </div>
        </div>
    );
};

export default Placements;
