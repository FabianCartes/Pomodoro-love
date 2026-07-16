import React from 'react';
import { useTimer } from '../../context/TimerContext';
import { motion, AnimatePresence } from 'framer-motion';
import { UniverseBackground } from './UniverseBackground';
import { ChromaKeyVideo } from './ChromaKeyVideo';

export const CinematicBreak = () => {
  const { mode, currentPhase, timeRemaining } = useTimer();

  // Only show this cinematic break if we are actually in study mode and in the break phase.
  const isCinematicBreakActive = mode === 'study' && currentPhase === 'break';

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <AnimatePresence>
      {isCinematicBreakActive && (
        <motion.div
          key="cinematic-break"
          className="fixed inset-0 z-50 overflow-hidden flex flex-col items-center justify-center bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          {/* 3D Universe Background */}
          <UniverseBackground />
          
          {/* Content Container positioned above the Universe */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
            
            {/* Giant Timer at the top */}
            <motion.div 
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute top-16 flex flex-col items-center"
            >
              <h2 className="text-white/60 tracking-[0.3em] uppercase text-xl font-bold mb-4 drop-shadow-md">
                Tiempo de Recreo Espacial
              </h2>
              <div 
                className="font-mono text-[10rem] md:text-[14rem] font-black text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                style={{ fontVariantNumeric: 'tabular-nums', lineHeight: 0.8 }}
              >
                {formatTime(timeRemaining)}
              </div>
            </motion.div>

            {/* The Chroma Keyed Cat Video exactly in the middle */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 2, duration: 2 }}
              className="mt-48 w-[400px] md:w-[600px] aspect-video drop-shadow-[0_0_50px_rgba(255,255,255,0.2)]"
            >
              <ChromaKeyVideo 
                src="/assets/cat-green.mp4" 
                className="w-full h-full"
              />
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
