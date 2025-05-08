import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import NavBar from '../components/NavBar';
import styles from '../styles/Demo.module.css';

const steps = [
  {
    title: "Character Creation",
    description: "Start by designing your avatar and choosing your professional role.",
    image: "/SimWork/demo-step1.webp",
    animation: "slide-right"
  },
  {
    title: "Office Navigation",
    description: "Explore the 2.5D workspace environment with different role stations.",
    image: "/SimWork/demo-step2.webp",
    animation: "slide-up"
  },
  {
    title: "Skill Challenges",
    description: "Complete role-specific tasks that test and develop your professional skills.",
    image: "/SimWork/demo-step3.webp",
    animation: "slide-left"
  },
  {
    title: "Real-time Feedback",
    description: "Receive instant analysis and suggestions to improve your performance.",
    image: "/SimWork/demo-step4.webp",
    animation: "zoom"
  },
  {
    title: "Skill Progression",
    description: "Track your growth across different competencies with detailed analytics.",
    image: "/SimWork/demo-step5.webp",
    animation: "fade"
  }
];

export default function Demo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let interval;
    if (autoplay) {
      interval = setInterval(() => {
        nextStep();
      }, 4000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoplay, currentStep]);

  const nextStep = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
      setIsAnimating(false);
    }, 500);
  };

  const prevStep = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep((prev) => (prev === 0 ? steps.length - 1 : prev - 1));
      setIsAnimating(false);
    }, 500);
  };

  const toggleAutoplay = () => {
    setAutoplay(!autoplay);
  };

  const goToStep = (index) => {
    if (isAnimating || index === currentStep) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(index);
      setIsAnimating(false);
    }, 500);
  };

  const getAnimationVariants = (animation) => {
    switch (animation) {
      case 'slide-right':
        return {
          hidden: { x: -100, opacity: 0 },
          visible: { x: 0, opacity: 1 },
          exit: { x: 100, opacity: 0 }
        };
      case 'slide-left':
        return {
          hidden: { x: 100, opacity: 0 },
          visible: { x: 0, opacity: 1 },
          exit: { x: -100, opacity: 0 }
        };
      case 'slide-up':
        return {
          hidden: { y: 100, opacity: 0 },
          visible: { y: 0, opacity: 1 },
          exit: { y: -100, opacity: 0 }
        };
      case 'zoom':
        return {
          hidden: { scale: 0.8, opacity: 0 },
          visible: { scale: 1, opacity: 1 },
          exit: { scale: 1.2, opacity: 0 }
        };
      case 'fade':
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
          exit: { opacity: 0 }
        };
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
        <title>Demo - SimWork</title>
        <meta name="description" content="See how SimWork's immersive simulation works" />
      </Head>

      <div className={styles.container}>
        <NavBar />
        
        <motion.div 
          className={styles.demoContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.demoHeader}>
            <motion.h1 
              className={styles.title}
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              How SimWork Works
            </motion.h1>
            <motion.p 
              className={styles.subtitle}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              A step-by-step guide to the future of work simulation
            </motion.p>
          </div>
          
          <div className={styles.demoContent}>
            <button 
              className={`${styles.navButton} ${styles.prevButton}`}
              onClick={prevStep}
              aria-label="Previous step"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <div className={styles.demoStage}>
              <div className={styles.stepCard}>
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={currentStep}
                    className={styles.stepContent}
                    variants={getAnimationVariants(steps[currentStep].animation)}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                  >
                    <div className={styles.stepImageContainer}>
                      <div 
                        className={styles.stepImage}
                        style={{ backgroundImage: `url(${steps[currentStep].image})` }}
                      />
                      <div className={styles.stepNumber}>{currentStep + 1}</div>
                    </div>
                    
                    <div className={styles.stepInfo}>
                      <h2 className={styles.stepTitle}>{steps[currentStep].title}</h2>
                      <p className={styles.stepDescription}>{steps[currentStep].description}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              <div className={styles.stepIndicators}>
                {steps.map((_, index) => (
                  <button 
                    key={index}
                    className={`${styles.stepIndicator} ${index === currentStep ? styles.activeStep : ''}`}
                    onClick={() => goToStep(index)}
                    aria-label={`Go to step ${index + 1}`}
                  />
                ))}
              </div>
              
              <button 
                className={`${styles.autoplayButton} ${autoplay ? styles.active : ''}`}
                onClick={toggleAutoplay}
              >
                {autoplay ? 'Pause' : 'Autoplay'}
              </button>
            </div>
            
            <button 
              className={`${styles.navButton} ${styles.nextButton}`}
              onClick={nextStep}
              aria-label="Next step"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          
          <motion.div 
            className={styles.demoFooter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <p>Ready to experience the future of work for yourself?</p>
            <a href="/" className={styles.ctaButton}>Try Simulation</a>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
