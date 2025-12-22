
import React, { useEffect, useState } from 'react';

const LabCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'input' ||
        target.tagName.toLowerCase() === 'textarea' ||
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('cursor-pointer');
      
      setIsPointer(!!isClickable);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      {/* Outer Reticle */}
      <div 
        className={`
            absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-white transition-all duration-300 ease-out
            ${isPointer ? 'w-12 h-12 opacity-100 border-2' : 'w-8 h-8 opacity-50'}
            ${isClicking ? 'scale-75' : 'scale-100'}
        `}
      />
      
      {/* Center Dot */}
      <div 
        className={`
            absolute -translate-x-1/2 -translate-y-1/2 bg-white rounded-full transition-all duration-200
            ${isPointer ? 'w-1 h-1' : 'w-1.5 h-1.5'}
            ${isClicking ? 'w-2 h-2' : ''}
        `}
      />

      {/* Crosshair Lines (Only visible in pointer mode) */}
      <div className={`absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-16 h-[1px] bg-white transition-all duration-300 ${isPointer ? 'scale-x-100 opacity-50' : 'scale-x-0 opacity-0'}`} />
      <div className={`absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[1px] h-16 bg-white transition-all duration-300 ${isPointer ? 'scale-y-100 opacity-50' : 'scale-y-0 opacity-0'}`} />
      
      {/* Coordinates Label */}
      <div className="absolute top-4 left-4 text-[9px] font-mono text-white opacity-60 tracking-widest whitespace-nowrap hidden md:block">
          X:{Math.round(position.x).toString().padStart(4, '0')} Y:{Math.round(position.y).toString().padStart(4, '0')}
      </div>
    </div>
  );
};

export default LabCursor;
