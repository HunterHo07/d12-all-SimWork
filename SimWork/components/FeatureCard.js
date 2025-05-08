import { motion } from 'framer-motion';
import styles from '../styles/FeatureCard.module.css';

const FeatureCard = ({ title, description, icon, index }) => {
  return (
    <motion.div 
      className={styles.card}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.19, 1, 0.22, 1]
      }}
      whileHover={{ 
        y: -10,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(110, 31, 255, 0.5)'
      }}
    >
      <div className={styles.iconContainer}>
        <motion.div 
          className={styles.iconBg}
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut"
          }}
        />
        <span className={styles.icon}>{icon}</span>
      </div>
      
      <h3 className={styles.title}>{title}</h3>
      
      <p className={styles.description}>{description}</p>
      
      <motion.div 
        className={styles.hoverIndicator}
        initial={{ width: 0 }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default FeatureCard;
