import React, { useState } from 'react';
import { useTimer } from '../../context/TimerContext';
import { Settings, CheckCircle2, Clock, RotateCcw, PawPrint } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ConfigPanel = ({ isDark }) => {
  const { mode, updateStudyConfig, setMaxCycles, maxCycles, studyConfig } = useTimer();
  const [isCustom, setIsCustom] = useState(false);
  const [customStudy, setCustomStudy] = useState(25);
  const [customBreak, setCustomBreak] = useState(5);

  if (mode !== 'study') return null;

  const applyCustom = () => {
    updateStudyConfig(customStudy, customBreak);
  };

  // Determine which preset is currently active based on context config
  const isPreset15 = studyConfig.studyTime === 15 * 60 && studyConfig.breakTime === 5 * 60;
  const isPreset30 = studyConfig.studyTime === 30 * 60 && studyConfig.breakTime === 10 * 60;
  
  const activeTab = isCustom ? 'custom' : (isPreset30 ? '30m' : '15m');

  const textColor = isDark ? 'text-cat-cream' : 'text-cat-dark';
  const mutedText = isDark ? 'text-white/60' : 'text-black/50';
  const panelBg = isDark ? 'bg-black/40 border-white/10' : 'bg-white/30 border-white/40';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`w-full max-w-lg mx-auto rounded-[3rem] px-5 py-4 backdrop-blur-xl shadow-2xl border ${panelBg} relative overflow-hidden group`}
    >
      {/* Decorative gradient orb */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-cat-pink opacity-20 blur-[50px] group-hover:opacity-40 transition-opacity duration-700 pointer-events-none" />

      <div className={`flex items-center gap-2 mb-2 drop-shadow-sm ${textColor}`}>
        <div className={`p-1.5 rounded-xl ${isDark ? 'bg-white/10' : 'bg-black/5'}`}>
          <Settings size={18} className={isDark ? 'text-cat-cream' : 'text-cat-accent'} />
        </div>
        <h2 className="text-lg font-extrabold tracking-tight">Plan de Estudio</h2>
      </div>
      
      <div className="space-y-2 relative z-10">
        
        {/* Animated Segmented Control for Presets */}
        <div className="space-y-2">
          <label className={`block text-xs font-bold uppercase tracking-wider ${mutedText} flex items-center gap-1`}>
            <Clock size={12} /> Bloques de Tiempo
          </label>
          <div className="relative">
            {/* Presets Segmented Control */}
            <motion.div 
              className={`flex p-1 rounded-[1.25rem] backdrop-blur-sm shadow-md ${isDark ? 'bg-black/30 border border-white/10' : 'bg-white/40 border border-white/40'} relative`}
            >
              {[
                { id: '15m', label: '15m / 5m', action: () => { setIsCustom(false); updateStudyConfig(15, 5); } },
                { id: '30m', label: '30m / 10m', action: () => { setIsCustom(false); updateStudyConfig(30, 10); } },
                { id: 'custom', label: 'Custom', action: () => setIsCustom(true) }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={tab.action}
                  className={`relative flex-1 py-2 rounded-xl text-sm font-bold transition-all duration-300 z-10 ${
                    activeTab === tab.id 
                      ? (isDark ? 'text-gray-900' : 'text-cat-brown') 
                      : (isDark ? 'text-white/80 hover:bg-white/10' : 'text-cat-dark/80 hover:bg-white/30')
                  }`}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className={`absolute inset-0 rounded-xl shadow-md -z-10 ${isDark ? 'bg-white/90 border border-white' : 'bg-white/90 border border-white/60'}`}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  {tab.label}
                </button>
              ))}
            </motion.div>

            {/* Custom Input Fields (Inline expansion) */}
            <AnimatePresence>
              {isCustom && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, scale: 0.95 }}
                  animate={{ opacity: 1, height: 'auto', scale: 1 }}
                  exit={{ opacity: 0, height: 0, scale: 0.95 }}
                  className="flex items-end gap-3 mt-2 overflow-hidden"
                >
                  <div className="flex-1">
                    <label className={`block text-[10px] font-bold mb-1 uppercase tracking-wider ${mutedText}`}>Estudio (min)</label>
                    <input 
                      type="number" 
                      value={customStudy}
                      onChange={(e) => setCustomStudy(Number(e.target.value))}
                      className={`w-full rounded-xl px-3 py-1.5 text-sm font-bold outline-none border-2 transition-all ${isDark ? 'bg-black/40 border-white/10 text-white focus:border-cat-accent' : 'bg-white/70 border-white text-cat-dark focus:border-cat-accent'}`}
                    />
                  </div>
                  <div className="flex-1">
                    <label className={`block text-[10px] font-bold mb-1 uppercase tracking-wider ${mutedText}`}>Recreo (min)</label>
                    <input 
                      type="number" 
                      value={customBreak}
                      onChange={(e) => setCustomBreak(Number(e.target.value))}
                      className={`w-full rounded-xl px-3 py-1.5 text-sm font-bold outline-none border-2 transition-all ${isDark ? 'bg-black/40 border-white/10 text-white focus:border-cat-accent' : 'bg-white/70 border-white text-cat-dark focus:border-cat-accent'}`}
                    />
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => applyCustom()}
                    className={`h-[36px] px-4 rounded-xl shadow-lg flex items-center justify-center transition-colors ${isDark ? 'bg-cat-peach text-cat-dark hover:bg-cat-accent' : 'bg-cat-accent text-white hover:bg-cat-peach'}`}
                  >
                    <CheckCircle2 size={18} />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Cycle Config */}
        <div className="space-y-2 pt-2">
          <label className={`block text-xs font-bold uppercase tracking-wider ${mutedText} flex items-center gap-1`}>
            <RotateCcw size={12} /> Ciclos de repetición
          </label>
          <div className={`flex p-1 rounded-[1.25rem] backdrop-blur-sm shadow-md mt-3 ${isDark ? 'bg-black/30 border border-white/10' : 'bg-white/40 border border-white/40'} relative`}>
            {['2', '3', '4', 'infinity'].map(val => {
              const isSelected = maxCycles === val;
              const displayVal = val === 'infinity' ? '∞' : val;
              return (
                <button
                  key={val}
                  onClick={() => setMaxCycles(val)}
                  className={`relative flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-base font-bold transition-all duration-300 z-10 group ${
                    isSelected 
                      ? (isDark ? 'text-gray-900' : 'text-cat-brown') 
                      : (isDark ? 'text-white/80 hover:bg-white/10' : 'text-cat-dark/80 hover:bg-white/30')
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeCycleIndicator"
                      className={`absolute inset-0 rounded-xl shadow-md -z-10 ${isDark ? 'bg-white/90 border border-white' : 'bg-white/90 border border-white/60'}`}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  <PawPrint 
                    size={18} 
                    strokeWidth={2.5}
                    className={`transition-transform duration-300 ${isSelected ? 'scale-110' : 'opacity-70 group-hover:scale-110'}`} 
                  />
                  <span>
                    {displayVal}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        
      </div>
    </motion.div>
  );
};
