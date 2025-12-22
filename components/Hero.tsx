
import React, { useEffect, useState } from 'react';
import { ChevronRight, Zap } from 'lucide-react';
import { Tab } from '../types';
import { useAdmin } from '../contexts/AdminContext';
import { EditableText, EditableImage } from './Editable';

interface HeroProps {
    onNavigate: (tab: Tab) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { siteData, updateSiteData, publish } = useAdmin();
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative h-screen w-full bg-rover-dark overflow-hidden group">
      
      {/* Media Layer with Parallax */}
      <div 
        className="absolute inset-0 z-0 transition-transform duration-100 ease-linear"
        style={{ transform: `translateY(${offsetY * 0.5}px)` }}
      >
         <div className="relative w-full h-full">
                <EditableImage 
                    src={siteData.hero.image}
                    onSave={(newSrc) => { updateSiteData('hero', { image: newSrc }); publish(); }}
                    alt="Hero KANTALAND"
                    className="w-full h-full object-cover object-center scale-105"
                    containerClassName="w-full h-full"
                    allowVideo={true}
                />
         </div>
         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
         
         {/* CRT Scanline Effect (Static) */}
         <div className="absolute inset-0 pointer-events-none z-10 opacity-10" style={{
             background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
             backgroundSize: '100% 2px, 3px 100%'
         }}></div>

         {/* Moving Scanline Animation */}
         <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden opacity-30">
            <div className="w-full h-[4px] bg-white/20 blur-[2px] animate-scan shadow-[0_0_20px_rgba(255,255,255,0.2)]"></div>
         </div>
      </div>

      {/* Content Layer */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end pb-24 md:pb-32 pointer-events-none">
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 pointer-events-auto">
            
            <div className="flex flex-col md:flex-row items-end justify-between gap-16">
                <div className="max-w-4xl w-full animate-[fadeIn_0.8s_ease-out]">
                    <div className="flex items-center gap-4 mb-8">
                        <span className="inline-block py-2 px-4 bg-white text-black text-[10px] font-bold tracking-brand uppercase shadow-xl hover:bg-emerald-400 transition-colors">
                            KANTALAND
                        </span>
                        <div className="flex items-center gap-2 text-white/50 text-[10px] font-bold uppercase tracking-widest animate-pulse">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            System Online
                        </div>
                    </div>

                    <div className="mb-8 relative">
                        <EditableText 
                            tag="h1"
                            value={siteData.hero.title}
                            onSave={(val) => { updateSiteData('hero', { title: val }); publish(); }}
                            className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-medium text-white tracking-hero leading-[0.85] uppercase drop-shadow-2xl mix-blend-overlay"
                            multiline
                        />
                    </div>
                    <div className="border-l-2 border-white pl-8 my-8 backdrop-blur-sm bg-black/10 py-4 pr-4">
                        <EditableText 
                            tag="p"
                            value={siteData.hero.sub}
                            onSave={(val) => { updateSiteData('hero', { sub: val }); publish(); }}
                            className="block text-lg md:text-2xl text-white/90 font-light tracking-wide max-w-2xl drop-shadow-lg leading-relaxed"
                            multiline
                        />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-0 w-full md:w-auto border border-white/20 backdrop-blur-md animate-[slideUp_0.8s_ease-out_0.2s] opacity-0 [animation-fill-mode:forwards]">
                    <button 
                        onClick={() => onNavigate(Tab.INCUBATOR)}
                        className="h-16 px-10 bg-white hover:bg-gray-100 text-black text-[11px] font-bold tracking-brand uppercase transition-all duration-300 flex items-center justify-between gap-8 w-full sm:min-w-[220px] rounded-none border-r border-gray-100 group/btn"
                    >
                        <span>Our Vision</span>
                        <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                    
                    <button 
                        onClick={() => onNavigate(Tab.HOLLYWOOD)}
                        className="h-16 px-10 bg-black/60 hover:bg-black/80 text-white text-[11px] font-bold tracking-brand uppercase transition-all duration-300 flex items-center justify-between gap-8 w-full sm:min-w-[220px] rounded-none group/btn"
                    >
                        <span>Divisions</span>
                        <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
