import React, { useState } from 'react';

const Quests = ({ quests, addQuest, completeQuest }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newQuest, setNewQuest] = useState({
    title: '',
    category: 'daily',
    difficulty: 'easy',
    stat: 'health',
    date: new Date().toISOString().split('T')[0],
    manualXP: null
  });

  const categories = [
    { value: 'daily', label: 'Daily' },
    { value: '3days', label: '3 Days Circle' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'side', label: 'Side Quest' },
    { value: 'war', label: 'War Quest' }
  ];
  const difficulties = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' },
    { value: 'badass', label: 'Badass Hard' },
    { value: 'special', label: 'Special' }
  ];
  const stats = [
    { key: 'health', name: 'Health', icon: '❤️' },
    { key: 'brain', name: 'Brain', icon: '🧠' },
    { key: 'discipline', name: 'Discipline', icon: '🏹' },
    { key: 'social', name: 'Social', icon: '🗣' },
    { key: 'combat', name: 'Combat', icon: '⚔️' },
    { key: 'wealth', name: 'Wealth', icon: '💰' },
    { key: 'wisdom', name: 'Wisdom', icon: '✨' }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 bg-green-900';
      case 'medium': return 'text-yellow-400 bg-yellow-900';
      case 'hard': return 'text-orange-400 bg-orange-900';
      case 'badass': return 'text-red-400 bg-red-900';
      case 'special': return 'text-purple-400 bg-purple-900';
      default: return 'text-gray-400 bg-gray-900';
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

  const getCategoryLabel = (category) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.label : category;
  };

  const getDifficultyLabel = (difficulty) => {
    const diff = difficulties.find(d => d.value === difficulty);
    return diff ? diff.label : difficulty;
  };

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
      setShowAddModal(false);
    }
  };

  const getStatIcon = (statKey) => {
    const stat = stats.find(s => s.key === statKey);
    return stat ? stat.icon : '❓';
  };

  const activeQuests = quests.filter(quest => !quest.completed);
  const completedQuests = quests.filter(quest => quest.completed);

  // Group completed quests by category
  const groupedCompletedQuests = completedQuests.reduce((groups, quest) => {
    const category = quest.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(quest);
    return groups;
  }, {});

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-fantasy-gold">📜 Quests</h1>
          <p className="text-gray-300">Complete quests to gain XP and improve stats</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-fantasy-blue hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          + Add Quest
        </button>
      </div>

      {/* Active Quests */}
      <div className="bg-fantasy-dark bg-opacity-50 rounded-lg p-6 border border-fantasy-purple">
        <h2 className="text-xl font-bold text-fantasy-gold mb-4">Active Quests</h2>
        {activeQuests.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <div className="text-6xl mb-4">📝</div>
            <p>No active quests. Add your first quest to start your adventure!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {activeQuests.map(quest => (
              <div key={quest.id} className="bg-fantasy-purple bg-opacity-30 rounded-lg p-4 border border-fantasy-purple">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-2xl">{getStatIcon(quest.stat)}</span>
                      <h3 className="text-lg font-semibold">{quest.title}</h3>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="bg-fantasy-dark px-2 py-1 rounded text-fantasy-gold">
                        {getCategoryLabel(quest.category)}
                      </span>
                      <span className={`px-2 py-1 rounded ${getDifficultyColor(quest.difficulty)}`}>
                        {getDifficultyLabel(quest.difficulty)} (+{getDifficultyXP(quest.difficulty, quest.manualXP)} XP)
                      </span>
                      <span className="text-gray-400">
                        📅 {quest.date}
                      </span>
                      {quest.repeatCycle && quest.repeatCycle !== 'none' && (
                        <span className="text-blue-400">
                          🔄 {quest.repeatCycle === '3days' ? '3 Days' : quest.repeatCycle}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => completeQuest(quest.id)}
                    className="bg-fantasy-green hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors ml-4"
                  >
                    Complete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Completed Quests */}
      {completedQuests.length > 0 && (
        <div className="bg-fantasy-dark bg-opacity-50 rounded-lg p-6 border border-fantasy-purple">
          <h2 className="text-xl font-bold text-fantasy-gold mb-4">Completed Quests</h2>
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {Object.entries(groupedCompletedQuests).map(([category, categoryQuests]) => (
              <div key={category} className="space-y-2">
                <h3 className="text-lg font-semibold text-fantasy-blue border-b border-fantasy-purple pb-1">
                  {getCategoryLabel(category)} ({categoryQuests.length})
                </h3>
                <div className="space-y-2">
                  {categoryQuests.map(quest => (
                    <div key={quest.id} className="bg-gray-800 bg-opacity-50 rounded-lg p-3 border border-gray-600">
                      <div className="flex items-center justify-between opacity-75">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-1">
                            <span className="text-xl">{getStatIcon(quest.stat)}</span>
                            <h4 className="text-base font-semibold line-through">{quest.title}</h4>
                            <span className="text-fantasy-green">✅</span>
                          </div>
                          <div className="flex items-center space-x-3 text-xs">
                            <span className={`px-2 py-1 rounded ${getDifficultyColor(quest.difficulty)} opacity-75`}>
                              {getDifficultyLabel(quest.difficulty)} (+{getDifficultyXP(quest.difficulty, quest.manualXP)} XP)
                            </span>
                            <span className="text-gray-500">📅 {quest.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Quest Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-fantasy-dark border-2 border-fantasy-purple rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-fantasy-gold mb-4">Add New Quest</h2>
            <form onSubmit={handleAddQuest} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Quest Title</label>
                <input
                  type="text"
                  value={newQuest.title}
                  onChange={(e) => setNewQuest({...newQuest, title: e.target.value})}
                  className="w-full bg-fantasy-purple bg-opacity-30 border border-fantasy-purple rounded-lg px-3 py-2 text-white placeholder-gray-400"
                  placeholder="Enter quest title..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                <select
                  value={newQuest.category}
                  onChange={(e) => setNewQuest({...newQuest, category: e.target.value})}
                  className="w-full bg-fantasy-purple bg-opacity-30 border border-fantasy-purple rounded-lg px-3 py-2 text-white"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value} className="bg-fantasy-dark">{cat.label}</option>
                  ))}
                </select>
                <div className="text-xs text-gray-400 mt-1">
                  {newQuest.category === 'daily' && '🔄 Repeats every day'}
                  {newQuest.category === '3days' && '🔄 Repeats every 3 days'}
                  {newQuest.category === 'weekly' && '🔄 Repeats every week'}
                  {(newQuest.category === 'side' || newQuest.category === 'war') && '⚡ One-time quest'}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Difficulty</label>
                <select
                  value={newQuest.difficulty}
                  onChange={(e) => setNewQuest({...newQuest, difficulty: e.target.value})}
                  className="w-full bg-fantasy-purple bg-opacity-30 border border-fantasy-purple rounded-lg px-3 py-2 text-white"
                >
                  {difficulties.map(diff => (
                    <option key={diff.value} value={diff.value} className="bg-fantasy-dark">
                      {diff.label} {diff.value !== 'special' && `(+${getDifficultyXP(diff.value)} XP)`}
                    </option>
                  ))}
                </select>
              </div>

              {newQuest.difficulty === 'special' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Manual XP Reward</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={newQuest.manualXP || ''}
                    onChange={(e) => setNewQuest({...newQuest, manualXP: parseInt(e.target.value) || null})}
                    className="w-full bg-fantasy-purple bg-opacity-30 border border-fantasy-purple rounded-lg px-3 py-2 text-white placeholder-gray-400"
                    placeholder="Enter XP amount (1-100)"
                  />
                  <div className="text-xs text-gray-400 mt-1">
                    Set custom XP reward for this special quest
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Stat Affected</label>
                <select
                  value={newQuest.stat}
                  onChange={(e) => setNewQuest({...newQuest, stat: e.target.value})}
                  className="w-full bg-fantasy-purple bg-opacity-30 border border-fantasy-purple rounded-lg px-3 py-2 text-white"
                >
                  {stats.map(stat => (
                    <option key={stat.key} value={stat.key} className="bg-fantasy-dark">
                      {stat.icon} {stat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                <input
                  type="date"
                  value={newQuest.date}
                  onChange={(e) => setNewQuest({...newQuest, date: e.target.value})}
                  className="w-full bg-fantasy-purple bg-opacity-30 border border-fantasy-purple rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-fantasy-blue hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Add Quest
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quests;