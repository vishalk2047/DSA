import React from 'react';
import {
  Grid,
  GitCommit,
  Layers,
  Network,
  Share2,
  Cpu,
  Search,
  Activity,
  Play
} from 'lucide-react';

const iconMap = {
  Grid,
  GitCommit,
  Layers,
  Network,
  Share2,
  Cpu,
  Search,
  Activity
};

export default function TopicCard({ topic, questionCount, onStartQuiz }) {
  const IconComponent = iconMap[topic.icon] || Layers;

  return (
    <div className="group relative bg-white dark:bg-[#262B40] border border-slate-200/80 dark:border-slate-800 hover:border-[#0474C4]/60 dark:hover:border-[#0474C4]/60 rounded-2xl p-5 sm:p-6 shadow-subtle hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between">
          <div className="p-3 rounded-xl border bg-[#A8C4EC]/15 dark:bg-[#0474C4]/15 border-[#A8C4EC]/30 dark:border-[#0474C4]/30 text-[#0474C4] dark:text-[#A8C4EC]">
            <IconComponent className="w-6 h-6" />
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#A8C4EC]/20 text-[#06457F] dark:text-[#A8C4EC]">
            {questionCount} Questions
          </span>
        </div>

        <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#0474C4] dark:group-hover:text-[#A8C4EC] transition-colors">
          {topic.name}
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
          {topic.desc}
        </p>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={() => onStartQuiz(topic.id)}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-[#2C444C]/50 hover:bg-[#0474C4] hover:text-white dark:hover:bg-[#0474C4] dark:hover:text-white text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold transition-all duration-200"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Practice Quiz</span>
        </button>
      </div>
    </div>
  );
}
