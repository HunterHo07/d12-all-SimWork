# SimWork Development Guide

## Tech Stack

SimWork is built with modern, cutting-edge technologies:

- **Next.js**: React framework for server-rendered applications
- **Phaser 3**: HTML5 game framework for 2.5D simulation
- **GSAP**: Advanced animation library for cinematic effects
- **Framer Motion**: UI animation library for smooth transitions
- **Three.js**: 3D rendering for immersive elements
- **React Hooks**: State management and component lifecycle
- **CSS Modules**: Component-scoped styling

## Project Structure

```
SimWork/
├── components/       # Reusable UI components
├── pages/            # Next.js pages and routes
├── public/           # Static assets and images
├── styles/           # CSS modules and global styles
├── data/             # Dummy data and simulation scenarios
├── hooks/            # Custom React hooks
├── contexts/         # React context providers
├── lib/              # Utility functions
└── animations/       # Animation definitions
```

## Core Features

### 1. 2.5D Office Simulation

The Phaser-powered simulation includes:
- Character movement with keyboard controls
- Interactive stations for different professional roles
- NPC characters with randomized movement
- Collision detection for station interaction

### 2. Quest System

Dynamically generates role-specific tasks:
- Developer: Code debugging and optimization
- Designer: UI/UX creation challenges
- Data Analyst: Data cleaning and visualization
- Project Manager: Planning and risk assessment
- AI Engineer: Algorithm debugging and optimization

### 3. Analytics Dashboard

Tracks user performance across multiple metrics:
- Task completion time
- Accuracy and quality
- Learning progression
- Skill strengths and gaps

## How to Use

### Local Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Export static site
npm run build

# Deploy to GitHub Pages
npm run deploy
```

### Adding New Content

#### Creating a New Quest

Quests are defined in the `data/quests.js` file and follow this structure:

```javascript
{
  title: "Quest Title",
  description: "Quest description",
  role: "developer", // or designer, data, project-manager, ai-engineer
  difficulty: 2, // 1-5 scale
  task: "Task details or code to debug",
  solution: "Expected solution",
  timeLimit: 300 // in seconds
}
```

#### Adding a New Station

Stations are defined in the `GameSimulation.js` component:

```javascript
const stationData = [
  { 
    x: 500, // x position in game world
    y: 300, // y position in game world
    key: 'station-sprite-key', 
    name: 'station-name'
  }
]
```

## Phased Rollout - Future Development

### Phase 2: Enhanced Simulation

- Native desktop and mobile applications
- Expanded role scenarios (20+ per role)
- User profiles with skill trees
- Social features and leaderboards

### Phase 3: Advanced Immersion

- VR/AR integration
- Multiplayer cooperation scenarios
- Enterprise-specific modules
- Integration with HR systems

### Phase 4: Platform Ecosystem

- API for custom quest creation
- Marketplace for industry-specific simulations
- Integration with learning management systems
- Certification pathways
