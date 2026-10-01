import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { TOPICS, DAILY_CHALLENGE, DSA_QUESTIONS } from '../data/dsaQuestions';
import TopicCard from '../components/TopicCard';
import CodeBlock from '../components/CodeBlock';
import {
  ArrowRight,
  Flame,
  CheckCircle2,
  HelpCircle,
  Play,
  Sliders
} from 'lucide-react';

export default function HomePage({ onNavigate, onOpenQuizModal }) {
  const { user, openAuth } = useAuth();
  const [dailyAnswer, setDailyAnswer] = useState(null);
  const [dailySubmitted, setDailySubmitted] = useState(false);

  // Quick setup state in hero section
  const [quickTopic, setQuickTopic] = useState('all');
  const [quickDiff, setQuickDiff] = useState('all');
  const [quickCount, setQuickCount] = useState(5);

  const handleDailySubmit = () => {
    if (dailyAnswer === null) return;
    setDailySubmitted(true);
  };

  const isDailyCorrect = dailyAnswer === DAILY_CHALLENGE.correctAnswer;

  const handleCountInputChange = (e) => {
    const val = e.target.value;
    if (val === '') {
      setQuickCount('');
      return;
    }
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed)) {
      setQuickCount(Math.max(1, Math.min(15, parsed)));
    }
  };

  const handleBlur = () => {
    if (!quickCount || quickCount < 1) {
      setQuickCount(1);
    } else if (quickCount > 15) {
      setQuickCount(15);
    }
  };

  const handleStartConfiguredQuiz = () => {
    const finalCount = Math.max(1, Math.min(15, parseInt(quickCount, 10) || 5));
    onOpenQuizModal(quickTopic, quickDiff, finalCount);
  };

  return (
    <div className="space-y-16 pb-12">
      
      {/* Hero Section */}
      <section className="relative pt-6 sm:pt-10 text-center max-w-4xl mx-auto px-4">

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
          Master Data Structures & Algorithms 
        </h1>

        {/* Interactive Quick Launch Box (Topic + Difficulty + Direct 1-15 Question Input) */}
        <div className="mt-8 p-5 sm:p-6 bg-white dark:bg-[#262B40] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-card text-left max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0474C4] dark:text-[#A8C4EC] flex items-center gap-1.5">
              <Sliders className="w-4 h-4" /> Quick Quiz Builder
            </span>
            <span className="text-[11px] text-slate-400">Configure & launch immediately</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            
            {/* 1. Topic */}
            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
                1. Topic
              </label>
              <select
                value={quickTopic}
                onChange={(e) => setQuickTopic(e.target.value)}
                className="w-full p-2.5 text-xs font-medium bg-slate-50 dark:bg-[#2C444C]/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-[#0474C4] outline-none"
              >
                <option value="all">All Topics (Mixed)</option>
                {TOPICS.filter(t => t.id !== 'all').map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>

            {/* 2. Difficulty */}
            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
                2. Difficulty
              </label>
              <select
                value={quickDiff}
                onChange={(e) => setQuickDiff(e.target.value)}
                className="w-full p-2.5 text-xs font-medium bg-slate-50 dark:bg-[#2C444C]/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-[#0474C4] outline-none"
              >
                <option value="all">Mixed / All</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            {/* 3. Number of Questions (Direct Whole Number Input from 1 to 15) */}
            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
                3. Questions (1 - 15)
              </label>
              <input
                type="number"
                min="1"
                max="15"
                step="1"
                placeholder="1 - 15"
                value={quickCount}
                onChange={handleCountInputChange}
                onBlur={handleBlur}
                className="w-full p-2.5 text-xs font-bold font-mono bg-slate-50 dark:bg-[#2C444C]/50 border border-slate-200 dark:border-slate-700 rounded-xl text-[#0474C4] dark:text-[#A8C4EC] focus:ring-2 focus:ring-[#0474C4] outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleStartConfiguredQuiz}
              className="flex-1 py-3 px-4 bg-[#0474C4] hover:bg-[#06457F] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group"
            >
              <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
              <span>Launch Quiz ({quickCount || 1} Qs)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onOpenQuizModal(quickTopic, quickDiff, quickCount || 5)}
              className="py-3 px-3.5 bg-slate-100 dark:bg-[#2C444C]/60 hover:bg-slate-200 dark:hover:bg-[#2C444C] text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl transition-colors"
              title="Open full quiz customization dialog"
            >
              <Sliders className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      
      {/* Featured Topics Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0474C4] dark:text-[#A8C4EC]">
              Structured Learning
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
              Topic-Wise Quiz Tracks
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Select any core domain to customize and start practicing.
            </p>
          </div>

          <button
            onClick={() => onNavigate('dashboard')}
            className="mt-3 sm:mt-0 inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0474C4] dark:text-[#A8C4EC] hover:text-[#06457F] transition-colors"
          >
            <span>View All Tracks in Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Topics Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TOPICS.filter(t => t.id !== 'all').slice(0, 4).map((topic) => {
            const count = DSA_QUESTIONS.filter(q => q.topic === topic.id).length;
            const mastery = user?.topicMastery[topic.id] || 0;
            return (
              <TopicCard
                key={topic.id}
                topic={topic}
                
                mastery={mastery}
                onStartQuiz={() => onOpenQuizModal(topic.id, 'all', 5)}
              />
            );
          })}
        </div>
      </section>

      {/* Ready to Practice CTA */}
      {!user && (
        <section className="max-w-4xl mx-auto px-4 text-center">
          <div className="rounded-3xl bg-gradient-to-r from-[#06457F] via-[#0474C4] to-[#5379AE] text-white p-8 sm:p-10 shadow-xl">
            <h3 className="text-2xl sm:text-3xl font-bold mb-3">
              Ready to Test Your Algorithmic Brain?
            </h3>
            <p className="text-sm text-[#A8C4EC] max-w-xl mx-auto mb-6">
              Create a free account or test out the platform with one click to record your progress, save tricky questions, and track topic mastery.
            </p>
            <button
              onClick={() => openAuth('signup')}
              className="px-6 py-3 bg-white text-[#06457F] hover:bg-[#A8C4EC]/20 font-bold text-sm rounded-xl shadow-lg transition-transform active:scale-95"
            >
              Get Started for Free
            </button>
          </div>
        </section>
      )}

    </div>
  );
}
