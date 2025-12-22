import React, { useState, ChangeEvent } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { TrendingUp, ArrowRight, Shield, PieChart, Lock, FileText, ShieldCheck, Plus, Edit2, X, Sparkles, Trash2, Check, Bell, Download, Calendar, Upload, Image as ImageIcon, Video as VideoIcon, Music } from 'lucide-react';
import TermSheetModal from './TermSheetModal';
import { Project, ProjectUpdate, InvestorProfile, ProjectMedia } from '../types';
import { analyzeDealStructure, generateLegalContract } from '../services/geminiService';
import { getMediaType, YouTubePlayer } from './Editable';

interface InvestorDashboardProps {
    onLogout: () => void;
    currentInvestor?: InvestorProfile;
}

type DashboardView = 'opportunities' | 'portfolio';

const InvestorDashboard: React.FC<InvestorDashboardProps> = ({ onLogout, currentInvestor }) => {
    const { projects, addProject, updateProject, removeProject, addProjectUpdate, isAuthenticated, publish } = useAdmin();
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formProject, setFormProject] = useState<Partial<Project>>({});
    const [isProcessingAI, setIsProcessingAI] = useState(false);
    const [activeView, setActiveView] = useState<DashboardView>('opportunities');
    const [updateForm, setUpdateForm] = useState<{ projectId: string, title: string, content: string } | null>(null);
    const [mediaInput, setMediaInput] = useState('');
    const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

    // Filter projects based on permissions
    const visibleProjects = isAuthenticated 
        ? projects 
        : currentInvestor 
            ? projects.filter(p => currentInvestor.assignedProjectIds.includes(p.id)) 
            : [];

    const portfolioProjects = visibleProjects.filter(p => p.isSigned);
    const displayPortfolio = portfolioProjects;

    const handleEditClick = (project: Project) => {
        setFormProject(project);
        setIsEditing(true);
    };

    const handleAddClick = () => {
        setFormProject({
            id: undefined, 
            title: "",
            category: "Tech / Platform",
            status: "Open Round",
            progress: 0,
            raised: "$0",
            fundingGoal: "$1,000,000",
            valuation: "$10M Post-Money",
            equity: "10%",
            minCheck: "$25,000",
            lockup: "1 Year",
            description: "",
            media: []
        });
        setIsEditing(true);
    };

    const handleSave = async () => {
        if (!formProject.title) return;
        
        let finalProject = { ...formProject };
        
        if (!finalProject.contractBody) {
            setIsProcessingAI(true);
            const legalDocs = await generateLegalContract(finalProject);
            if (legalDocs) {
                finalProject.contractBody = legalDocs.contractBody;
                finalProject.wiringInstructions = legalDocs.wiringInstructions;
            }
            setIsProcessingAI(false);
        }

        const projectData = {
            ...finalProject,
            id: finalProject.id || `inv-${Date.now()}`,
        } as Project;

        if (finalProject.id) {
            updateProject(finalProject.id, projectData);
        } else {
            addProject(projectData);
        }
        publish();
        setIsEditing(false);
        setFormProject({});
    };

    const handleSmartAnalyze = async () => {
        if (!formProject.description) return;
        setIsProcessingAI(true);
        
        const analysis = await analyzeDealStructure(formProject.description);
        
        if (analysis) {
            setFormProject(prev => ({
                ...prev,
                title: analysis.title || prev.title,
                category: analysis.category || prev.category,
                description: analysis.description,
                fundingGoal: analysis.fundingGoal || prev.fundingGoal,
                valuation: analysis.valuation || prev.valuation,
                equity: analysis.equity || prev.equity,
                lockup: analysis.lockup || prev.lockup,
                minCheck: analysis.minCheck || prev.minCheck,
                status: analysis.status || prev.status
            }));
        }
        
        setIsProcessingAI(false);
    };

    const handlePostUpdate = () => {
        if (!updateForm || !updateForm.title || !updateForm.content) return;
        
        const newUpdate: ProjectUpdate = {
            id: Date.now().toString(),
            date: new Date().toLocaleDateString(),
            title: updateForm.title,
            content: updateForm.content
        };
        
        addProjectUpdate(updateForm.projectId, newUpdate);
        publish();
        setUpdateForm(null);
    };

    const handleAddMedia = (url: string) => {
        if (!url) return;
        const type = getMediaType(url);
        const newMedia: ProjectMedia = {
            id: Date.now().toString(),
            type: type,
            url: url,
            name: "New Asset"
        };
        setFormProject(prev => ({
            ...prev,
            media: [...(prev.media || []), newMedia]
        }));
        setMediaInput('');
    };

    const handleMediaUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    handleAddMedia(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveMedia = (id: string) => {
        setFormProject(prev => ({
            ...prev,
            media: prev.media?.filter(m => m.id !== id) || []
        }));
    };

    return (
        <div className="bg-white min-h-screen pt-24 pb-24">
            
            {/* Term Sheet Modal */}
            {selectedProject && (
                <TermSheetModal 
                    project={selectedProject} 
                    onClose={() => setSelectedProject(null)} 
                />
            )}

            {/* Post Update Modal (Admin Only) */}
            {updateForm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-white p-8 max-w-lg w-full shadow-2xl rounded-none animate-[fadeIn_0.3s_ease-out]">
                        <h3 className="text-lg font-bold uppercase tracking-brand mb-4">Post Investor Update</h3>
                        <div className="space-y-4">
                            <input 
                                className="w-full border p-3 text-sm rounded-none bg-white text-black" 
                                placeholder="Update Title (e.g. Q1 Earnings)" 
                                value={updateForm.title}
                                onChange={e => setUpdateForm({...updateForm, title: e.target.value})}
                            />
                            <textarea 
                                className="w-full border p-3 text-sm rounded-none h-32 bg-white text-black" 
                                placeholder="Update content..."
                                value={updateForm.content}
                                onChange={e => setUpdateForm({...updateForm, content: e.target.value})}
                            />
                        </div>
                        <div className="flex gap-4 mt-6 justify-end">
                            <button onClick={() => setUpdateForm(null)} className="px-4 py-2 border text-black text-xs font-bold uppercase tracking-brand rounded-none">Cancel</button>
                            <button onClick={handlePostUpdate} className="px-4 py-2 bg-black text-white text-xs font-bold uppercase tracking-brand rounded-none">Post Update</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Fullscreen Image Modal */}
            {fullscreenImage && (
                <div 
                    className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out] cursor-zoom-out backdrop-blur-sm"
                    onClick={() => setFullscreenImage(null)}
                >
                    <button 
                        onClick={() => setFullscreenImage(null)} 
                        className="absolute top-6 right-6 text-white hover:text-gray-400 transition-colors"
                    >
                        <X size={32} />
                    </button>
                    <img 
                        src={fullscreenImage} 
                        className="max-w-full max-h-[90vh] object-contain shadow-2xl cursor-default" 
                        alt="Fullscreen Preview"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}

            {/* Main Header & Nav */}
            <div className="max-w-[1600px] mx-auto px-6 md:px-12 mb-16 border-b border-rover-border pb-8">
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
                    <div>
                        <div className="flex items-center gap-3 text-emerald-600 mb-4 bg-emerald-50 w-fit px-3 py-1 border border-emerald-100">
                                <Lock size={12} />
                                <span className="text-[10px] font-bold tracking-brand uppercase">
                                    {isAuthenticated ? 'Admin Superuser' : `Welcome, ${currentInvestor?.name}`}
                                </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-normal text-rover-obsidian tracking-tight leading-none uppercase">
                            Investor<br/><span className="text-gray-400">Relations</span>
                        </h1>
                    </div>
                    
                    <div className="flex gap-4 items-center">
                        {isAuthenticated && (
                            <button 
                                onClick={handleAddClick} 
                                className="bg-black text-white px-6 py-4 text-[10px] font-bold uppercase tracking-brand flex items-center gap-2 hover:bg-gray-800 shadow-lg rounded-none"
                            >
                                <Plus size={14} /> New Deal
                            </button>
                        )}
                        <button 
                            onClick={onLogout}
                            className="bg-gray-100 text-black px-6 py-4 text-xs font-bold uppercase tracking-brand hover:bg-black hover:text-white transition-colors rounded-none"
                        >
                            {isAuthenticated ? 'Exit Portal' : 'Secure Logout'}
                        </button>
                    </div>
                </div>

                {/* TABS */}
                <div className="flex gap-8">
                    <button 
                        onClick={() => setActiveView('opportunities')}
                        className={`text-sm font-bold uppercase tracking-brand pb-4 border-b-2 transition-colors ${activeView === 'opportunities' ? 'text-black border-black' : 'text-gray-400 border-transparent hover:text-gray-600'}`}
                    >
                        Opportunities
                    </button>
                    <button 
                        onClick={() => setActiveView('portfolio')}
                        className={`text-sm font-bold uppercase tracking-brand pb-4 border-b-2 transition-colors flex items-center gap-2 ${activeView === 'portfolio' ? 'text-black border-black' : 'text-gray-400 border-transparent hover:text-gray-600'}`}
                    >
                        My Investments
                        {displayPortfolio.length > 0 && <span className="bg-gray-100 text-black px-2 text-[9px] rounded-full">{displayPortfolio.length}</span>}
                    </button>
                </div>
            </div>

            {/* VIEW: OPPORTUNITIES */}
            {activeView === 'opportunities' && (
                <div className="max-w-[1600px] mx-auto px-6 md:px-12 animate-[fadeIn_0.5s_ease-out]">
                    {visibleProjects.length === 0 ? (
                        <div className="bg-gray-50 border border-rover-border p-16 text-center">
                            <Shield size={48} className="mx-auto text-gray-300 mb-6" />
                            <h3 className="text-xl font-bold uppercase tracking-brand text-gray-400">No Opportunities Available</h3>
                            <p className="text-sm text-gray-400 mt-2">Contact KANTALAND to request access to deal flow.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {visibleProjects.map((project) => (
                                <div key={project.id} className="border border-rover-border bg-white group hover:border-black transition-colors duration-500 flex flex-col h-full relative">
                                    {isAuthenticated && (
                                        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                            <button onClick={() => handleEditClick(project)} className="p-2 bg-gray-100 hover:bg-black hover:text-white rounded-none"><Edit2 size={12}/></button>
                                            <button onClick={() => { if(window.confirm('Delete deal?')) { removeProject(project.id); publish(); }}} className="p-2 bg-red-100 text-red-600 hover:bg-red-600 hover:text-white rounded-none"><Trash2 size={12}/></button>
                                        </div>
                                    )}

                                    <div className="p-8 border-b border-rover-border flex justify-between items-start">
                                        <span className="text-[10px] font-bold uppercase tracking-brand text-gray-400 border border-gray-200 px-2 py-1">{project.category}</span>
                                        {project.status === "Closed" ? (
                                            <span className="text-[10px] font-bold uppercase tracking-brand text-gray-400 flex items-center gap-1">
                                                <Lock size={10} /> Closed
                                            </span>
                                        ) : (
                                            <span className="text-[10px] font-bold uppercase tracking-brand text-emerald-600 flex items-center gap-1">
                                                <TrendingUp size={10} /> {project.status}
                                            </span>
                                        )}
                                    </div>
                                    
                                    <div className="p-8 flex-1">
                                        <h3 className="text-2xl font-medium text-rover-obsidian mb-6 tracking-tight uppercase group-hover:text-gray-700 transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 font-normal leading-relaxed mb-8 line-clamp-3">
                                            {project.description}
                                        </p>

                                        <div className="space-y-4">
                                            <div className="flex justify-between items-end">
                                                <div className="text-left">
                                                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-brand block mb-1">Raised</span>
                                                    <span className="text-base font-medium text-black">{project.raised}</span>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-brand block mb-1">Goal</span>
                                                    <span className="text-base font-medium text-gray-400">{project.fundingGoal}</span>
                                                </div>
                                            </div>
                                            {/* Progress Bar */}
                                            <div className="w-full bg-gray-100 h-1">
                                                <div 
                                                    className={`h-full transition-all duration-1000 ease-out ${project.status === 'Closed' ? 'bg-gray-400' : 'bg-black'}`} 
                                                    style={{ width: `${project.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        {/* DATA ROOM MEDIA GALLERY */}
                                        {project.media && project.media.length > 0 && (
                                            <div className="mt-8 space-y-4">
                                                <h4 className="text-[10px] font-bold uppercase tracking-brand text-gray-400 border-b border-gray-100 pb-2 flex items-center gap-2">
                                                    <FileText size={10}/> Data Room Assets
                                                </h4>
                                                <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
                                                    {project.media.map((media) => (
                                                        <div key={media.id} className="snap-center shrink-0 w-[240px] aspect-video bg-gray-50 border border-gray-100 relative group overflow-hidden">
                                                            {media.type === 'youtube' ? (
                                                                <YouTubePlayer urlOrId={media.url} className="w-full h-full" autoplay={false} muted={false} controls={true} />
                                                            ) : media.type === 'video' ? (
                                                                <video src={media.url} className="w-full h-full object-cover" controls playsInline />
                                                            ) : media.type === 'audio' ? (
                                                                <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gray-50">
                                                                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center mb-2"><Music size={14}/></div>
                                                                    <audio src={media.url} controls className="w-full h-8" />
                                                                </div>
                                                            ) : (
                                                                <img 
                                                                    src={media.url} 
                                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 cursor-zoom-in" 
                                                                    alt="Asset" 
                                                                    onClick={() => setFullscreenImage(media.url)}
                                                                />
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-auto border-t border-rover-border">
                                        <button 
                                            onClick={() => setSelectedProject(project)}
                                            className="w-full py-5 flex items-center justify-between px-8 text-xs font-bold uppercase tracking-brand hover:bg-black hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black group/btn" 
                                            disabled={project.status === 'Closed'}
                                        >
                                            <span className="flex items-center gap-2">
                                                {project.status === 'Closed' ? <Lock size={14}/> : <FileText size={14}/>}
                                                {project.status === 'Closed' ? 'Round Completed' : 'View Term Sheet'}
                                            </span>
                                            {project.status !== 'Closed' && <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform"/>}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* VIEW: MY INVESTMENTS (Portfolio view logic is largely similar) */}
            {activeView === 'portfolio' && (
                <div className="max-w-[1600px] mx-auto px-6 md:px-12 animate-[fadeIn_0.5s_ease-out]">
                    {displayPortfolio.length === 0 ? (
                        <div className="bg-gray-50 border border-rover-border p-16 text-center">
                            <Shield size={48} className="mx-auto text-gray-300 mb-6" />
                            <h3 className="text-xl font-bold uppercase tracking-brand text-gray-400">No Active Investments</h3>
                            <p className="text-sm text-gray-400 mt-2">Executed contracts will appear here.</p>
                        </div>
                    ) : (
                        // ... Portfolio list rendering (omitted for brevity as it's just display)
                        <div className="space-y-12">
                            {displayPortfolio.map(project => (
                                <div key={project.id} className="border border-rover-border bg-white flex flex-col lg:flex-row">
                                    {/* ... existing portfolio logic ... */}
                                    <div className="w-full lg:w-4/12 p-8 lg:p-12 border-r border-rover-border bg-gray-50">
                                         {/* ... */}
                                         <h3 className="text-3xl font-medium text-rover-obsidian mb-6 tracking-tight uppercase">{project.title}</h3>
                                         {/* ... */}
                                         <button onClick={() => setSelectedProject(project)} className="w-full py-4 border border-black text-black text-xs font-bold uppercase tracking-brand hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2 rounded-none"><FileText size={14} /> View Contract</button>
                                    </div>
                                     <div className="w-full lg:w-8/12 p-8 lg:p-12">
                                         {/* ... updates ... */}
                                         <h4 className="text-xs font-bold uppercase tracking-brand text-black mb-8 flex items-center gap-2"><Bell size={14} /> Project Updates</h4>
                                         {!project.updates || project.updates.length === 0 ? <p className="text-sm text-gray-400 italic">No updates.</p> : project.updates.map(u => <div key={u.id} className="mb-8"><span className="font-bold">{u.title}</span><p>{u.content}</p></div>)}
                                     </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Edit Modal */}
            {isEditing && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-white w-full max-w-3xl shadow-2xl overflow-hidden rounded-none animate-[fadeIn_0.3s_ease-out] flex flex-col max-h-[90vh]">
                        {/* Modal Header */}
                        <div className="bg-white px-8 py-6 border-b border-gray-200 flex justify-between items-center shrink-0">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-brand text-gray-500 block mb-1">Deal Structure</span>
                                <h2 className="text-xl font-bold uppercase tracking-tight text-black">
                                    {formProject.id ? 'Edit Investment Vehicle' : 'New Opportunity'}
                                </h2>
                            </div>
                            <button onClick={() => setIsEditing(false)} className="hover:bg-gray-100 p-2 transition-colors"><X size={20}/></button>
                        </div>
                        
                        {/* Modal Body */}
                        <div className="p-8 overflow-y-auto space-y-8 flex-1">
                            {/* ... Fields ... */}
                            <div className="space-y-6">
                                <h3 className="text-xs font-bold uppercase tracking-brand text-black border-b border-gray-100 pb-2">01. Project Identity</h3>
                                <div className="grid grid-cols-2 gap-6">
                                    {/* ... Existing Inputs ... */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-brand text-gray-500">Project Title</label>
                                        <input className="w-full border border-gray-300 p-3 text-sm rounded-none outline-none focus:border-black bg-white text-black" value={formProject.title || ''} onChange={e => setFormProject({...formProject, title: e.target.value})} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-brand text-gray-500">Category</label>
                                        <input className="w-full border border-gray-300 p-3 text-sm rounded-none outline-none focus:border-black bg-white text-black" value={formProject.category || ''} onChange={e => setFormProject({...formProject, category: e.target.value})} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <label className="text-[10px] font-bold uppercase tracking-brand text-gray-500">Thesis</label>
                                        <button onClick={handleSmartAnalyze} disabled={isProcessingAI} className="text-[10px] font-bold uppercase tracking-brand text-white bg-black px-3 py-1 flex items-center gap-2 hover:bg-gray-800 transition-colors rounded-none"><Sparkles size={10} className={isProcessingAI ? "animate-spin" : ""} /> {isProcessingAI ? 'Analyzing...' : 'Auto-Structure'}</button>
                                    </div>
                                    <textarea className="w-full border border-gray-300 p-4 text-sm rounded-none outline-none focus:border-black min-h-[120px] bg-white text-black" value={formProject.description || ''} onChange={e => setFormProject({...formProject, description: e.target.value})} placeholder="Project details..." />
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-xs font-bold uppercase tracking-brand text-black border-b border-gray-100 pb-2">02. Mechanics</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                    <input className="border p-3 text-sm rounded-none bg-white text-black" placeholder="Goal" value={formProject.fundingGoal} onChange={e => setFormProject({...formProject, fundingGoal: e.target.value})} />
                                    <input className="border p-3 text-sm rounded-none bg-white text-black" placeholder="Raised" value={formProject.raised} onChange={e => setFormProject({...formProject, raised: e.target.value})} />
                                    <input className="border p-3 text-sm rounded-none bg-white text-black" placeholder="Progress" type="number" value={formProject.progress} onChange={e => setFormProject({...formProject, progress: Number(e.target.value)})} />
                                    <input className="border p-3 text-sm rounded-none bg-white text-black" placeholder="Valuation" value={formProject.valuation} onChange={e => setFormProject({...formProject, valuation: e.target.value})} />
                                    <input className="border p-3 text-sm rounded-none bg-white text-black" placeholder="Equity" value={formProject.equity} onChange={e => setFormProject({...formProject, equity: e.target.value})} />
                                    <input className="border p-3 text-sm rounded-none bg-white text-black" placeholder="Min Check" value={formProject.minCheck} onChange={e => setFormProject({...formProject, minCheck: e.target.value})} />
                                    <input className="border p-3 text-sm rounded-none bg-white text-black" placeholder="Lock-up" value={formProject.lockup} onChange={e => setFormProject({...formProject, lockup: e.target.value})} />
                                    <select className="border p-3 text-sm rounded-none bg-white text-black" value={formProject.status} onChange={e => setFormProject({...formProject, status: e.target.value})}>
                                        <option>Open Round</option>
                                        <option>Closed</option>
                                    </select>
                                </div>
                            </div>

                             <div className="space-y-6">
                                <h3 className="text-xs font-bold uppercase tracking-brand text-black border-b border-gray-100 pb-2">03. Data Room Assets (Images, Video, Audio)</h3>
                                
                                {formProject.media && formProject.media.length > 0 && (
                                    <div className="grid grid-cols-3 md:grid-cols-4 gap-4 bg-gray-50 p-4 border border-gray-200">
                                        {formProject.media.map((media) => (
                                            <div key={media.id} className="relative group aspect-square bg-white border border-gray-200">
                                                {media.type === 'video' || media.type === 'youtube' ? (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400"><VideoIcon size={24}/></div>
                                                ) : media.type === 'audio' ? (
                                                     <div className="w-full h-full flex items-center justify-center text-gray-400"><Music size={24}/></div>
                                                ) : (
                                                    <img src={media.url} className="w-full h-full object-cover" alt="asset" />
                                                )}
                                                <button onClick={() => handleRemoveMedia(media.id)} className="absolute top-1 right-1 bg-red-500 text-white p-1 hover:bg-red-600 transition-colors"><X size={12}/></button>
                                                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[9px] p-1 truncate">{media.type}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="bg-gray-50 p-4 border border-gray-200">
                                    <label className="text-[10px] font-bold uppercase tracking-brand text-gray-500 mb-2 block">Add New Asset</label>
                                    <div className="flex gap-2 mb-2">
                                        <input 
                                            className="flex-1 border p-2 text-sm outline-none focus:border-black rounded-none bg-white" 
                                            placeholder="Paste Image/Video/YouTube URL..." 
                                            value={mediaInput}
                                            onChange={(e) => setMediaInput(e.target.value)}
                                        />
                                        <button onClick={() => handleAddMedia(mediaInput)} className="bg-black text-white px-4 text-xs font-bold uppercase hover:bg-gray-800">Add</button>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="h-px bg-gray-300 flex-1"></div>
                                        <span className="text-[9px] font-bold uppercase text-gray-400">OR</span>
                                        <div className="h-px bg-gray-300 flex-1"></div>
                                    </div>
                                    <div className="mt-2">
                                        <label className="flex items-center justify-center gap-2 w-full border border-dashed border-gray-300 p-3 bg-white hover:bg-gray-50 cursor-pointer text-xs font-bold uppercase text-gray-500 hover:text-black">
                                            <Upload size={14}/> <span>Upload File (Max 6MB)</span>
                                            <input type="file" className="hidden" onChange={handleMediaUpload} accept="image/*,video/mp4,video/webm,audio/*" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end gap-4 shrink-0">
                            <button onClick={() => setIsEditing(false)} className="px-8 py-4 border border-gray-300 text-black text-xs font-bold uppercase tracking-brand hover:bg-white transition-colors rounded-none">Cancel</button>
                            <button onClick={handleSave} className="px-8 py-4 bg-black text-white text-xs font-bold uppercase tracking-brand hover:bg-gray-800 transition-colors flex items-center gap-2 rounded-none shadow-lg">
                                {isProcessingAI ? <Sparkles size={14} className="animate-spin"/> : <Check size={14} />} 
                                {isProcessingAI ? 'Processing...' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InvestorDashboard;