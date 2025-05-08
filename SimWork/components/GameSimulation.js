import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/GameSimulation.module.css';

const GameSimulation = () => {
  const gameRef = useRef(null);
  const canvasRef = useRef(null);
  const [game, setGame] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentStation, setCurrentStation] = useState('main');
  const [character, setCharacter] = useState({
    name: 'Player',
    role: 'Developer',
    level: 1,
    experience: 0,
    questsCompleted: 0
  });
  const [activeQuest, setActiveQuest] = useState(null);
  const [questProgress, setQuestProgress] = useState(0);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalContent, setTerminalContent] = useState('');
  
  // Load Phaser dynamically on client-side
  useEffect(() => {
    let phaserGame;
    
    const loadPhaser = async () => {
      if (typeof window !== 'undefined') {
        try {
          // Import Phaser and game scene only on client-side
          const Phaser = (await import('phaser')).default;
          
          class SimWorkGame extends Phaser.Scene {
            constructor() {
              super('SimWorkGame');
              this.player = null;
              this.cursors = null;
              this.stations = [];
              this.characters = [];
            }
            
            preload() {
              // Load assets
              this.load.image('office-background', '/SimWork/office-background.png');
              this.load.image('player', '/SimWork/player-character.png');
              this.load.image('npc', '/SimWork/npc-character.png');
              this.load.image('desk', '/SimWork/desk.png');
              this.load.image('computer', '/SimWork/computer.png');
              this.load.image('dev-station', '/SimWork/dev-station.png');
              this.load.image('design-station', '/SimWork/design-station.png');
              this.load.image('data-station', '/SimWork/data-station.png');
              this.load.image('pm-station', '/SimWork/pm-station.png');
              this.load.image('ai-station', '/SimWork/ai-station.png');
            }
            
            create() {
              // Set world bounds
              this.physics.world.setBounds(0, 0, 1600, 1200);
              
              // Add background
              this.add.image(800, 600, 'office-background').setScale(1.5);
              
              // Create stations
              this.createStations();
              
              // Create NPCs
              this.createNPCs();
              
              // Create player
              this.player = this.physics.add.sprite(800, 600, 'player').setScale(0.8);
              this.player.setCollideWorldBounds(true);
              
              // Add colliders
              this.physics.add.collider(this.player, this.stations, this.handleStationCollision, null, this);
              
              // Setup camera
              this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
              this.cameras.main.setZoom(1.2);
              
              // Setup controls
              this.cursors = this.input.keyboard.createCursorKeys();
              
              // Handle custom station interaction
              this.input.keyboard.on('keydown-E', () => {
                this.checkStationInteraction();
              });
            }
            
            createStations() {
              // Create interactive stations
              const stationData = [
                { x: 500, y: 300, key: 'dev-station', name: 'developer' },
                { x: 1100, y: 300, key: 'design-station', name: 'designer' },
                { x: 500, y: 900, key: 'data-station', name: 'data' },
                { x: 800, y: 600, key: 'pm-station', name: 'project-manager' },
                { x: 1100, y: 900, key: 'ai-station', name: 'ai-engineer' }
              ];
              
              this.stations = this.physics.add.group();
              
              stationData.forEach(station => {
                const stationObj = this.stations.create(station.x, station.y, station.key).setScale(1.2);
                stationObj.name = station.name;
                stationObj.setImmovable(true);
                
                // Add interactive UI element above station
                const text = this.add.text(station.x, station.y - 70, `${this.capitalizeFirstLetter(station.name)}`, {
                  font: '16px Arial',
                  fill: '#ffffff',
                  backgroundColor: '#6e1fff',
                  padding: { x: 10, y: 5 }
                }).setOrigin(0.5);
                text.setVisible(false);
                
                // Store reference
                stationObj.text = text;
              });
            }
            
            createNPCs() {
              // Add some NPCs to make the world feel alive
              const npcPositions = [
                { x: 300, y: 400 },
                { x: 900, y: 200 },
                { x: 1200, y: 700 },
                { x: 600, y: 800 }
              ];
              
              this.characters = this.physics.add.group();
              
              npcPositions.forEach(pos => {
                const npc = this.characters.create(pos.x, pos.y, 'npc').setScale(0.7);
                // Random movement
                this.tweens.add({
                  targets: npc,
                  x: pos.x + Phaser.Math.Between(-100, 100),
                  y: pos.y + Phaser.Math.Between(-100, 100),
                  duration: Phaser.Math.Between(3000, 6000),
                  yoyo: true,
                  repeat: -1
                });
              });
              
              this.physics.add.collider(this.player, this.characters);
            }
            
            capitalizeFirstLetter(string) {
              return string.charAt(0).toUpperCase() + string.slice(1).replace(/-/g, ' ');
            }
            
            checkStationInteraction() {
              let playerBounds = this.player.getBounds();
              
              this.stations.getChildren().forEach(station => {
                let stationBounds = station.getBounds();
                
                if (Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, stationBounds)) {
                  // Signal to React that a station was interacted with
                  if (window.stationInteraction) {
                    window.stationInteraction(station.name);
                  }
                }
              });
            }
            
            handleStationCollision(player, station) {
              // Make text visible when near the station
              station.text.setVisible(true);
              
              // Hide text after 2 seconds
              this.time.delayedCall(2000, () => {
                station.text.setVisible(false);
              });
            }
            
            update() {
              if (!this.player) return;
              
              // Player movement
              const speed = 200;
              
              if (this.cursors.left.isDown) {
                this.player.setVelocityX(-speed);
              } else if (this.cursors.right.isDown) {
                this.player.setVelocityX(speed);
              } else {
                this.player.setVelocityX(0);
              }
              
              if (this.cursors.up.isDown) {
                this.player.setVelocityY(-speed);
              } else if (this.cursors.down.isDown) {
                this.player.setVelocityY(speed);
              } else {
                this.player.setVelocityY(0);
              }
            }
          }
          
          // Game config
          const config = {
            type: Phaser.AUTO,
            parent: gameRef.current,
            width: '100%',
            height: '100%',
            physics: {
              default: 'arcade',
              arcade: {
                gravity: { y: 0 },
                debug: false
              }
            },
            scene: [SimWorkGame],
            scale: {
              mode: Phaser.Scale.FIT,
              autoCenter: Phaser.Scale.CENTER_BOTH
            },
            transparent: true
          };
          
          // Initialize the game
          phaserGame = new Phaser.Game(config);
          
          // Create global function for station interaction
          window.stationInteraction = (stationName) => {
            setCurrentStation(stationName);
            setTerminalOpen(true);
            generateQuest(stationName);
          };
          
          // Save game instance
          setGame(phaserGame);
          
          // Add a delay to simulate loading
          setTimeout(() => {
            setIsLoading(false);
          }, 2000);
          
        } catch (error) {
          console.error("Failed to load Phaser:", error);
        }
      }
    };
    
    loadPhaser();
    
    // Cleanup function
    return () => {
      if (phaserGame) {
        phaserGame.destroy(true);
        window.stationInteraction = null;
      }
    };
  }, []);
  
  // Generate a quest based on station type
  const generateQuest = (stationType) => {
    const quests = {
      developer: [
        {
          title: "Debug the API Integration",
          description: "The frontend is failing to connect to our API. Find and fix the issue in the code below.",
          task: "// Fix the API call function\nconst fetchData = async () => {\n  try {\n    const response = await fetch('api/data');\n    return response.json();\n  } catchy(error) { // <-- Bug here\n    console.log(error);\n    return [];\n  }\n}",
          solution: "catch(error)",
          type: "code"
        },
        {
          title: "Optimize the Rendering Algorithm",
          description: "Our app is rendering too slowly. Improve the performance of this function.",
          task: "// Optimize this function\nfunction renderList(items) {\n  let result = '';\n  for (let i = 0; i < items.length; i++) {\n    result += '<div>' + items[i].name + '</div>';\n  }\n  document.getElementById('list').innerHTML = result;\n}",
          solution: "const fragment = document.createDocumentFragment();\nitems.forEach(item => {\n  const div = document.createElement('div');\n  div.textContent = item.name;\n  fragment.appendChild(div);\n});\ndocument.getElementById('list').appendChild(fragment);",
          type: "code"
        }
      ],
      designer: [
        {
          title: "Create a Responsive Header",
          description: "Design a responsive header that works on mobile and desktop.",
          task: "Create a header with logo, navigation, and a mobile menu button.",
          solution: "",
          type: "design"
        },
        {
          title: "Design a Call-to-Action Button",
          description: "We need an eye-catching CTA button for our landing page.",
          task: "Design a button with hover and active states that converts well.",
          solution: "",
          type: "design"
        }
      ],
      data: [
        {
          title: "Clean the Customer Dataset",
          description: "Our customer data has inconsistencies. Clean it up for analysis.",
          task: "Fix the missing values and standardize the format of phone numbers.",
          solution: "",
          type: "data"
        },
        {
          title: "Generate Monthly Sales Report",
          description: "The executives need a sales performance report for the last quarter.",
          task: "Aggregate the sales data by region and compare to previous quarter.",
          solution: "",
          type: "data"
        }
      ],
      "project-manager": [
        {
          title: "Sprint Planning",
          description: "Plan the next two-week sprint for the development team.",
          task: "Prioritize features and assign tasks to team members.",
          solution: "",
          type: "management"
        },
        {
          title: "Risk Assessment",
          description: "Identify potential risks for the upcoming product launch.",
          task: "Document risks, their likelihood, impact, and mitigation strategies.",
          solution: "",
          type: "management"
        }
      ],
      "ai-engineer": [
        {
          title: "Debug the Recommendation Algorithm",
          description: "Our product recommendations aren't relevant to users. Fix the algorithm.",
          task: "Identify why the recommendation engine is suggesting irrelevant products.",
          solution: "",
          type: "ai"
        },
        {
          title: "Optimize Model Training Pipeline",
          description: "Our model training is taking too long. Optimize the pipeline.",
          task: "Reduce model training time while maintaining accuracy.",
          solution: "",
          type: "ai"
        }
      ]
    };
    
    // Get random quest for current station
    const stationQuests = quests[stationType] || quests.developer;
    const randomQuestIndex = Math.floor(Math.random() * stationQuests.length);
    const selectedQuest = stationQuests[randomQuestIndex];
    
    setActiveQuest(selectedQuest);
    setQuestProgress(0);
    
    // Set terminal content based on quest type
    if (selectedQuest.type === 'code') {
      setTerminalContent(selectedQuest.task);
    } else {
      setTerminalContent(`Task: ${selectedQuest.task}\n\nEnter your solution below:`);
    }
  };
  
  const handleSubmitQuest = () => {
    // Simulate quest completion
    setQuestProgress(100);
    
    // Update character stats
    setCharacter(prev => ({
      ...prev,
      experience: prev.experience + 10,
      questsCompleted: prev.questsCompleted + 1,
      level: prev.experience >= prev.level * 20 ? prev.level + 1 : prev.level
    }));
    
    // Set feedback
    setTerminalContent(`Quest completed successfully! +10 XP\n\n${terminalContent}`);
    
    // Close terminal after delay
    setTimeout(() => {
      setTerminalOpen(false);
      setActiveQuest(null);
    }, 3000);
  };
  
  const closeTerminal = () => {
    setTerminalOpen(false);
  };
  
  const handleTerminalInputChange = (e) => {
    setTerminalContent(e.target.value);
    
    // Simulate progress
    const progress = Math.min(100, questProgress + 5);
    setQuestProgress(progress);
  };
  
  const renderStationInterface = () => {
    if (!activeQuest) return null;
    
    return (
      <div className={styles.questContainer}>
        <h3 className={styles.questTitle}>{activeQuest.title}</h3>
        <p className={styles.questDescription}>{activeQuest.description}</p>
        
        <div className={styles.progressContainer}>
          <div 
            className={styles.progressBar} 
            style={{ width: `${questProgress}%` }}
          ></div>
        </div>
        
        <div className={styles.terminalContainer}>
          <div className={styles.terminalHeader}>
            <span>SimWork Terminal</span>
            <button onClick={closeTerminal} className={styles.closeButton}>×</button>
          </div>
          
          <textarea 
            className={styles.terminalContent}
            value={terminalContent}
            onChange={handleTerminalInputChange}
          ></textarea>
          
          <div className={styles.terminalActions}>
            <button onClick={handleSubmitQuest} className={styles.submitButton}>
              Submit Solution
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className={styles.gameContainer}>
      {isLoading ? (
        <div className={styles.loadingScreen}>
          <h2>Loading Simulation...</h2>
          <div className={styles.loadingBar}>
            <div className={styles.loadingProgress}></div>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.gameHeader}>
            <div className={styles.characterInfo}>
              <span className={styles.characterName}>{character.name}</span>
              <span className={styles.characterRole}>{character.role}</span>
            </div>
            
            <div className={styles.statsContainer}>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>LVL</span>
                <span className={styles.statValue}>{character.level}</span>
              </div>
              
              <div className={styles.statItem}>
                <span className={styles.statLabel}>XP</span>
                <span className={styles.statValue}>{character.experience}/{character.level * 20}</span>
              </div>
              
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Quests</span>
                <span className={styles.statValue}>{character.questsCompleted}</span>
              </div>
            </div>
            
            <div className={styles.controls}>
              <div className={styles.controlItem}>
                <span className={styles.key}>↑↓←→</span>
                <span className={styles.action}>Move</span>
              </div>
              
              <div className={styles.controlItem}>
                <span className={styles.key}>E</span>
                <span className={styles.action}>Interact</span>
              </div>
            </div>
          </div>
          
          <div className={styles.gameWorld} ref={gameRef}>
            <canvas ref={canvasRef}></canvas>
          </div>
          
          {terminalOpen && (
            <motion.div 
              className={styles.stationInterface}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
            >
              {renderStationInterface()}
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default GameSimulation;
