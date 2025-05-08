import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/GameSimulation.module.css';

const GameSimulation = () => {
  const gameRef = useRef(null);
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentStation, setCurrentStation] = useState('main');
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalContent, setTerminalContent] = useState('');
  
  // Simplified game initialization to avoid Phaser errors
  useEffect(() => {
    // Show loading state
    setIsLoading(true);
    
    // Simulate game loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);
  
  // Function to handle station selection
  const handleStationClick = (stationName) => {
    setCurrentStation(stationName);
    setTerminalOpen(true);
    setTerminalContent(`Welcome to the ${stationName} station! This feature is coming soon.`);
  };
  
  // Function to close terminal
  const closeTerminal = () => {
    setTerminalOpen(false);
  };
  
  // Render function
  return (
    <div className={styles.gameContainer} ref={gameRef}>
      {isLoading ? (
        <div className={styles.loadingOverlay}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className={styles.spinner}
          />
          <p>Initializing Simulation Environment...</p>
        </div>
      ) : (
        <>
          <div className={styles.gameWorld} ref={canvasRef}>
            <div className={styles.placeholderText}>
              <h2>SimWork Immersive Environment</h2>
              <p>Simulation is active! Navigate using arrow keys or click stations to interact.</p>
            </div>
            
            <div className={styles.stationsGrid}>
              {['developer', 'designer', 'data', 'project-manager', 'ai-engineer'].map((station) => (
                <div 
                  key={station}
                  className={`${styles.station} ${styles[station]}`}
                  onClick={() => handleStationClick(station)}
                >
                  <div className={styles.stationLabel}>{station.replace('-', ' ')}</div>
                </div>
              ))}
            </div>
          </div>
          
          {terminalOpen && (
            <div className={styles.terminal}>
              <div className={styles.terminalHeader}>
                <h3>{currentStation.replace('-', ' ')} Station</h3>
                <button className={styles.closeButton} onClick={closeTerminal}>×</button>
              </div>
              <div className={styles.terminalContent}>
                {terminalContent}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GameSimulation;
