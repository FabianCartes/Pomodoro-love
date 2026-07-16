import React from 'react';
import { useTimer } from '../../context/TimerContext';
import { Timer, Clock, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export const NavBar = ({ isDark }) => {
  const { mode, changeMode } = useTimer();

  const tabs = [
    { id: 'stopwatch', label: 'Cronómetro', icon: Clock },
    { id: 'timer', label: 'Temporizador', icon: Timer },
    { id: 'study', label: 'Plan de Estudio', icon: BookOpen },
  ];

  return (
    <nav className="flex-1 flex justify-center max-w-xl mx-auto px-4 w-full">
      <div className={`flex w-full p-2 rounded-3xl backdrop-blur-md shadow-lg ${isDark ? 'bg-black/30 border border-white/10' : 'bg-white/40 border border-white/40'}`}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = mode === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => changeMode(tab.id)}
              className={`relative flex-1 flex items-center justify-center gap-2 py-3 px-2 md:px-4 rounded-2xl text-xs md:text-sm font-bold transition-all duration-300 z-10 ${
                isActive 
                  ? (isDark ? 'text-gray-900' : 'text-cat-brown') 
                  : (isDark ? 'text-white text-opacity-80 hover:bg-white/10' : 'text-cat-dark text-opacity-80 hover:bg-white/30')
              }`}
            >
              <Icon size={18} />
              <span className="hidden sm:inline drop-shadow-sm">{tab.label}</span>
              
              {isActive && (
                <motion.div
                  layoutId="navbar-indicator"
                  className={`absolute inset-0 rounded-2xl shadow-md -z-10 ${isDark ? 'bg-white/90 border border-white' : 'bg-white/90 border border-white/60'}`}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
