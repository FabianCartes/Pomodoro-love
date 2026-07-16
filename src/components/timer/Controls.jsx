import React from 'react';
import { Play, Pause, Square, RotateCcw } from 'lucide-react';
import { useTimer } from '../../context/TimerContext';
import { motion } from 'framer-motion';

export const Controls = ({ isDark }) => {
  const { isActive, toggleTimer, resetTimer, mode } = useTimer();

  if (mode !== 'study') {
    return (
      <div className="flex items-center justify-center space-x-4 mt-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTimer}
          className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold text-white shadow-lg transition-all ${
            isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-gradient-to-r from-[#ff8c5a] to-[#ff6b81] hover:shadow-xl'
          }`}
        >
          {isActive ? <Pause size={20} /> : <Play size={20} className="fill-current" />}
          <span>{isActive ? 'Pausar' : 'Iniciar'}</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetTimer}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold border-2 transition-all ${
            isDark 
              ? 'border-white/20 text-white hover:bg-white/10' 
              : 'border-[#ffecd2] text-[#ff8c5a] hover:bg-[#fff9f2]'
          }`}
        >
          <RotateCcw size={20} />
          <span>Reiniciar</span>
        </motion.button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center space-x-6 mt-2">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleTimer}
        className="w-16 h-16 rounded-full bg-cat-accent text-white flex items-center justify-center shadow-lg hover:bg-opacity-90 transition-colors"
      >
        {isActive ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={resetTimer}
        className="w-12 h-12 rounded-full bg-cat-pink text-cat-brown flex items-center justify-center shadow hover:bg-opacity-80 transition-colors"
      >
        <Square size={20} />
      </motion.button>
    </div>
  );
};
