import React from 'react';

const Stats = ({ playerData }) => {
  const requiredXP = playerData.level * 100;
  const progressPercentage = (playerData.xp / requiredXP) * 100;

  const stats = [
    { key: 'health', name: 'Health', icon: '❤️' },
    { key: 'brain', name: 'Brain', icon: '🧠' },
    { key: 'discipline', name: 'Discipline', icon: '🏹' },
    { key: 'social', name: 'Social', icon: '🗣️' },
    { key: 'combat', name: 'Combat', icon: '⚔️' },
    { key: 'wealth', name: 'Wealth', icon: '💰' },
    { key: 'wisdom', name: 'Wisdom', icon: '✨' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-fantasy-gold mb-2">📊 Character Stats</h1>
        <p className="text-gray-300">Your RPG progression overview</p>
      </div>

      {/* Level and XP Progress */}
      <div className="bg-dark-red bg-opacity-50 rounded-lg p-6 border border-fantasy-red">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-fantasy-gold mb-2">
            Level {playerData.level} 🏅
          </h2>
        </div>
        
        <div className="mb-2">
          <div className="flex justify-between text-sm text-gray-300 mb-1">
            <span>XP Progress</span>
            <span>{playerData.xp}/{requiredXP} XP</span>
          </div>
          <div className="w-full bg-fantasy-gray rounded-full h-4 border border-fantasy-red">
            <div 
              className="bg-gradient-to-r from-fantasy-red to-fantasy-gold h-4 rounded-full transition-all duration-500 ease-out flex items-center justify-center"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            >
              {progressPercentage > 15 && (
                <span className="text-xs font-bold text-white">
                  {Math.round(progressPercentage)}%
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="text-center text-sm text-gray-400">
          {requiredXP - playerData.xp} XP needed for Level {playerData.level + 1}
        </div>
      </div>

      {/* Character Stats Grid */}
      <div className="bg-dark-red bg-opacity-50 rounded-lg p-6 border border-fantasy-red">
        <h3 className="text-xl font-bold text-fantasy-gold mb-4 text-center">Character Attributes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stats.map(stat => (
            <div key={stat.key} className="bg-fantasy-gray bg-opacity-30 rounded-lg p-4 border border-fantasy-red">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{stat.icon}</span>
                  <div>
                    <h4 className="font-semibold text-white">{stat.name}</h4>
                    <div className="text-xs text-gray-400">Base Attribute</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-fantasy-gold">
                    {Math.round(playerData.stats[stat.key])}
                  </div>
                  <div className="text-xs text-gray-400">Points</div>
                </div>
              </div>
              
              {/* Mini progress bar for visual appeal */}
              <div className="mt-3">
                <div className="w-full bg-fantasy-dark rounded-full h-2">
                  <div 
                    className="bg-fantasy-red h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((playerData.stats[stat.key] / 50) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Stats */}
      <div className="bg-dark-red bg-opacity-50 rounded-lg p-6 border border-fantasy-red">
        <h3 className="text-xl font-bold text-fantasy-gold mb-4 text-center">Adventure Statistics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-fantasy-green">{playerData.questsCompleted}</div>
            <div className="text-sm text-gray-300">Quests Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-fantasy-gold">{playerData.level}</div>
            <div className="text-sm text-gray-300">Current Level</div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-fantasy-gray bg-opacity-30 rounded border border-fantasy-red">
          <div className="text-center">
            <div className="text-lg font-bold text-fantasy-blue">
              +{(playerData.questsCompleted * 0.5).toFixed(1)} Discipline Bonus
            </div>
            <div className="text-xs text-gray-400">From completing quests</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;