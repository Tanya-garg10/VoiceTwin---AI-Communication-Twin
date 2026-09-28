import React, { useState } from 'react';
import {
  Building2,
  UserCheck,
  Sparkles,
  ArrowRight,
  Play,
  Volume2,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Layers,
  Search,
  Filter,
  Flame,
  ChevronRight,
  ShieldCheck,
  Cpu
} from 'lucide-react';

interface PersonaQuestionStudioProps {
  onStartVoiceSessionWithQuestion: (question: string, persona: string) => void;
}

interface QuestionItem {
  id: string;
  company: 'Google' | 'Meta' | 'Stripe' | 'Netflix' | 'Apple' | 'OpenAI';
  role: string;
  difficulty: 'Staff' | 'Senior' | 'Principal';
  category: 'System Design' | 'Distributed Systems' | 'Behavioral Leadership' | 'Crisis Management';
  question: string;
  interviewerPersona: string;
  keyPoints: string[];
  antiPatterns: string[];
  suggestedMinutes: number;
}

export const PersonaQuestionStudio: React.FC<PersonaQuestionStudioProps> = ({
  onStartVoiceSessionWithQuestion,
}) => {
  const [selectedCompany, setSelectedCompany] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPersona, setSelectedPersona] = useState<string>('architect');
  const [activeQuestionId, setActiveQuestionId] = useState<string>('q1');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const personas = [
    {
      id: 'architect',
      name: 'Dr. Aris Vance',
      title: 'Skeptical Principal Architect',
      vibe: 'Challenges every trade-off, probes for edge-case failure modes and scale bottlenecks.',
      accent: 'border-violet-500/30 dark:border-violet-400/30',
      tag: 'Technical Rigor',
    },
    {
      id: 'bar_raiser',
      name: 'Maya Chen',
      title: 'FAANG Bar Raiser',
      vibe: 'Evaluates executive communication, STAR structure, cross-org influence, and clarity.',
      accent: 'border-cyan-500/30 dark:border-cyan-400/30',
      tag: 'Executive Presence',
    },
    {
      id: 'mentor',
      name: 'Samir Patel',
      title: 'Empathetic Staff Mentor',
      vibe: 'Collaborative, checks for mentorship, constructive debate, and architectural empathy.',
      accent: 'border-emerald-500/30 dark:border-emerald-400/30',
      tag: 'Culture & Empathy',
    },
    {
      id: 'founder',
      name: 'Elena Rostova',
      title: 'High-Velocity Tech Founder',
      vibe: 'Pragmatic, impatient with fluff, expects rapid decision making and ROI justification.',
      accent: 'border-amber-500/30 dark:border-amber-400/30',
      tag: 'Speed & Pragmatism',
    },
  ];

  const questions: QuestionItem[] = [
    {
      id: 'q1',
      company: 'Google',
      role: 'Staff Distributed Systems Engineer',
      difficulty: 'Principal',
      category: 'Distributed Systems',
      interviewerPersona: 'Dr. Aris Vance',
      question:
        'Walk me through how you would architect a globally distributed transactional database across multi-region datacenters with sub-50ms read latency and zero data loss under network partitions.',
      keyPoints: [
        'Spanner-style TrueTime vs Lamport Logical Clocks trade-off',
        'Multi-Paxos or Raft leader election across availability zones',
        'Tunable read consistency: Bounded Staleness vs Linearizable reads',
        'Two-Phase Commit (2PC) mitigation via pessimistic locking or saga patterns',
      ],
      antiPatterns: [
        'Saying "I would just use AWS DynamoDB multi-region" without explaining consensus',
        'Ignoring CAP theorem latency implications under cross-ocean WAN partitions',
      ],
      suggestedMinutes: 3,
    },
    {
      id: 'q2',
      company: 'Stripe',
      role: 'Staff Infrastructure Lead',
      difficulty: 'Staff',
      category: 'Crisis Management',
      interviewerPersona: 'Elena Rostova',
      question:
        'A critical database migration caused database connection pool exhaustion during Black Friday. P99 latency jumped 400ms. How do you triage the next 15 minutes and explain it to the CTO?',
      keyPoints: [
        'Immediate traffic shedding and circuit breaking on non-critical endpoints',
        'Envoy connection rate limiters and terminating long-running idle transactions',
        'Clear, calm executive status communication with concrete ETA and zero panic',
        'Post-mortem root cause analysis plan without blaming individuals',
      ],
      antiPatterns: [
        'Suggesting an immediate full rollback without verifying write consistency',
        'Over-explaining internal git commit history to an executive under pressure',
      ],
      suggestedMinutes: 2,
    },
    {
      id: 'q3',
      company: 'Meta',
      role: 'Senior Staff Frontend Architect',
      difficulty: 'Staff',
      category: 'System Design',
      interviewerPersona: 'Maya Chen',
      question:
        'How would you re-architect a real-time collaborative canvas used by 100 concurrent enterprise editors to maintain 60 FPS while synchronizing state over unreliable WebSockets?',
      keyPoints: [
        'CRDT (Conflict-free Replicated Data Types) vs Operational Transformation (OT)',
        'Off-main-thread Web Workers for state diffing and geometric calculations',
        'Local optimistic rendering with client-side reconciliation',
        'Delta compression and binary ArrayBuffer serialization over WebSockets',
      ],
      antiPatterns: [
        'Broadcasting the entire state JSON document on every mouse move or drag',
        'Failing to separate render thread performance from network synchronization',
      ],
      suggestedMinutes: 3,
    },
    {
      id: 'q4',
      company: 'Netflix',
      role: 'Staff Reliability Engineer',
      difficulty: 'Principal',
      category: 'Behavioral Leadership',
      interviewerPersona: 'Samir Patel',
      question:
        'Describe a time when you strongly disagreed with a Principal VP on architectural direction. How did you challenge the decision, and what was the verifiable outcome?',
      keyPoints: [
        'Focus on empirical telemetry and latency benchmarks rather than subjective opinions',
        'Disagree and commit principle after building an A/B benchmark proof-of-concept',
        'Cross-organizational empathy: understanding the VP’s quarterly risk constraints',
        'Quantified long-term outcome (e.g., 35% cloud infrastructure cost savings)',
      ],
      antiPatterns: [
        'Portraying yourself as the solitary genius fighting incompetent management',
        'Failing to explain how team morale and alignment were preserved',
      ],
      suggestedMinutes: 2,
    },
    {
      id: 'q5',
      company: 'OpenAI',
      role: 'Staff ML Inference Engineer',
      difficulty: 'Staff',
      category: 'Distributed Systems',
      interviewerPersona: 'Dr. Aris Vance',
      question:
        'How do you design a low-latency LLM streaming inference engine supporting speculative decoding, dynamic KV-cache eviction, and prefix caching across GPU clusters?',
      keyPoints: [
        'PagedAttention memory management to eliminate external memory fragmentation',
        'Speculative decoding with draft model validation trade-offs',
        'Radix-tree prefix caching for repeated system prompts and context reuse',
        'Continuous batching vs static batching for interactive streaming latency',
      ],
      antiPatterns: [
        'Treating GPU inference like traditional stateless HTTP microservices',
        'Ignoring cold-start GPU memory allocation overheads',
      ],
      suggestedMinutes: 3,
    },
  ];

  const filteredQuestions = questions.filter((q) => {
    const matchCompany = selectedCompany === 'All' || q.company === selectedCompany;
    const matchCategory = selectedCategory === 'All' || q.category === selectedCategory;
    const matchQuery =
      searchQuery === '' ||
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCompany && matchCategory && matchQuery;
  });

  const activeQuestion = questions.find((q) => q.id === activeQuestionId) || questions[0];

  const handleSpeakQuestion = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onstart = () => setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-10 space-y-10">
      {/* Editorial Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-600 dark:bg-violet-400" />
          <span>Interactive Question Bank & Persona Studio</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-stone-100 uppercase">
          Targeted Interview Questions & AI Personas
        </h2>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 max-w-2xl">
          Select target company calibration profiles, configure tough interviewer personas, and launch directly into low-latency voice practice.
        </p>
      </div>

      {/* Persona Selection Strip */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400">
            01 / Choose Interviewer Persona
          </h3>
          <span className="text-xs font-mono text-stone-400 dark:text-stone-500">
            Adapts voice tone, skepticism, and follow-up aggressiveness
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {personas.map((persona) => {
            const isSelected = selectedPersona === persona.id;
            return (
              <button
                key={persona.id}
                onClick={() => setSelectedPersona(persona.id)}
                className={`p-5 rounded-2xl text-left border transition-all duration-200 ${
                  isSelected
                    ? 'bg-white dark:bg-stone-900 border-violet-600 dark:border-violet-400 shadow-md ring-1 ring-violet-500/20'
                    : 'bg-white/60 dark:bg-stone-900/40 border-stone-200/80 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-700'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 font-medium">
                    {persona.tag}
                  </span>
                  {isSelected && (
                    <CheckCircle2 className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                  )}
                </div>
                <div className="font-bold text-stone-900 dark:text-stone-100 text-sm">
                  {persona.name}
                </div>
                <div className="text-xs font-mono text-stone-500 dark:text-stone-400 mb-2">
                  {persona.title}
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed line-clamp-2">
                  {persona.vibe}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Filter & Question List (5 cols) + Active Deep Dive (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Questions Directory (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400">
              02 / Curated Question Catalog ({filteredQuestions.length})
            </h3>
          </div>

          {/* Search & Filter Controls */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search questions, roles, concepts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:border-violet-500 transition"
              />
            </div>

            {/* Company Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 text-xs">
              {['All', 'Google', 'Meta', 'Stripe', 'Netflix', 'OpenAI'].map((comp) => (
                <button
                  key={comp}
                  onClick={() => setSelectedCompany(comp)}
                  className={`px-3 py-1 rounded-lg font-medium whitespace-nowrap transition ${
                    selectedCompany === comp
                      ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                  }`}
                >
                  {comp}
                </button>
              ))}
            </div>
          </div>

          {/* Questions Scrollable List */}
          <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
            {filteredQuestions.map((q) => {
              const isSelected = activeQuestionId === q.id;
              return (
                <div
                  key={q.id}
                  onClick={() => setActiveQuestionId(q.id)}
                  className={`p-4 rounded-xl text-left border cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'bg-white dark:bg-stone-900 border-violet-500 dark:border-violet-400 shadow-sm ring-1 ring-violet-500/20'
                      : 'bg-white/60 dark:bg-stone-900/40 border-stone-200/80 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 font-semibold uppercase">
                      {q.company} · {q.category}
                    </span>
                    <span className="text-[10px] font-mono text-stone-400">
                      ~{q.suggestedMinutes} min
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-100 leading-snug line-clamp-2">
                    {q.question}
                  </h4>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Active Question Detail & Live Launchpad (7 Cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-stone-900/90 rounded-2xl p-6 sm:p-8 border border-stone-200/80 dark:border-stone-800 space-y-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 dark:border-stone-800 pb-5">
            <div className="flex items-center gap-2 text-xs font-mono text-stone-500 dark:text-stone-400">
              <span className="font-bold text-stone-900 dark:text-stone-100 uppercase">
                {activeQuestion.company}
              </span>
              <span>•</span>
              <span>{activeQuestion.role}</span>
              <span>•</span>
              <span className="px-2 py-0.5 rounded bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 font-semibold">
                {activeQuestion.difficulty}
              </span>
            </div>

            <button
              onClick={() => handleSpeakQuestion(activeQuestion.question)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-stone-200 dark:border-stone-700 hover:border-stone-400 text-stone-700 dark:text-stone-300 transition"
              title="Hear interviewer speak question"
            >
              <Volume2 className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
              <span>{isPlayingAudio ? 'Stop Voice' : 'Listen Question'}</span>
            </button>
          </div>

          {/* Big Question Typography */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-violet-600 dark:text-violet-400">
              The Question Prompt
            </span>
            <p className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 leading-relaxed">
              "{activeQuestion.question}"
            </p>
          </div>

          {/* Key Talking Points & Anti-Patterns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
            <div className="space-y-3 p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wide">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Must-Hit Architectural Anchors</span>
              </div>
              <ul className="space-y-2 text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                {activeQuestion.keyPoints.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wide">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Candidate Anti-Patterns</span>
              </div>
              <ul className="space-y-2 text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                {activeQuestion.antiPatterns.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-amber-600 dark:text-amber-400 font-bold">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Launch Voice Session CTA */}
          <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-mono text-stone-500 dark:text-stone-400">
              Active Persona: <strong className="text-stone-800 dark:text-stone-200">{personas.find(p => p.id === selectedPersona)?.name}</strong>
            </div>

            <button
              onClick={() => onStartVoiceSessionWithQuestion(activeQuestion.question, selectedPersona)}
              className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-bold tracking-wider uppercase bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-white shadow-md flex items-center justify-center gap-2 transition active:scale-95"
            >
              <span>Practice With Voice Twin</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
