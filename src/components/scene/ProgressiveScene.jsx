import React from 'react';
import { useTimer } from '../../context/TimerContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Rocket } from 'lucide-react';
import { ChromaKeyImage } from './ChromaKeyImage';

// Move random generation outside the component so it persists across re-renders
// but also updates correctly when Vite HMR reloads the module.
const SPEED_LINES = Array.from({ length: 20 }).map(() => ({
  left: `${Math.random() * 100}%`,
  top: `-${Math.random() * 100}%`,
  height: `${Math.random() * 50 + 20}px`,
  animationDuration: `${Math.random() * 0.5 + 0.2}s`,
  animationDelay: `${Math.random() * 1}s`,
  opacity: Math.random() * 0.5 + 0.2
}));

const RANDOM_EVENTS = [
  {
    id: 'bird',
    content: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-white/50 drop-shadow-md animate-flap origin-center">
        <path d="M2 12 Q 7 4, 12 12 Q 17 4, 22 12" />
      </svg>
    ),
    top: `${10 + Math.random() * 60}%`,
    animationDuration: `${25 + Math.random() * 10}s`,
    animationDelay: `${10 + Math.random() * 60}s`
  },
  {
    id: 'rocket',
    content: (
      <div className="flex items-center gap-1 opacity-80">
        <div className="w-6 h-3 rounded-full bg-orange-500 blur-sm animate-pulse shadow-[0_0_10px_rgba(255,100,0,0.8)]" />
        <Rocket size={28} className="text-gray-300 rotate-[45deg] drop-shadow-lg" />
      </div>
    ),
    top: `${10 + Math.random() * 60}%`,
    animationDuration: `${12 + Math.random() * 5}s`,
    animationDelay: `${70 + Math.random() * 60}s`
  },
  {
    id: 'ufo',
    content: (
      <div className="relative flex flex-col items-center opacity-90 drop-shadow-[0_0_15px_rgba(74,222,128,0.8)]">
        <span className="text-4xl">🛸</span>
        <div className="absolute top-[70%] w-12 h-32 bg-gradient-to-b from-green-400/60 to-transparent blur-md rounded-t-[100px] pointer-events-none" style={{ clipPath: 'polygon(20% 0, 80% 0, 100% 100%, 0% 100%)' }} />
      </div>
    ),
    top: `${10 + Math.random() * 50}%`,
    animationDuration: `${35 + Math.random() * 10}s`,
    animationDelay: `${130 + Math.random() * 60}s`
  },
  {
    id: 'minicat',
    animationClass: 'animate-fly-across-reverse',
    content: (
      <div className="relative w-24 h-24 flex items-center justify-center opacity-90 drop-shadow-[0_5px_15px_rgba(255,100,0,0.5)]">
        <div className="absolute right-[-10px] top-[50%] -translate-y-1/2 w-4 h-4 bg-yellow-400 rounded-full mix-blend-screen blur-[2px] shadow-[0_0_15px_8px_rgba(255,100,0,0.8)] animate-pulse z-0" />
        <div className="w-full h-full origin-center z-10 -rotate-[30deg]">
          <ChromaKeyImage src="/assets/gato-cohete.png" className="w-full h-full" />
        </div>
      </div>
    ),
    top: `${10 + Math.random() * 60}%`,
    animationDuration: `${15 + Math.random() * 5}s`,
    animationDelay: `${190 + Math.random() * 60}s`
  }
];

const FIRE_PARTICLES = Array.from({ length: 15 }).map(() => ({
  left: `${50 + (Math.random() * 40 - 20)}%`,
  animationDuration: `${0.2 + Math.random() * 0.3}s`,
  animationDelay: `${Math.random() * 0.3}s`
}));

export const ProgressiveScene = ({ isDark }) => {
  const { mode, currentPhase, timeRemaining, studyConfig } = useTimer();

  if (mode !== 'study') {
    return null; // Handled by App.jsx layout
  }

  const totalTime = currentPhase === 'study' ? studyConfig.studyTime : studyConfig.breakTime;
  const progress = totalTime > 0 ? 1 - (timeRemaining / totalTime) : 0; // 0.0 to 1.0

  if (currentPhase === 'break') {
    return (
      <div className={`w-full h-full min-h-[500px] rounded-[3rem] relative backdrop-blur-xl shadow-2xl flex flex-col items-center justify-center border overflow-hidden ${isDark ? 'bg-black/40 border-white/10' : 'bg-white/30 border-white/40'}`}>
        <h2 className="text-2xl font-bold text-white tracking-widest uppercase">¡En Recreo!</h2>
      </div>
    );
  }

  // Study phase: Rocket Cat ascending!
  // Curve Math: Starts bottom-right, curves to top-left.
  // We'll use right and bottom absolute positioning percentages.
  const bottomPos = 5 + (progress * 75); // Starts at 5% from bottom, ends at 80%
  const rightPos = 5 + (Math.pow(progress, 1.5) * 65); // Starts at 5% from right, ends at 70%
  const scale = 0.4 + (progress * 0.8); // Starts small (0.4), gets bigger (1.2)
  const rotation = -30 + (progress * 15); // Slight tilt change

  return (
    <div className={`w-full h-full min-h-[600px] rounded-[3rem] relative backdrop-blur-xl shadow-2xl flex flex-col border overflow-hidden transition-colors duration-500 ${isDark ? 'bg-black/30 border-white/10' : 'bg-white/30 border-white/40'}`}>

      {/* Top Space Shadow (Borde del Espacio) */}
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-black/80 via-black/30 to-transparent z-0 pointer-events-none" />

      {/* Surface Floor (Superficie) */}
      <div className={`absolute bottom-0 left-0 w-full h-32 rounded-b-[3rem] z-0 ${isDark ? 'bg-cat-brown' : 'bg-[#e5a07c]'} shadow-[inset_0_10px_20px_rgba(0,0,0,0.2)]`}>
        <div className="w-full h-2 bg-black/10 absolute top-0" />
        {/* Surface Details (Craters/Stones) */}
        <div className="absolute top-4 left-10 w-8 h-3 rounded-full bg-black/10" />
        <div className="absolute top-10 right-20 w-12 h-4 rounded-full bg-black/10" />
        <div className="absolute top-6 left-1/3 w-5 h-2 rounded-full bg-black/10" />
        <div className="absolute top-16 left-1/4 w-16 h-5 rounded-full bg-black/10" />
      </div>

      {/* Speed Lines and Random Flying Events */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-50">
        {/* Standard Speed lines */}
        {SPEED_LINES.map((style, i) => (
          <div
            key={`line-${i}`}
            className="absolute w-[2px] bg-white rounded-full animate-fast-fall"
            style={style}
          />
        ))}
        {/* Random passing objects (Birds, mini rockets) */}
        {RANDOM_EVENTS.map((evt) => (
          <div
            key={`event-${evt.id}`}
            className={`absolute pointer-events-none ${evt.animationClass || 'animate-fly-across'}`}
            style={{
              left: 0,
              top: evt.top,
              animationDuration: evt.animationDuration,
              animationDelay: evt.animationDelay
            }}
          >
            {evt.content}
          </div>
        ))}
      </div>

      <div className="absolute top-8 w-full flex justify-center z-20">
        <div className={`flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-md shadow-lg font-bold text-lg tracking-wide ${isDark ? 'bg-white/10 text-cat-cream border border-white/10' : 'bg-white/60 text-cat-dark border border-white/40'}`}>
          <Sun size={24} className="text-orange-400" />
          <span>Ascendiendo al Espacio</span>
        </div>
      </div>

      {/* Declarative Smoke Trail */}
      {Array.from({ length: 30 }).map((_, i) => {
        const puffP = i / 30; // 0 to 0.96
        if (progress < puffP) return null; // Not reached yet

        // Math for where this puff was dropped
        const pBottom = 5 + (puffP * 75);
        const pRight = 5 + (Math.pow(puffP, 1.5) * 65);

        // Age of the puff determines its fade and expansion
        const age = progress - puffP;
        const opacity = Math.max(0, 0.4 - (age * 1.5)); // Fades out
        const puffScale = 0.5 + (age * 3); // Expands as it dissipates

        return (
          <div
            key={i}
            className="absolute w-12 h-12 rounded-full bg-white blur-md pointer-events-none"
            style={{
              bottom: `calc(${pBottom}% + 40px)`, // offset to align with bottom of cat roughly
              right: `calc(${pRight}% + 40px)`,
              transform: `scale(${puffScale})`,
              opacity: opacity,
              transition: 'opacity 0.2s linear, transform 0.2s linear'
            }}
          />
        );
      })}

      {/* Animated Rocket Cat Container */}
      <div
        className="absolute w-40 h-40 md:w-56 md:h-56 flex items-center justify-center z-10"
        style={{
          bottom: `${bottomPos}%`,
          right: `${rightPos}%`,
          transform: `scale(${scale}) rotate(${rotation}deg)`,
          transition: 'bottom 1s linear, right 1s linear, transform 1s linear'
        }}
      >
        <motion.div
          animate={{
            y: [0, -3, 3, 0],
            x: [0, 2, -2, 0]
          }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear'
          }}
          className="relative w-full h-full drop-shadow-[0_15px_40px_rgba(255,100,0,0.8)]"
        >
          {/* Fire particles emitting from the bottom of the cat */}
          <div className="absolute bottom-[10%] left-[30%] right-[30%] h-12 flex justify-center overflow-visible pointer-events-none z-0">
            {FIRE_PARTICLES.map((style, i) => (
              <div
                key={`fire-${i}`}
                className="absolute w-3 h-3 bg-yellow-400 rounded-full mix-blend-screen"
                style={{
                  top: '0px',
                  boxShadow: '0 0 10px 5px rgba(255,100,0,0.8)',
                  animation: `fast-fall ${style.animationDuration} linear infinite`,
                  animationDelay: style.animationDelay,
                  left: style.left
                }}
              />
            ))}
          </div>

          <div className="relative w-full h-full z-10 rotate-[35deg] origin-center -translate-x-4">
            <ChromaKeyImage src="/assets/gato-cohete.png" className="w-full h-full scale-110" />
          </div>
        </motion.div>
      </div>

      {/* Percentage Text overlayed */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20">
        <div className={`text-6xl md:text-8xl font-black font-mono drop-shadow-[0_4px_10px_rgba(0,0,0,0.3)] ${isDark ? 'text-white/20' : 'text-cat-dark/10'} tracking-tighter`}>
          {Math.round(progress * 100)}%
        </div>
      </div>

    </div>
  );
};
