import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Head from 'next/head';
import NavBar from '../components/NavBar';
import styles from '../styles/WhyUs.module.css';

const competitors = [
  {
    name: "TrainingVR",
    price: "$99/month",
    yearFounded: 2019,
    limitations: ["VR hardware required", "Limited to soft skills only", "No data analytics"],
    color: "#FF4560"
  },
  {
    name: "LearnQuest",
    price: "$49/month",
    yearFounded: 2015,
    limitations: ["Video courses only", "No practical assessment", "Generic feedback"],
    color: "#00E396"
  },
  {
    name: "SkillSimulator",
    price: "$79/month",
    yearFounded: 2020,
    limitations: ["Single role scenarios", "Predictable challenges", "Limited tools"],
    color: "#FEB019"
  },
  {
    name: "TechTrainer",
    price: "$149/month",
    yearFounded: 2018,
    limitations: ["Tech roles only", "Expensive enterprise focus", "No gamification"],
    color: "#775DD0"
  }
];

const advantages = [
  {
    title: "Multi-Role Training",
    description: "Unlike single-focus platforms, SimWork trains multiple professional skills in one ecosystem.",
    icon: "🌐",
    metric: "5× more skills per subscription",
    color: "var(--accent-primary)"
  },
  {
    title: "Authentic Tool Integration",
    description: "Real terminals, design surfaces, and data tools embedded directly into gameplay.",
    icon: "⚙️",
    metric: "93% skill transfer to real environments",
    color: "#00C4FF"
  },
  {
    title: "AI-Powered Adaptivity",
    description: "Dynamic difficulty adjustment based on user performance and learning patterns.",
    icon: "🧠",
    metric: "2.7× faster competency achievement",
    color: "#FF3A5E"
  },
  {
    title: "Immersive Experience",
    description: "Cinematic, game-like environment that drives engagement and completion.",
    icon: "🎮",
    metric: "87% course completion vs. 23% industry average",
    color: "#FFC107"
  },
  {
    title: "Comprehensive Analytics",
    description: "Real-time performance tracking with actionable insights for users and managers.",
    icon: "📊",
    metric: "42% reduction in unnecessary training costs",
    color: "#8BC34A"
  },
  {
    title: "Cost Effective",
    description: "One subscription covers multiple skill domains instead of separate training tools.",
    icon: "💰",
    metric: "68% lower total training cost",
    color: "#9C27B0"
  }
];

export default function WhyUs() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 0.8, 0.8, 0.6]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
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
        <title>Why Choose SimWork - Future of Work Simulation</title>
        <meta name="description" content="See why SimWork outperforms other training and simulation platforms" />
      </Head>
      
      <div className={styles.container} ref={containerRef}>
        <NavBar />
        
        <motion.div 
          className={styles.parallaxBackground}
          style={{ 
            y: backgroundY,
            opacity
          }}
        />
        
        <div className={styles.content}>
          <motion.section 
            className={styles.heroSection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className={styles.title}
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Why Choose SimWork?
            </motion.h1>
            
            <motion.p 
              className={styles.subtitle}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              The next generation of professional skill development
            </motion.p>
          </motion.section>
          
          <section className={styles.comparisonSection}>
            <motion.h2 
              className={styles.sectionTitle}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              SimWork vs. The Competition
            </motion.h2>
            
            <div className={styles.competitorGrid}>
              <div className={`${styles.competitorCard} ${styles.ourCard}`}>
                <div className={styles.competitorHeader}>
                  <h3>SimWork</h3>
                  <span className={styles.price}>$29/month</span>
                  <span className={styles.year}>Founded 2025</span>
                </div>
                
                <div className={styles.features}>
                  <span className={styles.feature}>✓ Multi-role training</span>
                  <span className={styles.feature}>✓ Real tools integration</span>
                  <span className={styles.feature}>✓ Adaptive AI challenges</span>
                  <span className={styles.feature}>✓ Immersive environment</span>
                  <span className={styles.feature}>✓ Comprehensive analytics</span>
                  <span className={styles.feature}>✓ Browser-based (no installs)</span>
                </div>
                
                <div className={styles.spotlight}>
                  <span>Our Spotlight</span>
                </div>
              </div>
              
              {competitors.map((competitor, index) => (
                <motion.div 
                  key={index}
                  className={styles.competitorCard}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <div 
                    className={styles.competitorHeader}
                    style={{ background: `linear-gradient(135deg, ${competitor.color}, transparent)` }}
                  >
                    <h3>{competitor.name}</h3>
                    <span className={styles.price}>{competitor.price}</span>
                    <span className={styles.year}>Founded {competitor.yearFounded}</span>
                  </div>
                  
                  <div className={styles.limitations}>
                    {competitor.limitations.map((limitation, i) => (
                      <span key={i} className={styles.limitation}>✕ {limitation}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
          
          <section className={styles.advantagesSection}>
            <motion.h2 
              className={styles.sectionTitle}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Our Competitive Edge
            </motion.h2>
            
            <div className={styles.advantagesGrid}>
              {advantages.map((advantage, index) => (
                <motion.div 
                  key={index}
                  className={styles.advantageCard}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)' }}
                >
                  <div 
                    className={styles.advantageIcon}
                    style={{ background: `linear-gradient(135deg, ${advantage.color}, transparent)` }}
                  >
                    <span>{advantage.icon}</span>
                  </div>
                  
                  <h3 className={styles.advantageTitle}>{advantage.title}</h3>
                  <p className={styles.advantageDescription}>{advantage.description}</p>
                  
                  <div className={styles.metric}>
                    <span className={styles.metricValue}>{advantage.metric}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
          
          <section className={styles.pricingSection}>
            <motion.h2 
              className={styles.sectionTitle}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Unmatched Value
            </motion.h2>
            
            <div className={styles.pricingContainer}>
              <motion.div 
                className={styles.pricingCard}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className={styles.pricingHeader}>
                  <h3>Individual</h3>
                  <div className={styles.pricingAmount}>$29</div>
                  <div className={styles.pricingPeriod}>per month</div>
                </div>
                
                <ul className={styles.pricingFeatures}>
                  <li>Full access to all role simulations</li>
                  <li>Personal skills dashboard</li>
                  <li>500 challenges per month</li>
                  <li>Basic performance analytics</li>
                </ul>
                
                <a href="/landing" className={styles.pricingButton}>Get Started</a>
              </motion.div>
              
              <motion.div 
                className={`${styles.pricingCard} ${styles.featuredPricing}`}
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className={styles.pricingBadge}>Most Popular</div>
                <div className={styles.pricingHeader}>
                  <h3>Team</h3>
                  <div className={styles.pricingAmount}>$199</div>
                  <div className={styles.pricingPeriod}>per month</div>
                  <div className={styles.pricingSubtext}>Up to 10 users</div>
                </div>
                
                <ul className={styles.pricingFeatures}>
                  <li>All Individual features</li>
                  <li>Team performance dashboard</li>
                  <li>Unlimited challenges</li>
                  <li>Advanced analytics & reports</li>
                  <li>Customizable role scenarios</li>
                </ul>
                
                <a href="/landing" className={styles.pricingButton}>Get Started</a>
              </motion.div>
              
              <motion.div 
                className={styles.pricingCard}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className={styles.pricingHeader}>
                  <h3>Enterprise</h3>
                  <div className={styles.pricingAmount}>Custom</div>
                  <div className={styles.pricingPeriod}>pricing</div>
                </div>
                
                <ul className={styles.pricingFeatures}>
                  <li>All Team features</li>
                  <li>White-labeled platform</li>
                  <li>Custom scenario development</li>
                  <li>API integrations</li>
                  <li>Dedicated support manager</li>
                </ul>
                
                <a href="/landing" className={styles.pricingButton}>Contact Sales</a>
              </motion.div>
            </div>
          </section>
          
          <section className={styles.ctaSection}>
            <motion.div 
              className={styles.ctaContainer}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2>Ready to transform your training experience?</h2>
              <p>Join SimWork today and experience the future of professional skill development.</p>
              <a href="/landing" className={styles.ctaButton}>Sign Up Now</a>
            </motion.div>
          </section>
        </div>
      </div>
    </>
  );
}
