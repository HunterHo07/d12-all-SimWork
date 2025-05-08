import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Error.module.css';

export default function Custom404() {
  const router = useRouter();
  
  useEffect(() => {
    // Auto-redirect after 10 seconds
    const timer = setTimeout(() => {
      router.push('/');
    }, 10000);
    
    return () => clearTimeout(timer);
  }, [router]);
  
  return (
    <>
      <Head>
        <title>Page Not Found - SimWork</title>
        <meta name="description" content="The page you are looking for does not exist." />
      </Head>
      
      <div className={styles.container}>
        <motion.div 
          className={styles.errorCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className={styles.glitchEffect}
            animate={{ 
              x: [0, -5, 5, -5, 5, 0],
              opacity: [1, 0.8, 0.9, 0.8, 0.9, 1]
            }}
            transition={{ 
              repeat: Infinity,
              repeatType: "reverse",
              duration: 1.5
            }}
          >
            <h1 className={styles.errorCode}>404</h1>
          </motion.div>
          
          <h2 className={styles.errorTitle}>Simulation Interrupted</h2>
          
          <p className={styles.errorMessage}>
            The workspace module you're looking for doesn't exist or has been relocated to another sector.
          </p>
          
          <div className={styles.redirectMessage}>
            <motion.div 
              className={styles.loader}
              animate={{ 
                rotate: 360
              }}
              transition={{ 
                repeat: Infinity,
                duration: 2,
                ease: "linear"
              }}
            />
            <p>Auto-redirecting to home station in a few seconds...</p>
          </div>
          
          <div className={styles.actions}>
            <Link href="/" className={styles.primaryButton}>
              Return to Main Hub
            </Link>
            
            <button 
              className={styles.secondaryButton}
              onClick={() => router.back()}
            >
              Back to Previous Location
            </button>
          </div>
          
          <div className={styles.errorNav}>
            <p>Or navigate directly to:</p>
            <div className={styles.navLinks}>
              <Link href="/demo" className={styles.navLink}>
                Demo
              </Link>
              <Link href="/pitch-deck" className={styles.navLink}>
                Pitch Deck
              </Link>
              <Link href="/why-us" className={styles.navLink}>
                Why Us
              </Link>
              <Link href="/landing" className={styles.navLink}>
                Sign Up
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
