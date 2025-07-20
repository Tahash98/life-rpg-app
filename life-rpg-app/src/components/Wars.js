import React, { useState } from 'react';

const Wars = ({ wars, weapons, addWar, updateWar, completeQuest }) => {
  const [selectedWar, setSelectedWar] = useState(null);
  const [activeWarTab, setActiveWarTab] = useState('quests');
  const [showAddWarModal, setShowAddWarModal] = useState(false);
  const [newWar, setNewWar] = useState({
    title: '',
    description: '',
    rewardTitle: '',
    quests: [],
    weapons: [],
    weaponsNeeded: [],
    strategy: ''
  });
  const [newWarQuest, setNewWarQuest] = useState({
    title: '',
    difficulty: 'easy',
    stat: 'health'
  });

  const getDifficultyXP = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 5;
      case 'medium': return 10;
      case 'hard': return 15;
      case 'badass': return 20;
      default: return 5;
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 bg-green-900';
      case 'medium': return 'text-yellow-400 bg-yellow-900';
      case 'hard': return 'text-orange-400 bg-orange-900';
      case 'badass': return 'text-red-400 bg-red-900';
      default: return 'text-gray-400 bg-gray-900';
    }
  };

  const getWeaponIcon = (type) => {
    switch (type) {
      case 'skill': return '🎯';
      case 'ability': return '⚡';
      case 'matter': return '🔧';
      default: return '🗡';
    }
  };

  const getStatIcon = (stat) => {
    switch (stat) {
      case 'health': return '❤️';
      case 'brain': return '🧠';
      case 'discipline': return '🏹';
      case 'social': return '🗣️';
      case 'combat': return '⚔️';
      case 'wealth': return '💰';
      case 'wisdom': return '✨';
      default: return '📊';
    }
  };

  const addQuestToNewWar = () => {
    if (newWarQuest.title.trim()) {
      const quest = {
        ...newWarQuest,
        xp: getDifficultyXP(newWarQuest.difficulty),
        completed: false
      };
      setNewWar(prev => ({
        ...prev,
        quests: [...prev.quests, quest]
      }));
      setNewWarQuest({
        title: '',
        difficulty: 'easy',
        stat: 'health'
      });
    }
  };

  const removeQuestFromNewWar = (index) => {
    setNewWar(prev => ({
      ...prev,
      quests: prev.quests.filter((_, i) => i !== index)
    }));
  };

  const handleAddWar = (e) => {
    e.preventDefault();
    if (newWar.title.trim()) {
      // Allow creating war even without quests
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

  const addQuestToWar = (war, questData) => {
    const newQuest = {
      ...questData,
      id: Date.now() + Math.random(),
      completed: false,
      xp: getDifficultyXP(questData.difficulty)
    };
    
    const updatedQuests = [...war.quests, newQuest];
    updateWar(war.id, { quests: updatedQuests });
  };

  const editQuestInWar = (war, questId, questData) => {
    const updatedQuests = war.quests.map(quest =>
      quest.id === questId ? { ...quest, ...questData, xp: getDifficultyXP(questData.difficulty) } : quest
    );
    updateWar(war.id, { quests: updatedQuests });
  };

  const removeQuestFromWar = (war, questId) => {
    const updatedQuests = war.quests.filter(quest => quest.id !== questId);
    updateWar(war.id, { quests: updatedQuests });
  };

  const toggleWeaponInWar = (war, weaponId) => {
    const updatedWeapons = war.weapons.includes(weaponId)
      ? war.weapons.filter(id => id !== weaponId)
      : [...war.weapons, weaponId];
    
    updateWar(war.id, { weapons: updatedWeapons });
  };

  const updateWarStrategy = (war, strategy) => {
    updateWar(war.id, { strategy });
  };

  const getStatIcon = (statKey) => {
    const icons = {
      health: '❤️', brain: '🧠', discipline: '🏹', social: '🗣',
      combat: '⚔️', wealth: '💰', wisdom: '✨'
    };
    return icons[statKey] || '❓';
  };

  const getWeaponIcon = (type) => {
    switch (type) {
      case 'Skill': return '🎯';
      case 'Ability': return '⚡';
      case 'Matter': return '🔧';
      default: return '🗡';
    }
  };

  if (selectedWar) {
    const war = wars.find(w => w.id === selectedWar);
    if (!war) {
      setSelectedWar(null);
      return null;
    }

    return (
      <div className="p-6 space-y-6">
        {/* War Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSelectedWar(null)}
              className="bg-fantasy-purple hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              ← Back
            </button>
            <div>
              <h1 className="text-3xl font-bold text-fantasy-gold">{war.title}</h1>
              <p className="text-gray-300">{war.description}</p>
            </div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${war.completed ? 'text-fantasy-green' : 'text-fantasy-blue'}`}>
              {Math.round(war.progress)}%
            </div>
            <div className="text-sm text-gray-400">Complete</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-fantasy-dark bg-opacity-50 rounded-lg p-4 border border-fantasy-purple">
          <div className="w-full bg-gray-700 rounded-full h-4">
            <div 
              className={`h-4 rounded-full transition-all duration-500 ${
                war.completed ? 'bg-fantasy-green' : 'bg-gradient-to-r from-fantasy-blue to-fantasy-purple'
              }`}
              style={{ width: `${war.progress}%` }}
            />
          </div>
          {war.completed && (
            <div className="mt-2 text-center text-fantasy-gold font-bold">
              🏆 Victory! Title Unlocked: {war.rewardTitle}
            </div>
          )}
        </div>

        {/* War Tabs */}
        <div className="bg-fantasy-dark bg-opacity-50 rounded-lg border border-fantasy-purple">
          <div className="flex border-b border-fantasy-purple">
            {[
              { id: 'quests', label: 'Quests', icon: '📜' },
              { id: 'weapons', label: 'Arsenal', icon: '🗡' },
              { id: 'weaponsneeded', label: 'Needed', icon: '🎯' },
              { id: 'strategy', label: 'Strategy', icon: '📋' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveWarTab(tab.id)}
                className={`flex-1 px-6 py-4 text-center transition-colors ${
                  activeWarTab === tab.id
                    ? 'bg-fantasy-purple text-fantasy-gold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <span className="text-2xl block mb-1">{tab.icon}</span>
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Quests Tab */}
            {activeWarTab === 'quests' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-fantasy-gold">War Quests</h3>
                  <button
                    onClick={() => {
                      const questData = {
                        title: prompt('Enter quest title:'),
                        difficulty: 'medium',
                        stat: 'brain'
                      };
                      if (questData.title) {
                        addQuestToWar(war, questData);
                      }
                    }}
                    className="bg-fantasy-red hover:bg-dark-red text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    + Add Quest
                  </button>
                </div>
                
                {war.quests.length > 0 ? (
                  war.quests.map(quest => (
                    <div key={quest.id} className={`rounded-lg p-4 border ${
                      quest.completed 
                        ? 'bg-gray-800 bg-opacity-50 border-gray-600' 
                        : 'bg-dark-red bg-opacity-30 border-fantasy-red'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="text-2xl">{getStatIcon(quest.stat)}</span>
                            <h4 className={`text-lg font-semibold ${quest.completed ? 'line-through' : ''}`}>
                              {quest.title}
                            </h4>
                            {quest.completed && <span className="text-fantasy-green">✅</span>}
                          </div>
                          <div className="flex items-center space-x-4 text-sm">
                            <span className={`px-2 py-1 rounded ${getDifficultyColor(quest.difficulty)}`}>
                              {quest.difficulty} (+{quest.xp} XP)
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {!quest.completed && (
                            <>
                              <button
                                onClick={() => {
                                  const newTitle = prompt('Edit quest title:', quest.title);
                                  if (newTitle) {
                                    editQuestInWar(war, quest.id, { ...quest, title: newTitle });
                                  }
                                }}
                                className="bg-fantasy-gold hover:bg-yellow-600 text-black px-3 py-1 rounded text-sm font-medium transition-colors"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm('Remove this quest from the war?')) {
                                    removeQuestFromWar(war, quest.id);
                                  }
                                }}
                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                              >
                                Remove
                              </button>
                              <button
                                onClick={() => completeQuest(quest.id, true, war.id)}
                                className="bg-fantasy-green hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                              >
                                Complete
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <div className="text-4xl mb-2">📜</div>
                    <p>No quests added yet. Click "Add Quest" to get started!</p>
                  </div>
                )}
              </div>
            )}

            {/* Weapons Tab */}
            {activeWarTab === 'weapons' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-fantasy-gold">War Arsenal</h3>
                {weapons.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <div className="text-4xl mb-2">🗡</div>
                    <p>No weapons available. Create some in the Weapons tab!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {weapons.map(weapon => {
                      const isAttached = war.weapons.includes(weapon.id);
                      return (
                        <div
                          key={weapon.id}
                          className={`rounded-lg p-4 border cursor-pointer transition-all ${
                            isAttached
                              ? 'bg-fantasy-blue bg-opacity-30 border-fantasy-blue'
                              : 'bg-fantasy-purple bg-opacity-30 border-fantasy-purple hover:border-fantasy-blue'
                          }`}
                          onClick={() => toggleWeaponInWar(war, weapon.id)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">{getWeaponIcon(weapon.type)}</span>
                              <h4 className="font-semibold">{weapon.name}</h4>
                            </div>
                            {isAttached && <span className="text-fantasy-gold">⭐</span>}
                          </div>
                          <p className="text-sm text-gray-300">{weapon.description}</p>
                          <div className="mt-2 text-xs text-fantasy-gold">
                            {weapon.type}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Weapons Needed Tab */}
            {activeWarTab === 'weaponsneeded' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-fantasy-gold">Weapons Needed</h3>
                {war.weaponsNeeded && war.weaponsNeeded.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {war.weaponsNeeded.map(weaponId => {
                      const weapon = weapons.find(w => w.id === weaponId);
                      if (!weapon) return null;
                      return (
                        <div
                          key={weapon.id}
                          className={`rounded-lg p-4 border ${
                            weapon.obtained
                              ? 'bg-green-900 bg-opacity-30 border-green-600'
                              : 'bg-red-900 bg-opacity-30 border-red-600'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">{getWeaponIcon(weapon.type)}</span>
                              <h4 className="font-semibold">{weapon.name}</h4>
                            </div>
                            <span className={`text-sm ${weapon.obtained ? 'text-green-400' : 'text-red-400'}`}>
                              {weapon.obtained ? '✅ Obtained' : '❌ Needed'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-300">{weapon.description}</p>
                          <div className="mt-2 text-xs text-fantasy-gold">
                            {weapon.type}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <div className="text-4xl mb-2">🎯</div>
                    <p>No weapons needed for this war</p>
                  </div>
                )}
              </div>
            )}

            {/* Strategy Tab */}
            {activeWarTab === 'strategy' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-fantasy-gold">Battle Strategy</h3>
                <textarea
                  value={war.strategy}
                  onChange={(e) => updateWarStrategy(war, e.target.value)}
                  placeholder="Plan your approach, note key tactics, track important resources..."
                  className="w-full h-60 bg-fantasy-purple bg-opacity-30 border border-fantasy-purple rounded-lg px-4 py-3 text-white placeholder-gray-400 resize-none"
                />
                <div className="text-sm text-gray-400">
                  💡 Use this space to plan your war strategy, track progress, and note important insights.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-fantasy-gold">⚔️ Wars</h1>
          <p className="text-gray-300">Epic campaigns that shape your destiny</p>
        </div>
        <button
          onClick={() => setShowAddWarModal(true)}
          className="bg-fantasy-red hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          + New War
        </button>
      </div>

      {/* Wars List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {wars.map(war => (
          <div
            key={war.id}
            onClick={() => setSelectedWar(war.id)}
            className={`bg-fantasy-dark bg-opacity-50 rounded-lg p-6 border cursor-pointer transition-all hover:border-fantasy-gold ${
              war.completed ? 'border-fantasy-green' : 'border-fantasy-purple'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-fantasy-gold">{war.title}</h3>
              {war.completed && <span className="text-fantasy-green text-2xl">🏆</span>}
            </div>
            
            <p className="text-gray-300 mb-4 line-clamp-2">{war.description}</p>
            
            {/* Progress */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Progress</span>
                <span className={war.completed ? 'text-fantasy-green' : 'text-fantasy-blue'}>
                  {Math.round(war.progress)}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    war.completed ? 'bg-fantasy-green' : 'bg-fantasy-blue'
                  }`}
                  style={{ width: `${war.progress}%` }}
                />
              </div>
            </div>

            {/* Quest Summary */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-fantasy-purple bg-opacity-30 rounded p-3 text-center">
                <div className="text-2xl mb-1">📜</div>
                <div className="font-bold text-fantasy-blue">
                  {war.quests.filter(q => q.completed).length}/{war.quests.length}
                </div>
                <div className="text-gray-400">Quests</div>
              </div>
              <div className="bg-fantasy-purple bg-opacity-30 rounded p-3 text-center">
                <div className="text-2xl mb-1">🏆</div>
                <div className="font-bold text-fantasy-gold">
                  {war.rewardTitle}
                </div>
                <div className="text-gray-400">Reward</div>
              </div>
            </div>
          </div>
        ))}

        {wars.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-400">
            <div className="text-6xl mb-4">⚔️</div>
            <p className="text-xl mb-2">No wars declared yet</p>
            <p>Start your first epic campaign to unlock legendary rewards!</p>
          </div>
        )}
      </div>

      {/* Add War Modal */}
      {showAddWarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-fantasy-dark border-2 border-fantasy-purple rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-fantasy-gold mb-4">Declare New War</h2>
            <form onSubmit={handleAddWar} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">War Title</label>
                <input
                  type="text"
                  value={newWar.title}
                  onChange={(e) => setNewWar({...newWar, title: e.target.value})}
                  className="w-full bg-fantasy-purple bg-opacity-30 border border-fantasy-purple rounded-lg px-3 py-2 text-white placeholder-gray-400"
                  placeholder="Enter war title..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  value={newWar.description}
                  onChange={(e) => setNewWar({...newWar, description: e.target.value})}
                  className="w-full h-20 bg-fantasy-purple bg-opacity-30 border border-fantasy-purple rounded-lg px-3 py-2 text-white placeholder-gray-400 resize-none"
                  placeholder="Describe this epic campaign..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Reward Title</label>
                <input
                  type="text"
                  value={newWar.rewardTitle}
                  onChange={(e) => setNewWar({...newWar, rewardTitle: e.target.value})}
                  className="w-full bg-fantasy-purple bg-opacity-30 border border-fantasy-purple rounded-lg px-3 py-2 text-white placeholder-gray-400"
                  placeholder="Title unlocked upon victory..."
                />
              </div>

              {/* Weapons Needed */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Weapons Needed</label>
                <div className="space-y-2">
                  {weapons.map(weapon => (
                    <label key={weapon.id} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newWar.weaponsNeeded.includes(weapon.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewWar(prev => ({
                              ...prev,
                              weaponsNeeded: [...prev.weaponsNeeded, weapon.id]
                            }));
                          } else {
                            setNewWar(prev => ({
                              ...prev,
                              weaponsNeeded: prev.weaponsNeeded.filter(id => id !== weapon.id)
                            }));
                          }
                        }}
                        className="w-4 h-4 text-fantasy-blue bg-fantasy-purple border-fantasy-purple rounded focus:ring-fantasy-blue"
                      />
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{getWeaponIcon(weapon.type)}</span>
                        <span className="text-white">{weapon.name}</span>
                        <span className={`text-xs px-2 py-1 rounded ${weapon.obtained ? 'bg-green-900 text-green-400' : 'bg-red-900 text-red-400'}`}>
                          {weapon.obtained ? 'Obtained' : 'Needed'}
                        </span>
                      </div>
                    </label>
                  ))}
                  {weapons.length === 0 && (
                    <p className="text-gray-400 text-sm">No weapons available. Create some in the Weapons tab first.</p>
                  )}
                </div>
              </div>

              {/* War Quests */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">War Quests</label>
                <div className="space-y-3">
                  {newWar.quests.map((quest, index) => (
                    <div key={index} className="bg-fantasy-purple bg-opacity-30 rounded-lg p-3 flex justify-between items-center">
                      <div className="flex-1">
                        <div className="font-medium">{quest.title}</div>
                        <div className="text-sm text-gray-400">
                          {quest.difficulty} • {getStatIcon(quest.stat)} • +{quest.xp} XP
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeQuestFromNewWar(index)}
                        className="text-red-400 hover:text-red-300 ml-2"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  
                  {/* Add Quest Form */}
                  <div className="bg-fantasy-dark bg-opacity-50 rounded-lg p-3">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2">
                      <input
                        type="text"
                        value={newWarQuest.title}
                        onChange={(e) => setNewWarQuest({...newWarQuest, title: e.target.value})}
                        className="bg-fantasy-purple bg-opacity-30 border border-fantasy-purple rounded px-2 py-1 text-white text-sm placeholder-gray-400"
                        placeholder="Quest title..."
                      />
                      <select
                        value={newWarQuest.difficulty}
                        onChange={(e) => setNewWarQuest({...newWarQuest, difficulty: e.target.value})}
                        className="bg-fantasy-purple bg-opacity-30 border border-fantasy-purple rounded px-2 py-1 text-white text-sm"
                      >
                        <option value="easy" className="bg-fantasy-dark">Easy</option>
                        <option value="medium" className="bg-fantasy-dark">Medium</option>
                        <option value="hard" className="bg-fantasy-dark">Hard</option>
                        <option value="badass" className="bg-fantasy-dark">Badass Hard</option>
                      </select>
                      <select
                        value={newWarQuest.stat}
                        onChange={(e) => setNewWarQuest({...newWarQuest, stat: e.target.value})}
                        className="bg-fantasy-purple bg-opacity-30 border border-fantasy-purple rounded px-2 py-1 text-white text-sm"
                      >
                        <option value="health" className="bg-fantasy-dark">❤️ Health</option>
                        <option value="brain" className="bg-fantasy-dark">🧠 Brain</option>
                        <option value="discipline" className="bg-fantasy-dark">🏹 Discipline</option>
                        <option value="social" className="bg-fantasy-dark">🗣 Social</option>
                        <option value="combat" className="bg-fantasy-dark">⚔️ Combat</option>
                        <option value="wealth" className="bg-fantasy-dark">💰 Wealth</option>
                        <option value="wisdom" className="bg-fantasy-dark">✨ Wisdom</option>
                      </select>
                      <button
                        type="button"
                        onClick={addQuestToNewWar}
                        className="bg-fantasy-blue hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddWarModal(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newWar.title.trim() || newWar.quests.length === 0}
                  className="flex-1 bg-fantasy-red hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Declare War
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wars;