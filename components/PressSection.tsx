import React, { useState, ChangeEvent } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { PressRelease } from '../types';
import { Plus, X, ExternalLink, Globe, Calendar, Trash2, Image as ImageIcon, Upload, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { analyzePressLink } from '../services/geminiService';
import { EditableText } from './Editable';

interface PressSectionProps {
    limit?: number;
    onViewAll?: () => void;
}

const PressSection: React.FC<PressSectionProps> = ({ limit, onViewAll }) => {
    const { pressReleases, addPressRelease, updatePressRelease, removePressRelease, isAuthenticated, publish } = useAdmin();
    const [isAdding, setIsAdding] = useState(false);
    const [formUrl, setFormUrl] = useState('');
    const [formData, setFormData] = useState<Partial<PressRelease>>({});
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    // Automatic Sorting: Newest Date First
    const sortedPressReleases = [...pressReleases].sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        // Handle invalid dates safely
        const validDateA = isNaN(dateA) ? 0 : dateA;
        const validDateB = isNaN(dateB) ? 0 : dateB;
        return validDateB - validDateA;
    });

    // Apply limit if provided (Preview Mode)
    const displayItems = limit ? sortedPressReleases.slice(0, limit) : sortedPressReleases;
    const isPreview = !!limit;

    // Safe Helper to prevent crashes
    const getFaviconUrl = (url: string) => {
        if (!url || url === '#' || !url.startsWith('http')) return "https://via.placeholder.com/128";
        try {
            const origin = new URL(url).origin;
            return `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${origin}&size=128`;
        } catch (e) {
            return "https://via.placeholder.com/128"; // Safe fallback
        }
    };

    const isValidUrl = (url: string) => {
        try {
            new URL(url);
            return true;
        } catch (_) {
            return false;
        }
    };

    const handleUrlInput = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setFormUrl(val);
        
        // Only attempt analysis if it looks like a complete URL
        if (isValidUrl(val)) {
            handleUrlAnalysis(val);
        }
    };

    const handleUrlAnalysis = async (url: string) => {
        if (!url) return;
        
        try {
            const urlObj = new URL(url);
            let domain = urlObj.hostname.replace('www.', '');
            domain = domain.charAt(0).toUpperCase() + domain.slice(1).split('.')[0];
            const fallbackImage = getFaviconUrl(url);
            
            // Set basic data immediately so fields aren't empty if AI fails
            setFormData(prev => ({
                ...prev,
                url: url,
                outlet: domain,
                imageUrl: prev.imageUrl || fallbackImage,
                date: prev.date || new Date().toISOString().split('T')[0]
            }));

            // AI Extraction
            setIsAnalyzing(true);
            const aiData = await analyzePressLink(url);
            setIsAnalyzing(false);

            if (aiData) {
                setFormData(prev => ({
                    ...prev,
                    title: aiData.title,
                    outlet: aiData.outlet || domain, 
                    date: aiData.date,
                    snippet: aiData.snippet,
                    url: url,
                    // If AI found a main image, overwrite
                    imageUrl: aiData.mainImage ? aiData.mainImage : prev.imageUrl 
                }));
            }
        } catch (e) {
            setIsAnalyzing(false);
            // Even if AI fails, we have basic data from the first setFormData call
        }
    };

    const compressArticleImage = async (file: File): Promise<string | null> => {
        return new Promise((resolve) => {
            // Check file size - warn if over 200KB
            if (file.size > 200 * 1024) {
                alert(`⚠️ IMAGE SIZE WARNING\n\nImage (${(file.size / 1024).toFixed(0)}KB) is quite large. For syncing reliability, please use an image under 150KB or paste an external image URL instead.`);
            }
            
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target?.result as string;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    if (!ctx) { resolve(img.src); return; }
                    
                    // ULTRA AGGRESSIVE for articles: Max 500px width
                    const maxWidth = 500;
                    let width = img.width;
                    let height = img.height;
                    if (width > maxWidth) {
                        height = Math.round((height * maxWidth) / width);
                        width = maxWidth;
                    }
                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);
                    // Ultra-low quality for articles: 0.4 (Maximum compression)
                    resolve(canvas.toDataURL('image/jpeg', 0.4));
                };
                img.onerror = () => resolve(null);
            };
            reader.readAsDataURL(file);
        });
    };

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert("Please upload an image file.");
                return;
            }
            const compressed = await compressArticleImage(file);
            if (compressed) {
                setFormData(prev => ({ ...prev, imageUrl: compressed }));
            }
        }
    };

    const handleAdd = () => {
        if (!formData.title) {
            alert("Please enter a title for the article.");
            return;
        }
        if (!formData.url) {
            alert("Please enter a valid URL.");
            return;
        }
        
        const newPress: PressRelease = {
            id: Date.now().toString(),
            title: formData.title,
            outlet: formData.outlet || "News Outlet",
            date: formData.date || new Date().toISOString().split('T')[0],
            url: formData.url,
            snippet: formData.snippet || "Featured Article",
            imageUrl: formData.imageUrl || getFaviconUrl(formData.url)
        };

        addPressRelease(newPress);
        publish();
        setIsAdding(false);
        setFormUrl('');
        setFormData({});
    };

    return (
        <div className={`bg-white border-t border-rover-border ${isPreview ? 'py-24' : 'py-32'}`}>
            <div className="max-w-[1600px] mx-auto px-6 md:px-12">
                <div className={`flex justify-between items-end mb-16 pb-8 ${isPreview ? '' : 'border-b border-rover-border'}`}>
                    <div>
                        {!isPreview && <span className="text-[10px] font-bold tracking-brand uppercase text-rover-muted mb-4 block">Global Coverage</span>}
                        <h2 className="text-4xl md:text-5xl font-normal text-rover-obsidian tracking-tight uppercase">PRESS & NEWS</h2>
                    </div>
                    {isAuthenticated && !isPreview && (
                        <button 
                            onClick={() => setIsAdding(true)}
                            className="bg-black text-white px-6 py-4 text-[10px] font-bold uppercase tracking-brand flex items-center gap-2 hover:bg-gray-800 transition-colors rounded-none"
                        >
                            <Plus size={14} /> Add Article
                        </button>
                    )}
                </div>

                {/* Add Modal */}
                {isAdding && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm p-4">
                        <div className="bg-white p-8 max-w-lg w-full shadow-2xl relative animate-[fadeIn_0.3s_ease-out] rounded-none">
                            <button onClick={() => setIsAdding(false)} className="absolute top-4 right-4 text-black"><X size={20}/></button>
                            <h3 className="text-xl font-bold mb-6 tracking-tight uppercase text-black">Add Press Link</h3>
                            
                            <div className="bg-gray-50 p-4 mb-6 border border-gray-200 rounded-none relative">
                                <label className="text-[10px] font-bold uppercase tracking-brand text-gray-500 mb-2 block">Article URL</label>
                                <div className="flex gap-2">
                                    <input 
                                        className="flex-1 border p-2 text-sm outline-none focus:border-black bg-white text-black rounded-none pr-10 placeholder-gray-400" 
                                        placeholder="Paste Link to Auto-Fill..."
                                        value={formUrl}
                                        onChange={handleUrlInput}
                                        disabled={isAnalyzing}
                                    />
                                    <button 
                                        onClick={() => handleUrlAnalysis(formUrl)}
                                        className="bg-black text-white px-3 flex items-center justify-center rounded-none w-10 hover:bg-gray-800 transition-colors"
                                        title="Retry Analysis"
                                    >
                                        {isAnalyzing ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                                    </button>
                                </div>
                                <p className="text-[10px] text-gray-400 mt-2 flex items-center gap-1">
                                    {isAnalyzing ? "AI is extracting metadata..." : "Paste a URL to auto-extract Title, Outlet, Quote, and Image."}
                                </p>
                            </div>

                            <div className={`space-y-4 transition-opacity duration-300 ${isAnalyzing ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                                <div className="bg-gray-50 p-2 border border-gray-200 rounded-none">
                                    <label className="text-[10px] font-bold uppercase tracking-brand text-gray-500 mb-2 block">Article Image</label>
                                    <div className="flex gap-2 items-center">
                                        {formData.imageUrl && (
                                            <div className="w-10 h-10 bg-gray-200 shrink-0">
                                                <img src={formData.imageUrl} className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                        <input 
                                            className="flex-1 border p-2 text-sm outline-none focus:border-black bg-white text-black rounded-none placeholder-gray-400" 
                                            placeholder="Paste Image URL..." 
                                            value={formData.imageUrl || ''} 
                                            onChange={e => setFormData({...formData, imageUrl: e.target.value})} 
                                        />
                                        <label className="bg-white border p-2 cursor-pointer hover:bg-gray-100 rounded-none">
                                            <Upload size={16} className="text-black" />
                                            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                        </label>
                                    </div>
                                </div>

                                <input 
                                    className="w-full border p-3 text-sm outline-none focus:border-black bg-white text-black rounded-none placeholder-gray-400" 
                                    placeholder="Article Title (Required)" 
                                    value={formData.title || ''} 
                                    onChange={e => setFormData({...formData, title: e.target.value})} 
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <input 
                                        className="w-full border p-3 text-sm outline-none focus:border-black bg-white text-black rounded-none placeholder-gray-400" 
                                        placeholder="Outlet Name" 
                                        value={formData.outlet || ''} 
                                        onChange={e => setFormData({...formData, outlet: e.target.value})} 
                                    />
                                    <input 
                                        type="date" 
                                        className="w-full border p-3 text-sm outline-none focus:border-black bg-white text-black rounded-none" 
                                        value={formData.date || ''} 
                                        onChange={e => setFormData({...formData, date: e.target.value})} 
                                    />
                                </div>
                                <textarea 
                                    className="w-full border p-3 text-sm outline-none focus:border-black min-h-[80px] bg-white text-black rounded-none placeholder-gray-400" 
                                    placeholder="Short Snippet / Quote" 
                                    value={formData.snippet || ''} 
                                    onChange={e => setFormData({...formData, snippet: e.target.value})} 
                                />
                            </div>

                            <button onClick={handleAdd} disabled={isAnalyzing} className="w-full bg-black text-white py-4 mt-8 text-xs font-bold uppercase tracking-brand hover:bg-gray-900 rounded-none disabled:opacity-50">
                                {isAnalyzing ? "Analyzing..." : "Publish to Press"}
                            </button>
                        </div>
                    </div>
                )}

                {/* Press Grid - Editorial Layout */}
                <div className={
                    isPreview 
                    ? "grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-12" // Preview: Force 3 cols on MD to keep 1 row
                    : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16" // Full: Standard grid
                }>
                    {displayItems.map((press) => (
                        <div key={press.id} className="group relative flex flex-col h-full">
                            {isAuthenticated && !isPreview && (
                                <button 
                                    onClick={() => { if(window.confirm('Remove article?')) { removePressRelease(press.id); publish(); } }}
                                    className="absolute top-2 right-2 z-20 text-white bg-red-500 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Trash2 size={12} />
                                </button>
                            )}
                            
                            {/* Image Area - Static, Precise */}
                            <a href={press.url} target="_blank" rel="noopener noreferrer" className="block aspect-[16/9] bg-gray-100 overflow-hidden relative mb-6 border border-gray-100 hover:border-black transition-colors">
                                <img 
                                    src={press.imageUrl || getFaviconUrl(press.url)} 
                                    className="w-full h-full object-cover transition-transform duration-[1000ms] ease-luxury group-hover:scale-105" 
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = getFaviconUrl(press.url);
                                        (e.target as HTMLImageElement).classList.add('p-12', 'object-contain'); 
                                    }}
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
                            </a>
                            
                            <div className="flex flex-col flex-1 pt-2">
                                <div className="flex justify-between items-start mb-4 border-b border-black/10 pb-4">
                                     <EditableText 
                                        tag="span"
                                        value={press.outlet} 
                                        onSave={(val) => { updatePressRelease(press.id, { outlet: val }); publish(); }}
                                        className="text-[10px] font-bold uppercase tracking-brand text-black"
                                     />
                                     <EditableText 
                                        tag="span"
                                        value={press.date} 
                                        onSave={(val) => { updatePressRelease(press.id, { date: val }); publish(); }}
                                        className="text-[10px] font-bold uppercase tracking-wide text-gray-400"
                                     />
                                </div>
                                
                                <EditableText 
                                    tag="h3"
                                    value={press.title}
                                    onSave={(val) => { updatePressRelease(press.id, { title: val }); publish(); }}
                                    className="text-xl md:text-2xl font-normal text-rover-obsidian leading-tight mb-4 group-hover:text-gray-600 transition-colors"
                                />
                                
                                <EditableText 
                                    tag="p"
                                    multiline
                                    value={press.snippet}
                                    onSave={(val) => { updatePressRelease(press.id, { snippet: val }); publish(); }}
                                    className="text-sm text-gray-600 font-normal leading-relaxed line-clamp-3 mb-6"
                                />
                                
                                <div className="mt-auto">
                                    <a href={press.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[10px] font-bold tracking-brand uppercase text-black hover:opacity-60 transition-opacity">
                                        Read Article <ExternalLink size={12} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {onViewAll && (
                    <div className="mt-16 pt-8 border-t border-rover-border flex justify-center">
                        <button 
                            onClick={onViewAll}
                            className="flex items-center gap-4 px-12 py-5 border border-black text-black hover:bg-black hover:text-white transition-all duration-300 text-xs font-bold tracking-brand uppercase rounded-none"
                        >
                            View All News <ArrowRight size={16} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PressSection;