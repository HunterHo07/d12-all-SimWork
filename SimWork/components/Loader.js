import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/Loader.module.css';

const Loader = ({ showRedirectMessage = false }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing Simulation');
  const [showTips, setShowTips] = useState(false);
  
  const loadingMessages = [
    'Initializing Simulation',
    'Loading Workspace Environment',
    'Calibrating AI Systems',
    'Preparing Quest Database',
    'Setting Up Virtual Stations',
    'Finalizing Experience'
  ];
  
  const tips = [
    'Use arrow keys to navigate the workspace',
    'Press E to interact with stations',
    'Complete quests to level up your skills',
    'Each role offers unique challenges',
    'Your progress is saved automatically'
  ];
  
  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);
    
    // Change loading message
    const messageInterval = setInterval(() => {
      const messageIndex = Math.floor((loadingProgress / 100) * loadingMessages.length);
      setLoadingText(loadingMessages[Math.min(messageIndex, loadingMessages.length - 1)]);
      
      // Show tips after 30% loading
      if (loadingProgress > 30 && !showTips) {
        setShowTips(true);
      }
    }, 1000);
    
    return () => {
      clearInterval(interval);
      clearInterval(messageInterval);
    };
  }, [loadingProgress, showTips]);
  
  return (
    <div className={styles.loaderContainer}>
      <motion.div 
        className={styles.loaderLogo}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <svg width="100" height="100" viewBox="0 0 100 100">
          <motion.path
            d="M50 20L75 45L50 70L25 45L50 20Z"
            stroke="var(--accent-primary)"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <motion.path
            d="M50 30L65 45L50 60L35 45L50 30Z"
            fill="var(--accent-primary)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />
          <motion.circle
            cx="50"
            cy="45"
            r="5"
            fill="var(--accent-secondary)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, duration: 0.3 }}
          />
          <motion.path
            d="M25 55L50 80L75 55"
            stroke="var(--accent-secondary)"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.8, duration: 1, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>
      
      <motion.h1
        className={styles.loaderTitle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        SimWork
      </motion.h1>
      
      <div className={styles.loadingBarContainer}>
        <motion.div 
          className={styles.loadingBar}
          style={{ width: `${loadingProgress}%` }}
        />
        <span className={styles.loadingPercentage}>{loadingProgress}%</span>
      </div>
      
      <motion.p
        className={styles.loaderText}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        {showRedirectMessage ? 'Redirecting to home page...' : loadingText}
      </motion.p>
      
      {showTips && (
        <motion.div 
          className={styles.tipsContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3>Quick Tips:</h3>
          <ul>
            {tips.map((tip, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                {tip}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Loader;
