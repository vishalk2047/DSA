import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { TOPICS, DSA_QUESTIONS } from '../data/dsaQuestions';
import CodeBlock from '../components/CodeBlock';
import {
  Clock,
  Bookmark,
  BookmarkCheck,
  HelpCircle,
  Flag,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  RefreshCw,
  Layers,
  Check,
  Sliders,
  X
} from 'lucide-react';

export default function QuizArena({
  questions: initialQuestions,
  topicTitle: initialTitle = 'DSA Practice Quiz',
  timePerQuestion = 60,
  topicId: initialTopicId = 'all',
  difficulty: initialDifficulty = 'all',
  onFinishQuiz,
  onExit,
  onChangeTopicConfig
}) {
  const { user, toggleBookmark } = useAuth();
  const [questions, setQuestions] = useState(initialQuestions);
  const [topicTitle, setTopicTitle] = useState(initialTitle);
  const [currentTopicId, setCurrentTopicId] = useState(initialTopicId);
  const [currentDifficulty, setCurrentDifficulty] = useState(initialDifficulty);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [flagged, setFlagged] = useState({});
  const [showHint, setShowHint] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timePerQuestion);
  const [showQuestionPalette, setShowQuestionPalette] = useState(false);
  const [showTopicSwitcher, setShowTopicSwitcher] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());

  // Topic switcher state
  const [switchTopic, setSwitchTopic] = useState(currentTopicId);
  const [switchDiff, setSwitchDiff] = useState(currentDifficulty);
  const [switchCount, setSwitchCount] = useState(questions.length || 5);

  // Sync when initialQuestions change
  useEffect(() => {
    setQuestions(initialQuestions);
    setTopicTitle(initialTitle);
    setCurrentTopicId(initialTopicId);
    setCurrentDifficulty(initialDifficulty);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setFlagged({});
    setShowHint(false);
    setTimeLeft(timePerQuestion);
    setStartTime(Date.now());
  }, [initialQuestions, initialTitle, initialTopicId, initialDifficulty, timePerQuestion]);

  const currentQ = questions[currentIndex] || questions[0];
  const isBookmarked = currentQ && user?.bookmarks?.includes(currentQ.id);

  // Timer effect
  useEffect(() => {
    if (timePerQuestion === 0) return;

    setTimeLeft(timePerQuestion);
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (currentIndex < questions.length - 1) {
            setCurrentIndex((idx) => idx + 1);
            return timePerQuestion;
          } else {
            clearInterval(timer);
            handleSubmitQuiz();
            return 0;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, timePerQuestion, questions.length]);

  const handleSelectOption = (optIdx) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: optIdx
    }));
  };

  const toggleFlag = () => {
    setFlagged((prev) => ({
      ...prev,
      [currentIndex]: !prev[currentIndex]
    }));
  };

  const handleNext = () => {
    setShowHint(false);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setShowHint(false);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Perform Mid-Quiz Topic Switch
  const handleApplyTopicSwitch = (newTopicId, newDiff, newCount) => {
    let pool = DSA_QUESTIONS;
    if (newTopicId !== 'all') {
      pool = pool.filter((q) => q.topic === newTopicId);
    }
    if (newDiff !== 'all') {
      pool = pool.filter((q) => q.difficulty.toLowerCase() === newDiff.toLowerCase());
    }

    if (pool.length === 0) {
      pool = DSA_QUESTIONS;
    }

    const count = Math.max(1, Math.min(15, newCount || questions.length));
    const shuffled = [...pool].sort(() => 0.5 - Math.random()).slice(0, count);

    const foundTopic = TOPICS.find((t) => t.id === newTopicId);
    const newTitle = newTopicId === 'all' 
      ? `Mixed DSA Challenge (${newDiff === 'all' ? 'All' : newDiff})`
      : `${foundTopic?.name || 'Topic'} Quiz (${newDiff === 'all' ? 'Mixed' : newDiff})`;

    setQuestions(shuffled);
    setTopicTitle(newTitle);
    setCurrentTopicId(newTopicId);
    setCurrentDifficulty(newDiff);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setFlagged({});
    setShowHint(false);
    setTimeLeft(timePerQuestion);
    setStartTime(Date.now());
    setShowTopicSwitcher(false);

    if (onChangeTopicConfig) {
      onChangeTopicConfig({
        questions: shuffled,
        topicTitle: newTitle,
        topicId: newTopicId,
        difficulty: newDiff
      });
    }
  };

  const handleSubmitQuiz = () => {
    const timeSpentMs = Date.now() - startTime;
    const totalSeconds = Math.round(timeSpentMs / 1000);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    const formattedTime = `${mins}m ${secs}s`;

    let correctCount = 0;
    const results = questions.map((q, idx) => {
      const userChoice = selectedAnswers[idx];
      const isCorrect = userChoice === q.correctAnswer;
      if (isCorrect) correctCount++;
      return {
        question: q,
        userChoice,
        isCorrect
      };
    });

    const scorePercentage = Math.round((correctCount / questions.length) * 100);

    onFinishQuiz({
      topicTitle,
      total: questions.length,
      correct: correctCount,
      score: scorePercentage,
      timeTaken: formattedTime,
      results
    });
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  if (!currentQ) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 space-y-6">
      
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-[#262B40] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-subtle">
        
        {/* Left: Exit & Topic with "Change Topic" pill */}
        <div className="flex items-center gap-3">
          <button
            onClick={onExit}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#2C444C] transition-colors"
            title="Exit Quiz"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#0474C4] dark:text-[#A8C4EC] uppercase tracking-wider block">
                {topicTitle}
              </span>
              {/* Change Topic Trigger Button */}
              <button
                onClick={() => {
                  setSwitchTopic(currentTopicId);
                  setSwitchDiff(currentDifficulty);
                  setSwitchCount(questions.length);
                  setShowTopicSwitcher(true);
                }}
                className="px-2 py-0.5 rounded-md bg-[#A8C4EC]/20 hover:bg-[#A8C4EC]/40 text-[#06457F] dark:text-[#A8C4EC] text-[10px] font-bold flex items-center gap-1 border border-[#A8C4EC]/40 transition-colors"
                title="Change quiz topic right now"
              >
                <RefreshCw className="w-2.5 h-2.5" />
                <span>Change Topic</span>
              </button>
            </div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              Question {currentIndex + 1} of {questions.length}
            </h2>
          </div>
        </div>

        {/* Right: Timer, Bookmarks, Flag, Palette */}
        <div className="flex items-center gap-2.5 self-end sm:self-auto">
          {/* Question Timer */}
          {timePerQuestion > 0 && (
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-mono font-bold ${
              timeLeft <= 10
                ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-300 dark:border-rose-800 text-rose-600 dark:text-rose-400 animate-pulse'
                : 'bg-slate-50 dark:bg-[#2C444C]/50 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200'
            }`}>
              <Clock className="w-4 h-4 text-[#0474C4]" />
              <span>{timeLeft}s</span>
            </div>
          )}

          {/* Bookmark Button */}
          <button
            onClick={() => toggleBookmark(currentQ.id)}
            className={`p-2 rounded-xl border transition-colors ${
              isBookmarked
                ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-300 dark:border-amber-800 text-amber-600 dark:text-amber-400'
                : 'bg-slate-50 dark:bg-[#2C444C]/40 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
            title="Save question for revision"
          >
            {isBookmarked ? <BookmarkCheck className="w-4 h-4 fill-amber-500" /> : <Bookmark className="w-4 h-4" />}
          </button>

          {/* Flag for review button */}
          <button
            onClick={toggleFlag}
            className={`p-2 rounded-xl border transition-colors ${
              flagged[currentIndex]
                ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-300 dark:border-rose-800 text-rose-600 dark:text-rose-400'
                : 'bg-slate-50 dark:bg-[#2C444C]/40 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
            title="Flag for review"
          >
            <Flag className={`w-4 h-4 ${flagged[currentIndex] ? 'fill-rose-500' : ''}`} />
          </button>

          {/* Quick Palette Toggle */}
          <button
            onClick={() => setShowQuestionPalette(!showQuestionPalette)}
            className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-[#2C444C]/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
          >
            {answeredCount}/{questions.length} Solved
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-gradient-to-r from-[#06457F] to-[#0474C4] h-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Mid-Quiz Topic Switcher Modal */}
      {showTopicSwitcher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#262B40]/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white dark:bg-[#262B40] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-[#A8C4EC]/20 text-[#0474C4] dark:text-[#A8C4EC]">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Switch DSA Quiz Topic
                  </h3>
                  <p className="text-xs text-slate-400">Choose a new topic and question count (1-15)</p>
                </div>
              </div>
              <button
                onClick={() => setShowTopicSwitcher(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Topic Selection Grid */}
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase block mb-2">
                1. Select New Topic
              </label>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                {TOPICS.map((t) => {
                  const isSelected = switchTopic === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSwitchTopic(t.id)}
                      className={`p-2.5 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-[#0474C4] border-[#0474C4] text-white'
                          : 'bg-slate-50 dark:bg-[#2C444C]/35 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      <span className="truncate">{t.name}</span>
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Difficulty & 1-15 Questions */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase block mb-1">
                  2. Difficulty
                </label>
                <select
                  value={switchDiff}
                  onChange={(e) => setSwitchDiff(e.target.value)}
                  className="w-full p-2 text-xs font-medium bg-slate-50 dark:bg-[#2C444C]/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                >
                  <option value="all">Mixed / All</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase block mb-1">
                  3. Questions (1 - 15)
                </label>
                <input
                  type="number"
                  min="1"
                  max="15"
                  value={switchCount}
                  onChange={(e) => setSwitchCount(Math.max(1, Math.min(15, parseInt(e.target.value, 10) || 1)))}
                  className="w-full p-2 text-center text-xs font-bold font-mono bg-slate-50 dark:bg-[#2C444C]/50 border border-slate-200 dark:border-slate-700 rounded-xl text-[#0474C4] dark:text-[#A8C4EC]"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowTopicSwitcher(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-[#2C444C] rounded-xl"
              >
                Keep Current Quiz
              </button>
              <button
                type="button"
                onClick={() => handleApplyTopicSwitch(switchTopic, switchDiff, switchCount)}
                className="px-5 py-2 bg-[#0474C4] hover:bg-[#06457F] text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Switch Topic & Restart</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Question Palette Drawer (Collapsible) */}
      {showQuestionPalette && (
        <div className="bg-white dark:bg-[#262B40] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-subtle animate-in fade-in duration-150">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-3">
            <span>Question Navigation:</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#0474C4]" /> Answered</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Flagged</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {questions.map((_, idx) => {
              const isAnswered = selectedAnswers[idx] !== undefined;
              const isFlagged = flagged[idx];
              const isCurrent = currentIndex === idx;

              return (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setShowHint(false);
                  }}
                  className={`w-9 h-9 rounded-xl text-xs font-bold transition-all relative ${
                    isCurrent
                      ? 'ring-2 ring-[#0474C4] bg-[#A8C4EC]/20 dark:bg-[#0474C4]/20 text-[#0474C4] dark:text-[#A8C4EC] font-extrabold'
                      : isAnswered
                      ? 'bg-[#0474C4] text-white'
                      : 'bg-slate-100 dark:bg-[#2C444C]/50 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {idx + 1}
                  {isFlagged && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white dark:ring-[#262B40]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Question Card */}
      <div className="bg-white dark:bg-[#262B40] border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-card">
        
        {/* Category & Difficulty Pill */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#A8C4EC]/20 dark:bg-[#0474C4]/20 text-[#06457F] dark:text-[#A8C4EC] border border-[#A8C4EC]/30">
              {currentQ.topic.toUpperCase()}
            </span>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              currentQ.difficulty === 'Easy' ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800' :
              currentQ.difficulty === 'Medium' ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800' :
              'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800'
            }`}>
              {currentQ.difficulty}
            </span>
          </div>

          
        </div>

        {/* Question Text */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
          {currentQ.question}
        </h3>

        {/* Code Snippet (if available) */}
        {currentQ.code && (
          <div className="my-4">
            <CodeBlock code={currentQ.code} language="cpp" />
          </div>
        )}

        {/* Options */}
        <div className="space-y-3 mt-6">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedAnswers[currentIndex] === idx;
            const letter = String.fromCharCode(65 + idx);

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3 group ${
                  isSelected
                    ? 'bg-[#A8C4EC]/20 dark:bg-[#0474C4]/25 border-[#0474C4] dark:border-[#A8C4EC] text-slate-900 dark:text-white shadow-sm ring-1 ring-[#0474C4]'
                    : 'bg-slate-50/50 dark:bg-[#2C444C]/30 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-800 dark:text-slate-200'
                }`}
              >
                <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-[#0474C4] text-white'
                    : 'bg-white dark:bg-[#262B40] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 group-hover:bg-slate-100'
                }`}>
                  {letter}
                </span>
                <span className="text-sm font-medium pt-0.5 leading-relaxed">
                  {option}
                </span>
              </button>
            );
          })}
        </div>

        
      </div>

      {/* Bottom Navigation Buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <div className="flex items-center gap-2">
          {currentIndex === questions.length - 1 ? (
            <button
              onClick={handleSubmitQuiz}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <span>Submit & Finish Quiz</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-5 py-2.5 bg-[#0474C4] hover:bg-[#06457F] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <span>Next Question</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

    </div>
  );
}
