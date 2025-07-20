import React, { useState } from 'react';

const Calendar = ({ quests }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getQuestsForDate = (dateString) => {
    return quests.filter(quest => quest.date === dateString);
  };

  const formatDate = (year, month, day) => {
    const monthStr = (month + 1).toString().padStart(2, '0');
    const dayStr = day.toString().padStart(2, '0');
    return `${year}-${monthStr}-${dayStr}`;
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
    setSelectedDay(null);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-20 border border-fantasy-purple opacity-30"></div>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = formatDate(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayQuests = getQuestsForDate(dateString);
      const isToday = dateString === todayStr;
      const hasQuests = dayQuests.length > 0;
      const completedQuests = dayQuests.filter(q => q.completed).length;
      const activeQuests = dayQuests.filter(q => !q.completed).length;

      days.push(
        <div
          key={day}
          onClick={() => setSelectedDay({ day, dateString, quests: dayQuests })}
          className={`h-20 border border-fantasy-purple p-2 cursor-pointer transition-all duration-200 hover:bg-fantasy-purple hover:bg-opacity-30 ${
            isToday ? 'bg-fantasy-gold bg-opacity-20 border-fantasy-gold' : ''
          } ${selectedDay?.day === day ? 'bg-fantasy-blue bg-opacity-30' : ''}`}
        >
          <div className="flex justify-between items-start h-full">
            <span className={`text-sm font-medium ${isToday ? 'text-fantasy-gold' : 'text-white'}`}>
              {day}
            </span>
            {hasQuests && (
              <div className="flex flex-col items-end text-xs space-y-1">
                {activeQuests > 0 && (
                  <span className="bg-fantasy-blue text-white px-1 rounded text-xs">
                    {activeQuests}
                  </span>
                )}
                {completedQuests > 0 && (
                  <span className="bg-fantasy-green text-white px-1 rounded text-xs">
                    ✓{completedQuests}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'Hard': return 'text-orange-400';
      case 'Badass Hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-fantasy-gold mb-2">📅 Calendar</h1>
        <p className="text-gray-300">Track your quests across time</p>
      </div>

      {/* Calendar Navigation */}
      <div className="bg-fantasy-dark bg-opacity-50 rounded-lg p-6 border border-fantasy-purple">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigateMonth(-1)}
            className="bg-fantasy-purple hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            ← Previous
          </button>
          <h2 className="text-2xl font-bold text-fantasy-gold">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button
            onClick={() => navigateMonth(1)}
            className="bg-fantasy-purple hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Next →
          </button>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map(day => (
            <div key={day} className="text-center text-sm font-medium text-fantasy-gold py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {renderCalendar()}
        </div>

        {/* Legend */}
        <div className="mt-4 flex justify-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-fantasy-blue rounded"></div>
            <span className="text-gray-300">Active Quests</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-fantasy-green rounded"></div>
            <span className="text-gray-300">Completed Quests</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-fantasy-gold rounded"></div>
            <span className="text-gray-300">Today</span>
          </div>
        </div>
      </div>

      {/* Day Details */}
      {selectedDay && (
        <div className="bg-fantasy-dark bg-opacity-50 rounded-lg p-6 border border-fantasy-purple">
          <h3 className="text-xl font-bold text-fantasy-gold mb-4">
            📅 {monthNames[currentDate.getMonth()]} {selectedDay.day}, {currentDate.getFullYear()}
          </h3>
          {selectedDay.quests.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <div className="text-4xl mb-2">📝</div>
              <p>No quests scheduled for this day</p>
            </div>
          ) : (
            <div className="space-y-3">
              {selectedDay.quests.map(quest => (
                <div key={quest.id} className={`rounded-lg p-4 border ${
                  quest.completed 
                    ? 'bg-gray-800 bg-opacity-50 border-gray-600 opacity-75' 
                    : 'bg-fantasy-purple bg-opacity-30 border-fantasy-purple'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-2xl">
                          {quest.stat === 'health' ? '❤️' :
                           quest.stat === 'brain' ? '🧠' :
                           quest.stat === 'discipline' ? '🏹' :
                           quest.stat === 'social' ? '🗣' :
                           quest.stat === 'combat' ? '⚔️' :
                           quest.stat === 'wealth' ? '💰' :
                           quest.stat === 'wisdom' ? '✨' : '❓'}
                        </span>
                        <h4 className={`text-lg font-semibold ${quest.completed ? 'line-through' : ''}`}>
                          {quest.title}
                        </h4>
                        {quest.completed && <span className="text-fantasy-green">✅</span>}
                      </div>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className={`px-2 py-1 rounded ${quest.completed ? 'bg-gray-700 text-gray-300' : 'bg-fantasy-dark text-fantasy-gold'}`}>
                          {quest.category}
                        </span>
                        <span className={`${getDifficultyColor(quest.difficulty)}`}>
                          {quest.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Calendar;