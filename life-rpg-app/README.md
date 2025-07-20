# 🌟 Life RPG App

Transform your real life into an epic fantasy RPG adventure! Track your quests, wage wars against big projects, build your arsenal of skills, and earn legendary titles.

![Life RPG App](public/logo192.png)

## ✨ Features

### 🏠 **Home Tab**
- **Character Level & XP System**: Level up by completing quests (XP required = current level × 100)
- **Fantasy Stats Tracking**: Health ❤️, Brain 🧠, Discipline 🏹, Social 🗣, Combat ⚔️, Wealth 💰, Wisdom ✨
- **Discipline Bonus**: Automatically gain +0.5 Discipline for every quest completed
- **Achievement Summary**: Track total quests completed, wars won, and titles earned

### 📜 **Quests Tab**
- **Quest Management**: Create and complete daily tasks and challenges
- **Difficulty Levels**: Easy (5 XP), Medium (10 XP), Hard (15 XP), Badass Hard (20 XP), Special (Custom XP)
- **Categories**: Daily, 3 Days Circle, Weekly, Side Quest, or War Quest
- **Auto-Repeat Logic**: Daily/3 Days/Weekly quests automatically reschedule after completion
- **Custom XP**: Special difficulty allows manual XP setting (1-100)
- **Stat Progression**: Each quest improves a specific character stat
- **Categorized History**: Completed quests grouped by category with completion counts

### 📅 **Calendar Tab**
- **Monthly Calendar View**: See quest distribution across time
- **Day Navigation**: Click any day to view scheduled quests
- **Visual Indicators**: Active quests and completed quests clearly marked
- **Auto-Scheduling**: Repeating quests automatically appear on future dates
- **Progress Tracking**: Monitor your consistency and productivity patterns

### ⚔️ **Wars Tab**
- **Epic Campaigns**: Create large projects broken down into smaller quests
- **War Arsenal**: Attach weapons (skills/abilities) to your wars
- **Weapons Needed**: Define required weapons and track their obtained status
- **Strategy Planning**: Free-text area for notes and battle plans
- **Progress Tracking**: Visual progress bars and completion percentages
- **Reward Titles**: Unlock custom titles when you complete wars

### 🗡 **Weapons Tab**
- **Arsenal Management**: Catalog your skills, abilities, and resources
- **Weapon Types**: Skills 🎯, Abilities ⚡, Matter 🔧
- **Obtained Status**: Track which weapons you have vs. should obtain
- **Detailed Profiles**: Description, strengths, weaknesses, and best use cases
- **War Integration**: Attach weapons to specific wars and define needed weapons

### 👑 **Titles Tab**
- **Achievement System**: Unlock titles through level progression and war victories
- **Rarity Levels**: Common, Uncommon, Rare, Epic, and Legendary titles
- **Milestone Rewards**: Automatic title unlocks at specific levels
- **Custom War Titles**: Earn unique titles for completing major campaigns

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone or download the project**
   ```bash
   cd life-rpg-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   - Navigate to `http://localhost:3000`
   - The app will automatically reload when you make changes

### Build for Production
```bash
npm run build
```

## 🆕 New Features

### ✨ **Enhanced Quest System**
- **3 Days Circle Category**: Perfect for habits that don't need daily tracking
- **Special Difficulty**: Set custom XP rewards for unique achievements
- **Auto-Repeat**: Daily, 3 Days, and Weekly quests automatically reschedule
- **Grouped History**: See completed quests organized by category

### 🎯 **Weapon Status Tracking**
- **Obtained vs Needed**: Clear visual indicators for weapon acquisition status
- **War Planning**: Define which weapons are needed for specific campaigns
- **Strategic Overview**: See at a glance what skills you need to develop

### 📅 **Smart Calendar**
- **Auto-Scheduling**: Repeating quests appear automatically on future dates
- **Visual Patterns**: Easily spot your consistency streaks and gaps

## 🎮 How to Use

### Getting Started
1. **Start on the Home tab** to see your character stats and level
2. **Create your first quest** in the Quests tab to begin earning XP
3. **Plan your week** using the Calendar to schedule important tasks
4. **Build your arsenal** by adding skills and abilities in the Weapons tab

### Quest Strategy
- Use **Daily** for habits you want to build every day
- Use **3 Days Circle** for habits that need regular but not daily attention
- Use **Weekly** for bigger tasks or reviews
- Use **Special difficulty** for unique achievements with custom XP rewards
- Reserve **Hard** and **Badass Hard** for challenging goals
- Balance quests across different stats for well-rounded character growth
- Remember: Every quest completion gives you +0.5 Discipline bonus!

### War Planning
1. **Create a war** for any major project or goal
2. **Define weapons needed** to identify skills you need to develop
3. **Break it down** into smaller, manageable war quests
4. **Attach relevant weapons** to leverage your existing skills
5. **Use the strategy section** to plan your approach and track insights
6. **Monitor weapon acquisition** to track your preparation progress
7. **Claim your reward title** when you achieve victory!

### Progression Tips
- **Consistency beats intensity**: Regular small quests often beat sporadic large ones
- **Use the calendar** to maintain momentum and spot patterns
- **Build your weapons arsenal** to reference your growing capabilities
- **Celebrate milestones** by checking your titles and achievements

## 🎨 Customization

### Fantasy Theme
The app uses a dark fantasy theme with:
- **Primary Colors**: Fantasy Purple, Gold, Blue, Green, Red
- **Dark Mode**: Optimized for extended use
- **Responsive Design**: Works on desktop, tablet, and mobile

### Data Storage
- **Local Storage**: All your data is saved in your browser
- **No Account Required**: Start using immediately
- **Data Persistence**: Your progress won't be lost when you refresh

## 🔧 Technical Details

### Built With
- **React 18**: Modern React with functional components and hooks
- **Custom CSS**: Fantasy-themed styling with CSS variables
- **Local Storage**: Enhanced data persistence with new data models
- **Responsive Design**: Mobile-first approach

### Data Models
**Quest Object**:
```json
{
  "id": "unique-id",
  "title": "Do 30 pushups",
  "category": "daily | 3days | weekly | side | war",
  "difficulty": "easy | medium | hard | badass | special",
  "manualXP": 30,
  "xp": 10,
  "stat": "health | brain | discipline | social | combat | wealth | wisdom",
  "repeatCycle": "daily | 3days | weekly | none",
  "date": "2025-07-18",
  "completed": false
}
```

**Weapon Object**:
```json
{
  "id": "unique-id",
  "name": "Sword of Focus",
  "type": "skill | ability | matter",
  "description": "Improves deep work",
  "strengths": "Great for learning",
  "weaknesses": "Low in social impact",
  "bestUse": "Morning work sessions",
  "obtained": true
}
```

**War Object**:
```json
{
  "id": "unique-id",
  "title": "Master Web Development",
  "description": "A big project to learn React",
  "quests": [/* array of War Quests */],
  "progress": 40,
  "completed": false,
  "rewardTitle": "Web Knight",
  "weaponsNeeded": ["id-of-weapon-1", "id-of-weapon-2"],
  "strategy": "Learn fundamentals first, then build apps"
}
```

### File Structure
```
src/
├── components/           # React components
│   ├── Home.js          # Character stats and level display
│   ├── Quests.js        # Quest management and completion
│   ├── Calendar.js      # Monthly calendar with quest indicators
│   ├── Wars.js          # Epic campaign management
│   ├── Weapons.js       # Skills and abilities arsenal
│   └── Titles.js        # Achievement and title system
├── App.js               # Main application component
├── index.css            # Custom CSS styles and theme
└── index.js             # Application entry point
```

## 🎯 Game Mechanics

### Leveling System
- **XP Required**: Current Level × 100
- **Level Benefits**: Unlock new milestone titles
- **No Level Cap**: Continue growing indefinitely

### Stat System
- **7 Core Stats**: Each affects different aspects of your character
- **Flexible Growth**: Choose which stats to focus on based on your goals
- **Discipline Bonus**: Universal improvement from any quest completion

### Title System
- **Level Titles**: Novice (Lv1), Apprentice (Lv5), Knight (Lv10), Master (Lv20)
- **War Titles**: Custom titles you define when creating wars
- **Rarity System**: Common to Legendary classification

## 🌟 Tips for Success

### Daily Habits
- Create daily quests for important habits
- Use Easy difficulty for consistency
- Check the calendar to maintain streaks

### Major Projects
- Break large goals into wars with multiple quests
- Use the strategy section to plan and adjust approaches
- Attach relevant weapons to leverage your skills

### Character Development
- Balance different stats based on your life goals
- Use Brain for learning projects, Combat for challenges, Social for relationships
- Track patterns in your quest completion for insights

## 🤝 Contributing

This is a personal productivity app, but feel free to:
- Fork the project for your own modifications
- Suggest improvements or features
- Share your experience and strategies

## 📝 License

This project is open source and available under the MIT License.

---

**Start your epic life adventure today!** 🗡️⚔️👑

*"Every quest completed, every challenge faced, shapes the hero you're becoming."*
