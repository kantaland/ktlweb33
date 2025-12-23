import React, { useEffect, useRef, useState } from 'react';

const LabCursor: React.FC = () => {
  // Refs for direct DOM manipulation (bypasses React render cycle for performance)
  const outerCursor = useRef<HTMLDivElement>(null);
  const innerCursor = useRef<HTMLDivElement>(null);
  
  // Physics state stored in refs to persist without triggering re-renders
  const mousePos = useRef({ x: 0, y: 0 });
  const outerPos = useRef({ x: 0, y: 0 });
  const innerPos = useRef({ x: 0, y: 0 });
  
  // Visual state (still needs React state for class toggling)
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 1. Event Listeners
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
      
      const target = e.target as HTMLElement;
      // Check if hovering over clickable elements
      const isClickable = 
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'input' ||
        target.tagName.toLowerCase() === 'textarea' ||
        target.tagName.toLowerCase() === 'select' ||
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('cursor-pointer') ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsPointer(!!isClickable);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);

    // 2. Animation Loop (The secret to smoothness)
    let rafId: number;
    
    const animate = () => {
      // LERP (Linear Interpolation) for smooth trailing effect
      // Formula: current = current + (target - current) * speed
      
      // Outer Ring: Slower speed (0.15) for a "heavy" high-tech feel
      outerPos.current.x += (mousePos.current.x - outerPos.current.x) * 0.15;
      outerPos.current.y += (mousePos.current.y - outerPos.current.y) * 0.15;
      
      // Inner Dot: Fast speed (0.9) for immediate responsiveness
      innerPos.current.x += (mousePos.current.x - innerPos.current.x) * 0.9;
      innerPos.current.y += (mousePos.current.y - innerPos.current.y) * 0.9;

      // Apply transforms directly to DOM elements
      if (outerCursor.current) {
        // Use translate3d for GPU acceleration
        outerCursor.current.style.transform = `translate3d(${outerPos.current.x}px, ${outerPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (innerCursor.current) {
        innerCursor.current.style.transform = `translate3d(${innerPos.current.x}px, ${innerPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    // Start loop
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner Dot - Snappy */}
      <div 
        ref={innerCursor}
        className={`fixed top-0 left-0 pointer-events-none z-[10000] mix-blend-difference bg-white rounded-full transition-[width,height] duration-200 ease-out will-change-transform ${isClicking ? 'w-1 h-1' : 'w-1.5 h-1.5'}`}
      />

      {/* Outer Ring & Crosshairs - Smooth Trail */}
      <div 
        ref={outerCursor}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference will-change-transform flex items-center justify-center`}
      >
        <div 
            className={`
                rounded-full border border-white transition-all duration-300 ease-out
                ${isPointer ? 'w-12 h-12 opacity-100 border-2' : 'w-8 h-8 opacity-40'}
                ${isClicking ? 'scale-75' : 'scale-100'}
            `}
        />
        
        {/* Horizontal Crosshair */}
        <div className={`absolute w-full h-[1px] bg-white transition-all duration-300 ${isPointer ? 'w-16 opacity-50' : 'w-0 opacity-0'}`} />
        
        {/* Vertical Crosshair */}
        <div className={`absolute h-full w-[1px] bg-white transition-all duration-300 ${isPointer ? 'h-16 opacity-50' : 'h-0 opacity-0'}`} />

        {/* Tech Label - Positioned relative to the ring */}
        <div className="absolute top-4 left-6 text-[9px] font-mono text-white opacity-60 tracking-widest whitespace-nowrap hidden md:block">
            TG_LOCK
        </div>
      </div>
    </>
  );
};

export default LabCursor;