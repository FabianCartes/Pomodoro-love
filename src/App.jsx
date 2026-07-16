import React, { useState } from 'react';
import { TimerProvider, useTimer } from './context/TimerContext';
import { NavBar } from './components/ui/NavBar';
import { TimerDisplay } from './components/timer/TimerDisplay';
import { Controls } from './components/timer/Controls';
import { ConfigPanel } from './components/timer/ConfigPanel';
import { ProgressiveScene } from './components/scene/ProgressiveScene';
import { BackgroundManager } from './components/scene/BackgroundManager';
import { CinematicBreak } from './components/scene/CinematicBreak';
import { SplashScreen } from './components/ui/SplashScreen';
import { CatThemeToggle } from './components/ui/CatThemeToggle';
import { PawPrint } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Separate content component to use TimerContext
const AppContent = ({ isDark, setIsDark }) => {
  const { mode, isTransitioning, transitionMessage } = useTimer();

  return (
    <>
      {/* Background is now managed by BackgroundManager */}
      <BackgroundManager isDark={isDark} />
      
      {/* Cinematic Full Screen Break Overlay */}
      <CinematicBreak />

      {/* Cinematic Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md"
          >
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cat-peach to-cat-pink text-center drop-shadow-[0_0_15px_rgba(255,176,133,0.8)]"
            >
              {transitionMessage}
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main App Container */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`min-h-[100dvh] overflow-x-hidden overflow-y-auto flex flex-col font-sans transition-colors duration-500 selection:bg-cat-pink ${isDark ? 'text-cat-cream' : 'text-cat-dark'}`}
      >
        {/* Header row */}
        <header className="w-full grid grid-cols-[auto_1fr_auto] items-center px-4 md:px-8 py-2 md:py-3 shrink-0 gap-2 md:gap-4 z-20">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl backdrop-blur-md shadow-lg ${isDark ? 'bg-black/30 border border-white/10' : 'bg-white/40 border border-white/40'}`}>
            <PawPrint size={28} className={isDark ? 'text-cat-purple' : 'text-cat-accent'} />
            <h1 className="text-xl font-bold font-sans tracking-tight hidden lg:block whitespace-nowrap drop-shadow-md">
              Pomodoro Love
            </h1>
          </div>

          <div className="flex justify-center w-full min-w-0">
            <NavBar isDark={isDark} />
          </div>
          
          <div className={`flex justify-end items-center px-2 py-1 rounded-2xl backdrop-blur-md shadow-lg ${isDark ? 'bg-black/30 border border-white/10' : 'bg-white/40 border border-white/40'}`}>
            <CatThemeToggle onToggle={setIsDark} />
          </div>
        </header>
        
        {/* Main content - Dynamic Split Layout */}
        <main className={`flex-1 w-full mx-auto px-4 md:px-12 flex flex-col md:flex-row gap-4 pb-2 z-10 relative mt-0 ${mode === 'study' ? 'max-w-[1600px]' : 'max-w-4xl justify-center items-center'}`}>
          
          {/* Left Column: UI Controls (Centers when not in study mode) */}
          <motion.div 
            layout
            className={`flex flex-col gap-2 w-full shrink-0 justify-center transition-all duration-500 ${mode === 'study' ? 'md:w-1/2' : 'md:w-full items-center mt-12 md:mt-0'}`}
          >
            {/* Timer Display */}
            <motion.div layout className={`px-4 py-4 rounded-[3rem] backdrop-blur-xl shadow-2xl flex flex-col items-center w-full ${isDark ? 'bg-black/40 border border-white/10' : 'bg-white/30 border border-white/40'}`}>
              <TimerDisplay isDark={isDark} />
              <div className="mt-4">
                <Controls isDark={isDark} />
              </div>
            </motion.div>

            {/* Config Panel - only shows in study mode but handled internally, we just wrap it */}
            <div className="w-full">
              <ConfigPanel isDark={isDark} />
            </div>
          </motion.div>

          {/* Right Column: Progress Animation (Only visible in study mode) */}
          <AnimatePresence>
            {mode === 'study' && (
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50, transition: { duration: 0.3 } }}
                transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
                className="flex-1 w-full flex flex-col justify-center min-h-0"
              >
                <ProgressiveScene isDark={isDark} />
              </motion.div>
            )}
          </AnimatePresence>
          
        </main>
      </motion.div>
    </>
  );
};

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isDark, setIsDark] = useState(false);

  return (
    <>
      <SplashScreen onComplete={() => setShowSplash(false)} />
      
      {!showSplash && (
        <TimerProvider>
          <AppContent isDark={isDark} setIsDark={setIsDark} />
        </TimerProvider>
      )}
    </>
  );
}

export default App;
