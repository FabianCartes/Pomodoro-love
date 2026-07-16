import React from 'react';
import { useTimer } from '../../context/TimerContext';
import { motion } from 'framer-motion';

import { PawPrint } from 'lucide-react';

export const TimerDisplay = ({ isDark }) => {
  const { mode, elapsedTime, timeRemaining, currentPhase, currentCycle, maxCycles, isActive } = useTimer();

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const displayTime = mode === 'stopwatch' ? Math.floor(elapsedTime / 1000) : timeRemaining;
  const milliseconds = mode === 'stopwatch' ? Math.floor((elapsedTime % 1000) / 10) : 0;

  // The huge text style for Study mode
  if (mode === 'study') {
    return (
      <div className="flex flex-col items-center justify-center my-2">
        <div className="mb-4 text-cat-accent font-semibold tracking-wider uppercase text-sm">
          {currentPhase === 'study' ? 'Tiempo de Estudio' : '¡Recreo!'} • Ciclo {currentCycle}
          {maxCycles !== 'infinity' ? ` / ${maxCycles}` : ' (Infinito)'}
        </div>
        <div className={`font-mono text-[8rem] md:text-[10rem] font-bold tracking-tighter drop-shadow-2xl transition-all ${isDark ? 'text-cat-cream' : 'text-cat-dark'}`} style={{ fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>
          {formatTime(displayTime)}
        </div>
      </div>
    );
  }

  // The beautiful circular style for Cronometro and Temporizador modes
  const outerRingColor = isDark ? 'bg-orange-900/40' : 'bg-[#fff5eb]/90';
  const innerCircleColor = isDark ? 'bg-gray-800' : 'bg-white';
  const textColor = isDark ? 'text-cat-cream' : 'text-[#5a3825]';
  const subtleText = isDark ? 'text-white/50' : 'text-black/40';

  return (
    <div className="flex flex-col items-center justify-center my-6">
      <div className={`relative flex items-center justify-center w-[340px] h-[340px] md:w-[540px] md:h-[540px] rounded-full shadow-2xl ${outerRingColor}`}>
        
        {/* Ring of Paw Prints - Rotates when active */}
        <div className={`absolute inset-0 rounded-full flex items-center justify-center pointer-events-none ${isActive ? 'animate-[spin_15s_linear_infinite]' : ''}`}>
          {Array.from({ length: 12 }).map((_, i) => {
            const rotation = i * 30; // 360 / 12
            return (
              <div 
                key={i} 
                className="absolute w-full h-full flex justify-center pointer-events-none"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                <PawPrint 
                  size={isDark ? 20 : 24} 
                  className={`mt-6 md:mt-8 ${isDark ? 'text-orange-300/30' : 'text-[#fbd2b3]'} fill-current transition-all`} 
                  style={{ transform: `rotate(180deg)` }} // Orient the paw correctly
                />
              </div>
            );
          })}
        </div>

        {/* Inner White Circle */}
        <div className={`relative flex flex-col items-center justify-center w-[76%] h-[76%] rounded-full shadow-inner border border-black/5 ${innerCircleColor}`}>
          <div className={`font-mono text-[4rem] md:text-[7rem] font-extrabold tracking-tighter flex items-baseline ${textColor}`} style={{ fontVariantNumeric: 'tabular-nums' }}>
            {formatTime(displayTime)}
            {mode === 'stopwatch' && <span className="text-3xl md:text-5xl text-orange-400 ml-1 md:ml-2 opacity-80">.{milliseconds.toString().padStart(2, '0')}</span>}
          </div>
          <span className={`mt-2 md:mt-4 text-xl md:text-2xl font-bold ${subtleText} lowercase`} style={{ fontFamily: "'Quicksand', sans-serif" }}>
            {isActive ? 'en progreso...' : 'listo para empezar'}
          </span>
        </div>

      </div>
    </div>
  );
};
