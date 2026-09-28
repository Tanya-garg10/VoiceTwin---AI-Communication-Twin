import React, { useState, useRef, useEffect } from 'react';
import { VoiceTwinLogo } from './VoiceTwinLogo';
import {
  Moon,
  Sun,
  Plus,
  LayoutGrid,
  Menu,
  X,
  Mic,
  Flame,
  Sparkles,
  Layers,
  BarChart3,
  Dna,
  Cpu,
  BookOpen,
  Volume2,
  TrendingUp,
  ChevronDown,
  Building2,
  Zap,
  Radio
} from 'lucide-react';

interface EditorialHeaderProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onStartSession: () => void;
  onStartPressure: () => void;
  isDark: boolean;
  onToggleDark: () => void;
}

export const EditorialHeader: React.FC<EditorialHeaderProps> = ({
  activeTab,
  onSelectTab,
  onStartSession,
  onStartPressure,
  isDark,
  onToggleDark,
}) => {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPracticeDropdownOpen, setIsPracticeDropdownOpen] = useState(false);

  const megaMenuRef = useRef<HTMLDivElement>(null);
  const practiceDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setIsMegaMenuOpen(false);
      }
      if (practiceDropdownRef.current && !practiceDropdownRef.current.contains(event.target as Node)) {
        setIsPracticeDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMegaMenuOpen(false);
        setIsPracticeDropdownOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // All 11 categorized features
  const featureCategories = [
    {
      category: 'Live Voice Studios',
      items: [
        {
          id: 'live_studio',
          label: 'Live Interview Room',
          desc: 'Low-latency natural conversational practice with Agora RTC and Gemini.',
          icon: Mic,
          badge: 'Live Voice',
          action: () => {
            onStartSession();
            setIsMegaMenuOpen(false);
            setIsMobileMenuOpen(false);
          },
        },
        {
          id: 'pressure_studio',
          label: '30s Pressure Hot Seat',
          desc: 'Dynamic difficulty escalation with countdown under high stakes.',
          icon: Flame,
          badge: 'Stress Test',
          action: () => {
            onStartPressure();
            setIsMegaMenuOpen(false);
            setIsMobileMenuOpen(false);
          },
        },
        {
          id: 'scenarios',
          label: 'Scenario Simulator',
          desc: 'Distributed systems crisis, executive negotiation, and system design.',
          icon: Layers,
          badge: 'Catalog',
          action: () => {
            onSelectTab('scenarios');
            setIsMegaMenuOpen(false);
            setIsMobileMenuOpen(false);
          },
        },
      ],
    },
    {
      category: 'Speech & Reframing Drills',
      items: [
        {
          id: 'practice',
          label: 'STAR Story Reframer',
          desc: 'Structure complex answers into Situation, Task, Action, and Result.',
          icon: Sparkles,
          badge: 'Framework',
          action: () => {
            onSelectTab('practice');
            setIsMegaMenuOpen(false);
            setIsMobileMenuOpen(false);
          },
        },
        {
          id: 'questions',
          label: 'Questions & Personas',
          desc: 'Targeted Google, Meta, Stripe questions with 4 tough interviewer personas.',
          icon: Building2,
          badge: 'New Studio',
          action: () => {
            onSelectTab('questions');
            setIsMegaMenuOpen(false);
            setIsMobileMenuOpen(false);
          },
        },
        {
          id: 'elevator_pitch',
          label: '60s Executive Pitch',
          desc: 'Master the 4-beat executive introduction and complex system pitch.',
          icon: Zap,
          badge: 'New Studio',
          action: () => {
            onSelectTab('elevator_pitch');
            setIsMegaMenuOpen(false);
            setIsMobileMenuOpen(false);
          },
        },
      ],
    },
    {
      category: 'Acoustics & Forensics',
      items: [
        {
          id: 'speechlab',
          label: 'Forensic Speech Lab',
          desc: 'Words per minute, vocal inflection, hesitation, and diaphragm warmup.',
          icon: Volume2,
          badge: 'Acoustics',
          action: () => {
            onSelectTab('speechlab');
            setIsMegaMenuOpen(false);
            setIsMobileMenuOpen(false);
          },
        },
        {
          id: 'insights',
          label: 'Post-Session Report',
          desc: 'Granular radar breakdown of clarity, conciseness, and filler timestamps.',
          icon: BarChart3,
          badge: 'Diagnostics',
          action: () => {
            onSelectTab('insights');
            setIsMegaMenuOpen(false);
            setIsMobileMenuOpen(false);
          },
        },
      ],
    },
    {
      category: 'Twin & Deep Tech',
      items: [
        {
          id: 'twin',
          label: 'Communication Twin DNA',
          desc: 'Candidate archetype, speech fingerprint, and historical growth curve.',
          icon: Dna,
          badge: 'AI Profile',
          action: () => {
            onSelectTab('twin');
            setIsMegaMenuOpen(false);
            setIsMobileMenuOpen(false);
          },
        },
        {
          id: 'progress',
          label: 'Long-Term Progress',
          desc: 'Streak tracker, 14-day mastery trajectory, and score metrics.',
          icon: TrendingUp,
          badge: 'Metrics',
          action: () => {
            onSelectTab('progress');
            setIsMegaMenuOpen(false);
            setIsMobileMenuOpen(false);
          },
        },
        {
          id: 'architecture',
          label: 'Agora RTC Engine',
          desc: 'Interactive sub-280ms voice pipeline & cloud agent architecture.',
          icon: Cpu,
          badge: 'Infrastructure',
          action: () => {
            onSelectTab('architecture');
            setIsMegaMenuOpen(false);
            setIsMobileMenuOpen(false);
          },
        },
      ],
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#faf9f5]/90 dark:bg-[#0c0d12]/90 border-b border-stone-200/70 dark:border-stone-800/60 transition-colors duration-300">
      {/* Top Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-3">
        {/* Left: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onSelectTab('overview')}
            className="focus:outline-none text-left flex items-center gap-2 group"
          >
            <VoiceTwinLogo size="md" />
          </button>
        </div>

        {/* Center: Clean Primary Navigation Links (Zero-Pill Discipline) */}
        <nav className="hidden xl:flex items-center gap-6">
          <button
            onClick={() => onSelectTab('overview')}
            className={`text-xs uppercase tracking-wider font-semibold transition py-1 border-b-2 ${
              activeTab === 'overview'
                ? 'text-stone-900 dark:text-stone-100 border-stone-900 dark:border-stone-100'
                : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 border-transparent'
            }`}
          >
            Overview
          </button>

          <button
            onClick={onStartSession}
            className="text-xs uppercase tracking-wider font-semibold transition py-1 text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 flex items-center gap-1.5"
            title="Launch Live Voice Interview Room"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Live Room</span>
          </button>

          <button
            onClick={onStartPressure}
            className="text-xs uppercase tracking-wider font-semibold transition py-1 text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 flex items-center gap-1.5"
            title="Launch 30s High-Stakes Pressure Drill"
          >
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>Pressure 30s</span>
          </button>

          {/* Practice Hub Dropdown */}
          <div className="relative" ref={practiceDropdownRef}>
            <button
              onClick={() => setIsPracticeDropdownOpen(!isPracticeDropdownOpen)}
              onMouseEnter={() => setIsPracticeDropdownOpen(true)}
              className={`text-xs uppercase tracking-wider font-semibold transition py-1 flex items-center gap-1 ${
                ['practice', 'questions', 'elevator_pitch', 'scenarios'].includes(activeTab)
                  ? 'text-stone-900 dark:text-stone-100 border-b-2 border-stone-900 dark:border-stone-100'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              <span>Practice Hub</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {isPracticeDropdownOpen && (
              <div
                onMouseLeave={() => setIsPracticeDropdownOpen(false)}
                className="absolute top-full left-0 mt-2 w-64 p-2 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl z-50 space-y-1"
              >
                <button
                  onClick={() => {
                    onSelectTab('questions');
                    setIsPracticeDropdownOpen(false);
                  }}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition flex items-center gap-3 text-xs"
                >
                  <Building2 className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                  <div>
                    <div className="font-semibold text-stone-900 dark:text-stone-100">Questions & Personas</div>
                    <div className="text-[10px] text-stone-500">Google, Meta & 4 Tough Personas</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    onSelectTab('elevator_pitch');
                    setIsPracticeDropdownOpen(false);
                  }}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition flex items-center gap-3 text-xs"
                >
                  <Zap className="w-4 h-4 text-amber-500" />
                  <div>
                    <div className="font-semibold text-stone-900 dark:text-stone-100">60s Executive Pitch</div>
                    <div className="text-[10px] text-stone-500">4-Beat Narrative Chronometer</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    onSelectTab('practice');
                    setIsPracticeDropdownOpen(false);
                  }}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition flex items-center gap-3 text-xs"
                >
                  <Sparkles className="w-4 h-4 text-indigo-500" />
                  <div>
                    <div className="font-semibold text-stone-900 dark:text-stone-100">STAR Story Reframer</div>
                    <div className="text-[10px] text-stone-500">Situation · Task · Action · Result</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    onSelectTab('scenarios');
                    setIsPracticeDropdownOpen(false);
                  }}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition flex items-center gap-3 text-xs"
                >
                  <Layers className="w-4 h-4 text-cyan-500" />
                  <div>
                    <div className="font-semibold text-stone-900 dark:text-stone-100">Scenario Simulator</div>
                    <div className="text-[10px] text-stone-500">Crisis, Negotiation, System Design</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => onSelectTab('twin')}
            className={`text-xs uppercase tracking-wider font-semibold transition py-1 border-b-2 ${
              activeTab === 'twin'
                ? 'text-stone-900 dark:text-stone-100 border-stone-900 dark:border-stone-100'
                : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 border-transparent'
            }`}
          >
            Twin DNA
          </button>

          <button
            onClick={() => onSelectTab('insights')}
            className={`text-xs uppercase tracking-wider font-semibold transition py-1 border-b-2 ${
              activeTab === 'insights'
                ? 'text-stone-900 dark:text-stone-100 border-stone-900 dark:border-stone-100'
                : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 border-transparent'
            }`}
          >
            Insights
          </button>

          <button
            onClick={() => onSelectTab('speechlab')}
            className={`text-xs uppercase tracking-wider font-semibold transition py-1 border-b-2 ${
              activeTab === 'speechlab'
                ? 'text-stone-900 dark:text-stone-100 border-stone-900 dark:border-stone-100'
                : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 border-transparent'
            }`}
          >
            Speech Lab
          </button>
        </nav>

        {/* Center-Right: All Features (11) Mega-Menu Trigger */}
        <div className="flex items-center gap-2">
          <div className="relative" ref={megaMenuRef}>
            <button
              onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide border flex items-center gap-1.5 transition ${
                isMegaMenuOpen
                  ? 'bg-violet-600 text-white border-violet-600 shadow-md ring-2 ring-violet-500/20'
                  : 'bg-stone-100 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 border-stone-300/80 dark:border-stone-700 hover:border-stone-400'
              }`}
              title="Explore all 11 VoiceTwin studio features"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">All Features</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-violet-200 dark:bg-violet-900 text-violet-800 dark:text-violet-200">
                11
              </span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* ALL FEATURES DROPDOWN MENU */}
            {isMegaMenuOpen && (
              <div
                className="absolute -right-16 sm:right-0 top-full mt-2.5 w-[calc(100vw-2rem)] sm:w-[620px] md:w-[720px] lg:w-[840px] max-w-[94vw] bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl p-5 sm:p-7 space-y-5 z-50 max-h-[82vh] overflow-y-auto"
                style={{
                  boxShadow: '0 20px 45px -10px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.08)'
                }}
              >
                {/* Dropdown Header */}
                <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3.5">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400 font-bold">
                      STUDIO DIRECTORY · 11 STUDIOS
                    </div>
                    <h3 className="text-lg font-black text-stone-900 dark:text-stone-100 uppercase tracking-tight">
                      All VoiceTwin Features
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsMegaMenuOpen(false)}
                    className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition"
                    title="Close Dropdown"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {featureCategories.map((cat, idx) => (
                    <div key={idx} className="space-y-2.5">
                      <h4 className="text-[11px] font-mono uppercase tracking-wider text-stone-400 dark:text-stone-500 font-semibold">
                        {cat.category}
                      </h4>
                      <div className="space-y-2">
                        {cat.items.map((item) => {
                          const Icon = item.icon;
                          return (
                            <div
                              key={item.id}
                              onClick={item.action}
                              className="p-3 rounded-2xl border border-stone-200/80 dark:border-stone-800 hover:border-violet-500 dark:hover:border-violet-400 hover:bg-violet-50/50 dark:hover:bg-violet-950/25 cursor-pointer transition-all group"
                            >
                              <div className="flex items-center justify-between mb-1">
                                <Icon className="w-4 h-4 text-violet-600 dark:text-violet-400 group-hover:scale-110 transition" />
                                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 font-medium">
                                  {item.badge}
                                </span>
                              </div>
                              <div className="font-bold text-xs text-stone-900 dark:text-stone-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition">
                                {item.label}
                              </div>
                              <p className="text-[10px] text-stone-500 dark:text-stone-400 leading-snug mt-0.5">
                                {item.desc}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Dropdown Quick Actions Footer */}
                <div className="pt-3.5 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between gap-3 text-xs">
                  <span className="font-mono text-stone-500 text-[11px] hidden sm:inline">
                    Sub-280ms voice latency · Powered by Agora RTC
                  </span>
                  <div className="flex items-center gap-2 ml-auto">
                    <button
                      onClick={() => {
                        setIsMegaMenuOpen(false);
                        onStartPressure();
                      }}
                      className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-amber-600 dark:text-amber-400 border border-amber-300 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-950/30 transition flex items-center gap-1"
                    >
                      <Flame className="w-3 h-3" />
                      <span>Pressure 30s</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsMegaMenuOpen(false);
                        onStartSession();
                      }}
                      className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-white shadow-sm transition flex items-center gap-1.5"
                    >
                      <Mic className="w-3 h-3" />
                      <span>Start Live Room</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Dark/Light mode toggle */}
          <button
            onClick={onToggleDark}
            className="w-8 h-8 rounded-full flex items-center justify-center text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-stone-200/60 dark:hover:bg-stone-800/60 transition"
            title={isDark ? 'Switch to Light' : 'Switch to Dark'}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* User Avatar: Tanya */}
          <div
            onClick={() => onSelectTab('twin')}
            className="w-8 h-8 rounded-full bg-stone-200 dark:bg-stone-800 border border-stone-300/80 dark:border-stone-700 flex items-center justify-center font-mono text-xs font-semibold text-stone-700 dark:text-stone-300 cursor-pointer hover:border-violet-400 transition shrink-0"
            title="Tanya (Candidate Profile)"
          >
            T
          </div>

          {/* Start Session CTA Button */}
          <button
            onClick={onStartSession}
            className="hidden sm:flex px-4 py-2 rounded-full text-xs font-semibold tracking-wide bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-white shadow-sm items-center gap-1.5 transition active:scale-95 shrink-0"
          >
            <span>Start Session</span>
            <Plus className="w-3.5 h-3.5" />
          </button>

          {/* Mobile / Tablet Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden w-8 h-8 rounded-full flex items-center justify-center text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800 transition"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sub-Navigation Strip (Direct 1-Click Horizontal Bar for all 11 features) */}
      <div className="border-t border-stone-200/50 dark:border-stone-800/40 bg-stone-50/50 dark:bg-stone-900/30 px-4 sm:px-6 py-2 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center gap-2 sm:gap-4 text-xs font-medium whitespace-nowrap min-w-max">
          <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 dark:text-stone-500 mr-1">
            Studio Directory:
          </span>

          {[
            { id: 'overview', label: 'Overview' },
            { id: 'questions', label: 'Questions & Personas' },
            { id: 'elevator_pitch', label: '60s Pitch' },
            { id: 'practice', label: 'STAR Reframer' },
            { id: 'scenarios', label: 'Scenarios' },
            { id: 'speechlab', label: 'Speech Lab' },
            { id: 'insights', label: 'Insights Report' },
            { id: 'twin', label: 'Twin DNA' },
            { id: 'progress', label: 'Progress Curve' },
            { id: 'architecture', label: 'RTC Engine' },
          ].map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`px-2.5 py-1 rounded-lg text-xs transition ${
                  isActive
                    ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-semibold shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-200/50 dark:hover:bg-stone-800/50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* MOBILE / TABLET SLIDE-DOWN DRAWER */}
      {isMobileMenuOpen && (
        <div className="xl:hidden border-t border-stone-200 dark:border-stone-800 bg-[#faf9f5] dark:bg-[#0c0d12] p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          <div className="flex items-center justify-between text-xs font-mono text-stone-500">
            <span>ALL STUDIO VIEWS</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-stone-700 dark:text-stone-300 font-bold"
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => {
                onSelectTab('overview');
                setIsMobileMenuOpen(false);
              }}
              className="p-3 text-left rounded-xl bg-stone-100 dark:bg-stone-800 font-semibold text-stone-800 dark:text-stone-200"
            >
              Overview
            </button>
            <button
              onClick={() => {
                onStartSession();
                setIsMobileMenuOpen(false);
              }}
              className="p-3 text-left rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-semibold flex items-center justify-between"
            >
              <span>Live Room</span>
              <Mic className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                onStartPressure();
                setIsMobileMenuOpen(false);
              }}
              className="p-3 text-left rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-semibold flex items-center justify-between"
            >
              <span>Pressure 30s</span>
              <Flame className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                onSelectTab('questions');
                setIsMobileMenuOpen(false);
              }}
              className="p-3 text-left rounded-xl bg-stone-100 dark:bg-stone-800 font-semibold text-stone-800 dark:text-stone-200"
            >
              Questions & Personas
            </button>
            <button
              onClick={() => {
                onSelectTab('elevator_pitch');
                setIsMobileMenuOpen(false);
              }}
              className="p-3 text-left rounded-xl bg-stone-100 dark:bg-stone-800 font-semibold text-stone-800 dark:text-stone-200"
            >
              60s Pitch Studio
            </button>
            <button
              onClick={() => {
                onSelectTab('practice');
                setIsMobileMenuOpen(false);
              }}
              className="p-3 text-left rounded-xl bg-stone-100 dark:bg-stone-800 font-semibold text-stone-800 dark:text-stone-200"
            >
              STAR Reframer
            </button>
            <button
              onClick={() => {
                onSelectTab('scenarios');
                setIsMobileMenuOpen(false);
              }}
              className="p-3 text-left rounded-xl bg-stone-100 dark:bg-stone-800 font-semibold text-stone-800 dark:text-stone-200"
            >
              Scenario Simulator
            </button>
            <button
              onClick={() => {
                onSelectTab('speechlab');
                setIsMobileMenuOpen(false);
              }}
              className="p-3 text-left rounded-xl bg-stone-100 dark:bg-stone-800 font-semibold text-stone-800 dark:text-stone-200"
            >
              Speech Lab
            </button>
            <button
              onClick={() => {
                onSelectTab('insights');
                setIsMobileMenuOpen(false);
              }}
              className="p-3 text-left rounded-xl bg-stone-100 dark:bg-stone-800 font-semibold text-stone-800 dark:text-stone-200"
            >
              Post-Session Report
            </button>
            <button
              onClick={() => {
                onSelectTab('twin');
                setIsMobileMenuOpen(false);
              }}
              className="p-3 text-left rounded-xl bg-stone-100 dark:bg-stone-800 font-semibold text-stone-800 dark:text-stone-200"
            >
              Twin DNA
            </button>
            <button
              onClick={() => {
                onSelectTab('progress');
                setIsMobileMenuOpen(false);
              }}
              className="p-3 text-left rounded-xl bg-stone-100 dark:bg-stone-800 font-semibold text-stone-800 dark:text-stone-200"
            >
              Progress Curve
            </button>
            <button
              onClick={() => {
                onSelectTab('architecture');
                setIsMobileMenuOpen(false);
              }}
              className="p-3 text-left rounded-xl bg-stone-100 dark:bg-stone-800 font-semibold text-stone-800 dark:text-stone-200"
            >
              RTC Architecture
            </button>
          </div>

          <div className="pt-2 flex items-center justify-end">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onStartSession();
              }}
              className="w-full py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-center"
            >
              Start Session
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
