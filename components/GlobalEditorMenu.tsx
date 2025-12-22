
import React, { useState, useRef } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { RotateCcw, RotateCw, Save, Check, Users, Download, Upload, Trash2, Database, Loader2 } from 'lucide-react';
import { Tab } from '../types';
import AccessManager from './AccessManager';

interface GlobalEditorMenuProps {
    onNavigate?: (tab: Tab) => void;
}

const GlobalEditorMenu: React.FC<GlobalEditorMenuProps> = ({ onNavigate }) => {
    const { undo, redo, canUndo, canRedo, publish, exportFullState, importFullState, resetToFactory, isSyncing } = useAdmin();
    const [isAccessManagerOpen, setIsAccessManagerOpen] = useState(false);
    const [isDataMenuOpen, setIsDataMenuOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handlePublish = async () => {
        await publish();
    };

    const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async (event) => {
                const content = event.target?.result as string;
                const success = await importFullState(content);
                if (success) {
                    alert("Local state updated from backup.");
                }
            };
            reader.readAsText(file);
        }
    };

    return (
        <>
            <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-3 pointer-events-none">
                
                {/* Expandable Data Tools */}
                {isDataMenuOpen && (
                    <div className="flex flex-col gap-2 mb-2 animate-[fadeIn_0.2s_ease-out] pointer-events-auto">
                        <button 
                            onClick={exportFullState}
                            className="bg-black/90 backdrop-blur text-white p-3 rounded-full flex items-center gap-2 hover:bg-gray-800 transition-colors shadow-xl border border-white/10"
                            title="Export Backup (.json)"
                        >
                            <Download size={14} /> <span className="text-[9px] font-bold uppercase tracking-brand pr-2">Backup</span>
                        </button>
                        <button 
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-black/90 backdrop-blur text-white p-3 rounded-full flex items-center gap-2 hover:bg-gray-800 transition-colors shadow-xl border border-white/10"
                            title="Import/Sync Backup"
                        >
                            <Upload size={14} /> <span className="text-[9px] font-bold uppercase tracking-brand pr-2">Restore</span>
                        </button>
                        <button 
                            onClick={resetToFactory}
                            className="bg-red-600/90 backdrop-blur text-white p-3 rounded-full flex items-center gap-2 hover:bg-red-700 transition-colors shadow-xl border border-white/10"
                            title="Hard Reset to Code Defaults"
                        >
                            <Trash2 size={14} /> <span className="text-[9px] font-bold uppercase tracking-brand pr-2">Factory Reset</span>
                        </button>
                        <input type="file" ref={fileInputRef} className="hidden" accept=".json" onChange={handleImportFile} />
                    </div>
                )}

                {/* Primary Toolbar */}
                <div className="bg-black/95 backdrop-blur text-white p-2 rounded-full shadow-2xl flex items-center gap-2 pointer-events-auto border border-white/10">
                    <button
                        onClick={() => setIsAccessManagerOpen(true)}
                        className="p-3 rounded-full hover:bg-white/10 text-blue-400 transition-colors"
                        title="Investor Access"
                    >
                        <Users size={16} />
                    </button>
                    
                    <button 
                        onClick={() => setIsDataMenuOpen(!isDataMenuOpen)}
                        className={`p-3 rounded-full transition-colors ${isDataMenuOpen ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-emerald-400'}`}
                        title="Data Management"
                    >
                        <Database size={16} />
                    </button>
                    
                    <div className="w-px h-4 bg-white/10"></div>
                    
                    <button 
                        onClick={undo} 
                        disabled={!canUndo}
                        className={`p-3 rounded-full transition-colors ${canUndo ? 'hover:bg-white/10 text-white' : 'text-white/20'}`}
                        title="Undo"
                    >
                        <RotateCcw size={16} />
                    </button>
                    
                    <button 
                        onClick={redo} 
                        disabled={!canRedo}
                        className={`p-3 rounded-full transition-colors ${canRedo ? 'hover:bg-white/10 text-white' : 'text-white/20'}`}
                        title="Redo"
                    >
                        <RotateCw size={16} />
                    </button>
                    
                    <div className="w-px h-4 bg-white/10"></div>
                    
                    <button 
                        onClick={handlePublish}
                        disabled={isSyncing}
                        className="flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-full hover:bg-gray-200 transition-all text-[10px] font-bold uppercase tracking-brand ml-1 shadow-lg disabled:opacity-70 disabled:cursor-wait"
                    >
                        {isSyncing ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                        <span>{isSyncing ? 'Syncing...' : 'Publish'}</span>
                    </button>
                </div>
            </div>

            {isAccessManagerOpen && <AccessManager onClose={() => setIsAccessManagerOpen(false)} />}
        </>
    );
};

export default GlobalEditorMenu;
