import React, { useState } from 'react';

const Weapons = ({ weapons, addWeapon, deleteWeapon }) => {
  const [selectedWeapon, setSelectedWeapon] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingWeapon, setEditingWeapon] = useState(null);
  const [newWeapon, setNewWeapon] = useState({
    name: '',
    type: 'skill',
    description: '',
    strengths: '',
    weakness: '',
    bestUse: '',
    obtained: true
  });

  const weaponTypes = [
    { value: 'skill', label: 'Skill' },
    { value: 'ability', label: 'Ability' },
    { value: 'matter', label: 'Matter' }
  ];

  const getWeaponIcon = (type) => {
    switch (type) {
      case 'skill': return '🎯';
      case 'ability': return '⚡';
      case 'matter': return '🔧';
      default: return '🗡';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'skill': return 'text-blue-400 bg-blue-900';
      case 'ability': return 'text-green-400 bg-green-900';
      case 'matter': return 'text-purple-400 bg-purple-900';
      default: return 'text-gray-400 bg-gray-900';
    }
  };

  const getTypeLabel = (type) => {
    const typeObj = weaponTypes.find(t => t.value === type);
    return typeObj ? typeObj.label : type;
  };

  const handleAddWeapon = (e) => {
    e.preventDefault();
    if (newWeapon.name.trim() && newWeapon.description.trim()) {
      if (editingWeapon) {
        // For editing, we would need an update function - for now just add new
        addWeapon(newWeapon);
        setEditingWeapon(null);
      } else {
        addWeapon(newWeapon);
      }
      setNewWeapon({
        name: '',
        type: 'skill',
        description: '',
        strengths: '',
        weakness: '',
        bestUse: '',
        obtained: true
      });
      setShowAddModal(false);
    }
  };

  const startEdit = (weapon) => {
    setNewWeapon({
      name: weapon.name,
      type: weapon.type,
      description: weapon.description,
      strengths: weapon.strengths,
      weakness: weapon.weakness,
      bestUse: weapon.bestUse,
      obtained: weapon.obtained
    });
    setEditingWeapon(weapon);
    setShowAddModal(true);
  };

  const cancelEdit = () => {
    setEditingWeapon(null);
    setNewWeapon({
      name: '',
      type: 'skill',
      description: '',
      strengths: '',
      weakness: '',
      bestUse: '',
      obtained: true
    });
    setShowAddModal(false);
  };

  if (selectedWeapon) {
    const weapon = weapons.find(w => w.id === selectedWeapon);
    if (!weapon) {
      setSelectedWeapon(null);
      return null;
    }

    return (
      <div className="p-6 space-y-6">
        {/* Weapon Details Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSelectedWeapon(null)}
              className="bg-fantasy-purple hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              ← Back
            </button>
            <div className="flex items-center space-x-3">
              <span className="text-4xl">{getWeaponIcon(weapon.type)}</span>
                             <div>
                 <h1 className="text-3xl font-bold text-fantasy-gold">{weapon.name}</h1>
                 <div className="flex items-center space-x-2 mt-1">
                   <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(weapon.type)}`}>
                     {getTypeLabel(weapon.type)}
                   </span>
                   <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                     weapon.obtained ? 'bg-green-900 text-green-400' : 'bg-red-900 text-red-400'
                   }`}>
                     {weapon.obtained ? '✅ Obtained' : '❌ Should Obtain'}
                   </span>
                 </div>
               </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => startEdit(weapon)}
              className="bg-fantasy-blue hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              ✏️ Edit
            </button>
            <button
              onClick={() => {
                if (window.confirm(`Delete weapon "${weapon.name}"?`)) {
                  deleteWeapon(weapon.id);
                  setSelectedWeapon(null);
                }
              }}
              className="bg-fantasy-red hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              🗑️ Delete
            </button>
          </div>
        </div>

        {/* Weapon Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Description */}
          <div className="bg-fantasy-dark bg-opacity-50 rounded-lg p-6 border border-fantasy-purple">
            <h3 className="text-xl font-bold text-fantasy-gold mb-3 flex items-center">
              📖 Description
            </h3>
            <p className="text-gray-300 leading-relaxed">{weapon.description}</p>
          </div>

          {/* Best Use */}
          <div className="bg-fantasy-dark bg-opacity-50 rounded-lg p-6 border border-fantasy-purple">
            <h3 className="text-xl font-bold text-fantasy-gold mb-3 flex items-center">
              🎯 Best Use
            </h3>
            <p className="text-gray-300 leading-relaxed">{weapon.bestUse}</p>
          </div>

          {/* Strengths */}
          <div className="bg-fantasy-dark bg-opacity-50 rounded-lg p-6 border border-fantasy-green">
            <h3 className="text-xl font-bold text-fantasy-green mb-3 flex items-center">
              💪 Strengths
            </h3>
            <p className="text-gray-300 leading-relaxed">{weapon.strengths}</p>
          </div>

          {/* Weaknesses */}
          <div className="bg-fantasy-dark bg-opacity-50 rounded-lg p-6 border border-fantasy-red">
            <h3 className="text-xl font-bold text-fantasy-red mb-3 flex items-center">
              ⚠️ Weaknesses
            </h3>
            <p className="text-gray-300 leading-relaxed">{weapon.weakness}</p>
          </div>
        </div>

        {/* Usage Tips */}
        <div className="bg-gradient-to-r from-fantasy-purple to-fantasy-blue rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-3">💡 Usage Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-black bg-opacity-30 rounded-lg p-3">
              <div className="font-medium text-fantasy-gold mb-1">When to Deploy</div>
              <div className="text-gray-200">Use this weapon when facing challenges that require its specific strengths.</div>
            </div>
            <div className="bg-black bg-opacity-30 rounded-lg p-3">
              <div className="font-medium text-fantasy-gold mb-1">Combine With</div>
              <div className="text-gray-200">Consider pairing with complementary weapons to cover weaknesses.</div>
            </div>
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
          <h1 className="text-3xl font-bold text-fantasy-gold">🗡 Weapons</h1>
          <p className="text-gray-300">Your arsenal of skills, abilities, and resources</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-fantasy-purple hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          + Add Weapon
        </button>
      </div>

      {/* Weapons Grid */}
      {weapons.length === 0 ? (
        <div className="bg-fantasy-dark bg-opacity-50 rounded-lg p-12 border border-fantasy-purple text-center">
          <div className="text-6xl mb-4">🗡</div>
          <h3 className="text-2xl font-bold text-fantasy-gold mb-2">No weapons yet</h3>
          <p className="text-gray-300 mb-6">Add your first weapon to start building your arsenal!</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-fantasy-purple hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Add Your First Weapon
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {weapons.map(weapon => (
            <div
              key={weapon.id}
              onClick={() => setSelectedWeapon(weapon.id)}
              className="bg-fantasy-dark bg-opacity-50 rounded-lg p-6 border border-fantasy-purple cursor-pointer transition-all hover:border-fantasy-gold hover:bg-opacity-70"
            >
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-3xl">{getWeaponIcon(weapon.type)}</span>
                                 <div className="flex-1">
                   <div className="flex items-center justify-between mb-1">
                     <h3 className="text-lg font-bold text-fantasy-gold">{weapon.name}</h3>
                     <span className={`text-sm ${weapon.obtained ? 'text-green-400' : 'text-red-400'}`}>
                       {weapon.obtained ? '✅' : '❌'}
                     </span>
                   </div>
                   <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getTypeColor(weapon.type)}`}>
                     {getTypeLabel(weapon.type)}
                   </span>
                 </div>
              </div>
              
              <p className="text-gray-300 text-sm mb-4 line-clamp-3">{weapon.description}</p>
              
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-fantasy-green font-medium">Strengths:</span>
                  <span className="text-gray-400 ml-1 line-clamp-1">{weapon.strengths}</span>
                </div>
                <div>
                  <span className="text-fantasy-red font-medium">Weakness:</span>
                  <span className="text-gray-400 ml-1 line-clamp-1">{weapon.weakness}</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-fantasy-purple flex justify-between items-center">
                <span className="text-xs text-gray-500">Click to view details</span>
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      startEdit(weapon);
                    }}
                    className="text-fantasy-blue hover:text-blue-300 transition-colors"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm(`Delete weapon "${weapon.name}"?`)) {
                        deleteWeapon(weapon.id);
                      }
                    }}
                    className="text-fantasy-red hover:text-red-300 transition-colors"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Weapon Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-fantasy-dark border-2 border-fantasy-purple rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-fantasy-gold mb-4">
              {editingWeapon ? 'Edit Weapon' : 'Add New Weapon'}
            </h2>
            <form onSubmit={handleAddWeapon} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Weapon Name</label>
                  <input
                    type="text"
                    value={newWeapon.name}
                    onChange={(e) => setNewWeapon({...newWeapon, name: e.target.value})}
                    className="w-full bg-fantasy-purple bg-opacity-30 border border-fantasy-purple rounded-lg px-3 py-2 text-white placeholder-gray-400"
                    placeholder="Enter weapon name..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Type of Weapon</label>
                  <select
                    value={newWeapon.type}
                    onChange={(e) => setNewWeapon({...newWeapon, type: e.target.value})}
                    className="w-full bg-fantasy-purple bg-opacity-30 border border-fantasy-purple rounded-lg px-3 py-2 text-white"
                  >
                    {weaponTypes.map(type => (
                      <option key={type.value} value={type.value} className="bg-fantasy-dark">
                        {getWeaponIcon(type.value)} {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Obtained Status</label>
                  <select
                    value={newWeapon.obtained ? 'true' : 'false'}
                    onChange={(e) => setNewWeapon({...newWeapon, obtained: e.target.value === 'true'})}
                    className="w-full bg-fantasy-purple bg-opacity-30 border border-fantasy-purple rounded-lg px-3 py-2 text-white"
                  >
                    <option value="true" className="bg-fantasy-dark">✅ Already Obtained</option>
                    <option value="false" className="bg-fantasy-dark">❌ Should Be Obtained</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  value={newWeapon.description}
                  onChange={(e) => setNewWeapon({...newWeapon, description: e.target.value})}
                  className="w-full h-24 bg-fantasy-purple bg-opacity-30 border border-fantasy-purple rounded-lg px-3 py-2 text-white placeholder-gray-400 resize-none"
                  placeholder="Describe this weapon..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Strengths</label>
                <textarea
                  value={newWeapon.strengths}
                  onChange={(e) => setNewWeapon({...newWeapon, strengths: e.target.value})}
                  className="w-full h-20 bg-fantasy-purple bg-opacity-30 border border-fantasy-purple rounded-lg px-3 py-2 text-white placeholder-gray-400 resize-none"
                  placeholder="What are this weapon's advantages?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Weaknesses</label>
                <textarea
                  value={newWeapon.weakness}
                  onChange={(e) => setNewWeapon({...newWeapon, weakness: e.target.value})}
                  className="w-full h-20 bg-fantasy-purple bg-opacity-30 border border-fantasy-purple rounded-lg px-3 py-2 text-white placeholder-gray-400 resize-none"
                  placeholder="What are this weapon's limitations?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Best Use</label>
                <textarea
                  value={newWeapon.bestUse}
                  onChange={(e) => setNewWeapon({...newWeapon, bestUse: e.target.value})}
                  className="w-full h-20 bg-fantasy-purple bg-opacity-30 border border-fantasy-purple rounded-lg px-3 py-2 text-white placeholder-gray-400 resize-none"
                  placeholder="When is this weapon most effective?"
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-fantasy-purple hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  {editingWeapon ? 'Update Weapon' : 'Add Weapon'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weapons;