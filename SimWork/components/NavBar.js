import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from '../styles/NavBar.module.css';

const NavBar = () => {
  const [activeLink, setActiveLink] = useState('/');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleRouteChange = () => {
      setActiveLink(window.location.pathname);
    };
    
    window.addEventListener('popstate', handleRouteChange);
    setActiveLink(window.location.pathname);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  const navItems = [
    { path: '/', label: 'SimWork' },
    { path: '/demo', label: 'Demo' },
    { path: '/pitch-deck', label: 'Pitch Deck' },
    { path: '/why-us', label: 'Why Us' },
    { path: '/landing', label: 'Sign Up Now' },
  ];

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.nav 
      className={styles.navbar}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
    >
      <div className={styles.navContent}>
        <motion.div 
          className={styles.logoContainer}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
        >
          <svg className={styles.logo} width="40" height="40" viewBox="0 0 40 40">
            <motion.path
              d="M20 5L30 15L20 25L10 15L20 5Z"
              stroke="var(--accent-primary)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            <motion.path
              d="M20 10L25 15L20 20L15 15L20 10Z"
              fill="var(--accent-primary)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            />
            <motion.circle
              cx="20"
              cy="15"
              r="2"
              fill="var(--accent-secondary)"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, duration: 0.3 }}
            />
            <motion.path
              d="M10 20L20 30L30 20"
              stroke="var(--accent-secondary)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.8, duration: 1, ease: "easeInOut" }}
            />
          </svg>
          <span className={styles.logoText}>SimWork</span>
        </motion.div>

        <div className={styles.hamburger} onClick={toggleExpand}>
          <motion.div 
            className={`${styles.hamburgerLine} ${isExpanded ? styles.line1Expanded : ''}`}
            animate={{ rotate: isExpanded ? 45 : 0, y: isExpanded ? 8 : 0 }}
          />
          <motion.div 
            className={`${styles.hamburgerLine} ${isExpanded ? styles.line2Expanded : ''}`}
            animate={{ opacity: isExpanded ? 0 : 1 }}
          />
          <motion.div 
            className={`${styles.hamburgerLine} ${isExpanded ? styles.line3Expanded : ''}`}
            animate={{ rotate: isExpanded ? -45 : 0, y: isExpanded ? -8 : 0 }}
          />
        </div>

        <motion.div 
          className={styles.navLinks}
          initial={false}
          animate={{ 
            height: isExpanded ? 'auto' : '0',
            opacity: isExpanded ? 1 : 0,
            display: isExpanded ? 'flex' : 'none'
          }}
        >
          {navItems.map((item) => (
            <motion.div 
              key={item.path}
              className={styles.linkContainer}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href={item.path} className={styles.link}>
                <span 
                  className={`${activeLink === item.path ? styles.activeLink : ''}`}
                  onClick={() => {
                    setActiveLink(item.path);
                    if (window.innerWidth < 768) setIsExpanded(false);
                  }}
                >
                  {item.label}
                  {item.path === '/landing' && (
                    <motion.span 
                      className={styles.ctaHighlight}
                      animate={{ 
                        opacity: [0.5, 1, 0.5],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 2 
                      }}
                    />
                  )}
                </span>
              </Link>
              {activeLink === item.path && (
                <motion.div 
                  className={styles.activeIndicator}
                  layoutId="activeIndicator"
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 30 
                  }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default NavBar;
