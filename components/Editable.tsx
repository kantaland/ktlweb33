
import React, { useState, useRef, ChangeEvent, useEffect } from 'react';
import { Edit2, Upload, Check, X, Link, Film, Image as ImageIcon, Youtube, Music, Globe, AlertCircle, Loader2, ExternalLink, Play, Volume2 } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

// --- EDITABLE TEXT COMPONENT ---
interface EditableTextProps {
  value: string;
  onSave: (newValue: string) => void;
  className?: string;
  multiline?: boolean;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

export const EditableText: React.FC<EditableTextProps> = ({ 
  value, 
  onSave, 
  className = '', 
  multiline = false,
  tag: Tag = 'div' 
}) => {
  const { isAuthenticated } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  const handleSave = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    onSave(tempValue);
    setIsEditing(false);
  };

  const handleCancel = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setTempValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !multiline) {
          e.preventDefault();
          handleSave();
      }
      if (e.key === 'Escape') {
          handleCancel();
      }
  };

  if (isEditing) {
    return (
      <div className="relative z-[100] min-w-[200px]" onClick={e => e.stopPropagation()}>
         <div className="fixed inset-0 bg-black/10 backdrop-blur-[1px] z-40" onClick={handleCancel}></div>
         <div className="relative z-50 animate-[fadeIn_0.1s_ease-out]">
            {multiline ? (
                <textarea 
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className={`w-full bg-white text-black p-4 border-2 border-black outline-none shadow-2xl min-h-[120px] text-base font-normal rounded-none ${className}`}
                    style={{ color: '#000000', backgroundColor: '#ffffff', opacity: 1 }}
                    autoFocus
                />
            ) : (
                <input 
                    type="text"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className={`w-full bg-white text-black p-3 border-2 border-black outline-none shadow-2xl text-base font-normal rounded-none ${className}`}
                    style={{ color: '#000000', backgroundColor: '#ffffff', opacity: 1 }}
                    autoFocus
                />
            )}
            <div className="absolute -bottom-12 right-0 flex gap-2">
                <button onClick={handleSave} className="px-4 py-2 bg-black text-white hover:bg-gray-800 text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg transition-colors">
                    <Check size={14}/> Save
                </button>
                <button onClick={handleCancel} className="px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-black text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg transition-colors">
                    <X size={14}/> Cancel
                </button>
            </div>
         </div>
      </div>
    );
  }

  return (
    <Tag 
        className={`relative transition-all duration-200 outline-none ${
            isAuthenticated 
            ? 'cursor-text hover:bg-black/5 hover:outline hover:outline-1 hover:outline-black/20 rounded-sm p-1 -m-1' 
            : ''
        } ${className}`}
        onClick={(e) => isAuthenticated && setIsEditing(true)}
    >
        {value}
    </Tag>
  );
};

// --- MEDIA UTILITIES ---
export type MediaType = 'image' | 'video' | 'audio' | 'youtube' | 'spotify' | 'iframe';

export const getMediaType = (url: string | null | undefined): MediaType => {
    if (!url || typeof url !== 'string') return 'image';
    const cleanUrl = url.trim();
    if (cleanUrl.match(/\.(mp4|webm|ogg|mov)$/i) || cleanUrl.startsWith('data:video/')) return 'video';
    if (cleanUrl.match(/\.(mp3|wav|m4a)$/i) || cleanUrl.startsWith('data:audio/')) return 'audio';
    if (cleanUrl.match(/(?:youtube\.com|youtu\.be)/)) return 'youtube';
    if (cleanUrl.match(/spotify\.com/)) return 'spotify';
    if (cleanUrl.match(/\.(jpeg|jpg|gif|png|webp|bmp|svg)$/i) || cleanUrl.startsWith('data:image/')) return 'image';
    if (cleanUrl.match(/(?:unsplash\.com|picsum\.photos|imgur\.com)/)) return 'image';
    if (cleanUrl.startsWith('http')) return 'iframe';
    return 'image';
};

export const extractYouTubeId = (url: string): string | null => {
    if (!url || typeof url !== 'string') return null;
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.trim().match(regex);
    return match ? match[1] : null;
};

export const getSpotifyEmbedUrl = (url: string) => {
    if (!url) return null;
    const match = url.match(/(track|album|playlist|artist)\/([a-zA-Z0-9]+)/);
    return (match && match[1] && match[2]) ? `https://open.spotify.com/embed/${match[1]}/${match[2]}?utm_source=generator&theme=0` : null;
};

// --- AGGRESSIVE COMPRESSION ---
const compressImage = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                if (!ctx) { resolve(img.src); return; }
                
                // SUPER AGGRESSIVE downscaling: Max width 600px
                const maxWidth = 600;
                let width = img.width;
                let height = img.height;
                if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                }
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);
                // Lower quality: 0.5 (Maximum compression while retaining visibility)
                resolve(canvas.toDataURL('image/jpeg', 0.5));
            };
            img.onerror = (err) => reject(err);
        };
        reader.onerror = (err) => reject(err);
    });
};

interface YouTubePlayerProps {
    urlOrId: string;
    className?: string;
    autoplay?: boolean;
    controls?: boolean;
    muted?: boolean;
    loop?: boolean;
}

export const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ 
    urlOrId, className = '', autoplay = true, controls = false, muted = true, loop = true
}) => {
    const id = extractYouTubeId(urlOrId);
    if (!id) return <div className={`bg-black flex flex-col items-center justify-center text-white text-xs uppercase ${className}`}><AlertCircle size={24} className="mb-2 text-red-500" /><span>Invalid Video ID</span></div>;
    const playlistParam = loop ? `&playlist=${id}` : '';
    const embedUrl = `https://www.youtube-nocookie.com/embed/${id}?autoplay=${autoplay ? 1 : 0}&mute=${muted ? 1 : 0}&loop=${loop ? 1 : 0}${playlistParam}&controls=${controls ? 1 : 0}&playsinline=1&modestbranding=1&rel=0`;
    return <iframe src={embedUrl} className={className} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" frameBorder="0" title="YouTube Video Player" />;
};

const WebFrame: React.FC<{ url: string; className?: string }> = ({ url, className }) => {
    const [viewMode, setViewMode] = useState<'card' | 'iframe'>('card');
    const [hasError, setHasError] = useState(false);
    const isDefinitelyBlocked = url.match(/(google\.com|facebook\.com|twitter\.com|instagram\.com|linkedin\.com|github\.com)/);
    if (viewMode === 'card' || hasError || isDefinitelyBlocked) {
        return (
            <div className={`bg-gray-100 flex flex-col items-center justify-center text-gray-500 p-8 text-center ${className}`}>
                <Globe size={32} className="mb-4 text-gray-400" />
                <h4 className="text-sm font-bold uppercase tracking-brand text-black mb-2">External Link</h4>
                <div className="flex gap-4">
                     <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-black text-white px-5 py-3 text-xs font-bold uppercase tracking-brand hover:bg-gray-800 shadow-lg">Open Site <ExternalLink size={12} /></a>
                    {!hasError && !isDefinitelyBlocked && <button onClick={() => setViewMode('iframe')} className="flex items-center gap-2 bg-white border border-gray-300 text-black px-5 py-3 text-xs font-bold uppercase tracking-brand hover:bg-gray-50">Try Preview <Play size={12} /></button>}
                </div>
            </div>
        );
    }
    return <iframe src={url} className={className} onError={() => setHasError(true)} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" sandbox="allow-scripts allow-same-origin allow-popups allow-forms" referrerPolicy="no-referrer" title="Web Article" />;
};

interface EditableImageProps {
  src: string;
  onSave: (newSrc: string) => void;
  className?: string;
  containerClassName?: string;
  alt?: string;
  allowVideo?: boolean;
  youtubeOptions?: { autoplay?: boolean; controls?: boolean; muted?: boolean; loop?: boolean; };
}

export const EditableImage: React.FC<EditableImageProps> = ({
  src, onSave, className = '', containerClassName = '', alt = 'Media', allowVideo = true, youtubeOptions
}) => {
  const { isAuthenticated } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [detectedType, setDetectedType] = useState<MediaType>('image');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
      setDetectedType(urlInput ? getMediaType(urlInput) : 'image');
  }, [urlInput]);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      
      // STRICT SIZE CHECK FOR NON-IMAGES
      // If it's not an image, we can't compress it. 
      // Vercel DB limit is ~4.5MB total. A 2MB video + existing data = 5MB+ Crash.
      if (!file.type.startsWith('image/')) {
          if (file.size > 1 * 1024 * 1024) { // 1MB Limit for Videos/Audio
              alert("⚠️ FILE TOO LARGE\n\nVideo/Audio files over 1MB cannot be stored directly in the database. \n\nPlease upload to YouTube/Spotify and use the link instead.");
              return;
          }
      }

      setIsUploading(true);
      setUploadProgress(10);
      try {
          if (file.type.startsWith('image/')) {
              setUploadProgress(30);
              // Use aggressive compression
              const compressedBase64 = await compressImage(file);
              setUploadProgress(80);
              onSave(compressedBase64);
              setTimeout(() => {
                  setUploadProgress(100);
                  setIsModalOpen(false);
                  setIsUploading(false);
              }, 500);
          } else {
              const reader = new FileReader();
              reader.onprogress = (event) => {
                  if (event.lengthComputable) setUploadProgress((event.loaded / event.total) * 100);
              };
              reader.onloadend = () => {
                 setUploadProgress(100);
                 if (typeof reader.result === 'string') {
                    onSave(reader.result);
                    setIsModalOpen(false);
                    setIsUploading(false);
                 }
              };
              reader.readAsDataURL(file);
          }
      } catch (err) {
          console.error("Upload failed", err);
          alert("Failed to process file.");
          setIsUploading(false);
      }
    }
  };

  const handleUrlSave = () => {
      if (urlInput.trim()) {
          onSave(urlInput.trim());
          setIsModalOpen(false);
      }
  };

  const mediaType = allowVideo ? getMediaType(src) : 'image';

  const renderContent = () => {
    if (!src) {
        return (
             <div className={`bg-gray-100 flex items-center justify-center text-gray-300 w-full h-full ${className}`}>
                <span className="text-[10px] font-bold uppercase tracking-brand">No Asset</span>
             </div>
        );
    }

    switch (mediaType) {
        case 'youtube': return <YouTubePlayer urlOrId={src} className={`${className} pointer-events-auto`} autoplay={youtubeOptions?.autoplay} muted={youtubeOptions?.muted} controls={youtubeOptions?.controls} loop={youtubeOptions?.loop} />;
        case 'spotify': 
            const spotifyEmbed = getSpotifyEmbedUrl(src);
            return spotifyEmbed ? <iframe src={spotifyEmbed} className={className} frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture; web-share" loading="lazy" title="Spotify Player" /> : <div className="bg-black flex items-center justify-center text-white">Invalid Spotify Link</div>;
        case 'video': return <video src={src} className={`${className} object-cover`} autoPlay muted loop playsInline />;
        case 'audio': return <div className={`flex items-center justify-center bg-gray-100 ${className}`}><Volume2 className="w-12 h-12 text-gray-400" /><audio src={src} controls className="absolute bottom-2 w-11/12 shadow-lg" /></div>;
        case 'iframe': return <WebFrame url={src} className={className} />;
        default: return <img src={src} alt={alt} className={className} />;
    }
  };

  return (
    <div className={`relative group/img ${containerClassName}`}>
      {renderContent()}
      {isAuthenticated && (
        <>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center cursor-pointer z-30" onClick={(e) => { e.stopPropagation(); setUrlInput(src || ''); setIsModalOpen(true); }}>
                <div className="bg-white text-black px-5 py-3 rounded-full flex items-center gap-3 text-xs font-bold uppercase tracking-brand shadow-2xl border border-white hover:scale-105 transition-transform">
                    {mediaType === 'youtube' ? <Youtube size={16} /> : mediaType === 'spotify' ? <Music size={16} /> : mediaType === 'iframe' ? <Globe size={16} /> : mediaType === 'video' ? <Film size={16} /> : mediaType === 'audio' ? <Volume2 size={16}/> : <ImageIcon size={16} />}
                    <span>Edit Media</span>
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={(e) => { e.stopPropagation(); setIsModalOpen(false); }}>
                    <div className="bg-white p-8 w-full max-w-lg shadow-2xl relative rounded-none animate-[fadeIn_0.2s_ease-out]" onClick={e => e.stopPropagation()}>
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-black hover:text-gray-500"><X size={20}/></button>
                        <h3 className="text-xl font-bold uppercase tracking-brand mb-8 flex items-center gap-3"><Upload size={20} /> Update Asset</h3>
                        <div className="space-y-8">
                            <div className="bg-gray-50 p-6 border border-gray-200">
                                <label className="text-[10px] font-bold uppercase tracking-brand text-gray-500 mb-3 block flex items-center gap-2"><Link size={12} /> External Link</label>
                                <div className="flex gap-2">
                                    <input 
                                        value={urlInput} 
                                        onChange={e => setUrlInput(e.target.value)} 
                                        className={`flex-1 border border-gray-300 focus:border-black p-3 text-sm outline-none bg-white text-black rounded-none`} 
                                        placeholder="Paste Link..." 
                                        autoFocus 
                                    />
                                    <button onClick={handleUrlSave} className="bg-black text-white px-6 font-bold uppercase text-xs hover:bg-gray-800 transition-colors rounded-none">Save</button>
                                </div>
                            </div>
                            <div className="flex items-center gap-4"><div className="h-px bg-gray-200 flex-1"></div><span className="text-[10px] font-bold uppercase text-gray-400">OR</span><div className="h-px bg-gray-200 flex-1"></div></div>
                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-brand text-gray-500 mb-3 block">Direct Upload</label>
                                {isUploading ? (
                                    <div className="w-full border border-gray-200 p-8 flex flex-col items-center justify-center gap-4 bg-gray-50">
                                        <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden"><div className="bg-black h-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div></div>
                                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-brand animate-pulse">
                                            <Loader2 size={14} className="animate-spin" /> Compressing & Uploading... {Math.round(uploadProgress)}%
                                        </div>
                                    </div>
                                ) : (
                                    <button onClick={() => fileInputRef.current?.click()} className="w-full border border-dashed border-gray-300 p-8 hover:border-black hover:bg-gray-50 transition-all flex flex-col items-center justify-center gap-3 text-gray-500 hover:text-black bg-white">
                                        <div className="p-3 bg-gray-100 rounded-full">
                                            <Upload size={20} />
                                        </div>
                                        <span className="text-xs font-bold uppercase">Browse Files</span>
                                        <span className="text-[9px] text-gray-400 font-normal">Auto-Compressed for Speed</span>
                                    </button>
                                )}
                            </div>
                        </div>
                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*,video/mp4,video/webm,video/ogg,audio/mpeg,audio/wav,audio/mp4" onChange={handleFileChange} />
                    </div>
                </div>
            )}
        </>
      )}
    </div>
  );
};
