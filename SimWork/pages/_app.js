import { useState, useEffect } from 'react';
import '../styles/globals.css';
import Head from 'next/head';
import RedirectHandler from '../components/RedirectHandler';

// Dynamic import for client-side only code
let placeholderUtils = { initPlaceholders: () => {} };
if (typeof window !== 'undefined') {
  import('../public/placeholder.js').then(module => {
    placeholderUtils = module;
  });
}

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [trails, setTrails] = useState([]);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined' || !document) return;

    const updatePosition = (e) => {
      if (!e) return;
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
      
      setTrails(prev => {
        const newTrail = { id: Date.now(), x: e.clientX, y: e.clientY };
        const updatedTrails = [...prev, newTrail].slice(-10);
        return updatedTrails;
      });
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);

    // Safe add event listeners with null checks
    if (document) {
      document.addEventListener('mousemove', updatePosition);
      document.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mouseleave', handleMouseLeave);
      document.addEventListener('mouseenter', handleMouseEnter);
    }

    return () => {
      // Safe remove event listeners with null checks
      if (document) {
        document.removeEventListener('mousemove', updatePosition);
        document.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('mouseleave', handleMouseLeave);
        document.removeEventListener('mouseenter', handleMouseEnter);
      }
    };
  }, []);

  const trailsElements = trails.map((trail, index) => (
    <div
      key={trail.id}
      className="cursor-trail"
      style={{
        left: trail.x,
        top: trail.y,
        opacity: (index / trails.length) * 0.7,
      }}
    />
  ));

  return (
    <>
      {!hidden && (
        <>
          {trailsElements}
          <div
            className="custom-cursor"
            style={{
              left: position.x,
              top: position.y,
              width: clicked ? '15px' : '20px',
              height: clicked ? '15px' : '20px',
            }}
          />
        </>
      )}
    </>
  );
}

function MyApp({ Component, pageProps }) {
  // Initialize placeholders for empty images
  useEffect(() => {
    // Initialize placeholders after component mounts
    if (typeof placeholderUtils.initPlaceholders === 'function') {
      placeholderUtils.initPlaceholders();
    }
    
    // Pre-load critical images
    const criticalImages = [
      '/d12-all-SimWork/office-background.png',
      '/d12-all-SimWork/player-character.png',
      '/d12-all-SimWork/npc-character.png',
      '/d12-all-SimWork/dev-station.png',
      '/d12-all-SimWork/design-station.png',
      '/d12-all-SimWork/data-station.png',
      '/d12-all-SimWork/pm-station.png',
      '/d12-all-SimWork/ai-station.png',
    ];
    
    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <>
      <Head>
        <title>SimWork - Future of Work Simulation</title>
        <meta name="description" content="AI-driven, immersive 'future of work' game" />
        <link rel="icon" href="/d12-all-SimWork/favicon.webp" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="noise-overlay" />
      <CustomCursor />
      <RedirectHandler>
        <Component {...pageProps} />
      </RedirectHandler>
    </>
  );
}

export default MyApp;
