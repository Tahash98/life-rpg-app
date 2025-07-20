import React, { useState } from 'react';

const Quests = ({ quests, addQuest, completeQuest }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newQuest, setNewQuest] = useState({
    title: '',
    category: 'Daily',
    difficulty: 'Easy',
    stat: 'health',
    date: new Date().toISOString().split('T')[0]
  });

  const categories = ['Daily', 'Weekly', 'Side Quest', 'War Quest'];
  const difficulties = ['Easy', 'Medium', 'Hard', 'Badass Hard'];
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
      case 'Easy': return 'text-green-400 bg-green-900';
      case 'Medium': return 'text-yellow-400 bg-yellow-900';
      case 'Hard': return 'text-orange-400 bg-orange-900';
      case 'Badass Hard': return 'text-red-400 bg-red-900';
      default: return 'text-gray-400 bg-gray-900';
    }
  };

  const getDifficultyXP = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 5;
      case 'Medium': return 10;
      case 'Hard': return 15;
      case 'Badass Hard': return 20;
      default: return 5;
    }
  };

  const handleAddQuest = (e) => {
    e.preventDefault();
    if (newQuest.title.trim()) {
      addQuest(newQuest);
      setNewQuest({
        title: '',
        category: 'Daily',
        difficulty: 'Easy',
        stat: 'health',
        date: new Date().toISOString().split('T')[0]
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
                        {quest.category}
                      </span>
                      <span className={`px-2 py-1 rounded ${getDifficultyColor(quest.difficulty)}`}>
                        {quest.difficulty} (+{getDifficultyXP(quest.difficulty)} XP)
                      </span>
                      <span className="text-gray-400">
                        📅 {quest.date}
                      </span>
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
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {completedQuests.map(quest => (
              <div key={quest.id} className="bg-gray-800 bg-opacity-50 rounded-lg p-4 border border-gray-600">
                <div className="flex items-center justify-between opacity-75">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-2xl">{getStatIcon(quest.stat)}</span>
                      <h3 className="text-lg font-semibold line-through">{quest.title}</h3>
                      <span className="text-fantasy-green">✅</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="bg-gray-700 px-2 py-1 rounded text-gray-300">
                        {quest.category}
                      </span>
                      <span className={`px-2 py-1 rounded ${getDifficultyColor(quest.difficulty)} opacity-75`}>
                        {quest.difficulty} (+{getDifficultyXP(quest.difficulty)} XP)
                      </span>
                    </div>
                  </div>
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
                    <option key={cat} value={cat} className="bg-fantasy-dark">{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Difficulty</label>
                <select
                  value={newQuest.difficulty}
                  onChange={(e) => setNewQuest({...newQuest, difficulty: e.target.value})}
                  className="w-full bg-fantasy-purple bg-opacity-30 border border-fantasy-purple rounded-lg px-3 py-2 text-white"
                >
                  {difficulties.map(diff => (
                    <option key={diff} value={diff} className="bg-fantasy-dark">
                      {diff} (+{getDifficultyXP(diff)} XP)
                    </option>
                  ))}
                </select>
              </div>

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