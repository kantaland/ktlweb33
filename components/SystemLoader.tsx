
import React, { useEffect, useState } from 'react';

const BOOT_LOGS = [
    "INITIALIZING KANTALAND KERNEL...",
    "LOADING NEURAL NETWORKS...",
    "CONNECTING TO GLOBAL NODES [TOKYO, LA, LDN]...",
    "VERIFYING SECURITY TOKENS...",
    "OPTIMIZING ASSETS...",
    "SYSTEM READY."
];

interface SystemLoaderProps {
    onComplete: () => void;
}

const SystemLoader: React.FC<SystemLoaderProps> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let logIndex = 0;
    
    // Log Interval
    const logInterval = setInterval(() => {
      if (logIndex < BOOT_LOGS.length) {
        setLogs(prev => [...prev, BOOT_LOGS[logIndex]]);
        logIndex++;
      }
    }, 400);

    // Progress Interval
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
            clearInterval(progressInterval);
            clearInterval(logInterval);
            setTimeout(onComplete, 800);
            return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => {
        clearInterval(logInterval);
        clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-[10000] flex flex-col items-center justify-center font-mono text-white p-8 cursor-wait">
        <div className="w-full max-w-md space-y-8">
            {/* Terminal Output */}
            <div className="h-32 flex flex-col justify-end items-start border-l-2 border-green-500 pl-4 bg-white/5 p-4 rounded-sm">
                {logs.map((log, i) => (
                    <div key={i} className="text-[10px] md:text-xs text-green-400 tracking-wider">
                        <span className="opacity-50 mr-2">[{new Date().toLocaleTimeString()}]</span>
                        {log}
                    </div>
                ))}
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold tracking-widest uppercase text-white/60">
                    <span>System Boot</span>
                    <span>{progress}%</span>
                </div>
                <div className="w-full h-1 bg-white/20">
                    <div 
                        className="h-full bg-white transition-all duration-75 ease-out" 
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Brand */}
            <div className="text-center pt-8 opacity-40 animate-pulse">
                <span className="text-[10px] tracking-[0.5em] font-bold uppercase">KANTALAND OS v2.5</span>
            </div>
        </div>
    </div>
  );
};

export default SystemLoader;
