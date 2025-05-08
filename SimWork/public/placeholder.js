// This file ensures placeholder images work properly
// The placeholder images were created earlier as empty files
// In a production environment, these would be replaced with actual image assets

// Helper to create data URLs for placeholder images with colors and text
export function createPlaceholderUrl(width, height, text, color) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  // Fill background
  ctx.fillStyle = color || '#121225';
  ctx.fillRect(0, 0, width, height);
  
  // Add grid pattern
  ctx.strokeStyle = 'rgba(110, 31, 255, 0.2)';
  ctx.lineWidth = 1;
  
  // Horizontal lines
  for (let y = 20; y < height; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  
  // Vertical lines
  for (let x = 20; x < width; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  
  // Add text
  if (text) {
    ctx.font = 'bold 16px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, width / 2, height / 2);
  }
  
  return canvas.toDataURL('image/png');
}

// For server-side rendering, we need to make sure this doesn't run during build
export function initPlaceholders() {
  if (typeof window === 'undefined') return;
  
  // Only run if we detect empty images
  const checkAndReplacePlaceholders = () => {
    const placeholders = {
      '/SimWork/noise.webp': createPlaceholderUrl(200, 200, null, '#000000'),
      '/SimWork/office-background.png': createPlaceholderUrl(800, 600, 'Office Background', '#0a0a18'),
      '/SimWork/player-character.png': createPlaceholderUrl(100, 100, 'Player', '#6e1fff'),
      '/SimWork/npc-character.png': createPlaceholderUrl(100, 100, 'NPC', '#00ffbb'),
      '/SimWork/desk.png': createPlaceholderUrl(150, 80, 'Desk', '#1a1a32'),
      '/SimWork/computer.png': createPlaceholderUrl(100, 100, 'Computer', '#1a1a32'),
      '/SimWork/dev-station.png': createPlaceholderUrl(200, 120, 'Developer Station', '#1a1a32'),
      '/SimWork/design-station.png': createPlaceholderUrl(200, 120, 'Design Station', '#1a1a32'),
      '/SimWork/data-station.png': createPlaceholderUrl(200, 120, 'Data Station', '#1a1a32'),
      '/SimWork/pm-station.png': createPlaceholderUrl(200, 120, 'PM Station', '#1a1a32'),
      '/SimWork/ai-station.png': createPlaceholderUrl(200, 120, 'AI Station', '#1a1a32'),
      '/SimWork/demo-step1.webp': createPlaceholderUrl(800, 450, 'Character Creation', '#121225'),
      '/SimWork/demo-step2.webp': createPlaceholderUrl(800, 450, 'Office Navigation', '#121225'),
      '/SimWork/demo-step3.webp': createPlaceholderUrl(800, 450, 'Skill Challenges', '#121225'),
      '/SimWork/demo-step4.webp': createPlaceholderUrl(800, 450, 'Real-time Feedback', '#121225'),
      '/SimWork/demo-step5.webp': createPlaceholderUrl(800, 450, 'Skill Progression', '#121225')
    };
    
    // Check for images with 0 bytes (our empty placeholder files)
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      const src = img.getAttribute('src');
      if (src && placeholders[src]) {
        // If image failed to load or has no dimensions, replace with our placeholder
        if (img.naturalWidth === 0 || img.complete === false) {
          img.src = placeholders[src];
        }
      }
    });
  };
  
  // Run on load and periodically after
  window.addEventListener('load', checkAndReplacePlaceholders);
  setInterval(checkAndReplacePlaceholders, 1000);
}
