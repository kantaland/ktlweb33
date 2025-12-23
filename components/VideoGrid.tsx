
import React, { useState, useRef, ChangeEvent, useMemo } from 'react';
import { Plus, Trash2, X, Youtube, Music, ExternalLink, Upload, ArrowRight, Loader2, Volume2, ChevronUp, ChevronDown, Check } from 'lucide-react';
import { Video } from '../types';
import { useAdmin } from '../contexts/AdminContext';
import { EditableText, extractYouTubeId, YouTubePlayer, getSpotifyEmbedUrl, getMediaType } from './Editable';
import { analyzeSpotifyLink } from '../services/geminiService';

const FeaturedVideo: React.FC<{ video: Video; reversed?: boolean; isAdmin: boolean; onDelete: () => void; onUpdate: (data: Partial<Video>) => void }> = ({ video, reversed, isAdmin, onDelete, onUpdate }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const mediaType = video.mediaType || 'youtube';

  const renderMediaContent = () => {
      if (mediaType === 'spotify' && video.linkUrl) {
          const embedUrl = getSpotifyEmbedUrl(video.linkUrl);
          if (embedUrl) {
              return (
                  <iframe 
                    src={embedUrl} 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture; web-share"
                    loading="lazy"
                    className="w-full h-full min-h-[500px]"
                  ></iframe>
              )
          }
      }

      if (isPlaying && (mediaType === 'youtube' || mediaType === 'video') && video.linkUrl) {
           if (mediaType === 'youtube') {
               return (
                   <YouTubePlayer 
                       urlOrId={video.linkUrl} 
                       className="w-full h-full min-h-[500px]"
                       autoplay={true}
                       muted={false}
                       controls={true}
                       loop={false}
                   />
               );
           }
           return (
               <video 
                   src={video.linkUrl} 
                   className="w-full h-full min-h-[500px] object-cover" 
                   autoPlay 
                   controls 
               />
           );
      }

      return (
        <div 
            className="w-full h-full relative group overflow-hidden cursor-pointer bg-gray-100"
            onClick={() => (mediaType === 'youtube' || mediaType === 'video') ? setIsPlaying(true) : null}
        >
            <img 
                src={video.thumbnailUrl} 
                alt={video.title} 
                className="w-full h-full object-cover transition-transform duration-[2000ms] ease-luxury group-hover:scale-110"
            />
            {mediaType === 'audio' && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 bg-black/20">
                    <Volume2 size={80} strokeWidth={0.5} className="text-white opacity-50" />
                </div>
            )}
        </div>
      );
  };

  return (
    <div className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} min-h-[80vh] border-b border-black bg-white overflow-hidden group/item relative`}>
        {isAdmin && (
            <button 
                onClick={onDelete}
                className="absolute top-8 right-8 z-50 p-3 bg-red-600 text-white rounded-none opacity-0 group-hover/item:opacity-100 transition-opacity"
            >
                <Trash2 size={16} />
            </button>
        )}
        
        <div className="w-full md:w-7/12 flex items-center justify-center bg-gray-50 border-r border-black relative">
            <div className="w-full h-full">
                {renderMediaContent()}
            </div>
        </div>

        <div className="w-full md:w-5/12 flex flex-col justify-center p-12 md:p-24 bg-white">
            <div className="mb-16">
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-gray-400 mb-6 block border-l-2 border-black pl-6">M3 Division // Archive</span>
                <EditableText 
                    tag="h2"
                    value={video.title}
                    onSave={(val) => onUpdate({ title: val })}
                    className="text-4xl md:text-6xl font-normal text-black tracking-tight leading-none mb-10 uppercase"
                />
                <EditableText 
                    tag="p"
                    multiline
                    value={video.description}
                    onSave={(val) => onUpdate({ description: val })}
                    className="text-gray-600 font-light text-xl leading-relaxed max-w-lg"
                />
            </div>

            <div className="grid grid-cols-2 gap-8 border-t border-gray-100 pt-10">
                <div>
                    <span className="text-[9px] font-bold uppercase tracking-brand text-gray-300 block mb-2">Domain</span>
                    <EditableText value={video.tags[0]} onSave={(val) => onUpdate({ tags: [val] })} tag="span" className="text-sm font-bold uppercase text-black" />
                </div>
                <div>
                    <span className="text-[9px] font-bold uppercase tracking-brand text-gray-300 block mb-2">Reference ID</span>
                    <EditableText value={video.referenceId || video.id.slice(-4).toUpperCase()} onSave={(val) => onUpdate({ referenceId: val })} tag="span" className="text-sm font-bold uppercase text-black" />
                </div>
            </div>

            <div className="mt-16">
                 {(mediaType === 'youtube' || mediaType === 'video') && !isPlaying && (
                    <button onClick={() => setIsPlaying(true)} className="group flex items-center gap-4 text-xs font-bold tracking-brand uppercase text-black hover:text-gray-400 transition-colors w-fit border-b border-black pb-2">
                        <span>Initiate Media Playback</span>
                        <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                    </button>
                 )}
                 {video.linkUrl && video.linkUrl.trim() !== '' && video.showLink && (
                     <a href={video.linkUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 text-xs font-bold tracking-brand uppercase text-black hover:text-gray-600 transition-colors w-fit border-b border-black pb-2">
                        <span>Source Reference</span>
                        <ExternalLink size={16} className="group-hover:translate-x-2 transition-transform" />
                    </a>
                 )}
            </div>
        </div>
    </div>
  );
};

const ArchiveItemModal: React.FC<{ item: Video; onClose: () => void; isAdmin: boolean }> = ({ item, onClose, isAdmin }) => {
    const mediaType = item.mediaType || 'image';

    const renderMainMedia = () => {
        if (mediaType === 'youtube' && item.linkUrl) {
            return <YouTubePlayer urlOrId={item.linkUrl} className="w-full h-full" autoplay controls muted={false} />;
        }
        if (mediaType === 'spotify' && item.linkUrl) {
            const spotifyUrl = getSpotifyEmbedUrl(item.linkUrl);
            return spotifyUrl ? <iframe src={spotifyUrl} className="w-full h-full" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture; web-share" loading="lazy"></iframe> : null;
        }
        if (mediaType === 'video' && item.linkUrl) {
            return <video src={item.linkUrl} className="w-full h-full object-contain" autoPlay controls />;
        }
        return <img src={item.thumbnailUrl} className="w-full h-full object-contain" alt={item.title} />;
    };

    return (
        <div className="fixed inset-0 z-[120] bg-black/95 flex items-center justify-center p-0 md:p-8 animate-[fadeIn_0.3s_ease-out]">
            <button onClick={onClose} className="absolute top-8 right-8 z-50 p-3 bg-white text-black hover:rotate-90 transition-all rounded-full shadow-2xl"><X size={24} /></button>
            
            <div className="w-full h-full max-w-[1800px] flex flex-col md:flex-row bg-white overflow-hidden shadow-2xl">
                <div className="w-full md:w-3/4 h-3/5 md:h-full bg-black flex items-center justify-center relative">
                    {renderMainMedia()}
                </div>
                <div className="w-full md:w-1/4 h-2/5 md:h-full p-8 md:p-12 flex flex-col justify-center overflow-y-auto bg-white">
                    <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-gray-400 mb-6 block border-l-2 border-black pl-6">M3 Division // Entry</span>
                    <h2 className="text-3xl md:text-5xl font-serif italic text-black mb-8 uppercase leading-tight">{item.title}</h2>
                    <p className="text-gray-600 font-light text-base leading-relaxed mb-10">{item.description}</p>
                    
                    <div className="space-y-6 pt-10 border-t border-gray-100 mb-12">
                         <div className="flex justify-between">
                            <span className="text-[9px] font-bold uppercase tracking-brand text-gray-300">Reference</span>
                            <span className="text-[10px] font-bold uppercase text-black">{item.referenceId || item.id.slice(-4).toUpperCase()}</span>
                         </div>
                         <div className="flex justify-between">
                            <span className="text-[9px] font-bold uppercase tracking-brand text-gray-300">Domain</span>
                            <span className="text-[10px] font-bold uppercase text-black">{item.tags[0]}</span>
                         </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        {item.linkUrl && item.linkUrl.trim() !== '' && item.showLink && (
                             <a href={item.linkUrl} target="_blank" rel="noopener noreferrer" className="bg-black text-white px-8 py-4 text-[10px] font-bold uppercase tracking-brand flex items-center gap-3 hover:bg-gray-800 transition-all">
                                 View Source <ExternalLink size={14}/>
                             </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const VideoGrid: React.FC = () => {
    const { videos, addVideo, removeVideo, updateVideo, moveVideo, isAuthenticated } = useAdmin();
    const [isAdding, setIsAdding] = useState(false);
    const [isFetchingMetadata, setIsFetchingMetadata] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [activeArchiveItem, setActiveArchiveItem] = useState<Video | null>(null);
    const [activeFilter, setActiveFilter] = useState<'ALL' | 'MUSIC' | 'MEDIA' | 'ART' | 'FASHION'>('ALL');

    const [videoForm, setVideoForm] = useState<Partial<Video>>({
        tags: ['Music'],
        mediaType: 'image',
        referenceId: '',
        showLink: true
    });

    const filteredVideos = useMemo(() => {
        let result = [...videos];
        // Sort by date if available
        result.sort((a, b) => {
            if (a.date && b.date) return new Date(b.date).getTime() - new Date(a.date).getTime();
            return 0;
        });

        if (activeFilter !== 'ALL') {
            return result.filter(v => v.tags[0].toUpperCase() === activeFilter);
        }
        return result;
    }, [videos, activeFilter]);

    const featuredVideos = filteredVideos.slice(0, 3);
    const standardVideos = filteredVideos.slice(3);

    const handleUrlBlur = async () => {
        if (!videoForm.linkUrl) return;
        const url = videoForm.linkUrl.trim();
        const detectedType = getMediaType(url);
        
        setIsFetchingMetadata(true);
        setVideoForm(prev => ({ ...prev, mediaType: detectedType }));

        if (detectedType === 'youtube') {
            const ytId = extractYouTubeId(url);
            if (ytId) {
                setVideoForm(prev => ({ 
                    ...prev, 
                    thumbnailUrl: `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` 
                }));
            }
        } else if (detectedType === 'spotify') {
            try {
                const metadata = await analyzeSpotifyLink(url);
                if (metadata) {
                    setVideoForm(prev => ({
                        ...prev,
                        title: prev.title || metadata.title,
                        thumbnailUrl: prev.thumbnailUrl || metadata.coverUrl
                    }));
                }
            } catch (error) {
                console.error("Metadata fetch error:", error);
            }
        }

        setIsFetchingMetadata(false);
    };

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setIsUploading(true);
            const reader = new FileReader();
            reader.onprogress = (event) => {
                if (event.lengthComputable) setUploadProgress((event.loaded / event.total) * 100);
            };
            reader.onloadend = () => {
                const result = reader.result;
                if (typeof result === 'string') {
                    setVideoForm(prev => ({ 
                        ...prev, 
                        thumbnailUrl: result,
                        linkUrl: prev.linkUrl || result,
                        mediaType: (getMediaType(result) as Video['mediaType'])
                    }));
                    setUploadProgress(100);
                    setTimeout(() => {
                        setIsUploading(false);
                        setUploadProgress(0);
                    }, 500);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddVideo = () => {
        const hasUrl = videoForm.linkUrl && videoForm.linkUrl.trim() !== '';
        const newVideo: Video = {
            id: 'm3-' + Date.now().toString(),
            referenceId: videoForm.referenceId || ('REF-' + Math.random().toString(36).substring(7).toUpperCase()),
            title: videoForm.title || "Untitled Project",
            description: videoForm.description || "Experimental narrative asset.",
            thumbnailUrl: videoForm.thumbnailUrl || "https://picsum.photos/1200/800",
            date: new Date().toISOString().split('T')[0],
            views: "M3-ARC",
            tags: videoForm.tags || ["Art"],
            mediaType: videoForm.mediaType || 'image',
            linkUrl: videoForm.linkUrl,
            showLink: (!!hasUrl && videoForm.showLink), 
        };
        addVideo(newVideo);
        setIsAdding(false);
        setVideoForm({ tags: ['Music'], mediaType: 'image', referenceId: '', showLink: true });
    };

  return (
    <div className="bg-white pt-32">
        <div className="max-w-[1800px] mx-auto px-6 md:px-16 border-t border-black pt-16 mb-20">
            <div className="flex flex-col lg:flex-row justify-between items-end gap-16">
                <div className="max-w-4xl">
                    <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-gray-400 mb-12 block pl-6 border-l-2 border-black">M3 Division // Archive</span>
                    <h2 className="text-6xl md:text-9xl font-serif italic text-black tracking-tighter leading-[0.8] uppercase mb-0">
                        Design & <span className="text-gray-300">Architecture</span>
                    </h2>
                </div>
                {isAuthenticated && (
                    <button 
                        onClick={() => setIsAdding(true)}
                        className="bg-black text-white px-10 py-6 text-[10px] font-bold uppercase tracking-brand flex items-center gap-4 hover:bg-gray-800 shadow-2xl rounded-none mb-4"
                    >
                        <Plus size={16} /> Register Asset
                    </button>
                )}
            </div>
        </div>

        {/* Filter Bar */}
        <div className="sticky top-20 md:top-24 z-40 bg-white border-y border-black py-8 mb-20">
            <div className="max-w-[1800px] mx-auto px-6 md:px-16 flex flex-wrap items-center justify-center gap-6 md:gap-12">
                {(['ALL', 'MUSIC', 'MEDIA', 'ART', 'FASHION'] as const).map(filter => (
                    <button 
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`text-[10px] font-bold tracking-brand uppercase transition-all duration-300 px-4 py-2 ${activeFilter === filter ? 'text-white bg-black border-black border' : 'text-black bg-white border border-black/20 hover:border-black'}`}
                    >
                        {filter}
                    </button>
                ))}
            </div>
        </div>

        {/* Featured Items */}
        <div className="space-y-0">
            {featuredVideos.map((video, idx) => (
                <FeaturedVideo 
                    key={video.id} 
                    video={video} 
                    reversed={idx % 2 !== 0} 
                    isAdmin={isAuthenticated}
                    onDelete={() => { if(window.confirm('Remove asset?')) { removeVideo(video.id); } }}
                    onUpdate={(data) => { updateVideo(video.id, data); }}
                />
            ))}
        </div>

        {/* Extended Archive Gallery */}
        <div className="py-48 px-6 md:px-16 max-w-[1800px] mx-auto">
             <div className="flex justify-between items-end mb-24 border-b border-black pb-8">
                <h3 className="text-3xl font-light text-black tracking-tight uppercase">Extended Archive</h3>
                <span className="text-[10px] font-bold tracking-brand uppercase text-gray-400">Total Assets: {filteredVideos.length}</span>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {standardVideos.map(video => (
                    <div key={video.id} className="group cursor-pointer relative flex flex-col h-full border-b border-gray-100 pb-12">
                        <div 
                            className="aspect-[3/4] overflow-hidden bg-gray-100 relative mb-8"
                            onClick={() => setActiveArchiveItem(video)}
                        >
                            <img src={video.thumbnailUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1500ms] ease-luxury group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <div className="bg-white/90 backdrop-blur px-6 py-3 text-[10px] font-bold uppercase tracking-brand text-black">Explore Archive</div>
                            </div>
                        </div>
                        <div className="flex flex-col flex-1">
                             <div className="flex justify-between items-center mb-4">
                                 <div className="flex gap-4 items-center">
                                     <span className="text-[9px] font-bold uppercase tracking-brand text-gray-400">ID // {video.referenceId || video.id.slice(-4).toUpperCase()}</span>
                                     {isAuthenticated && (
                                         <div className="flex gap-1">
                                            <button onClick={() => moveVideo(video.id, 'up')} className="text-gray-300 hover:text-black"><ChevronUp size={12}/></button>
                                            <button onClick={() => moveVideo(video.id, 'down')} className="text-gray-300 hover:text-black"><ChevronDown size={12}/></button>
                                         </div>
                                     )}
                                 </div>
                                 <span className={`text-[9px] font-bold uppercase tracking-brand px-3 py-1.5 border ${
                                   video.tags[0] === 'Music' ? 'bg-blue-50 text-blue-700 border-blue-300' :
                                   video.tags[0] === 'Media' ? 'bg-purple-50 text-purple-700 border-purple-300' :
                                   video.tags[0] === 'Fashion' ? 'bg-pink-50 text-pink-700 border-pink-300' :
                                   'bg-gray-50 text-gray-700 border-gray-300'
                                 }`}>{video.tags[0]}</span>
                             </div>
                             <h4 onClick={() => setActiveArchiveItem(video)} className="text-2xl font-bold text-black uppercase tracking-tight mb-4 hover:text-gray-500 transition-colors">
                                 {video.title}
                             </h4>
                             <p className="text-sm text-gray-500 font-light leading-relaxed line-clamp-2">{video.description}</p>
                             
                             {isAuthenticated && (
                                 <div className="mt-6 pt-6 border-t border-gray-100 flex gap-4">
                                     <button onClick={() => removeVideo(video.id)} className="text-[9px] font-bold uppercase tracking-brand text-red-500 hover:opacity-50">Decommission</button>
                                     {video.linkUrl && video.linkUrl.trim() !== '' && (
                                         <button onClick={() => updateVideo(video.id, { showLink: !video.showLink })} className={`text-[9px] font-bold uppercase tracking-brand ${video.showLink ? 'text-emerald-500' : 'text-gray-300'}`}>Link Button: {video.showLink ? 'Visible' : 'Hidden'}</button>
                                     )}
                                 </div>
                             )}
                        </div>
                    </div>
                ))}
             </div>
        </div>

        {/* Archive Modal */}
        {activeArchiveItem && (
            <ArchiveItemModal 
                item={activeArchiveItem} 
                onClose={() => setActiveArchiveItem(null)} 
                isAdmin={isAuthenticated} 
            />
        )}

        {/* Add Modal */}
        {isAdding && (
            <div className="fixed inset-0 bg-black/80 z-[110] flex items-center justify-center backdrop-blur-md p-4 overflow-y-auto">
                <div className="bg-white p-12 max-w-xl w-full shadow-2xl relative animate-[fadeIn_0.3s_ease-out] border border-white/20 my-auto">
                    <button onClick={() => setIsAdding(false)} className="absolute top-6 right-6 hover:rotate-90 transition-transform duration-500"><X size={24}/></button>
                    <h3 className="text-2xl font-bold mb-10 tracking-tight uppercase text-black">Archive Entry Registration</h3>
                    
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase text-gray-400 tracking-brand">Archive Identity</label>
                                <input className="w-full border p-4 text-sm outline-none focus:border-black bg-white text-black rounded-none" placeholder="Title" value={videoForm.title || ''} onChange={e => setVideoForm({...videoForm, title: e.target.value})} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase text-gray-400 tracking-brand">Reference ID</label>
                                <input className="w-full border p-4 text-sm outline-none focus:border-black bg-white text-black rounded-none font-mono" placeholder="e.g. TKO-2025" value={videoForm.referenceId || ''} onChange={e => setVideoForm({...videoForm, referenceId: e.target.value})} />
                            </div>
                        </div>

                        <div className="space-y-2">
                             <label className="text-[10px] font-bold uppercase text-gray-400 tracking-brand">Domain</label>
                             <select className="w-full border p-4 text-sm outline-none focus:border-black bg-white text-black rounded-none" value={videoForm.tags?.[0] || 'Music'} onChange={e => setVideoForm({...videoForm, tags: [e.target.value]})}>
                                <option value="Music">Music</option>
                                <option value="Media">Media</option>
                                <option value="Art">Art</option>
                                <option value="Fashion">Fashion</option>
                             </select>
                        </div>

                        <div className="space-y-2">
                             <label className="text-[10px] font-bold uppercase text-gray-400 tracking-brand">Source Link</label>
                             <div className="relative">
                                <input className="w-full border p-4 text-sm outline-none focus:border-black bg-white text-black rounded-none pr-12" placeholder="URL..." value={videoForm.linkUrl || ''} onChange={e => setVideoForm({...videoForm, linkUrl: e.target.value})} onBlur={handleUrlBlur}/>
                                {isFetchingMetadata && <div className="absolute right-4 top-1/2 -translate-y-1/2"><Loader2 size={16} className="animate-spin text-gray-400" /></div>}
                             </div>
                        </div>

                        {videoForm.linkUrl && videoForm.linkUrl.trim() !== '' && (
                            <div className="flex items-center gap-4 py-2 border-y border-gray-50">
                                <button onClick={() => setVideoForm(prev => ({ ...prev, showLink: !prev.showLink }))} className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-brand ${videoForm.showLink ? 'text-emerald-600' : 'text-gray-300'}`}>
                                    <Check size={14} className={videoForm.showLink ? 'opacity-100' : 'opacity-0'} />
                                    Display Source Reference Button
                                </button>
                            </div>
                        )}

                        <div className="space-y-2">
                             <label className="text-[10px] font-bold uppercase text-gray-400 tracking-brand">Description</label>
                             <textarea className="w-full border p-4 text-sm outline-none focus:border-black min-h-[100px] bg-white text-black rounded-none" value={videoForm.description || ''} onChange={e => setVideoForm({...videoForm, description: e.target.value})} />
                        </div>

                        <div className="space-y-2">
                             <label className="text-[10px] font-bold uppercase text-gray-400 tracking-brand">Artwork</label>
                             {isUploading ? (
                                <div className="w-full border p-8 flex flex-col items-center justify-center bg-gray-50">
                                    <Loader2 size={24} className="animate-spin text-black mb-2" />
                                    <span className="text-[10px] font-bold uppercase tracking-brand">Uploading... {Math.round(uploadProgress)}%</span>
                                </div>
                             ) : (
                                <button onClick={() => fileInputRef.current?.click()} className="w-full border border-dashed border-gray-300 p-8 hover:border-black hover:bg-gray-50 flex flex-col items-center justify-center gap-3 text-gray-400 hover:text-black bg-white">
                                    <Upload size={24} />
                                    <span className="text-[10px] font-bold uppercase tracking-brand">Upload Image Asset</span>
                                </button>
                             )}
                             <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} accept="image/*" />
                        </div>

                        <button onClick={handleAddVideo} className="w-full bg-black text-white py-6 mt-8 text-[10px] font-bold uppercase tracking-brand hover:bg-gray-900 rounded-none">Publish Archive Entry</button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default VideoGrid;
