import React, { useState, useEffect } from 'react';
import { TOPICS, DSA_QUESTIONS } from '../data/dsaQuestions';
import {
  Sliders,
  X,
  Play,
  Sparkles,
  Check
} from 'lucide-react';

export default function QuizSetupModal({
  isOpen,
  onClose,
  onStart,
  initialTopic = 'all',
  initialDifficulty = 'all',
  initialCount = 5
}) {
  const [selectedTopics, setSelectedTopics] = useState([initialTopic]);
  const [difficulty, setDifficulty] = useState(initialDifficulty);
  const [questionCount, setQuestionCount] = useState(initialCount || 5);
  const [timeMode, setTimeMode] = useState(60);

  useEffect(() => {
    if (isOpen) {
      setSelectedTopics([initialTopic]);
      setDifficulty(initialDifficulty);
      setQuestionCount(initialCount || 5);
    }
  }, [isOpen, initialTopic, initialDifficulty, initialCount]);

  if (!isOpen) return null;

  // Calculate question pool based on selection
  const pool = DSA_QUESTIONS.filter((q) => {
    const isTopicMatch =
      selectedTopics.includes('all') ||
      selectedTopics.length === 0 ||
      selectedTopics.includes(q.topic);

    const isDiffMatch =
      difficulty === 'all' ||
      q.difficulty.toLowerCase() === difficulty.toLowerCase();

    return isTopicMatch && isDiffMatch;
  });

  const handleToggleTopic = (topicId) => {
    if (topicId === 'all') {
      setSelectedTopics(['all']);
      return;
    }

    let next = selectedTopics.filter((t) => t !== 'all');
    if (next.includes(topicId)) {
      next = next.filter((t) => t !== topicId);
      if (next.length === 0) next = ['all'];
    } else {
      next.push(topicId);
    }
    setSelectedTopics(next);
  };

  const handleCountInputChange = (e) => {
    const val = e.target.value;
    if (val === '') {
      setQuestionCount('');
      return;
    }
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed)) {
      setQuestionCount(Math.max(1, Math.min(15, parsed)));
    }
  };

  const handleBlur = () => {
    if (!questionCount || questionCount < 1) {
      setQuestionCount(1);
    } else if (questionCount > 15) {
      setQuestionCount(15);
    }
  };

  const handleLaunch = () => {
    const count = Math.max(1, Math.min(15, parseInt(questionCount, 10) || 5));
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const finalCount = Math.min(count, shuffled.length);
    const selectedQuestions = shuffled.slice(0, finalCount > 0 ? finalCount : 1);

    let title = 'Custom DSA Quiz';
    if (selectedTopics.includes('all')) {
      title = `Mixed DSA Challenge (${difficulty === 'all' ? 'All Difficulties' : difficulty})`;
    } else if (selectedTopics.length === 1) {
      const t = TOPICS.find((top) => top.id === selectedTopics[0]);
      title = `${t?.name || 'DSA'} Quiz (${difficulty === 'all' ? 'Mixed' : difficulty})`;
    } else {
      title = `${selectedTopics.length} Topics Mixed Quiz`;
    }

    onStart({
      questions: selectedQuestions,
      topicTitle: title,
      timePerQuestion: timeMode,
      topicId: selectedTopics.length === 1 ? selectedTopics[0] : 'all',
      difficulty,
      requestedCount: count
    });
    onClose();
  };

  const difficultyOptions = [
    { id: 'all', label: 'Mixed / All' },
    { id: 'easy', label: 'Easy' },
    { id: 'medium', label: 'Medium' },
    { id: 'hard', label: 'Hard' },
  ];

  const timerPresets = [
    { value: 30, label: '30s' },
    { value: 45, label: '45s' },
    { value: 60, label: '60s' },
    { value: 0, label: 'Untimed' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#262B40]/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-white dark:bg-[#262B40] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-5 sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-[#A8C4EC]/20 dark:bg-[#0474C4]/20 text-[#0474C4] dark:text-[#A8C4EC] border border-[#A8C4EC]/30">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Customize Your DSA Quiz
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Choose topic, difficulty & type the number of questions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#2C444C] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          
          {/* 1. TOPIC SELECTION */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Select Topic(s)
              </label>
              <span className="text-[11px] text-slate-400">
                {selectedTopics.includes('all') ? 'All Topics Selected' : `${selectedTopics.length} Selected`}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {TOPICS.map((topic) => {
                const isSelected = selectedTopics.includes(topic.id);

                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => handleToggleTopic(topic.id)}
                    className={`py-3 px-3 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#0474C4] border-[#0474C4] text-white shadow-sm'
                        : 'bg-slate-50 dark:bg-[#2C444C]/35 border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#2C444C]/60'
                    }`}
                  >
                    <span className="font-semibold truncate">{topic.name}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. DIFFICULTY SELECTION */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Choose Difficulty
              </label>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {difficultyOptions.map((opt) => {
                const isSelected = difficulty === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setDifficulty(opt.id)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#0474C4] border-[#0474C4] text-white shadow-sm'
                        : 'bg-slate-50 dark:bg-[#2C444C]/35 border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#2C444C]/60'
                    }`}
                  >
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. NUMBER OF QUESTIONS (Direct user typing 1 to 15) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Number of Questions
              </label>
            </div>

            <div className="relative">
              <input
                type="number"
                min="1"
                max="15"
                step="1"
                placeholder="Enter 1 - 15"
                value={questionCount}
                onChange={handleCountInputChange}
                onBlur={handleBlur}
                className="w-full p-3 text-base font-semibold bg-slate-50 dark:bg-[#2C444C]/40 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-[#0474C4] focus:border-[#0474C4] outline-none"
              />
              <span className="absolute right-4 top-3.5 text-xs text-slate-400 font-medium pointer-events-none">
                / 15 max
              </span>
            </div>
          </div>

          {/* 4. TIMER MODE */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Timer Mode
              </label>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {timerPresets.map((t) => {
                const isSelected = timeMode === t.value;
                return (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => setTimeMode(t.value)}
                    className={`py-2.5 px-2 rounded-xl border text-xs font-bold transition-all text-center ${
                      isSelected
                        ? 'bg-[#0474C4] border-[#0474C4] text-white shadow-sm'
                        : 'bg-slate-50 dark:bg-[#2C444C]/35 border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#2C444C]/60'
                    }`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <Sparkles className="w-4 h-4 text-[#0474C4]" />
            <span>Target: {questionCount || 1} questions</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#2C444C] rounded-xl"
            >
              Cancel
            </button>

            <button
              onClick={handleLaunch}
              className="px-6 py-2.5 bg-[#0474C4] hover:bg-[#06457F] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Start Challenge</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
