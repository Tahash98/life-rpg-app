import React, { useState } from 'react';

const Home = ({ playerData, titles, setActiveTab, quests, addQuest, addWar }) => {
  const [showAddQuestModal, setShowAddQuestModal] = useState(false);
  const [showAddWarModal, setShowAddWarModal] = useState(false);
  const [newQuest, setNewQuest] = useState({
    title: '',
    category: 'daily',
    difficulty: 'easy',
    stat: 'health',
    date: new Date().toISOString().split('T')[0],
    manualXP: null
  });
  const [newWar, setNewWar] = useState({
    title: '',
    description: '',
    rewardTitle: '',
    quests: [],
    weapons: [],
    weaponsNeeded: [],
    strategy: ''
  });

  const earnedTitles = titles.filter(title => title.unlocked);
  
  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'Common': return 'text-green-400';
      case 'Rare': return 'text-blue-400';
      case 'Epic': return 'text-purple-400';
      case 'Legendary': return 'text-fantasy-gold';
      default: return 'text-gray-400';
    }
  };

  const getRarityIcon = (rarity) => {
    switch (rarity) {
      case 'Common': return '✅';
      case 'Rare': return '🔵';
      case 'Epic': return '🟣';
      case 'Legendary': return '🟡';
      default: return '⚪';
    }
  };

  const getTodaysQuests = () => {
    const today = new Date().toISOString().split('T')[0];
    return quests.filter(quest => quest.date === today && !quest.completed);
  };

  const todaysQuests = getTodaysQuests();

  const handleAddQuest = (e) => {
    e.preventDefault();
    if (newQuest.title.trim()) {
      addQuest(newQuest);
      setNewQuest({
        title: '',
        category: 'daily',
        difficulty: 'easy',
        stat: 'health',
        date: new Date().toISOString().split('T')[0],
        manualXP: null
      });
      setShowAddQuestModal(false);
    }
  };

  const handleAddWar = (e) => {
    e.preventDefault();
    if (newWar.title.trim()) {
      addWar(newWar);
      setNewWar({
        title: '',
        description: '',
        rewardTitle: '',
        quests: [],
        weapons: [],
        weaponsNeeded: [],
        strategy: ''
      });
      setShowAddWarModal(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-fantasy-red mb-2">🔴 Life RPG App</h1>
        <p className="text-gray-300">Red & Black Theme</p>
      </div>

      {/* Earned Titles Section */}
      <div className="bg-dark-red bg-opacity-50 rounded-lg p-6 border border-fantasy-red">
        <h2 className="text-xl font-bold text-fantasy-gold mb-4">🎖️ Earned Titles</h2>
        {earnedTitles.length > 0 ? (
          <div className="space-y-3">
            {earnedTitles.slice(0, 3).map(title => (
              <div key={title.id} className="flex items-center justify-between bg-fantasy-gray bg-opacity-30 rounded-lg p-3 border border-fantasy-red">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{getRarityIcon(title.rarity)}</span>
                  <div>
                    <h3 className="font-semibold text-white">{title.name}</h3>
                    <p className={`text-sm ${getRarityColor(title.rarity)}`}>({title.rarity})</p>
                  </div>
                </div>
                <span className="text-lg">{title.icon}</span>
              </div>
            ))}
            <button 
              onClick={() => setActiveTab('titles')}
              className="w-full mt-3 bg-fantasy-red bg-opacity-30 hover:bg-opacity-50 border border-fantasy-red rounded-lg px-4 py-2 text-fantasy-red font-medium transition-all duration-200"
            >
              View All Titles →
            </button>
          </div>
        ) : (
          <div className="text-center py-6 text-gray-400">
            <div className="text-4xl mb-2">👑</div>
            <p>Complete quests and wars to earn titles!</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-dark-red bg-opacity-50 rounded-lg p-6 border border-fantasy-red">
        <h3 className="text-xl font-bold text-fantasy-gold mb-4">📜 Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => setShowAddQuestModal(true)}
            className="bg-fantasy-red bg-opacity-30 hover:bg-opacity-50 border border-fantasy-red rounded-lg px-4 py-3 text-white font-medium transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <span>📜</span>
            <span>+ Add Quest</span>
          </button>
          <button 
            onClick={() => setShowAddWarModal(true)}
            className="bg-dark-red hover:bg-opacity-80 border border-fantasy-red rounded-lg px-4 py-3 text-white font-medium transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <span>⚔️</span>
            <span>+ Start New War</span>
          </button>
        </div>
      </div>

      {/* Today's Quests */}
      <div className="bg-dark-red bg-opacity-50 rounded-lg p-6 border border-fantasy-red">
        <h3 className="text-xl font-bold text-fantasy-gold mb-4">📅 Today's Quests</h3>
        {todaysQuests.length > 0 ? (
          <div className="space-y-2">
            {todaysQuests.map(quest => (
              <div key={quest.id} className="flex items-center justify-between bg-fantasy-gray bg-opacity-30 rounded-lg p-3 border border-fantasy-red">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">📋</span>
                  <div>
                    <h4 className="font-medium text-white">{quest.title}</h4>
                    <p className="text-xs text-gray-400">{quest.category} • {quest.difficulty}</p>
                  </div>
                </div>
                <span className="text-yellow-400">⏳</span>
              </div>
            ))}
            <button 
              onClick={() => setActiveTab('calendar')}
              className="w-full mt-3 bg-fantasy-red bg-opacity-30 hover:bg-opacity-50 border border-fantasy-red rounded-lg px-4 py-2 text-fantasy-red font-medium transition-all duration-200"
            >
              Go to Calendar →
            </button>
          </div>
        ) : (
          <div className="text-center py-6 text-gray-400">
            <div className="text-4xl mb-2">✅</div>
            <p>All quests completed for today!</p>
          </div>
        )}
      </div>

      {/* Add Quest Modal */}
      {showAddQuestModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">Add New Quest</h3>
              <button 
                onClick={() => setShowAddQuestModal(false)}
                className="modal-close"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleAddQuest} className="modal-content space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Quest Title</label>
                <input
                  type="text"
                  value={newQuest.title}
                  onChange={(e) => setNewQuest({...newQuest, title: e.target.value})}
                  className="w-full bg-fantasy-red bg-opacity-30 border border-fantasy-red rounded-lg px-3 py-2 text-white placeholder-gray-400"
                  placeholder="Enter quest title..."
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                  <select
                    value={newQuest.category}
                    onChange={(e) => setNewQuest({...newQuest, category: e.target.value})}
                    className="w-full bg-fantasy-red bg-opacity-30 border border-fantasy-red rounded-lg px-3 py-2 text-white"
                  >
                    <option value="daily">Daily</option>
                    <option value="3days">3 Days Circle</option>
                    <option value="weekly">Weekly</option>
                    <option value="side">Side Quest</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Difficulty</label>
                  <select
                    value={newQuest.difficulty}
                    onChange={(e) => setNewQuest({...newQuest, difficulty: e.target.value})}
                    className="w-full bg-fantasy-red bg-opacity-30 border border-fantasy-red rounded-lg px-3 py-2 text-white"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                    <option value="badass">Badass</option>
                    <option value="special">Special</option>
                  </select>
                </div>
              </div>
              
              <div className="modal-footer">
                <button 
                  type="button" 
                  onClick={() => setShowAddQuestModal(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Quest
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add War Modal */}
      {showAddWarModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">Start New War</h3>
              <button 
                onClick={() => setShowAddWarModal(false)}
                className="modal-close"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleAddWar} className="modal-content space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">War Title</label>
                <input
                  type="text"
                  value={newWar.title}
                  onChange={(e) => setNewWar({...newWar, title: e.target.value})}
                  className="w-full bg-fantasy-red bg-opacity-30 border border-fantasy-red rounded-lg px-3 py-2 text-white placeholder-gray-400"
                  placeholder="Enter war title..."
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  value={newWar.description}
                  onChange={(e) => setNewWar({...newWar, description: e.target.value})}
                  className="w-full bg-fantasy-red bg-opacity-30 border border-fantasy-red rounded-lg px-3 py-2 text-white placeholder-gray-400 h-20"
                  placeholder="Describe your war objective..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Reward Title</label>
                <input
                  type="text"
                  value={newWar.rewardTitle}
                  onChange={(e) => setNewWar({...newWar, rewardTitle: e.target.value})}
                  className="w-full bg-fantasy-red bg-opacity-30 border border-fantasy-red rounded-lg px-3 py-2 text-white placeholder-gray-400"
                  placeholder="Title earned upon completion..."
                />
              </div>
              
              <div className="modal-footer">
                <button 
                  type="button" 
                  onClick={() => setShowAddWarModal(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Start War
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;