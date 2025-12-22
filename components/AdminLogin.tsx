
import React, { useState } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { Tab } from '../types';
import { Lock, ArrowRight, AlertCircle } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const { login } = useAdmin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      onLoginSuccess();
    } else {
      setError('Access Denied. Invalid credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
           <span className="text-[10px] font-bold tracking-brand uppercase text-rover-muted mb-4 block">System Access</span>
           <h1 className="text-3xl font-light text-rover-obsidian tracking-hero">KANTALAND ADMIN</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-1">
             <label className="text-[10px] font-bold tracking-brand uppercase text-rover-obsidian block">Identity</label>
             <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-b border-rover-border py-3 text-lg font-light focus:outline-none focus:border-black transition-colors bg-transparent placeholder-gray-200"
                placeholder="Enter email"
             />
          </div>

          <div className="space-y-1">
             <label className="text-[10px] font-bold tracking-brand uppercase text-rover-obsidian block">Key</label>
             <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b border-rover-border py-3 text-lg font-light focus:outline-none focus:border-black transition-colors bg-transparent placeholder-gray-200"
                placeholder="Enter password"
             />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 animate-pulse">
                <AlertCircle size={14} />
                <span className="text-xs font-medium uppercase tracking-wide">{error}</span>
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-rover-obsidian text-white py-4 mt-8 flex items-center justify-center gap-3 hover:bg-gray-800 transition-all duration-300 group"
          >
            <span className="text-xs font-bold tracking-brand uppercase">Authenticate</span>
            <Lock size={14} className="group-hover:hidden" />
            <ArrowRight size={14} className="hidden group-hover:block" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;