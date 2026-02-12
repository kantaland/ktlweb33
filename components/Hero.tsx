import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, Star, TrendingUp, Zap, Globe, Music, Activity } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

interface Notification {
  id: number;
  text: string;
  type: 'playlist' | 'money' | 'chart';
  position: { top?: string; bottom?: string; left?: string; right?: string };
}

const LiveSimulation: React.FC = () => {
  // Start with a high, realistic "mid-campaign" number
  const [listeners, setListeners] = useState(850096);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const notifIdRef = useRef(0);

  // The Dopamine Loop: Slow, Realistic Analytics Ticking
  useEffect(() => {
    // Update every 2.5 seconds to feel like real server polling
    const interval = setInterval(() => {
      setListeners(prev => {
        // 90% chance of small organic trickle (0-3 users)
        // 10% chance of a "batch" update (12-45 users)
        const isBurst = Math.random() > 0.9;
        const growth = isBurst 
          ? Math.floor(Math.random() * 30) + 15 
          : Math.floor(Math.random() * 3);
          
        return prev + growth;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // The Reward System: Random "Success" Popups
  useEffect(() => {
    const events = [
        { text: "Added to Rap Caviar", type: 'playlist' as const },
        { text: "Viral 50: USA", type: 'chart' as const },
        { text: "New Peak: #12 Global", type: 'chart' as const },
        { text: "Royalty Payout: $4,200", type: 'money' as const },
        { text: "Label Inquiry", type: 'playlist' as const },
        { text: "10k Real-time Users", type: 'chart' as const },
        { text: "New Music Friday", type: 'playlist' as const },
        { text: "Algorithm Spike", type: 'money' as const },
    ];

    // REFINED SAFE SLOTS
    // Pushed further away from Top Center and Bottom Center to absolutely prevent overlap
    const slots = [
        { top: '120px', left: '24px' },     // Lowered significantly to clear the Top Badge
        { top: '120px', right: '24px' },    // Lowered significantly to clear the Top Badge
        { bottom: '180px', left: '24px' },  // Raised significantly to clear the Bottom Stats
        { bottom: '180px', right: '24px' }  // Raised significantly to clear the Bottom Stats
    ];

    const schedule = [1500, 4500, 8500, 14000, 22000];
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    
    let slotIndex = 0;

    schedule.forEach((time, index) => {
        const timeout = setTimeout(() => {
            const randomEvent = events[Math.floor(Math.random() * events.length)];
            const slot = slots[slotIndex % slots.length];
            slotIndex++;

            const newNotif: Notification = { 
                id: notifIdRef.current++, 
                text: randomEvent.text, 
                type: randomEvent.type,
                position: slot
            };
            
            // Strictly limit to 2 notifications on screen to keep it clean
            setNotifications(prev => [...prev.slice(-1), newNotif]); 
        }, time);
        timeouts.push(timeout);
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative w-full h-[800px] md:h-full min-h-[750px] bg-[#050505] rounded-[3rem] overflow-hidden border border-[#282828] shadow-2xl flex flex-col items-center justify-between group select-none py-16">
        {/* CRT Scanline Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[5] bg-[size:100%_2px,3px_100%] pointer-events-none opacity-20"></div>

        {/* Dynamic Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(29,185,84,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(29,185,84,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] z-0"></div>
        
        {/* Center Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] animate-pulse z-0"></div>

        {/* Floating Notifications - Z-20 */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
            {notifications.map((notif) => (
                <div 
                    key={notif.id}
                    className="absolute bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex items-center gap-4 shadow-2xl animate-slide-in max-w-[240px]"
                    style={{
                        ...notif.position,
                        opacity: 0,
                        animationDelay: '0ms',
                        animationFillMode: 'forwards',
                        transform: 'scale(0.9)'
                    }}
                >
                    <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center shadow-lg ${
                        notif.type === 'playlist' ? 'bg-primary text-black' : 
                        notif.type === 'money' ? 'bg-white text-black' : 'bg-[#282828] text-white'
                    }`}>
                        {notif.type === 'playlist' && <Music size={20} fill="currentColor" />}
                        {notif.type === 'money' && <Zap size={20} fill="currentColor" />}
                        {notif.type === 'chart' && <Globe size={20} />}
                    </div>
                    <div className="min-w-0">
                        <div className="text-white font-bold text-sm tracking-wide truncate">{notif.text}</div>
                        <div className="text-[#666] text-[10px] font-mono uppercase tracking-widest mt-1 font-bold">Live Alert</div>
                    </div>
                </div>
            ))}
        </div>

        {/* Top Indicator - Z-40 */}
        {/* Added margin-top to ensure it never touches top border */}
        <div className="relative z-40 flex-none flex items-center gap-3 animate-fade-in px-6 py-3 rounded-full bg-[#111] border border-white/10 shadow-2xl mt-4">
            <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-white font-mono text-xs tracking-[0.2em] uppercase font-black">
                Live Traction
            </span>
        </div>

        {/* Middle Section: The Data - Z-40 */}
        <div className="relative z-40 flex-1 flex flex-col items-center justify-center w-full my-8">
            
            {/* The BIG Number */}
            <div className="relative mb-12 text-center w-full px-4">
                <div className="text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter tabular-nums drop-shadow-[0_10px_20px_rgba(0,0,0,1)] leading-none select-none">
                    {listeners.toLocaleString()}
                </div>
                {/* Static Glitch Layer (Visual Only) */}
                <div className="absolute inset-0 text-7xl md:text-8xl lg:text-9xl font-black text-primary/10 tracking-tighter tabular-nums leading-none blur-[1px] translate-x-0.5 translate-y-0.5 -z-10 pointer-events-none">
                    {listeners.toLocaleString()}
                </div>
            </div>
            
            {/* Monthly Listeners Label */}
            <div className="flex flex-col items-center gap-8 w-full px-8 relative z-40">
                <div className="text-primary font-black text-xl md:text-2xl uppercase tracking-[0.2em] flex items-center gap-3 drop-shadow-md bg-black/80 backdrop-blur-md px-8 py-3 rounded-2xl border border-white/10 shadow-xl">
                    <Activity size={24} strokeWidth={3} /> Monthly Listeners
                </div>
                
                {/* Technical Velocity Bar */}
                <div className="flex items-center gap-4 w-full max-w-lg bg-black/60 p-3 rounded-full border border-white/5 backdrop-blur-sm">
                    <span className="text-xs font-mono text-[#777] font-bold w-8 text-right">0</span>
                    <div className="flex-1 h-3 bg-[#111] rounded-full overflow-hidden border border-white/5 relative">
                        <div 
                            className="h-full bg-gradient-to-r from-primary via-white to-primary animate-pulse-slow shadow-[0_0_15px_#1DB954]"
                            style={{ width: '42%' }}
                        ></div>
                    </div>
                    <span className="text-xs font-mono text-[#777] font-bold w-8">10M</span>
                </div>
            </div>
        </div>

        {/* Bottom Stats - Z-40 */}
        {/* Added explicit bottom padding/margin container to anchor it away from notifications */}
        <div className="relative z-40 flex-none grid grid-cols-3 gap-8 md:gap-16 w-full px-8 pt-10 border-t border-white/10 bg-gradient-to-t from-black via-black/90 to-transparent pb-4">
            <div className="text-center">
                <div className="text-white font-black text-xl md:text-3xl mb-1">98%</div>
                <div className="text-[#555] text-[10px] font-bold uppercase tracking-[0.2em]">Real Users</div>
            </div>
            <div className="text-center border-l border-r border-white/10">
                <div className="text-primary font-black text-xl md:text-3xl mb-1 drop-shadow-[0_0_15px_rgba(29,185,84,0.4)]">Viral</div>
                <div className="text-[#555] text-[10px] font-bold uppercase tracking-[0.2em]">Status</div>
            </div>
            <div className="text-center">
                <div className="text-white font-black text-xl md:text-3xl mb-1">Global</div>
                <div className="text-[#555] text-[10px] font-bold uppercase tracking-[0.2em]">Reach</div>
            </div>
        </div>

      <style>{`
        @keyframes slide-in {
            0% { transform: scale(0.9); opacity: 0; filter: blur(4px); }
            100% { transform: scale(1); opacity: 1; filter: blur(0); }
        }
        .animate-slide-in {
            animation: slide-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="relative p-4 md:p-8 mb-8 flex flex-col xl:flex-row items-center gap-16">
      {/* Left Content */}
      <div className="flex-1 z-10 w-full max-w-2xl pt-8 xl:pt-0">
        <div className="inline-flex items-center gap-2 bg-[#121212] px-4 py-2 rounded-full text-[10px] font-bold text-primary mb-8 border border-white/10 uppercase tracking-wider shadow-lg shadow-primary/5">
          <Star size={12} fill="currentColor" />
          <span>#1 Music Marketing Agency</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[0.85] tracking-tighter">
          BLOW UP <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary bg-[length:200%_auto] animate-gradient">
            YOUR CAREER.
          </span>
        </h1>
        
        <p className="text-[#b3b3b3] text-lg md:text-xl mb-12 max-w-lg leading-relaxed font-medium">
          The industry standard for independent artist rollouts. Proprietary algorithmic triggering guaranteed to create real fans.
        </p>
        
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={onStart}
            className="bg-primary text-black px-12 py-6 rounded-full font-black text-lg hover:scale-105 hover:bg-[#1ed760] transition-all flex items-center gap-3 shadow-[0_0_40px_rgba(29,185,84,0.3)]"
          >
            START CAMPAIGN <ArrowRight size={20} strokeWidth={3} />
          </button>
          <button 
            onClick={() => window.open('https://www.kantaland.com/', '_blank')}
            className="px-10 py-6 rounded-full font-bold text-lg text-white border border-[#333] hover:border-white hover:bg-white/5 transition-all"
          >
            Full Website
          </button>
        </div>
      </div>
      
      {/* Right Content - Visual Simulation */}
      <div className="flex-1 w-full h-full min-h-[750px] relative">
         <LiveSimulation />
      </div>
    </div>
  );
};

export default Hero;
