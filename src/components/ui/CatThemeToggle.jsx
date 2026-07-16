import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CatThemeToggle.css';

export const CatThemeToggle = ({ onToggle }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Notify parent when state changes
    if (onToggle) {
      onToggle(isDark);
    }
  }, [isDark, onToggle]);

  return (
    <div className="cat-theme-wrapper">
      <div className="cat-theme-scaler">
        <div className="the-container">
          
          <input 
            type="checkbox" 
          id="toggle" 
          checked={isDark}
          onChange={(e) => setIsDark(e.target.checked)} 
        />
        <label htmlFor="toggle"></label>
        
        <div className="day-night-cont">
            <span className="the-sun"></span>
            <div className="the-moon"><span className="moon-inside"></span></div>
        </div>
        
        <div className="switch">
          <div className="button">
            <div className="b-inside"></div>
          </div>
        </div>
        
        <div className="c-window cursor-pointer" onClick={() => setIsDark(!isDark)}>
          
          <span className="the-sun"></span>
          <span className="the-moon"></span>
          
          <div className="the-cat">
            <div className="cat-face">
              <section className="eyes left"><span className="pupil"></span></section>
              <section className="eyes right"><span className="pupil"></span></section>  
              <span className="nose"></span>
              <div className="mouth-svg">
                <svg width="40" height="20" viewBox="0 0 40 20" fill="none" stroke="#FFB399" strokeWidth="3" strokeLinecap="round">
                  {/* Vertical line from nose */}
                  <path d="M 20 0 V 8" />
                  {/* Left curve */}
                  <path d="M 20 8 Q 12 16 4 8" />
                  {/* Right curve */}
                  <path d="M 20 8 Q 28 16 36 8" />
                </svg>
              </div>
              <div className="whiskers left-whiskers">
                <svg width="30" height="20" viewBox="0 0 30 20" fill="none" stroke="#FFFBF0" strokeWidth="2" strokeLinecap="round">
                  <path d="M 30 5 Q 15 2 0 8" />
                  <path d="M 30 15 Q 15 15 5 20" />
                </svg>
              </div>
              <div className="whiskers right-whiskers">
                <svg width="30" height="20" viewBox="0 0 30 20" fill="none" stroke="#FFFBF0" strokeWidth="2" strokeLinecap="round">
                  <path d="M 0 5 Q 15 2 30 8" />
                  <path d="M 0 15 Q 15 15 25 20" />
                </svg>
              </div>
            </div>  
            
            {/* Zzz animations only when dark */}
            <AnimatePresence>
              {isDark && (
                <div className="absolute left-1/2 transform -translate-x-1/2 top-0 pointer-events-none">
                  <motion.div
                    className="absolute text-cat-accent font-bold text-xl z-50"
                    initial={{ opacity: 0, y: 10, x: -5, scale: 0.5 }}
                    animate={{ 
                      y: -60,
                      x: [-5, 15, -5],
                      opacity: [0, 1, 0],
                      scale: 1.5
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                  >
                    Z
                  </motion.div>
                  <motion.div
                    className="absolute text-cat-accent font-bold text-2xl z-50"
                    initial={{ opacity: 0, y: 10, x: 5, scale: 0.5 }}
                    animate={{ 
                      y: -80,
                      x: [5, -15, 5],
                      opacity: [0, 1, 0],
                      scale: 1.8
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 1.2 }}
                  >
                    Z
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>
          
        </div>
      </div>
    </div>
  </div>
);
};
