import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const SplashScreen = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide splash screen after 3.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // give time for fade out
    }, 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Using paths from lucide-react's Cat icon for a perfect cat drawing
  const catOutline = "M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3.1-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.69.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z";
  const eye1 = "M8 14v.5";
  const eye2 = "M16 14v.5";
  const nose = "M11.25 16.25h1.5L12 17l-.75-.75Z";

  const pathVariant = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2, ease: "easeInOut" },
        opacity: { duration: 0.2 }
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cat-dark"
        >
          {/* Animated Line Art Cat */}
          <motion.svg
            width="200"
            height="200"
            viewBox="0 0 24 24"
            className="overflow-visible"
          >
            <motion.path
              d={catOutline}
              fill="transparent"
              stroke="#FFFBF0"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={pathVariant}
              initial="hidden"
              animate="visible"
            />
            <motion.path
              d={eye1}
              fill="transparent"
              stroke="#FFFBF0"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={pathVariant}
              initial="hidden"
              animate="visible"
            />
            <motion.path
              d={eye2}
              fill="transparent"
              stroke="#FFFBF0"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={pathVariant}
              initial="hidden"
              animate="visible"
            />
             <motion.path
              d={nose}
              fill="#FFFBF0"
              stroke="#FFFBF0"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={pathVariant}
              initial="hidden"
              animate="visible"
            />
            
            {/* Little floating hearts/stars to mimic the screenshot's particles */}
            <motion.path
              d="M 22 2 L 23 3 L 22 4 L 21 3 Z"
              fill="#FFB085"
              initial={{ opacity: 0, scale: 0, y: 5 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], y: -5, rotate: 45 }}
              transition={{ delay: 1.5, duration: 1.5 }}
            />
            <motion.path
              d="M 2 8 L 3 9 L 2 10 L 1 9 Z"
              fill="#FFD1D1"
              initial={{ opacity: 0, scale: 0, y: 5 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0], y: -5, rotate: -30 }}
              transition={{ delay: 1.8, duration: 1.5 }}
            />
            <motion.circle 
              cx="20" cy="10" r="0.5" fill="#D7F0FF"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 2, 0], y: -5 }}
              transition={{ delay: 1.6, duration: 1.2 }}
            />
          </motion.svg>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="mt-8 text-cat-cream font-sans tracking-widest text-xl font-light"
          >
            POMODORO LOVE
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
