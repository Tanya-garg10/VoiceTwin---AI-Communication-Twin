import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, Volume2, Globe, Sparkles, CheckCircle2, Copy, Check, Eye, ExternalLink } from 'lucide-react';
import { DEMO_SCRIPT_STEPS } from '../data/mockData';
import { DemoScriptStep } from '../types';

interface DemoDirectorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tabId: string, actionTrigger?: string) => void;
  activeTab: string;
}

export const DemoDirectorDrawer: React.FC<DemoDirectorDrawerProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
  activeTab
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [language, setLanguage] = useState<'hinglish' | 'english'>('hinglish');
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentStep = DEMO_SCRIPT_STEPS[currentStepIndex] || DEMO_SCRIPT_STEPS[0];

  // Presentation stopwatch
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNextStep = () => {
    if (currentStepIndex < DEMO_SCRIPT_STEPS.length - 1) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      onNavigateTab(DEMO_SCRIPT_STEPS[nextIdx].targetTab);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      const prevIdx = currentStepIndex - 1;
      setCurrentStepIndex(prevIdx);
      onNavigateTab(DEMO_SCRIPT_STEPS[prevIdx].targetTab);
    }
  };

  const handleJumpToStep = (index: number) => {
    setCurrentStepIndex(index);
    const step = DEMO_SCRIPT_STEPS[index];
    onNavigateTab(step.targetTab, step.category);
  };

  const handleCopyScript = () => {
    const textToCopy = language === 'hinglish' ? currentStep.whatToSayHinglish : currentStep.whatToSayEnglish;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[540px] lg:w-[620px] bg-slate-900/98 backdrop-blur-2xl border-l border-indigo-500/30 shadow-2xl flex flex-col transition-all duration-300">
      {/* Header bar */}
      <div className="p-4 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">Demo Director & Script</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                ~6 Min Pitch Guide
              </span>
            </div>
            <p className="text-xs text-slate-400">Word-to-word presenter teleprompter & interactive cue controller</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition"
          title="Close Drawer"
        >
          ✕
        </button>
      </div>

      {/* Stopwatch & Controls Bar */}
      <div className="px-4 py-3 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-700/60">
            <span className="text-slate-400 font-mono">Timer:</span>
            <span className={`font-mono font-bold text-sm ${timerSeconds > 360 ? 'text-amber-400' : 'text-cyan-300'}`}>
              {formatTimer(timerSeconds)}
            </span>
            <span className="text-slate-500 font-mono">/ 06:10</span>
          </div>

          <button
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className={`p-1.5 rounded-md flex items-center gap-1 font-semibold transition ${
              isTimerRunning 
                ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30' 
                : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
            }`}
          >
            {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isTimerRunning ? 'Pause' : 'Start'}</span>
          </button>

          <button
            onClick={() => {
              setIsTimerRunning(false);
              setTimerSeconds(0);
            }}
            className="p-1.5 rounded-md bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
            title="Reset timer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Script language toggle */}
        <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
          <button
            onClick={() => setLanguage('hinglish')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition ${
              language === 'hinglish'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Hinglish
          </button>
          <button
            onClick={() => setLanguage('english')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition ${
              language === 'english'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            English
          </button>
        </div>
      </div>

      {/* Steps Quick Selector Timeline */}
      <div className="px-4 py-2.5 bg-slate-900/80 border-b border-slate-800 overflow-x-auto flex gap-1.5 scrollbar-thin">
        {DEMO_SCRIPT_STEPS.map((step, idx) => {
          const isActive = idx === currentStepIndex;
          return (
            <button
              key={step.id}
              onClick={() => handleJumpToStep(idx)}
              className={`shrink-0 px-2.5 py-1.5 rounded-lg text-left text-[11px] transition-all flex items-center gap-1.5 border ${
                isActive
                  ? 'bg-indigo-600/30 border-indigo-500 text-white font-semibold shadow-sm shadow-indigo-500/20'
                  : 'bg-slate-950/40 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <span className="font-mono text-[10px] text-indigo-400">{step.timeRange.split('–')[0]}</span>
              <span className="truncate max-w-[90px]">{step.title.replace('⭐', '').replace('🔥', '')}</span>
            </button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Step Banner */}
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-indigo-950/50 via-slate-900/60 to-purple-950/40 border border-indigo-500/20 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Step {currentStepIndex + 1} of {DEMO_SCRIPT_STEPS.length}
              </span>
              <span className="text-xs font-mono text-cyan-400 font-semibold">{currentStep.timeRange}</span>
            </div>
            <h3 className="text-base font-bold text-white mt-1">{currentStep.title}</h3>
          </div>

          <button
            onClick={() => handleJumpToStep(currentStepIndex)}
            className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-600/20 transition active:scale-95"
          >
            <span>Jump to Tab</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* What to Say / Teleprompter */}
        <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 relative group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5 text-indigo-400" />
              What to Say ({language === 'hinglish' ? 'Hinglish Script' : 'English Script'})
            </span>

            <button
              onClick={handleCopyScript}
              className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 transition"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <div className="text-sm sm:text-base leading-relaxed text-slate-200 font-medium whitespace-pre-line bg-slate-900/50 p-3.5 rounded-lg border border-slate-800/80">
            {language === 'hinglish' ? currentStep.whatToSayHinglish : currentStep.whatToSayEnglish}
          </div>
        </div>

        {/* Presenter Action Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* What to Click */}
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider block mb-1">
              👉 What to Click
            </span>
            <p className="text-xs text-slate-300 leading-relaxed font-mono bg-slate-900/70 p-2 rounded border border-slate-800/60">
              {currentStep.whatToClick}
            </p>
          </div>

          {/* What Screen Shows */}
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider block mb-1">
              🖥️ What Screen Shows
            </span>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/70 p-2 rounded border border-slate-800/60">
              {currentStep.whatScreenShows}
            </p>
          </div>
        </div>

        {/* AI Cue & Key Differentiator */}
        <div className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-500/20 space-y-2">
          <div>
            <span className="text-[11px] font-semibold text-purple-300 uppercase tracking-wider block">
              🤖 AI Real-Time Cue
            </span>
            <p className="text-xs text-purple-200/90 mt-0.5">{currentStep.aiCue}</p>
          </div>

          <div className="pt-2 border-t border-indigo-900/40">
            <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block">
              ⭐ Key Judge Differentiator
            </span>
            <p className="text-xs text-emerald-200/90 mt-0.5">{currentStep.keyDifferentiator}</p>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="p-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
        <button
          onClick={handlePrevStep}
          disabled={currentStepIndex === 0}
          className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-300 flex items-center gap-1.5 transition"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Step</span>
        </button>

        <span className="text-xs text-slate-400 font-mono">
          {currentStepIndex + 1} / {DEMO_SCRIPT_STEPS.length}
        </span>

        <button
          onClick={handleNextStep}
          disabled={currentStepIndex === DEMO_SCRIPT_STEPS.length - 1}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-white flex items-center gap-1.5 shadow-md shadow-indigo-500/20 transition"
        >
          <span>Next Step</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
