import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import NavBar from '../components/NavBar';
import styles from '../styles/PitchDeck.module.css';

const slides = [
  {
    title: "SimWork",
    subtitle: "Future of Work Simulation",
    content: "AI-powered training & recruitment platform",
    background: "linear-gradient(135deg, #6e1fff, rgba(110, 31, 255, 0.1))",
    type: "intro"
  },
  {
    title: "The Problem",
    subtitle: "Current hiring & training systems are broken",
    content: [
      "Wrong Hires, Wasted Resources",
      "Fake Skills, No Real Testing",
      "Slow, Inefficient Process",
      "No KPI or Proof of Skill"
    ],
    background: "linear-gradient(135deg, #ff3a5e, rgba(255, 58, 94, 0.1))",
    type: "problem"
  },
  {
    title: "The Solution",
    subtitle: "Immersive, AI-driven simulation platform",
    content: [
      "Multi-Role Game World",
      "Embedded Real Tools (Terminal, Design, Data)",
      "AI-Powered Adaptivity",
      "Real-time Performance Analytics"
    ],
    background: "linear-gradient(135deg, #00ffbb, rgba(0, 255, 187, 0.1))",
    type: "solution"
  },
  {
    title: "Market Opportunity",
    subtitle: "$37B Corporate Training Market",
    content: [
      "Training Industry: $370B global market",
      "E-Learning: Growing at 16% CAGR",
      "HR Tech: $34B with 11% CAGR",
      "Simulation Training: Fastest growing segment"
    ],
    background: "linear-gradient(135deg, #ffa500, rgba(255, 165, 0, 0.1))",
    type: "market"
  },
  {
    title: "Competitive Advantage",
    subtitle: "Why SimWork Wins",
    content: [
      "Multi-skill assessment in one platform",
      "Real tool integration (not just videos or quizzes)",
      "Adaptive difficulty tailored to user",
      "Comprehensive analytics & KPI tracking"
    ],
    background: "linear-gradient(135deg, #00a3ff, rgba(0, 163, 255, 0.1))",
    type: "advantage"
  },
  {
    title: "Business Model",
    subtitle: "B2B SaaS + Enterprise Solutions",
    content: [
      "Individual: $29/mo subscription",
      "Team: $199/mo (10 users)",
      "Enterprise: Custom pricing",
      "White-labeled training platform option"
    ],
    background: "linear-gradient(135deg, #9c27b0, rgba(156, 39, 176, 0.1))",
    type: "business"
  },
  {
    title: "Go-To-Market",
    subtitle: "Phased Rollout Strategy",
    content: [
      "Phase 1: Web-based 2.5D Simulation (Now)",
      "Phase 2: Desktop/mobile apps + expanded roles",
      "Phase 3: VR/AR integration + enterprise modules",
      "Phase 4: API ecosystem for custom integrations"
    ],
    background: "linear-gradient(135deg, #8bc34a, rgba(139, 195, 74, 0.1))",
    type: "gtm"
  },
  {
    title: "The Team",
    subtitle: "Industry Experts",
    content: [
      "CEO: Ex-Google Learning Lead",
      "CTO: AI & Gaming Background",
      "Head of Design: Former Metaverse Designer",
      "Chief Learning Officer: EdTech Veteran"
    ],
    background: "linear-gradient(135deg, #ff9800, rgba(255, 152, 0, 0.1))",
    type: "team"
  },
  {
    title: "Our Ask",
    subtitle: "Seed Round Funding",
    content: [
      "$3M Seed Round",
      "18-month runway",
      "Key hires: Engineers & Content Creators",
      "Enterprise partnerships & pilot programs"
    ],
    background: "linear-gradient(135deg, #6e1fff, rgba(110, 31, 255, 0.1))",
    type: "ask"
  },
  {
    title: "Join Us",
    subtitle: "Shape the Future of Work",
    content: "Ready to revolutionize training & recruitment?",
    background: "linear-gradient(135deg, #00ffbb, rgba(0, 255, 187, 0.1))",
    type: "outro",
    cta: "Sign Up for Early Access"
  }
];

export default function PitchDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'f') {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const nextSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setDirection(1);
    
    setTimeout(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      setIsAnimating(false);
    }, 300);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setDirection(-1);
    
    setTimeout(() => {
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      setIsAnimating(false);
    }, 300);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return;
    
    setIsAnimating(true);
    setDirection(index > currentSlide ? 1 : -1);
    
    setTimeout(() => {
      setCurrentSlide(index);
      setIsAnimating(false);
    }, 300);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    
    if (!isFullscreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0
    })
  };

  const renderSlideContent = (slide) => {
    switch (slide.type) {
      case 'intro':
      case 'outro':
        return (
          <div className={styles.centeredSlide}>
            <motion.h1 
              className={styles.mainTitle}
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {slide.title}
            </motion.h1>
            
            <motion.h2 
              className={styles.mainSubtitle}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {slide.subtitle}
            </motion.h2>
            
            <motion.p 
              className={styles.mainContent}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {slide.content}
            </motion.p>
            
            {slide.cta && (
              <motion.button 
                className={styles.ctaButton}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {slide.cta}
              </motion.button>
            )}
          </div>
        );
        
      default:
        return (
          <div className={styles.standardSlide}>
            <motion.h2 
              className={styles.slideTitle}
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {slide.title}
            </motion.h2>
            
            <motion.h3 
              className={styles.slideSubtitle}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {slide.subtitle}
            </motion.h3>
            
            <motion.div 
              className={styles.contentList}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {Array.isArray(slide.content) ? (
                <ul>
                  {slide.content.map((item, index) => (
                    <motion.li 
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <p>{slide.content}</p>
              )}
            </motion.div>
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Pitch Deck - SimWork</title>
        <meta name="description" content="SimWork business pitch and investment opportunity" />
      </Head>

      <div className={`${styles.container} ${isFullscreen ? styles.fullscreen : ''}`}>
        {!isFullscreen && <NavBar />}
        
        <div className={styles.deckContainer}>
          <AnimatePresence initial={false} mode="wait" custom={direction}>
            <motion.div
              key={currentSlide}
              className={styles.slide}
              style={{ background: slides[currentSlide].background }}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            >
              {renderSlideContent(slides[currentSlide])}
              
              <div className={styles.slideNumber}>
                {currentSlide + 1} / {slides.length}
              </div>
            </motion.div>
          </AnimatePresence>
          
          <div className={styles.controls}>
            <button 
              className={styles.controlButton}
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <div className={styles.navigation}>
              {slides.map((_, index) => (
                <button 
                  key={index}
                  className={`${styles.navDot} ${index === currentSlide ? styles.activeDot : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              className={styles.controlButton}
              onClick={nextSlide}
              aria-label="Next slide"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          
          <button 
            className={styles.fullscreenButton}
            onClick={toggleFullscreen}
            aria-label="Toggle fullscreen"
          >
            {isFullscreen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M8 3V5H4V9H2V3H8Z" fill="currentColor"/>
                <path d="M16 3H22V9H20V5H16V3Z" fill="currentColor"/>
                <path d="M22 15V21H16V19H20V15H22Z" fill="currentColor"/>
                <path d="M8 21H2V15H4V19H8V21Z" fill="currentColor"/>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 8H5V4H9V2H3V8Z" fill="currentColor"/>
                <path d="M5 16H3V22H9V20H5V16Z" fill="currentColor"/>
                <path d="M21 2H15V4H19V8H21V2Z" fill="currentColor"/>
                <path d="M19 20H15V22H21V16H19V20Z" fill="currentColor"/>
              </svg>
            )}
          </button>
          
          <div className={styles.keyboardInfo}>
            <div className={styles.keyboardKey}>←</div>
            <div className={styles.keyboardKey}>→</div>
            <span>to navigate</span>
            <div className={styles.keyboardKey}>F</div>
            <span>for fullscreen</span>
          </div>
        </div>
      </div>
    </>
  );
}
