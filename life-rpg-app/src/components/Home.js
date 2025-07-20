import React from 'react';

const Home = ({ playerData }) => {
  const { level, xp, stats, questsCompleted, warsCompleted, titlesEarned } = playerData;
  const requiredXP = level * 100;
  const xpProgress = (xp / requiredXP) * 100;

  const statItems = [
    { key: 'health', name: 'Health', icon: '❤️', color: 'text-red-400' },
    { key: 'brain', name: 'Brain', icon: '🧠', color: 'text-blue-400' },
    { key: 'discipline', name: 'Discipline', icon: '🏹', color: 'text-green-400' },
    { key: 'social', name: 'Social', icon: '🗣', color: 'text-yellow-400' },
    { key: 'combat', name: 'Combat', icon: '⚔️', color: 'text-purple-400' },
    { key: 'wealth', name: 'Wealth', icon: '💰', color: 'text-yellow-500' },
    { key: 'wisdom', name: 'Wisdom', icon: '✨', color: 'text-indigo-400' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-fantasy-gold mb-2">Life RPG</h1>
        <p className="text-gray-300">Transform your life into an epic adventure</p>
      </div>

      {/* Character Level & XP */}
      <div className="bg-fantasy-dark bg-opacity-50 rounded-lg p-6 border border-fantasy-purple">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-fantasy-gold">Level {level}</h2>
          <p className="text-gray-300">{xp} / {requiredXP} XP</p>
        </div>
        
        {/* XP Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
          <div 
            className="bg-gradient-to-r from-fantasy-blue to-fantasy-gold h-4 rounded-full transition-all duration-500"
            style={{ width: `${xpProgress}%` }}
          />
        </div>
        
        <div className="text-center text-sm text-gray-400">
          {Math.round(xpProgress)}% to next level
        </div>
      </div>

      {/* Stats Grid */}
      <div className="bg-fantasy-dark bg-opacity-50 rounded-lg p-6 border border-fantasy-purple">
        <h3 className="text-xl font-bold text-fantasy-gold mb-4 text-center">Character Stats</h3>
        <div className="grid grid-cols-2 gap-4">
          {statItems.map(stat => (
            <div key={stat.key} className="bg-fantasy-purple bg-opacity-30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{stat.icon}</span>
                  <span className="font-medium">{stat.name}</span>
                </div>
                <span className={`text-xl font-bold ${stat.color}`}>
                  {Math.floor(stats[stat.key] * 10) / 10}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-center text-sm text-gray-400">
          <p>💡 <strong>Discipline Bonus:</strong> +0.5 for every quest completed</p>
        </div>
      </div>

      {/* Summary Counters */}
      <div className="bg-fantasy-dark bg-opacity-50 rounded-lg p-6 border border-fantasy-purple">
        <h3 className="text-xl font-bold text-fantasy-gold mb-4 text-center">Life Achievements</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-fantasy-purple bg-opacity-30 rounded-lg p-4">
            <div className="text-3xl mb-2">📜</div>
            <div className="text-2xl font-bold text-fantasy-blue">{questsCompleted}</div>
            <div className="text-sm text-gray-300">Quests Completed</div>
          </div>
          
          <div className="bg-fantasy-purple bg-opacity-30 rounded-lg p-4">
            <div className="text-3xl mb-2">⚔️</div>
            <div className="text-2xl font-bold text-fantasy-red">{warsCompleted}</div>
            <div className="text-sm text-gray-300">Wars Won</div>
          </div>
          
          <div className="bg-fantasy-purple bg-opacity-30 rounded-lg p-4">
            <div className="text-3xl mb-2">👑</div>
            <div className="text-2xl font-bold text-fantasy-gold">{titlesEarned}</div>
            <div className="text-sm text-gray-300">Titles Earned</div>
          </div>
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="bg-gradient-to-r from-fantasy-purple to-fantasy-blue rounded-lg p-6 text-center">
        <p className="text-lg italic text-white">
          "Every quest completed, every challenge faced, shapes the hero you're becoming."
        </p>
        <p className="text-sm text-gray-300 mt-2">- Your RPG Journey</p>
      </div>
    </div>
  );
};

export default Home;