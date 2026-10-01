import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function CodeBlock({ code, language = 'cpp' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split('\n');

  return (
    <div className="relative my-3 rounded-xl overflow-hidden border border-slate-700/60 bg-slate-900 shadow-md text-sm font-mono text-slate-200">
      <div className="flex items-center justify-between px-4 py-1.5 bg-slate-950/80 border-b border-slate-800 text-xs text-slate-400">
        <span className="font-semibold uppercase tracking-wider">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 hover:text-white transition-colors text-xs px-2 py-0.5 rounded bg-slate-800/80 hover:bg-slate-700"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <div className="p-3.5 overflow-x-auto">
        <pre className="text-xs sm:text-sm leading-relaxed">
          {lines.map((line, idx) => (
            <div key={idx} className="table-row">
              <span className="table-cell pr-4 text-right select-none text-slate-600 text-xs">{idx + 1}</span>
              <span className="table-cell">{line}</span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
