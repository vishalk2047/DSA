import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { TOPICS, DSA_QUESTIONS } from '../data/dsaQuestions';
import StatsCard from '../components/StatsCard';
import TopicCard from '../components/TopicCard';
import {
  Sparkles,
  Trophy,
  Target,
  Flame,
  Sliders,
  CheckCircle2,
  Play,
  RotateCcw,
  ArrowRight
} from 'lucide-react';

export default function DashboardPage({ onOpenQuizModal, onNavigate }) {
  const { user } = useAuth();
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  const filteredQuestions = DSA_QUESTIONS.filter((q) => {
    const matchesTopic = selectedTopic === 'all' || q.topic === selectedTopic;
    const matchesDiff = difficultyFilter === 'all' || q.difficulty.toLowerCase() === difficultyFilter.toLowerCase();
    return matchesTopic && matchesDiff;
  });

  return (
    <div className="space-y-8 pb-12">
      
      {/* Dashboard Top Welcome & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-[#262B40] border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-subtle">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              {user ? `Welcome back, ${user.name.split(' ')[0]}!` : 'DSA Quiz Dashboard'}
            </h1>
            <span className="p-1 rounded-lg bg-[#A8C4EC]/20 dark:bg-[#0474C4]/20 text-[#0474C4] dark:text-[#A8C4EC]">
              <Sparkles className="w-5 h-5" />
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Pick a topic, select your difficulty level, and set how many questions you want to solve.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => onOpenQuizModal('all', 'all')}
            className="px-4 py-2.5 rounded-xl border border-[#A8C4EC]/50 dark:border-[#0474C4]/40 bg-[#A8C4EC]/15 dark:bg-[#0474C4]/15 hover:bg-[#A8C4EC]/30 dark:hover:bg-[#0474C4]/30 text-[#06457F] dark:text-[#A8C4EC] text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all"
          >
            <Sliders className="w-4 h-4" />
            <span>Customize Quiz (Topic, Diff, Qs)</span>
          </button>

          <button
            onClick={() => onOpenQuizModal('all', 'all')}
            className="px-5 py-2.5 rounded-xl bg-[#0474C4] hover:bg-[#06457F] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-sm transition-all"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Quick Start Challenge</span>
          </button>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Accuracy Rate"
          value={`${user?.accuracy || 85}%`}
          subtitle="Target: >80%"
          trend="+3.2%"
          icon={Target}
          color="blue"
        />
        <StatsCard
          title="Problems Solved"
          value={user?.totalSolved || 194}
          subtitle="Across all categories"
          trend="Active"
          icon={CheckCircle2}
          color="emerald"
        />
        
      </div>

      {/* Topic Filter & Difficulty Switcher Bar */}
      <div className="bg-white dark:bg-[#262B40] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-subtle space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* Topic Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {TOPICS.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedTopic === topic.id
                    ? 'bg-[#0474C4] text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-[#2C444C]/50 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#2C444C]'
                }`}
              >
                {topic.name}
              </button>
            ))}
          </div>

          {/* Difficulty Dropdown / Filter */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-xs text-slate-400 font-medium">Difficulty:</span>
            <div className="inline-flex bg-slate-100 dark:bg-[#2C444C]/50 p-1 rounded-xl text-xs font-medium">
              {['all', 'Easy', 'Medium', 'Hard'].map((diff) => (
                <button
                  key={diff}
                  onClick={() => setDifficultyFilter(diff.toLowerCase())}
                  className={`px-2.5 py-1 rounded-lg capitalize transition-all ${
                    difficultyFilter === diff.toLowerCase()
                      ? 'bg-white dark:bg-[#262B40] text-slate-900 dark:text-white font-semibold shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Topic Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            {selectedTopic === 'all' ? 'All DSA Tracks' : TOPICS.find(t => t.id === selectedTopic)?.name}
          </h2>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {filteredQuestions.length} Questions Available
          </span>
        </div>

        {selectedTopic === 'all' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TOPICS.filter(t => t.id !== 'all').map((topic) => {
              const count = DSA_QUESTIONS.filter(q => q.topic === topic.id).length;
              const mastery = user?.topicMastery[topic.id] || 0;
              return (
                <TopicCard
                  key={topic.id}
                  topic={topic}
                  questionCount={count}
                  mastery={mastery}
                  onStartQuiz={() => onOpenQuizModal(topic.id, difficultyFilter)}
                />
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredQuestions.map((q, idx) => (
              <div
                key={q.id}
                className="bg-white dark:bg-[#262B40] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-subtle flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-mono text-slate-400 uppercase">Q{idx + 1} • {q.id}</span>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                      q.difficulty === 'Easy' ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800' :
                      q.difficulty === 'Medium' ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800' :
                      'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800'
                    }`}>
                      {q.difficulty}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-2">
                    {q.question}
                  </h4>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono">4 Options</span>
                  <button
                    onClick={() => onOpenQuizModal(q.topic, q.difficulty.toLowerCase())}
                    className="flex items-center gap-1.5 font-semibold text-[#0474C4] dark:text-[#A8C4EC] hover:text-[#06457F]"
                  >
                    <span>Customize & Start</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Quiz Activity History */}
      {user && user.quizHistory && user.quizHistory.length > 0 && (
        <div className="bg-white dark:bg-[#262B40] border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-subtle">
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Recent Quiz Performance
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Review past sessions and analyze your growth
              </p>
            </div>

            <button
              onClick={() => onNavigate('profile')}
              className="text-xs font-semibold text-[#0474C4] dark:text-[#A8C4EC] hover:underline"
            >
              Full Profile History →
            </button>
          </div>

          <div className="space-y-3">
            {user.quizHistory.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-[#2C444C]/30 gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl text-xs font-bold ${
                    item.score >= 80 ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300' :
                    item.score >= 50 ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300' :
                    'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                  }`}>
                    {item.score}%
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{item.topic}</h4>
                    <p className="text-[11px] text-slate-400">{item.date} • {item.correct}/{item.total} Correct • {item.timeTaken || '2m 15s'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-200 dark:bg-[#2C444C] text-slate-700 dark:text-slate-300 font-medium">
                    {item.difficulty}
                  </span>
                  <button
                    onClick={() => onOpenQuizModal(item.topicId || 'all', item.difficulty?.toLowerCase() || 'all')}
                    className="px-3 py-1.5 rounded-lg bg-[#A8C4EC]/20 hover:bg-[#A8C4EC]/40 text-[#06457F] dark:text-[#A8C4EC] text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake & Customize</span>
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
