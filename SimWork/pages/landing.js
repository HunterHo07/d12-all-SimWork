import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import NavBar from '../components/NavBar';
import styles from '../styles/Landing.module.css';

export default function Landing() {
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    interest: 'individual'
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [countdown, setCountdown] = useState({ days: 7, hours: 23, minutes: 59, seconds: 59 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Update countdown timer
    const interval = setInterval(() => {
      if (countdown.seconds > 0) {
        setCountdown({...countdown, seconds: countdown.seconds - 1});
      } else if (countdown.minutes > 0) {
        setCountdown({...countdown, minutes: countdown.minutes - 1, seconds: 59});
      } else if (countdown.hours > 0) {
        setCountdown({...countdown, hours: countdown.hours - 1, minutes: 59, seconds: 59});
      } else if (countdown.days > 0) {
        setCountdown({...countdown, days: countdown.days - 1, hours: 23, minutes: 59, seconds: 59});
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [countdown]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.email) {
      setFormError('Please fill in all required fields');
      return;
    }
    
    if (!formData.email.includes('@')) {
      setFormError('Please enter a valid email address');
      return;
    }
    
    // In a real app we would send this data to an API
    // For this demo, we'll simulate success and store in localStorage
    const signups = JSON.parse(localStorage.getItem('simwork_signups') || '[]');
    signups.push({
      ...formData,
      date: new Date().toISOString(),
      id: `user_${Date.now()}`
    });
    localStorage.setItem('simwork_signups', JSON.stringify(signups));
    
    // Show success state
    setFormSubmitted(true);
    setFormError('');
  };

  const benefits = [
    {
      title: "Early Access",
      description: "Be the first to experience SimWork before public release.",
      icon: "🔑"
    },
    {
      title: "Premium Features",
      description: "Get premium features free for 6 months when launched.",
      icon: "⭐"
    },
    {
      title: "Founder's Club",
      description: "Exclusive community access with direct product influence.",
      icon: "👑"
    },
    {
      title: "Lifetime Discount",
      description: "Lock in a 25% lifetime discount on any subscription tier.",
      icon: "💰"
    }
  ];

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
        <title>Join SimWork - Early Access</title>
        <meta name="description" content="Sign up for early access to SimWork and get exclusive benefits" />
      </Head>

      <div className={styles.container}>
        <NavBar />
        
        <div className={styles.content}>
          <section className={styles.heroSection}>
            <motion.div 
              className={styles.heroLeft}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className={styles.title}>
                Transform Your Work Skills with SimWork
              </h1>
              
              <p className={styles.subtitle}>
                Join our early access program and be the first to experience the future of professional skill development.
              </p>
              
              <div className={styles.countdownContainer}>
                <p>Early Access Begins In:</p>
                
                <div className={styles.countdown}>
                  <div className={styles.countdownItem}>
                    <span className={styles.countdownValue}>{countdown.days}</span>
                    <span className={styles.countdownLabel}>Days</span>
                  </div>
                  
                  <div className={styles.countdownItem}>
                    <span className={styles.countdownValue}>{countdown.hours}</span>
                    <span className={styles.countdownLabel}>Hours</span>
                  </div>
                  
                  <div className={styles.countdownItem}>
                    <span className={styles.countdownValue}>{countdown.minutes}</span>
                    <span className={styles.countdownLabel}>Minutes</span>
                  </div>
                  
                  <div className={styles.countdownItem}>
                    <span className={styles.countdownValue}>{countdown.seconds}</span>
                    <span className={styles.countdownLabel}>Seconds</span>
                  </div>
                </div>
              </div>
              
              <motion.div 
                className={styles.benefitsGrid}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {benefits.map((benefit, index) => (
                  <motion.div 
                    key={index}
                    className={styles.benefitItem}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                  >
                    <div className={styles.benefitIcon}>{benefit.icon}</div>
                    <div className={styles.benefitContent}>
                      <h3>{benefit.title}</h3>
                      <p>{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            
            <motion.div 
              className={styles.heroRight}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {formSubmitted ? (
                <div className={styles.successMessage}>
                  <div className={styles.successIcon}>✓</div>
                  <h2>You're In!</h2>
                  <p>Thanks for joining our early access program, {formData.name}!</p>
                  <p>We'll be in touch with next steps soon.</p>
                  <motion.div 
                    className={styles.codeContainer}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <p className={styles.codeLabel}>Your Early Access Code:</p>
                    <p className={styles.accessCode}>SIMWORK-{Math.random().toString(36).substring(2, 8).toUpperCase()}</p>
                    <p className={styles.codeSave}>Save this code! You'll need it to activate your benefits.</p>
                  </motion.div>
                </div>
              ) : (
                <div className={styles.formContainer}>
                  <div className={styles.formHeader}>
                    <h2>Sign Up for Early Access</h2>
                    <p>Limited spots available - join the waitlist today!</p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className={styles.form}>
                    {formError && (
                      <div className={styles.errorMessage}>{formError}</div>
                    )}
                    
                    <div className={styles.formGroup}>
                      <label htmlFor="name">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label htmlFor="company">Company/Organization</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Where do you work? (optional)"
                      />
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label htmlFor="role">Your Role</label>
                      <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                      >
                        <option value="">Select your role (optional)</option>
                        <option value="developer">Developer/Engineer</option>
                        <option value="designer">Designer</option>
                        <option value="product-manager">Product Manager</option>
                        <option value="data-analyst">Data Analyst</option>
                        <option value="ai-engineer">AI Engineer</option>
                        <option value="hr">HR/Recruitment</option>
                        <option value="executive">Executive</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label>I'm interested in:</label>
                      <div className={styles.radioGroup}>
                        <label className={styles.radioLabel}>
                          <input
                            type="radio"
                            name="interest"
                            value="individual"
                            checked={formData.interest === 'individual'}
                            onChange={handleInputChange}
                          />
                          <span>Individual Use</span>
                        </label>
                        
                        <label className={styles.radioLabel}>
                          <input
                            type="radio"
                            name="interest"
                            value="team"
                            checked={formData.interest === 'team'}
                            onChange={handleInputChange}
                          />
                          <span>Team Use</span>
                        </label>
                        
                        <label className={styles.radioLabel}>
                          <input
                            type="radio"
                            name="interest"
                            value="enterprise"
                            checked={formData.interest === 'enterprise'}
                            onChange={handleInputChange}
                          />
                          <span>Enterprise</span>
                        </label>
                      </div>
                    </div>
                    
                    <button type="submit" className={styles.submitButton}>
                      Reserve My Spot
                    </button>
                    
                    <p className={styles.formDisclaimer}>
                      By signing up, you agree to receive updates about SimWork. 
                      We respect your privacy and will never share your information.
                    </p>
                  </form>
                </div>
              )}
            </motion.div>
          </section>
          
          <section className={styles.testimonialsSection}>
            <h2 className={styles.sectionTitle}>What Early Testers Are Saying</h2>
            
            <div className={styles.testimonialGrid}>
              <motion.div 
                className={styles.testimonialCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className={styles.testimonialContent}>
                  <p>"SimWork completely transformed how our team approaches skill development. The immersive environment makes training feel like a game, not a chore."</p>
                </div>
                
                <div className={styles.testimonialAuthor}>
                  <div className={styles.testimonialAvatar} style={{ backgroundColor: '#6e1fff' }}>JD</div>
                  <div className={styles.testimonialInfo}>
                    <p className={styles.testimonialName}>Jane Doe</p>
                    <p className={styles.testimonialRole}>CTO, TechCorp</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className={styles.testimonialCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className={styles.testimonialContent}>
                  <p>"The multi-role approach is brilliant. I can train different skill sets in one platform rather than juggling multiple training programs."</p>
                </div>
                
                <div className={styles.testimonialAuthor}>
                  <div className={styles.testimonialAvatar} style={{ backgroundColor: '#00ffbb' }}>AS</div>
                  <div className={styles.testimonialInfo}>
                    <p className={styles.testimonialName}>Alex Smith</p>
                    <p className={styles.testimonialRole}>Learning Director, InnovateCo</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className={styles.testimonialCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className={styles.testimonialContent}>
                  <p>"The real-time analytics completely changed how we evaluate training effectiveness. Now we can see exactly where improvements are needed."</p>
                </div>
                
                <div className={styles.testimonialAuthor}>
                  <div className={styles.testimonialAvatar} style={{ backgroundColor: '#ff3a5e' }}>MP</div>
                  <div className={styles.testimonialInfo}>
                    <p className={styles.testimonialName}>Maria Perez</p>
                    <p className={styles.testimonialRole}>HR Manager, GlobalFirm</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
          
          <section className={styles.faqSection}>
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
            
            <div className={styles.faqGrid}>
              <div className={styles.faqItem}>
                <h3>When will SimWork be available?</h3>
                <p>Early access begins in one week. Public launch is scheduled for Q3 2025.</p>
              </div>
              
              <div className={styles.faqItem}>
                <h3>What kind of hardware do I need?</h3>
                <p>SimWork runs in any modern web browser. No downloads or special hardware required.</p>
              </div>
              
              <div className={styles.faqItem}>
                <h3>Can I cancel my subscription anytime?</h3>
                <p>Yes, all subscriptions can be canceled anytime with no penalty.</p>
              </div>
              
              <div className={styles.faqItem}>
                <h3>How is my data protected?</h3>
                <p>We employ end-to-end encryption and never share your performance data.</p>
              </div>
              
              <div className={styles.faqItem}>
                <h3>Can I use SimWork for hiring?</h3>
                <p>Yes! Many companies use SimWork as part of their technical assessment process.</p>
              </div>
              
              <div className={styles.faqItem}>
                <h3>Is there a demo available?</h3>
                <p>Early access members will get exclusive access to the full platform. You can view our demo page now.</p>
              </div>
            </div>
          </section>
          
          <section className={styles.ctaSection}>
            <h2>Don't miss your chance to be first</h2>
            <p>Limited early access spots available. Sign up today!</p>
            <button 
              className={styles.ctaButton}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Get Early Access
            </button>
          </section>
        </div>
      </div>
    </>
  );
}
