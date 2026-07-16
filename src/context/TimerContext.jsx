import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const TimerContext = createContext(null);

export const TimerProvider = ({ children }) => {
  const [mode, setMode] = useState('study'); // 'stopwatch', 'timer', 'study'
  
  // Stopwatch state
  const [elapsedTime, setElapsedTime] = useState(0);
  
  // Timer & Study state
  const [timeRemaining, setTimeRemaining] = useState(15 * 60); 
  const [initialTime, setInitialTime] = useState(15 * 60); // To calculate percentage
  
  // Study specific state
  const [studyConfig, setStudyConfig] = useState({ studyTime: 15 * 60, breakTime: 5 * 60 });
  const [currentPhase, setCurrentPhase] = useState('study'); // 'study', 'break'
  const [currentCycle, setCurrentCycle] = useState(1);
  const [maxCycles, setMaxCycles] = useState('infinity'); // 2, 3, 4, 'infinity'
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef(null);
  const transitionTimeoutRef = useRef(null);

  // User preferences
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  // Transition state
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionMessage, setTransitionMessage] = useState('');

  const clearTransition = () => {
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = null;
    }
    setIsTransitioning(false);
  };

  useEffect(() => {
    if (isActive) {
      const tickRate = mode === 'stopwatch' ? 10 : 1000;
      
      intervalRef.current = setInterval(() => {
        if (mode === 'stopwatch') {
          // Add 10ms
          setElapsedTime((prev) => prev + 10);
        } else {
          setTimeRemaining((prev) => {
            if (prev <= 1) {
              handleTimerEnd();
              return 0;
            }
            return prev - 1;
          });
        }
      }, tickRate);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive, mode, currentPhase]);

  const handleTimerEnd = () => {
    if (mode === 'timer') {
      setIsActive(false);
      // Optional: play sound
    } else if (mode === 'study') {
      if (currentPhase === 'study') {
        setIsTransitioning(true);
        setTransitionMessage('¡Preparando Recreo Espacial! 🚀');
        setIsActive(false); // Pause timer during transition

        transitionTimeoutRef.current = setTimeout(() => {
          setIsTransitioning(false);
          setCurrentPhase('break');
          setTimeRemaining(studyConfig.breakTime);
          setInitialTime(studyConfig.breakTime);
          setIsActive(true); // Auto-resume
        }, 4000);
      } else {
        // Break ended
        if (maxCycles !== 'infinity' && currentCycle >= parseInt(maxCycles)) {
          setIsTransitioning(true);
          setTransitionMessage('¡Misión Completada! 🌟');
          setIsActive(false);
          
          transitionTimeoutRef.current = setTimeout(() => {
            setIsTransitioning(false);
            setCurrentPhase('study');
            setTimeRemaining(studyConfig.studyTime);
            setInitialTime(studyConfig.studyTime);
            setCurrentCycle(1);
          }, 4000);
        } else {
          setIsTransitioning(true);
          setTransitionMessage('¡De Vuelta a la Misión! 🛸');
          setIsActive(false);
          
          transitionTimeoutRef.current = setTimeout(() => {
            setIsTransitioning(false);
            setCurrentPhase('study');
            setTimeRemaining(studyConfig.studyTime);
            setInitialTime(studyConfig.studyTime);
            setCurrentCycle(prev => prev + 1);
            setIsActive(true); // Auto-resume
          }, 4000);
        }
      }
    }
  };

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    clearTransition();
    setIsActive(false);
    if (mode === 'stopwatch') {
      setElapsedTime(0);
    } else if (mode === 'timer') {
      setTimeRemaining(initialTime);
    } else if (mode === 'study') {
      setCurrentPhase('study');
      setCurrentCycle(1);
      setTimeRemaining(studyConfig.studyTime);
      setInitialTime(studyConfig.studyTime);
    }
  };

  const changeMode = (newMode) => {
    clearTransition();
    setIsActive(false);
    setMode(newMode);
    if (newMode === 'stopwatch') {
      setElapsedTime(0);
    } else if (newMode === 'timer') {
      setTimeRemaining(5 * 60);
      setInitialTime(5 * 60);
    } else if (newMode === 'study') {
      setCurrentPhase('study');
      setCurrentCycle(1);
      setTimeRemaining(studyConfig.studyTime);
      setInitialTime(studyConfig.studyTime);
    }
  };

  const updateStudyConfig = (studyMinutes, breakMinutes) => {
    const sTime = studyMinutes * 60;
    const bTime = breakMinutes * 60;
    setStudyConfig({ studyTime: sTime, breakTime: bTime });
    if (mode === 'study' && !isActive) {
      if (currentPhase === 'study') {
         setTimeRemaining(sTime);
         setInitialTime(sTime);
      } else {
         setTimeRemaining(bTime);
         setInitialTime(bTime);
      }
    }
  };

  // Percentage for progressive animations
  const progressPercentage = mode === 'stopwatch' 
    ? 0 // Stopwatch doesn't have a definitive end for percentage usually
    : ((initialTime - timeRemaining) / initialTime) * 100;

  return (
    <TimerContext.Provider
      value={{
        mode,
        changeMode,
        elapsedTime,
        timeRemaining,
        initialTime,
        isActive,
        toggleTimer,
        resetTimer,
        currentPhase,
        currentCycle,
        maxCycles,
        setMaxCycles,
        studyConfig,
        updateStudyConfig,
        progressPercentage,
        isTransitioning,
        transitionMessage,
        animationsEnabled,
        setAnimationsEnabled
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => useContext(TimerContext);
