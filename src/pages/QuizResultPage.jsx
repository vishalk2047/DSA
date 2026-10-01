import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import CodeBlock from '../components/CodeBlock';
import {
  CheckCircle2,
  XCircle,
  Trophy,
  RotateCcw,
  LayoutDashboard,
  HelpCircle
} from 'lucide-react';

export default function QuizResultPage({ resultData, onRetake, onReturnDashboard }) {
  const { topicTitle, total, correct, score, timeTaken, results } = resultData;

  useEffect(() => {
    if (score >= 60) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Confetti fallback
      }
    }
  }, [score]);

  const getScoreVerdict = () => {
    if (score >= 90) return { title: 'Outstanding Algorithmic Mastery!', desc: 'You demonstrated exceptional intuition and depth across these topics.' };
    if (score >= 70) return { title: 'Great Job! Solid Foundation.', desc: 'You have a strong grasp of the fundamental patterns and complexity trade-offs.' };
    if (score >= 50) return { title: 'Good Effort! Room for Improvement.', desc: 'Review the detailed explanations below to cement the tricky edge cases.' };
    return { title: 'Keep Practicing!', desc: 'DSA requires repetition. Go through the explanations and give it another try.' };
  };

  const verdict = getScoreVerdict();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 pb-16">
      
      {/* Score Overview Card */}
      <div className="bg-white dark:bg-[#262B40] border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-card text-center relative overflow-hidden">
        
        {/* Background glow using #0474C4 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#0474C4]/15 dark:bg-[#0474C4]/25 blur-3xl rounded-full pointer-events-none" />

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A8C4EC]/20 dark:bg-[#0474C4]/20 text-[#06457F] dark:text-[#A8C4EC] text-xs font-semibold mb-4 border border-[#A8C4EC]/40 dark:border-[#0474C4]/40">
          <Trophy className="w-3.5 h-3.5 text-[#0474C4]" />
          <span>{topicTitle} Summary</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          {verdict.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto mt-2">
          {verdict.desc}
        </p>

        {/* Score Ring / Metric Row */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#2C444C]/30 border border-slate-200/60 dark:border-slate-800">
            <span className="text-xs text-slate-400 block mb-0.5">Score</span>
            <span className="text-3xl font-extrabold text-[#0474C4] dark:text-[#A8C4EC]">{score}%</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#2C444C]/30 border border-slate-200/60 dark:border-slate-800">
            <span className="text-xs text-slate-400 block mb-0.5">Correct</span>
            <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">{correct}/{total}</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#2C444C]/30 border border-slate-200/60 dark:border-slate-800">
            <span className="text-xs text-slate-400 block mb-0.5">Time Taken</span>
            <span className="text-2xl font-bold text-slate-900 dark:text-white">{timeTaken}</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#2C444C]/30 border border-slate-200/60 dark:border-slate-800">
            <span className="text-xs text-slate-400 block mb-0.5">XP Earned</span>
            <span className="text-2xl font-bold text-amber-500">+{correct * 25 + (score >= 80 ? 50 : 10)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onRetake}
            className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#2C444C]/50 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-semibold hover:bg-slate-50 dark:hover:bg-[#2C444C] transition-all flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Quiz</span>
          </button>

          <button
            onClick={onReturnDashboard}
            className="px-6 py-2.5 rounded-xl bg-[#0474C4] hover:bg-[#06457F] text-white text-xs sm:text-sm font-semibold shadow-md transition-all flex items-center gap-2"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
        </div>
      </div>

      {/* Detailed Question-by-Question Review */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Detailed Solutions & Explanations
          </h2>
          <span className="text-xs text-slate-400">
            {results.filter(r => r.isCorrect).length} Correct • {results.filter(r => !r.isCorrect).length} Incorrect
          </span>
        </div>

        {results.map((res, idx) => {
          const q = res.question;
          const userChoice = res.userChoice;
          const isCorrect = res.isCorrect;

          return (
            <div
              key={q.id || idx}
              className={`bg-white dark:bg-[#262B40] border rounded-2xl p-5 sm:p-6 shadow-subtle ${
                isCorrect
                  ? 'border-emerald-200/80 dark:border-emerald-950/60'
                  : 'border-rose-200/80 dark:border-rose-950/60'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    isCorrect
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400'
                      : 'bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400'
                  }`}>
                    {idx + 1}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {q.topic}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                    isCorrect
                      ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                      : 'bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                  }`}>
                    {isCorrect ? 'Correct' : userChoice === undefined ? 'Unanswered' : 'Incorrect'}
                  </span>
                </div>
              </div>

              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-2">
                {q.question}
              </h3>

              {q.code && (
                <div className="my-3">
                  <CodeBlock code={q.code} language="cpp" />
                </div>
              )}

              {/* Options Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-3">
                {q.options.map((opt, optIdx) => {
                  const isAnswer = optIdx === q.correctAnswer;
                  const isUserSelection = optIdx === userChoice;

                  let optClass = "bg-slate-50 dark:bg-[#2C444C]/30 border-slate-200/60 dark:border-slate-800 text-slate-600 dark:text-slate-400";
                  if (isAnswer) {
                    optClass = "bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 font-semibold";
                  } else if (isUserSelection && !isCorrect) {
                    optClass = "bg-rose-50/80 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200 line-through";
                  }

                  return (
                    <div
                      key={optIdx}
                      className={`p-3 rounded-xl border text-xs flex items-center justify-between ${optClass}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold">{String.fromCharCode(65 + optIdx)}.</span>
                        <span>{opt}</span>
                      </div>
                      {isAnswer && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                      {isUserSelection && !isCorrect && <XCircle className="w-4 h-4 text-rose-500 shrink-0" />}
                    </div>
                  );
                })}
              </div>

              {/* Explanation & Complexity */}
              <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-[#2C444C]/30 border border-slate-200/60 dark:border-slate-800 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200 mb-1">
                  <HelpCircle className="w-3.5 h-3.5 text-[#0474C4]" />
                  <span>Concept Explanation:</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {q.explanation}
                </p>

                {(q.timeComplexity || q.spaceComplexity) && (
                  <div className="mt-2.5 pt-2 border-t border-slate-200 dark:border-slate-700 flex flex-wrap items-center gap-4 text-[#0474C4] dark:text-[#A8C4EC] font-mono text-[11px]">
                    {q.timeComplexity && <span>⏱ Time: {q.timeComplexity}</span>}
                    {q.spaceComplexity && <span>💾 Space: {q.spaceComplexity}</span>}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
