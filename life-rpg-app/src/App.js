import React, { useState, useEffect } from 'react';
import './App.css';

// Component imports
import Home from './components/Home';
import Quests from './components/Quests';
import Calendar from './components/Calendar';
import Wars from './components/Wars';
import Weapons from './components/Weapons';
import Stats from './components/Stats';
import Titles from './components/Titles';

// Initial data
const initialPlayerData = {
  level: 1,
  xp: 0,
  stats: {
    health: 10,
    brain: 10,
    discipline: 10,
    social: 10,
    combat: 10,
    wealth: 10,
    wisdom: 10
  },
  questsCompleted: 0,
  warsCompleted: 0,
  titlesEarned: 0
};

const initialQuests = [
  {
    id: 1,
    title: "Morning Exercise",
    category: "daily",
    difficulty: "easy",
    manualXP: null,
    xp: 5,
    stat: "health",
    repeatCycle: "daily",
    date: new Date().toISOString().split('T')[0],
    completed: false
  },
  {
    id: 2,
    title: "Read for 30 minutes",
    category: "daily",
    difficulty: "medium",
    manualXP: null,
    xp: 10,
    stat: "brain",
    repeatCycle: "daily",
    date: new Date().toISOString().split('T')[0],
    completed: false
  },
  {
    id: 3,
    title: "Complete React Project",
    category: "side",
    difficulty: "hard",
    manualXP: null,
    xp: 15,
    stat: "brain",
    repeatCycle: "none",
    date: new Date().toISOString().split('T')[0],
    completed: false
  },
  {
    id: 4,
    title: "Deep Work Session",
    category: "3days",
    difficulty: "special",
    manualXP: 25,
    xp: 25,
    stat: "brain",
    repeatCycle: "3days",
    date: new Date().toISOString().split('T')[0],
    completed: false
  }
];

const initialWars = [
  {
    id: 1,
    title: "Master Web Development",
    description: "Complete a comprehensive web development course and build 3 projects",
    rewardTitle: "Code Warrior",
    progress: 0,
    completed: false,
    quests: [
      { id: 1, title: "Complete HTML/CSS Course", difficulty: "medium", xp: 10, stat: "brain", completed: false },
      { id: 2, title: "Build Portfolio Website", difficulty: "hard", xp: 15, stat: "brain", completed: false },
      { id: 3, title: "Learn React Framework", difficulty: "badass", xp: 20, stat: "brain", completed: false }
    ],
    weapons: [],
    weaponsNeeded: [1, 2],
    strategy: "Focus on hands-on projects while learning theory. Practice daily coding."
  }
];

const initialWeapons = [
  {
    id: 1,
    name: "JavaScript Mastery",
    type: "skill",
    description: "Advanced knowledge of JavaScript programming language",
    strengths: "Problem solving, web development, automation",
    weakness: "Can be overwhelming for beginners",
    bestUse: "Building interactive web applications and solving complex programming challenges",
    obtained: true
  },
  {
    id: 2,
    name: "Morning Routine",
    type: "ability",
    description: "Consistent 6 AM wake-up with exercise and meditation",
    strengths: "Discipline, energy boost, mental clarity",
    weakness: "Requires early sleep schedule",
    bestUse: "Starting each day with maximum energy and focus",
    obtained: true
  },
  {
    id: 3,
    name: "React Framework",
    type: "skill",
    description: "Modern React development skills with hooks and state management",
    strengths: "Component-based architecture, reusable code, modern UI development",
    weakness: "Steep learning curve, frequent updates",
    bestUse: "Building dynamic, interactive web applications",
    obtained: false
  }
];

const initialTitles = [
  { id: 1, name: "Novice", description: "Starting your journey", unlocked: true, type: "level", requirement: 1 },
  { id: 2, name: "Apprentice", description: "Growing in power", unlocked: false, type: "level", requirement: 5 },
  { id: 3, name: "Knight", description: "A warrior of discipline", unlocked: false, type: "level", requirement: 10 },
  { id: 4, name: "Master", description: "True mastery achieved", unlocked: false, type: "level", requirement: 20 },
  { id: 5, name: "Code Warrior", description: "Mastered web development", unlocked: false, type: "war", requirement: "Master Web Development" }
];

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [playerData, setPlayerData] = useState(() => {
    const saved = localStorage.getItem('lifeRpgPlayer');
    return saved ? JSON.parse(saved) : initialPlayerData;
  });
  const [quests, setQuests] = useState(() => {
    const saved = localStorage.getItem('lifeRpgQuests');
    return saved ? JSON.parse(saved) : initialQuests;
  });
  const [wars, setWars] = useState(() => {
    const saved = localStorage.getItem('lifeRpgWars');
    return saved ? JSON.parse(saved) : initialWars;
  });
  const [weapons, setWeapons] = useState(() => {
    const saved = localStorage.getItem('lifeRpgWeapons');
    return saved ? JSON.parse(saved) : initialWeapons;
  });
  const [titles, setTitles] = useState(() => {
    const saved = localStorage.getItem('lifeRpgTitles');
    return saved ? JSON.parse(saved) : initialTitles;
  });
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('lifeRpgPlayer', JSON.stringify(playerData));
  }, [playerData]);

  useEffect(() => {
    localStorage.setItem('lifeRpgQuests', JSON.stringify(quests));
  }, [quests]);

  useEffect(() => {
    localStorage.setItem('lifeRpgWars', JSON.stringify(wars));
  }, [wars]);

  useEffect(() => {
    localStorage.setItem('lifeRpgWeapons', JSON.stringify(weapons));
  }, [weapons]);

  useEffect(() => {
    localStorage.setItem('lifeRpgTitles', JSON.stringify(titles));
  }, [titles]);

  // Check for level up
  useEffect(() => {
    const requiredXP = playerData.level * 100;
    if (playerData.xp >= requiredXP) {
      const newLevel = playerData.level + 1;
      setPlayerData(prev => ({
        ...prev,
        level: newLevel,
        xp: prev.xp - requiredXP
      }));
      setShowLevelUpModal(true);
      
      // Check for level-based title unlocks
      setTitles(prev => prev.map(title => {
        if (title.type === 'level' && title.requirement <= newLevel) {
          return { ...title, unlocked: true };
        }
        return title;
      }));
    }
  }, [playerData.xp, playerData.level]);

  // Update titles earned count
  useEffect(() => {
    const unlockedCount = titles.filter(title => title.unlocked).length;
    setPlayerData(prev => ({
      ...prev,
      titlesEarned: unlockedCount
    }));
  }, [titles]);

  const completeQuest = (questId, isWarQuest = false, warId = null) => {
    if (isWarQuest) {
      setWars(prev => prev.map(war => {
        if (war.id === warId) {
          const updatedQuests = war.quests.map(q => 
            q.id === questId ? { ...q, completed: true } : q
          );
          const completedCount = updatedQuests.filter(q => q.completed).length;
          const progress = (completedCount / updatedQuests.length) * 100;
          const isWarCompleted = progress === 100;
          
          if (isWarCompleted && !war.completed) {
            // Unlock war reward title
            setTitles(prevTitles => prevTitles.map(title => {
              if (title.name === war.rewardTitle) {
                return { ...title, unlocked: true };
              }
              return title;
            }));
            
            // Update wars completed count
            setPlayerData(prevPlayer => ({
              ...prevPlayer,
              warsCompleted: prevPlayer.warsCompleted + 1
            }));
          }
          
          return {
            ...war,
            quests: updatedQuests,
            progress,
            completed: isWarCompleted
          };
        }
        return war;
      }));
    } else {
      let completedQuest = null;
      setQuests(prev => prev.map(quest => {
        if (quest.id === questId) {
          completedQuest = quest;
          return { ...quest, completed: true };
        }
        return quest;
      }));

      // Schedule next occurrence for repeating quests
      if (completedQuest && !completedQuest.completed) {
        setTimeout(() => scheduleNextOccurrence(completedQuest), 100);
      }
    }

    // Find the quest to get its details
    let quest;
    if (isWarQuest) {
      const war = wars.find(w => w.id === warId);
      quest = war?.quests.find(q => q.id === questId);
    } else {
      quest = quests.find(q => q.id === questId);
    }

    if (quest && !quest.completed) {
      // Calculate stat bonus based on difficulty
      const getStatBonus = (difficulty) => {
        switch (difficulty) {
          case 'easy': return 1;
          case 'medium': return 2;
          case 'hard': return 3;
          case 'badass': return 4;
          case 'special': return 2; // Default for special
          default: return 1;
        }
      };

      // Update player stats
      setPlayerData(prev => ({
        ...prev,
        xp: prev.xp + quest.xp,
        stats: {
          ...prev.stats,
          [quest.stat]: prev.stats[quest.stat] + getStatBonus(quest.difficulty),
          discipline: prev.stats.discipline + 0.5 // Discipline bonus
        },
        questsCompleted: prev.questsCompleted + 1
      }));
    }
  };

  const getDifficultyXP = (difficulty, manualXP) => {
    if (difficulty === 'special') return manualXP || 5;
    switch (difficulty) {
      case 'easy': return 5;
      case 'medium': return 10;
      case 'hard': return 15;
      case 'badass': return 20;
      default: return 5;
    }
  };

  const getRepeatCycle = (category) => {
    switch (category) {
      case 'daily': return 'daily';
      case '3days': return '3days';
      case 'weekly': return 'weekly';
      default: return 'none';
    }
  };

  const addDaysToDate = (dateString, days) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
  };

  const scheduleNextOccurrence = (quest) => {
    const repeatCycle = quest.repeatCycle || getRepeatCycle(quest.category);
    if (repeatCycle === 'none') return;

    let daysToAdd = 0;
    switch (repeatCycle) {
      case 'daily': daysToAdd = 1; break;
      case '3days': daysToAdd = 3; break;
      case 'weekly': daysToAdd = 7; break;
      default: return;
    }

    const nextDate = addDaysToDate(quest.date, daysToAdd);
    const newQuest = {
      ...quest,
      id: Date.now() + Math.random(),
      completed: false,
      date: nextDate
    };

    setQuests(prev => [...prev, newQuest]);
  };

  const generateFutureOccurrences = (baseQuest, days = 30) => {
    const occurrences = [];
    const repeatCycle = baseQuest.repeatCycle || getRepeatCycle(baseQuest.category);
    
    if (repeatCycle === 'none') return occurrences;
    
    let daysInterval = 0;
    switch (repeatCycle) {
      case 'daily': daysInterval = 1; break;
      case '3days': daysInterval = 3; break;
      case 'weekly': daysInterval = 7; break;
      default: return occurrences;
    }
    
    const startDate = new Date(baseQuest.date);
    let currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + daysInterval);
    
    while (currentDate <= new Date(Date.now() + days * 24 * 60 * 60 * 1000)) {
      occurrences.push({
        ...baseQuest,
        id: Date.now() + Math.random() * 1000000,
        date: currentDate.toISOString().split('T')[0],
        completed: false
      });
      currentDate.setDate(currentDate.getDate() + daysInterval);
    }
    
    return occurrences;
  };

  const addQuest = (questData) => {
    const xp = getDifficultyXP(questData.difficulty, questData.manualXP);
    const repeatCycle = getRepeatCycle(questData.category);
    
    const newQuest = {
      ...questData,
      id: Date.now(),
      completed: false,
      xp,
      repeatCycle,
      manualXP: questData.difficulty === 'special' ? questData.manualXP : null
    };
    
    // Generate future occurrences for repeating quests
    const futureOccurrences = generateFutureOccurrences(newQuest, 30);
    
    setQuests(prev => [...prev, newQuest, ...futureOccurrences]);
  };

  const addWar = (warData) => {
    const newWar = {
      ...warData,
      id: Date.now(),
      progress: 0,
      completed: false,
      quests: warData.quests.map(q => ({ ...q, id: Date.now() + Math.random(), completed: false }))
    };
    setWars(prev => [...prev, newWar]);
  };

  const addWeapon = (weaponData) => {
    const newWeapon = {
      ...weaponData,
      id: Date.now()
    };
    setWeapons(prev => [...prev, newWeapon]);
  };

  const updateWar = (warId, updates) => {
    setWars(prev => prev.map(war => 
      war.id === warId ? { ...war, ...updates } : war
    ));
  };

  const deleteWeapon = (weaponId) => {
    setWeapons(prev => prev.filter(weapon => weapon.id !== weaponId));
  };

  const tabs = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'quests', label: 'Quests', icon: '📜' },
    { id: 'calendar', label: 'Calendar', icon: '📅' },
    { id: 'wars', label: 'Wars', icon: '⚔️' },
    { id: 'weapons', label: 'Weapons', icon: '🗡' },
    { id: 'stats', label: 'Stats', icon: '📊' },
    { id: 'titles', label: 'Titles', icon: '👑' }
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return <Home playerData={playerData} titles={titles} setActiveTab={setActiveTab} quests={quests} addQuest={addQuest} addWar={addWar} />;
      case 'quests':
        return <Quests quests={quests} addQuest={addQuest} completeQuest={completeQuest} />;
      case 'calendar':
        return <Calendar quests={quests} />;
      case 'wars':
        return <Wars wars={wars} weapons={weapons} addWar={addWar} updateWar={updateWar} completeQuest={completeQuest} />;
      case 'weapons':
        return <Weapons weapons={weapons} addWeapon={addWeapon} deleteWeapon={deleteWeapon} />;
      case 'stats':
        return <Stats playerData={playerData} />;
      case 'titles':
        return <Titles titles={titles} />;
      default:
        return <Home playerData={playerData} titles={titles} setActiveTab={setActiveTab} quests={quests} addQuest={addQuest} addWar={addWar} />;
    }
  };

  return (
    <div className="app-container">
      {/* Main Content */}
      <div style={{ paddingBottom: '5rem' }}>
        {renderActiveTab()}
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
          >
            <span className="nav-icon">{tab.icon}</span>
            <span className="nav-label">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Level Up Modal */}
      {showLevelUpModal && (
        <div className="modal-overlay">
          <div className="modal level-up-animation" style={{ textAlign: 'center', border: '2px solid var(--fantasy-gold)' }}>
            <h2 className="text-4xl font-bold text-fantasy-gold mb-4">LEVEL UP!</h2>
            <p className="text-xl mb-4">You are now level {playerData.level}!</p>
            <button
              onClick={() => setShowLevelUpModal(false)}
              className="btn btn-primary"
              style={{ backgroundColor: 'var(--fantasy-gold)', color: 'var(--fantasy-dark)' }}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
