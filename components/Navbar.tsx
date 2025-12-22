
import React, { useState, useEffect } from 'react';
import { Tab } from '../types';
import { Menu, Search, User, X } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

interface NavbarProps {
  currentTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentTab, onTabChange }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAdmin();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const navItems = [
    { id: Tab.INCUBATOR, label: 'THE INCUBATOR' },
    { id: Tab.PRESS, label: 'PRESS & NEWS' },
    { id: Tab.HOLLYWOOD, label: 'HOLLYWOOD' },
    { id: Tab.M3, label: 'M3' },
    { id: Tab.ARCHITECT, label: 'ARCHITECT' },
  ];

  const textColorClass = isScrolled || isMobileMenuOpen ? 'text-black' : 'text-white';
  
  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-luxury ${
          isScrolled || isMobileMenuOpen
            ? 'bg-white/95 border-b border-rover-border backdrop-blur-md shadow-sm h-20 md:h-24' 
            : 'bg-gradient-to-b from-black/60 to-transparent h-24 md:h-32'
        }`}
      >
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 h-full flex items-center justify-between">
          
          <div className="flex items-center gap-16">
            <button 
              onClick={() => {
                  onTabChange(Tab.HOME);
                  setIsMobileMenuOpen(false);
              }}
              className={`z-50 font-bold tracking-[0.25em] text-xs md:text-sm uppercase hover:opacity-70 transition-colors ${textColorClass}`}
            >
              KANTALAND
            </button>

            <div className="hidden lg:flex items-center gap-10">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`
                    text-[11px] font-bold tracking-brand uppercase nav-link transition-colors duration-500
                    ${currentTab === item.id ? 'text-black opacity-100' : textColorClass}
                    ${isScrolled ? 'hover:text-black' : 'hover:text-white'}
                    opacity-80 hover:opacity-100
                  `}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className={`flex items-center gap-6 md:gap-8 ${textColorClass} z-50`}>
             <button onClick={() => onTabChange(Tab.CONTACT)} className="hidden md:flex items-center gap-2 text-[10px] font-bold tracking-brand uppercase group">
                <span className="group-hover:opacity-60 transition-opacity">Contact</span>
             </button>
             
             {isAuthenticated && (
                 <button onClick={logout} className="text-[10px] font-bold uppercase tracking-brand text-red-500">
                     Logout
                 </button>
             )}

             <div className={`h-4 w-[1px] hidden md:block transition-colors duration-500 ${isScrolled ? 'bg-black/10' : 'bg-white/30'}`}></div>

             <button className="hover:opacity-60 transition-opacity">
                <Search size={20} strokeWidth={1} />
             </button>
             
             <button 
                className="hover:opacity-60 transition-opacity hidden md:block"
                onClick={() => onTabChange(Tab.ADMIN)}
            >
                <User size={20} strokeWidth={1} className={isAuthenticated ? "fill-black" : ""} />
             </button>

             <button 
                className="hover:opacity-60 transition-opacity"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
             >
                {isMobileMenuOpen ? <X size={24} strokeWidth={1} /> : <Menu size={24} strokeWidth={1} />}
             </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-white z-40 transition-all duration-700 ease-luxury pt-24 px-6 md:px-12 flex flex-col ${
          isMobileMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-8 invisible'
        }`}
      >
         <div className="flex-1 overflow-y-auto w-full max-w-[1600px] mx-auto border-t border-rover-border pt-8 md:pt-16 pb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full">
                <div className="flex flex-col gap-8">
                    <span className="text-[10px] font-bold uppercase tracking-brand text-rover-muted mb-2 md:mb-4 border-l-2 border-black pl-4">Divisions</span>
                    {navItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          onTabChange(item.id);
                          setIsMobileMenuOpen(false);
                        }}
                        className="text-3xl md:text-5xl font-light text-left tracking-tight text-black hover:pl-8 transition-all duration-700 border-b border-gray-100 pb-8 hover:border-black uppercase"
                      >
                        {item.label}
                      </button>
                    ))}
                    <button
                        onClick={() => {
                          onTabChange(Tab.CONTACT);
                          setIsMobileMenuOpen(false);
                        }}
                        className="text-3xl md:text-5xl font-light text-left tracking-tight text-black hover:pl-8 transition-all duration-700 border-b border-gray-100 pb-8 hover:border-black md:hidden uppercase"
                      >
                        CONTACT
                    </button>
                    <button
                        onClick={() => {
                          onTabChange(Tab.ADMIN);
                          setIsMobileMenuOpen(false);
                        }}
                        className="text-xs font-bold uppercase tracking-brand text-gray-400 mt-4 md:hidden text-left"
                    >
                        Admin Access
                    </button>
                </div>
            </div>
         </div>
      </div>
    </>
  );
};

export default Navbar;
