import React from 'react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="mt-20 border-t border-slate-200/80 dark:border-slate-800 bg-white/60 dark:bg-[#262B40]/70 backdrop-blur-sm py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Balanced Top Section */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pb-8">
          
          {/* Core Tracks (Left side) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Core Tracks
            </h4>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
              <span
                className="hover:text-[#0474C4] dark:hover:text-[#A8C4EC] cursor-pointer transition-colors"
                onClick={() => onNavigate('dashboard', 'arrays')}
              >
                Arrays & Two Pointers
              </span>
              <span
                className="hover:text-[#0474C4] dark:hover:text-[#A8C4EC] cursor-pointer transition-colors"
                onClick={() => onNavigate('dashboard', 'trees')}
              >
                Trees & Graph Theory
              </span>
              <span
                className="hover:text-[#0474C4] dark:hover:text-[#A8C4EC] cursor-pointer transition-colors"
                onClick={() => onNavigate('dashboard', 'dp')}
              >
                Dynamic Programming
              </span>
              <span
                className="hover:text-[#0474C4] dark:hover:text-[#A8C4EC] cursor-pointer transition-colors"
                onClick={() => onNavigate('dashboard', 'complexity')}
              >
                Big-O & Math
              </span>
            </div>
          </div>

          {/* Platform Links (Right side) */}
          <div className="space-y-3 md:text-right">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Platform
            </h4>
            <div className="flex flex-wrap md:justify-end gap-x-6 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
              <span
                className="hover:text-[#0474C4] dark:hover:text-[#A8C4EC] cursor-pointer transition-colors"
                onClick={() => onNavigate('home')}
              >
                Daily Challenge
              </span>
              <span
                className="hover:text-[#0474C4] dark:hover:text-[#A8C4EC] cursor-pointer transition-colors"
                onClick={() => onNavigate('dashboard')}
              >
                Quiz Arena
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 AlgoMaster DSA. Built for CS Students.</p>
          <p className="text-slate-400">Fast Interactive Quiz Engine</p>
        </div>

      </div>
    </footer>
  );
}
