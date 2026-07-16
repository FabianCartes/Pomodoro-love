import React from 'react';
import { useTimer } from '../../context/TimerContext';
import { motion, AnimatePresence } from 'framer-motion';

export const BackgroundManager = ({ isDark }) => {
  const { mode, currentPhase } = useTimer();

  // Define dynamic color palettes based on mode and theme
  let colors = {
    bg: isDark ? 'bg-[#1e1e2f]' : 'bg-[#fff9f5]',
    orb1: isDark ? 'bg-indigo-400/20' : 'bg-cat-pink/60',
    orb2: isDark ? 'bg-purple-400/25' : 'bg-cat-peach/50',
    orb3: isDark ? 'bg-pink-400/20' : 'bg-yellow-200/50'
  };

  if (mode === 'study') {
    if (currentPhase === 'study') {
      // Intense, focused colors (Warm)
      colors = {
        bg: isDark ? 'bg-[#2a1c24]' : 'bg-[#fff5f0]',
        orb1: isDark ? 'bg-rose-400/25' : 'bg-orange-300/50',
        orb2: isDark ? 'bg-orange-400/20' : 'bg-rose-300/50',
        orb3: isDark ? 'bg-fuchsia-400/20' : 'bg-yellow-300/40'
      };
    } else if (currentPhase === 'break') {
      // Calm, relaxing colors (Cool)
      colors = {
        bg: isDark ? 'bg-[#182428]' : 'bg-[#f0fdf4]',
        orb1: isDark ? 'bg-teal-300/20' : 'bg-green-200/60',
        orb2: isDark ? 'bg-cyan-300/20' : 'bg-teal-100/60',
        orb3: isDark ? 'bg-emerald-300/20' : 'bg-blue-200/50'
      };
    }
  }

  const blendMode = isDark ? 'mix-blend-screen' : 'mix-blend-multiply';

  return (
    <div className={`fixed inset-0 w-full h-full -z-50 pointer-events-none transition-colors duration-1000 overflow-hidden ${colors.bg}`}>
      
      {/* Animated Mesh Gradient Orbs */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -100, 50, 0],
          scale: [1, 1.2, 0.9, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full filter blur-[100px] opacity-70 transition-colors duration-1000 ${blendMode} ${colors.orb1}`}
      />
      
      <motion.div
        animate={{
          x: [0, -100, 50, 0],
          y: [0, 100, -50, 0],
          scale: [1, 0.9, 1.2, 1]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className={`absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] rounded-full filter blur-[120px] opacity-70 transition-colors duration-1000 ${blendMode} ${colors.orb2}`}
      />
      
      <motion.div
        animate={{
          x: [0, 50, -100, 0],
          y: [0, 50, 100, 0],
          scale: [1, 1.3, 0.8, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className={`absolute top-[20%] left-[30%] w-[50vw] h-[50vw] rounded-full filter blur-[90px] opacity-60 transition-colors duration-1000 ${blendMode} ${colors.orb3}`}
      />
      
      {/* Premium Dot Grid Pattern */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${isDark ? 'opacity-[0.03] invert' : 'opacity-[0.05]'}`}
        style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMSkiLz48L3N2Zz4=')" }}
      />
    </div>
  );
};
