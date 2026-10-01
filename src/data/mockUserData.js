export const DEFAULT_USER = {
  id: 'user-001',
  name: 'Vishal Khatri',
  username: 'vishal_codes',
  email: 'vishalkhatri2047@gmail.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  title: 'Algorithm Enthusiast',
  level: 14,
  xp: 3450,
  nextLevelXp: 5000,
  streakDays: 12,
  rank: 'Knight (Top 8%)',
  totalQuizzes: 38,
  totalSolved: 194,
  accuracy: 84.5,
  avgTimePerQuestion: '42s',
  joinedDate: 'January 2026',
  bio: 'Computer Science student aiming for FAANG internships. Practicing DSA daily!',
  topicMastery: {
    'arrays': 92,
    'linked-lists': 85,
    'stacks-queues': 88,
    'trees': 76,
    'graphs': 70,
    'dp': 64,
    'sorting-searching': 90,
    'complexity': 95
  },
  badges: [
    { id: 'b1', name: '7-Day Streak', icon: 'Flame', desc: 'Maintained a quiz streak for 7 consecutive days', unlocked: true, date: 'Feb 15, 2026' },
    { id: 'b2', name: 'Array Ace', icon: 'Award', desc: 'Scored 90%+ in 5 Array quizzes', unlocked: true, date: 'Feb 28, 2026' },
    { id: 'b3', name: 'Graph Pioneer', icon: 'Share2', desc: 'Solved 25 Graph problems', unlocked: true, date: 'Mar 10, 2026' },
    { id: 'b4', name: 'Speed Demon', icon: 'Zap', desc: 'Answered 10 questions correctly in under 20s each', unlocked: true, date: 'Mar 18, 2026' },
    { id: 'b5', name: 'DP Grandmaster', icon: 'Crown', desc: 'Reach 85%+ accuracy in Dynamic Programming', unlocked: false, progress: 64 },
    { id: 'b6', name: 'Century Club', icon: 'Target', desc: 'Complete 100 quizzes total', unlocked: false, progress: 38 }
  ],
  quizHistory: [
    {
      id: 'qh-1',
      topic: 'Dynamic Programming',
      topicId: 'dp',
      date: 'Yesterday, 8:30 PM',
      score: 80,
      total: 5,
      correct: 4,
      difficulty: 'Medium',
      timeTaken: '3m 45s'
    },
    {
      id: 'qh-2',
      topic: 'Trees & BST',
      topicId: 'trees',
      date: 'Sep 28, 2026',
      score: 100,
      total: 5,
      correct: 5,
      difficulty: 'Hard',
      timeTaken: '4m 12s'
    },
    {
      id: 'qh-3',
      topic: 'Graphs (BFS/DFS)',
      topicId: 'graphs',
      date: 'Sep 25, 2026',
      score: 75,
      total: 4,
      correct: 3,
      difficulty: 'Medium',
      timeTaken: '2m 50s'
    },
    {
      id: 'qh-4',
      topic: 'Arrays & Strings',
      topicId: 'arrays',
      date: 'Sep 22, 2026',
      score: 100,
      total: 5,
      correct: 5,
      difficulty: 'Easy',
      timeTaken: '1m 55s'
    }
  ],
  bookmarks: ['arr-2', 'tree-3', 'dp-2', 'graph-1']
};

export const LEADERBOARD = [
  { rank: 1, name: 'Elena Rostova', username: 'erostova', score: 14850, accuracy: 96.2, streak: 45, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150' },
  { rank: 2, name: 'David Kim', username: 'dkim_codes', score: 13920, accuracy: 94.8, streak: 32, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150' },
  { rank: 3, name: 'Priya Sharma', username: 'priya_algo', score: 12480, accuracy: 93.1, streak: 28, avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150' },
  { rank: 4, name: 'Vishal Khatri (You)', username: 'vishal_codes', score: 9850, accuracy: 84.5, streak: 12, avatar: 'avatar.webp', isCurrentUser: true },
  { rank: 5, name: 'Marcus Vance', username: 'mvance', score: 9420, accuracy: 82.0, streak: 15, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150' },
  { rank: 6, name: 'Sarah Jenkins', username: 'sjenkins', score: 8900, accuracy: 81.4, streak: 9, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150' }
];
