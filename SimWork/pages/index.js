import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Head from 'next/head';
import NavBar from '../components/NavBar';
import styles from '../styles/Home.module.css';
import GameSimulation from '../components/GameSimulation';
import FeatureCard from '../components/FeatureCard';
import Loader from '../components/Loader';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const headerControls = useAnimation();
  const scrollRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // Initialize header with full opacity right away
      headerControls.start({ 
        opacity: 1, 
        scale: 1,
        y: 0
      });
    }, 2000);

    const handleScroll = () => {
      if (scrollRef.current) {
        const scrollY = window.scrollY;
        const opacity = 1 - Math.min(1, scrollY / 400);
        const scale = 1 - Math.min(0.2, scrollY / 1000);
        headerControls.start({ 
          opacity, 
          scale,
          y: scrollY * 0.3
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headerControls]);

  const handleExploreClick = () => {
    window.scrollTo({
      top: window.innerHeight * 0.9,
      behavior: 'smooth'
    });
  };

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const features = [
    {
      title: "Multi-Role Simulation",
      description: "Experience diverse work roles from Developer to Designer in a single immersive platform.",
      icon: "💻"
    },
    {
      title: "AI-Powered Tasks",
      description: "Complete dynamic challenges with adaptive difficulty tailored to your skill level.",
      icon: "🧠"
    },
    {
      title: "Real-Time Analytics",
      description: "Track performance KPIs and receive personalized feedback to improve your skills.",
      icon: "📊"
    }
  ];

  return (
    <>
      <Head>
        <title>SimWork - Future of Work Simulation</title>
        <meta name="description" content="AI-driven, immersive 'future of work' game" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.container}>
          <NavBar />
          
          <motion.header 
            className={styles.hero}
            ref={scrollRef}
            initial={{ opacity: 1 }}
            animate={headerControls}
            transition={{
              opacity: { duration: 1.5 },
              scale: { duration: 0.8 }
            }}
          >
            <div className={styles.heroContent}>
              <div className={styles.titleContainer}>
                <motion.h1 
                  className={styles.title}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                >
                  <span data-text="SimWork" className="glitch-text">SimWork</span>
                </motion.h1>
                <motion.h2 
                  className={styles.subtitle}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
                >
                  The Future of Work Simulation
                </motion.h2>
              </div>
              
              <motion.p 
                className={styles.description}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
              >
                Experience the workplace of tomorrow in an immersive, AI-driven simulation environment.
              </motion.p>
              
              <div className={styles.buttonGroup}>
                <motion.button 
                  className={`${styles.button} ${styles.primaryButton}`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6, ease: [0.19, 1, 0.22, 1] }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStartGame}
                >
                  Start Simulation
                </motion.button>
                <motion.button 
                  className={`${styles.button} ${styles.secondaryButton}`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.7, ease: [0.19, 1, 0.22, 1] }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleExploreClick}
                >
                  Explore Features
                </motion.button>
              </div>
            </div>
            
            <div className={styles.heroBackground}>
              <div className={styles.gridPattern}></div>
              <motion.div 
                className={styles.orb}
                animate={{ 
                  y: [0, -20, 0],
                  boxShadow: [
                    '0 0 30px rgba(110, 31, 255, 0.6)',
                    '0 0 40px rgba(110, 31, 255, 0.8)',
                    '0 0 30px rgba(110, 31, 255, 0.6)'
                  ] 
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 4,
                  ease: "easeInOut" 
                }}
              ></motion.div>
              
              <motion.div 
                className={styles.ring}
                animate={{ 
                  rotate: 360
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 20,
                  ease: "linear" 
                }}
              ></motion.div>
              
              <motion.div 
                className={styles.particles}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 2 }}
              ></motion.div>
            </div>
          </motion.header>
          
          {gameStarted ? (
            <section className={styles.gameSection}>
              <GameSimulation />
            </section>
          ) : (
            <section className={styles.featuresSection}>
              <motion.h2 
                className={styles.sectionTitle}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Key Features
              </motion.h2>
              
              <div className={styles.featuresGrid}>
                {features.map((feature, index) => (
                  <FeatureCard 
                    key={index}
                    title={feature.title}
                    description={feature.description}
                    icon={feature.icon}
                    index={index}
                  />
                ))}
              </div>
              
              <motion.div 
                className={styles.startCta}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3>Ready to experience the future of work?</h3>
                <motion.button 
                  className={`${styles.button} ${styles.primaryButton}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStartGame}
                >
                  Launch Simulation
                </motion.button>
              </motion.div>
            </section>
          )}
        </div>
      )}
    </>
  );
}
