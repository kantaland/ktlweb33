import React, { useState } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { X, Plus, Trash2, Key, Save, Check, Shield } from 'lucide-react';
import { InvestorProfile } from '../types';

interface AccessManagerProps {
    onClose: () => void;
}

const AccessManager: React.FC<AccessManagerProps> = ({ onClose }) => {
    const { investors, projects, addInvestor, updateInvestor, removeInvestor, publish } = useAdmin();
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formState, setFormState] = useState<Partial<InvestorProfile>>({});

    const startEditing = (investor?: InvestorProfile) => {
        if (investor) {
            setEditingId(investor.id);
            setFormState({ ...investor });
        } else {
            setEditingId('new');
            setFormState({
                name: '',
                email: '',
                accessKey: '',
                assignedProjectIds: []
            });
        }
    };

    const handleSave = () => {
        if (!formState.email || !formState.accessKey || !formState.name) {
            alert("Please fill in Name, Email, and Access Key.");
            return;
        }

        if (editingId === 'new') {
            addInvestor({
                id: `inv-${Date.now()}`,
                name: formState.name,
                email: formState.email,
                accessKey: formState.accessKey,
                assignedProjectIds: formState.assignedProjectIds || []
            });
        } else if (editingId) {
            updateInvestor(editingId, formState);
        }
        
        publish();
        setEditingId(null);
        setFormState({});
    };

    const toggleProject = (projectId: string) => {
        const current = formState.assignedProjectIds || [];
        if (current.includes(projectId)) {
            setFormState(prev => ({ ...prev, assignedProjectIds: current.filter(id => id !== projectId) }));
        } else {
            setFormState(prev => ({ ...prev, assignedProjectIds: [...current, projectId] }));
        }
    };

    const handleDelete = (id: string) => {
        if (window.confirm("Revoke access for this partner?")) {
            removeInvestor(id);
            publish();
        }
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-4xl h-[80vh] flex flex-col shadow-2xl rounded-none animate-[fadeIn_0.3s_ease-out]">
                <div className="flex justify-between items-center p-8 border-b border-gray-200">
                    <div>
                        <h2 className="text-xl font-bold uppercase tracking-tight text-black flex items-center gap-2">
                            <Key size={20} className="text-emerald-600"/> Access Management
                        </h2>
                        <span className="text-xs text-gray-400 uppercase tracking-wide">Investor Keys & Permissions</span>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 transition-colors"><X size={24}/></button>
                </div>

                <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
                    {/* List */}
                    <div className="w-full md:w-1/3 bg-gray-50 border-r border-gray-200 flex flex-col">
                        <div className="p-4 border-b border-gray-200">
                            <button 
                                onClick={() => startEditing()}
                                className="w-full bg-black text-white py-3 text-xs font-bold uppercase tracking-brand flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors rounded-none"
                            >
                                <Plus size={14} /> New Partner
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            {investors.map(inv => (
                                <div 
                                    key={inv.id}
                                    onClick={() => startEditing(inv)}
                                    className={`p-6 border-b border-gray-200 cursor-pointer hover:bg-white transition-colors ${editingId === inv.id ? 'bg-white border-l-4 border-l-black' : ''}`}
                                >
                                    <h3 className="font-bold text-sm text-black">{inv.name}</h3>
                                    <p className="text-xs text-gray-500 mt-1 truncate">{inv.email}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="text-[10px] font-bold uppercase bg-gray-200 px-2 py-0.5 rounded-sm text-gray-600">
                                            {inv.assignedProjectIds.length} Projects
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Edit Form */}
                    <div className="w-full md:w-2/3 p-8 overflow-y-auto bg-white">
                        {editingId ? (
                            <div className="space-y-8">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-brand text-gray-500">Full Name</label>
                                        <input 
                                            className="w-full border p-3 text-sm rounded-none outline-none focus:border-black bg-white text-black" 
                                            value={formState.name || ''}
                                            onChange={e => setFormState({...formState, name: e.target.value})}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-brand text-gray-500">Email (Username)</label>
                                        <input 
                                            className="w-full border p-3 text-sm rounded-none outline-none focus:border-black bg-white text-black" 
                                            value={formState.email || ''}
                                            onChange={e => setFormState({...formState, email: e.target.value})}
                                        />
                                    </div>
                                    <div className="col-span-2 space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-brand text-gray-500">Access Key (Password)</label>
                                        <div className="flex gap-2">
                                            <input 
                                                className="flex-1 border p-3 text-sm rounded-none outline-none focus:border-black bg-white text-black font-mono" 
                                                value={formState.accessKey || ''}
                                                onChange={e => setFormState({...formState, accessKey: e.target.value})}
                                            />
                                            <button 
                                                onClick={() => setFormState({...formState, accessKey: Math.random().toString(36).slice(-8).toUpperCase()})}
                                                className="bg-gray-100 px-4 text-xs font-bold uppercase hover:bg-gray-200"
                                            >
                                                Generate
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xs font-bold uppercase tracking-brand text-black border-b border-gray-100 pb-2 mb-4">Project Permissions</h3>
                                    <div className="grid grid-cols-1 gap-3 max-h-[300px] overflow-y-auto">
                                        {projects.map(p => (
                                            <div 
                                                key={p.id} 
                                                onClick={() => toggleProject(p.id)}
                                                className={`p-4 border cursor-pointer flex items-center justify-between transition-colors ${formState.assignedProjectIds?.includes(p.id) ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}
                                            >
                                                <div>
                                                    <h4 className="text-sm font-bold text-black">{p.title}</h4>
                                                    <span className="text-[10px] uppercase text-gray-400">{p.status}</span>
                                                </div>
                                                <div className={`w-5 h-5 border flex items-center justify-center ${formState.assignedProjectIds?.includes(p.id) ? 'bg-black border-black text-white' : 'border-gray-300'}`}>
                                                    {formState.assignedProjectIds?.includes(p.id) && <Check size={12}/>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-between items-center pt-8 border-t border-gray-100">
                                    {editingId !== 'new' && (
                                        <button onClick={() => handleDelete(editingId)} className="text-red-500 hover:text-red-700 flex items-center gap-2 text-xs font-bold uppercase">
                                            <Trash2 size={14} /> Revoke Access
                                        </button>
                                    )}
                                    <div className="flex gap-4 ml-auto">
                                        <button onClick={() => setEditingId(null)} className="px-6 py-3 border border-gray-300 text-black text-xs font-bold uppercase hover:bg-gray-50 rounded-none">Cancel</button>
                                        <button onClick={handleSave} className="px-6 py-3 bg-black text-white text-xs font-bold uppercase hover:bg-gray-800 flex items-center gap-2 rounded-none">
                                            <Save size={14} /> Save Profile
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-gray-300">
                                <Shield size={64} className="mb-4 opacity-20" />
                                <p className="text-sm font-bold uppercase tracking-brand">Select a partner to manage permissions</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccessManager;