import React, { useState } from 'react';
import { ExternalLink, Music as MusicIcon, Settings, Headphones, Globe, ArrowRight, Plus, Trash2, X } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';
import { getSpotifyEmbedUrl } from './Editable';

const MusicSection: React.FC = () => {
  const { isAuthenticated, siteData, updateSiteData, publish } = useAdmin();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const [configForm, setConfigForm] = useState({
      creditsUrl: siteData.music.creditsUrl || '',
      description: siteData.music.description || '',
      repositories: [...(siteData.music.repositories || [])]
  });

  const saveConfig = () => {
      updateSiteData('music', configForm);
      publish();
      setIsSettingsOpen(false);
  };

  const addRepository = () => {
      setConfigForm(prev => ({
          ...prev,
          repositories: [...prev.repositories, { id: Date.now().toString(), url: '', label: 'New Collection' }]
      }));
  };

  const removeRepository = (id: string) => {
      setConfigForm(prev => ({
          ...prev,
          repositories: prev.repositories.filter(repo => repo.id !== id)
      }));
  };

  const updateRepository = (id: string, field: 'url' | 'label', value: string) => {
      setConfigForm(prev => ({
          ...prev,
          repositories: prev.repositories.map(repo => repo.id === id ? { ...repo, [field]: value } : repo)
      }));
  };

  return (
    <div className="bg-white min-h-screen pt-32 pb-0 relative">
      {/* Settings Modal (Admin Only) */}
      {isSettingsOpen && (
          <div className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center backdrop-blur-md p-4 overflow-y-auto">
              <div className="bg-white p-8 md:p-12 max-w-2xl w-full shadow-2xl relative animate-[fadeIn_0.3s_ease-out] rounded-none my-auto">
                  <div className="flex justify-between items-center mb-8">
                      <h3 className="text-xl font-bold tracking-tight uppercase text-black">Division Configuration</h3>
                      <button onClick={() => setIsSettingsOpen(false)}><X size={24} className="text-black"/></button>
                  </div>
                  
                  <div className="space-y-8 max-h-[60vh] overflow-y-auto pr-4 scrollbar-hide">
                      <div className="space-y-4">
                          <label className="text-[10px] font-bold uppercase tracking-brand text-gray-500">Mission Statement</label>
                          <textarea 
                            className="w-full border p-4 text-sm rounded-none outline-none focus:border-black bg-gray-50 text-black h-24" 
                            value={configForm.description} 
                            onChange={e => setConfigForm({...configForm, description: e.target.value})} 
                          />
                      </div>

                      <div className="space-y-4">
                          <div className="flex justify-between items-center">
                              <label className="text-[10px] font-bold uppercase tracking-brand text-gray-500">Music Repositories</label>
                              <button onClick={addRepository} className="text-[10px] font-bold uppercase tracking-brand text-blue-600 flex items-center gap-1 hover:opacity-70 transition-opacity"><Plus size={14}/> Add Library</button>
                          </div>
                          
                          {configForm.repositories.map((repo, idx) => (
                              <div key={repo.id} className="p-4 bg-gray-50 border border-gray-100 flex flex-col gap-4 relative">
                                  <button onClick={() => removeRepository(repo.id)} className="absolute top-2 right-2 text-red-500 hover:opacity-50"><Trash2 size={14}/></button>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div className="space-y-1">
                                          <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Label</span>
                                          <input 
                                            className="w-full border p-2 text-xs bg-white text-black" 
                                            value={repo.label} 
                                            onChange={e => updateRepository(repo.id, 'label', e.target.value)} 
                                            placeholder="e.g. Master Playlist"
                                          />
                                      </div>
                                      <div className="space-y-1">
                                          <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Spotify Link</span>
                                          <input 
                                            className="w-full border p-2 text-xs bg-white text-black" 
                                            value={repo.url} 
                                            onChange={e => updateRepository(repo.id, 'url', e.target.value)} 
                                            placeholder="URL..."
                                          />
                                      </div>
                                  </div>
                              </div>
                          ))}
                      </div>

                      <div className="space-y-4">
                          <label className="text-[10px] font-bold uppercase tracking-brand text-gray-500">Verified Credits URL</label>
                          <input 
                            className="w-full border p-4 text-sm rounded-none outline-none focus:border-black bg-gray-50 text-black" 
                            value={configForm.creditsUrl} 
                            onChange={e => setConfigForm({...configForm, creditsUrl: e.target.value})} 
                          />
                      </div>
                  </div>

                  <div className="flex gap-4 mt-12">
                      <button onClick={saveConfig} className="bg-black text-white px-8 py-5 text-xs font-bold uppercase w-full hover:bg-gray-900 transition-colors rounded-none tracking-brand">Update Division</button>
                      <button onClick={() => setIsSettingsOpen(false)} className="bg-white border border-gray-300 text-black px-8 py-5 text-xs font-bold uppercase w-full hover:bg-gray-50 transition-colors rounded-none tracking-brand">Cancel</button>
                  </div>
              </div>
          </div>
      )}

      {/* Editorial Header */}
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 md:px-16 border-t border-black pt-12 sm:pt-16 mb-16 sm:mb-24 md:mb-32">
        <div className="flex flex-col lg:flex-row justify-between gap-8 sm:gap-12 lg:gap-16 lg:items-start">
            <div className="flex-1">
                <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.5em] uppercase text-gray-400 mb-6 sm:mb-8 md:mb-12 block pl-4 sm:pl-6 border-l border-black">Hollywood Division // 01</span>
                <h1 className="text-3xl sm:text-4xl md:text-7xl lg:text-9xl font-serif italic text-black mb-6 sm:mb-8 md:mb-12 tracking-tighter leading-tight sm:leading-snug md:leading-[0.8] max-w-5xl uppercase">
                    Global <span className="text-gray-300">Distribution</span> Architecture
                </h1>
                <p className="max-w-2xl text-base sm:text-lg md:text-2xl lg:text-3xl text-gray-900 leading-relaxed sm:leading-snug md:leading-snug font-light">
                    {siteData.music.description}
                </p>
            </div>
            
            <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 items-start lg:items-end mt-8 sm:mt-0">
                 <div className="flex flex-col gap-3 sm:gap-4 md:gap-6 w-full sm:w-auto">
                     <a href="https://open.spotify.com/playlist/5XIXIf02SeKTiD6Scsxu77?si=Jykb8dUFT2S26T3v_geMag" target="_blank" className="flex items-center justify-between gap-12 border-b border-black pb-4 group transition-all">
                         <span className="text-xs font-bold tracking-brand uppercase text-black">Spotify Master</span>
                         <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform text-black"/>
                     </a>
                     <a href={siteData.music.creditsUrl} target="_blank" className="flex items-center justify-between gap-12 border-b border-black pb-4 group transition-all">
                         <span className="text-xs font-bold tracking-brand uppercase text-black">Verified Credits</span>
                         <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform text-black"/>
                     </a>
                     {isAuthenticated && (
                        <button onClick={() => setIsSettingsOpen(true)} className="bg-black text-white px-8 py-4 text-[10px] font-bold tracking-brand uppercase hover:bg-gray-800 transition-colors rounded-none shadow-xl mt-4">
                            Configure Division
                        </button>
                    )}
                 </div>
            </div>
        </div>
      </div>

      {/* The Vaults (Multiple Repositories) */}
      <div className="space-y-24 md:space-y-48">
        {siteData.music.repositories && siteData.music.repositories.map((repo, idx) => {
            const embedUrl = getSpotifyEmbedUrl(repo.url);
            return (
                <div key={repo.id} className="w-full bg-gray-50 py-16 md:py-32 border-y border-rover-border overflow-hidden">
                    <div className="max-w-[1800px] mx-auto px-6 md:px-16">
                        
                        {/* Repository Labels - Centered on mobile to match user's refinement request */}
                        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 md:mb-12 gap-6 text-center md:text-left">
                            <div className="flex flex-col items-center md:items-start">
                                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-gray-400 mb-2 block">Repository // {idx + 1}</span>
                                <h3 className="text-3xl md:text-5xl font-serif italic text-black uppercase tracking-tight">{repo.label}</h3>
                            </div>
                            <span className="text-[10px] font-bold tracking-brand uppercase text-gray-300 hidden md:block border-l border-gray-200 pl-6">Streaming High-Fidelity Audio // Sync Enabled</span>
                        </div>
                        
                        {/* Player Container - height optimized for mobile list view */}
                        <div className="relative h-[380px] md:h-auto md:aspect-[21/9] w-full max-w-4xl mx-auto md:max-w-none bg-black shadow-2xl overflow-hidden group/vault border border-black/5">
                            {embedUrl ? (
                                <iframe 
                                    src={embedUrl} 
                                    width="100%" 
                                    height="100%" 
                                    frameBorder="0" 
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture; web-share" 
                                    loading="lazy"
                                    className="w-full h-full grayscale-[0.2] hover:grayscale-0 transition-all duration-1000"
                                    title={`Spotify Embed - ${repo.label}`}
                                />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center text-white border border-white/10">
                                    <MusicIcon size={48} strokeWidth={0.5} className="mb-6 opacity-30 animate-pulse"/>
                                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-500">Repository Connection Pending</span>
                                </div>
                            )}
                            {/* Tech Accents - Refined opacity for better integration */}
                            <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-white/30 pointer-events-none"></div>
                            <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-white/30 pointer-events-none"></div>
                        </div>
                    </div>
                </div>
            );
        })}
      </div>

      {/* Technical Specifications Grid */}
      <div className="bg-white py-24 md:py-48 px-6 md:px-16">
          <div className="max-w-[1800px] mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-black">
                  <div className="p-10 md:p-16 border-r border-b border-rover-border hover:bg-gray-50 transition-colors">
                      <span className="text-[9px] font-bold uppercase tracking-brand text-gray-300 block mb-8 md:mb-10">01 // NETWORK</span>
                      <h4 className="text-lg font-bold uppercase text-black mb-4 leading-tight">AWAL / SONY MUSIC UK</h4>
                      <p className="text-sm text-gray-500 leading-relaxed font-light">Global reach through elite infrastructure, prioritizing master ownership.</p>
                  </div>
                  <div className="p-10 md:p-16 border-r border-b border-rover-border hover:bg-gray-50 transition-colors">
                      <span className="text-[9px] font-bold uppercase tracking-brand text-gray-300 block mb-8 md:mb-10">02 // JURISDICTION</span>
                      <h4 className="text-lg font-bold uppercase text-black mb-4 leading-tight">WORLDWIDE</h4>
                      <p className="text-sm text-gray-500 leading-relaxed font-light">Direct-to-platform delivery across all primary digital retailers.</p>
                  </div>
                  <div className="p-10 md:p-16 border-r border-b border-rover-border hover:bg-gray-50 transition-colors">
                      <span className="text-[9px] font-bold uppercase tracking-brand text-gray-300 block mb-8 md:mb-10">03 // ANALYTICS</span>
                      <h4 className="text-lg font-bold uppercase text-black mb-4 leading-tight">REAL-TIME DATA</h4>
                      <p className="text-sm text-gray-500 leading-relaxed font-light">Transparent revenue tracking and deep audience sentiment analysis.</p>
                  </div>
                  <div className="p-10 md:p-16 border-b border-rover-border hover:bg-gray-50 transition-colors">
                      <span className="text-[9px] font-bold uppercase tracking-brand text-gray-300 block mb-8 md:mb-10">04 // MISSION</span>
                      <h4 className="text-lg font-bold uppercase text-black mb-4 leading-tight">IDENTITY FIRST</h4>
                      <p className="text-sm text-gray-500 leading-relaxed font-light">Strategic blueprints that prioritize the architect's cultural value.</p>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default MusicSection;