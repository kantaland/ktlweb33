import React, { useState } from 'react';
import { ArrowRight, Lock, AlertCircle } from 'lucide-react';
import { Tab, InvestorProfile } from '../types';
import InvestorDashboard from './InvestorDashboard';
import { useAdmin } from '../contexts/AdminContext';

interface InvestorLoginProps {
    onNavigate: (tab: Tab) => void;
}

const InvestorLogin: React.FC<InvestorLoginProps> = ({ onNavigate }) => {
  const { investors } = useAdmin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [currentInvestor, setCurrentInvestor] = useState<InvestorProfile | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check against dynamic list
    const foundInvestor = investors.find(inv => inv.email.toLowerCase() === email.toLowerCase() && inv.accessKey === password);
    
    if (foundInvestor) {
        setCurrentInvestor(foundInvestor);
        setError('');
    } else {
        setError('Unauthorized Access. Please verify credentials.');
        setCurrentInvestor(null);
    }
  };

  const handleLogout = () => {
      setCurrentInvestor(null);
      setEmail('');
      setPassword('');
  };

  if (currentInvestor) {
      return <InvestorDashboard onLogout={handleLogout} currentInvestor={currentInvestor} />;
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 pt-24">
      <div className="w-full max-w-md">
        <div className="text-center mb-16">
           <span className="text-[10px] font-bold tracking-brand uppercase text-rover-muted mb-4 block border-b border-gray-100 pb-4 w-fit mx-auto">Restricted Access</span>
           <h1 className="text-4xl md:text-5xl font-light text-rover-obsidian tracking-hero uppercase leading-none">
               Investor<br/><span className="text-gray-400">Relations</span>
           </h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-12">
          <div className="space-y-2 group">
             <label className="text-[10px] font-bold tracking-brand uppercase text-gray-400 group-focus-within:text-black transition-colors block">Partner Identity</label>
             <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-b border-gray-200 py-4 text-xl font-light focus:outline-none focus:border-black transition-colors bg-transparent placeholder-gray-100 text-black rounded-none"
                placeholder="name@firm.com"
                autoFocus
             />
          </div>

          <div className="space-y-2 group">
             <label className="text-[10px] font-bold tracking-brand uppercase text-gray-400 group-focus-within:text-black transition-colors block">Security Key</label>
             <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b border-gray-200 py-4 text-xl font-light focus:outline-none focus:border-black transition-colors bg-transparent placeholder-gray-100 text-black rounded-none"
                placeholder="••••••••••••"
             />
          </div>

          {error && (
            <div className="flex items-center gap-3 text-red-600 bg-red-50 p-4 border border-red-100">
                <AlertCircle size={16} />
                <span className="text-[10px] font-bold uppercase tracking-wide">{error}</span>
            </div>
          )}

          <div className="pt-8">
            <button 
                type="submit"
                className="w-full bg-black text-white py-5 flex items-center justify-between px-8 hover:bg-gray-900 transition-all duration-300 group rounded-none"
            >
                <span className="text-xs font-bold tracking-brand uppercase">Secure Login</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <p className="text-center mt-8 text-[10px] text-gray-400 uppercase tracking-wide">
                Authorized Personnel Only. <br/> Access is monitored.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvestorLogin;