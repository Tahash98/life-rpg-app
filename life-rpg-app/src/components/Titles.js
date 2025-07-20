import React, { useState } from 'react';

const Titles = ({ titles }) => {
  const [selectedTitle, setSelectedTitle] = useState(null);

  const unlockedTitles = titles.filter(title => title.unlocked);
  const lockedTitles = titles.filter(title => !title.unlocked);

  const getTitleIcon = (title) => {
    if (title.type === 'level') {
      if (title.requirement === 1) return '🌱';
      if (title.requirement === 5) return '⚡';
      if (title.requirement === 10) return '⚔️';
      if (title.requirement === 20) return '👑';
    }
    if (title.type === 'war') return '🏆';
    return '🎖️';
  };

  const getTitleColor = (title) => {
    if (!title.unlocked) return 'text-gray-500';
    
    if (title.type === 'level') {
      if (title.requirement === 1) return 'text-green-400';
      if (title.requirement === 5) return 'text-blue-400';
      if (title.requirement === 10) return 'text-purple-400';
      if (title.requirement === 20) return 'text-yellow-400';
    }
    if (title.type === 'war') return 'text-red-400';
    return 'text-fantasy-gold';
  };

  const getTitleRarity = (title) => {
    if (title.type === 'level') {
      if (title.requirement === 1) return { name: 'Common', color: 'bg-green-900 text-green-400' };
      if (title.requirement === 5) return { name: 'Uncommon', color: 'bg-blue-900 text-blue-400' };
      if (title.requirement === 10) return { name: 'Rare', color: 'bg-purple-900 text-purple-400' };
      if (title.requirement === 20) return { name: 'Epic', color: 'bg-yellow-900 text-yellow-400' };
    }
    if (title.type === 'war') return { name: 'Legendary', color: 'bg-red-900 text-red-400' };
    return { name: 'Special', color: 'bg-fantasy-purple text-fantasy-gold' };
  };

  const getRequirementText = (title) => {
    if (title.type === 'level') {
      return `Reach Level ${title.requirement}`;
    }
    if (title.type === 'war') {
      return `Complete War: ${title.requirement}`;
    }
    return 'Special Achievement';
  };

  if (selectedTitle) {
    const title = titles.find(t => t.id === selectedTitle);
    if (!title) {
      setSelectedTitle(null);
      return null;
    }

    const rarity = getTitleRarity(title);

    return (
      <div className="p-6 space-y-6">
        {/* Title Details Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSelectedTitle(null)}
              className="bg-fantasy-purple hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              ← Back
            </button>
            <div className="flex items-center space-x-4">
              <span className={`text-6xl ${title.unlocked ? '' : 'grayscale opacity-50'}`}>
                {getTitleIcon(title)}
              </span>
              <div>
                <h1 className={`text-4xl font-bold ${getTitleColor(title)}`}>
                  {title.name}
                </h1>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${rarity.color}`}>
                  {rarity.name}
                </span>
              </div>
            </div>
          </div>
          {title.unlocked && (
            <div className="text-center">
              <div className="text-fantasy-green text-2xl font-bold">UNLOCKED</div>
              <div className="text-sm text-gray-400">Achievement Earned</div>
            </div>
          )}
        </div>

        {/* Title Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Description */}
          <div className={`rounded-lg p-6 border ${
            title.unlocked 
              ? 'bg-fantasy-dark bg-opacity-50 border-fantasy-purple' 
              : 'bg-gray-800 bg-opacity-30 border-gray-600'
          }`}>
            <h3 className="text-xl font-bold text-fantasy-gold mb-3 flex items-center">
              📖 Description
            </h3>
            <p className={`leading-relaxed ${title.unlocked ? 'text-gray-300' : 'text-gray-500'}`}>
              {title.description}
            </p>
          </div>

          {/* Requirements */}
          <div className={`rounded-lg p-6 border ${
            title.unlocked 
              ? 'bg-fantasy-green bg-opacity-20 border-fantasy-green' 
              : 'bg-gray-800 bg-opacity-30 border-gray-600'
          }`}>
            <h3 className="text-xl font-bold text-fantasy-gold mb-3 flex items-center">
              🎯 Requirement
            </h3>
            <p className={`leading-relaxed ${title.unlocked ? 'text-gray-300' : 'text-gray-500'}`}>
              {getRequirementText(title)}
            </p>
            {title.unlocked && (
              <div className="mt-3 flex items-center text-fantasy-green">
                <span className="text-xl mr-2">✅</span>
                <span className="font-medium">Completed!</span>
              </div>
            )}
          </div>
        </div>

        {/* Title Stats */}
        <div className={`rounded-lg p-6 border ${
          title.unlocked 
            ? 'bg-fantasy-dark bg-opacity-50 border-fantasy-purple' 
            : 'bg-gray-800 bg-opacity-30 border-gray-600'
        }`}>
          <h3 className="text-xl font-bold text-fantasy-gold mb-4">📊 Title Information</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl mb-1">{getTitleIcon(title)}</div>
              <div className="font-bold">{title.type === 'level' ? 'Level' : 'War'}</div>
              <div className="text-sm text-gray-400">Type</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">⭐</div>
              <div className="font-bold">{rarity.name}</div>
              <div className="text-sm text-gray-400">Rarity</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">{title.unlocked ? '🔓' : '🔒'}</div>
              <div className="font-bold">{title.unlocked ? 'Unlocked' : 'Locked'}</div>
              <div className="text-sm text-gray-400">Status</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">🏆</div>
              <div className="font-bold">{title.id}</div>
              <div className="text-sm text-gray-400">Title ID</div>
            </div>
          </div>
        </div>

        {!title.unlocked && (
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg p-6 text-center">
            <h3 className="text-xl font-bold text-gray-300 mb-3">🔒 How to Unlock</h3>
            <p className="text-gray-400 mb-4">
              To earn this title, you need to: <strong>{getRequirementText(title)}</strong>
            </p>
            <div className="text-sm text-gray-500">
              Keep working towards your goals and this achievement will be yours!
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-fantasy-gold mb-2">👑 Titles</h1>
        <p className="text-gray-300">Honors earned through dedication and achievement</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-fantasy-dark bg-opacity-50 rounded-lg p-4 border border-fantasy-green text-center">
          <div className="text-3xl mb-2">🏆</div>
          <div className="text-2xl font-bold text-fantasy-green">{unlockedTitles.length}</div>
          <div className="text-sm text-gray-300">Unlocked Titles</div>
        </div>
        <div className="bg-fantasy-dark bg-opacity-50 rounded-lg p-4 border border-gray-600 text-center">
          <div className="text-3xl mb-2">🔒</div>
          <div className="text-2xl font-bold text-gray-400">{lockedTitles.length}</div>
          <div className="text-sm text-gray-300">Locked Titles</div>
        </div>
      </div>

      {/* Unlocked Titles */}
      {unlockedTitles.length > 0 && (
        <div className="bg-fantasy-dark bg-opacity-50 rounded-lg p-6 border border-fantasy-purple">
          <h2 className="text-xl font-bold text-fantasy-gold mb-4 flex items-center">
            🏆 Unlocked Titles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {unlockedTitles.map(title => {
              const rarity = getTitleRarity(title);
              return (
                <div
                  key={title.id}
                  onClick={() => setSelectedTitle(title.id)}
                  className="bg-fantasy-purple bg-opacity-30 rounded-lg p-4 border border-fantasy-green cursor-pointer transition-all hover:border-fantasy-gold hover:bg-opacity-50"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-3xl">{getTitleIcon(title)}</span>
                    <div className="flex-1">
                      <h3 className={`text-lg font-bold ${getTitleColor(title)}`}>
                        {title.name}
                      </h3>
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${rarity.color}`}>
                        {rarity.name}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                    {title.description}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-fantasy-green">✅ Unlocked</span>
                    <span className="text-gray-400">Click for details</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Locked Titles */}
      {lockedTitles.length > 0 && (
        <div className="bg-fantasy-dark bg-opacity-50 rounded-lg p-6 border border-gray-600">
          <h2 className="text-xl font-bold text-gray-400 mb-4 flex items-center">
            🔒 Locked Titles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lockedTitles.map(title => {
              const rarity = getTitleRarity(title);
              return (
                <div
                  key={title.id}
                  onClick={() => setSelectedTitle(title.id)}
                  className="bg-gray-800 bg-opacity-30 rounded-lg p-4 border border-gray-600 cursor-pointer transition-all hover:border-gray-500 opacity-75"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-3xl grayscale opacity-50">{getTitleIcon(title)}</span>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-500">
                        {title.name}
                      </h3>
                      <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-gray-700 text-gray-400">
                        {rarity.name}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                    {title.description}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">🔒 Locked</span>
                    <span className="text-gray-500">View requirements</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* No Titles Message */}
      {titles.length === 0 && (
        <div className="bg-fantasy-dark bg-opacity-50 rounded-lg p-12 border border-fantasy-purple text-center">
          <div className="text-6xl mb-4">👑</div>
          <h3 className="text-2xl font-bold text-fantasy-gold mb-2">No titles available</h3>
          <p className="text-gray-300">Complete quests and wars to unlock your first titles!</p>
        </div>
      )}

      {/* Progress Encouragement */}
      {lockedTitles.length > 0 && (
        <div className="bg-gradient-to-r from-fantasy-purple to-fantasy-blue rounded-lg p-6 text-center">
          <h3 className="text-xl font-bold text-white mb-3">🎯 Keep Pushing Forward!</h3>
          <p className="text-gray-200 mb-4">
            You have {lockedTitles.length} more title{lockedTitles.length === 1 ? '' : 's'} waiting to be unlocked.
          </p>
          <div className="text-sm text-gray-300">
            Every quest completed and every war won brings you closer to legendary status.
          </div>
        </div>
      )}
    </div>
  );
};

export default Titles;