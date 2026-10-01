import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { TOPICS, DSA_QUESTIONS } from '../data/dsaQuestions';
import CodeBlock from '../components/CodeBlock';
import {
  User,
  Flame,
  Award,
  Bookmark,
  Calendar,
  Edit3,
  History,
  TrendingUp
} from 'lucide-react';

export default function ProfilePage({ onStartQuiz, onNavigate }) {
  const { user, updateUserProfile, openAuth } = useAuth();
  const [activeProfileTab, setActiveProfileTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editBio, setEditBio] = useState(user?.bio || '');
  const [editTitle, setEditTitle] = useState(user?.title || '');

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-16 text-center bg-white dark:bg-[#262B40] border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-card">
        <div className="w-12 h-12 rounded-2xl bg-[#A8C4EC]/20 dark:bg-[#0474C4]/20 text-[#0474C4] dark:text-[#A8C4EC] flex items-center justify-center mx-auto mb-4">
          <User className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Sign In to View Your Profile</h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">
          Log in or create a profile to track topic mastery, unlock badges, and save bookmarked problems.
        </p>
        <button
          onClick={() => openAuth('login')}
          className="w-full py-2.5 bg-[#0474C4] hover:bg-[#06457F] text-white font-semibold text-sm rounded-xl shadow-md"
        >
          Sign In / Demo Login
        </button>
      </div>
    );
  }

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUserProfile({
      name: editName,
      bio: editBio,
      title: editTitle
    });
    setIsEditing(false);
  };

  const bookmarkedQuestions = DSA_QUESTIONS.filter((q) =>
    user.bookmarks?.includes(q.id)
  );

  const xpProgress = Math.min(100, Math.round((user.xp % 300) / 3));

  return (
    <div className="max-w-6xl mx-auto px-4 py-4 space-y-8 pb-16">
      
      {/* Profile Header Banner */}
      <div className="bg-white dark:bg-[#262B40] border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-subtle relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          {/* User Info Avatar & Title */}
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-[#0474C4]/30 shadow-md"
              />
              
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  {user.name}
                </h1>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#A8C4EC]/20 dark:bg-[#0474C4]/20 text-[#06457F] dark:text-[#A8C4EC] border border-[#A8C4EC]/40 dark:border-[#0474C4]/40">
                  {user.rank}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 font-mono">@{user.username}</p>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-md">{user.bio}</p>

              <div className="flex items-center gap-4 text-xs text-slate-400 mt-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#5379AE]" /> Joined {user.joinedDate}
                </span>
                
              </div>
            </div>
          </div>

          {/* Edit Profile CTA */}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-[#2C444C] text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 transition-colors self-start md:self-auto"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Cancel Editing' : 'Edit Profile'}</span>
          </button>
        </div>

        

        {/* Edit Profile Inline Modal */}
        {isEditing && (
          <form onSubmit={handleSaveProfile} className="mt-6 p-4 rounded-2xl bg-slate-50 dark:bg-[#2C444C]/30 border border-slate-200 dark:border-slate-700 space-y-3 animate-in fade-in duration-150">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Update Profile Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-500 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full p-2 text-xs bg-white dark:bg-[#262B40] border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-500 block mb-1">User Title / Goal</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full p-2 text-xs bg-white dark:bg-[#262B40] border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>
            </div>
            <div>
              <label className="text-[11px] text-slate-500 block mb-1">Short Bio</label>
              <input
                type="text"
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                className="w-full p-2 text-xs bg-white dark:bg-[#262B40] border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-3 py-1.5 text-xs text-slate-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-[#0474C4] text-white text-xs font-semibold rounded-lg shadow-sm"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto scrollbar-none">
        {[
          { id: 'overview', label: 'Mastery & Stats', icon: TrendingUp },
          { id: 'history', label: `Quiz History (${user.quizHistory.length})`, icon: History },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeProfileTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveProfileTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-[#0474C4] text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#2C444C]/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Mastery & Stats */}
      {activeProfileTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Key Metric Highlights */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white dark:bg-[#262B40] border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-subtle space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Performance Overview
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-[#2C444C]/30">
                  <span className="text-slate-500 dark:text-slate-400">Accuracy</span>
                  <span className="font-bold text-[#0474C4] dark:text-[#A8C4EC] text-sm">{user.accuracy}%</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-[#2C444C]/30">
                  <span className="text-slate-500 dark:text-slate-400">Total Solved</span>
                  <span className="font-bold text-slate-900 dark:text-white text-sm">{user.totalSolved}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-[#2C444C]/30">
                  <span className="text-slate-500 dark:text-slate-400">Quizzes Completed</span>
                  <span className="font-bold text-slate-900 dark:text-white text-sm">{user.totalQuizzes}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-[#2C444C]/30">
                  <span className="text-slate-500 dark:text-slate-400">Avg. Speed</span>
                  <span className="font-bold text-slate-900 dark:text-white text-sm">{user.avgTimePerQuestion}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Category Mastery Progress Bars */}
          <div className="lg:col-span-2 bg-white dark:bg-[#262B40] border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-subtle">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  DSA Skill Radar & Category Mastery
                </h3>
                <p className="text-xs text-slate-400">
                  Calculated based on your accuracy in individual topic modules
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {TOPICS.filter(t => t.id !== 'all').map((topic) => {
                const score = user.topicMastery[topic.id] || 0;
                return (
                  <div key={topic.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{topic.name}</span>
                      <span className="font-mono font-bold text-[#0474C4] dark:text-[#A8C4EC]">{score}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          score >= 85 ? 'bg-gradient-to-r from-[#0474C4] to-emerald-500' :
                          score >= 70 ? 'bg-gradient-to-r from-[#06457F] to-[#0474C4]' :
                          score >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                        }`}
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      

      

      {/* Tab 4: Quiz History */}
      {activeProfileTab === 'history' && (
        <div className="bg-white dark:bg-[#262B40] border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-subtle space-y-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
            Past Quiz Attempts
          </h3>

          <div className="divide-y divide-slate-100 dark:border-slate-800">
            {user.quizHistory.map((item) => (
              <div key={item.id} className="py-3.5 flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{item.topic}</h4>
                  <p className="text-xs text-slate-400">{item.date} • {item.correct} of {item.total} correct</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 rounded-xl text-xs font-bold ${
                    item.score >= 80 ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300' :
                    item.score >= 60 ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300' :
                    'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                  }`}>
                    {item.score}%
                  </span>
                  <button
                    onClick={() => onStartQuiz(item.topicId || 'all')}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-[#2C444C]/50 hover:bg-[#0474C4] hover:text-white transition-colors"
                  >
                    Retake
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
