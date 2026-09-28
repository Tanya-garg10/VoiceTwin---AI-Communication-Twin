import React, { useState } from 'react';
import { ArrowRight, Sparkles, Flame, ShieldAlert, Users, Sliders, Play, Plus, Check } from 'lucide-react';

interface ScenarioStudioViewProps {
  onLaunchScenario: (scenario: any) => void;
}

export const ScenarioStudioView: React.FC<ScenarioStudioViewProps> = ({ onLaunchScenario }) => {
  const [filter, setFilter] = useState<'all' | 'engineering' | 'crisis' | 'leadership'>('all');
  const [isCustomOpen, setIsCustomOpen] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [customRole, setCustomRole] = useState('Staff Engineer');

  const scenarios = [
    {
      id: 'incident-outage',
      category: 'crisis',
      tag: '01 CRISIS',
      title: 'The Black Friday Replica Stall',
      interviewer: 'David Rossi, VP of Infrastructure',
      difficulty: 'High Stress (30s Drill)',
      prompt: 'Production lock contention spiked to 98% during peak checkout. Orders are stalling, and the VP is on speakerphone. State your immediate 3 triage actions in under 30 seconds.',
      duration: '5 mins',
      focusArea: 'Composure & Rapid Sequencing'
    },
    {
      id: 'staff-nego',
      category: 'leadership',
      tag: '02 LEADERSHIP',
      title: 'The Staff Promotion Review',
      interviewer: 'Elena Rostova, Engineering Director',
      difficulty: 'Executive',
      prompt: 'You are presenting your Staff promotion packet. The committee is questioning whether your multi-region data pipeline migration had tangible company-wide leverage or was just routine plumbing. Defend your impact.',
      duration: '15 mins',
      focusArea: 'Strategic Framing & Business Outcome'
    },
    {
      id: 'kafka-deep',
      category: 'engineering',
      tag: '03 TECHNICAL',
      title: 'Kafka Rebalance Latency Deep-Dive',
      interviewer: 'Sarah Chen, Staff Infrastructure Architect',
      difficulty: 'Advanced L6+',
      prompt: 'How does Apache Kafka handle partition reassignment during consumer failure, and how do you prevent stop-the-world partition assignment delays in clusters handling 100k events/sec?',
      duration: '18 mins',
      focusArea: 'Protocol Mechanics & Production Telemetry'
    },
    {
      id: 'architect-deadlock',
      category: 'leadership',
      tag: '04 ALIGNMENT',
      title: 'The Monolith vs Microservice Deadlock',
      interviewer: 'Marcus Vance, Principal Architect',
      difficulty: 'Senior Staff',
      prompt: 'Two senior tech leads are locked in an emotional dispute over decomposing the core billing system. One wants event-driven microservices; the other insists on a modular monolith. Steer them toward an objective consensus.',
      duration: '14 mins',
      focusArea: 'Poise & De-escalation'
    }
  ];

  const filteredScenarios = filter === 'all' ? scenarios : scenarios.filter(s => s.category === filter);

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-10 space-y-16 text-left select-none text-stone-900 dark:text-stone-100">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-stone-500 dark:text-stone-400 block">
            SCENARIO STUDIO
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight uppercase">
            HIGH-STAKES SIMULATIONS
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 max-w-xl font-normal">
            Select a verified real-world interview or crisis scenario, or craft a custom challenge for your AI partner.
          </p>
        </div>

        <button
          onClick={() => setIsCustomOpen(!isCustomOpen)}
          className="px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-white shadow-sm flex items-center gap-2 transition active:scale-95 shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{isCustomOpen ? 'Close Customizer' : 'Create Custom Scenario'}</span>
        </button>
      </div>

      {/* 2. Custom Scenario Builder (Collapsible) */}
      {isCustomOpen && (
        <div className="p-8 rounded-3xl bg-white/80 dark:bg-stone-900/60 border border-violet-400/50 shadow-xl space-y-4 animate-fade-in">
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-violet-600 dark:text-violet-400 font-bold block">
            CUSTOM SCENARIO CREATOR
          </span>
          <h3 className="text-xl font-bold">Define Your Personal Communication Challenge</h3>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-mono text-stone-500 dark:text-stone-400 block mb-1">
                Target Role & Context:
              </label>
              <input
                type="text"
                value={customRole}
                onChange={(e) => setCustomRole(e.target.value)}
                placeholder="e.g. Principal Systems Engineer / VP of Product"
                className="w-full px-4 py-2.5 rounded-xl bg-stone-100/80 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-xs font-medium focus:outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-stone-500 dark:text-stone-400 block mb-1">
                Interviewer Question or Incident Prompt:
              </label>
              <textarea
                rows={3}
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Enter the exact scenario or tough question you want the AI to challenge you on..."
                className="w-full px-4 py-2.5 rounded-xl bg-stone-100/80 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-xs font-medium focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => {
                if (customPrompt.trim()) {
                  onLaunchScenario({
                    title: `Custom: ${customRole}`,
                    prompt: customPrompt,
                    difficulty: 'Custom Studio'
                  });
                }
              }}
              className="px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase bg-violet-600 text-white hover:bg-violet-500 shadow-md transition"
            >
              LAUNCH CUSTOM SESSION →
            </button>
          </div>
        </div>
      )}

      {/* 3. Category Filter Tabs */}
      <div className="flex gap-2 border-b border-stone-200 dark:border-stone-800 pb-3 text-xs font-mono">
        {[
          { id: 'all', label: 'ALL SCENARIOS' },
          { id: 'engineering', label: 'TECHNICAL ARCHITECTURE' },
          { id: 'crisis', label: 'CRISIS & PRESSURE' },
          { id: 'leadership', label: 'EXECUTIVE LEADERSHIP' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`px-4 py-1.5 rounded-full tracking-wider transition ${
              filter === tab.id
                ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-bold shadow-sm'
                : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 4. Scenario Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredScenarios.map((sc) => (
          <div
            key={sc.id}
            className="p-8 rounded-3xl bg-white/70 dark:bg-stone-900/50 border border-stone-200/80 dark:border-stone-800 backdrop-blur-xl space-y-4 shadow-sm flex flex-col justify-between hover:border-stone-400 dark:hover:border-stone-600 transition group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold tracking-widest text-violet-600 dark:text-violet-400">
                  {sc.tag}
                </span>
                <span className="text-[10px] font-mono text-stone-400">{sc.duration}</span>
              </div>

              <h3 className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition">
                {sc.title}
              </h3>

              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-normal">
                "{sc.prompt}"
              </p>

              <div className="pt-2 text-[11px] font-mono text-stone-500 dark:text-stone-400 space-y-1">
                <div>Interviewer: <strong className="text-stone-800 dark:text-stone-200">{sc.interviewer}</strong></div>
                <div>Focus: <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{sc.focusArea}</span></div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200/80 dark:border-stone-800/80 flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-stone-400">{sc.difficulty}</span>
              <button
                onClick={() => onLaunchScenario(sc)}
                className="px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase text-stone-900 dark:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-300 dark:border-stone-700 flex items-center gap-1.5 transition active:scale-95"
              >
                <span>ENTER SCENARIO</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
